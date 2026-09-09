import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async register(data: { username: string; email: string; password: string; role?: 'ADMIN' | 'USER'}) {
    const [existingUser] = await db.select().from(users).where(eq(users.email, data.email));
    if (existingUser) throw new Error('Email already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [newUser] = await db.insert(users).values({
      username: data.username ,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'USER',
    }).returning({
      id: users.id,
      username: users.username,
      email: users.email,
      role: users.role,
    });

    return newUser;
  }

  static async login(data: { email: string; password: string }) {
    const [user] = await db.select().from(users).where(eq(users.email, data.email));
    if (!user) throw new Error('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) throw new Error('Invalid email or password');

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    return { token, user: { id: user.id, username: user.username, role: user.role } };
  }


  
}
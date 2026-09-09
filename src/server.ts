import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger.js'; // Note the .js extension for ESM
import authRoutes from './routes/auth.routes';
import gameRoutes from './routes/game.routes.js';
import orderRoutes from './routes/order.routes.js';

const app = express();

app.use(express.json());

// Serve Swagger Interactive Docs
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger Docs available at http://localhost:${PORT}/docs`);
});
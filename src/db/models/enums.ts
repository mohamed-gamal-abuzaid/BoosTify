import { pgEnum } from 'drizzle-orm/pg-core';

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);
export const orderStatusEnum = pgEnum('order_status', ['PENDING', 'PAID', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']);
export const serviceTypeEnum = pgEnum('service_type', ['BOOSTING', 'ACCOUNT']);
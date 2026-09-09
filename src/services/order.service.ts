import { db } from '../db/index.js';
import { orders, subRanks, ranks, services } from '../db/schema.js';
import { eq, asc, gte, lte, and } from 'drizzle-orm';
import { CreateBoostingOrderInput, CreateAccountOrderInput } from '../schemas/order.schema.js';


export const calculateBoostingPrice = async (currentSubRankId: string, desiredSubRankId: string) => {
  // 1. جلب بيانات الـ SubRanks الحالية والمطلوبة
  const [currentSub] = await db.select().from(subRanks).where(eq(subRanks.id, currentSubRankId));
  const [desiredSub] = await db.select().from(subRanks).where(eq(subRanks.id, desiredSubRankId));

  if (!currentSub || !desiredSub) {
    throw new Error('neither the current nor the desired sub-rank exists');
  }


  const [currentRank] = await db.select().from(ranks).where(eq(ranks.id, currentSub.rankId));
  const [desiredRank] = await db.select().from(ranks).where(eq(ranks.id, desiredSub.rankId));

  if (
    desiredRank.order < currentRank.order ||
    (desiredRank.order === currentRank.order && desiredSub.order <= currentSub.order)
  ) {
    throw new Error('the desired rank must be higher than the current rank');
  }


  const allGameRanks = await db
    .select({ subRankId: subRanks.id, price: subRanks.price })
    .from(subRanks)
    .innerJoin(ranks, eq(subRanks.rankId, ranks.id))
    .where(eq(ranks.gameId, currentRank.gameId))
    .orderBy(asc(ranks.order), asc(subRanks.order));

 
  let totalPrice = 0;
  let startCounting = false;

  for (const item of allGameRanks) {
    if (item.subRankId === currentSubRankId) {
      startCounting = true;
      continue; 
    }
    if (startCounting) {
      totalPrice += Number(item.price);
    }
    if (item.subRankId === desiredSubRankId) {
      break;
    }
  }

  return totalPrice;
};


export const createBoostingOrder = async (userId: string, input: CreateBoostingOrderInput) => {
  const totalPrice = await calculateBoostingPrice(input.currentSubRankId, input.desiredSubRankId);

  const [newOrder] = await db
    .insert(orders)
    .values({
      userId,
      gameId: input.gameId,
      type: 'BOOSTING',
      status: 'PENDING',
      totalAmount: totalPrice.toString(),
      orderDetails: {
        ...input.orderDetails,
        currentSubRankId: input.currentSubRankId,
        desiredSubRankId: input.desiredSubRankId,
      },
    })
    .returning();

  return newOrder;
};


export const createAccountOrder = async (userId: string, input: CreateAccountOrderInput) => {
  const [service] = await db.select().from(services).where(eq(services.id, input.serviceId));

  if (!service) {
    throw new Error('the service or account does not exist');
  }

  const [newOrder] = await db
    .insert(orders)
    .values({
      userId,
      gameId: input.gameId,
      serviceId: input.serviceId,
      type: 'ACCOUNT',
      status: 'PENDING',
      totalAmount: service.price,
      orderDetails: input.orderDetails,
    })
    .returning();

  return newOrder;
};


export const getUserOrders = async (userId: string) => {
  return await db.select().from(orders).where(eq(orders.userId, userId));
};
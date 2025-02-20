import { eq } from "drizzle-orm";
import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface SubscribeToEventParams {
  name: string;
  email: string;
  referrerId?: string | null
}

export async function subscribeToEvent({
  email,
  name,
  referrerId
}: SubscribeToEventParams) {
  const subscribers = await db.select().from(subscriptions).where(eq(subscriptions.email, email));

  if (subscribers.length > 0) {
    return {
      subscriberId: subscribers[0].id,
    };
  }

  const [subscription] = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning();

  if(referrerId) {
    await redis.zincrby('referral:ranking', 1, referrerId)
  }

  return {
    subscriberId: subscription.id,
  };
}

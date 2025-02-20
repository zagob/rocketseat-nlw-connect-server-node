import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";

interface SubscribeToEventParams {
  name: string;
  email: string;
}

export async function subscribeToEvent({
  email,
  name,
}: SubscribeToEventParams) {
  const [subscription] = await db
    .insert(subscriptions)
    .values({
      name,
      email,
    })
    .returning();

  return {
    subscriberId: subscription.id,
  };
}

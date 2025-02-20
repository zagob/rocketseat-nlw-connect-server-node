import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import { redis } from "../redis/client";

interface GetSubscriberInviteClicksParams {
  subscriberId: string;
}

export async function getSubscriberInviteClicks({
  subscriberId,
}: GetSubscriberInviteClicksParams) {
  const count = await redis.hget("referral:access-count", subscriberId);
  return { count: count ? Number.parseInt(count) : 0 };
}

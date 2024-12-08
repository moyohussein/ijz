"use server";

import { db } from "~/db";
import { User, usersTable } from "~/db/schema";
import { eq } from "drizzle-orm";

export async function updateCurrentStore(userId: string, storeId: string) {
  try {
    await db
      .update(usersTable)
      .set({ currentStoreId: storeId } as User)
      .where(eq(usersTable.id, userId));
  } catch (error) {
    console.error("Error updating currentStoreId:", error);
    throw new Error("Failed to update current store.");
  }
}

export async function getCurrentStoreId(userId: string) {
  const user = await db
    .select({ currentStoreId: usersTable.currentStoreId })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  return user[0]?.currentStoreId || "";
}

"use server";

import { db } from "@/db";
import { OrderStatus } from "@prisma/client";

interface ChangeOrderStatusProps {
  id: string;
  newStatus: OrderStatus;
}

export const changeOrderStatus = async ({
  id,
  newStatus,
}: ChangeOrderStatusProps) => {
  await db.order.update({
    where: { id },
    data: { status: newStatus },
  });
};

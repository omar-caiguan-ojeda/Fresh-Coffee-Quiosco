/*
  Warnings:

  - You are about to drop the `OrderProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_orderId_fkey";

-- DropForeignKey
ALTER TABLE "OrderProduct" DROP CONSTRAINT "OrderProduct_productId_fkey";

-- DropTable
DROP TABLE "OrderProduct";

-- CreateTable
CREATE TABLE "OrderProducts" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderProducts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderProducts" ADD CONSTRAINT "OrderProducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

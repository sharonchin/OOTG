/*
  Warnings:

  - You are about to drop the column `cafeContact` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `cafeEmail` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `cafeImg` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `cafeLoc` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `cafeName` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `cafeOperatingHour` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `cafePassword` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Cafe` table. All the data in the column will be lost.
  - You are about to drop the column `cafeSlug` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productAvailability` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productDesc` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productImg` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productPrice` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Cafe` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNo]` on the table `Cafe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Cafe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `locId` to the `Cafe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Cafe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operatingHour` to the `Cafe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Cafe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNo` to the `Cafe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cafeId` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desc` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CafeCategory" AS ENUM ('FOOD', 'BEVERAGE', 'FOOD_BEVERAGE');

-- CreateEnum
CREATE TYPE "DeliveryMode" AS ENUM ('CAR', 'MOTORCYCLE', 'FOOT');

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_cafeSlug_fkey";

-- DropIndex
DROP INDEX "Cafe_slug_key";

-- AlterTable
ALTER TABLE "Cafe" DROP COLUMN "cafeContact",
DROP COLUMN "cafeEmail",
DROP COLUMN "cafeImg",
DROP COLUMN "cafeLoc",
DROP COLUMN "cafeName",
DROP COLUMN "cafeOperatingHour",
DROP COLUMN "cafePassword",
DROP COLUMN "slug",
ADD COLUMN     "cafeCategory" "CafeCategory" NOT NULL DEFAULT 'FOOD',
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "img" TEXT DEFAULT 'cafe_placeholder_dc8er7',
ADD COLUMN     "locId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "operatingHour" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "cafeSlug",
DROP COLUMN "productAvailability",
DROP COLUMN "productDesc",
DROP COLUMN "productImg",
DROP COLUMN "productName",
DROP COLUMN "productPrice",
ADD COLUMN     "availability" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "cafeId" TEXT NOT NULL,
ADD COLUMN     "desc" TEXT NOT NULL,
ADD COLUMN     "img" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" DECIMAL(65,30) NOT NULL;

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rider" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "deliveryMode" "DeliveryMode" NOT NULL,
    "vehicleNo" TEXT,

    CONSTRAINT "Rider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderLine" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "studentNote" TEXT,

    CONSTRAINT "OrderLine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "location" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_phoneNo_key" ON "Student"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "Rider_email_key" ON "Rider"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Rider_phoneNo_key" ON "Rider"("phoneNo");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_email_key" ON "Cafe"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_phoneNo_key" ON "Cafe"("phoneNo");

-- AddForeignKey
ALTER TABLE "Cafe" ADD CONSTRAINT "Cafe_locId_fkey" FOREIGN KEY ("locId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_cafeId_fkey" FOREIGN KEY ("cafeId") REFERENCES "Cafe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderLine" ADD CONSTRAINT "OrderLine_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

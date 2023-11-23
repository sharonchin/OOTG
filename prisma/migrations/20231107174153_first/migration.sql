-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('NOODLE', 'RICE', 'WESTERN', 'BEVERAGE');

-- CreateTable
CREATE TABLE "Cafe" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cafeName" TEXT NOT NULL,
    "cafeImg" TEXT NOT NULL,
    "cafeEmail" TEXT NOT NULL,
    "cafePassword" TEXT NOT NULL,
    "cafeContact" TEXT NOT NULL,
    "cafeLoc" TEXT NOT NULL,
    "cafeOperatingHour" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Cafe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productName" TEXT NOT NULL,
    "productImg" TEXT,
    "productCategory" "ProductCategory" NOT NULL,
    "productDesc" TEXT NOT NULL,
    "productPrice" DECIMAL(65,30) NOT NULL,
    "productAvailability" BOOLEAN NOT NULL DEFAULT true,
    "cafeSlug" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DECIMAL(65,30) NOT NULL,
    "products" JSONB[],
    "status" TEXT NOT NULL,
    "intent_id" TEXT,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cafe_slug_key" ON "Cafe"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Order_intent_id_key" ON "Order"("intent_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_cafeSlug_fkey" FOREIGN KEY ("cafeSlug") REFERENCES "Cafe"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;

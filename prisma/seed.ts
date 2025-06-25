import { categories } from "./data/categories";
import { products } from "./data/products";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
    try {
        // For PostgreSQL, TRUNCATE is used to clear tables and reset sequences.
        await prisma.$executeRaw`TRUNCATE TABLE "Category", "Product", "Order", "OrderProduct" RESTART IDENTITY CASCADE;`;

        await prisma.category.createMany({
            data: categories
        });
        await prisma.product.createMany({
            data: products
        });
    } catch (error) {
        console.log(error);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
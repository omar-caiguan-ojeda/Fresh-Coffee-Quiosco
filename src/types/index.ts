import { Order, OrderProducts, Product } from "@prisma/client";

export type OrderItem = Pick<Product, 'id' | 'name' | 'price' > & {
    quantity: number;
    subTotal: number;
};

export type OrderWithProducts = Order & {
    orderProducts: (OrderProducts & {
        product: Product
    })[]
}
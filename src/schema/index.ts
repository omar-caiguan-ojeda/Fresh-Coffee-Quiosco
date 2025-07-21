import { z } from "zod";

export const OrderSchema = z.object({
    name: z.string()
        .min(1, 'Tu nombre es obligatorio'),
    total: z.number()
        .min(1, 'Hay errores en tu pedido'),    
    order: z.array(z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        quantity: z.number(),
        subTotal: z.number(),
    })),    
});

export const OrderIdSchema =  z.object({
    orderId: z.string()
        .transform((value) => parseInt(value))
        .refine(value => value > 0, { message: 'El id de la orden es invalido' }),
})

export const SearchSchema = z.object({
    search: z.string()
    .trim() 
    .min(1, 'El campo de busqueda es obligatorio')
    .max(50, 'El campo de busqueda debe tener menos de 50 caracteres')
})
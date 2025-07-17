"use server"

import { prisma } from "@/src/lib/prisma"
import { OrderIdSchema } from "@/src/schema"

export async function completeOrderAction(formData: FormData) {

    // const orderId = formData.get('order_id')!
    // console.log(orderId)

    const data = {
        orderId: formData.get('order_id')!,
    }

    const result = OrderIdSchema.safeParse(data)

    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }

    try {
        await prisma.order.update({
            where: {
                id: +orderId
            },
            data: {
                status: true,
                orderReadyAt: new Date()
            }
        })
    } catch (error) {
        
    }
    console.log('Completar orden')
}


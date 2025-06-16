"use server"

import { OrderSchema } from "@/src/schema"

export async function createOrderAction(data: unknown) {
    const result = OrderSchema.safeParse(data)

    if(!result.success) {

        return {
            errors: result.error.issues
        }


        /*
        return {
            success: false,
            errors: result.error.issues.map(issue => issue.message)
        }
        */
    }

    try {
        
    } catch (error) {
        console.log(error)
    }
}
"use server"

import { prisma } from "@/src/lib/prisma"
import { ProductSchema } from "@/src/schema"
import { toast } from "react-toastify"

export const createProductAction = async (data: unknown) => {
    const result = ProductSchema.safeParse(data)
    if (!result.success) {
        return {
            errors: result.error.issues
        }
    }
    await prisma.product.create({
        data: result.data 
    })
}

// export const createProductAction = async (formData: FormData) => {
//     const data = {
//         name: formData.get('name'),
//         price: formData.get('price'),
//         categoryId: formData.get('categoryId'),
//         image: formData.get('image'),
//     }
//     const result = ProductSchema.safeParse(data)
//     if (!result.success) {
//         result.error.issues.forEach(issue => {
//             toast.error(issue.message)
//         })
//         return
//     }
// }
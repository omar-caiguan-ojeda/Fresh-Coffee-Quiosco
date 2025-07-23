"use server"

import { revalidatePath } from 'next/cache'
import { prisma } from "@/src/lib/prisma"
import { redirect } from "next/navigation"

export async function deleteProductAction(formData: FormData) {
    const id = formData.get('product_id')
    if (!id) return { error: 'ID de producto no proporcionado' }
    try {
        await prisma.product.delete({ where: { id: Number(id) } })
        revalidatePath('/admin/products')
        redirect('/admin/products/deleted-success')
    } catch (error) {
        return { error: 'No se pudo eliminar el producto' }
    }
}

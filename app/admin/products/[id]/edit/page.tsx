import { prisma } from "@/src/lib/prisma"
import { notFound, redirect } from "next/navigation"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: {
            id //: parseInt(id)
        }
    })
    if (!product) {
        notFound()
    }
    return product
}


export default async function EditProductPage({params}: {params: {id: string}}) {
    const product = await getProductById(parseInt(params.id))
    console.log(product)
    return (
        <div>
            <h1>Editar Producto</h1>
        </div>
    )
}
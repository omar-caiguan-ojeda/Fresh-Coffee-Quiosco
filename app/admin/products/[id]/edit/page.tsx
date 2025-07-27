import EditProductForm from "@/components/products/EditProductForm"
import ProductForm from "@/components/products/ProductForm"
import Heading from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { notFound } from "next/navigation"

import GoBackButton from "@/components/ui/GoBackButton"

async function getProductById(id: number) {
    const product = await prisma.product.findUnique({
        where: { id },
        include: { category: true }
    })
    if (!product) {
        notFound()
    }
    return product
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = await getProductById(parseInt(id))

    return (
        <div>
            <Heading>Editar Producto: {product.name}</Heading>

            <GoBackButton />

            <EditProductForm
                product={{
                  name: product.name,
                  price: product.price,
                  categoryId: product.categoryId,
                  categoryName: product.category?.name || ''
                }}
            >
                <ProductForm 
                    product={product}
                />
            </EditProductForm>
        </div>
    )
}
'use client'

import { ProductSchema } from "@/src/schema"
import { toast } from "react-toastify"
import { useParams, useRouter } from "next/navigation"
import { updateProductAction } from "@/actions/update-product-action"
import { deleteProductAction } from "@/actions/delete-product-action"
import Modal from "@/components/ui/Modal"
import { useState, useRef } from "react"

type EditProductFormProps = {
  children: React.ReactNode,
  product: {
    name: string;
    price: number;
    categoryId: number;
    categoryName?: string;
  }
}

export default function EditProductForm({ children, product }: EditProductFormProps) {

    const router = useRouter()
    const params = useParams()
    const id = +params.id!

    async function handleSubmit(formData: FormData) {
        const data = {
            name: formData.get('name'),
            price: formData.get('price'),
            categoryId: formData.get('categoryId'),
            image: formData.get('image'),
        }

        const result = ProductSchema.safeParse(data)
        if (!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }

        const response = await updateProductAction(result.data, id)
        if (response?.errors) {
            response.errors.forEach(issue => {
                toast.error(issue.message)
            })
            return
        }
        toast.success("Producto actualizado exitosamente")
        router.push('/admin/products')
    }

    function handleAction(formData: FormData) {
        handleSubmit(formData)
        return;
    }

    const [isOpen, setIsOpen] = useState(false);
    const deleteFormRef = useRef<HTMLFormElement>(null);


    const handleDelete = () => setIsOpen(true);
    const handleConfirmDelete = () => {
      if (deleteFormRef.current) {
        deleteFormRef.current.requestSubmit();
        setIsOpen(false);
      }
    };
    const handleCancelDelete = () => setIsOpen(false);

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-2xl mx-auto">
            <form
                className="space-y-5"
                action={handleAction}
            >
                { children }

                <input 
                    type="submit" 
                    className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                    value="Guardar Cambios"
                />
            </form>

            <button
                className="bg-red-600 hover:bg-red-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
                onClick={handleDelete}
            >
                Eliminar Producto
            </button>

            <form ref={deleteFormRef} method="POST" className="hidden" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(deleteFormRef.current!);
                await deleteProductAction(formData);
            }}>
                <input type="hidden" name="product_id" value={id} />
            </form>

            <Modal isOpen={isOpen} onClose={handleCancelDelete}>
                <h3 className="text-xl font-bold mb-4 text-amber-600">¿Confirmar eliminación del producto?</h3>
                <div className="mb-4">
                  <p className="font-semibold">Nombre: <span className="font-normal">{product.name}</span></p>
                  <p className="font-semibold">Precio: <span className="font-normal">{product.price}</span></p>
                  <p className="font-semibold">Categoría: <span className="font-normal">{product.categoryName ?? product.categoryId}</span></p>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                    onClick={handleCancelDelete}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded"
                    onClick={handleConfirmDelete}
                  >
                    Eliminar
                  </button>
                </div>
            </Modal>
        </div>
    )
}
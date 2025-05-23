"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
  product: Product
}   

export default function AddProductButton({ product }: AddProductButtonProps) {
    const addToOrder = useStore((state) => state.addToOrder)

    return (
        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white font-bold p-3 rounded mt-5 w-full uppercase cursor-pointer"
            onClick={() => addToOrder(product)}
        >Agregar</button> 
    )
}

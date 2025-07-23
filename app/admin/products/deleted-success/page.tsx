import Link from "next/link"
import Heading from "@/components/ui/Heading"

export default function DeletedSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Heading>Producto eliminado exitosamente</Heading>
      <p className="my-6 text-lg text-gray-700">El producto fue eliminado de la base de datos.</p>
      <Link href="/admin/products">
        <span className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded shadow transition-all">
          Volver a la lista de productos
        </span>
      </Link>
    </div>
  )
}

import Link from 'next/link'
import React from 'react'

type ProductsPaginationProps = {
  page: number
  totalPages: number
}

export default function ProductsPagination({page, totalPages}: ProductsPaginationProps) {
  return (
    <nav className="flex justify-center py-10">

      { page > 1 && (
            // <Link href={`/admin/products?page=${page + 1}`} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            //     Siguiente
            // </Link>
            <Link
                href={`/admin/products?page=${page - 1}`}
                className="bg-white px-4 py-2 test-sm test-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" 
            >&laquo;</Link>
        )}

      { page < totalPages && (
            // <Link href={`/admin/products?page=${page + 1}`} className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
            //     Siguiente
            // </Link>
            <Link
                href={`/admin/products?page=${page + 1}`}
                className="bg-white px-4 py-2 test-sm test-gray-900 ring-1 ring-inset ring-gray-300 focus:z-20 focus:outline-offset-0" 
            >&raquo;</Link>
        )}

      
    </nav>
  )
}

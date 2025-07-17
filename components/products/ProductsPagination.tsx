import Link from 'next/link'
import React from 'react'

type ProductsPaginationProps = {
  page: number
}

export default function ProductsPagination({page}: ProductsPaginationProps) {
  return (
    <nav className="flex justify-center py-10">
      <Link
        href={`/admin/products?page=${page + 1}`}
      >&raquo;</Link>
    </nav>
  )
}

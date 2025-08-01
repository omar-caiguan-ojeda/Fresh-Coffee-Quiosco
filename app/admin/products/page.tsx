import ProductSearchForm from "@/components/products/ProductSearchForm";
import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

async function productCount(){
  return await prisma.product.count()
}

async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize;

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
    orderBy: { id: "asc" }, // Recomendado para paginación consistente
  });

  return products;
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const sp = await searchParams;
  const pageParam = Array.isArray(sp.page) ? sp.page[0] : sp.page;
  const pageNum = parseInt(pageParam ?? "1", 10);
  if (!Number.isFinite(pageNum) || pageNum < 1) {
    redirect(`/admin/products?page=1`);
  }
  const page = pageNum;

  const pageSize = 10;

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();

  const [ products, totalProducts ] = await Promise.all([productsData, totalProductsData]);  
  const totalPages = Math.ceil(totalProducts / pageSize);

  if (page > totalPages) redirect(`/admin/products?page=${totalPages}`)

  return (
    <>
      <Heading>Administrar Productos</Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link 
            href="/admin/products/new"
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 rounded-md text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>

        <ProductSearchForm />

      </div>

      <ProductsTable products={products} />
      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}

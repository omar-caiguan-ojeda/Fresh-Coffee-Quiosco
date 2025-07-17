// import ProductsTable from "@/components/products/ProductsTable";
// import Heading from "@/components/ui/Heading";
// import { prisma } from "@/src/lib/prisma";


// async function getProducts (page: number, pageSize: number) {
//   const skip = (page -1) * pageSize
//   const products = await prisma.product.findMany({
//     take: pageSize,
//     skip,
//     include: {
//       category: true
//     }
//   })
//   return products
// }

// export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

// export default async function ProductsPage({searchParams}: {searchParams: { page: string }}) {
//   const page = +searchParams.page || 1
//   const pageSize = 10
//   const products = await getProducts(page, pageSize)
//   //console.log(products)

//   return (
//     <>
//     <Heading>
//         Administrar Productos
//     </Heading>

//     <ProductsTable 
//       products={products}
//     />
    
//     </>
//   )
// }



import ProductsPagination from "@/components/products/ProductsPagination";
import ProductsTable from "@/components/products/ProductsTable";
import Heading from "@/components/ui/Heading";
import { prisma } from "@/src/lib/prisma";

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
  const page = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;

  const pageSize = 10;

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount();

  const [ products, totalProducts ] = await Promise.all([productsData, totalProductsData]);  

  console.log(totalProducts);

  return (
    <>
      <Heading>Administrar Productos</Heading>
      <ProductsTable products={products} />
      <ProductsPagination
        page={page}
      />
    </>
  );
}

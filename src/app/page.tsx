// app/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import ProductList from "@/components/ProductList";
import Navbar from "@/components/Navbar";
import ClientActions from "@/components/ClientActions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen p-8">
      <Navbar/>
      
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to Our E-commerce Store
        </h1>
        <ClientActions session={session} />
      </div>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="border-4 border-yellow-400 p-4">
          <ProductList />
        </div>
      </section>
    </main>
  );
}
// app/page.tsx
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/lib/auth';
// import Navbar from '@/components/Navbar';
// import ClientActions from '@/components/ClientActions';

// export default async function Home() {
//   const session = await getServerSession(authOptions);

//   return (
//     <>
//       <Navbar />
//       <main>
//         <h1>Welcome to Our Store</h1>
//         <ClientActions session={session} />
//       </main>
//     </>
//   );
// }

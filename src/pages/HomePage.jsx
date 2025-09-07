import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const { products, loading, error } = useProducts();

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 bg-gray-800 rounded-lg mb-12">
        <h1 className="text-5xl font-extrabold text-orange-500">RusmbaShop</h1>
        <p className="text-xl text-gray-300 mt-4">
          Temukan Produk Terbaik Hanya untuk Anda
        </p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Produk Kami</h2>
        {loading ? (
          <p className="text-center text-gray-400">Memuat produk...</p>
        ) : error ? (
          <p className="text-center text-gray-400">Gagal memuat produk.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

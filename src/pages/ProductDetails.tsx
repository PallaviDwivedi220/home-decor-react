import { useParams, Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useCart } from '@/store/cart';
import { useMemo } from 'react';
import { motion } from 'framer-motion';
import ImageCarousel from '@/components/ImageCarousel';
import { Rating } from '@/components/Rating';
import ProductCardCompact from '@/components/ProductCardCompact';

export default function ProductDetails() {
  const { id } = useParams();
  const add = useCart((s) => s.add);
  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <p className="text-gray-700">Product not found.</p>
        <Link to="/products" className="mt-4 inline-flex rounded-md bg-yellow-600 px-4 py-2 text-white">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <div className="container py-10">
      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ImageCarousel images={product.images} />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold text-gray-900">{product.title}</h1>
          <div className="flex items-center gap-3">
            <div className="text-xl text-gray-900">${product.price}</div>
            <Rating value={product.rating} count={(product as any).ratingCount} size={16} showValue />
          </div>
          <p className="text-gray-700 leading-relaxed">{product.description}</p>
          <div className="flex gap-3 pt-2">
            <button onClick={() => add(product, 1)} className="inline-flex items-center justify-center rounded-md bg-yellow-600 px-5 py-2.5 text-white hover:bg-yellow-700">
              Add to Cart
            </button>
            <Link to="/cart" className="inline-flex items-center justify-center rounded-md ring-1 ring-gray-300 px-5 py-2.5 text-gray-900 hover:bg-gray-50">
              Go to Cart
            </Link>
          </div>
          <div className="text-sm text-gray-500">Category: {product.category} · Style: {product.style}</div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Related items</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCardCompact key={p.id} product={p} onAdd={() => add(p, 1)} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

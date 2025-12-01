import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container grid lg:grid-cols-2 gap-8 items-center py-16">
          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900"
            >
              Curate a home that feels warm, premium and truly you.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600 max-w-prose"
            >
              Discover wall art, lamps, rugs, indoor plants and furniture crafted to elevate your everyday living.
            </motion.p>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-md bg-yellow-600 px-6 py-3 text-white shadow-soft hover:bg-yellow-700 transition"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="aspect-[4/3] w-full rounded-xl bg-[url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center shadow-soft"
            aria-label="Home decor hero image"
          />
        </div>
      </section>

      {/* Featured */}
      <section className="container py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Featured</h2>
          <Link to="/products" className="text-sm text-gray-700 hover:text-gray-900">View all</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { title: 'Wall Art', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800&auto=format&fit=crop' },
            { title: 'Lamps', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop' },
            { title: 'Rugs', img: 'https://images.unsplash.com/photo-1523461811963-7f1023ca3cfe?q=80&w=800&auto=format&fit=crop' },
            { title: 'Plants', img: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?q=80&w=800&auto=format&fit=crop' },
            { title: 'Furniture', img: 'https://images.unsplash.com/photo-1505692794403-34d4982fd1ab?q=80&w=800&auto=format&fit=crop' },
          ].map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer overflow-hidden rounded-xl bg-white ring-1 ring-gray-200 shadow-soft"
            >
              <div
                className="aspect-square bg-cover bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900">{item.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

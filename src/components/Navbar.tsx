import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, Leaf } from 'lucide-react';
import { useCart, type CartState } from '@/store/cart';

export default function Navbar() {
  const count = useCart((s: CartState) => s.count());
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-yellow-600" />
          <span className="font-semibold tracking-wide">CasaAura</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/products" className={({isActive}) => isActive ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}>Shop</NavLink>
          <NavLink to="/contact" className={({isActive}) => isActive ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}>Contact</NavLink>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm text-gray-700 hover:text-gray-900">Login</Link>
          <Link to="/cart" className="relative inline-flex items-center">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Cart</span>
            <span className="absolute -top-2 -right-2 rounded-full bg-yellow-600 text-white text-[10px] px-1.5 py-0.5">{count}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

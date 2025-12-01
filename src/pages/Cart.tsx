import { Link } from 'react-router-dom'
import { useCart } from '@/store/cart'
import { toast } from 'sonner'

export default function Cart() {
  // Select each piece separately to avoid new object creation every render
  const items = useCart((s) => s.items)
  const update = useCart((s) => s.update)
  const remove = useCart((s) => s.remove)
  const clear = useCart((s) => s.clear)

  // Compute total locally from items to avoid extra store calls during render
  const total = items.reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div className="text-gray-700">
          Your cart is empty.{' '}
          <Link to="/products" className="text-gray-900 underline">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 rounded-xl ring-1 ring-gray-200 bg-white p-3 shadow-soft">
                <div
                  className="h-24 w-24 rounded-lg bg-cover bg-center ring-1 ring-gray-200"
                  style={{ backgroundImage: `url(${product.images[0]})` }}
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{product.title}</div>
                  <div className="text-sm text-gray-700">${product.price}</div>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="text-sm text-gray-600">Qty</label>
                    <select
                      value={quantity}
                      onChange={(e) => update(product.id, Number(e.target.value))}
                      className="rounded-md border border-gray-300 px-2 py-1 text-sm"
                    >
                      {Array.from({ length: 10 }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => { remove(product.id); toast.success('Removed from cart'); }}
                      className="ml-auto text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-xl ring-1 ring-gray-200 bg-white p-4 h-max shadow-soft">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-700 mb-1">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <button className="w-full rounded-md bg-yellow-600 text-white px-4 py-2.5 hover:bg-yellow-700">Checkout</button>
            <button onClick={() => { clear(); toast.success('Cart cleared'); }} className="mt-3 w-full rounded-md ring-1 ring-gray-300 px-4 py-2.5 text-gray-900 hover:bg-gray-50">Clear cart</button>
          </div>
        </div>
      )}
    </div>
  )
}

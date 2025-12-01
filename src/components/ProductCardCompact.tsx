import { Link } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Rating } from '@/components/Rating'

export type ProductLike = {
  id: number | string
  title: string
  price: number
  images: string[]
  rating?: number
  ratingCount?: number
}

type Props = {
  product: ProductLike
  onAdd?: () => void
}

export default function ProductCardCompact({ product, onAdd }: Props) {
  const img = product.images?.[0]
  const placeholderSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
      <rect width='600' height='600' fill='#e5e7eb'/>
      <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#6b7280' font-family='system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial' font-size='32'>No Image</text>
    </svg>`
  )
  const placeholder = `data:image/svg+xml;charset=utf-8,${placeholderSvg}`
  return (
    <Card className="overflow-hidden ring-1 ring-gray-200 bg-white shadow-soft transition hover:shadow-md flex flex-col h-full">
      <Link to={`/products/${product.id}`}>
        <div className="aspect-square bg-gray-100 overflow-hidden">
          {img ? (
            <img
              src={img}
              alt={product.title}
              className="h-full w-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.onerror = null
                e.currentTarget.src = placeholder
              }}
            />
          ) : null}
        </div>
      </Link>
      <CardContent className="p-4 flex flex-col grow">
        <div className="text-sm font-medium text-gray-900 line-clamp-2 min-h-[2.5rem] mb-2">{product.title}</div>
        <div className="flex items-center justify-between mb-2">
          <div className="text-[0.95rem] text-gray-900 font-semibold">${product.price}</div>
          {typeof product.rating === 'number' && (
            <Rating
              value={product.rating}
              count={product.ratingCount as number | undefined}
              showValue
              className="scale-90 origin-right"
            />
          )}
        </div>
        {onAdd && (
          <button
            onClick={onAdd}
            className="mt-auto inline-flex h-9 w-full items-center justify-center rounded-md bg-yellow-600 px-3 text-white text-sm hover:bg-yellow-700 transition"
          >
            Add to Cart
          </button>
        )}
      </CardContent>
    </Card>
  )
}

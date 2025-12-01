import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="container py-20 flex flex-col items-center text-center">
      <div className="text-7xl font-bold text-gray-900">404</div>
      <p className="mt-3 text-gray-700 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/">
          <Button>Go Home</Button>
        </Link>
        <Link to="/products">
          <Button variant="outline">Browse Products</Button>
        </Link>
      </div>
    </div>
  )
}

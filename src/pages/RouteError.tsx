import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function RouteError() {
  const error = useRouteError()
  let title = 'Something went wrong'
  let detail: string | undefined
  let status: number | undefined

  if (isRouteErrorResponse(error)) {
    status = error.status
    title = `${error.status} ${error.statusText}`
    detail = typeof error.data === 'string' ? error.data : undefined
  } else if (error instanceof Error) {
    detail = error.message
  }

  return (
    <div className="container py-20 text-center">
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {detail && <p className="mt-2 text-gray-700">{detail}</p>}
      {typeof status === 'number' && status === 404 ? (
        <div className="mt-6">
          <Link to="/"><Button>Go Home</Button></Link>
        </div>
      ) : (
        <div className="mt-6 flex items-center justify-center gap-3">
          <Button onClick={() => location.reload()}>Reload</Button>
          <Link to="/"><Button variant="outline">Go Home</Button></Link>
        </div>
      )}
    </div>
  )
}

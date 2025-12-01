export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="container py-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-600">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">CasaAura</h3>
          <p>Modern · Minimalist · Warm · Premium · Nature-inspired.</p>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Support</h4>
          <ul className="space-y-1">
            <li>Email: support@casaaura.com</li>
            <li>Phone: +1 (555) 123-4567</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Company</h4>
          <ul className="space-y-1">
            <li>About</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} CasaAura. All rights reserved.</div>
    </footer>
  )
}

import { FormEvent, useState } from 'react'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) return
    setTimeout(() => setSent(true), 300)
  }

  return (
    <div className="container py-12 grid lg:grid-cols-2 gap-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-gray-600 mb-6">We'd love to hear from you. Our team typically replies within 24 hours.</p>
        {sent ? (
          <div className="rounded-lg bg-green-50 text-green-800 p-4 ring-1 ring-green-200">Thank you! Your message has been sent.</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-600" />
            </div>
            <button className="rounded-md bg-yellow-600 px-5 py-2.5 text-white hover:bg-yellow-700">Send message</button>
          </form>
        )}
      </div>
      <div>
        <div className="rounded-xl ring-1 ring-gray-200 bg-gray-100 aspect-[4/3] flex items-center justify-center text-gray-600">Map placeholder</div>
        <div className="mt-6 text-sm text-gray-700">
          <div>Email: support@casaaura.com</div>
          <div>Phone: +1 (555) 123-4567</div>
        </div>
      </div>
    </div>
  )
}

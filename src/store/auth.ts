import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type User = { email: string }

type AuthState = {
  user: User | null
  login: (email: string, _password: string) => Promise<void>
  signup: (email: string, _password: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      async login(email) {
        // mock delay
        await new Promise((r) => setTimeout(r, 400))
        set({ user: { email } })
      },
      async signup(email) {
        await new Promise((r) => setTimeout(r, 500))
        set({ user: { email } })
      },
      logout() {
        set({ user: null })
      },
    }),
    { name: 'auth' }
  )
)

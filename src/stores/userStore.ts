import { create } from 'zustand'

interface UserState {
    name: string
    email: string
    isLogged: boolean
    actions: {
        setName: (name: string) => void
        setEmail: (email: string) => void
        login: () => void
        logout: () => void
    }
}

export const useUserStore = create<UserState>((set) => ({
    name: '',
    email: '',
    isLogged: false,
    actions: {
        setName: (name: string) => set({ name }),
        setEmail: (email: string) => set({ email }),
        login: () => set({ isLogged: true }),
        logout: () => set({ isLogged: false }),
    }
}))

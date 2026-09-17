import { create } from 'zustand'

interface UserState {
    id: string
    name: string
    email: string

    isLogged: boolean
    actions: {
        setName: (name: string) => void
        setEmail: (email: string) => void
        setId: (id: string) => void
        login: () => void
        logout: () => void
    }
}

export const useUserStore = create<UserState>((set) => ({
    id: '',
    name: '',
    email: '',
    isLogged: false,
    actions: {
        setName: (name: string) => set({ name }),
        setEmail: (email: string) => set({ email }),
        setId: (id: string) => set({ id }),
        login: () => set({ isLogged: true }),
        logout: () => set({ isLogged: false }),
    },
}))

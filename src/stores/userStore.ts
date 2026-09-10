import { create } from 'zustand'

interface UserState {
    name: string
    email: string
    isLogged: boolean
    accessToken: string | null
    login: () => void,
    actions: {
        setName: (name: string) => void,
        setEmail: (email: string) => void,
        setAccessToken: (accessToken: string | null) => void,
        logout: () => void,
    }
}

export const useUserStore = create<UserState>((set) => ({
    name: '',
    email: '',
    isLogged: false,
    accessToken: null,
    login: () => set({ isLogged: true }),
    actions: {
        setName: (name: string) => set({ name }),
        setEmail: (email: string) => set({ email }),
        setAccessToken: (accessToken: string | null) => set({ accessToken, isLogged: !!accessToken }),
        logout: () => set({ isLogged: false, accessToken: null }),
    }
}))
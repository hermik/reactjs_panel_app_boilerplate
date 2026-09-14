import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type AppLayoutStoreType = {
    isSidebarOpen: boolean
    isDarkMode: boolean
    toggleSidebar: () => void
    setSidebarOpen: (open: boolean) => void
    toggleDarkMode: () => void
}

/** Tylko dla pierwszego wejścia (brak jeszcze wpisu w localStorage) — potem liczy się zapisany wybór usera, nie system. */
const prefersDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches

export const useAppLayoutStore = create<AppLayoutStoreType>()(
    persist(
        (set) => ({
            isSidebarOpen: false,
            isDarkMode: prefersDarkMode(),
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            setSidebarOpen: (open) => set({ isSidebarOpen: open }),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        { name: 'app-layout' },
    ),
)

export const useSidebarOpen = () => useAppLayoutStore((state) => state.isSidebarOpen)

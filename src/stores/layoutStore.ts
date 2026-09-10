import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type AppLayoutStoreType = {
    isSidebarOpen: boolean
    isDarkMode: boolean
    toggleSidebar: () => void
    toggleDarkMode: () => void
}

export const useAppLayoutStore = create<AppLayoutStoreType>()(
    persist(
        (set) => ({
            isSidebarOpen: false,
            isDarkMode: false,
            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
        }),
        { name: 'app-layout' }
    )
)

export const useSidebarOpen = () => useAppLayoutStore((state) => state.isSidebarOpen);
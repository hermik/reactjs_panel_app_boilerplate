import { lazy, useEffect } from 'react'
import { useAppLayoutStore } from '@/stores/layoutStore'
import Layout from './components/layout/Layout'
import RequireAuth from './components/RequireAuth'
import RedirectOfAuth from './components/RedirectOfAuth'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import TablePage from './pages/TablePage'

import './App.css'

/* Lazy loading single pages */
const SearchPage = lazy(() => import('./pages/SearchPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContanctPage = lazy(() => import('./pages/ContactPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))
const SignupPage = lazy(() => import('./pages/SignupPage'))
const PostsPage = lazy(() => import('./pages/PostsPage'))

function App() {
    const isDarkMode = useAppLayoutStore((state) => state.isDarkMode)

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])
    return (
        <Routes>
            <Route element={<RedirectOfAuth />}>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/contact" element={<ContanctPage />} />
                    <Route path="/table" element={<TablePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/posts" element={<PostsPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App

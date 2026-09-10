import { lazy } from 'react'
import Layout from './components/layout/Layout'
import RequireAuth from './components/RequireAuth'
import RedirectOfAuth from './components/RedirectOfAuth'
import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import SearchPage from './pages/SearchPage'
// import AboutPage from './pages/AboutPage'
// import ContanctPage from './pages/ContactPage'

import './App.css'

/* Lazy loading single pages */
//const SearchPage = lazy(() => import('./pages/SearchPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContanctPage = lazy(() => import('./pages/ContactPage'))
const ProfilePage = lazy(() => import('./pages/ProfilePage'))


function App() {
  return (
       <Routes>
        <Route element={<RedirectOfAuth />}>
            <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<Layout />}>
            <Route path="/" element={<SearchPage />} />
            <Route path="About" element={<AboutPage />} />
            <Route path="Contact" element={<ContanctPage />} />
            <Route path="Profile" element={<ProfilePage />} />
          </Route>
        </Route>
       </Routes>
 
  )
}

export default App
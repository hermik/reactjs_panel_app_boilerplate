import { useEffect, useState } from 'react'
import Results from '../../components/Results'
import { useSearchQuery } from './useSearchQuery'

export default function SearchPage() {
    const [query, setQuery] = useState('')
    const [debouncedQuery, setDebouncedQuery] = useState('')

    useEffect(() => {
        if (!query.trim()) {
            setDebouncedQuery('')
            return
        }

        const timer = setTimeout(() => {
            setDebouncedQuery(query)
        }, 300)

        return () => clearTimeout(timer)
    }, [query])

    const { data, isLoading, error } = useSearchQuery(debouncedQuery)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div>
            <h1>Search Page</h1>
            <input type="text" placeholder="Search..." value={query} onChange={handleChange} />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <Results results={data ?? []} />
        </div>
    )
}

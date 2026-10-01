import { useEffect, useState } from 'react'
import Results from '../../components/Results'
import { useSearchQuery } from './useSearchQuery'
import { SearchInput } from '../../components/ui/search-input'
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
        }, 180)
        return () => clearTimeout(timer)
    }, [query])

    const { data, error } = useSearchQuery(debouncedQuery)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div className="p-4 w-full max-w-sm  gap-4 p-4">
            <h1 className="text-bold text-large text-center">
                Search{' '}
                <span className="text-transparent bg-clip-text bg-linear-to-tr from-pink-900 to-red-300">Page</span>
            </h1>
            <SearchInput type="text" placeholder="Search..." value={query} onChange={handleChange} />
            {/* {isLoading && <p>Loading...</p>} */}
            {error && <p>Error: {error.message}</p>}
            <Results query={debouncedQuery} results={data ?? []} />
        </div>
    )
}

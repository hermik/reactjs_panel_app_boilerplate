import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import Results from './Results'

export default function Search() {
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

    const { data, isLoading, error } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: async ({ signal }) => {
            const response = await fetch(
                `http://localhost:3000/v1/test/delay/500?query=${encodeURIComponent(debouncedQuery)}`,
                { signal }
            )
            return response.json()
        },
        enabled: !!debouncedQuery.trim(),
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }

    return (
        <div>
            <input type="text" placeholder="Search..." value={query} onChange={handleChange} />
            {isLoading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            <Results results={data ?? []} />
        </div>
    )
}

import { Card, CardContent } from '@/components/ui/card'
import { Link } from 'react-router-dom'

interface ResultProps {
    query: string
    results: string[]
}

/** Rozbija `text` na fragmenty wokół dopasowań `query` (bez uwzględniania wielkości liter) i pogrubia dopasowania. */
function highlightMatch(text: string, query: string) {
    const trimmed = query.trim()
    if (!trimmed) {
        return text
    }

    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'))

    return parts.map((part, index) =>
        part.toLowerCase() === trimmed.toLowerCase() ? (
            <strong key={index} className="font-semibold">
                {part}
            </strong>
        ) : (
            part
        ),
    )
}

export default function Results({ query, results }: ResultProps) {
    const items = Array.isArray(results) ? results.splice(0, 10) : []

    // if (items.length === 0) {
    //     return null
    // }

    return (
        <Card size="sm" className="mt-1">
            <CardContent className="flex flex-col gap-0.5 px-2">
                {items.map((result, index) => (
                    <Link to={`/posts/${result.id}`}>
                        <div
                            key={index}
                            className="cursor-pointer rounded-md px-3 py-2 text-sm text-foreground hover:bg-muted"
                        >
                            {highlightMatch(result.title, query)}
                        </div>
                    </Link>
                ))}
            </CardContent>
        </Card>
    )
}

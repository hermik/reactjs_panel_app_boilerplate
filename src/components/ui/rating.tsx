import { useRef, useState } from 'react'

const STARS = 5

interface RatingProps {
    id?: string
    name?: string
    value?: number
    'aria-invalid'?: boolean
}
export const Rating = ({ id, name, value, 'aria-invalid': ariaInvalid }: RatingProps) => {
    const [selectedRating, setSelectedRating] = useState<number | null>(value ?? null)
    const [hoverValue, setHoverValue] = useState<number | null>(null)
    const ratingRef = useRef<HTMLInputElement | null>(null)
    const displayedRating = hoverValue ?? selectedRating ?? value

    return (
        <div>
            {Array.from({ length: STARS }).map((_, i) => (
                <span
                    className={`cursor-pointer ${i < displayedRating ? 'text-yellow-500' : 'text-gray-400'}`}
                    key={i}
                    onMouseEnter={() => setHoverValue(i + 1)}
                    onMouseLeave={() => setHoverValue(null)}
                    onClick={() => setSelectedRating(i + 1)}
                >
                    {i < displayedRating ? '★' : '☆'}
                </span>
            ))}
            <input
                type="hidden"
                id={id}
                name={name}
                ref={ratingRef}
                value={displayedRating}
                aria-invalid={ariaInvalid}
            />
            <span className="ml-2 ">
                Rating: {displayedRating ?? '-'} / {STARS}
            </span>
        </div>
    )
}

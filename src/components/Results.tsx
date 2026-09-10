export default function Results({ results }: { results: any[] }) {

    const items = Array.isArray(results) ? results : []
    if (items.length === 0) {
        return (
            <div>
                <p>Results will appear here...</p>
            </div>
        )
    }
  return (
    <div>
      {items.map((result, index) => (
        <p key={index}>{result}</p>
      ))}
    </div>
  )
}
export default function Results({ results }: { results: any[] }) {

  const items = Array.isArray(results) ? results : []
   
  return (
    <div>
      {items.map((result, index) => (
        <p key={index}>{result.title}</p>
      ))}
    </div>
  )
}
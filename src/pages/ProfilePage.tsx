import { useUserStore } from '../stores/userStore'
import { useQuery } from '@tanstack/react-query';


export default function ProfilePage() {
    const { data: userData, isLoading } = useQuery({
        queryKey: ['user'],
    });
    const { data: comments, isLoading, error } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }
    });

    return (
        <div>
            <h2>Profile Page</h2>
            <div className="profile-content">
                <p>Name: {useUserStore((state) => state.name)}</p>
                <p>Email: {useUserStore((state) => state.email)}</p>
                <p>Status: {useUserStore((state) => (state.isLogged ? 'Logged In' : 'Logged Out'))}</p>
            </div>
            <div className="comments-section">
                <h3>Comments</h3>
                {isLoading && <p>Loading comments...</p>}
                {error && <p>Error loading comments: {error.message}</p>}
                {comments && (
                    <ul>
                        {comments.map((comment: any) => (
                            <li key={comment.id}>{comment.body}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

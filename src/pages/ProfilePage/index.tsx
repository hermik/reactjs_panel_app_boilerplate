import { useUserStore } from '../../stores/userStore'
import { useCommentsQuery } from './useCommentsQuery'

export default function ProfilePage() {
 
    const { data: comments, isLoading: isCommentsLoading, error: commentsError } = useCommentsQuery()
    const storeName = useUserStore((state) => state.name)
    const storeEmail = useUserStore((state) => state.email)
    const isLogged = useUserStore((state) => state.isLogged)

    return (
        <div>
            <h2>Profile Page</h2>
            <div className="profile-content">
                <p>Name: {storeName}</p>
                <p>Email: {storeEmail}</p>
                <p>Status: {isLogged ? 'Logged In' : 'Logged Out'}</p>
            </div>
            <div className="comments-section">
                <h3>Comments</h3>
                {isCommentsLoading && <p>Loading comments...</p>}
                {commentsError && <p>Error loading comments: {commentsError.message}</p>}
                {comments && (
                    <ul>
                        {comments.map((comment) => (
                            <li key={comment.id}>{comment.body}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

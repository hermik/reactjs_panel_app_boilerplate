import { useUserStore } from '../../stores/userStore'
import { useProfileQuery } from './useProfileQuery'
import { useCommentsQuery } from './useCommentsQuery'

export default function ProfilePage() {
    const { data: profile, isLoading: isProfileLoading } = useProfileQuery()
    const { data: comments, isLoading: isCommentsLoading, error: commentsError } = useCommentsQuery()

    return (
        <div>
            <h2>Profile Page</h2>
            <div className="profile-content">
                {isProfileLoading && <p>Loading profile...</p>}
                <p>Name: {profile?.name ?? useUserStore((state) => state.name)}</p>
                <p>Email: {profile?.email ?? useUserStore((state) => state.email)}</p>
                <p>Status: {useUserStore((state) => (state.isLogged ? 'Logged In' : 'Logged Out'))}</p>
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

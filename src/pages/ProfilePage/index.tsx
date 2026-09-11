import { useUserStore } from '../../stores/userStore'
import { useCommentsQuery } from '@/hooks/useCommentsQuery'
import { Mail, User } from 'lucide-react'

function getInitials(name: string): string {
    return name
        .split(' ')
        .slice(0, 2)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
}

const AVATAR_COLORS = [
    'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
    'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300',
    'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
    'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
    'bg-fuchsia-100 text-fuchsia-700 dark:bg-fuchsia-500/20 dark:text-fuchsia-300',
]

/** Deterministyczny kolor po treści `name` — ta sama osoba zawsze dostaje ten sam kolor awatara. */
function getAvatarColor(name: string): string {
    const hash = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)
    return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

export default function ProfilePage() {
    const { data: comments, isLoading: isCommentsLoading, error: commentsError } = useCommentsQuery()
    const storeName = useUserStore((state) => state.name)
    const storeEmail = useUserStore((state) => state.email)
    const isLogged = useUserStore((state) => state.isLogged)

    return (
        <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                {/* Profile panel */}
                <aside className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                            <User className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="mt-4 text-2xl font-bold tracking-tight"> Profile Page </h2>
                        <p className="mt-1 text-sm text-muted-foreground"> Account information </p>
                    </div>
                    <div className="mt-6 space-y-4 border-t pt-6">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Name</p>
                            <p className="mt-1 font-medium text-foreground"> {storeName} </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Email</p>
                            <p className="mt-1 break-all font-medium text-foreground"> {storeEmail} </p>
                        </div>
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</p>
                            <div className="mt-2 flex items-center gap-2">
                                <span
                                    className={`h-2.5 w-2.5 rounded-full ${isLogged ? 'bg-green-500' : 'bg-red-500'}`}
                                />
                                <span className="text-sm font-medium text-foreground">
                                    {isLogged ? 'Logged In' : 'Logged Out'}
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* Comments panel */}
                <section className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold tracking-tight"> Comments </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Recent comments associated with this profile.
                        </p>
                    </div>
                    {isCommentsLoading && (
                        <div className="rounded-lg border border-dashed p-8 text-center">
                            <p className="text-sm text-muted-foreground"> Loading comments... </p>
                        </div>
                    )}
                    {commentsError && (
                        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                            <p className="text-sm font-medium text-destructive">
                                Error loading comments: {commentsError.message}
                            </p>
                        </div>
                    )}
                    {comments && (
                        <ul className="space-y-3">
                            {comments.slice(0, 5).map((comment) => (
                                <li
                                    key={comment.id}
                                    className="group flex items-start gap-3 rounded-xl border bg-background p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <div
                                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${getAvatarColor(comment.name)}`}
                                    >
                                        {getInitials(comment.name)}
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate text-sm font-semibold capitalize text-foreground">
                                            {comment.name}
                                        </p>
                                        <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                                            <Mail className="size-3" />
                                            {comment.email}
                                        </p>
                                        <p className="mt-2.5 text-sm leading-relaxed whitespace-pre-line text-foreground/90">
                                            {comment.body}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </div>
    )
}

export default function AboutPage() {
    return (
        <div className="mx-auto max-w-4xl space-y-8  gap-4 p-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">About</h1>

                <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                    This application is a demonstration of{' '}
                    <a
                        href="https://github.com/hermik/reactjs_panel_app_boilerplate"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                    >
                        reactjs_panel_app_boilerplate
                    </a>
                    , a ready-to-extend React template designed for building dashboard and panel applications with
                    authentication.
                </p>

                <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                    The project demonstrates a practical application structure and includes several commonly used
                    libraries and patterns that can serve as a starting point for building larger React applications.
                </p>
            </div>

            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                <h2 className="text-xl font-semibold">Included technologies</h2>

                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                    <li className="rounded-lg bg-muted/50 p-4">
                        <span className="font-medium">Zustand</span>
                        <p className="mt-1 text-sm text-muted-foreground">Lightweight global state management.</p>
                    </li>

                    <li className="rounded-lg bg-muted/50 p-4">
                        <span className="font-medium">Zod</span>
                        <p className="mt-1 text-sm text-muted-foreground">Schema-based data validation.</p>
                    </li>

                    <li className="rounded-lg bg-muted/50 p-4">
                        <span className="font-medium">shadcn/ui + Tailwind CSS</span>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Modern and customizable UI components and styling.
                        </p>
                    </li>

                    <li className="rounded-lg bg-muted/50 p-4">
                        <span className="font-medium">TanStack React Query</span>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Server state management and API request handling.
                        </p>
                    </li>
                </ul>
            </div>

            <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
                <h2 className="text-xl font-semibold">Features demonstrated</h2>

                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                        <span className="font-bold text-primary">•</span>
                        Lazy-loaded pages to reduce the amount of code downloaded during the initial application load.
                    </li>

                    <li className="flex gap-3">
                        <span className="font-bold text-primary">•</span>
                        Debounced API requests demonstrated on the Search page.
                    </li>

                    <li className="flex gap-3">
                        <span className="font-bold text-primary">•</span>
                        An API wrapper supporting access tokens and automatic refresh-token handling.
                    </li>

                    <li className="flex gap-3">
                        <span className="font-bold text-primary">•</span>
                        Centralized error handling for API operations.
                    </li>
                </ul>
            </div>

            <div className="rounded-xl border border-dashed p-6">
                <h2 className="text-lg font-semibold">Backend recommendation</h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    The boilerplate can be used together with the{' '}
                    <a
                        href="https://github.com/hermik/node_restful_api"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-foreground underline underline-offset-4 hover:text-primary"
                    >
                        node_restful_api
                    </a>{' '}
                    project, which provides basic user-related routes, access and refresh token authentication, and
                    PostgreSQL database integration.
                </p>
            </div>

            <div className="border-t pt-6">
                <p className="text-sm text-muted-foreground">
                    The project is intended as a foundation rather than a finished application. It can be extended with
                    additional dashboard modules, registration, more shadcn/ui components, tests, and project-specific
                    functionality.
                </p>
            </div>
        </div>
    )
}

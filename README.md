# Simple ReactJS boilerplate for panel dashboard application

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

#Project libraries and features

- zustand for state management
- zod - for validation
- shadcn + tailwind for UI
- Tanstack react query - for api calls
- pages are lazy loaded (for bigger modules it will not download all code at startup)

#in this example you got:

- debounce example for api calls (SearchPage)
- implemented api wrapper to utilize access-token, refresh-token automaticaly (it requires proper api implementation that keeps refresh token in secure cookie - for more security)
- Error handling

Feel free to use it.

# Recommendations

The best way is to use it with this API https://github.com/hermik/node_restful_api
node_restful_api -> implements basic routes for creating users, utilizes access and refresh tokens, postgres db. Feel free to try this project

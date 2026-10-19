# UniqueToo account authentication

The account system is implemented without storing provider secrets in the browser.

## Email/password

Set `MONGODB_URI`, `MONGODB_DB` and `JWT_SECRET`. The signup route hashes passwords with bcrypt and creates the user in MongoDB. Sessions are stored in an HTTP-only cookie.

## Google OAuth

Create a Google OAuth Web Application and add:

- Local redirect: `http://localhost:3000/api/auth/oauth/google/callback`
- Production redirect: `https://uniquetoo.in/api/auth/oauth/google/callback`

Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`.

## Facebook OAuth

Create a Facebook Login/Web application and request `email` + `public_profile` permissions. Add:

- Local redirect: `http://localhost:3000/api/auth/oauth/facebook/callback`
- Production redirect: `https://uniquetoo.in/api/auth/oauth/facebook/callback`

Set `FACEBOOK_CLIENT_ID`, `FACEBOOK_CLIENT_SECRET`, and optionally `FACEBOOK_GRAPH_VERSION`.

## AI assistant

The existing UniqueToo AI assistant is connected to the Anthropic Messages API when `ANTHROPIC_API_KEY` is configured. The current default is `claude-sonnet-5`; keep the model configurable through `ANTHROPIC_MODEL` if needed. Without an API key, the assistant uses the local service-routing fallback instead of pretending an external model is running.

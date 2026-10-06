const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  process.env.FRONTEND_ORIGIN,
].filter(Boolean)

export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, 'origin')

  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    setResponseHeader(event, 'Access-Control-Allow-Origin', origin)
  }

  setResponseHeaders(event, {
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })

  if (event.node.req.method === 'OPTIONS') {
    event.node.res.statusCode = 204
    event.node.res.end()
  }
})
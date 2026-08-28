import crypto from 'node:crypto'

function clientAddress(request) {
  const value = request.headers['x-vercel-forwarded-for'] || request.headers['x-forwarded-for'] || request.socket?.remoteAddress || 'unknown'
  return String(Array.isArray(value) ? value[0] : value).split(',')[0].trim().slice(0, 80)
}

function hashedKey(request, scope, identity) {
  const secret = process.env.RATE_LIMIT_SECRET
  if (!secret || secret.length < 32) throw new Error('RATE_LIMIT_NOT_CONFIGURED')
  return crypto.createHmac('sha256', secret).update(`${scope}|${identity}|${clientAddress(request)}`).digest('hex')
}

export async function allowDistributedRequest(client, request, { scope, identity = 'anonymous', limit = 12, windowMs = 60_000 }) {
  if (!client || !/^[a-z0-9-]{2,60}$/.test(scope)) throw new Error('RATE_LIMIT_NOT_CONFIGURED')
  const windowSeconds = Math.max(1, Math.min(86_400, Math.ceil(windowMs / 1000)))
  const safeLimit = Math.max(1, Math.min(10_000, Math.trunc(limit)))
  const { data, error } = await client.rpc('consume_edu_rate_limit', {
    p_scope: scope,
    p_key_hash: hashedKey(request, scope, String(identity).slice(0, 160)),
    p_limit: safeLimit,
    p_window_seconds: windowSeconds,
  })
  if (error || typeof data !== 'boolean') throw new Error('RATE_LIMIT_UNAVAILABLE')
  return data
}

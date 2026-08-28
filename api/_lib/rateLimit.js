const buckets = globalThis.__eduPaymentRateLimits || new Map()
globalThis.__eduPaymentRateLimits = buckets

export function allowRequest(request, limit = 12, windowMs = 60_000) {
  const forwarded = request.headers['x-forwarded-for']
  const ip = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || request.socket?.remoteAddress || 'unknown').split(',')[0].trim().slice(0, 80)
  const now = Date.now()
  const bucket = buckets.get(ip)
  if (!bucket || now - bucket.startedAt >= windowMs) { buckets.set(ip, { count: 1, startedAt: now }); return true }
  if (bucket.count >= limit) return false
  bucket.count += 1
  return true
}

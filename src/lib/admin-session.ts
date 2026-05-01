import crypto from 'crypto'

export const ADMIN_COOKIE = 'admin_session'

function secret() {
  const pw = process.env.ADMIN_PASSWORD
  if (!pw) throw new Error('ADMIN_PASSWORD not set')
  return pw
}

export function expectedToken() {
  return crypto.createHmac('sha256', secret()).update('admin-session-v1').digest('hex')
}

export function verifyToken(token: string | undefined | null) {
  if (!token) return false
  const expected = expectedToken()
  if (token.length !== expected.length) return false
  try {
    return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(expected))
  } catch {
    return false
  }
}

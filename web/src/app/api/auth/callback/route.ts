import { api } from '@/lib/api'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  if (!code) {
    return new Response('No code provided', { status: 400 })
  }

  const registerResponse = await api.post('/register', { code })

  const { token } = registerResponse.data
  const redirectUrl = new URL('/', request.url)
  const cookieExpiresInSeconds = 60 * 60 * 24 * 30 // 30 days

  return NextResponse.redirect(redirectUrl, {
    headers: {
      'Set-Cookie': `token=${token}; Path=/; max-age=${cookieExpiresInSeconds}`,
    },
  })
}

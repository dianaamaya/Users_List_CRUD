import Link from 'next/link'
import { Container, Span } from './StyledNotFound'

export default function NotFound() {
  return (
    <Container>
      <h1>You got lost!</h1>
      <p>We are very sorry. The page you are looking for doesn’t exist (anymore).</p>

      <Link href='/home'>
        <Span>Go Home Page</Span>
      </Link>
    </Container>
  )
}

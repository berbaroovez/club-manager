import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../util/auth'
import Example from '../components/Navbar'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-slate-100 dark:bg-gray-800">
      <AuthProvider>
        <Example />
        <Component {...pageProps} />{' '}
      </AuthProvider>
    </div>
  )
}

export default MyApp

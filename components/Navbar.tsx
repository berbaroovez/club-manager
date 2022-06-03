import Link from 'next/link'
import { useAuth } from '../util/auth'
import { LogoutIcon } from '@heroicons/react/outline'
import NavbarLoginForm from './NavbarLoginForm'

const NavBar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="mb-8 bg-blue-900">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="flex h-12 items-center justify-between">
          <img src="/logo.png" className="h-8 w-8" />
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <a className="rounded px-4 py-2 font-semibold text-white hover:bg-blue-700">
                  Dashboard
                </a>
              </Link>

              <button
                className="rounded px-4 py-2 hover:bg-red-700"
                onClick={logout}
              >
                <LogoutIcon className="h-6 w-6 text-white " />
              </button>
            </div>
          ) : (
            <NavbarLoginForm />
            // <Link href="/">
            //   {/* <a className="rounded px-4 py-2 font-semibold text-white hover:bg-blue-700">
            //     Login
            //   </a> */}
            // </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar

import { useState } from 'react'
import { useAuth } from '../util/auth'

const NavbarLoginForm = () => {
  const { user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form
      className="flex gap-4"
      onSubmit={(e) => {
        e.preventDefault()
        login(email, password)
      }}
    >
      <input
        type="text"
        value={email}
        placeholder="Email"
        className="h-8 w-32 rounded border border-gray-400 px-2 ring-cyan-500 focus:outline-none focus:ring-1"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        required
        type="password"
        placeholder="Pasword"
        className=" h-8 w-32 rounded border-gray-400 px-2 ring-cyan-500 selection:rounded selection:border focus:outline-none focus:ring-1"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="h-8 rounded bg-blue-500 px-2   font-semibold text-white hover:bg-blue-600 focus:bg-blue-600">
        Login
      </button>
      {/* <a className="my-2 text-center text-blue-400">Forgot Pasword?</a>
      <hr />
      <button className="mt-8 mb-4 w-full rounded-lg bg-green-400 p-3 text-lg font-semibold text-white">
        Create New Account
      </button> */}
    </form>
  )
}

export default NavbarLoginForm

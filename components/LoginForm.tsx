import { useState } from 'react'
import { useAuth } from '../util/auth'

const LoginForm = () => {
  const { user, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <form
      className="mb-4 flex w-80 flex-col rounded-lg bg-white p-4 shadow-lg"
      onSubmit={(e) => {
        e.preventDefault()
        login(email, password)
      }}
    >
      <p className="mb-2 text-center text-2xl font-bold text-blue-400">Login</p>
      <input
        type="text"
        value={email}
        placeholder="Email"
        className="mb-3 rounded-md border border-gray-400 py-3 px-4 ring-cyan-500 focus:outline-none focus:ring-1"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        required
        type="password"
        placeholder="Pasword"
        className="mb-3 rounded-md border border-gray-400 py-3 px-4 ring-cyan-500 focus:outline-none focus:ring-1"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button className="w-full rounded-lg bg-blue-500 p-3 text-lg font-semibold text-white hover:bg-blue-600 focus:bg-blue-600">
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

export default LoginForm

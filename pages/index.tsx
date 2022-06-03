import type { NextPage } from 'next'
import Link from 'next/link'
import LoginForm from '../components/LoginForm'
import { useAuth } from '../util/auth'

//nextimage

const Home: NextPage = () => {
  const { user } = useAuth()
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      {/* <img
        src="/logo.png"
        // width={300}
        // height={300}
        // className="justify-self-start"
        className="self-center"
      /> */}
      <h1 className="mb-8 text-center text-2xl font-bold text-blue-400">
        Inter FC Team Managament System
      </h1>

      {/* <Link href="/about">
        <button className="w-32 self-center rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600 focus:bg-blue-600">
          Login
        </button>
      </Link> */}
      <LoginForm />

      <Link href="/schedule">
        <a className="text-lg text-gray-800 hover:underline">View Schedule</a>
      </Link>
      <p className="text-center text-sm text-gray-400">
        If you need an account please contact carter olson and he will assist
        you
      </p>
    </div>
  )
}

export default Home

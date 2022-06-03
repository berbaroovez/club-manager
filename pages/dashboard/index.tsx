import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../util/auth'
import { getTeams } from '../../util/firebase'
import { TeamInfo } from '../../util/types'

const dashboard = () => {
  const [teams, setTeams] = useState<TeamInfo[]>([])
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const grabAllTeams = async () => {
      const data = await getTeams()
      if (data !== undefined) {
        setTeams(data)
      }
    }
    grabAllTeams()
  }, [])

  if (user === null) {
    return <div>Please Login to see this page</div>
  }

  return (
    <div>
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
        Dashboard
      </h1>
      <div className="flex gap-8 ">
        <Link href="/dashboard/search-teams">
          <div className="w-64 rounded bg-slate-200 px-6 py-4 text-center shadow-md hover:cursor-pointer hover:bg-slate-400">
            Team Search
          </div>
        </Link>
        <Link href="/schedule">
          <div className="w-64 rounded bg-slate-200 px-6 py-4 text-center shadow-md hover:cursor-pointer hover:bg-slate-400">
            Schedule
          </div>
        </Link>
        <Link href="/dashboard/add-team">
          <div className="w-64 rounded bg-slate-200 px-6 py-4 text-center shadow-md hover:cursor-pointer hover:bg-slate-400">
            Add Team
          </div>
        </Link>

        {/* {teams?.map((team) => {
          return (
            <div className="col-span-2">
              <div className="rounded bg-gray-200 p-4">
                <Link href={`/dashboard/t/${team.docID}`}>
                  <a>{team.longName}</a>
                </Link>
              </div>
            </div>
          )
        })} */}
      </div>
    </div>
  )
}

export default dashboard

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../util/auth'
import { getTeams } from '../../util/firebase'
import { TeamInfo } from '../../util/types'
import { SearchIcon, CalendarIcon, UserAddIcon } from '@heroicons/react/outline'
import LinkCards from '../../components/dashboard/LinkCards'
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
      <div className="">
        <LinkCards
          url="/dashboard/search-teams"
          title={'Search Teams'}
          icon={<SearchIcon className="h-7 w-7" />}
        />
        <LinkCards
          url="/schedule"
          title={'Schedule'}
          icon={<CalendarIcon className="h-7 w-7 " />}
        />
        <LinkCards
          url="/dashboard/add-team"
          title={'Add Team'}
          icon={<UserAddIcon className="h-7 w-7 " />}
        />

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

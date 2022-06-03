import { useEffect, useState } from 'react'
import SearchTeamTable from '../../components/SearchTeamTable'
import { useAuth } from '../../util/auth'
import { getTeams } from '../../util/firebase'
import { TeamInfo } from '../../util/types'

const index = () => {
  const [teamList, setTeamList] = useState<TeamInfo[]>([])
  const { user } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeams()

      if (data !== undefined) {
        setTeamList(data)
      }
    }

    fetchData()
  }, [])

  if (user === undefined) {
    return (
      <div className="text-gray-800 dark:text-white">
        Please Login to View page
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center ">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white ">
        Search Table
      </h1>

      {teamList && <SearchTeamTable teamList={teamList} />}
    </div>
  )
}

export default index

import { useEffect, useState } from 'react'
import SearchTeamTable from '../../components/SearchTeamTable'
import { getTeams } from '../../util/firebase'
import { TeamInfo } from '../../util/types'

const index = () => {
  const [teamList, setTeamList] = useState<TeamInfo[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getTeams()

      if (data !== undefined) {
        setTeamList(data)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      Search Table
      {teamList && <SearchTeamTable teamList={teamList} />}
    </div>
  )
}

export default index

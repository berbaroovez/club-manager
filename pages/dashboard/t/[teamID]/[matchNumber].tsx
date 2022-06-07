import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getMatchInfo } from '../../../../util/firebase'
import { Game, NISLGame } from '../../../../util/types'

const MatchPage = () => {
  const router = useRouter()
  const { teamID, matchNumber } = router.query

  const [match, setMatch] = useState<NISLGame | Game>()

  useEffect(() => {
    const getMatch = async () => {
      if (matchNumber !== undefined && typeof matchNumber === 'string') {
        if (teamID !== undefined && typeof teamID === 'string') {
          const data = await getMatchInfo(teamID, matchNumber)
          console.log('DATA', data)
          if (data !== null) {
            setMatch(data)
          }
        }
      }
    }

    getMatch()
  }, [matchNumber, teamID])

  return (
    <div>
      {match !== undefined && (
        <div>
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white ">
            {match.matchNumber}
          </h1>
          <h2>
            {match.homeTeam} vs {match.awayTeam}
          </h2>
          <h3>{match.shortDate}</h3>
          <h3>{match.time}</h3>
          <h3>{match.location}</h3>
          <h3>{match.result}</h3>
        </div>
      )}
    </div>
  )
}

export default MatchPage

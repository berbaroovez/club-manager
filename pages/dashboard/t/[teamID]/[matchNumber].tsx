import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import FeedItem from '../../../../components/Feed/FeedItem'
import { useAuth } from '../../../../util/auth'
import { getMatchInfo, getTeamChangeLog } from '../../../../util/firebase'
import { ChangeLog, Game, NISLGame } from '../../../../util/types'

const MatchPage = () => {
  const {user} = useAuth()  
  const router = useRouter()
  const { teamID, matchNumber } = router.query
  const [gameChangeLog, setGameChangeLog] = useState<ChangeLog[]>()
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


          const changeLog = await getTeamChangeLog(teamID)
          console.log('Changes', changeLog)
          if (changeLog !== null) {
            
            //filter change log to only show changes for this matchNumber
            const filteredChangeLog = changeLog.filter(change => {
              return parseInt(change.matchNumber) === parseInt(matchNumber)
            })
            
            setGameChangeLog(filteredChangeLog)

          }
        }
      }


     
    }

    getMatch()
  }, [matchNumber, teamID])

  if (user === null) {
    return <div>Please Login to see this page</div>
  }

    if(match === undefined){
      return (  <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white ">
        Attempting to grab match info
      </h1>)
    }

  return (
   
      
        <div className='mx-auto max-w-4xl px-4'>
          <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white ">
            Match # {match.matchNumber} - {match.homeTeam} <span className='font-semibold text-blue-400'>vs</span> {match.awayTeam}
          </h1>
          <div className='rounded bg-slate-200 p-4 mb-4'>
         
          <p className='text-gray-900 text-xl'><span className='font-bold'>Match Date:</span> {match.shortDate}</p>
          <p className='text-gray-900 text-xl'><span className='font-bold'>Match Time:</span> {match.time}</p>
          <p className='text-gray-900 text-xl'><span className='font-bold'>Field Location:</span> {match.location}</p>
          <p className='text-gray-900 text-xl'><span className='font-bold'>Match Result:</span> {match.result}</p>
          </div>

        <h2 className='mb-2 text-xl font-bold text-gray-900 dark:text-white '>Changes</h2>
        {gameChangeLog && gameChangeLog.length > 0 && (
          <div className='flex flex-wrap rounded bg-slate-200 p-4 '>
            {gameChangeLog.map(change => 
               (
                <FeedItem change={change} teamID={teamID as string} />
              ))
            
            } 
         
          </div> )}


        </div>



      
    
  )
}

export default MatchPage

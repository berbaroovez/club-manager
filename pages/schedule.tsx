import { useEffect, useState } from 'react'
import GameTable from '../components/GameTable'
import { getAllSchedules, Schedule } from '../util/firebase'
import { Game } from '../util/types'

// var formatOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

const HomeSchedulePage = () => {
  // const [groupedGames, setGroupedGames] = useState<{ [key: string]: Game[] }>({});
  const [groupedGames, setGroupedGames] = useState({})
  const [groupedGamesKeys, setGroupedGamesKeys] = useState<string[]>([])

  useEffect(() => {
    getAllGames()
  }, [])

  useEffect(() => {
    if (groupedGames) {
      var keys = Object.keys(groupedGames)

      // for (let i = 0; i < keys.length; i++) {
      //     console.log(`${keys[i]} === ${new Date(keys[i]).toLocaleDateString()}`);
      // }

      //sort keys by date
      keys.sort((a, b) => {
        return new Date(a).getTime() - new Date(b).getTime()
      })
      console.log('KEYS', keys)

      setGroupedGamesKeys(keys)
    }
  }, [groupedGames])

  const getAllGames = async () => {
    const info = await getAllSchedules()
    console.log('info,', info)
    // console.log("IFNO", info)

    const homeGames = []

    if (info !== null) {
      for (let i = 0; i < info.length; i++) {
        //get keys for info object
        let key: keyof Schedule

        for (key in info[i]) {
          // console.log(key)
          if (key !== 'docID' && key !== 'date') {
            const tempObject = info[i][key]
            if (tempObject !== undefined) {
              for (let games = 0; games < tempObject.length; games++) {
                const homeTeam = tempObject[games].location

                //we need to check for our other home field locations just not moraine
                if (homeTeam.toLowerCase().includes('moraine')) {
                  //  console.log("Its a home game!")
                  homeGames.push(tempObject[games])
                } else {
                  // console.log("Its a away game!")
                }
              }
            }
          }
        }
      }
    }
    //sort homeGames by date
    const groupingObject: any = {}

    //go through homeGames and group by date
    //we then will group them into two categores front field which is field 1,2 an 4 and back field which is 3,5
    //we do this by checking if the location includes Field #1 or Field #2 or Field #4
    for (let i = 0; i < homeGames.length; i++) {
      // console.log(homeGames[i].fullDate)
      const tempObject = homeGames[i]
      const date = tempObject.shortDate

      // console.log("Group Object", groupingObject)

      if (groupingObject[date] === undefined) {
        groupingObject[date] = { frontField: [], backField: [] }
        // console.log("Date is undefined creating new one for ", date)
        //since the date does not exist we also need to create the field object as

        if (
          tempObject.location.toLowerCase().includes('#1') ||
          tempObject.location.toLowerCase().includes('#2') ||
          tempObject.location.toLowerCase().includes('#4')
        ) {
          console.log('Field 1 or 2 or 4 creating object')
          groupingObject[date]['frontField'] = [tempObject]
        } else if (
          tempObject.location.toLowerCase().includes('#3') ||
          tempObject.location.toLowerCase().includes('#5')
        ) {
          console.log('Field 3 or 5 creating object')
          groupingObject[date]['backField'] = [tempObject]
        } else {
          console.log('Field is undefined')
          console.log(tempObject)
        }
      } else {
        //if the date already exists we now need to check if the field arrays exists and if not create them
        if (
          tempObject.location.toLowerCase().includes('#1') ||
          tempObject.location.toLowerCase().includes('#2') ||
          tempObject.location.toLowerCase().includes('#4')
        ) {
          if (groupingObject[date].hasOwnProperty('frontField')) {
            groupingObject[date]['frontField'].push(tempObject)

            //sort the array by time
            groupingObject[date]['frontField'].sort((a: any, b: any) => {
              return a.fullDate - b.fullDate
            })
          } else {
            groupingObject[date]['frontField'] = [tempObject]
          }
        } else {
          if (groupingObject[date].hasOwnProperty('backField')) {
            groupingObject[date]['backField'].push(tempObject)
            groupingObject[date]['backField'].sort((a: any, b: any) => {
              return a.fullDate - b.fullDate
            })
          } else {
            groupingObject[date]['backField'] = [tempObject]
          }
        }
      }
    }

    // console.log(homeGames)
    // console.log("GROUPING OBJECT", groupingObject)
    setGroupedGames(groupingObject)
  }

  // const getAllGames = async

  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="mb-8 text-3xl font-semibold text-gray-800 dark:text-white">
        Schedules
      </h1>

      {groupedGamesKeys.map((key: string) => {
        return (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {new Date(key).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </h2>

            {
              //@ts-ignore
              groupedGames[key]['frontField'].length !== 0 && (
                <div className="mb-4">
                  <h3 className="text-lg text-blue-400">
                    Front Fields - #1 (5v5), #2 (7v7), #4 (11v11)
                  </h3>
                  <GameTable
                    //@ts-ignore
                    gameData={groupedGames[key]['frontField']}
                    gameDate={key}
                  />
                </div>
              )
            }

            {
              //@ts-ignore
              groupedGames[key]['backField'].length !== 0 && (
                <>
                  {' '}
                  <h3 className="text-lg text-blue-400">
                    Back Fields - #3 (9v9), #5 (11v11)
                  </h3>
                  <GameTable
                    //@ts-ignore
                    gameData={groupedGames[key]['backField']}
                    gameDate={key}
                  />
                </>
              )
            }
          </div>
        ) // end of the day
      })}
    </div>
  )
}

export default HomeSchedulePage

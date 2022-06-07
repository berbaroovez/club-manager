import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAuth } from '../../../util/auth'
import {
  getTeamInfo,
  getTeamSchedule,
  Schedule,
  updateTeamInfo,
} from '../../../util/firebase'
import { Game, LeagueURL, TeamInfo } from '../../../util/types'
import {
  AdjustmentsIcon,
  CheckIcon,
  PlusCircleIcon,
} from '@heroicons/react/outline'
import {
  ageGroups,
  leagues,
  seasons,
  years,
} from '../../../util/form-information'

const Post = () => {
  const router = useRouter()
  const { teamID } = router.query
  const [teamInfo, setTeamInfo] = useState<TeamInfo>()
  const [teamSchedule, setTeamSchedule] = useState<any>()
  const { user } = useAuth()

  const [editMode, setEditMode] = useState(false)
  const newLeagueURL: LeagueURL = {
    league: leagues[0],
    url: '',
  }

  const handleEditMode = () => {
    if (editMode) {
      setEditMode(false)
      if (teamInfo) {
        if (typeof teamID === 'string') {
          updateTeamInfo(teamID, teamInfo)
        }
      }
    } else {
      setEditMode(true)
    }
  }

  const addLeagueURL = () => {
    if (teamInfo) {
      setTeamInfo({
        ...teamInfo,
        leagueURLS: [...teamInfo.leagueURLS, newLeagueURL],
      })
    }
  }

  const removeLeagueURL = (index: number) => {
    if (teamInfo) {
      const newLeagueURLs = [...teamInfo.leagueURLS]
      newLeagueURLs.splice(index, 1)
      setTeamInfo({
        ...teamInfo,
        leagueURLS: newLeagueURLs,
      })
    }

    // setLeagueURL(newLeagueURLs);
  }

  const handleLeagueURLChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (teamInfo) {
      const newLeagueURLs = [...teamInfo.leagueURLS]

      if (event.target.name === 'league') {
        newLeagueURLs[index].league = event.target.value
      } else if (event.target.name === 'url') {
        newLeagueURLs[index].url = event.target.value
      }
      setTeamInfo({
        ...teamInfo,
        leagueURLS: newLeagueURLs,
      })
    }
    //     console.log(event.target.value);
  }

  useEffect(() => {
    const getData = async () => {
      const allGames: Game[] = []

      if (teamID !== undefined) {
        if (typeof teamID === 'string') {
          const data = await getTeamInfo(teamID)
          if (data !== null) {
            setTeamInfo(data)
          }

          const schedule = await getTeamSchedule(teamID)
          if (schedule !== null) {
            let key: keyof Schedule

            for (key in schedule) {
              if (key !== 'docID' && key !== 'date') {
                const tempObject = schedule[key]
                if (tempObject !== undefined) {
                  for (let games = 0; games < tempObject.length; games++) {
                    allGames.push(tempObject[games])
                  }
                }
              }
            }
          }

          //sort AllGames by date
          allGames.sort((a: any, b: any) => {
            return a.fullDate - b.fullDate
          })

          setTeamSchedule(allGames)
        }
      }
    }
    getData()
  }, [teamID])

  if (user === null) {
    return <div>Please Login to see this page</div>
  }

  return (
    <div className="px-4">
      {teamInfo && (
        <div className="relative  mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-10 md:gap-4">
          <div className="left-col col-span1 md:col-span-7 ">
            <div className="relative mb-8 max-w-4xl">
              <button
                className={`absolute right-0 rounded px-4 py-2 ${
                  editMode
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-slate-400 hover:bg-slate-600'
                }`}
                onClick={handleEditMode}
              >
                {editMode ? (
                  <CheckIcon className="h-6 w-6 text-white" />
                ) : (
                  <AdjustmentsIcon className="h-6 w-6 text-white" />
                )}
              </button>
              <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white ">
                {teamInfo.longName}
              </h1>

              <div className="grid grid-cols-1 rounded bg-slate-200 p-4 sm:grid-cols-2">
                <div className="grid grid-rows-2">
                  <p className="text-lg text-gray-500">Season</p>

                  {editMode ? (
                    <div className="flex">
                      <select
                        className=" w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700  shadow"
                        value={teamInfo.season}
                        onChange={(e) => {
                          setTeamInfo({
                            ...teamInfo,
                            season: e.target.value,
                          })
                        }}
                      >
                        {seasons.map((season) => {
                          return <option key={season}>{season}</option>
                        })}
                      </select>
                      <select
                        className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow "
                        value={teamInfo.seasonYear}
                        onChange={(e) => {
                          setTeamInfo({
                            ...teamInfo,
                            seasonYear: parseInt(e.target.value),
                          })
                        }}
                      >
                        {years.map((year) => {
                          return <option key={year}>{year}</option>
                        })}
                      </select>
                    </div>
                  ) : (
                    <p className="text-gray-900">
                      {' '}
                      {teamInfo.season} {teamInfo.seasonYear}
                    </p>
                  )}
                </div>
                <div className="grid grid-rows-2">
                  <p className="text-lg text-gray-500">Age Level</p>

                  {editMode ? (
                    <select
                      className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
                      value={teamInfo.ageGroup}
                      onChange={(e) => {
                        setTeamInfo({
                          ...teamInfo,
                          ageGroup: e.target.value,
                        })
                      }}
                    >
                      {ageGroups.map((ageGroup) => {
                        return <option key={ageGroup}>{ageGroup}</option>
                      })}
                    </select>
                  ) : (
                    <p className="text-gray-900">{teamInfo.ageGroup}</p>
                  )}
                </div>
              </div>
            </div>
            {/* <div>
            <p>Team Info</p>

           </div> */}
            <div className="mb-8 max-w-4xl">
              <h2 className=" text-lg font-semibold text-gray-900 dark:text-white">
                Coach Info
              </h2>
              <div className="grid grid-cols-2 rounded bg-slate-200 p-4 ">
                <div className="grid grid-rows-2">
                  <p className="text-lg text-gray-500">Coach Name</p>

                  {editMode ? (
                    <input
                      type="text"
                      className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow "
                      id="coachName"
                      placeholder="Enter coach name"
                      onChange={(e) => {
                        setTeamInfo({
                          ...teamInfo,
                          coach: e.target.value,
                        })
                      }}
                      value={teamInfo.coach}
                    />
                  ) : (
                    <p className="text-gray-900">{teamInfo.coach}</p>
                  )}
                </div>
                <div className="grid grid-rows-2">
                  <p className="text-lg text-gray-500">Coach Email</p>

                  {editMode ? (
                    <input
                      type="email"
                      className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow "
                      id="coachEmail"
                      placeholder="Enter coach email"
                      onChange={(e) => {
                        setTeamInfo({
                          ...teamInfo,
                          coachEmail: e.target.value,
                        })
                      }}
                      value={teamInfo.coachEmail}
                    />
                  ) : (
                    <a
                      className="w-fit text-gray-900 hover:text-blue-400 "
                      href={`mailto:${teamInfo.coachEmail}`}
                    >
                      <p className="text-gray-900"> {teamInfo.coachEmail}</p>
                    </a>
                  )}
                </div>
                <div className="grid grid-rows-2">
                  <p className="text-lg text-gray-500">Coach Phone</p>

                  {editMode ? (
                    <input
                      type="text"
                      className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow "
                      id="coachPhone"
                      placeholder="Enter coach phone"
                      onChange={(e) => {
                        setTeamInfo({
                          ...teamInfo,
                          coachPhone: e.target.value,
                        })
                      }}
                      value={teamInfo.coachPhone}
                    />
                  ) : (
                    <a
                      className="w-fit  text-gray-900 hover:text-blue-400"
                      href={`tel:+${teamInfo.coachPhone}`}
                    >
                      {teamInfo.coachPhone}
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Leagues Info */}
            <div className=" mb-8  max-w-4xl">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Leagues
              </h2>
              <div className="flex min-h-[100px]  flex-col  content-center rounded bg-slate-200 p-4 shadow-md ">
                {editMode ? (
                  <>
                    {teamInfo.leagueURLS.map((league, index) => (
                      <div className="relative flex gap-x-1.5">
                        <select
                          className="w-24 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow"
                          name="league"
                          value={league.league}
                          onChange={(e) => handleLeagueURLChange(index, e)}
                        >
                          {leagues.map((league) => {
                            return <option key={league}>{league}</option>
                          })}
                        </select>
                        <input
                          required
                          type="text"
                          className="w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow "
                          name="url"
                          id="leagueURL"
                          placeholder="Enter URL to schedule"
                          onChange={(e) => handleLeagueURLChange(index, e)}
                          value={league.url}
                        />

                        {index !== 0 && (
                          <div
                            onClick={() => removeLeagueURL(index)}
                            className="absolute -right-8 top-1 p-1 text-red-300 hover:cursor-pointer  hover:text-red-500 "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                    <PlusCircleIcon
                      onClick={addLeagueURL}
                      className="h-6 w-6 text-white"
                    />
                  </>
                ) : (
                  teamInfo.leagueURLS.map((league) => {
                    return (
                      <div className="flex flex-col items-center gap-4 md:flex-row">
                        <p className="font-semibold text-gray-900">
                          {league.league}
                        </p>{' '}
                        <a
                          className="block max-w-4xl overflow-hidden text-ellipsis whitespace-nowrap text-gray-700 hover:cursor-pointer hover:text-blue-400 hover:underline focus:text-blue-400"
                          href={league.url}
                        >
                          {league.url}
                        </a>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          {/* //end of team info div */}
          <div className="right-col relative col-span-3 h-full overflow-y-scroll rounded md:h-2/3">
            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              Games
            </h3>
            {teamSchedule && (
              <div className="rounded bg-slate-200 p-4">
                {teamSchedule.map((game: Game) => {
                  let isGameAtHome = false
                  let teamWerePlaying = game.homeTeam

                  if (game.homeTeam.toLowerCase().includes('inter fc')) {
                    isGameAtHome = true
                    teamWerePlaying = game.awayTeam
                  }

                  return (
                    <div className="mb-4 flex flex-col">
                      <p className="font-semibold text-gray-900">
                        {game.shortDate} at {game.time}
                      </p>
                      <p className="text-gray-600">
                        {isGameAtHome ? 'vs.' : 'At'} {teamWerePlaying}
                      </p>
                      <a
                        className="text-sm text-gray-400 hover:cursor-pointer hover:text-blue-400"
                        href={game.locationURL}
                      >
                        {game.location}
                      </a>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Post

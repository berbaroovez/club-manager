import { Game } from '../util/types'

interface GameTableProps {
  gameData: Game[]
  gameDate: string
}

const GameTable = ({ gameData, gameDate }: GameTableProps) => {
  return (
    <div className="relative overflow-x-auto shadow-md dark:border-2  dark:border-gray-700 sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="w-28  px-6 py-3">
              Match #
            </th>
            <th scope="col" className="px-6 py-3">
              Time
            </th>
            <th scope="col" className="px-6 py-3">
              Home
            </th>
            <th scope="col" className="px-6 py-3">
              Result
            </th>
            <th scope="col" className="px-6 py-3">
              Away
            </th>
            <th scope="col" className="px-6 py-3">
              Location
            </th>
          </tr>
        </thead>
        <tbody>
          {gameData.map((game: Game) => {
            return (
              <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {game.matchNumber}
                </th>
                <td className="px-6 py-4">{game.time.split('CDT')[0]}</td>
                <td className="text-ellipsis px-6 py-4 ">{game.homeTeam}</td>
                <td className="px-6 py-4">{game.result}</td>
                <td className=" px-6 py-4 ">{game.awayTeam}</td>
                <td className="px-6 py-4">
                  <a
                    className="hover:text-blue-600 hover:underline focus:text-blue-600 focus:underline"
                    href={game.locationURL}
                  >
                    {' '}
                    {game.location}
                  </a>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default GameTable

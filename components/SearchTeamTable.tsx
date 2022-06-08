import Link from 'next/link'
import { TeamInfo } from '../util/types'

interface SearchTeamTableProps {
  teamList: TeamInfo[]
}

const SearchTeamTable = ({ teamList }: SearchTeamTableProps) => (
  <div className="relative w-[800px]  shadow-md dark:border-2 dark:border-gray-700 sm:rounded-lg mx-auto">
    <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="w-28  px-6 py-3">
            Name
          </th>
          <th scope="col" className="px-6 py-3">
            age group
          </th>
          <th scope="col" className="px-6 py-3">
            birth year
          </th>
          <th scope="col" className="px-6 py-3">
            season
          </th>
          <th scope="col" className="px-6 py-3">
            coach
          </th>
          {/* <th scope="col" className="px-6 py-3">
              Location
            </th> */}
        </tr>
      </thead>
      <tbody>
        {teamList?.map((team: TeamInfo) => {
          return (
            <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
              <th
                scope="row"
                className=" w-72 px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                <Link href={`/dashboard/t/${team.docID}`}>
                  <a>{team.longName}</a>
                </Link>
              </th>
              <td className="px-6 py-4">{team.ageGroup}</td>
              <td className="text-ellipsis px-6 py-4 ">{team.birthYear}</td>
              <td className="px-6 py-4">
                {team.season} {team.seasonYear}
              </td>
              <td className=" px-6 py-4 ">{team.coach}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)

export default SearchTeamTable

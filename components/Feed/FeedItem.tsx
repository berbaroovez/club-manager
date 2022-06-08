import { ChangeLog } from '../../util/types'
import {
  ClockIcon,
  CalendarIcon,
  LocationMarkerIcon,
  SpeakerphoneIcon,
  UserIcon,
} from '@heroicons/react/outline'
import Link from 'next/link'
interface FeedItemProps {
  change: ChangeLog
  teamID: string
}

const FeedItem = ({ change, teamID }: FeedItemProps) => {
  return (
    <div className="mb-4 w-72 ">
      <div className="flex items-center gap-4 ">
        {/* // check category and then render icon */}
        {change.category === 'Date' ? (
          <CalendarIcon className="h-6 w-6 text-blue-400 " />
        ) : change.category === 'Time' ? (
          <ClockIcon className="h-6 w-6 text-blue-400 " />
        ) : change.category === 'Location' ? (
          <LocationMarkerIcon className="h-6 w-6 text-blue-400 " />
        ) : change.category === 'Result' ? (
          <SpeakerphoneIcon className="h-6 w-6 text-blue-400 " />
        ) : (
          <UserIcon className="h-6 w-6 text-blue-400 " />
        )}

        <p className="font-semibold text-gray-800">
          {' '}
          <Link href={`/dashboard/t/${teamID}/${change.matchNumber}`}>
            <span className=" text-gray-400 hover:cursor-pointer hover:text-blue-400">
              Game #{change.matchNumber}{' '}
            </span>
          </Link>
          {`${change.category.toLowerCase()} changed`}
        </p>
      </div>
    </div>
  )
}

export default FeedItem

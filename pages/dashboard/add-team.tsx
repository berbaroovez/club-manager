import AddTeam from '../../components/AddTeam'
import { useAuth } from '../../util/auth'

const index = () => {
  const { user } = useAuth()

  if (user === null) {
    return <div>Please Login to see this page</div>
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white ">
        Add Team
      </h1>
      <AddTeam />
    </div>
  )
}

export default index

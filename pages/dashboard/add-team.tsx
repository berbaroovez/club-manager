import AddTeam from '../../components/AddTeam'
import { useAuth } from '../../util/auth'

const index = () => {
  const { user } = useAuth()

  if (user === null) {
    return <div>Please Login to see this page</div>
  }

  return (
    <div className="grid">
      <h1 className="mb-8 text-center text-2xl font-bold text-gray-800">
        Add Team
      </h1>
      <AddTeam />
    </div>
  )
}

export default index

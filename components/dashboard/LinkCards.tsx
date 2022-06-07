import Link from 'next/link'

interface LinkCardsProps {
  url: string
  icon: JSX.Element
  title: string
}

const LinkCards = ({ url, icon, title }: LinkCardsProps) => {
  return (
    <Link href={url}>
      <div className="m-4 grid h-16 w-64 grid-cols-6 rounded bg-slate-200 px-6 py-4 text-center shadow-md hover:cursor-pointer hover:bg-slate-400">
        {icon}

        <div className="w-32 self-center text-left text-lg font-semibold ">
          {title}
        </div>
      </div>
    </Link>
  )
}

export default LinkCards

import { Link } from "react-router-dom"

export const Avator = ({ name = "G", size, id }: { name?: string, size?: "sm" | "md", id?: string }) => {
  return <Link to={`/profile/${id}`}> < div className={`rounded-full ${size == "sm" ? "h-5 w-5" : "h-8 w-8"} text-xs place-content-center text-center uppercase text-white bg-red-600`}>
    {name[0]}
  </div >

  </Link>
}

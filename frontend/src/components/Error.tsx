import { AlertCircle } from "lucide-react"

export const Error = ({ message }: { message: string }) => {
  return (
    <div className="bg-rose-400 shadow-sm w-80 h-9 place-content-center text-center rounded-md text-white">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="block sm:inline">{message}</span>
        </div>
      </div>
    </div>
  )

}

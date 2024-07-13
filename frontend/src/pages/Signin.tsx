import { Auth } from "../components/Auth"


export const Signin = () => {

  return (
    <div className="flex justify-center place-items-center h-screen">
      <div>
        <Auth type="signin" />
      </div>
    </div>
  )
}

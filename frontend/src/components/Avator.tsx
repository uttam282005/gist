export const Avator = ({ name, size }: { name: string, size?: "sm" | "md" }) => {
  return <div className={`rounded-full ${size == "sm" ? "h-5 w-5" : "h-8 w-8"} text-xs place-content-center text-center uppercase text-white bg-red-600`}>
    {name[0]}
  </div >
}

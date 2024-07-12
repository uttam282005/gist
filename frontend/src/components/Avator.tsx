const colorClasses: { [key: string]: string } = {
  red: 'bg-red-600',
  blue: 'bg-blue-600',
  green: 'bg-green-600',
  // Add more colors as needed
  slate: 'bg-slate-600',
};

export const Avator = ({ name, color, size }: { name: string, color?: string, size?: "sm" | "md" }) => {
  color = colorClasses[color] || colorClasses.red;
  return <div className={`rounded-full ${size == "sm" ? "h-5 w-5" : "h-8 w-8"} text-xs place-content-center text-center uppercase text-white ${color}`}>
    {name[0]}
  </div >
}

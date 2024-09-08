import { ShowMDX } from "../components/ShowMDX";

export const Preview = ({ source }: { source: string }) => {

  return (
    <div className="max-h-[336px] overflow-auto" >
      <ShowMDX source={source} />
    </div>
  )
};


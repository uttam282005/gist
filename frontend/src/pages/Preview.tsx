import { ShowMDX } from "../components/ShowMDX";

export const Preview = ({ source }: { source: string }) => {

  return (
    <div className="border border-10">
      <div className="font text-slate-700 px-2 py-2">Mdx Preview</div>
      <div className="px-2 py-2 max-h-[336px] overflow-auto" >
        <ShowMDX source={source} />
      </div>
    </div>
  )
};


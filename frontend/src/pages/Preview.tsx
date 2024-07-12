import { MDXRemote } from 'next-mdx-remote';
import { useSerialize } from '../hooks';

export const Preview = ({ source }: { source: string }) => {
  const mdxSource = useSerialize(source)
  return mdxSource !== null ? <div className='border border-10'>
    <div className='font text-slate-700 px-2 py-2'>
      Mdx Preview
    </div>
    <div className='px-2 py-2'>
      <MDXRemote {...mdxSource} />
    </div>
  </div> : <div> Compilation failed </div>
}

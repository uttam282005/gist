import { useEffect, useState } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";

export const useSerialize = (source: string) => {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(null)
  useEffect(() => {
    const renderMdx = async () => {
      const serializedMdx = await serialize(source);
      setMdxSource(serializedMdx);
    }
    renderMdx();
  }, [source])
  return mdxSource;
}

import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import { useEffect, useRef, useState } from 'react';
import { Error } from "./Error";

export const ShowMDX = ({ source }: { source: string }) => {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const compileMdx = async () => {
      try {
        const file = await unified()
          .use(remarkParse)
          .use(remarkRehype)
          .use(rehypePrettyCode)
          .use(rehypeStringify, {
          })
          .process(source);

        previewRef.current ? previewRef.current.innerHTML = String(file).trim() : setError(true);
      } catch (error) {
        console.error("Error compiling MDX:", error);
        setError(true);
      }
    };
    compileMdx();
  }, [source]);

  return (
    !error ? <div ref={previewRef}></div> : <Error message={"Compilation failed"} />
  )
};

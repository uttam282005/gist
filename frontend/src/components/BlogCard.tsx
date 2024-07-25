import { Link } from "react-router-dom";
import { Avator } from "./Avator";

export interface BlogCardInput {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
}
const getDateAndTime = (dateString: string) => {
  let date = new Date(dateString);
  let localDate = date.toDateString();
  let time = date.toLocaleTimeString();
  return {
    localDate,
    time
  };
}

export const BlogCard = ({
  id,
  content,
  title,
  authorName,
  createdAt,
}: BlogCardInput) => {
  return (
    <Link to={`/blog/${id}`} className="border-b py-6 place-item-center w-1/2">
      <div>
        <div className="flex justify-normal">
          <div className="flex flex-col justify-center ml-2">
            <Avator name={authorName} size="sm" />
          </div>
          <div className="ml-2 text-sm font-thin flex">
            {authorName}
            <div className="flex flex-col pt-2">
              <div className="ml-2 h-1 w-1 bg-slate-400 rounded-full flex flex-col"></div>
            </div>
          </div>
          <div className="ml-1 text-gray-400 text-sm font-thin">
            {getDateAndTime(createdAt).localDate} at {getDateAndTime(createdAt).time}
          </div>
        </div>
        <div className="flex flex-col">
          <div className="ml-2 font-bold text-3xl mt-3 text-wrap">{title}</div>
          <div className="ml-2 text-slate-700 mt-1 font-serif text-wrap">
            {content.slice(0, 100) + '...'}
          </div>
          <div className="text-sm pl-2 font-extralight text-slate-500 pt-3">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
        </div>
      </div>
    </Link>
  );
};

import axios from "axios";
import { useRef } from "react";
import { Appbar } from "../components/Appbar"
import { Preview } from "./Preview";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { Spinner } from "../components/Spinner";
import { Error } from "../components/Error";

export const Publish = () => {
  const contentAreaRef = useRef(null);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  return loading ? <Spinner /> : error ?
    <div className="min-h-screen flex flex-col">
      <Appbar />
      <div className="flex-grow flex justify-center items-center">
        < Error message={errorMessage} />
      </div >
    </div >
    : <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="max-w-screen-lg w-full">
          <input onChange={(e) => {
            setTitle(e.target.value)
          }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
          <div className={`${preview ? "grid grid-cols-2" : "flex"}`} >
            <div className="flex-grow" >
              <TextEditor ref={contentAreaRef} onChange={(e) => {
                setDescription(e.target.value)
              }} />
            </div>
            {preview && <div className="mt-2 mx-2">
              <Preview source={description} />
            </div>}
          </div>
          <div className="flex justify-between">
            <button onClick={async () => {
              try {
                setLoading(true);
                const response = await axios.put(`${BACKEND_URL}/api/v1/blog`, {
                  title,
                  content: description
                }, {
                  headers: {
                    authorization: 'Bearer ' + localStorage.getItem("token")
                  }
                });
                if (!response.data.success) {
                  setError(true);
                  setErrorMessage(response.data.message);
                  setLoading(false);
                } else navigate(`/blog/${response.data.blog.id}`);
              } catch (error) {
                setLoading(false);
                setError(true);
                setErrorMessage('Internal server error');
              }
            }} type="submit" className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
              Update post
            </button>
            <button onClick={() => setPreview(!preview)} className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-black rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-slate-500"> Toggle preview </button>
          </div>
        </div>
      </div >
    </div >
}

function TextEditor({ onChange, ref }: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void, ref: React.MutableRefObject<null>
}) {
  return <div className="mt-2">
    <div className="w-full mb-4 ">
      <div className="flex items-center justify-between border">
        <div className="my-2 bg-white rounded-b-lg w-full">
          <label className="sr-only">Publish post</label>
          <textarea onChange={onChange} autoComplete="on" id="editor" ref={ref} rows={18} className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2" placeholder="Write an article (markdown and syntax highlighting for code supported)..." required />
        </div>
      </div>
    </div>
  </div>

}

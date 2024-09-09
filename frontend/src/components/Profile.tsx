import { useNavigate, useParams } from "react-router-dom";
import { UseGetUserProfile } from "../hooks";
import { BlogCard } from "./BlogCard";
import { UserPosts } from "../hooks";
import { Appbar } from "./Appbar";
import { Pencil, User } from "lucide-react";
import { useContext } from "react";
import { CurrentSessionContext } from "../contexts";

export const Profile = () => {
  const { id = "" } = useParams();
  const userPosts: UserPosts[] | undefined = UseGetUserProfile(id);
  const navigate = useNavigate();
  const currentSession = useContext(CurrentSessionContext);
  const currentUserId = currentSession?.id;
  const handleEdit = (postId: string) => {
    navigate(`/update/${postId}`)
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center space-x-4">
            <User size={64} className="text-gray-400" />
            <div>
              <h1 className="text-2xl font-bold">{userPosts?.[0]?.author.username || "User Profile"}</h1>
              <p className="text-gray-600">Total Posts: {userPosts?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {userPosts?.length === 0 ? (
            <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow-md">
              <p className="text-xl text-gray-500">No blogs found</p>
            </div>
          ) : (
            userPosts?.map((userPost) => (
              <div key={userPost.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <BlogCard
                    title={userPost.title}
                    authorId={id}
                    content={userPost.content}
                    createdAt={userPost.createdAt}
                    authorName={userPost.author.username}
                    id={userPost.id}
                  />
                  {currentUserId === userPost.author.id && (
                    <button
                      onClick={() => handleEdit(userPost.id)}
                      className="flex items-center gap-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

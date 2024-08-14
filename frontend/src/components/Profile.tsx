import { useNavigate, useParams } from "react-router-dom";
import { UseGetUserProfile } from "../hooks";
import { BlogCard } from "./BlogCard";
import { UserPosts } from "../hooks";
import { Appbar } from "./Appbar";
import { Pencil } from "lucide-react";
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
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="space-y-6">
          {userPosts && userPosts.map((userPost) => (
            <div key={userPost.id} className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
              <div className="flex justify-between items-start mb-4">
                <BlogCard
                  title={userPost.title}
                  authorId={id}
                  content={userPost.content}
                  createdAt={userPost.createdAt}
                  authorName={userPost.author.username}
                  id={userPost.id}
                />
                {
                  currentUserId === userPost.author.id && <button
                    onClick={() => handleEdit(userPost.id)}
                    className="flex items-center gap-2 py-3"
                  >
                    <Pencil size={16} />
                    Edit
                  </button>
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

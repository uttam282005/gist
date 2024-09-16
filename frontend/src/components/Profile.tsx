import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../config";
import { BlogCard } from "./BlogCard";
import { UseGetUserProfile, UserDetailsType } from "../hooks";
import { Appbar } from "./Appbar";
import { Pencil, User, Trash2 } from "lucide-react";
import { useContext, useState, useEffect } from "react";
import { CurrentSessionContext } from "../contexts";
import { Spinner } from "./Spinner";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = useContext(CurrentSessionContext);
  const userId = useParams().id;
  const [deletingPosts, setDeletingPosts] = useState<Set<string>>(new Set());
  const userProfileDetails: UserDetailsType | undefined = UseGetUserProfile(userId!);

  const handleEdit = (postId: string) => {
    navigate(`/update/${postId}`);
  };

  const handleDelete = (postId: string) => {
    setDeletingPosts((prev) => new Set(prev).add(postId));
    fetch(`${BACKEND_URL}/api/v1/blog/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          window.location.reload();
        } else {
          console.error("Failed to delete the post");
          setDeletingPosts((prev) => {
            const newSet = new Set(prev);
            newSet.delete(postId);
            return newSet;
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        setDeletingPosts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(postId);
          return newSet;
        });
      });
  };

  useEffect(() => {
    if (userProfileDetails !== undefined) {
      setIsLoading(false);
      console.log(userProfileDetails)
    }
  }, [userProfileDetails]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Appbar userId={currentUser?.id} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-8">
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
            <User size={64} className="text-gray-400 mb-4 sm:mb-0" />
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl font-bold">
                {userProfileDetails?.username || "User Profile"}
              </h1>
              <p className="text-gray-600">
                Total Posts: {userProfileDetails?.post?.length || 0}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {userProfileDetails?.post?.length === 0 ? (
            <div className="flex justify-center items-center h-40 bg-white rounded-lg shadow-md">
              <p className="text-xl text-gray-500">No blogs found</p>
            </div>
          ) : (
            userProfileDetails?.post?.map((userPost) => (
              <div
                key={userPost.id}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
                  <BlogCard
                    title={userPost.title}
                    authorId={userPost.authorId}
                    content={userPost.content}
                    createdAt={userPost.createdAt}
                    authorName={userProfileDetails.username}
                    id={userPost.id}
                  />
                  {userProfileDetails.id === currentUser!.id && (
                    <div className="flex gap-2 mt-4 sm:mt-0">
                      <button
                        onClick={() => handleEdit(userPost.id)}
                        className="flex items-center gap-2 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
                      >
                        <Pencil size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(userPost.id)}
                        disabled={deletingPosts.has(userPost.id)}
                        className="flex items-center gap-2 py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 text-sm"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">
                          {deletingPosts.has(userPost.id)
                            ? "Deleting..."
                            : "Delete"}
                        </span>
                      </button>
                    </div>
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

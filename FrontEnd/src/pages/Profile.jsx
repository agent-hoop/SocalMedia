import { useParams } from "react-router-dom";
import { useProfile } from "../Context/ProfileContext";
import AddPostModal from "../components/AddPostModal";
import Post from "../components/Post";
import { PROFILE_ACTIONS } from "../Context/ProfileReducer";
import { usePosts } from "../Context/PostContext";


export default function ProfilePage() {
  const { id } = useParams();
  const { dispatch, state } = useProfile();

  const profile = state.find((u) => u.id === Number(id));
  console.log('The profiel',profile)
  if (!profile) return <p className="text-center text-red-500 mt-20">User not found</p>;

  const handleDel = (postId=101) => {
    dispatch({ type: PROFILE_ACTIONS.DELET_POST, payload: {id:Number(postId)}  });
    console.log('Del Post',postId)
    console.log('first',profile.posts.filter((f)=>f.postId!=102))
  };
  function delPost(userId,postId){
     dispatch({ type: PROFILE_ACTIONS.DELETE_POST, payload: { userId, postId } })

  }
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* --- Cover + Avatar --- */}
      <div className="relative w-full h-64 md:h-80 bg-gray-300 overflow-hidden">
        <img
          src={profile.coverImg}
          alt="Cover"
          className="w-full h-full object-cover brightness-90"
        />
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-full ring-4 ring-white overflow-hidden shadow-lg">
            <img
              src={profile.pPic}
              alt="Avatar"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <h2 className="mt-4 text-xl md:text-2xl font-semibold">{profile.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">@{profile.username}</p>
        </div>
      </div>

      {/* --- Stats + Action block --- */}
      <div className="mt-16 px-4 md:px-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex space-x-6 text-center">
          <div>
            <span className="font-semibold">{profile.posts.length}</span>
            <div className="text-xs text-gray-500 dark:text-gray-400">Posts</div>
          </div>
          <div>
            <span className="font-semibold">123</span>
            <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
          </div>
          <div>
            <span className="font-semibold">98</span>
            <div className="text-xs text-gray-500 dark:text-gray-400">Following</div>
          </div>
        </div>
        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Follow
        </button>
      </div>

      {/* --- Add Post Button --- */}
      <div className="mt-8 px-4 md:px-8">
        <AddPostModal />
      </div>

      {/* --- Posts Grid --- */}
      <div className="mt-6 ">
        {profile.posts.length > 0 ? (
          profile.posts.map((p, idx) => (
            <Post
            
              key={idx}
              id={p.postId}
              handleUnfollow={()=>delPost(profile.id,p.postId)}
              isVerified={idx % 2 === 0}
              name={profile.name}
              uname={profile.username}
              contentImg={p.postContent[0]}
              content={p.postTitle}
              time="3:30"
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 mt-12">
            No posts yet …
          </div>
        )}
      </div>
    </div>
  );
}

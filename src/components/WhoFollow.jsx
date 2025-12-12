import React from "react";
import { useProfile } from "../Context/ProfileContext";
import { PROFILE_ACTIONS } from "../Context/ProfileReducer";

export default function WhoFollow() {
  // 1. Consume Global State directly
  const { state,actions,users } = useProfile();

  const handleFollowToggle = (id) => {
    actions.toggleFollow(id)
  };

  return (
    <div className="w-64 shadow-lg hidden md:block bg-[#251C2D] md:p-4 rounded-xl min-h-40">
      <div className="heading text-md text-white font-bold mb-4">
        Who To Follow
      </div>

      <div className="list space-y-4">
        {/* 2. Map directly from Global State */}
        {users.map((item) => (
          <UserCard
            key={item.id}
            data={item} // Pass the whole object to keep props clean
            onToggle={() => handleFollowToggle(item.id)}
          />
        ))}
      </div>
      
      {/* Optional: Empty State Handler */}
      {users.length === 0 && (
         <div className="text-gray-500 text-sm text-center">No suggestions</div>
      )}
    </div>
  );
}

// Sub-component optimized for rendering
const UserCard = ({ data, onToggle }) => {
  const { name, userName, ppic, isFollow } = data;

  return (
    <div className="w-full relative flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700 border border-gray-600 shrink-0">
          <img
            src={ppic || `https://ui-avatars.com/api/?name=${name}&background=random`}
            className="w-full h-full object-cover"
            alt={name}
          />
        </div>

        {/* Name Info */}
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-sm cursor-pointer text-gray-100 hover:underline">
            {name}
          </span>
          <span className="text-xs text-gray-400">{userName}</span>
        </div>
      </div>

      {/* Follow Button */}
      <button
        onClick={onToggle}
        className={`
            text-xs font-bold py-1.5 px-3 rounded-lg transition-all duration-200 active:scale-95
            ${
              isFollow
                ? "bg-transparent border border-gray-500 text-gray-300 hover:border-gray-300 hover:text-white"
                : "bg-[#0095f6] text-white hover:bg-[#1877f2] border border-transparent"
            }
        `}
      >
        {isFollow ? "Following" : "Follow"}
      </button>
    </div>
  );
};
// Post.jsx
import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  BiDotsHorizontalRounded,
  BiHeart,
  BiSolidHeart,
  BiMessageRounded,
  BiShareAlt,
  BiBookmark,
  BiSolidBookmark,
} from "react-icons/bi";
import { MdVerified } from "react-icons/md";

/**
 * Utility: Format numbers like 1200 -> 1.2k
 */
const formatCount = (n) => {
  if (n < 1000) return n;
  if (n >= 1000 && n < 1000000) return +(n / 1000).toFixed(1) + "k";
  return +(n / 1000000).toFixed(1) + "M";
};

/**
 * Production-Ready Post Component
 */
export default function Post({
  id,
  name = "User Name",
  uname = "username",
  isVerified = false,
  ppic = "https://i.pravatar.cc/150",
  time = "2h",
  content = "",
  contentImg = null,
  likeCount = 0,
  commentCount = 0,
  toggleLike,
  toggleBookmark,
  addComment,
  handleUnfollow


}) {
  // --- State ---
  const [isLiked, setIsLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(likeCount);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  // UI States
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showOverlayHeart, setShowOverlayHeart] = useState(false);

  // Refs
  const menuRef = useRef(null);

  // Constants
  const TEXT_LIMIT = 120;

  // --- Initialization (Restore from LocalStorage) ---

  const handleLike = () => {
    toggleLike(id);
    console.log("Like toggled for post:", id);
  };
  const handleBookmark = () => {
    toggleBookmark(id);
  }
  const handleDoubleTap = () => {
    if (!isLiked) {
      handleLike();
    }
  }
  const onProfileClick = () => {
    // Navigate to user's profile
    console.log(`Navigate to profile of ${uname}`);
  } 
  const onReport = (postId) => {
    console.log(`Report post with id: ${postId}`);
  }
  const onOpenComments = (postId) => {
    console.log(`Open comments for post with id: ${postId}`);
  }
  const onOpenShare = (postId) => {
    console.log(`Open share options for post with id: ${postId}`);
  }


  // 4. Close Menu on Click Outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  return (
    <article className="w-full max-w-lg mx-auto bg-[#251C2D] border border-white/5 shadow-xl rounded-2xl overflow-hidden  transition-all duration-300 hover:shadow-2xl hover:border-white/10">
      
      {/* --- Header --- */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3 cursor-pointer" onClick={onProfileClick}>
          <img
            src={ppic}
            alt={name}
            loading="lazy"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
          />
          <div className="flex flex-col leading-tight">
            <div className="flex items-center gap-1">
              <span className="text-white font-semibold text-sm hover:underline">{name}</span>
              {isVerified && <MdVerified className="text-blue-500 text-sm" />}
            </div>
            <div className="flex items-center text-xs text-gray-400 gap-1">
              <span>@{uname}</span>
              <span className="text-[10px]">•</span>
              <span>{time}</span>
            </div>
          </div>
        </div>

        {/* Menu Dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition"
            aria-label="More options"
          >
            <BiDotsHorizontalRounded size={20} />
          </button>
          
          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-[#1E1625] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden py-1 animate-in fade-in zoom-in-95 duration-200">
              <button onClick={() => { setShowMenu(false); onReport(id); }} className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition">
                Report Post
              </button>
              <button className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10 transition">
                Copy Link
              </button>
              <button onClick={handleUnfollow} className="w-full text-left px-4 py-3 text-sm text-red-400 hover:bg-white/5 transition border-t border-white/5">
                Unfollow User
              </button>
            </div>
          )}
        </div>
      </div>

      {/* --- Content (Text) --- */}
      {content && (
        <div className="px-3 pb-2">
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
            {isExpanded || content.length <= TEXT_LIMIT ? (
              content
            ) : (
              <>
                {content.slice(0, TEXT_LIMIT)}...
                <button 
                  onClick={() => setIsExpanded(true)} 
                  className="text-gray-400 text-xs ml-1 hover:text-white font-medium"
                >
                  more
                </button>
              </>
            )}
          </p>
        </div>
      )}

      {/* --- Media (Image with Double Tap) --- */}
      {contentImg && (
        <div 
          className="relative w-full bg-black/20 overflow-hidden"
          onClick={handleDoubleTap}
        >
          {/* Main Image */}
          <img
            src={contentImg}
            alt="Post content"
            loading="lazy"
            className="w-full h-auto object-cover max-h-[600px] select-none"
          />

          {/* Big Heart Animation Overlay */}
          <div 
            className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
              showOverlayHeart ? "opacity-100" : "opacity-0"
            }`}
          >
            <BiSolidHeart 
              size={100} 
              className={`text-white drop-shadow-2xl transition-transform duration-300 ${
                showOverlayHeart ? "scale-100 rotate-0" : "scale-0 -rotate-12"
              }`} 
            />
          </div>
        </div>
      )}

      {/* --- Footer Actions --- */}
      <div className="px-3 py-3">
        <div className="flex items-center justify-between mb-2">
          {/* Left Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLike}
              className="group focus:outline-none transition-transform active:scale-90"
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              {isLiked ? (
                <BiSolidHeart size={26} className="text-red-500 animate-in zoom-in spin-in-12 duration-200" />
              ) : (
                <BiHeart size={26} className="text-white group-hover:text-gray-300" />
              )}
            </button>

            <button 
              onClick={() => onOpenComments(id)}
              className="group focus:outline-none transition-transform active:scale-90"
              aria-label="Comment"
            >
              <BiMessageRounded size={26} className="text-white group-hover:text-gray-300" />
            </button>

            <button 
              onClick={() => onOpenShare(id)}
              className="group focus:outline-none transition-transform active:scale-90"
              aria-label="Share"
            >
              <BiShareAlt size={26} className="text-white group-hover:text-gray-300" />
            </button>
          </div>

          {/* Right Action */}
          <button 
            onClick={handleBookmark}
            className="focus:outline-none transition-transform active:scale-90"
            aria-label="Bookmark"
          >
            {isBookmarked ? (
              <BiSolidBookmark size={24} className="text-white" />
            ) : (
              <BiBookmark size={24} className="text-white hover:text-gray-300" />
            )}
          </button>
        </div>

        {/* --- Metrics --- */}
        <div className="text-sm font-semibold text-white">
          {localLikes > 0 && (
            <span className="block mb-1">
              {formatCount(localLikes)} likes
            </span>
          )}
        </div>
        
        {/* View Comments Link */}
        {commentCount > 0 && (
          <button 
            onClick={() => onOpenComments(id)}
            className="text-gray-500 text-sm hover:text-gray-300 transition"
          >
            View all {formatCount(commentCount)} comments
          </button>
        )}
      </div>
    </article>
  );
}
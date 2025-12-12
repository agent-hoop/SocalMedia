import { CgAdd } from "react-icons/cg";

export default function Story({
  userId,
  name,
  ppic,
  stories = [],      // array of user's stories
  myId,
  onOpenStory,
  onAddStory,
  isMine
}) {
  // const isMine = userId === myId;

  // ✅ REAL viewed logic (not fake boolean)
  const hasUnviewed = stories.some(
    story => !story.viewers.includes(myId)
  );

  const handleClick = () => {
    if (isMine && stories.length === 0) {
      onAddStory();        // open upload modal
    } else {
      onOpenStory(userId); // open viewer
    }
  };

  return (
    <div className="flex flex-col items-center  cursor-pointer">
      <div
        onClick={handleClick}
        className={`relative w-18 h-18 p-[2px]  rounded-full ring-2 transition-hover hover:scale-101
          ${hasUnviewed ? "ring-purple-400" : "ring-gray-500"}
        `}
      >
        <img
          src={ppic}
          className="w-full h-full rounded-full object-cover bg-zinc-800"
          alt=""
        />

        {/* ✅ PLUS ICON ONLY FOR YOUR STORY */}
        {isMine && (
          <div className="absolute right-0 bottom-0 w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center">
            <CgAdd size={18} />
          </div>
        )}
      </div>

      <p className="text-white text-xs mt-1 truncate w-16 text-center">
        {isMine ? "Your Story" : name}
      </p>
    </div>
  );
}

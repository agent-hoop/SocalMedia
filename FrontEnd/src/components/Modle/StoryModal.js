const myId = "10";

export const storyList = [
  {
    userId: 10,
    name: "Nibesh",
    ppic: "https://i.pravatar.cc/150?img=1",
    stories: [{ id: "s1", viewers: [] }]
  },
  {
    userId: 11, // YOU
    name: "Grayson",
    ppic: "https://i.pravatar.cc/150?img=1",
    stories: [] // even if empty, still shown
  }
];

// ✅ PROFESSIONAL PIN LOGIC
const myStory = storyList.filter(u => u.userId === myId);
const followingStories = storyList.filter(u => u.userId !== myId);
console.log(myStory,'mt sto')

export const finalStoryList = [
  {
    userId: myStory?.userId,
    name: myStory?.name,
    ppic: myStory?.ppic,
    stories: myStory?.stories || []
  },
  ...followingStories
];

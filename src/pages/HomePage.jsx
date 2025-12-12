
import React, { useEffect } from 'react'
import Story from '../components/Story'
import {finalStoryList, storyList} from '../components/Modle/StoryModal'
import Navbar from '../components/NavBar'
import { ImImage } from 'react-icons/im'
import { MdOutlineGif } from 'react-icons/md'
import Post from '../components/Post'
import { usePosts } from '../Context/PostContext'


export default function HomePage() {
  const myId = 10;

  const handleStory = (id) =>{
    console.log(id)

  }
  const { posts, fetchPosts, loading } = usePosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className='flex-1 gap-3 overflow-y-auto no-scrollbar   bg-zinc-800 ' >
      <div className="navBar  lg:hidden block ">

        <Navbar/>
      </div>

      {/* Storys  */}
      <div className='w-full  flex items-center gap-3  rounded-xl bg-[#251C2D] shadow p-3 h-28' >
        
        {
          finalStoryList.map((usr,i)=>{

            const hasViewed = usr.stories.some(story => story.viewers.includes(myId))
            return(

              <Story key={i} handleStory={handleStory(usr.userId)} isMine={usr.userId === myId} name={usr.name} hasViewed={hasViewed} ppic={usr.ppic} />
            )
          }
          )
        }
    </div>

    {/* Feed sections  */}

    {/* Add Post  */}
    <div className="add_post mt-1 md:my-3 mb-1.5  px-5 py-2 bg-[#251C2D] m-auto flex items-center justify-between gap-5 w-[90%] h-16  rounded-xl shadow">
        <div className="ppic w-12 h-12 border rounded-full ">
          <img src="" alt="Profile" className='w-full h-full rounded-full object-cover bg-center' />
        </div>
        <div className="whatMind   w-[80%] h-full " >
          <input type="text" placeholder="What's on your mind?" className='w-full outline-none text-white text-md h-full p-2  ' />
        </div>
        <div className="action_Btn flex gap-4 items-center">
          <div className="mediaBtn   ">
            <ImImage size={18} className='text-zinc-400 hover:text-zinc-400/80' />
          </div>
          <div className="gifBtn">
            <MdOutlineGif size={25} className='text-zinc-400 hover:text-zinc-400/80' />
          </div>
          <div className="postBtn">
            <button className='px-4 py-2 hover:bg-violet-900/85 rounded-2xl bg-violet-900 text-white text-md font-semibold shadow' >Post</button>
          </div>
        </div>


    </div>

    {/* Feed Page  */}
        <Post/>
        {posts.map((post) => {
          console.log(post)
          return(

            <Post key={post.id} {...post} />
          )
        })}



    </div>
  )
}

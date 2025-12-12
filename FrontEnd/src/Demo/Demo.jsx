import { useEffect, useState } from "react";
import { useDemo } from "./DemoContext";
import { FaS } from "react-icons/fa6";
import { BiCross } from "react-icons/bi";
import { useAuth } from "./DemoAuth";



export default function Demo() {
    const { posts, AddPost } = useDemo()
    const {state,dispatch} =useAuth()
    const [Open, setOpen] = useState(false)
    const [val, setVal] = useState('');
    const [cmtVal, setCmtVal] = useState('')
    const [CmtOpen, setCmtOpen] = useState(false)
    function handleClick() {
        if (val.trim().length === 0) return;
        AddPost({ name: val,content:'https://i.pravatar.cc/720' })
        setVal('')
        setOpen(true)

        const inter = setTimeout(() => {
            setOpen(false)
        }, 1000);
        // clearTimeout(inter)

    }
    useEffect(()=>{

        console.log(posts)
    },[posts])
    const [post, setPost] = useState(() => {

        const postVal = localStorage.getItem('posts')
        if (postVal) {
            return postVal
        } else {
            return posts
        }

    })
    function AddCmt() {
        setCmtOpen(true)
        AddPost({cmt:cmtVal})
        setCmtVal('')
    }
    return (
        <div className="min-h-screen bg-gray-900 flex justify-center px-4 py-6">
            <div className="w-full max-w-xl space-y-6">

                {/* ===== Create Post Box ===== */}
                <div className="bg-white/50 shadow-sm rounded-xl p-4 space-y-3">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://i.pravatar.cc/50"
                            className="w-10 h-10 rounded-full"
                            alt=""
                        />
                        <input
                            value={val}
                            onChange={(e) => setVal(e.target.value)}
                            placeholder="What's on your mind?"
                            className="bg-gray-100 w-full rounded-full px-4 py-2 outline-none"
                        />
                    </div>

                    <div className="border border-dashed border-gray-300 rounded-xl h-40 flex items-center justify-center text-gray-400 text-sm">
                        Image Preview
                    </div>

                    <button onClick={handleClick} className="bg-blue-600 hover:bg-blue-700 text-white active:scale-95 transition-all     w-full py-2 rounded-lg font-medium">
                        Post
                    </button>
                </div>

                {/* ===== Posts Feed ===== */}
                <div className="space-y-6">

                    {posts?.map((p, i) => (
                        <div key={i} className="bg-white shadow-sm rounded-xl p-4 space-y-4">

                            {/* Header */}
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://i.pravatar.cc/50?img=2"
                                    className="w-10 h-10 rounded-full"
                                    alt="avatar"
                                />

                                <div>
                                  
                                    <h4 className="font-semibold text-gray-800"></h4>
                                    <p className="text-sm text-gray-500">2 hours ago</p>
                                </div>
                            </div>

                            {/* Content */}
                            <p className="text-gray-700">
                                {p.name}
                            </p>

                            {/* Image */}
                            {p.content && (

                                <div className="w-full rounded-xl overflow-hidden">
                                    <img
                                        src={p.content}
                                        className="w-full object-cover"
                                        alt="post"
                                    />
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex justify-between text-gray-600 pt-1">
                                <button className="flex gap-2 items-center hover:text-blue-600">
                                    ❤️ Like {p?.likes && <div className="count">{p.likes} </div>}
                                </button>
                                <button onClick={() => setCmtOpen(true)} className="flex gap-2 items-center hover:text-blue-600">
                                    💬 Comment
                                </button>
                                <button className="flex gap-2 items-center hover:text-blue-600">
                                    🔄 Share
                                </button>
                            </div>

                            <hr />

                            {/* Comment preview */}
                            <div className="flex gap-3">
                                <img
                                    src="https://i.pravatar.cc/40?img=5"
                                    className="w-8 h-8 rounded-full"
                                    alt=""
                                />
                                <div className="bg-gray-100 px-3 py-2 rounded-xl text-sm w-full">
                                    Nice shot! 🔥🔥
                                </div>
                            </div>

                        </div>
                    ))}

                </div>

            </div>
            {Open && (

                <div className="alert transition-fade-in-out  text-center font-bold text-lg flex items-center justify-center w-32 h-12 border fixed bottom-2 bg-green-500 rounded-xl text-white right-5 ">
                    Success
                </div>
            )}
            {
                CmtOpen && (
                    <>
                        <div className="w-screen h-screen  bg-black/70  backdrop-blur absolute overflow-hidden">

                            <div className="overLay w-[70%] h-[50%]  bg-zinc-600/50 border rounded-xl p-4 shadow  -translate-1/2 absolute top-1/2 left-1/2   ">
                                <div onClick={() => setCmtOpen(false)} className="cross active:scale-95 transition-all -top-5 -right-1 text-white absolute hover:text-white/90 "> <BiCross size={20} /> </div>
                                <div className="lst h-[80%] overflow-y-scrool ">
                                    { posts.map((cmtP,i)=>{
                                        if (!cmtP.cmt) return
                                        return(

                                        
                                            <div key={i} className="box w-full h-12 border flex gap-5 items-center  mb-1 p-3 ">
                                        <div className="ppic bg-cyan-400 w-10 h-10 border rounded-full ">

                                        </div>
                                        <div className="content">
                                            {cmtP.cmt}
                                        </div>

                                    </div>
                                        )
                                    })  }
                                    <div className="addxCMT w-[95%]    h-14  bottom-5 left-3 flex items-center  absolute ">

                                        <input value={cmtVal} onChange={(e) => setCmtVal(e.target.value)} placeholder="Enter some comments" type="text" className="px-3 outline-none text-white text-md w-full h-full" />
                                        <div className="post"><button onClick={AddCmt} className="px-4 py-2 bg-blue-500 text-white rounded-2xl ">Post</button></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
}


import { useContext, useReducer, createContext, useEffect } from "react";
export const ACTION = {
    'ADDPOST': 'ADDPOST',
    'ADDCOMMENT': 'ADDCOMMENT',
    'DELETEPOST': 'DELETEPOST',
    'LIKEPOST': 'LIKEPOST',
}

const initState = {
    posts: [],
    comments: [],
    likes: []
}

  

export const DemoContext = createContext()
function demoReducer(state, action) {
    switch (action.type) {
        case ACTION.ADDPOST:
            const updatedPost = [action.payload, ...state.posts]
            localStorage.setItem('posts', JSON.stringify(updatedPost));  
            return {
                ...state, posts: updatedPost
            }

        case ACTION.ADDCOMMENT:
            
            return {
                ...state,cmt:state.posts.map((cmid,i)=>{
                    if (cmid.id === action.payload.id){
                        return {...cmid,cmt:[...cmid.cmt,action.payload.cmt]}
                    }
                    else{
                        cmid
                    }
                })
            }
        case ACTION.DELETEPOST:
            return {
                ...state
            }
        case ACTION.LIKEPOST:
            return {
                ...state
            }
         default:
      return state;

    }
}


// Functions 
// AddPost 

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(demoReducer, initState);
    useEffect(()=>{
        const locSt = localStorage.setItem('posts',JSON.stringify(state))
    },[])


    function AddPost(postData) {
        const newPost = {
            id: Date.now(),
            like: 0,
            Comment: 0
        }
        try {
            dispatch({ type: ACTION.ADDPOST, payload: {...newPost,...postData}})
        }
        catch {
            console.log('error')
        }

    }

      function AddCmt(newCmt){
        dispatch({type:ACTION.ADDCOMMENT,payload:[newCmt,...state.comments]})
        
    }

    return (
        <DemoContext.Provider value={{ ...state, dispatch, AddPost,AddCmt }} >
            {children}
        </DemoContext.Provider>
    )
}

export const useDemo = () => {
    const context = useContext(DemoContext);
    if (!context) {
        throw new Error('useDemo must be used within ContextProvider');
    }
    return context;
}


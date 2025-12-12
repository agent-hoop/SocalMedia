// ProfileContext.js
import { createContext, useContext, useReducer, useEffect } from "react";
import { ProfileReducer, DEFAULT_USERS, PROFILE_ACTIONS } from "./ProfileReducer";

const ProfileContext = createContext();



export const ProfileContextProvider = ({ children }) => {
    const users =[
      {
        id:1011,
        name:'Nibesh',
        userName:'nbs'
      }
    ]
    // 1. LAZY INITIALIZATION
    // We check LocalStorage first. If it exists, we load it. 
    // If not, we use the default list.
    const init = [
  {
    id: 1,
    username: "nibesh",
    name: "Nibesh",
    coverImg: "https://www.w3schools.com/Css/img_forest.jpg",
    pPic: "https://i.pravatar.cc/150?img=1",
    posts: [
      {
        postId: 101,
        postTitle: "Best post ever",
        postContent: ["https://www.w3schools.com/Css/img_forest.jpg"],
        comment:[{userId:1,msgId:12,cmt:'This is awasom'}],
        likeCount: 12,
        commentCount: 5
      },
      {
        postId: 102,
        postTitle: "Some moments",
        postContent: ["https://i.pinimg.com/originals/57/91/5a/57915a34c9fff0dde3b08c4cae6cdabb.jpg"],
        likeCount: 8,
        commentCount: 2
      }
    ]
  },
  {
    id: 2,
    username: "grayson",
    name: "Grayson",
    coverImg: "https://www.w3schools.com/w3images/lights.jpg",
    pPic: "https://i.pravatar.cc/150?img=2",
    posts: [{
        postId: 1022,
        postTitle: "Sdsadd  dasds",
        postContent: ["https://i.pinimg.com/originals/57/91/5a/57915a34c9fff0dde3b08c4cae6cdabb.jpg"],
        likeCount: 8,
        commentCount: 2
      }]
  }
];


    const [state, dispatch] = useReducer(ProfileReducer, init);

    // 2. AUTO-SAVE SIDE EFFECT
    // Whenever 'state' changes (follow/dismiss), we save to LocalStorage immediately.
    useEffect(() => {
        localStorage.setItem("user-suggestions", JSON.stringify(state));
    }, [state]);

    // 3. ACTION CREATORS (Helper functions for cleaner components)
    const actions = {
        toggleFollow: (id) => dispatch({ type: PROFILE_ACTIONS.TOGGLE_FOLLOW, payload: id }),
        dismissUser: (id) => dispatch({ type: PROFILE_ACTIONS.DISMISS_USER, payload: id }),
        resetList: () => dispatch({ type: PROFILE_ACTIONS.RESET_LIST }),
    };

    const contextValue = {
        ...state,
        users,
        state,
        dispatch,
        actions // Exposing helpers
    };

    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
};

// Custom Hook for easy access
export const useProfile = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfile must be used within a ProfileContextProvider");
    }
    return context;
};
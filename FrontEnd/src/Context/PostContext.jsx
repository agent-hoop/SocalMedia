
import { createContext, useContext, useReducer, useCallback } from "react";

// --------------------
// INITIAL STATE
// --------------------
const initialState = {
  posts: [
    {
  id: 101,
  authorId: 10,
  authorName: "Alex",// author of the post
  content: "My post!", // content of the author
  comments: [ // who comments on the post
    {
  id: 999,
  userId: 55, // commentrs id
  userName: "Grayson",
  text: "Nice post!" // commenter cmt 
}

  ],
  commentCount: 0,
  likes: 0
}

  ],        // feed
  loading: false,   // global loading
  error: null,
};

// --------------------
// ACTION TYPES
// --------------------
const ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",

  TOGGLE_LIKE: "TOGGLE_LIKE",
  TOGGLE_BOOKMARK: "TOGGLE_BOOKMARK",

  ADD_COMMENT: "ADD_COMMENT",
  SET_COMMENTS: "SET_COMMENTS",

  ADD_NEW_POST: "ADD_NEW_POST",
};

// --------------------
// REDUCER
// --------------------

function postReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return { ...state, loading: true, error: null };

    case ACTIONS.FETCH_SUCCESS:
      return { ...state, loading: false, posts: action.payload };

    case ACTIONS.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload };

    case ACTIONS.TOGGLE_LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? {
                ...post,
                isLiked: !post.isLiked,
                likeCount: post.isLiked
                  ? post.likeCount - 1
                  : post.likeCount + 1,
              }
            : post
        ),
      };

    case ACTIONS.TOGGLE_BOOKMARK:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload
            ? { ...post, bookmarked: !post.bookmarked }
            : post
        ),
      };

    case ACTIONS.ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? {
                ...post,
                comments: [...post.comments, action.payload.comment],
                commentCount: post.commentCount + 1,
              }
            : post
        ),
      };

    case ACTIONS.SET_COMMENTS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.postId
            ? { ...post, comments: action.payload.comments }
            : post
        ),
      };

    case ACTIONS.ADD_NEW_POST:
        
      return { ...state, posts: [action.payload, ...state.posts] };

    default:
      return state;
  }
}

// --------------------
// CONTEXT
// --------------------
const PostContext = createContext();

// --------------------
// PROVIDER
// --------------------
export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(postReducer, initialState);

  // --------------------
  // API ACTIONS (REAL APP READY)
  // --------------------

  const fetchPosts = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.FETCH_START });

      // ✅ replace with your real API later
      const res = await fetch("https://dummyjson.com/posts");
      const usr = await fetch("https://dummyjson.com/users");
      const usrData = await usr.json();


      const data = await res.json();

      const formatted = data.posts.map((p,i) => ({
        id: p.id,
        name:  usrData.users[i].firstName,
        uname:  p.userId,
        ppic: "https://i.pravatar.cc/150?img=" + p.userId,
        content: p.body,
        contentImg: "https://picsum.photos/600/400?random=" + p.id,
        likeCount: Math.floor(Math.random() * 500),
        commentCount: Math.floor(Math.random() * 20),
        shareCount: Math.floor(Math.random() * 10),
        bookmarked: false,
        isLiked: false,
        comments: [],
        time: "2h ago",
        isVerified: p.userId % 2 === 0,
      }));

      dispatch({ type: ACTIONS.FETCH_SUCCESS, payload: formatted });
    } catch (err) {
      dispatch({ type: ACTIONS.FETCH_ERROR, payload: err.message });
    }
  }, []);

  // ✅ LIKE (Optimistic)
  const toggleLike = async (postId) => {
    dispatch({ type: ACTIONS.TOGGLE_LIKE, payload: postId });

    try {
      // await fetch(`/api/posts/${postId}/like`, { method: "POST" });
    } catch (err) {
      // rollback on failure
      dispatch({ type: ACTIONS.TOGGLE_LIKE, payload: postId });
    }
  };

  // ✅ BOOKMARK
  const toggleBookmark = async (postId) => {
    dispatch({ type: ACTIONS.TOGGLE_BOOKMARK, payload: postId });

    try {
      // await fetch(`/api/posts/${postId}/bookmark`, { method: "POST" });
    } catch (err) {
      dispatch({ type: ACTIONS.TOGGLE_BOOKMARK, payload: postId });
    }
  };

  // ✅ ADD COMMENT
  const addComment = async (postId, text) => {
    const newComment = {
      id: Date.now(),
      text,
      user: "You",
    };

    dispatch({
      type: ACTIONS.ADD_COMMENT,
      payload: { postId, comment: newComment },
    });
  };

  // ✅ CREATE NEW POST
  const addNewPost = (postData) => {
    dispatch({
      type: ACTIONS.ADD_NEW_POST,
      payload: {
        ...postData,
        id: Date.now(),
        likeCount: 0,
        commentCount: 0,
        shareCount: 0,
        comments: [],
        bookmarked: false,
        isLiked: false,
      },
    });
  };

  // --------------------
  // EXPORT
  // --------------------
  return (
    <PostContext.Provider
      value={{
        ...state,
        fetchPosts,
        toggleLike,
        toggleBookmark,
        addComment,
        addNewPost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}

// --------------------
// CUSTOM HOOK
// --------------------
export const usePosts = () => useContext(PostContext);

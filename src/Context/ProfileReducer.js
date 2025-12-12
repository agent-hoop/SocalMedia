// ProfileReducer.js

// 1. ACTION TYPES (Best practice to prevent typos)
export const PROFILE_ACTIONS = {
    TOGGLE_FOLLOW: 'TOGGLE_FOLLOW',
    DISMISS_USER: 'DISMISS_USER', // New: Remove user from suggestions
    RESET_LIST: 'RESET_LIST',
    DELET_POST: 'DELET'     // New: Restore original list
};

// 2. MOCK DATA (Simulating an API response)
export const DEFAULT_USERS = [
    {
        id: Date.now(),
        name: 'Nibesh',
        userName: '@nbs_official',
        isFollow: false,
        ppic: '',
        followCount: 120
    },
    {
        id: Date.now() + 1,
        name: 'Elon Musk',
        userName: '@elonmusk',
        isFollow: false,
        ppic: 'https://i.pravatar.cc/150?img=11',
        followCount: 4500
    },
    {
        id: Date.now() + 3,
        name: 'Tech Insider',
        userName: '@tech_daily',
        isFollow: true,
        ppic: 'https://i.pravatar.cc/150?img=33',
        followCount: 8900
    },
    {
        id: Date.now() + 11,
        name: 'Design Hub',
        userName: '@design_hub',
        isFollow: false,
        ppic: 'https://i.pravatar.cc/150?img=5',
        followCount: 50
    }
];

// 3. THE REDUCER FUNCTION
export const ProfileReducer = (state, action) => {
  switch (action.type) {
    case PROFILE_ACTIONS.TOGGLE_FOLLOW:
      return state.map(profile =>
        profile.id === action.payload
          ? { ...profile, isFollow: !profile.isFollow }
          : profile
      );

    case PROFILE_ACTIONS.DELETE_POST:
      return state.map(profile =>
        profile.id === action.payload.userId
          ? {
              ...profile,
              posts: profile.posts.filter(
                post => post.postId !== action.payload.postId
              )
            }
          : profile
      );

    case PROFILE_ACTIONS.ADD_POST:
      return state.map(profile =>
        profile.id === action.payload.userId
          ? {
              ...profile,
              posts: [action.payload.newPost, ...profile.posts]
            }
          : profile
      );

    default:
      return state;
  }
};

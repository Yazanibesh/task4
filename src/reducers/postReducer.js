import * as actionTypes from '../actions/types/postActionTypes';

const initialState = {
  listPostsLoading: false,
  editPostLoading: false,
  createPostLoading: false,
  listPosts: [],
  editPost: null,
  createPost: null,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LIST_POSTS_REQUEST: {
      return {
        ...state,
        listPostsLoading: true,
      };
    }
    case actionTypes.LIST_POSTS_SUCCESS: {
      return {
        ...state,
        listPostsLoading: false,
        listPosts: [...action.payload],
      };
    }
    case actionTypes.LIST_POSTS_ERROR: {
      return {
        ...state,
        listPostsLoading: false,
      };
    }
    case actionTypes.EDIT_POST_REQUEST: {
      return {
        ...state,
        editPostLoading: true,
      };
    }
    case actionTypes.EDIT_POST_SUCCESS: {
      return {
        ...state,
        editPostLoading: false,
        editPost: action.payload,
      };
    }
    case actionTypes.EDIT_POST_ERROR: {
      return {
        ...state,
        editPostLoading: false,
      };
    }
    case actionTypes.CREATE_POST_REQUEST: {
      return {
        ...state,
        createPostLoading: true,
      };
    }
    case actionTypes.CREATE_POST_SUCCESS: {
      return {
        ...state,
        createPostLoading: false,
        createPost: action.payload,
      };
    }
    case actionTypes.CREATE_POST_ERROR: {
      return {
        ...state,
        createPostLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default commonReducer;

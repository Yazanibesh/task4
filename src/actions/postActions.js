import { message } from 'antd';
import * as actionTypes from './types/postActionTypes';
import Api from '../services/Api';
import { eventEmmiter } from './commonActions';
import { EVENTS } from '../constants/eventConstant';

export const listPostsRequest = () => ({
  type: actionTypes.LIST_POSTS_REQUEST,
});

export const listPostsSuccess = (data) => ({
  type: actionTypes.LIST_POSTS_SUCCESS,
  payload: data,
});

export const listPostsError = () => ({
  type: actionTypes.LIST_POSTS_ERROR,
});

export const fetchListPosts = (queryParams) => {
  return (dispatch) => {
    dispatch(listPostsRequest());
    return Api.get('/posts', {}, queryParams)
      .then((res) => {
        dispatch(listPostsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(listPostsError());
      });
  };
};

export const editPostRequest = () => ({
  type: actionTypes.EDIT_POST_REQUEST,
});

export const editPostSuccess = (data) => ({
  type: actionTypes.EDIT_POST_SUCCESS,
  payload: data,
});

export const editPostError = () => ({
  type: actionTypes.EDIT_POST_ERROR,
});

export const editPost = (data, id) => {
  return (dispatch) => {
    dispatch(editPostRequest());
    return Api.put('/posts/:id', data, { id }, {})
      .then((res) => {
        dispatch(editPostSuccess(res.data));
        dispatch(eventEmmiter(EVENTS.EDIT_POST_SUCCESS));
        message.success('Update post successfully');
      })
      .catch((err) => {
        dispatch(editPostError());
        message.error('Something went wrong');
      });
  };
};

export const createPostRequest = () => ({
  type: actionTypes.CREATE_POST_REQUEST,
});

export const createPostSuccess = (data) => ({
  type: actionTypes.CREATE_POST_SUCCESS,
  payload: data,
});

export const createPostError = () => ({
  type: actionTypes.CREATE_POST_ERROR,
});

export const createPost = (data) => {
  return (dispatch) => {
    dispatch(createPostRequest());
    return Api.post('/posts', data, {}, {})
      .then((res) => {
        dispatch(createPostSuccess(res.data));
        dispatch(eventEmmiter(EVENTS.CREATE_POST_SUCCESS));
        message.success('Create post successfully');
      })
      .catch((err) => {
        dispatch(createPostError());
        message.error('Something went wrong');
      });
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    return Api.delete('/posts/:id', { id }, {})
      .then((res) => {
        dispatch(eventEmmiter(EVENTS.DELETE_POST_SUCCESS));
        message.success('Delete post successfully');
      })
      .catch((err) => {
        dispatch(createPostError());
        message.error('Something went wrong');
      });
  };
};

import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import moment from 'moment';

// Redux
import { fetchListPosts, deletePost } from '../../actions/postActions';

// Components
import { EditPostModal } from './EditPostModal';
import { CreatePostModal } from './CreatePostModal';

// Constants
import { EVENTS } from '../../constants/eventConstant';

import './Task2.scss';

const Task2 = () => {
  const dispatch = useDispatch();
  const { listPosts } = useSelector((store) => store.posts);
  const { event } = useSelector((store) => store.common);

  const [pagination, setPagination] = useState({
    limit: 100,
    page: 1,
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [postData, setPostData] = useState(null);

  const resetModal = () => {
    setShowEditModal(false);
    setShowCreateModal(false);
    setPostData(null);
  }

  const handleEditOk = () => {
    resetModal();
  };

  const handleEditCancel = () => {
    resetModal();
  };

  const handleCreateOk = () => {
    resetModal();
  };

  const handleCreateCancel = () => {
    resetModal();
  };

  const handleEditPost = (item) => {
    setPostData(item);
    setShowEditModal(true);
  };

  const handleDeletePost = (item) => {
    console.log(item);
    dispatch(deletePost(item._id));
  };

  useEffect(() => {
    dispatch(fetchListPosts(pagination));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination]);

  useEffect(() => {
    console.log('listPosts', listPosts);
  }, [listPosts]);

  useEffect(() => {
    if (event) {
      switch (event) {
        case EVENTS.EDIT_POST_SUCCESS: {
          dispatch(fetchListPosts(pagination));
          break;
        }
        case EVENTS.CREATE_POST_SUCCESS: {
          dispatch(fetchListPosts(pagination));
          break;
        }
        case EVENTS.DELETE_POST_SUCCESS: {
          dispatch(fetchListPosts(pagination));
          break;
        }
        default: {
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <Fragment>
      <div className="task2-content">
        <div className="task2-content-title">
          <h3>List Posts</h3>
          <Button type="primary" onClick={() => setShowCreateModal(true)}>Create post</Button>
        </div>

        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Content</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody>
            {listPosts && listPosts.length ? listPosts.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td>
                <td>{item.content}</td>
                <td>{moment(item.createdAt).format('LLL')}</td>
                <td className="actions">
                  <Button type="primary" onClick={() => handleEditPost(item)} icon={<EditOutlined />} />
                  
                  <Popconfirm
                    title="Are you sure to delete this post?"
                    onConfirm={() => handleDeletePost(item)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button type="primary" icon={<DeleteOutlined />} />
                  </Popconfirm>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>

      <EditPostModal
        data={postData}
        visible={showEditModal}
        okCb={handleEditOk}
        cancelCb={handleEditCancel}
      />

      <CreatePostModal
        visible={showCreateModal}
        okCb={handleCreateOk}
        cancelCb={handleCreateCancel}
      />
    </Fragment>
  );
};

export default Task2;

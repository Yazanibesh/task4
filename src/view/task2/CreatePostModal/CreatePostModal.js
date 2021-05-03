import React, { Fragment, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import { createPost } from '../../../actions/postActions';

// Constants
import { EVENTS } from '../../../constants/eventConstant';

import './CreatePostModal.scss';

const { TextArea } = Input;

const CreatePostModal = ({ visible, okCb, cancelCb }) => {
  const dispatch = useDispatch();

  const { createPostLoading } = useSelector((store) => store.posts);
  const { event } = useSelector((store) => store.common);

  const handleOk = () => {
    resetForm();
    okCb();
  }

  const handleCancel = () => {
    resetForm();
    cancelCb();
  }

  const resetForm = () => {
    formik.resetForm();
  }

  const validate = values => {
    const errors = {};

    if (!values.title || values.title.trim() === '') {
      errors['title'] = 'Title is required';
    }

    if (!values.content || values.content.trim() === '') {
      errors['content'] = 'Content is required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validate,
    onSubmit: values => {
      dispatch(createPost(values));
    },
  });

  useEffect(() => {
    if (event) {
      switch(event) {
        case EVENTS.CREATE_POST_SUCCESS: {
          handleOk();
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
      <Modal
        title="Create Post"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        className="post-modal-content"
      >
        <form onSubmit={formik.handleSubmit}>
          <div className="form-item">
            <label>Title</label>
            <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
            {formik.errors.title && formik.errors.title !== '' ? (
              <p className="error">{formik.errors.title}</p>
            ) : null}
          </div>

          <div className="form-item">
            <label>Content</label>
            <TextArea name="content" rows={4} onChange={formik.handleChange} value={formik.values.content} />
            {formik.errors.content && formik.errors.content !== '' ? (
              <p className="error">{formik.errors.content}</p>
            ) : null}
          </div>

          <div className="submit-btn">
            {createPostLoading ? (
              <Button type="primary" loading>Create</Button>
            ) : (
              <Button htmlType="submit" type="primary">Create</Button>
            )}
          </div>
        </form>
      </Modal>
    </Fragment>
  );
}

CreatePostModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  okCb: PropTypes.func.isRequired,
  cancelCb: PropTypes.func.isRequired,
};

export default CreatePostModal;

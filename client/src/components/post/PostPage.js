import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../global/Spinner';
import { setAlert } from '../../actions/alert';
import DetailedPost from './DetailedPost';

const PostPage = ({ setAlert, match }) => {
  // const [post, setPost] = useState(null);

  // useEffect(async () => {
  //   await getPageById(match.params.post_id);
  // }, [match.params.post_id]);

  // const getPageById = async (postId) => {
  //   try {
  //     const res = await axios.get(`/api/posts/${postId}`);
  //     console.log(res.data);
  //     setPost(res.data);
  //   } catch (err) {
  //     console.log(err);
  //     setAlert(err.response.statusText);
  //   }
  // };

  return (
    <div class="flex justify-center font-main">
      <div class="flex flex-col w-4/5">
        <DetailedPost />
        <span class="text-xl ml-6">4 comments</span>
      </div>
    </div>
  );
};

PostPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(PostPage);

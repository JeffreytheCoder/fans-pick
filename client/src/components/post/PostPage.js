import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../global/Spinner';
import { setAlert } from '../../actions/alert';
import DetailedPost from './DetailedPost';

const PostPage = ({ setAlert, match }) => {
  const [postLoading, setPostLoading] = useState(true);
  const [post, setPost] = useState(null);

  const getPostById = async (postId) => {
    try {
      const res = await axios.get('/api/posts/' + postId);
      setPost(res.data.post);
      setPostLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    await getPostById(match.params.post_id);
  }, [match.params.post_id]);

  return (
    <Fragment>
      {postLoading ? (
        <Spinner />
      ) : (
        <div class="flex justify-center font-main">
          <div class="flex flex-col w-4/5">
            <DetailedPost
              postId={post.postId}
              title={post.title ? post.title : ''}
              description={post.description}
              avatar={post.avatar}
              username={post.username}
              upvotes={post.likes.length}
              adopted={post.adopted}
              date={post.date}
            />
            <span class="text-xl ml-6">
              {post.subPosts.length == 0
                ? 'No comments yet, come post the first one!'
                : `${post.subPosts.length} comments`}
            </span>
          </div>
        </div>
      )}
    </Fragment>
  );
};

PostPage.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(PostPage);

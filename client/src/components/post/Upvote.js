import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { setAlert } from '../../actions/alert';

const Upvote = ({ postId, upvotes, downvotes, auth, setAlert }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  const upvotePost = async () => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);
      setUpvoted(!upvoted);
    } catch (err) {
      console.log(err);
      setAlert(err.response.data.msg, 'danger');
    }
  };

  const downvotePost = async () => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);
      setDownvoted(!downvoted);
    } catch (err) {
      setAlert(err.response.data.msg, 'danger');
    }
  };

  // check if already upvoted or downvoted
  useEffect(async () => {
    if (auth.isAuthenticated) {
      console.log(upvotes);
      upvotes.forEach((upvote) => {
        if (upvote.user === auth.user._id) {
          setUpvoted(true);
        }
      });
    }
  }, [upvotes, auth]);

  useEffect(async () => {
    if (auth.isAuthenticated) {
      console.log(downvotes);
      downvotes.forEach((downvote) => {
        if (downvote.user === auth.user._id) {
          setDownvoted(true);
        }
      });
    }
  }, [downvotes, auth]);

  return (
    <div class="flex flex-col items-center mr-8">
      <button onClick={() => upvotePost()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class={`h-7 w-7 ${
            upvoted
              ? 'font-bold text-green-500'
              : 'hover:text-green-500 hover-transition'
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={`${upvoted ? 3 : 2}`}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
      <span class="font-semibold text-lg">
        {upvotes.length - downvotes.length}
      </span>
      <button onClick={() => downvotePost()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class={`h-7 w-7 ${
            downvoted
              ? 'font-bold text-purple-600'
              : 'hover:text-purple-600 hover-transition'
          }`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={`${downvoted ? 3 : 2}`}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
    </div>
  );
};

Upvote.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Upvote);

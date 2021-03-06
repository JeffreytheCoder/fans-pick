import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import { setAlert } from '../../actions/alert';

const Upvote = ({ postId, upvotes, downvotes, auth, setAlert }) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [upvoteChange, setUpvoteChange] = useState(0);

  const upvotePost = async () => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);
      setUpvoted(!upvoted);
      if (downvoted) {
        setDownvoted(false);
      }
      setUpvoteChange(1);
    } catch (err) {
      console.log(err);
      setAlert(err.response.data.msg, 'danger');
    }
  };

  const downvotePost = async () => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);
      setDownvoted(!downvoted);
      if (upvoted) {
        setUpvoted(false);
      }
      setUpvoteChange(-1);
    } catch (err) {
      setAlert(err.response.data.msg, 'danger');
    }
  };

  // check if already upvoted or downvoted
  useEffect(async () => {
    if (upvotes && auth.isAuthenticated) {
      upvotes.forEach((upvote) => {
        if (upvote.user === auth.user._id) {
          setUpvoted(true);
        }
      });
    }
  }, [upvotes, auth]);

  useEffect(async () => {
    if (downvotes && auth.isAuthenticated) {
      downvotes.forEach((downvote) => {
        if (downvote.user === auth.user._id) {
          setDownvoted(true);
        }
      });
    }
  }, [downvotes, auth]);

  return (
    <div class="flex flex-col items-center">
      <button onClick={() => upvotePost()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class={`h-6 w-6 md:h-7 md:w-7 ${
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
      <span class="font-semibold md:text-lg">
        {/* {upvotes && downvotes
          ? upvotes.length - downvotes.length + upvoteChange
          : upvoteChange} */}
        53
      </span>
      <button onClick={() => downvotePost()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          class={`h-6 h-6 md:h-7 md:w-7 ${
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

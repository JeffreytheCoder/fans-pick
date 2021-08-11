import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Upvote from './Upvote';
import { setAlert } from '../../actions/alert';

const Post = ({
  postId,
  title,
  description,
  avatar,
  username,
  upvotes,
  downvotes,
  subPosts,
  adopted,
  date,
  pageId,
  auth,
  setAlert,
}) => {
  const isPageOwner = () => {
    auth.user.pages.forEach((page) => {
      if (page._id === pageId) {
        return true;
      }
    });
    return false;
  };

  const adoptPost = async () => {
    try {
      const res = await axios.put(`/api/posts/adopt/${postId}`);
    } catch (err) {
      setAlert(err.response.statusText);
      console.log(err);
    }
  };

  // useEffect(() => {
  //   console.log(auth.user.pages);
  //   console.log(pageId);
  //   console.log(auth.user.pages.includes(pageId));
  // });

  return (
    <div class="font-main rounded-lg h-30 w-4/5 border-2 p-6 relative mb-7">
      <div class="relative flex flex-row mr-12 items-center mb-2">
        <Link to={`/post/${postId}`}>
          <div class="text-xl font-bold mr-4"> {title}</div>
        </Link>
        {isPageOwner ? (
          adopted ? (
            <button class="z-10">
              <div class="flex flex-row items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-lg font-bold text-green-500">adopted</span>
              </div>
            </button>
          ) : (
            <button onClick={() => adoptPost()}>
              <div class="flex flex-row text-green-500 text-opacity-50 hover:text-opacity-100  hover-transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span class="text-lg font-bold">adopt</span>
              </div>
            </button>
          )
        ) : adopted ? (
          <div class="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span class="text-lg font-bold text-green-500">adopted</span>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      <div class="text-lg truncate pb-4 mr-20">{description}</div>

      <div class="relative bottom-0 left-0 flex flex-row items-center flex-wrap">
        <button>
          <div class="flex flex-row items-center mr-6">
            <img
              class="h-8 mr-3 rounded-full"
              src={avatar}
              alt={username}
            ></img>
            <span class="font-semibold hover:underline hover-transition">
              {username}
            </span>
          </div>
        </button>

        <div class="flex flex-row mr-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
          <span class="ml-1">{subPosts}</span>
        </div>

        {/* <div class={`flex flex-row ${tags.length > 0 ? 'mr-2' : ''}`}>
          {tags.map((tag, index) => {
            return (
              <span
                key="index"
                class="text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full mr-2"
              >
                {tag}
              </span>
            );
          })}
        </div> */}

        <div class="flex flex-row mr-6">
          <span class="ml-1">{moment(date).fromNow()}</span>
        </div>
      </div>
      <div class="absolute top-0 right-0 flex flex-col items-center m-6">
        <Upvote postId={postId} upvotes={upvotes} downvotes={downvotes} />
      </div>
    </div>
  );
};

Post.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(Post);

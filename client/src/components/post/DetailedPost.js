import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Upvote from './Upvote';
import { setAlert } from '../../actions/alert';

const DetailedPost = ({
  postId,
  title,
  description,
  avatar,
  username,
  upvotes,
  downvotes,
  adopted,
  date,
  pageId,
  auth,
  setAlert,
  isSubSubPost = false,
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
      console.log(err);
    }
  };

  return (
    <div
      class={`flex flex-row font-main relative border-2 rounded ${
        title ? 'mt-12' : ''
      } ${isSubSubPost ? 'ml-12' : ''} mb-6 px-8 pt-8`}
    >
      <Upvote postId={postId} upvotes={upvotes} downvotes={downvotes} />
      <div class="flex flex-col">
        <div class="flex flex-row items-center mb-4 text-lg">
          <div class="flex">
            <button>
              <div class="flex flex-row items-center mr-4">
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
          </div>

          <div class="flex">
            <span>{moment(date).fromNow()}</span>
          </div>
        </div>
        <div class={`text-3xl font-bold mb-4 ${title ? '' : 'hidden'}`}>
          {title}
        </div>

        <div class="flex text-xl leading-relaxed mb-2">{description}</div>

        <div class="flex flex-row -ml-4 text-lg">
          {title && isPageOwner ? (
            adopted ? (
              <button class="z-10">
                <div class="flex flex-row items-center justify-center mr-4">
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
                <div class="flex flex-row text-green-500 text-opacity-50 hover:text-opacity-100  hover-transition mr-4">
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
          ) : title && adopted ? (
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
          <div class="flex flex-row items-center p-4 hover:bg-gray-200 hover-transition rounded font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
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
            <span class="ml-2">Comment</span>
          </div>
          <div class="flex flex-row items-center p-4 hover:bg-gray-200 hover-transition rounded font-semibold">
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
                d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
              />
            </svg>
            <span class="ml-2">Report</span>
          </div>
        </div>
      </div>

      {/* <div class="absolute bottom-0 left-0 flex flex-row bg-gray-200 rounded w-full p-4">
          <img
            class="h-8 rounded-full"
            src="//www.gravatar.com/avatar/fc9cc147e619eef83bb25fc26db0eda9?s=200&r=pg&d=mm"
            alt="user"
          ></img>
          <input
            class="w-full mx-3 px-3 rounded"
            placeholder="Write a reply"
          ></input>
        </div> */}
    </div>
  );
};

DetailedPost.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert })(DetailedPost);

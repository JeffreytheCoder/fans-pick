import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Upvote from './Upvote';
import { setAlert } from '../../actions/alert';
// import useForceUpdate from '../hooks/useForceUpdate';

const useForceUpdate = () => {
  const [value, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
};

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
  page,
  auth,
  setAlert,
  isSubSubPost = false,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [reply, setReply] = useState('');

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

  const createReply = async (e) => {
    e.preventDefault();
    console.log(reply);
    if (!reply) {
      setAlert('Reply cannot be empty!', 'danger');
    } else {
      const config = {
        headers: { 'Content-Type': 'application/json' },
      };
      const body = JSON.stringify({
        page_id: page.page._id,
        section: 'subposts',
        description: reply,
        superpost_id: postId,
      });
      console.log(body);

      try {
        const res = await axios.post('/api/posts/create', body, config);
        console.log(res.data);
        setTimeout(() => {
          setAlert('Reply created!', 'success');
        }, 3000);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Fragment>
      <div class="flex flex-col mb-2">
        <div
          class={`flex flex-row font-main relative border-2 rounded ${
            isSubSubPost ? 'ml-4 md:ml-8 lg:ml-12' : ''
          } mb-2 md:mb-4 px-4 md:px-8 pt-4 md:pt-8`}
        >
          <div class="mr-3 md:mr-6">
            <Upvote postId={postId} upvotes={upvotes} downvotes={downvotes} />
          </div>
          <div class="flex flex-col">
            <div class="flex flex-row items-center mb-2 md:mb-4 lg:text-lg flex-wrap">
              <div class="flex md:mr-3 mr-6">
                <button>
                  <div class="flex flex-row items-center">
                    <img
                      class="h-8 w-8 mr-3 rounded-full"
                      src={avatar}
                      alt={username}
                    ></img>
                    <span class="font-semibold hover:underline hover-transition">
                      {username}
                    </span>
                  </div>
                </button>
              </div>

              {/* <div class={`"flex mr-2" ${title ? '' : 'hidden'}`}>
                <Link to={`/page/${page.page._id}`}>
                  <div class="flex flex-row items-center mr-4">
                    <img
                      class="h-8 w-8 mr-3 rounded-full"
                      src={page.page.avatar}
                      alt={page.page.name}
                    ></img>
                    <span class="font-semibold hover:underline hover-transition">
                      {page.page.name}
                    </span>
                  </div>
                </Link>
              </div> */}

              <div class="flex">
                <span>{moment(date).fromNow()}</span>
              </div>
            </div>
            <div
              class={`text-xl md:text-2xl lg:text-3xl font-bold mb-2 md:mb-4 ${
                title ? '' : 'hidden'
              }`}
            >
              {title}
            </div>

            <div
              class={`flex flex-wrap md:text-lg lg:text-xl leading-relaxed ${
                title ? 'mb-2' : 'mb-4 md:mb-8'
              }`}
            >
              {description}
            </div>

            <div class="flex flex-row -ml-4 md:text-lg">
              {/* {title && isPageOwner ? (
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
                      <span class="text-lg font-bold text-green-500">
                        adopted
                      </span>
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
              )} */}
              <div
                class={`flex flex-row items-center p-2 md:p-4 hover:bg-gray-200 hover-transition rounded font-semibold ${
                  title ? '' : 'hidden'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-7 md:w-7"
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
                <button onClick={() => setShowReply(!showReply)}>
                  <span class="ml-2">Comment</span>
                </button>
              </div>
              <div
                class={`flex flex-row items-center p-2 md:p-4 hover:bg-gray-200 hover-transition rounded font-semibold ${
                  title ? '' : 'hidden'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-7 md:w-7"
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
        <div>
          <form
            class={`flex flex-row w-full items-center mb-4 text-lg ${
              showReply ? '' : 'hidden'
            }`}
          >
            <div class="flex-grow mr-4">
              <input
                className="w-full appearance-none border rounded py-3 px-4 text-gray-700 leading-tight input-outline"
                placeholder={`Reply to ${username}...`}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              ></input>
            </div>
            <button
              onClick={createReply}
              className="flex-none font-semibold px-4 py-3 leading-none rounded-md border-2 border-white text-white bg-green-500 hover:bg-white hover:border-2 hover:text-green-500 hover:border-green-500 hover-transition"
            >
              Reply
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

DetailedPost.propTypes = {
  setAlert: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  page: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  page: state.page,
});

export default connect(mapStateToProps, { setAlert })(DetailedPost);

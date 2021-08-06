import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Transition } from '@headlessui/react';

import Post from '../post/Post';
import Spinner from '../global/Spinner';
import { getPageById, getPostByPageId } from '../../actions/page';
import { setAlert } from '../../actions/alert';

const Page = ({
  getPageById,
  getPostByPageId,
  page,
  auth,
  match,
  setAlert,
}) => {
  const [section, setSection] = useState('');
  const [sorting, setSorting] = useState('date');
  const [order, setOrder] = useState('desc');
  const [filterClicked, setFilterClicked] = useState(false);
  const [followed, setFollowed] = useState(false);

  useEffect(async () => {
    await getPageById(match.params.page_id);
  }, [match.params.page_id]);

  useEffect(async () => {
    await getPostByPageId(match.params.page_id, section, sorting, order);
  }, [match.params.page_id, section, sorting, order]);

  useEffect(() => {
    if (page.page && auth.isAuthenticated) {
      if (
        auth.user.follows.some(
          (follow) => follow._id.toString() == page.page._id.toString()
        )
      ) {
        setFollowed(true);
      }
    }
  }, [page.page, auth.isAuthenticated]);

  const followPage = async () => {
    try {
      const res = await axios.put(`/api/pages/follow/${page.page._id}`);
      setFollowed(true);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setAlert(err.response.msg, 'danger');
    }
  };

  const unfollowPage = async () => {
    try {
      const res = await axios.put(`/api/pages/unfollow/${page.page._id}`);
      setFollowed(false);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setAlert(err.response.msg, 'danger');
    }
  };

  return (
    <Fragment>
      {page.pageLoading && page.postsLoading ? (
        <Spinner />
      ) : (
        <div class="flex flex-col items-center font-main relative">
          {auth.isAuthenticated &&
            auth.loading == false &&
            auth.user._id == page.page.user && (
              // add edit page link
              <button class="absolute top-0 right-0 m-6 btn  hover-transition">
                Edit Page
              </button>
            )}
          <div class="flex flex-col items-center mt-12 mb-8">
            <img
              class="h-40 w-40 rounded-full"
              src={page.page.avatar}
              alt="avatar"
            ></img>

            <div class="flex flex-row items-center justify-center mt-4 mb-3">
              <div class="text-2xl font-bold"> {page.page.name} </div>
              {followed ? (
                <button
                  class="btn rounded-full py-1.5 bg-green-500 text-white  hover-transition"
                  onClick={() => unfollowPage()}
                >
                  Joined{' '}
                </button>
              ) : (
                <button
                  class="btn rounded-full py-1.5"
                  onClick={() => followPage()}
                >
                  Join{' '}
                </button>
              )}
            </div>

            <div class="flex flex-row items-center justify-center text-xl mb-3">
              <span class="mr-6">
                {page.page.followers.length + ' ' + page.page.fansName + 's'}
              </span>
              <span>
                {Math.floor(page.page.followers.length / 5) + ' active today'}
              </span>
            </div>

            <div class="text-xl italic">{page.page.bio}</div>
          </div>

          <div class="flex flex-row justify-between mb-6 w-4/5">
            <div class="flex flex-row items-center">
              <button
                onClick={() => {
                  setSection('');
                }}
              >
                <span
                  key="index"
                  class={`text-xl px-4 py-2 rounded mr-4 ${
                    '' === section
                      ? 'bg-gray-400 text-black font-bold'
                      : 'bg-gray-200 text-gray-600 font-semibold hover:bg-gray-400 hover:text-gray-800 hover:font-bold hover-transition'
                  }`}
                >
                  All
                </span>
              </button>
              {page.page.sections.map((sec, index) => {
                return (
                  <button
                    onClick={() => {
                      setSection(sec.name);
                    }}
                  >
                    <span
                      key="index"
                      class={`text-xl px-4 py-2 rounded mr-4 capitalize ${
                        sec.name === section
                          ? 'bg-gray-400 text-black font-bold'
                          : 'bg-gray-200 text-gray-600 font-semibold hover:bg-gray-400 hover:text-gray-800 hover:font-bold hover-transition'
                      }`}
                    >
                      {sec.name}
                    </span>
                  </button>
                );
              })}
            </div>
            <div class="flex flex-row items-center">
              <div class="relative inline-block text-left mr-4">
                <div>
                  <button
                    type="button"
                    class="text-lg inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-green-400 hover-transition"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setFilterClicked(!filterClicked)}
                  >
                    Order by
                    <svg
                      class="-mr-1 ml-2 mt-0.5 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                        strokeWidth={2}
                      />
                    </svg>
                  </button>
                </div>

                <Transition
                  show={filterClicked}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <div
                    class={`z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                  >
                    <div class="py-1" role="none">
                      <button
                        class={`text-gray-700 block px-4 py-2 text-lg w-full ${
                          sorting === 'date' && order === 'desc'
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-300 hover-transition'
                        }`}
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                        onClick={() => {
                          setSorting('date');
                          setOrder('desc');
                          setFilterClicked(false);
                        }}
                      >
                        Most Recent
                      </button>

                      <button
                        class={`text-gray-700 block px-4 py-2 text-lg w-full ${
                          sorting === 'date' && order === 'asc'
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-300 hover-transition'
                        }`}
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                        onClick={() => {
                          setSorting('date');
                          setOrder('asc');
                          setFilterClicked(false);
                        }}
                      >
                        Least Recent
                      </button>

                      <button
                        class={`text-gray-700 block px-4 py-2 text-lg w-full ${
                          sorting === 'likes' && order === 'desc'
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-300 hover-transition'
                        }`}
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                        onClick={() => {
                          setSorting('likes');
                          setOrder('desc');
                          setFilterClicked(false);
                        }}
                      >
                        Most Upvotes
                      </button>

                      <button
                        class={`text-gray-700 block px-4 py-2 text-lg w-full ${
                          sorting === 'likes' && order === 'asc'
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-300 hover-transition'
                        }`}
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                        onClick={() => {
                          setSorting('likes');
                          setOrder('asc');
                          setFilterClicked(false);
                        }}
                      >
                        Least Upvotes
                      </button>

                      <button
                        class={`text-gray-700 block px-4 py-2 text-lg w-full ${
                          sorting === 'adopted' && order === 'true'
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-300 hover-transition'
                        }`}
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                        onClick={() => {
                          setSorting('adopted');
                          setOrder('true');
                          setFilterClicked(false);
                        }}
                      >
                        Adopted
                      </button>

                      <button
                        class={`text-gray-700 block px-4 py-2 text-lg w-full ${
                          sorting === 'adopted' && order === 'false'
                            ? 'bg-gray-300'
                            : 'hover:bg-gray-300 hover-transition'
                        }`}
                        role="menuitem"
                        tabindex="-1"
                        id="menu-item-0"
                        onClick={() => {
                          setSorting('adopted');
                          setOrder('false');
                          setFilterClicked(false);
                        }}
                      >
                        Not Adopted
                      </button>
                    </div>
                  </div>
                </Transition>
              </div>

              <button class="inline-block text-xl font-semibold px-4 py-3 leading-none rounded-md border-2 border-white text-white bg-green-500 hover:bg-white hover:border-2 hover:text-green-500 hover:border-green-500 hover-transition">
                New Post
              </button>
            </div>
          </div>

          <div class="flex flex-col items-center w-screen">
            {page.posts.length === 0 ? (
              <span class="text-2xl my-10">
                No post yet, come post the first one!
              </span>
            ) : (
              page.posts.map(
                (
                  {
                    _id,
                    title,
                    description,
                    avatar,
                    username,
                    likes,
                    subPosts,
                    adopted,
                    date,
                    page,
                  },
                  index
                ) => {
                  return (
                    <Post
                      key={index}
                      postId={_id}
                      title={title}
                      description={description}
                      avatar={avatar}
                      username={username}
                      upvotes={likes.length}
                      subPosts={subPosts.length}
                      adopted={adopted}
                      date={date}
                      pageId={page}
                    ></Post>
                  );
                }
              )
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Page.propTypes = {
  getPageById: PropTypes.func.isRequired,
  getPostByPageId: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.page,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  getPageById,
  getPostByPageId,
  setAlert,
})(Page);

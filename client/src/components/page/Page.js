import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Post from '../post/Post';
import Spinner from '../global/Spinner';
import { getPageById, getPostById } from '../../actions/page';

const Page = ({ getPageById, getPostById, page, auth, match }) => {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(async () => {
    await getPageById(match.params.page_id);
  }, [match.params.page_id]);

  useEffect(async () => {
    if (page.page) {
      page.page.posts.forEach(async (postId) => {
        await getPostById(postId._id);
      });
    }
  }, [page.page]);

  useEffect(async () => {
    if (page.page) {
      if (page.page.posts.length == page.posts.length) {
        setPageLoaded(true);
        console.log(page);
        console.log('Page loaded!');
      }
    }
  }, [page]);

  return (
    <Fragment>
      {!pageLoaded ? (
        <Spinner />
      ) : (
        <div class="flex flex-col items-center font-main relative">
          {auth &&
            page &&
            auth.isAuthenticated &&
            auth.loading == false &&
            auth.user._id == page.page.user && (
              // add edit page link
              <button class="absolute top-0 right-0 m-6 btn">Edit Page</button>
            )}
          <div class="flex flex-col items-center m-12">
            <img
              class="h-40 w-40 rounded-full"
              src={page.page.avatar}
              alt="avatar"
            ></img>

            <div class="flex flex-row items-center justify-center mt-4 mb-3">
              <div class="text-2xl font-bold"> {page.page.name} </div>
              <button class="btn rounded-full py-1.5">
                {page.page.followers.includes(auth.user._id)
                  ? 'Joined'
                  : 'Join'}
              </button>
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

            {/* <button class="text-lg bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {page.page.followers.includes(auth.user._id) ? 'Joined' : 'Join'}
            </button> */}
          </div>

          <div class="flex flex-col items-center w-screen">
            {page.posts.map(
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
                  tags,
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
                    tags={tags}
                    pageId={page}
                  ></Post>
                );
              }
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Page.propTypes = {
  getPageById: PropTypes.func.isRequired,
  getPostById: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.page,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPageById, getPostById })(Page);

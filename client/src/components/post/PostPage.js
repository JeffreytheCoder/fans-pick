import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Spinner from '../global/Spinner';
import { setAlert } from '../../actions/alert';
import {
  getSubPosts,
  getSubSubPosts,
  cleanUp,
  getPageById,
} from '../../actions/page';
import DetailedPost from './DetailedPost';

const subpostReducer = (state, action) => {
  switch (action.type) {
    case 'append':
      return [...state, action.payload];
  }
};

const PostPage = ({
  page,
  getSubPosts,
  getSubSubPosts,
  getPageById,
  cleanUp,
  setAlert,
  match,
}) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    return function cleanup() {
      console.log('post page cleaned up');
      cleanUp();
    };
  }, []);

  useEffect(async () => {
    await getPostById(match.params.post_id);
  }, [match.params.post_id]);

  useEffect(async () => {
    console.log(post);
    if (post) {
      console.log('getting sub posts and page');
      await getPageById(post.page);
      await getSubPosts(post.subPosts);
    }
  }, post);

  useEffect(async () => {
    console.log(page.subPosts);
    if (post && page.subPosts.length === post.subPosts.length) {
      console.log('getting sub sub posts');
      await getSubSubPosts(page.subPosts);
    }
  }, [page.subPosts]);

  const getPostById = async (postId) => {
    try {
      const res = await axios.get('/api/posts/' + postId);
      setPost(res.data.post);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      {page.pageLoading && page.subPostsLoading ? (
        <Spinner />
      ) : (
        <div class="flex justify-center font-main">
          <div class="flex flex-col w-4/5 mt-10">
            <div class="flex mr-2">
              <Link to={`/page/${page.page._id}`}>
                <div class="flex flex-row items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <img
                    class="h-8 w-8 mr-2 rounded-full ml-2"
                    src={page.page.avatar}
                    alt={page.page.name}
                  ></img>
                  <span class="text-lg font-semibold">{page.page.name}</span>
                </div>
              </Link>
            </div>
            <DetailedPost
              postId={match.params.post_id}
              title={post.title}
              description={post.description}
              avatar={post.avatar}
              username={post.username}
              upvotes={post.likes}
              downvotes={post.unlikes}
              adopted={post.adopted}
              date={post.date}
            />
            <span class="text-xl ml-6 mb-6">
              {page.subPosts.length == 0
                ? 'No comments yet, come post the first one!'
                : `${page.subPosts.length} comments`}
            </span>
            {page.subPosts.map((subPost, index) => {
              return (
                <Fragment>
                  <DetailedPost
                    key={index}
                    postId={subPost._id}
                    title=""
                    description={subPost.description}
                    avatar={subPost.avatar}
                    username={subPost.username}
                    upvotes={subPost.likes}
                    downvotes={subPost.unlikes}
                    adopted={subPost.adopted}
                    date={subPost.date}
                  />
                  {/* {page.subSubPosts[index].map((subSubPost, subIndex) => {
                    return (
                      <Fragment>
                        <DetailedPost
                          key={subIndex}
                          postId={subSubPost._id}
                          title=""
                          description={subSubPost.description}
                          avatar={subSubPost.avatar}
                          username={subSubPost.username}
                          upvotes={subSubPost.likes}
                          downvotes={subSubPost.unlikes}
                          adopted={subSubPost.adopted}
                          date={subSubPost.date}
                          isSubSubPost={true}
                        />
                      </Fragment>
                    );
                  })} */}
                </Fragment>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

PostPage.propTypes = {
  getSubPosts: PropTypes.func.isRequired,
  getSubSubPosts: PropTypes.func.isRequired,
  getPageById: PropTypes.func.isRequired,
  cleanUp: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.page,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  getSubPosts,
  getSubSubPosts,
  getPageById,
  cleanUp,
})(PostPage);

// subSubPosts.map((subSubPost, subIndex) => {
//   return (
//     <Fragment>
//       <DetailedPost
//         key={subIndex}
//         postId={subSubPost._id}
//         title=""
//         description={subSubPost.description}
//         avatar={subSubPost.avatar}
//         username={subSubPost.username}
//         upvotes={subSubPost.likes}
//         downvotes={subSubPost.unlikes}
//         adopted={subSubPost.adopted}
//         date={subSubPost.date}
//         isSubSubPost={true}
//       />
//     </Fragment>
//   );
// });

import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../global/Spinner';
import { setAlert } from '../../actions/alert';
import { getSubPosts, getSubSubPosts, cleanUp } from '../../actions/page';
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
  cleanUp,
  setAlert,
  match,
}) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    console.log('rendered');
    return function cleanup() {
      console.log('cleaned up');
      // page.post = null;
      // page.subPosts = [];
      // page.subPostsLoading = true;
      cleanUp();
    };
  }, []);

  useEffect(async () => {
    await getPostById(match.params.post_id);
    return function cleanup() {
      console.log('cleaned up');
    };
  }, [match.params.post_id]);

  useEffect(async () => {
    console.log(post);
    if (post) {
      page.subSubPostsLoading = false;
      console.log('getting sub posts');
      await getSubPosts(post.subPosts);
    }
    return function cleanup() {
      console.log('cleaned up');
    };
  }, post);

  useEffect(async () => {
    console.log(page.subPosts);
    console.log(page.subPostsLoading);
    if (post && page.subPosts.length === post.subPosts.length) {
      console.log('getting sub sub posts');
      await getSubSubPosts(page.subPosts);
    }
    return function cleanup() {
      console.log('cleaned up');
    };
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
      {page.subPostsLoading ? (
        <Spinner />
      ) : (
        <div class="flex justify-center font-main">
          <div class="flex flex-col w-4/5">
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

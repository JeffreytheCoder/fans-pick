import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../global/Spinner';
import { setAlert } from '../../actions/alert';
import DetailedPost from './DetailedPost';

const PostPage = ({ setAlert, match }) => {
  const [postsLoading, setPostsLoading] = useState(true);
  const [post, setPost] = useState(null);
  const [subPosts, setSubPosts] = useState([]);
  const [subSubPosts, setSubSubPosts] = useState([]);

  const getPostById = async (postId) => {
    try {
      const res = await axios.get('/api/posts/' + postId);
      setPost(res.data.post);
    } catch (err) {
      console.error(err);
    }
  };

  const getSubPosts = async () => {
    try {
      if (post.subPosts.length === 0) {
        setPostsLoading(false);
        console.log('no subpost, loading done');
      } else {
        post.subPosts.forEach(async (subPost) => {
          const res = await axios.get('/api/posts/' + subPost._id);
          setSubPosts([...subPosts, res.data.post]);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getSubSubPosts = async () => {
    try {
      subPosts.forEach(async (subPost) => {
        const newPosts = [];
        subPost.subPosts.forEach(async (subSubPost) => {
          const res = await axios.get('/api/posts/' + subSubPost._id);
          newPosts.unshift(res.data.post);
        });
        setSubSubPosts([...subSubPosts, newPosts]);
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(async () => {
    await getPostById(match.params.post_id);
  }, [match.params.post_id]);

  useEffect(async () => {
    if (post) {
      console.log('getting sub posts');
      await getSubPosts();
    }
  }, [post]);

  useEffect(async () => {
    if (post && post.subPosts.length === subPosts.length) {
      if (subPosts.length === post.subPosts.length) {
        console.log('getting sub sub posts');
        await getSubSubPosts();
      }
    }
  }, [subPosts]);

  useEffect(async () => {
    if (post) {
      if (subSubPosts.length === subPosts.length) {
        // console.log(post);
        // console.log(subPosts);
        // console.log(subSubPosts);
        setPostsLoading(false);
      }
    }
  }, [subSubPosts]);

  return (
    <Fragment>
      {postsLoading ? (
        <Spinner />
      ) : (
        <div class="flex justify-center font-main">
          <div class="flex flex-col w-4/5">
            <DetailedPost
              postId={post._id}
              title={post.title}
              description={post.description}
              avatar={post.avatar}
              username={post.username}
              upvotes={post.likes}
              adopted={post.adopted}
              date={post.date}
            />
            <span class="text-xl ml-6 mb-6">
              {post.subPosts.length == 0
                ? 'No comments yet, come post the first one!'
                : `${post.subPosts.length} comments`}
            </span>
            {subPosts.map((subPost, index) => {
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
                    adopted={subPost.adopted}
                    date={subPost.date}
                  />
                  {subSubPosts[Number(index)].map((subSubPost, subIndex) => {
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
                          adopted={subSubPost.adopted}
                          date={subSubPost.date}
                          isSubSubPost={true}
                        />
                      </Fragment>
                    );
                  })}
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
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(PostPage);

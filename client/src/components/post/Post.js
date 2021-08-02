import React, { useState } from 'react';
import logoSmall from '../../images/fanspick logo small.png';

const Post = ({
  postId,
  title,
  description,
  avatar,
  username,
  upvotes,
  subPosts,
  adopted,
}) => {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  return (
    <div class="font-main rounded-lg h-30 w-4/5 border-2 p-6 relative mb-7 hover:bg-gray-100 cursor-pointer transition duration-200 ease-out">
      <div class="text-xl font-bold pb-2 mr-12"> {title}</div>
      <div class="text-lg truncate pb-4 mr-20">{description}</div>
      <div class="relative bottom-0 left-0 flex flex-row items-center ">
        <button>
          <div class="flex flex-row items-center mr-6">
            <img
              class="h-8 mr-3 rounded-full"
              src="https://gravatar.com/avatar/5b3bc2b40d39b0f635326eaf2b4ce36c?d=mm&r=pg&s=200"
              alt={username}
            ></img>
            <span class="font-semibold hover:underline">{username}</span>
          </div>
        </button>
        <div class="flex flex-row">
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
          <span class="ml-1 hover:underline">{subPosts}</span>
        </div>
      </div>
      <div class="absolute top-0 right-0 flex flex-col items-center m-6">
        <button onClick={() => setUpvoted(!upvoted)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class={`h-7 w-7 ${
              upvoted ? 'font-bold text-blue-600' : 'hover:text-blue-600'
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
        <span class="font-semibold text-lg">{upvotes}</span>
        <button onClick={() => setDownvoted(!downvoted)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class={`h-7 w-7 ${
              downvoted ? 'font-bold text-red-600' : 'hover:text-red-600'
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
    </div>
  );
};

export default Post;

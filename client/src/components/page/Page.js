import React from 'react';
import logoSmall from '../../images/fanspick logo small.png';

import Post from '../post/Post';

function Page() {
  return (
    <div class="flex flex-col items-center font-main">
      <div class="flex flex-col items-center m-12">
        <img class="h-40 rounded" src={logoSmall} alt="avatar"></img>
        <div class="text-2xl font-bold mt-4 mb-2"> Marvel Review </div>
        <div class="text-xl italic">
          {' '}
          The best review channel for Marvel movies{' '}
        </div>
      </div>
      <div class="flex flex-col items-center w-screen">
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
}

export default Page;

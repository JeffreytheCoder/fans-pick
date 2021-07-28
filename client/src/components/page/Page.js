import React, { Fragment, useEffect } from 'react';
import logoSmall from '../../images/fanspick logo small.png';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Post from '../post/Post';
import Spinner from '../global/Spinner';
import { getPageById } from '../../actions/page';

const Page = ({ getPageById, page, auth, match }) => {
  useEffect(async () => {
    await getPageById(match.params.page_id);
  }, [getPageById, match.params.id]);

  return (
    <Fragment>
      {page == null ? (
        <Spinner />
      ) : (
        <div class="flex flex-col items-center font-main relative">
          {auth.isAuthenticated &&
            auth.loading == false &&
            page.loading == false &&
            auth.user._id == page.page.user._id && (
              // add edit page link
              <button class="absolute top-0 right-0 m-6 rounded">
                Edit Page
              </button>
            )}
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
      )}
    </Fragment>
  );
};

Page.propTypes = {
  getPageById: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  page: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getPageById })(Page);

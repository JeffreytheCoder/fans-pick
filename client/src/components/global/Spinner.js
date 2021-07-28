import React, { Fragment } from 'react';

const Spinner = () => (
  <Fragment>
    <img
      src="https://raw.githubusercontent.com/bradtraversy/devconnector_2.0/master/client/src/components/layout/spinner.gif"
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return alerts.map((alert) => (
    <div
      key={alert.id}
      className={`border px-4 py-3 rounded relative
        ${
          alert.alertType === 'danger'
            ? 'bg-red-100 border-red-400 text-red-700'
            : ''
        }
        ${
          alert.alertType === 'warning'
            ? 'bg-orange-100 border-orange-400 text-orange-700'
            : ''
        }
        ${
          alert.alertType === 'success'
            ? 'bg-green-100 border-green-400 text-green-700'
            : ''
        }`}
      role="alert"
    >
      <strong class="font-bold"> {alert.msg} </strong>
      {/* <span class="block sm:inline">Something seriously bad happened.</span> */}
      {/* <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
          <svg
            class="fill-current h-6 w-6 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span> */}
    </div>
  ));
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);

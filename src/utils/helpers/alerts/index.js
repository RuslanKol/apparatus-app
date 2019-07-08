import Notifications from 'react-notification-system-redux';

const defaultParams = {
  position: 'br',
  autoDismiss: 10
};

export function successHandler(dispatch, message, params = null) {
  if (process.env.NODE_ENV !== 'test')
    dispatch(
      Notifications.success({
        ...defaultParams,
        title: 'Success!',
        message
      })
    );
}

export function infoHandler(dispatch, message, params = null) {
  if (process.env.NODE_ENV !== 'test')
    dispatch(
      Notifications.info({
        ...defaultParams,
        title: 'Info!',
        message
      })
    );
}

export function warningHandler(dispatch, message, params = null) {
  if (process.env.NODE_ENV !== 'test')
    dispatch(
      Notifications.warning({
        ...defaultParams,
        title: 'Warning!',
        message
      })
    );
}

export function errorHandler(dispatch, error, params = null) {
  let message = '';

  console.log(error);

  if (error.data.error && error.data.error === 'ValidationException') {
    if (error.data && error.data.data && Object.keys(error.data.data).length > 0) {
      let data = error.data.data;
      Object.keys(data).forEach(function(key) {
        message += data[key] + ' ';
      });
    } else {
      if (error.data && error.data.message) {
        message += error.data.message;
      } else {
        message = 'Something went wrong';
      }
    }
  } else {
    if (error.data && error.data.message) {
      message += error.data.message;
    } else {
      message = 'Something went wrong';
    }
  }

  if (process.env.NODE_ENV !== 'test')
    dispatch(
      Notifications.error({
        ...defaultParams,
        title: 'Error!',
        message
      })
    );
}

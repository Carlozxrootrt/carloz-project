// src/utils/location.js

export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      });
    } else {
      reject(new Error('Geolocation is not supported by this browser.'));
    }
  });
};

export const watchLocation = (successCallback, errorCallback) => {
  if (navigator.geolocation) {
    return navigator.geolocation.watchPosition(successCallback, errorCallback, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
  } else {
    errorCallback(new Error('Geolocation is not supported by this browser.'));
  }
};

export const clearLocationWatch = (watchId) => {
  if (navigator.geolocation) {
    navigator.geolocation.clearWatch(watchId);
  }
};

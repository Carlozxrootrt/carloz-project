"use client";

// src/components/LocationWatcher.js
import React, { useEffect, useState } from 'react';
import { getLocation, watchLocation, clearLocationWatch } from '../utils/location.js';
import { saveVisitor } from '../utils/saveVisitor.js';

const LocationWatcher = () => {
  const [location, setLocation] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [watchId, setWatchId] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const { coords } = await getLocation();
        const { latitude, longitude } = coords;
        setLocation({ latitude, longitude });
        await saveVisitor({ latitude, longitude });
      } catch (error) {
        console.error('Error getting location:', error);
        if (error.code === error.PERMISSION_DENIED) {
          setPermissionDenied(true);
        }
      }
    };

    fetchLocation();

    // Cleanup function to clear the location watch
    return () => {
      if (watchId !== null) {
        clearLocationWatch(watchId);
      }
    };
  }, [watchId]);

  useEffect(() => {
    if (permissionDenied) {
      const retryFetchLocation = setInterval(async () => {
        try {
          const id = watchLocation(
            async ({ coords }) => {
              const { latitude, longitude } = coords;
              setLocation({ latitude, longitude });
              setPermissionDenied(false); // Reset permission denied state
              await saveVisitor({ latitude, longitude });
              clearInterval(retryFetchLocation); // Stop retrying once we have permission
              clearLocationWatch(id); // Clear the watch once we have the location
            },
            (error) => {
              console.error('Retry error getting location:', error);
              if (error.code !== error.PERMISSION_DENIED) {
                clearInterval(retryFetchLocation); // Stop retrying if the error is not related to permission denial
              }
            }
          );
          setWatchId(id);
        } catch (error) {
          console.error('Retry error getting location:', error);
        }
      }, 3000); // Retry every 3 seconds

      return () => clearInterval(retryFetchLocation);
    }
  }, [permissionDenied]);

  return (
    <div>
      {location ? (
        <p>
          Your location: {location.latitude}, {location.longitude}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default LocationWatcher;

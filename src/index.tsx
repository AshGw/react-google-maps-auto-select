import React from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  type Libraries,
} from '@react-google-maps/api';

// declared here for performance optimizations
const GOOGLE_MAPS_LIBRARIES: Libraries = ['places'] as const;

export const GoogleMapsLocationDisplay: React.FC<{}> = () => {
  return <></>;
};

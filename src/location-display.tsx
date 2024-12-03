import React from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  type Libraries,
} from '@react-google-maps/api';

import { Location } from './types';

// Predeclared here for performance optimizations:
// Only the 'places' library is loaded to minimize payload size and enhance API loading speed.
// Declaring it as a constant ensures reusability and prevents redundant allocations.
const GOOGLE_MAPS_LIBRARIES: Libraries = ['places'] as const;

interface GoogleMapsLocationDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  initialLocation: Location;
  onChangeLocation: (location: Location) => void;
}

export const GoogleMapsLocationDisplay: React.FC<GoogleMapsLocationDisplayProps> =
  React.forwardRef<HTMLDivElement, GoogleMapsLocationDisplayProps>(
    ({ initialLocation, onChangeLocation, ...props }, ref) => {
      return <></>;
    }
  );

GoogleMapsLocationDisplay.displayName = 'GoogleMapsLocationDisplay';

import React, { useCallback, useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  type Libraries,
} from '@react-google-maps/api';

import { Location } from './types';
import { Optional } from 'ts-roids';
import { usePanTo } from 'hooks';

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
      const [googleMap, setGoogleMap] =
        useState<Optional<google.maps.Map>>(null);
      const [currentLocation, setCurrentLocation] =
        useState<Location>(initialLocation);

      const { panTo } = usePanTo(googleMap);

      useEffect(() => {
        panTo({
          lat: initialLocation.lat,
          lng: initialLocation.lng,
        });
      }, [initialLocation.lat, initialLocation.lng, panTo]);

      function onClickAnywhereOnMap(mapMouseEvent: google.maps.MapMouseEvent) {
        const latLng = mapMouseEvent.latLng;
        if (!latLng) return;

        const lat = latLng.lat();
        const lng = latLng.lng();
        googleMap?.panTo({ lat, lng });
        googleMap?.setZoom(18);
      }
      return <></>;
    }
  );

GoogleMapsLocationDisplay.displayName = 'GoogleMapsLocationDisplay';

import React, { Suspense, useEffect, useState } from 'react';
import {
  GoogleMap,
  GoogleMapProps,
  Marker,
  useLoadScript,
  type Libraries,
} from '@react-google-maps/api';
import { Location } from '../utils/types';
import { Optional, Keys, EmptyObject } from 'ts-roids';
import { usePanTo, useMapClickHandler } from '../hooks';

// Predeclared here for performance optimizations:
// Only the 'places' library is loaded to minimize payload size and enhance API loading speed.
// Declaring it as a constant ensures reusability and prevents redundant allocations.
const GOOGLE_MAPS_LIBRARIES: Libraries = ['places'] as const;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentProps<
  Component extends React.ElementType,
  Props = EmptyObject,
> = Props &
  Omit<React.ComponentPropsWithoutRef<Component>, Keys<Props>> & {
    as?: Component;
  };

interface GoogleMapsLocationDisplayOwnProps {
  /**
   * The initial location to display on the map.
   */
  initialLocation: Location;

  /**
   * Callback function called when the location changes (e.g., when the user clicks on the map).
   */
  onChangeLocation: (location: Location) => void;

  /**
   * Your Google Maps API key.
   */
  googleMapsApiKey: string;

  /**
   * Optional fallback component to display while the Google Maps script is loading.
   * Can be any valid React node, such as a spinner or placeholder.
   */
  fallback?: React.ReactNode;

  /**
   * Additional props to pass to the `GoogleMap` component from `@react-google-maps/api`.
   * Use this to customize the map's behavior and appearance.
   */
  googleMapProps?: GoogleMapProps;

  /**
   * The zoom level to set when the user clicks on the map.
   * Defaults to `18` if not provided.
   */
  zoomLevelUponClick?: number;

  /**
   * Optional callback function that gets called when an error occurs during
   * the auto-completion of the location (e.g., reverse geocoding failure).
   *
   * @param error - The error object containing details about the failure.
   */
  onAutoCompletedLocationError?: (error: Error) => void;
}

type GoogleMapsLocationDisplayProps<C extends React.ElementType> =
  PolymorphicComponentProps<C, GoogleMapsLocationDisplayOwnProps>;

export const GoogleMapsLocationDisplay = React.forwardRef(
  <C extends React.ElementType>(
    {
      initialLocation,
      onChangeLocation,
      googleMapsApiKey,
      fallback = null,
      zoomLevelUponClick,
      googleMapProps,
      onAutoCompletedLocationError,
      as,
      ...props
    }: GoogleMapsLocationDisplayProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const [googleMap, setGoogleMap] = useState<Optional<google.maps.Map>>(null);
    const [currentLocation, setCurrentLocation] =
      useState<Location>(initialLocation);

    const { panTo } = usePanTo(googleMap);

    useEffect(() => {
      panTo({
        lat: initialLocation.lat,
        lng: initialLocation.lng,
      });
    }, [initialLocation.lat, initialLocation.lng, panTo]);

    const { onMapClick } = useMapClickHandler({
      googleMap,
      zoomLevelUponClick,
      setCurrentLocation,
      onAutoCompletedLocationError,
    });

    const { isLoaded } = useLoadScript({
      googleMapsApiKey,
      libraries: GOOGLE_MAPS_LIBRARIES,
    });

    const Component = as ?? React.Fragment;

    if (!isLoaded && !fallback) {
      return null;
    }

    return (
      <Component ref={ref} {...props}>
        <Suspense fallback={fallback}>
          <GoogleMap
            {...googleMapProps}
            center={{
              lat: currentLocation.lat,
              lng: currentLocation.lng,
            }}
            onLoad={(map) => setGoogleMap(map)}
            onClick={(map) => {
              onMapClick(map);
              onChangeLocation(currentLocation);
            }}
          >
            <Marker position={currentLocation} />
          </GoogleMap>
        </Suspense>
      </Component>
    );
  }
);

GoogleMapsLocationDisplay.displayName = 'GoogleMapsLocationDisplay';

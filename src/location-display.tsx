import React, { Suspense, useEffect, useState } from 'react';
import {
  GoogleMap,
  Marker,
  useLoadScript,
  type Libraries,
} from '@react-google-maps/api';
import { Location } from './types';
import { Optional, Keys, EmptyObject } from 'ts-roids';
import { usePanTo } from 'hooks';

// Predeclared here for performance optimizations:
// Only the 'places' library is loaded to minimize payload size and enhance API loading speed.
// Declaring it as a constant ensures reusability and prevents redundant allocations.
const GOOGLE_MAPS_LIBRARIES: Libraries = ['places'] as const;

type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>['ref'];

type PolymorphicComponentProps<
  C extends React.ElementType,
  Props = EmptyObject,
> = Props &
  Omit<React.ComponentPropsWithoutRef<C>, Keys<Props>> & {
    as?: C;
  };

interface GoogleMapsLocationDisplayOwnProps {
  initialLocation: Location;
  onChangeLocation: (location: Location) => void;
  googleMapsApiKey: string;
  fallback?: React.ReactNode;
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

    function onClickAnywhereOnMap(mapMouseEvent: google.maps.MapMouseEvent) {
      const latLng = mapMouseEvent.latLng;
      if (!latLng) return;

      const lat = latLng.lat();
      const lng = latLng.lng();
      googleMap?.panTo({ lat, lng });
      googleMap?.setZoom(18);
    }

    const { isLoaded } = useLoadScript({
      googleMapsApiKey,
      libraries: GOOGLE_MAPS_LIBRARIES,
    });

    const Component = as || React.Fragment;

    if (!isLoaded && !fallback) {
      return null;
    }

    return (
      <Component ref={ref} {...props}>
        <Suspense fallback={fallback}>
          <GoogleMap
            zoom={10}
            center={{
              lat: currentLocation.lat,
              lng: currentLocation.lng,
            }}
            mapContainerClassName="w-full rounded-md overflow-hidden h-[350px] shadow"
            onLoad={(map) => setGoogleMap(map)}
            onClick={onClickAnywhereOnMap}
          >
            <Marker position={currentLocation} />
          </GoogleMap>
        </Suspense>
      </Component>
    );
  }
);

GoogleMapsLocationDisplay.displayName = 'GoogleMapsLocationDisplay';

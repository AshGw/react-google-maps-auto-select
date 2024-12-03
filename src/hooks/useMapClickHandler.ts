import { type SetStateAction, useCallback, type Dispatch } from 'react';
import type { Optional } from 'ts-roids';
import type { Location } from './../types';

/**
 * Hook to create a click handler for a Google Map that pans and zooms to the clicked location,
 * updates the current location state, and triggers a callback with the new location.
 */
export function useMapClickHandler({
  googleMap,
  onClickZoomLevel,
  setCurrentLocation,
}: {
  onClickZoomLevel?: number;
  googleMap: Optional<google.maps.Map>;
  setCurrentLocation: Dispatch<SetStateAction<Location>>;
}) {
  const onMapClick = useCallback(
    (mapMouseEvent: google.maps.MapMouseEvent) => {
      const latLng = mapMouseEvent.latLng;
      if (!latLng) return;

      const lat = latLng.lat();
      const lng = latLng.lng();

      googleMap?.panTo({ lat, lng });
      googleMap?.setZoom(onClickZoomLevel ?? 18);

      // TODO: actually change this
      setCurrentLocation({
        lat,
        lng,
        city: '',
        clickedValue: '',
        country: '',
        postalCode: 55,
        streetAddress: '',
      });
    },
    [googleMap, setCurrentLocation, onClickZoomLevel]
  );

  return { onMapClick };
}

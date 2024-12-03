import { type SetStateAction, useCallback, type Dispatch } from 'react';
import type { Optional } from 'ts-roids';
import type { Location } from '../utils/types';
import { getAutoCompletedLocationFromLatLng } from 'utils/getAutoCompletedLocationFromGeoArgs';

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
    async (mapMouseEvent: google.maps.MapMouseEvent) => {
      const latLng = mapMouseEvent.latLng;
      if (!latLng) return;

      const lat = latLng.lat();
      const lng = latLng.lng();

      googleMap?.panTo({ lat, lng });
      googleMap?.setZoom(onClickZoomLevel ?? 18);
      const autoCompletedLocation = await getAutoCompletedLocationFromLatLng({
        location: { lat, lng },
      });

      setCurrentLocation(autoCompletedLocation);
    },
    [googleMap, setCurrentLocation, onClickZoomLevel]
  );

  return { onMapClick };
}

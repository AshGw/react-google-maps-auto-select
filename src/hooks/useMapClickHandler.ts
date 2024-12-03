import { useCallback } from 'react';
import { Optional } from 'ts-roids';
import { Location } from './../types';

/**
 * Hook to create a click handler for a Google Map that pans and zooms to the clicked location,
 * updates the current location state, and triggers a callback with the new location.
 */
export function useMapClickHandler(
  googleMap: Optional<google.maps.Map>,
  setCurrentLocation: (location: Location) => void
) {
  const onMapClick = useCallback(
    (mapMouseEvent: google.maps.MapMouseEvent) => {
      const latLng = mapMouseEvent.latLng;
      if (!latLng) return;

      const lat = latLng.lat();
      const lng = latLng.lng();

      googleMap?.panTo({ lat, lng });
      googleMap?.setZoom(18);

      setCurrentLocation({ lat, lng });
    },
    [googleMap, setCurrentLocation]
  );

  return { onMapClick };
}

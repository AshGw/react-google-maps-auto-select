import React, { useCallback } from 'react';

import { Location } from './types';
import { Optional } from 'ts-roids';

/**
 * Hook to pan and zoom a Google Map instance to a specific location.
 *
 * @param googleMap - The Google Maps instance (`google.maps.Map`) or null.
 * @returns An object containing `panTo`, a function to move the map to the specified coordinates.
 *
 * Usage:
 * - `panTo({ lat, lng })`: Pans the map to the given latitude and longitude and sets zoom to 18.
 */
export function usePanTo(googleMap: Optional<google.maps.Map>) {
  const panTo = useCallback(
    ({ lat, lng }: Pick<Location, 'lat' | 'lng'>) => {
      googleMap?.panTo({ lat, lng });
      googleMap?.setZoom(18);
    },
    [googleMap]
  );
  return { panTo };
}

import React, { useCallback } from 'react';

import type { Location } from '../utils/types';
import type { Optional } from 'ts-roids';

/**
 * Hook to pan and zoom a Google Map instance to a specific location.
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

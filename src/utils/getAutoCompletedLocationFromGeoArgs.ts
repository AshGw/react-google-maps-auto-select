import { getGeocode, getLatLng, type GeoArgs } from 'use-places-autocomplete';

import type { Location } from './types';
import { convertGoogleGeoAddressToFullAddress } from './convertGoogleGeoAddressToFullAddress';

interface GeoCodeResult extends google.maps.GeocoderResult {}

export async function getAutoCompletedLocationFromGeoArgs(
  geoArgs: GeoArgs
): Promise<Location> {
  const getCodeResultArr: GeoCodeResult[] = await getGeocode({
    ...geoArgs,
  });

  const geoCodeResult = getCodeResultArr[0];
  if (!geoCodeResult) {
    throw new Error('No geocode result found');
  }

  const fullAddress = convertGoogleGeoAddressToFullAddress({
    addrComponents: geoCodeResult.address_components,
  });

  const { lat, lng } = getLatLng(geoCodeResult);

  return {
    ...fullAddress,
    lat: geoArgs.location?.lat ? (geoArgs.location.lat as number) : lat,
    lng: geoArgs.location?.lng ? (geoArgs.location.lng as number) : lng,
    clickedValue: geoCodeResult.formatted_address,
  } satisfies Location;
}

import {
  getGeocode as getAutoCompleteGeoCode,
  getLatLng,
  type GeoArgs,
} from 'use-places-autocomplete';

import type { AddressComponentKey, Location } from './types';

interface FullAddress
  extends Pick<Location, 'streetAddress' | 'city' | 'postalCode' | 'country'> {}

export async function getAutoCompletedLocationFromGeoCode(
  geoArgs: GeoArgs
): Promise<Location> {
  const getCodeResultArr: google.maps.GeocoderResult[] =
    await getAutoCompleteGeoCode({
      ...geoArgs,
    });

  const geoCodeResult = getCodeResultArr[0];
  if (!geoCodeResult) {
    throw new Error('No geocode result found');
  }

  const fullAddress = convertGoogleGeoAddressToLocationAddress({
    addrComponents: geoCodeResult.address_components,
  });

  const { lat, lng } = getLatLng(geoCodeResult);

  return {
    lat: geoArgs.location?.lat ? (geoArgs.location.lat as number) : lat,
    lng: geoArgs.location?.lng ? (geoArgs.location.lng as number) : lng,
    ...fullAddress,
    clickedValue: geoCodeResult.formatted_address,
  } satisfies Location;
}

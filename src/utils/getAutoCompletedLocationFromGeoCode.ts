import {
  getGeocode as getAutoCompleteGeoCode,
  getLatLng,
  type GeoArgs,
} from 'use-places-autocomplete';

import type { Location } from './types';

interface FullAddress
  extends Pick<Location, 'streetAddress' | 'city' | 'postalCode' | 'country'> {}

/** 
	@see https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes
*/
type AddressComponentKey =
  | 'street_address'
  | 'route'
  | 'intersection'
  | 'political'
  | 'country'
  | 'administrative_area_level_1'
  | 'administrative_area_level_2'
  | 'administrative_area_level_3'
  | 'colloquial_area'
  | 'locality'
  | 'sublocality'
  | 'neighborhood'
  | 'premise'
  | 'subpremise'
  | 'postal_code'
  | 'natural_feature'
  | 'airport'
  | 'park'
  | 'point_of_interest'
  | 'floor'
  | 'establishment'
  | 'parking'
  | 'postal_town'
  | 'street_number'
  | 'sublocality_level_1'
  | 'sublocality_level_2'
  | 'sublocality_level_3'
  | 'sublocality_level_4'
  | 'sublocality_level_5';

const convertGoogleGeoAddressToLocationAddress = ({
  addrComponents,
}: {
  addrComponents: google.maps.GeocoderAddressComponent[];
}) => {
  const findEntryFor = (key: AddressComponentKey) => {
    return addrComponents.find((comp) => comp.types.includes(key));
  };

  const postalEntry = findEntryFor('postal_code');
  const cityEntry = findEntryFor('locality');
  const countryEntry = findEntryFor('country');
  const streetAddressEntry = findEntryFor('street_address');

  return {
    postalCode: postalEntry ? parseInt(postalEntry.long_name) : null,
    cityName: cityEntry ? cityEntry.long_name : null,
    countryName: countryEntry ? countryEntry.long_name : null,
    streetAddress: streetAddressEntry ? streetAddressEntry.long_name : null,
  } satisfies FullAddress;
};

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
    selectedValue: geoCodeResult.formatted_address,
  } satisfies Location;
}

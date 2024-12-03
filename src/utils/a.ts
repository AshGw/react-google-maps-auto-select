import type { AddressComponentKey, Location, ReadableAddress } from './types';

/**
 * Converts Google Geocoding API address components into a readable address format.
 *
 */
export const convertGoogleGeoAddressToReadableAddress = ({
  addrComponents,
}: {
  addrComponents: google.maps.GeocoderAddressComponent[];
}): ReadableAddress => {
  /**
   * Helper function to find an address component by its type.
   */
  const getAddressComponent = (key: AddressComponentKey) =>
    addrComponents.find((component) => component.types.includes(key));

  const postalEntry = getAddressComponent('postal_code');
  const cityEntry = getAddressComponent('locality');
  const countryEntry = getAddressComponent('country');
  const streetAddressEntry = getAddressComponent('street_address');

  return {
    postalCode: postalEntry ? parseInt(postalEntry.long_name, 10) : null,
    country: countryEntry?.long_name ?? null,
    streetAddress: streetAddressEntry?.long_name ?? null,
    city: cityEntry?.long_name ?? null,
  } satisfies ReadableAddress;
};

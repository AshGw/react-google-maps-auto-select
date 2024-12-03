import { Optional } from 'ts-roids';

export interface FullAddress {
  /**
   * Postal or ZIP code of the location.
   * Example: "94103".
   */
  postalCode: Optional<number>;

  /**
   * Street address of the location.
   * Example: "1600 Amphitheatre Parkway".
   */
  streetAddress: Optional<string>;

  /**
   * City where the location resides.
   * Example: "San Francisco".
   */
  city: Optional<string>;

  /**
   * Country name where the location resides.
   * Example: "United States".
   */
  country: Optional<string>;
}

/**
 * Represents a simple geographical location based on Google Maps data.
 */
export interface Location extends FullAddress {
  /**
   * Latitude of the location (decimal degrees).
   * Example: 37.4221.
   */
  lat: number;

  /**
   * Longitude of the location (decimal degrees).
   * Example: -122.0841.
   */
  lng: number;

  /**
   * The user-selected location value, typically shown in the UI.
   * Example: "Google HQ, Mountain View, CA, USA".
   */
  clickedValue: string;
}

/** 
	@see https://developers.google.com/maps/documentation/javascript/geocoding#GeocodingAddressTypes
*/
export type AddressComponentKey =
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

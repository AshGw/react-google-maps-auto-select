import { Optional } from 'ts-roids';

/**
 * Represents a simple geographical location based on Google Maps data.
 */
export interface Location {
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

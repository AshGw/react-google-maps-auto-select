# react-google-maps-auto-select

**react-google-maps-auto-select** is a React component that integrates Google Maps with automatic location selection and reverse geocoding. It simplifies the process of capturing user-selected locations by displaying an interactive map where users can click to select a location, and it automatically retrieves detailed address information.

## Problem it Solves

Capturing accurate location data from users is a common requirement in many applications, such as delivery services, event planning, or location-based apps. Implementing this functionality manually involves complex integration with Google Maps, handling user interactions, and performing reverse geocoding to get address details.

**react-google-maps-auto-select** abstracts away this complexity by providing a ready-to-use component that handles map rendering, user interaction, and automatic retrieval of address information when a user selects a location on the map.

## Installation

Install the package and its peer dependencies:

```bash
npm install react-google-maps-auto-select @react-google-maps/api
```

## Usage

### Basic Example

```jsx
import React from 'react';
import { GoogleMapsLocationDisplay, Location } from 'react-google-maps-auto-select';

const App = () => {
  const initialLocation = { lat: 37.7749, lng: -122.4194 };

  const handleLocationChange = (location) => {
    console.log('Selected location:', location);
  };

  return (
    <GoogleMapsLocationDisplay
      initialLocation={initialLocation}
      onChangeLocation={handleLocationChange}
      googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      fallback={<div>Loading map...</div>}
    />
  );
};

export default App;
```

### Customizing the Map

```jsx
<GoogleMapsLocationDisplay
  initialLocation={initialLocation}
  onChangeLocation={handleLocationChange}
  googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
  googleMapProps={{
    mapTypeId: 'satellite',
    options: {
      disableDefaultUI: true,
      zoomControl: true,
    },
  }}
  zoomLevelUponClick={15}
  onAutoCompletedLocationError={(error) => console.error('Error:', error)}
/>
```

### Using a Custom Wrapper Component

```jsx
const CustomWrapper = React.forwardRef((props, ref) => (
  <div ref={ref} {...props} className="custom-wrapper" />
));

<GoogleMapsLocationDisplay
  as={CustomWrapper}
  initialLocation={initialLocation}
  onChangeLocation={handleLocationChange}
  googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
/>
```

## API

### `GoogleMapsLocationDisplay`

#### Props

- **`initialLocation`**: The initial coordinates to center the map.

  ```typescript
  initialLocation: Location;
  ```

- **`onChangeLocation`**: Callback fired when the user selects a new location.

  ```typescript
  onChangeLocation: (location: Location) => void;
  ```

- **`googleMapsApiKey`**: Your Google Maps API key.

  ```typescript
  googleMapsApiKey: string;
  ```

- **`fallback`**: Element to display while the map is loading.

  ```typescript
  fallback?: React.ReactNode;
  ```

- **`googleMapProps`**: Additional props for the `GoogleMap` component.

  ```typescript
  googleMapProps?: GoogleMapProps;
  ```

- **`zoomLevelUponClick`**: Zoom level after the user selects a location (defaults to 18).

  ```typescript
  zoomLevelUponClick?: number;
  ```

- **`onAutoCompletedLocationError`**: Callback for handling errors during reverse geocoding.

  ```typescript
  onAutoCompletedLocationError?: (error: Error) => void;
  ```

- **`as`**: Element or component to render as the wrapper.

  ```typescript
  as?: React.ElementType;
  ```

## Types

- **`FullAddress`**

  ```typescript
  export interface FullAddress {
    /**
     * Postal or ZIP code of the location.
     * Example: "94103".
     */
    postalCode?: number;

    /**
     * Street address of the location.
     * Example: "1600 Amphitheatre Parkway".
     */
    streetAddress?: string;

    /**
     * City where the location resides.
     * Example: "San Francisco".
     */
    city?: string;

    /**
     * Country name where the location resides.
     * Example: "United States".
     */
    country?: string;
  }
  ```

- **`Location`**

  ```typescript
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
  ```

## License

[MIT](/LICENSE)
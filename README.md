# react-google-maps-auto-select

**react-google-maps-auto-select** is a React component that simplifies the integration of Google Maps into your application. It provides an interactive map where users can select a location by clicking, and it automatically retrieves detailed address information through reverse geocoding.

## Why Use This Library?

Capturing accurate location data from users is essential for applications like delivery services, event planning, or location-based services. Implementing this functionality manually can be complex, involving integration with Google Maps, handling user interactions, and performing reverse geocoding to obtain address details.

**react-google-maps-auto-select** abstracts away this complexity by providing a ready-to-use component that handles map rendering, user interaction, and automatic retrieval of address information when a user selects a location anywhere on the map.



## Installation

Install the package using npm or pnpm:

```bash
# Using npm
npm install react-google-maps-auto-select

# Using pnpm
pnpm add react-google-maps-auto-select
```

**Note**: `@react-google-maps/api` is a peer dependency and must be installed separately.

## Usage

### Basic Example

```jsx
import React from 'react';
import { GoogleMapsLocationDisplay, Location } from 'react-google-maps-auto-select';

const App = ({ initialLocation }) => {

  const handleLocationChange = (location) => {
    console.log('Selected location:', location);
    // You can access detailed address information here
    // Example: location.streetAddress, location.city, location.country
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

You can customize the appearance and behavior of the map by passing additional props via `googleMapProps`. You can also adjust the zoom level when a user clicks on the map, and handle errors during reverse geocoding.

```jsx
<GoogleMapsLocationDisplay
  initialLocation={initialLocation}
  onChangeLocation={handleLocationChange}
  googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
  fallback={<div>Loading map...</div>}
  googleMapProps={{
    mapTypeId: 'satellite',
    options: {
      disableDefaultUI: true,
      zoomControl: true,
    },
  }}
  zoomLevelUponClick={15}
  onAutoCompletedLocationError={(error) => console.error('Reverse geocoding error:', error)}
/>
```

### Using a Custom Wrapper Component

You can render the `GoogleMapsLocationDisplay` component as any HTML element or custom component using the `as` prop.

```jsx
const CustomWrapper = React.forwardRef((props, ref) => (
  <div ref={ref} {...props} className="custom-wrapper" />
));

<GoogleMapsLocationDisplay
  as={CustomWrapper}
  initialLocation={initialLocation}
  onChangeLocation={handleLocationChange}
  googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
  fallback={<div>Loading map...</div>}
/>
```

### All Possible Configurations

Here is an example showcasing all possible configurations:

```jsx
<GoogleMapsLocationDisplay
  as="section"
  initialLocation={{ lat: 40.7128, lng: -74.0060, selectedFullAddress: 'somewhere' }}
  onChangeLocation={(location) => {
    console.log('Location changed:', location);
    // Access detailed address information
  }}
  googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
  fallback={<div>Loading map...</div>}
  googleMapProps={{
    mapContainerStyle: { height: '400px', width: '100%' },
    options: {
      mapTypeControl: true,
      streetViewControl: false,
    },
    onZoomChanged: () => {
      console.log('Map zoom changed');
    },
  }}
  zoomLevelUponClick={12}
  onAutoCompletedLocationError={(error) => {
    alert('An error occurred while fetching address information.');
    console.error(error);
  }}
  className="custom-map-class"
  style={{ border: '2px solid black' }}
/>
```

## API Reference

### `GoogleMapsLocationDisplay` Props

| Prop                           | Type                                            | Default               | Description                                                                                                                                         |
| ------------------------------ | ----------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `initialLocation`              | `Location`                                      | **Required**          | The initial coordinates to center the map.                                                                                                          |
| `onChangeLocation`             | `(location: Location) => void`                  | **Required**          | Callback function fired when the user selects a new location. Provides detailed address information in the `location` object.                       |
| `googleMapsApiKey`             | `string`                                        | **Required**          | Your Google Maps API key.                                                                                                                           |
| `fallback`                     | `React.ReactNode`                               | `null`                | Element to display while the map is loading.                                                                                                        |
| `googleMapProps`               | `GoogleMapProps`                                | `{}`                  | Additional props to pass to the underlying `GoogleMap` component from `@react-google-maps/api`.                                                     |
| `zoomLevelUponClick`           | `number`                                        | `18`                  | The zoom level to set when the user clicks on the map.                                                                                              |
| `onAutoCompletedLocationError` | `(error: Error) => void`                        | `undefined`           | Callback function for handling errors during reverse geocoding.                                                                                     |
| `as`                           | `React.ElementType`                             | `React.Fragment`      | Element or component to render as the wrapper.                                                                                                      |
| Other HTML attributes          | `any`                                           |                       | You can pass additional HTML attributes, such as `className`, `style`, etc., which will be applied to the outer component specified by `as` prop.   |

### Types

#### `FullAddress`

```typescript
export interface FullAddress {
  /**
   * Postal or ZIP code of the location.
   * Example: "94103".
   */
  postalCode: number | null;

  /**
   * Street address of the location.
   * Example: "1600 Amphitheatre Parkway".
   */
  streetAddress: string | null;

  /**
   * City where the location resides.
   * Example: "San Francisco".
   */
  city: string | null;

  /**
   * Country name where the location resides.
   * Example: "United States".
   */
  country: string | null;
}
```

#### `Location`

```typescript
/**
 * Represents a geographical location with detailed address information.
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
   * The user-selected location value, typically a formatted address.
   * Example: "Google HQ, Mountain View, CA, USA".
   */
  selectedFullAddress: string;
}
```

## Reverse Geocoding Details

When a user clicks on the map to select a location, the component automatically performs reverse geocoding to retrieve detailed address information. The `location` object provided to the `onChangeLocation` callback includes this information:

- `lat`: Latitude of the selected location.
- `lng`: Longitude of the selected location.
- `selectedFullAddress`: A formatted address string of the selected location.
- `streetAddress`: Street address (e.g., "1600 Amphitheatre Parkway").
- `city`: City name.
- `postalCode`: Postal or ZIP code.
- `country`: Country name.

## Error Handling

You can handle errors that occur during reverse geocoding by providing the `onAutoCompletedLocationError` prop. This can be useful to notify users when address information cannot be retrieved.

```jsx
<GoogleMapsLocationDisplay
  // ...other props
  onAutoCompletedLocationError={(error) => {
    alert('Failed to retrieve address information.');
    console.error(error);
  }}
/>
```

## Styling the Map

You can style the map container by passing styles through `googleMapProps` or by applying styles to the outer component via the `className` or `style` props.

```jsx
<GoogleMapsLocationDisplay
  // ...other props
  googleMapProps={{
    mapContainerStyle: { height: '500px', width: '100%' },
  }}
  className="my-map-container"
  style={{ borderRadius: '8px', overflow: 'hidden' }}
/>
```

## Advanced Usage

### Accessing the Google Map Instance

If you need to access the Google Map instance directly, you can do so by using the `onLoad` prop in `googleMapProps`.

```jsx
<GoogleMapsLocationDisplay
  // ...other props
  googleMapProps={{
    onLoad: (map) => {
      // Access the map instance here
      console.log('Map loaded:', map);
    },
  }}
/>
```

### Handling Map Events

You can handle additional map events by passing event handlers through `googleMapProps`.

```jsx
<GoogleMapsLocationDisplay
  // ...other props
  googleMapProps={{
    onDragEnd: () => {
      console.log('Map drag ended');
    },
    onZoomChanged: () => {
      console.log('Map zoom changed');
    },
  }}
/>
```


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

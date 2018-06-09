import * as React from 'react';
import { MapView } from 'expo';
import { StyleSheet } from 'react-native';

/**
 * Renders a native map with provided markers and default styles.
 *
 * @extends  React.Component
 */
class Map extends React.PureComponent {
  map = null;

  componentDidMount() {
    this.centerMap();
  }

  componentDidUpdate() {
    this.centerMap();
  }

  centerMap() {
    const { markers, center } = this.props;

    // If center is provided, center the map on given coordinates. Center has
    // more importance than markers, as it is used to force center:
    if (center && 'latitude' in center && 'longitude' in center) {
      this.map.fitToCoordinates([center], { animated: true });
      return;
    }

    // Center map on supplied markers. Markers can be recognized based on their
    // identifier, so we need to filter out markers without identifiers:
    if (markers) {
      const identifiers = markers
        .filter(marker => marker.hasOwnProperty('id'))
        .map(marker => marker.id);

      this.map.fitToSuppliedMarkers(identifiers, true);
      return;
    }
  }

  render() {
    const { markers, style, ...props } = this.props;

    return (
      <MapView
        {...props}
        ref={map => (this.map = map)}
        style={{ ...StyleSheet.absoluteFillObject, ...style }}
        showsUserLocation
        loadingEnabled
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
      >
        {markers &&
          markers.map(marker => (
            <MapView.Marker
              key={marker.id}
              identifier={String(marker.id)}
              title={marker.title}
              description={marker.description}
              coordinate={marker.coordinate}
            />
          ))}
      </MapView>
    );
  }
}

export default Map;

import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Image } from 'react-native';
import { Content, Card, CardItem, Button, Text } from 'native-base';
import Map from '../Map';
import Input from '../Input';
import CameraRoll from '../CameraRoll';

const Polluter = ({
  handleSubmit,
  onProofSelect,
  onMarkerSelect,
  marker,
  invalid,
}) => {
  let markers = [];
  let disabled = invalid;

  if (marker.latitude !== 0 && marker.longitude !== 0) {
    markers.push({
      id: `Marker-${Date.now()}`,
      coordinate: marker,
    });
  } else {
    disabled = true;
  }

  return (
    <Content padder>
      <Card>
        <CardItem header bordered>
          <Text>Basic information</Text>
        </CardItem>

        <CardItem>
          <Content>
            <Field
              name={'title'}
              label="Title"
              placeholder="Will be visible on the map"
              component={Input}
            />
          </Content>
        </CardItem>

        <CardItem>
          <Content>
            <Field
              name={'description'}
              label="Description"
              placeholder="Will be visible on the map"
              component={Input}
            />
          </Content>
        </CardItem>
      </Card>

      <Card>
        <CardItem header bordered>
          <Text>Incident location</Text>
        </CardItem>

        <CardItem style={{ height: 200 }} cardBody>
          <Map
            markers={markers}
            onPress={event => onMarkerSelect(event.nativeEvent.coordinate)}
          />
        </CardItem>
      </Card>

      <Card>
        <CardItem header bordered>
          <Text>Incident proof (optional)</Text>
        </CardItem>

        <CameraRoll aspect={[4, 3]} allowsEditing onSelect={onProofSelect}>
          {({ onPress, image }) => (
            <React.Fragment>
              <CardItem bordered>
                <Content>
                  <Button onPress={onPress} full light>
                    <Text>Pick an image from camera roll</Text>
                  </Button>
                </Content>
              </CardItem>

              {image && (
                <CardItem>
                  <Image
                    source={{ uri: image }}
                    style={{ width: '100%', height: 200 }}
                  />
                </CardItem>
              )}
            </React.Fragment>
          )}
        </CameraRoll>
      </Card>

      <Button
        block
        style={{ marginTop: 10, marginBottom: 20 }}
        onPress={handleSubmit}
        disabled={disabled}
      >
        <Text>Save</Text>
      </Button>
    </Content>
  );
};

export default reduxForm({
  form: 'polluterForm',

  validate(values) {
    const errors = {};

    if (!values.title) {
      errors.title = 'This field is required';
    }

    if (!values.description) {
      errors.description = 'This field is required';
    }

    return errors;
  },
})(Polluter);
import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  state = {
    hasCameraPermission: null, 
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted'
    });
  }  

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Request Camera Permissions</Text>;
    }

    if (hasCameraPermission === false) {
      return <Text>Access Camera Denied!</Text>;
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCode}
          style={StyleSheet.absoluteFillObject} />

          {scanned && (
            <Button
              title={'Tap to Scan'}
              onPress={() => this.setState({ scanned: false })} />
          )}
      </View>
    );
  }

  handleBarCode = ({ type, data }) => {
    this.setState({ scanned: true });
    Alert.alert(
      `Tipe Barcode: ${type} - Data: ${data}`
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

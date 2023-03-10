/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import {Button} from 'react-native-paper';
import {textComponent} from '../components/components';

export default function App({navigation}: any): JSX.Element {
  const data: number[] = [...Array(1000).keys()];

  return (
    <SafeAreaView>
      <StatusBar barStyle={'dark-content'} />
      <View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Display')}>
            Display Information
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('Capture')}>
            Capture Information
          </Button>
        </View>
        <FlatList
          data={data}
          renderItem={({index}) => textComponent(index)}
          keyExtractor={index => `#${index + 1}`}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

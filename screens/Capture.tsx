/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import {TextInput, Button, Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {details} from '../components/components';

export default function Capture(): JSX.Element {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [cell, setCell] = useState('');
  const [visible, setVisible] = React.useState(false);

  const onToggleSnackBar = () => setVisible(!visible);

  const processData = () => {
    storeData({name, surname});
    storeData({email, cell});
  };

  const storeData = async (value: details) => {
    try {
      const jsonValue = JSON.stringify(value);
      if (value.name && value.surname) {
        await AsyncStorage.setItem('names', jsonValue);
      } else if (value.email && value.cell) {
        await AsyncStorage.setItem('details', jsonValue);
      }
      onToggleSnackBar();
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <TextInput
            mode="outlined"
            label="Name"
            placeholder="Name"
            value={name}
            onChangeText={setName}
            keyboardType={'default'}
            autoComplete={'off'}
          />
          <TextInput
            mode="outlined"
            label="Surname"
            placeholder="Surname"
            value={surname}
            onChangeText={setSurname}
            keyboardType={'default'}
            autoComplete={'off'}
          />
          <TextInput
            mode="outlined"
            label="Email"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType={'default'}
            autoComplete={'off'}
          />
          <TextInput
            mode="outlined"
            label="Cell Number"
            placeholder="Cell Number"
            value={cell}
            onChangeText={setCell}
            keyboardType={'default'}
            autoComplete={'off'}
          />
          <View style={styles.buttonContainer}>
            <Button mode="contained" onPress={() => processData()}>
              Capture Information
            </Button>
          </View>
          <Snackbar
            visible={visible}
            onDismiss={onToggleSnackBar}
            action={{
              label: 'Done',
            }}>
            Information has been captured
          </Snackbar>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

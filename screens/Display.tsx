/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {SafeAreaView, View, FlatList} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Snackbar} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {infoComponent, details} from '../components/components';

function App(): JSX.Element {
  const values: details[] = [{name: '', surname: '', email: '', cell: ''}];

  const [visible, setVisible] = React.useState(false);
  const [data, setData] = React.useState(values);

  const onToggleSnackBar = () => setVisible(!visible);

  const getData = async (key: string) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    try {
      let values_new = values[0];
      let nameData = await getData('names');
      let emailData = await getData('details');
      if (nameData !== null) {
        values_new = {...values_new, ...nameData};
      }
      if (emailData !== null) {
        values_new = {...values_new, ...emailData};
      }

      if (!emailData && !nameData) {
        await init();
      } else setData([values_new]);
      onToggleSnackBar();
    } catch (e) {
      console.log('🚀 ~ file: display.tsx:57 ~ e:', e);
    }
  };

  const init = async () => {
    try {
      let jsonValue = JSON.stringify({name: 'Michael', surname: 'Baker'});
      await AsyncStorage.setItem('names', jsonValue);
      jsonValue = JSON.stringify({
        email: 'michael@test.com',
        cell: '0825558364',
      });
      await AsyncStorage.setItem('details', jsonValue);
      setData([
        {
          name: 'Michael',
          surname: 'Baker',
          email: 'michael@test.com',
          cell: '0825558364',
        },
      ]);
      onToggleSnackBar();
    } catch (e) {
      console.log('🚀 ~ file: display.tsx:72 ~ init ~ e:', e);
    }
  };

  if (!data) return <SafeAreaView style={Colors.darker}></SafeAreaView>;

  return (
    <SafeAreaView style={Colors.darker}>
      <View>
        <FlatList
          data={data}
          renderItem={({item}) => infoComponent(item)}
          keyExtractor={({name}) => name}
        />
      </View>
      <Snackbar
        visible={visible}
        onDismiss={onToggleSnackBar}
        action={{
          label: 'Done',
        }}>
        Information Has been Loaded
      </Snackbar>
    </SafeAreaView>
  );
}

export default App;

import React, {ReactElement} from 'react';
import {View} from 'react-native';
import {Text, Divider} from 'react-native-paper';

// Types
type names = {
  name?: string;
  surname?: string;
};
type contacts = {
  email?: string;
  cell?: string;
};

export type details = names & contacts;

//components
export function textComponent(i: number): ReactElement {
  /* Text Component for viewing the number iterations */
  if (i % 100 === 0 && i) {
    return <Text style={{fontSize: 25}}>Beep Boop</Text>;
  } else if (i % 20 === 0 && i) {
    return <Text style={{fontSize: 25}}>Beep</Text>;
  } else if (i % 5 === 0 && i) {
    return <Text style={{fontSize: 20}}>Boop</Text>;
  } else {
    return <Text>{i}</Text>;
  }
}

export function infoComponent(item: details): ReactElement {
  /* Text Component for viewing the details of the  user */
  return (
    <View>
      <Text variant="headlineMedium">Name: {item.name}</Text>
      <Divider />
      <Text variant="headlineMedium">Surname: {item.surname}</Text>
      <Divider />
      <Text variant="headlineMedium">Email: {item.email}</Text>
      <Divider />
      <Text variant="headlineMedium">Cell Phone: {item.cell}</Text>
      <Divider />
    </View>
  );
}

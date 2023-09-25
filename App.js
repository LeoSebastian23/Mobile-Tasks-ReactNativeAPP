import {SafeAreaView, StyleSheet, View,Text } from 'react-native';
import List from './components/List';
import CustomSafeAreaView from './CustomSafeAreaView';

export default function App() {
  return (
    <CustomSafeAreaView>
      <List></List>
    </CustomSafeAreaView>    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});

import {SafeAreaView, StyleSheet, Text, View } from 'react-native';
import List from './components/List';

export default function App() {
  return (
    <SafeAreaView>
      <List/>
    </SafeAreaView>
      
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

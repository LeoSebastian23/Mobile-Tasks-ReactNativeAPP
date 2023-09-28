import {SafeAreaView, StyleSheet, View,Text } from 'react-native';
import List from '../components/List';
import CustomSafeAreaView from '../CustomSafeAreaView'; 

export default function Home() {
  return (
    <CustomSafeAreaView>
        <View style={styles.container}>
            <List></List>
        </View>
            
    </CustomSafeAreaView>    
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:40,
    paddingLeft:20,
    //alignItems: 'center',
    //justifyContent: 'center',

  },
});

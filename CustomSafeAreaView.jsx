import React from 'react';
import { View, Platform, StatusBar } from 'react-native';

function CustomSafeAreaView({ children }) {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:'#b0e0e6'
      }}
    >
      {children}
    </View>
  );
}

export default CustomSafeAreaView;

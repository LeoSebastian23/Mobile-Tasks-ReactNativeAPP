import * as React from 'react';
import { StyleSheet,Text, View } from 'react-native';

export default function ListItem({
    id,
    text,
    isComplet,
    isToday,
    hour
}){
    return(
        <View style={styles.container}>
            <Text>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:15,
    }
})
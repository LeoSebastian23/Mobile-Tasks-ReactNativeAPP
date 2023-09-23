import * as React from 'react';
import { StyleSheet,Text, View } from 'react-native';
import Checkbox from './Checkbox';

export default function ListItem({
    id,
    text,
    isComplet,
    isToday,
    hour
}){
    return(
        <View style={styles.container}>
            <Checkbox>
                id={id}
                text={text}
                isCompleted={isComplet}
                isToday={isToday}
                hour={hour}
            </Checkbox>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.time}>{hour}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginBottom:15,
    },
    text:{
        fontSize:20, 
        color:'#2f4f4f',
    },
    time:{
        fontSize:14,
        color:'#a3a3a3',
        fontWeight:'500',
    }
})
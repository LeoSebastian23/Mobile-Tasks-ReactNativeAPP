import * as React from 'react';
import { StyleSheet,Text, View } from 'react-native';
import Checkbox from './Checkbox';
import moment from 'moment/moment';

export default function TaskItem({
    id,
    text,
    isCompleted,
    isToday,
    hour
}){
    const [localHour, setLocalHour] = React.useState(new Date(hour));
    return( 
        <View style={styles.container}>
            <Checkbox 
                id={id}
                text={text}
                isCompleted={isCompleted}
                isToday={isToday}
                hour={hour}
            />
            <View>
                <Text  style={
                    isCompleted 
                    ? [styles.text,{textDecorationLine :'line-through'}, {color :'gray'}] 
                    : [styles.text]
                }
                >{text}</Text>
                <Text style={styles.time}>{moment(localHour).format('LT')}</Text>
            </View>
        
        </View>
        
    )
}

const styles = StyleSheet.create({
    container:{
        padding:10,
        flexDirection: 'row',
        alignItems: 'center',
        //borderBottomWidth: 1,
        //borderBottomColor:'black',
        //borderLeftWidth:1,
    },
    text:{
        fontSize:20, 
        color:'#2f4f4f',
    },
    time:{
        fontSize:14,
        color:'#2f4f4f',
        fontWeight:'500',
    }
})
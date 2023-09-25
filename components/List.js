import * as React from 'react';
import { FlatList,Text,View } from 'react-native';
import ListItem from './ListItem';
import { info } from '../data/data';


export default function List(){
    return(
        <FlatList
            data={info}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ListItem 
            id={item.id}
            text={item.text}
            isCompleted={item.isCompleted}
            isToday={item.isToday}
            hour={item.hour}
            
            />
            
    }
        />
    )
}
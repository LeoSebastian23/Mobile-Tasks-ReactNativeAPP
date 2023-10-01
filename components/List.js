import * as React from 'react';
import { FlatList,Text,View } from 'react-native';
import TaskItem from './TaskItem';

export default function ({info}){
    return(
        <FlatList
            data={info}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <TaskItem
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


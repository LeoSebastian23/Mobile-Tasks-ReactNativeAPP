import * as React from 'react';
import {list} from '../data/list';
import { FlatList,Text,View } from 'react-native';
import ListItem from './ListItem';

export default function List(){
    return(
        <FlatList
            data={list}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <ListItem {...item}/>}
        />
    )
}
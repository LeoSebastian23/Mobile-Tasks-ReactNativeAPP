import * as React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import List from '../components/List';
import CustomSafeAreaView from '../CustomSafeAreaView';
//import { info } from '../data/data';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { hideComplitedReducer,setTasksReducer } from "../reduxs/taskSlice";



export default function Home() {
    const tasks = useSelector(state => state.tasks.tasks);

    // const [localData, setLocalData] = React.useState(
    //     info.sort((a, b) => { return a.isCompleted - b.isCompleted })
    // )
    const [isHidden, setIsHidden] = React.useState(false)

     const handleHidePress = () => {
    //     if (isHidden) {
    //         setIsHidden(false)
    //         setLocalData(info.sort((a, b) => { return a.isCompleted - b.isCompleted }))
    //         return
    //     }
    //     setIsHidden(!isHidden)
    //     setLocalData(localData.filter(info => !info.isCompleted))
    }

    const navigation = useNavigation();

    // React.useEffect(() =>(

    // ))


    return (
        <CustomSafeAreaView>
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <Text style={styles.tittle}>Hoy</Text>
                    <TouchableOpacity onPress={handleHidePress}>
                        <Text style={{ color: '#4b0082' }}>{isHidden ? "MOSTRAR COMPLETOS" : "OCULTAR COMPLETOS"}</Text>
                    </TouchableOpacity>
                </View>
                <List info={tasks.filter(tasks => tasks.isToday === true)} />
                <Text style={styles.tittle}>Mañana</Text>
                <List info={tasks.filter(tasks => tasks.isToday === false)} />
                <TouchableOpacity
                    style={styles.buttonAdd}
                    onPress={() => navigation.navigate('Add')}
                >
                    <Text style={styles.plus}>+</Text>
                </TouchableOpacity>
            </View>
        </CustomSafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 12,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    tittle: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20
    },
    containerTop: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 20
    },
    buttonAdd: {
        width: 50,
        height: 50,
        borderRadius: 16,
        backgroundColor: '#2f4f4f',
        position: 'absolute',
        bottom: 50,
        right: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: .5,
        shadowRadius: 5,
        elevation: 5,
    },
    plus: {
        fontSize: 40,
        color: '#fff',
        position: 'absolute',
         top: -4,
        left: 14,
    }
}); 
import * as React from "react";
import {StyleSheet,View,Text,TouchableOpacity,ViewComponent,Platform} from "react-native";
import List from "../components/List";
import CustomSafeAreaView from "../CustomSafeAreaView";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideComplitedReducer, setTasksReducer } from "../reduxs/taskSlice";
import * as Notifications from "expo-notifications";
import * as Device from 'expo-device';
import moment from "moment";


Notifications.setNotificationHandler({
  handleNotification: async ()=>({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

export default function Home() {

  const tasks = useSelector((state) => state.tasks.tasks);
  const [isHidden, setIsHidden] = React.useState(false);
  const dispatch = useDispatch();
  const [expoPushToken, setExpoPushToken] = React.useState('');
  const navigation = useNavigation();  

  const handleHideCompleted = async () => {
    if (isHidden) {
      setIsHidden(false);
      const tasks = await AsyncStorage.getItem("@Tasks");
      if (tasks !== null) {
        dispatch(setTasksReducer(JSON.parse(tasks))); 
      }
      return;
    }
    setIsHidden(!isHidden);
    dispatch(hideComplitedReducer());
  };

  const registerForPushNotificationsAsync = async () => {
    let token;
  
    // Verifica si el dispositivo es un dispositivo real
    if (Device.isDevice) {
      // Obtiene el estado actual de los permisos de notificaciones
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
  
      // Si los permisos no están otorgados, solicita permisos al usuario
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
  
      // Si no se otorgan los permisos, muestra una alerta indicando que no se pudo obtener el token de notificación push
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return null; // Cambiado para devolver un valor nulo en caso de fallo
      }
  
      // Obtiene el token de notificación push mediante Notifications.getExpoPushTokenAsync
      token = (await Notifications.getExpoPushTokenAsync({})).data;
      console.log(token);
    } else {
      // Si no es un dispositivo real, simplemente regresa
      return null; // Cambiado para devolver un valor nulo si no es un dispositivo real
    }
  
    // Si la plataforma es Android, configura un canal de notificación con ciertos parámetros
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    // Devuelve el token obtenido
    return token;
  }
  

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    const getTasks = async () => {
      try {
        const tasks = await AsyncStorage.getItem("@Tasks");
        if (tasks !== null) {
          dispatch(setTasksReducer(JSON.parse(tasks))); // Pasamos de JSON a JS
          const taskData = JSON.parse(tasks);
          const taskDataFiltered = taskData.filter(task => {
            return moment(new Date(task.hour)).isSameOrAfter(moment(),'day')
          })
          if(taskDataFiltered !== null){
              await AsyncStorage.setItem("@Task",JSON.stringify(taskDataFiltered));
              console.log('we deleted some passed task');
              dispatch(setTasksReducer(taskDataFiltered));
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getTasks();
  }, []);


  return (
    <CustomSafeAreaView>
      <View style={styles.container}>
        <View style={styles.containerToday}>
          <Text style={styles.tittle}>HOY</Text>
          <TouchableOpacity onPress={handleHideCompleted}>
            <Text style={styles.textState}>
              {isHidden ? "MOSTRAR COMPLETOS" : "OCULTAR COMPLETOS"}
            </Text>
          </TouchableOpacity>
        </View>
        <List info={tasks.filter((tasks) => tasks.isToday === true)} />
        <View style={styles.containerTomorrow}>
          <Text style={styles.tittle}>Mañana</Text>
        </View>
        <List info={tasks.filter((tasks) => tasks.isToday === false)} />
        <TouchableOpacity
          style={styles.buttonAdd}
          onPress={() => navigation.navigate("Add")}
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
  },
  tittle: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#fff",
    padding: 5,
  },
  textState:{
    backgroundColor:"#071952",
    borderRadius:15,
    padding:10,
    color:"#fff",
    fontWeight:"bold",
    fontSize:12,
  },
  containerToday: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: 20,
    borderBottomColor: "#EEEEEE",
    borderRadius: 10,
    borderBottomWidth: 2,
    marginBottom: 4,
    marginTop: 16,
  },
  containerTomorrow:{
    borderBottomColor: "#EEEEEE",
    borderRadius: 10,
    borderBottomWidth: 2,
    marginBottom: 4,
  },
  buttonAdd: {
    width: 50,
    height: 50,
    borderRadius: 16,
    backgroundColor: "#A2FF86",
    position: "absolute",
    bottom: 50,
    right: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  plus: {
    fontSize: 40,
    color: "#001C30",
    position: "absolute",
    top: -4,
    left: 14,
  },
});

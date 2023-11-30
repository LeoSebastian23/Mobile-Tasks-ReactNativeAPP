import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { addTaskReducer } from "../reduxs/taskSlice";

import * as Notifications from "expo-notifications";


export default function AddTask() {
  const [name, setName] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [isToday, setIsToday] = React.useState(false);
  const [showTimePicker, setShowTimePicker] = React.useState(false);
  const [withAlert, setWithAlert] = React.useState(false);

  const listTasks = useSelector((state) => state.tasks.tasks);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleTimeChange = (event, selectedDate) => {
    setShowTimePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const addTask = async () => {
    const newTask = {
      id: Math.floor(Math.random() * 1000000),
      text: name,
      hour: isToday
        ? date.toISOString()
        : new Date(date).getTime() + 24 * 60 * 60 * 1000,
      isToday: isToday,
      isComplited: false,
    };
    try {
      await AsyncStorage.setItem(
        "@Tasks",
        JSON.stringify([...listTasks, newTask])
      );
      dispatch(addTaskReducer(newTask));
      console.log("Tarea guardada correctamente");
      if(withAlert){
        await scheduleTaskNotification(newTask);
      }
      
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const scheduleTaskNotification = async (task) => {
    const trigger = new Date(task.hour);
    try {
      await Notifications.scheduleNotificationAsync({
        content:{
          title:"It's time",
          body: task.text,
        },
        trigger,
      });
      console.log("Notificacion con alerta");
    } catch (e){
      alert("ALERT")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Tarea</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Título</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Tarea"
          placeholderTextColor="#00000030"
          onChangeText={(text) => setName(text)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Horario</Text>
        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={styles.hours}>
            {date.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode={"time"}
            is24Hour={true}
            display={"spinner"} // Establece el estilo de visualización en 'spinner' para mostrar solo horas y minutos.
            onChange={handleTimeChange}
            style={{ width: "80%", backgroundColor: "" }}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Hoy</Text>
        <Switch value={isToday} onValueChange={(value) => setIsToday(value)} />
      </View>
      <Text
        style={{
          color: "#00000040",
          fontSize: 12,
          maxWidth: "90%",
          paddingBottom: 10,
        }}
      >
        Si la tarea NO es para hoy, se programará para mañana.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputTitle}>Alert</Text>
        <Switch value={withAlert} onValueChange={(value) => setWithAlert(value)} />
      </View>
      <Text
        style={{
          color: "#00000040",
          fontSize: 12,
          maxWidth: "90%",
          paddingBottom: 10,
        }}
      >
        La aplicación notificará la tarea a realizar en el horario asignado.
      </Text>

      <View>
        <TouchableOpacity onPress={addTask} style={styles.button}>
          <Text style={{ color: "white", fontSize: 24 }}>Hecho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#35A29F",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 44,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 35,
    borderBottomColor: "black",
    borderBottomWidth: 1,
    paddingBottom:10,
    borderRadius: 10,
  },
  textInput: {
    borderBottomColor: "#00000030",
    borderBottomWidth: 1,
    width: "80%",
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: "600",
    lineHeight: 30,
    paddingRight: 10,
  },
  inputContainer: {
    marginTop: 16,
    marginBottom: 16,
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F7A1",

    borderRadius: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#053B50",
    height: 56,
    borderRadius: 11,
  },
  hours: {
    fontSize: 20,
    fontWeight: "700",
    backgroundColor: "#A2FF86",
    borderRadius:10,
    elevation: 2,
    padding: 10,
  },
});

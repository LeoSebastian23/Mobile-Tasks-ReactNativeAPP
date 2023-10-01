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

export default function AddTask() {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date());
  const [isToday, setIsToday] = useState(false); 

  const [showTimePicker, setShowTimePicker] = useState(false);

  const listTasks = useSelector((state) => state.tasks.tasks); //Estado de redux

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
      console.log("Task saved correctly");
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

return (
  <View style={styles.container}>
    <Text style={styles.title}>Agregar tarea</Text>
    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Titulo</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Task"
        placeholderTextColor="#00000030"
        onChangeText={(text) => setName(text)}
      />
    </View>

    <View style={styles.inputContainer}>
      <Text style={styles.inputTitle}>Horario</Text>
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <Text>{date.toLocaleTimeString()}</Text>
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={date}
          mode={"time"}
          is24Hour={true}
          onChange={handleTimeChange}
          style={{ width: "80%" }}
        />
      )}
    </View>
    <View
      style={[
        styles.inputContainer,
        { paddingBottom: 0, alignItems: "center" },
      ]}
    >
      <View>
        <Text style={styles.inputTitle}>Hoy</Text>
        <Text
          style={{
            color: "#00000040",
            fontSize: 12,
            maxWidth: "84%",
            paddingBottom: 10,
          }}
        >
          Si la tarea NO es para hoy, se programará para mañana.
        </Text>
      </View>
      <Switch value={isToday} onValueChange={(value) => setIsToday(value)} />
    </View>
    <TouchableOpacity onPress={addTask} style={styles.button}>
      <Text style={{ color: "white" }}>Done</Text>
    </TouchableOpacity>
  </View>
)
};

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 10,
  },
  textInput: {
    borderBottomColor: "#00000030",
    borderBottomWidth: 1,
    width: "80%",
  },
  container: {
    flex: 1,
    backgroundColor: "#F7F8FA",
    paddingHorizontal: 30,
  },
  inputTitle: {
    fontSize: 20,
    fontWeight: "600",
    lineHeight: 24,
  },
  inputContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingBottom: 30,
  },
  button: {
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    height: 46,
    borderRadius: 11,
  },
});

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
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

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
    backgroundColor: "#64CCC5",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 35,
    marginTop: 35,
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
    backgroundColor: "#EEEEEE",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#053B50",
    height: 46,
    borderRadius: 11,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  hours: {
    fontSize: 20,
    fontWeight: "700",
    backgroundColor: "#A2FF86",
    //color:"#EEEEEE",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
    padding: 10,
  },
});

import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Checkbox from "./Checkbox";
import moment from "moment/moment";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteTaskReducer } from "../reduxs/taskSlice";

import { MaterialIcons } from "@expo/vector-icons";

export default function TaskItem({ id, text, isCompleted, isToday, hour }) {
  const [localHour, setLocalHour] = React.useState(new Date(hour));

  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDeleteTask = async () => {
    dispatch(deleteTaskReducer(id));
    try {
      await AsyncStorage.setItem(
        "@Tasks",
        JSON.stringify(tasks.filter((task) => task.id !== id))
      );
      console.log("Task deleted correctly");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Checkbox
          id={id}
          text={text}
          isCompleted={isCompleted}
          isToday={isToday}
          hour={hour}
        />
        <View style={styles.textContainer}>
          <Text
            style={
              isCompleted
                ? [
                    styles.text,
                    { textDecorationLine: "line-through" },
                    { color: "gray" },
                  ]
                : [styles.text]
            }
          >
            {text}
          </Text>
          <Text
            style={
              isCompleted
                ? [
                    styles.time,
                    { textDecorationLine: "line-through" },
                    { color: "gray" },
                  ]
                : [styles.time]
            }
          >
            {moment(localHour).format("LT")}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handleDeleteTask}>
        <MaterialIcons
          name="delete-outline"
          size={24}
          color="black"
          style={styles.delete}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F2F7A1", // Color de fondo
    borderRadius: 8, // Bordes redondeados
    margin: 8, // Márgenes
    padding: 8, // Espaciado interno
    flexDirection: "row", // Para alinear elementos horizontalmente
    justifyContent: "space-between", // Para espaciar los elementos en el contenedor
    alignItems: "center", // Para centrar verticalmente los elementos
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
    maxWidth: "70%", // Establece un ancho máximo
  },
  text: {
    fontSize: 16, // Tamaño de fuente
    color: "#333333", // Color del texto
  },
  time: {
    fontSize: 14,
    color: "#888",
  },
  delete: {
    fontSize: 24,
    color: "red", // Color del icono de eliminación
    // Agrega sombras u otros estilos aquí si deseas destacarlo más
  },
});

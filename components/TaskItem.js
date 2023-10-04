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
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Checkbox
          id={id}
          text={text}
          isCompleted={isCompleted}
          isToday={isToday}
          hour={hour}
        />
        <View>
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
          <Text style={styles.time}>{moment(localHour).format("LT")}</Text>
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
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    fontSize: 20,
    color: "#2f4f4f",
  },
  time: {
    fontSize: 14,
    color: "#2f4f4f",
    fontWeight: "500",
  },
});

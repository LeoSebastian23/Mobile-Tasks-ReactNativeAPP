import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ViewComponent,
} from "react-native";
import List from "../components/List";
import CustomSafeAreaView from "../CustomSafeAreaView";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { hideComplitedReducer, setTasksReducer } from "../reduxs/taskSlice";

export default function Home() {
  const tasks = useSelector((state) => state.tasks.tasks);

  const [isHidden, setIsHidden] = React.useState(false);

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

  const navigation = useNavigation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await AsyncStorage.getItem("@Tasks");
        if (tasks !== null) {
          dispatch(setTasksReducer(JSON.parse(tasks))); // Pasamos de JSON a JS
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
        {/* <View>
                    <Text>
                        Block de tareas
                    </Text>
                </View> */}
        <View style={styles.containerToday}>
          <Text style={styles.tittle}>Hoy</Text>
          <TouchableOpacity onPress={handleHideCompleted}>
            <Text style={{ color: "#64CCC5" }}>
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
    fontSize: 34,
    fontWeight: "bold",
    marginBottom: 4,
    //marginTop: 16,
    color: "#EEEEEE",
    padding: 5,
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

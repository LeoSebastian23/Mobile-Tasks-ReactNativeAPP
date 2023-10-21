import { createSlice } from "@reduxjs/toolkit";
//import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    tasks: [],
};

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        setTasksReducer: (state, action) => {
            state.tasks = action.payload;
            //console.log(state.tasks);
        },
        addTaskReducer: (state, action) => {
            state.tasks.push(action.payload);
        },
        hideComplitedReducer: (state, action) => {
            state.tasks = state.tasks.filter(task => !task.isCompleted);
        },
        updateTaskReducer: (state, action) => { 
           //toggle is completed
            state.tasks = state.tasks.map(task => {
                if (task.id === action.payload.id) {
                    task.isCompleted = !task.isCompleted;
                }
                return task;
            }); 
        },
        deleteTaskReducer: (state, action) => {
            const id = action.payload;
            const task = state.tasks.filter(task => task.id !== id);
            state.tasks = task;
        }
    },
});

export const { 
    setTasksReducer, 
    addTaskReducer, 
    updateTaskReducer, 
    hideComplitedReducer, 
    deleteTaskReducer
} = taskSlice.actions;

export default taskSlice.reducer;
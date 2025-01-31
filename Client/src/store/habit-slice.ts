import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type {} from "@reduxjs/toolkit"

export interface Habit {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completeDates: string[];
  createAt: string;
}

interface HabitState {
  habits: Habit[];
}

const initialState: HabitState = {
  habits: [],
};

const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newHabbit: Habit = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completeDates: [],
        createAt: new Date().toISOString(),
      };
      state.habits.push(newHabbit);
    },
    toggleHabit: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const habit = state.habits.find((h) => h.id === action.payload.id);

      if (habit) {
        const index = habit.completeDates.indexOf(action.payload.date);
        if (index > -1) {
          habit.completeDates.splice(index, 1);
        } else {
          habit.completeDates.push(action.payload.date);
        }
      }
    },
    removeHabit: () => {},
  },
});

export const { addHabit, toggleHabit } = habitSlice.actions;
export default habitSlice.reducer;

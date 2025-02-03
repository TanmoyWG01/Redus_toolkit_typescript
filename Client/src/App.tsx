import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store/store";
import { Container, Typography } from "@mui/material";
import AddHabitForm from "./components/add-habit-form";
import HabitLists from "./components/habit-lists";
import HabitsStats from "./components/habits-stats";

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md">
        <Typography component="h1" variant="h2" align="center">
          Habit Tracker
        </Typography>
        <AddHabitForm />
        <HabitLists />
        <HabitsStats />
      </Container>
    </Provider>
  );
}

export default App;

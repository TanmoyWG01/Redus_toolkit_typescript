import { useDispatch, useSelector } from "react-redux";
import { AppDispatche, RootState } from "../store/store";
import { useEffect } from "react";
import { fetchHabits, Habit } from "../store/habit-slice";
import { LinearProgress, Paper, Typography } from "@mui/material";

const HabitsStats = () => {
  const { habits, isLoading, error } = useSelector(
    (state: RootState) => state.habits
  );
  const dispatch = useDispatch<AppDispatche>();

  useEffect(() => {
    dispatch(fetchHabits());
  }, [dispatch]);

  const getCompletedToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return habits.filter((habit) => habit.completeDates.includes(today)).length;
  };

  if (isLoading) {
    return <LinearProgress />;
  }

  const getStreak = (habit: Habit) => {
    let streak = 0;

    const currentDate = new Date();

    while (true) {
      const dataString = currentDate.toISOString().split("T")[0];

      if (habit.completeDates.includes(dataString)) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  const getLongestStreak = () => {
    return Math.max(...habits.map(getStreak), 0);
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper elevation={2} sx={{ p: 2, mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Habit Statistics
      </Typography>
      <Typography variant="body1">Total Habits: {habits.length}</Typography>
      <Typography variant="body1">
        Completed Today: {getCompletedToday()}
      </Typography>
      <Typography variant="body1">
        Longest Streak: {getLongestStreak()}
      </Typography>
    </Paper>
  );
};

export default HabitsStats;

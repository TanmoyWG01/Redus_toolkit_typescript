import { AppDispatche, RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Button,
  Grid2,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { Habit, toggleHabit } from "../store/habit-slice";

const HabitLists = () => {
  const { habits } = useSelector((state: RootState) => state.habits);
  const dispatch = useDispatch<AppDispatche>();
  const today = new Date().toISOString().split("T")[0];

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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
      {habits.map((habit) => {
        return (
          <Paper key={habit.id} elevation={2} sx={{ p: 2 }}>
            <Grid2 container alignItems="center">
              <Grid2>
                <Typography variant="h6" color="initial">
                  {habit.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ textTransform: "capitalize" }}
                >
                  {habit.frequency}
                </Typography>
              </Grid2>
              <Grid2 size={12}>
                <Box
                  sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}
                >
                  <Button
                    variant="outlined"
                    color={
                      habit.completeDates.includes(today)
                        ? "success"
                        : "primary"
                    }
                    startIcon={<CheckCircleIcon />}
                    onClick={() =>
                      dispatch(toggleHabit({ id: habit.id, date: today }))
                    }
                  >
                    {habit.completeDates.includes(today)
                      ? "Completed"
                      : "Mark Complete"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </Box>
              </Grid2>
            </Grid2>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2">
                Current Streak: {getStreak(habit)} days
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(getStreak(habit) / 30) * 100}
                sx={{ mt: 1 }}
              />
            </Box>
          </Paper>
        );
      })}
    </Box>
  );
};

export default HabitLists;

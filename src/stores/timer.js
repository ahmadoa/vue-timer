import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTimerStore = defineStore("timer", () => {
  const storage_key = "timer";

  const currentTime = ref(0);
  const intervalId = ref(null);
  const isPaused = ref(false);
  const isRunning = computed(() => intervalId.value !== null);

  // compute the timer value based on the current time
  const timer = computed(
    () => {
      const hours = Math.floor(currentTime.value / 3600);
      const minutes = Math.floor((currentTime.value % 3600) / 60);
      const seconds = currentTime.value % 60;
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    },
    { deep: true }
  );

  // start time if not already running
  const startTimer = () => {
    if (!intervalId.value) {
      intervalId.value = setInterval(() => {
        if (!isPaused.value) {
          currentTime.value++;
          saveTimerState();
        }
      }, 1000);
    }
  };

  // reset the timer
  const resetTimer = () => {
    currentTime.value = 0;
    clearInterval(intervalId.value);
    intervalId.value = null;
    isPaused.value = false;
    localStorage.removeItem(storage_key);
  };

  // pause/resume the timer based on the isPaused state
  const pauseResumeTimer = () => {
    if (isPaused.value) {
      isPaused.value = false; // If paused, resume the timer
      startTimer(); // Restart the timer
    } else {
      isPaused.value = true; // If running, pause the timer
    }
    saveTimerState();
  };

  // if storage key exists, load the timer state
  function loadTimerState() {
    const storedState = localStorage.getItem(storage_key);
    if (storedState) {
      try {
        const state = JSON.parse(storedState);
        currentTime.value = state.currentTime;
        isPaused.value = state.isPaused;
        if (!state.isPaused) {
          startTimer(); // Resume the timer
        }
      } catch (error) {
        console.error("Error loading timer state:", error);
      }
    }
  }

  // save the timer state to local storage
  function saveTimerState() {
    const state = {
      currentTime: currentTime.value,
      isPaused: isPaused.value,
      intervalId: intervalId.value,
    };
    localStorage.setItem(storage_key, JSON.stringify(state));
  }

  return {
    currentTime,
    timer,
    isRunning,
    isPaused,
    startTimer,
    pauseResumeTimer,
    resetTimer,
    saveTimerState,
    loadTimerState,
  };
});

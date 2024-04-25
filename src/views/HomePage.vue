<template>
    <div class="mt-20 w-full h-80 flex flex-col gap-10 text-center items-center justify-between">
        <div class="text-9xl font-bold text-black">{{currentTime !== 0 ? timer : "00:00:00" }}</div>
        <div class="flex flex-row gap-3">
            <button @click="startTimer">Start</button>
            <button @click="pauseResumeTimer">{{buttonText}}</button>
            <button @click="resetTimer">Reset</button>
        </div>
    </div>
</template>

<script setup>
import { useTimerStore } from '@/stores/timer';
import { computed, onMounted } from 'vue'; 
import { storeToRefs } from 'pinia';
import { onBeforeRouteLeave } from 'vue-router'

const store = useTimerStore();
const {currentTime, timer, isPaused } = storeToRefs(store);

const { startTimer, pauseResumeTimer, resetTimer, saveTimerState, loadTimerState } = store;

const buttonText = computed(() => {
  return isPaused.value ? 'Resume' : 'Pause';
});

onBeforeRouteLeave(()=>{
    isPaused.value = true;
    saveTimerState();
});

onMounted(() => {
    if (currentTime.value !== 0){
        isPaused.value = false;
        saveTimerState();
    }
    loadTimerState();
});

</script>

<style scoped>
button {
    @apply p-2 bg-amber-900 text-white rounded-md font-semibold;
}
</style>
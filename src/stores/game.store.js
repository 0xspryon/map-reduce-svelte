import { writable } from 'svelte/store'
import { randomFromData } from "../utils";


function incrementStep(currentState) {
  currentState.stepIndex++;
  if (currentState.stepIndex == 1) {
    currentState.selected = randomFromData(currentState.data);
  }
  if (currentState.stepIndex > 0)
  currentState.restart = true;
  return currentState;
}

function decrementStep(currentState) {
  if (currentState.stepIndex < 1) return;
  currentState.stepIndex--;
  if (currentState.stepIndex == 0)
    currentState.selected = [];
  return currentState;
}

export const store = writable();

export const initStore = (initialState = {}) => {
  const { update, set, subscribe } = store

  //initialize store
  set(initialState)

  return {
    subscribe,
    next: () => update(incrementStep),
    previous: () => update(decrementStep),
    setAnswer: (answer) => update(state => ({ ...state, answer })),
    restart: () => set({
      restart: true, selected: [], stepIndex: 0
    }),
  }
};
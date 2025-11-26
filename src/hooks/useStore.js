import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = create(persist(
  (set) => ({
    player: { name: 'Guest', level: 1, xp: 0 },
    inventory: [],
    quests: [],
    currentScene: 'LANDING',
    playerPosition: [0, 0, 5], // Store player's last position in landing scene
    campusEntered: false, // Track if player has entered campus
    returningFromBuilding: false, // Track if coming back from building via Back button

    addItem: (item) => set((s) => ({ inventory: [...s.inventory, item] })),
    completeQuest: (id) => set((s) => ({
      quests: [...s.quests, { id, completed: true }],
    })),
    setScene: (scene) => set({ currentScene: scene }),
    setPlayerPosition: (position) => set({ playerPosition: position }),
    setCampusEntered: (entered) => set({ campusEntered: entered }),
    setReturningFromBuilding: (returning) => set({ returningFromBuilding: returning }),
  }),
  {
    name: 'qculand-save', 
  }
));

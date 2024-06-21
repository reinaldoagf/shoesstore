import { create } from 'zustand';
import { UserState } from '../interfaces/userState';

export const useUserStore = create<UserState>((set: any) => ({
    currentUser: {showTutorial: true},
    setCurrentUser: (value: any) => set({ currentUser: value })
}))
import { create } from "zustand";

export const useAuthStore = create((set) => ({
  auth: {
    username: "",
    email: "",
    profile: "",
  },
  setUsername: (name) => {
    set((state) => ({ auth: { ...state.auth, username: name } }));
  },
  setEmail: (email) => {
    set((state) => ({ auth: { ...state.auth, email: email } }));
  },
  setProfile: (profile) => {
    set((state) => ({ auth: { ...state.auth, profile: profile } }));
  },
}));

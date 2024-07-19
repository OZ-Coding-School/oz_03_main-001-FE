/* eslint-disable no-unused-vars */
import create from 'zustand';

type JoinState = {
  nameValue: string;
  emailValue: string;
  idValue: string;
  passValue: string;
  rePassValue: string;
  nameError: string;
  emailError: string;
  idError: string;
  passError: string;
  rePassError: string;
  setNameValue: (value: string) => void;
  setEmailValue: (value: string) => void;
  setIdValue: (value: string) => void;
  setPassValue: (value: string) => void;
  setRePassValue: (value: string) => void;
  setNameError: (message: string) => void;
  setEmailError: (message: string) => void;
  setIdError: (message: string) => void;
  setPassError: (message: string) => void;
  setRePassError: (message: string) => void;
};

export const useJoinStore = create<JoinState>((set) => ({
  nameValue: '',
  emailValue: '',
  idValue: '',
  passValue: '',
  rePassValue: '',
  nameError: '',
  emailError: '',
  idError: '',
  passError: '',
  rePassError: '',
  setNameValue: (value) => set({ nameValue: value }),
  setEmailValue: (value) => set({ emailValue: value }),
  setIdValue: (value) => set({ idValue: value }),
  setPassValue: (value) => set({ passValue: value }),
  setRePassValue: (value) => set({ rePassValue: value }),
  setNameError: (message) => set({ nameError: message }),
  setEmailError: (message) => set({ emailError: message }),
  setIdError: (message) => set({ idError: message }),
  setPassError: (message) => set({ passError: message }),
  setRePassError: (message) => set({ rePassError: message }),
}));

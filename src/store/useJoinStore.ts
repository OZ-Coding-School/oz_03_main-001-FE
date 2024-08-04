/* eslint-disable no-unused-vars */
import { create } from 'zustand';

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
  validateName: () => boolean;
  validateEmail: () => boolean;
  validateId: () => boolean;
  validatePassword: () => boolean;
  validateRePassword: () => boolean;
  resetState: () => void;
};

export const useJoinStore = create<JoinState>((set, get) => ({
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

  validateName: () => {
    const { nameValue, setNameError } = get();
    if (!nameValue) {
      setNameError('이름을 입력해 주세요');
      return false;
    }
    setNameError('');
    return true;
  },

  validateEmail: () => {
    const { emailValue, setEmailError } = get();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailValue)) {
      setEmailError('올바른 이메일 주소를 입력해 주세요');
      return false;
    }
    setEmailError('');
    return true;
  },

  validateId: () => {
    const { idValue, setIdError } = get();
    const idRegex = /^[a-zA-Z][a-zA-Z0-9_-]{4,19}$/;
    if (!/^[a-zA-Z]/.test(idValue)) {
      setIdError('아이디의 첫 글자는 알파벳으로 입력해 주세요');
      return false;
    }
    if (!idRegex.test(idValue)) {
      setIdError(
        '알파벳, 숫자, 밑줄(_), 대시(-), 사용하여 5자 이상 13자 이하로 입력해 주세요'
      );
      return false;
    }
    setIdError('');
    return true;
  },

  validatePassword: () => {
    const { passValue, setPassError } = get();
    const pwRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/;
    if (passValue.length < 8) {
      setPassError('최소 8자 이상 입력해 주세요');
      return false;
    }
    if (!pwRegex.test(passValue)) {
      setPassError(
        '숫자, 소문자, 대문자, 특수문자를 각각 최소 하나 이상 포함하여 입력해 주세요'
      );
      return false;
    }
    setPassError('');
    return true;
  },

  validateRePassword: () => {
    const { passValue, rePassValue, setRePassError } = get();
    if (passValue !== rePassValue) {
      setRePassError('비밀번호가 일치하지 않습니다');
      return false;
    }
    setRePassError('');
    return true;
  },

  resetState: () =>
    set({
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
    }),
}));

import { create } from 'zustand';

type Store = {
  isAllergyChecked: boolean;
  selectedCategory: string;
  toggleAllergy: () => void;
  selectCurrentCategory: (current: string) => void;
};

const useOrderStore = create<Store>()((set) => ({
  isAllergyChecked: true,
  selectedCategory: 'recommend',
  toggleAllergy: () =>
    set((state) => ({ isAllergyChecked: !state.isAllergyChecked })),
  selectCurrentCategory: (current) => set({ selectedCategory: current }),
}));

export default useOrderStore;

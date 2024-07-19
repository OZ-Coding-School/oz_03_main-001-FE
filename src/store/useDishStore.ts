import { create } from 'zustand';

type DishData = {
  id: number;
  name: string;
  description: string;
  kcal: string;
  image_url: string;
  price: number;
  category: string;
  detailcategory: string[];
};

type Store = {
  dishList: DishData[];
  setDishList: (dishList: DishData[]) => void;
};

const useDishStore = create<Store>((set) => ({
  dishList: [],
  setDishList: (dishList) => set({ dishList }),
}));

export default useDishStore;

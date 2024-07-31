/* eslint-disable no-unused-vars */
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

type pickedDish = {
  id: number;
  dish: DishData;
};

type Box = {
  id: number;
  name: string;
  pickedDishList: pickedDish[];
  quantity: number;
  boxPrice: number;
};

type Store = {
  isAllergyChecked: boolean;
  currentCategory: string;
  toggleAllergy: () => void;
  setCurrentCategory: (current: string) => void;
  basket: Box[];
  createBox: () => void;
  addToPickedDishList: (boxId: number, dishData: DishData) => void;
  currentBoxId: number;
  setCurrentBoxId: (current: number) => void;
  setBoxName: (boxId: number, name: string) => void;
  removePickedDish: (boxId: number, uniqueId: number) => void;
  removeBox: (boxId: number) => void;
  currentPost: DishData[];
  setCurrentPost: (currentPost: DishData[]) => void;
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  setBoxQuantity: (boxId: number, quantity: number) => void;
};

const useOrderStore = create<Store>()((set) => ({
  isAllergyChecked: true,
  currentCategory: 'recommend',
  toggleAllergy: () =>
    set((state) => ({ isAllergyChecked: !state.isAllergyChecked })),
  setCurrentCategory: (current) => set({ currentCategory: current }),
  basket: [
    { id: 1, name: '도시락', pickedDishList: [], quantity: 1, boxPrice: 0 },
  ],
  createBox: () =>
    set((state) => ({
      basket: [
        ...state.basket,
        {
          id: Date.now(),
          name: '도시락',
          pickedDishList: [],
          quantity: 1,
          boxPrice: 0,
        },
      ],
    })),
  addToPickedDishList: (boxId, dishData) =>
    set((state) => ({
      basket: state.basket.map((box) =>
        box.id === boxId
          ? {
              ...box,
              pickedDishList: [
                ...box.pickedDishList,
                { id: Date.now(), dish: dishData },
              ],
            }
          : box
      ),
    })),
  currentBoxId: 1,
  setCurrentBoxId: (current) => set({ currentBoxId: current }),
  setBoxName: (boxId, name) =>
    set((state) => ({
      basket: state.basket.map((box) =>
        box.id === boxId ? { ...box, name: name } : box
      ),
    })),
  removePickedDish: (boxId, id) =>
    set((state) => ({
      basket: state.basket.map((box) =>
        box.id === boxId
          ? {
              ...box,
              pickedDishList: box.pickedDishList.filter(
                (pickedDish) => pickedDish.id !== id
              ),
            }
          : box
      ),
    })),
  removeBox: (boxId) =>
    set((state) => ({
      basket: state.basket.filter((box) => box.id !== boxId),
    })),
  currentPost: [],
  setCurrentPost: (currentPost) => set({ currentPost }),
  totalPrice: 0,
  setTotalPrice: (totalPrice) => set({ totalPrice }),
  setBoxQuantity: (boxId, quantity) =>
    set((state) => ({
      basket: state.basket.map((box) =>
        box.id === boxId ? { ...box, quantity: quantity } : box
      ),
    })),
}));

export default useOrderStore;

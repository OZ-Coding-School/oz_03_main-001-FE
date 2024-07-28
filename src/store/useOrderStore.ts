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
  pickedDishList: pickedDish[];
  boxPrice: number;
};

type Store = {
  isAllergyChecked: boolean;
  currentCategory: string;
  toggleAllergy: () => void;
  setCurrentCategory: (current: string) => void;
  dishList: DishData[];
  setDishList: (dishList: DishData[]) => void;
  basket: Box[];
  createBox: () => void;
  addToPickedDishList: (boxId: number, dishData: DishData) => void;
  currentBoxId: number;
  setCurrentBoxId: (current: number) => void;
  removePickedDish: (boxId: number, uniqueId: number) => void;
  removeBox: (boxId: number) => void;
  currentPost: DishData[];
  setCurrentPost: (currentPost: DishData[]) => void;
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
};

const useOrderStore = create<Store>()((set) => ({
  isAllergyChecked: true,
  currentCategory: 'recommend',
  toggleAllergy: () =>
    set((state) => ({ isAllergyChecked: !state.isAllergyChecked })),
  setCurrentCategory: (current) => set({ currentCategory: current }),
  dishList: [],
  setDishList: (dishList) => set({ dishList }),
  basket: [{ id: 1, pickedDishList: [], boxPrice: 0 }],
  createBox: () =>
    set((state) => ({
      basket: [
        ...state.basket,
        // { id: state.basket.length + 1, pickedDishList: [] },
        { id: Date.now(), pickedDishList: [], boxPrice: 0 },
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
}));

export default useOrderStore;

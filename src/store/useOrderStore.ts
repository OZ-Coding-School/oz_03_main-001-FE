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

type Box = {
  id: number;
  pickedDishList: DishData[];
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
  removePickedDish: (boxId: number, dishId: number) => void;
  removeBox: (boxId: number) => void;
};

const useOrderStore = create<Store>()((set) => ({
  isAllergyChecked: true,
  currentCategory: 'recommend',
  toggleAllergy: () =>
    set((state) => ({ isAllergyChecked: !state.isAllergyChecked })),
  setCurrentCategory: (current) => set({ currentCategory: current }),
  dishList: [],
  setDishList: (dishList) => set({ dishList }),
  basket: [{ id: 1, pickedDishList: [] }],
  createBox: () =>
    set((state) => ({
      basket: [
        ...state.basket,
        { id: state.basket.length + 1, pickedDishList: [] },
      ],
    })),
  addToPickedDishList: (boxId, dishData) =>
    set((state) => ({
      basket: state.basket.map((box) =>
        box.id === boxId
          ? { ...box, pickedDishList: [...box.pickedDishList, dishData] }
          : box
      ),
    })),
  currentBoxId: 1,
  setCurrentBoxId: (current) => set({ currentBoxId: current }),
  removePickedDish: (boxId, dishId) =>
    set((state) => ({
      basket: state.basket.map((box) =>
        box.id === boxId
          ? {
              ...box,
              pickedDishList: box.pickedDishList.filter(
                (dish) => dish.id !== dishId
              ),
            }
          : box
      ),
    })),
  removeBox: (boxId) =>
    set((state) => ({
      basket: state.basket.filter((box) => box.id !== boxId),
    })),
}));

export default useOrderStore;

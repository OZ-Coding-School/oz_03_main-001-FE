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
  quantity: number;
  dish: DishData;
  pickedPrice: number;
};

type Box = {
  id: number;
  name: string;
  pickedDishList: pickedDish[];
  quantity: number;
  boxPrice: number;
};

type Store = {
  currentCategory: string;
  setCurrentCategory: (current: string) => void;
  basket: Box[];
  createBox: (boxId: number, name?: string, price?: number) => void;
  addToPickedDishList: (boxId: number, dishData: DishData) => void;
  currentBoxId: number;
  setCurrentBoxId: (current: number) => void;
  setBoxName: (boxId: number, name: string) => void;
  removePickedDish: (boxId: number, uniqueId: number) => void;
  removeBox: (boxId: number) => void;
  currentPost: DishData[];
  setCurrentPost: (currentPost: DishData[]) => void;
  currentLunchPost: [];
  setCurrentLunchPost: (currentLunchPost: []) => void;
  totalPrice: number;
  setTotalPrice: (totalPrice: number) => void;
  setBoxQuantity: (boxId: number, quantity: number) => void;
  setDishQuantity: (boxId: number, dishId: number, quantity: number) => void;
};

const useOrderStore = create<Store>()((set) => ({
  currentCategory: 'recommend',
  setCurrentCategory: (current) => set({ currentCategory: current }),
  basket: [
    { id: 1, name: '도시락', pickedDishList: [], quantity: 1, boxPrice: 0 },
  ],
  createBox: (boxId, name = '도시락', price = 0) =>
    set((state) => ({
      basket: [
        ...state.basket,
        {
          id: boxId,
          name: name,
          pickedDishList: [],
          quantity: 1,
          boxPrice: price,
        },
      ],
    })),
  addToPickedDishList: (boxId, dishData) =>
    set((state) => ({
      basket: state.basket.map((box) => {
        if (box.id !== boxId) return box;

        // 'chan'과 'side' 카테고리의 dish 수량 합산
        const chanCategoryQuantity = box.pickedDishList
          .filter((pickedDish) => pickedDish.dish.category === 'chan')
          .reduce((sum, pickedDish) => sum + pickedDish.quantity, 0);

        const sideCategoryQuantity = box.pickedDishList
          .filter((pickedDish) => pickedDish.dish.category === 'side')
          .reduce((sum, pickedDish) => sum + pickedDish.quantity, 0);

        // 선택된 dish가 이미 존재하는 경우
        const updatedPickedDishList = box.pickedDishList.map((pickedDish) => {
          if (pickedDish.dish.id === dishData.id) {
            // 'chan'이나 'side' 카테고리의 경우 수량이 3 미만일 때만 증가
            if (
              pickedDish.dish.category === 'chan' &&
              chanCategoryQuantity < 3
            ) {
              return { ...pickedDish, quantity: pickedDish.quantity + 1 };
            }
            if (
              pickedDish.dish.category === 'side' &&
              sideCategoryQuantity < 3
            ) {
              return { ...pickedDish, quantity: pickedDish.quantity + 1 };
            }
          }
          return pickedDish;
        });

        // 이미 존재하는 dish의 수량 증가가 이루어진 경우
        if (
          box.pickedDishList.some(
            (pickedDish) => pickedDish.dish.id === dishData.id
          )
        ) {
          return {
            ...box,
            pickedDishList: updatedPickedDishList,
          };
        }

        // 새로운 dish 추가 조건: 'chan'과 'side' 각각 수량 3 이하, 'bob'과 'guk'은 중복 추가 불가
        if (
          (dishData.category === 'chan' && chanCategoryQuantity >= 3) ||
          (dishData.category === 'side' && sideCategoryQuantity >= 3) ||
          ((dishData.category === 'bob' || dishData.category === 'guk') &&
            box.pickedDishList.some(
              (pickedDish) => pickedDish.dish.category === dishData.category
            ))
        ) {
          return box;
        }

        // 새로운 dish 추가
        return {
          ...box,
          pickedDishList: [
            ...box.pickedDishList,
            {
              id: Date.now() + box.pickedDishList.length,
              quantity: 1,
              dish: dishData,
              pickedPrice: dishData.price,
            },
          ],
        };
      }),
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
  currentLunchPost: [],
  setCurrentLunchPost: (currentLunchPost) => set({ currentLunchPost }),
  totalPrice: 0,
  setTotalPrice: (totalPrice) => set({ totalPrice }),
  setBoxQuantity: (boxId, quantity) =>
    set((state) => ({
      basket: state.basket.map((box) =>
        box.id === boxId ? { ...box, quantity: quantity } : box
      ),
    })),
  setDishQuantity: (boxId, dishId, quantity) =>
    set((state) => ({
      basket: state.basket.map((box) =>
        box.id === boxId
          ? {
              ...box,
              pickedDishList: box.pickedDishList.map((pickedDish) =>
                pickedDish.id === dishId
                  ? { ...pickedDish, quantity: quantity }
                  : pickedDish
              ),
            }
          : box
      ),
    })),
}));

export default useOrderStore;

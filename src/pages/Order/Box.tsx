import { useState } from 'react';
import { IoChevronDown, IoChevronUp, IoClose } from 'react-icons/io5';
import useOrderStore from '../../store/useOrderStore';

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

type Props = {
  box: Box;
};

const Box: React.FC<Props> = ({ box }) => {
  const [isDroped, setIsDroped] = useState(false);

  const handleMenudropChange = () => {
    setIsDroped(!isDroped);
  };

  const { currentBoxId, setCurrentBoxId, removeBox, removePickedDish } =
    useOrderStore();

  return (
    <button
      className={`flex w-full flex-col rounded-md border border-gray20 p-2 duration-75 hover:shadow-md ${currentBoxId === box.id ? '' : 'bg-border'}`}
      onClick={() => setCurrentBoxId(box.id)}
    >
      <div className='mb-2 flex w-full justify-between border border-x-0 border-t-0 border-dashed border-gray30 pb-2'>
        <button onClick={handleMenudropChange} className='flex items-center'>
          {isDroped ? <IoChevronDown /> : <IoChevronUp />}
          <p className='mx-2'>도시락</p>
        </button>
        <IoClose onClick={() => removeBox(box.id)} />
      </div>
      <ul
        className={`mb-2 w-full border border-x-0 border-t-0 border-dashed pb-2 text-gray30 ${isDroped ? '' : 'hidden'}`}
      >
        {box.pickedDishList.map((pickedDish) => (
          <li key={pickedDish.id} className='flex justify-between'>
            <span>{pickedDish.dish.name}</span>
            <span className='flex items-center'>
              {pickedDish.dish.price.toLocaleString()}
              <IoClose
                className='ml-2'
                onClick={() => removePickedDish(box.id, pickedDish.id)}
              />
            </span>
          </li>
        ))}
      </ul>
      <div className='flex w-full justify-end'>
        <span className='mr-0.5 font-medium'>
          {(box.boxPrice = box.pickedDishList.reduce(
            (sum, pickedDish) => sum + pickedDish.dish.price,
            0
          )).toLocaleString()}
        </span>
        원
      </div>
    </button>
  );
};

export default Box;

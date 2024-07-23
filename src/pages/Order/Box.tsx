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

type Box = {
  id: number;
  pickedDishList: DishData[];
};

const Box = () => {
  const [isDroped, setIsDroped] = useState(false);

  const handleMenudropChange = () => {
    setIsDroped(!isDroped);
  };

  const { currentBoxId, removeBox, removePickedDish } = useOrderStore();

  return (
    <div className='flex flex-col rounded-md border border-gray20 p-2'>
      <div className='mb-2 flex justify-between border border-x-0 border-t-0 border-dashed border-gray30 pb-2'>
        <button onClick={handleMenudropChange} className='flex items-center'>
          {isDroped ? <IoChevronDown /> : <IoChevronUp />}
          <p className='mx-2'>도시락{}</p>
        </button>
        <IoClose className='cursor-pointer' onClick={() => removeBox(key)} />
      </div>
      <ul
        className={`mb-2 border border-x-0 border-t-0 border-dashed pb-2 text-gray30 ${isDroped ? '' : 'hidden'}`}
      >
        <li className='flex justify-between'>
          <span>qqq</span>
          <span className='flex items-center'>
            1,000 <IoClose className='ml-2 cursor-pointer' />
          </span>
        </li>
      </ul>
      <div className='flex justify-end'>
        <span className='mr-0.5 font-medium'>10,000</span>원
      </div>
    </div>
  );
};

export default Box;

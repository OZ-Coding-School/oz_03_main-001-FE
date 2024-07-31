import { IoChevronDown, IoChevronUp, IoClose } from 'react-icons/io5';
import { LuPencilLine, LuCheck } from 'react-icons/lu';
import useOrderStore from '../../store/useOrderStore';
import { useEffect, useState } from 'react';

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

type Props = {
  box: Box;
};

const Box: React.FC<Props> = ({ box }) => {
  const {
    currentBoxId,
    setCurrentBoxId,
    removeBox,
    removePickedDish,
    setBoxName,
    setBoxQuantity,
  } = useOrderStore();

  const [isEditName, setIsEditName] = useState(false);

  const handleIsEditName = () => {
    setIsEditName(!isEditName);
  };

  useEffect(() => {
    if (currentBoxId !== box.id) {
      setIsEditName(false);
    }
  }, [currentBoxId, setIsEditName, box]);

  return (
    <button
      className={`flex w-full flex-col rounded-md border border-gray20 p-2 duration-75 hover:shadow-md ${currentBoxId === box.id ? '' : 'bg-border'}`}
      onClick={() => setCurrentBoxId(box.id)}
    >
      <div className='mb-2 flex w-full items-center justify-between border border-x-0 border-t-0 border-dashed border-gray30 pb-2'>
        {currentBoxId === box.id ? (
          <>
            <IoChevronUp />
            {isEditName ? (
              <input
                value={box.name}
                onChange={(e) => setBoxName(currentBoxId, e.target.value)}
                type='text'
                className='w-3/5 rounded border border-b-gray20 px-1'
              ></input>
            ) : (
              <p className='w-3/5 rounded px-1 text-start'>{box.name}</p>
            )}
          </>
        ) : (
          <>
            <IoChevronDown />
            <p className='w-3/5 rounded px-1 text-start'>{box.name}</p>
          </>
        )}
        {isEditName ? (
          <LuCheck onClick={handleIsEditName} />
        ) : (
          <LuPencilLine onClick={handleIsEditName} />
        )}
        <IoClose onClick={() => removeBox(box.id)} />
      </div>
      <ul
        className={`mb-2 w-full border border-x-0 border-t-0 border-dashed pb-2 text-gray30 ${currentBoxId === box.id ? '' : 'hidden'}`}
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
      <div className='flex w-full justify-between'>
        <p>
          <span>수량 : </span>
          <input
            type='number'
            value={box.quantity}
            onChange={(e) =>
              setBoxQuantity(currentBoxId, Number(e.target.value))
            }
            min={1}
            max={99}
            className='border-bg-gray20 rounded text-center focus:border'
          />
        </p>
        <p>
          <span className='mr-0.5 font-medium'>
            {(box.boxPrice =
              box.quantity *
              box.pickedDishList.reduce(
                (sum, pickedDish) => sum + pickedDish.dish.price,
                0
              )).toLocaleString()}
          </span>
          원
        </p>
      </div>
    </button>
  );
};

export default Box;

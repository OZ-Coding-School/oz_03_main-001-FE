import useOrderStore from '../../store/useOrderStore';

// type DishData = {
//   id: number;
//   name: string;
//   description: string;
//   kcal: string;
//   image_url: string;
//   price: number;
//   category: string;
//   detailcategory: string[];
// };

type Lunch = {
  name: string;
  description: string;
  total_price: number;
  image_url: string;
  DishList: [];
  quantity: number;
};

type Props = {
  lunch: Lunch;
};

const Lunch: React.FC<Props> = ({ lunch }) => {
  const { createBox } = useOrderStore();

  const handleOnClickLunch = () => {
    createBox;
  };

  return (
    <button
      className='flex h-[30vh] w-full flex-col justify-between rounded-xl bg-white p-[1.5vh] shadow-md duration-100 hover:-m-2 hover:shadow-2xl'
      //   onClick={() => addToPickedDishList(currentBoxId, dish)}
    >
      <p className='text-nowrap'>{lunch.name}</p>
      <img
        src={lunch.image_url}
        alt={lunch.name}
        className='h-[20vh] w-[100vh] bg-gray20'
      />
      <div>
        <span className='mr-0.5 text-xl'>{lunch.total_price}</span>
        <span>원</span>
      </div>
    </button>
  );
};

export default Lunch;

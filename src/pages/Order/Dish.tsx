import useOrderStore from '../../store/useOrderStore';

type Dish = {
  id: number;
  name: string;
  description: string;
  kcal: string;
  image_url: string;
  price: number;
  category: string;
  detailcategory: string[];
};

type Props = {
  dish: Dish;
};

const Dish: React.FC<Props> = ({ dish }) => {
  const { currentBoxId, addToPickedDishList } = useOrderStore();

  return (
    <button
      className='flex h-[30vh] w-full flex-col justify-evenly rounded-xl bg-white p-[1.5vh] shadow-md duration-100 hover:-m-2 hover:shadow-2xl'
      onClick={() => addToPickedDishList(currentBoxId, dish)}
    >
      <p>{dish.name}</p>
      <img
        src={dish.image_url}
        alt={dish.name}
        className='h-[20vh] w-[100vh] bg-gray20'
      />
      <div>
        <span className='mr-0.5 text-xl'>{dish.price.toLocaleString()}</span>
        <span>원</span>
      </div>
    </button>
  );
};

export default Dish;

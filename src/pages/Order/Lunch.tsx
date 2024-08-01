import useOrderStore from '../../store/useOrderStore';

type menu = {
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
  menu: menu;
  pickedPrice: number;
};

type Lunch = {
  id: number;
  name: string;
  description: string;
  total_price: number;
  image_url: string;
  lunch_menu: pickedDish[];
  quantity: number;
};

type Props = {
  lunch: Lunch;
};

const Lunch: React.FC<Props> = ({ lunch }) => {
  const { createBox, setCurrentBoxId, addToPickedDishList } = useOrderStore();

  const handleOnClickLunch = (boxId: number, lunch: Lunch) => {
    createBox(boxId, lunch.name, lunch.total_price);
    setCurrentBoxId(boxId);
    lunch.lunch_menu.map((pickedDish) =>
      addToPickedDishList(boxId, pickedDish.menu)
    );
  };

  return (
    <button
      className='flex h-[30vh] w-full flex-col justify-between rounded-xl bg-white p-[1.5vh] shadow-md duration-100 hover:-m-2 hover:shadow-2xl'
      onClick={() => handleOnClickLunch(Date.now(), lunch)}
    >
      <p className='w-full truncate text-start'>{lunch.name}</p>
      <img
        src={lunch.image_url}
        alt={lunch.name}
        className='h-[19vh] w-[100vh] bg-gray20'
      />
      <div>
        <span className='mr-0.5 text-xl'>{lunch.total_price}</span>
        <span>원</span>
      </div>
    </button>
  );
};

export default Lunch;

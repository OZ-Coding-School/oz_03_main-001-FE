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

const Dish: React.FC<Props> = ({
  dish: {
    name,
    // description,
    // kcal,
    // image_url,
    price,
    // category,
    // detailcategory,
  },
}) => {
  return (
    <button
      className='flex cursor-pointer flex-col justify-evenly rounded-xl bg-white p-4 shadow-md'
      //   onClick={}
    >
      <p>{name}</p>
      <div
        // src={image_url}
        // alt={name}
        className='h-2/3 w-full bg-gray20 shadow-inner'
      />
      <div>
        <span className='mr-0.5 text-xl'>{price}</span>
        <span>원</span>
      </div>
    </button>
  );
};

export default Dish;

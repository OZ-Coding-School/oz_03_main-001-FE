type OrderListProps = {
  name: string;
  details: string;
  price: number;
};

const OrderList = ({ name, details, price }: OrderListProps) => {
  return (
    <div className='flex w-[100%] flex-col justify-center rounded-lg border border-border px-[25px] py-[20px]'>
      <p className='text-lg font-medium text-main'>{name}</p>
      <p className='pt-[10px] text-base font-normal text-caption'>{details}</p>
      <p className='text-right'>{price.toLocaleString()}원</p>
    </div>
  );
};

export default OrderList;

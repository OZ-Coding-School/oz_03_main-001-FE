type OrderListProps = {
  name: string;
  details: string;
  price: number;
  quantity: number;
};

const OrderList = ({ name, details, quantity, price }: OrderListProps) => {
  return (
    <div className='flex w-[100%] flex-col justify-center rounded-lg border border-border px-[25px] py-[20px]'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-medium text-main'>{name}</p>
        <p className='text-sm font-normal text-gray30'>수량 : {quantity}</p>
      </div>
      <p className='py-3 text-base font-normal text-caption'>{details}</p>
      <p className='text-right'>{price.toLocaleString()}원</p>
    </div>
  );
};

export default OrderList;

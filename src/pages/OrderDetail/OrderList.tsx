const OrderList = () => {
  return (
    <div className='flex flex-col justify-center rounded-lg border border-border px-[25px] py-[20px]'>
      <p className='text-lg font-medium text-main'>도시락1</p>
      <p className='pt-[10px] text-base font-normal text-caption'>
        잡곡밥, 미역국, 노드말이, 리액트 장조림, 깃허브 닭갈비
      </p>
      <p className='text-right'>7,300원</p>
    </div>
  );
};

export default OrderList;

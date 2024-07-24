import arrowRight from '../../assets/images/arrowRight_gray.svg';
import OrderList from './OrderList';

const OrderDetail = () => {
  return (
    <div className='flex flex-nowrap justify-between px-[73px] pb-[47px] pt-[13px]'>
      <section className='w-[49%]'>
        <nav className='flex flex-nowrap items-center'>
          <span className='text-sm font-bold text-main'>주문하기</span>
          <img className='px-[11px]' src={arrowRight} alt='' />
          <span className='text-sm font-normal text-caption'>주문완료</span>
        </nav>
        <div className='pb-[25px] pt-[20px] text-[22px] font-semibold text-main'>
          선택한 도시락
        </div>
        <div className='flex h-[680px] w-[100%] flex-col gap-3 overflow-y-auto pr-[15px]'>
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
          <OrderList />
        </div>
      </section>
      <section className='w-[49%]'>
        <div className='pb-[25px] pt-[40px] text-[22px] font-semibold text-main'>
          배송정보 입력
        </div>
        <form className='flex w-[100%] flex-col gap-4 rounded-lg border border-border px-[40px] py-[35px]'>
          <div className='flex w-[100%] flex-wrap justify-between gap-4'>
            <div className='flex w-[350px] flex-wrap items-center'>
              <div className='inline-block w-[95px]'>이름</div>
              <input
                type='text'
                className='h-[47px] rounded-xl border border-border'
                style={{ width: 'calc(100% - 95px)' }}
              ></input>
            </div>
            <div className='flex w-[350px] flex-wrap items-center'>
              <div className='inline-block w-[95px]'>전화 번호</div>
              <input
                type='text'
                className='h-[47px] rounded-xl border border-border'
                style={{ width: 'calc(100% - 95px)' }}
              ></input>
            </div>
          </div>
          <div className='w-[100%]'>
            <div className='inline-block w-[95px]'>배송지</div>
            <input
              type='text'
              placeholder='도로명 주소 또는 지번 주소'
              className='h-[47px] rounded-xl border border-border'
              style={{ width: 'calc(100% - 95px)' }}
            ></input>
          </div>
          <div className='w-[100%]'>
            <div className='inline-block w-[95px]'>상세 주소</div>
            <input
              type='text'
              className='h-[47px] rounded-xl border border-border'
              style={{ width: 'calc(100% - 95px)' }}
            ></input>
          </div>
          <div className='w-[100%]'>
            <div className='float-left inline-block w-[95px]'>배송 메모</div>
            <input
              type='text'
              className='h-[100px] rounded-xl border border-border'
              style={{ width: 'calc(100% - 95px)' }}
            ></input>
          </div>
        </form>
      </section>
    </div>
  );
};

export default OrderDetail;

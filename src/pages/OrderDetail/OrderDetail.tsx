import arrowRight from '../../assets/images/arrowRight_gray.svg';
import OrderList from './OrderList';
import '../../assets/css/customScroll.css';

const OrderDetail = () => {
  return (
    <div
      className='flex w-screen flex-nowrap justify-between px-[73px] pb-[47px] pt-[13px]'
      style={{ height: 'calc(100vh - 75px)' }}
    >
      <section className='w-[49%]'>
        <nav className='flex flex-nowrap items-center'>
          <span className='text-sm font-bold text-main'>주문하기</span>
          <img className='px-[11px]' src={arrowRight} alt='' />
          <span className='text-sm font-normal text-caption'>주문완료</span>
        </nav>
        <div className='pb-[25px] pt-[20px] text-[22px] font-semibold text-main'>
          선택한 도시락
        </div>
        <div
          className='customScroll flex w-[100%] flex-col gap-3 overflow-y-auto pr-[3px]'
          style={{ height: 'calc(100% - 98px)' }}
        >
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
        <div
          className='customScroll flex flex-col justify-between overflow-y-auto pr-[3px]'
          style={{ height: 'calc(100% - 98px)' }}
        >
          <form className='flex w-[100%] flex-col gap-4 rounded-lg border border-border px-[40px] py-[35px]'>
            <div className='flex w-[100%] flex-wrap justify-between gap-4'>
              <div className='flex w-[270px] flex-wrap items-center'>
                <div className='inline-block w-[90px] text-lg font-normal text-main'>
                  이름
                </div>
                <input
                  type='text'
                  className='h-[47px] cursor-none rounded-xl border border-border px-[15px] py-[10px]'
                  style={{ width: 'calc(100% - 95px)' }}
                ></input>
              </div>
              <div className='flex w-[300px] flex-wrap items-center'>
                <div className='inline-block w-[95px] text-lg font-normal text-main'>
                  전화 번호
                </div>
                <input
                  type='text'
                  className='h-[47px] cursor-none rounded-xl border border-border px-[15px] py-[10px]'
                  style={{ width: 'calc(100% - 95px)' }}
                ></input>
              </div>
            </div>
            <div className='w-[100%]'>
              <div className='inline-block w-[95px] text-lg font-normal text-main'>
                배송지
              </div>
              <input
                type='text'
                placeholder='도로명 주소 또는 지번 주소를 입력해주세요.'
                className='h-[47px] cursor-none rounded-xl border border-border px-[15px] py-[10px]'
                style={{ width: 'calc(100% - 95px)' }}
              ></input>
            </div>
            <div className='w-[100%]'>
              <div className='inline-block w-[95px] text-lg font-normal text-main'>
                상세 주소
              </div>
              <input
                type='text'
                placeholder='상세 주소를 입력해 주세요.'
                className='h-[47px] cursor-none rounded-xl border border-border px-[15px] py-[10px]'
                style={{ width: 'calc(100% - 95px)' }}
              ></input>
            </div>
            <div className='w-[100%]'>
              <div className='float-left inline-block w-[95px] text-lg font-normal text-main'>
                배송 메모
              </div>
              <textarea
                placeholder='기사님께 전달해드릴 배송 메모를 입력해 주세요.'
                className='h-[100px] cursor-none rounded-xl border border-border px-[15px] py-[10px] align-top'
                style={{ width: 'calc(100% - 95px)', resize: 'none' }}
              ></textarea>
            </div>
          </form>
          <form>
            <div className='flex items-center justify-between pb-3'>
              <div className='text-[22px] font-semibold text-main'>
                요청사항
              </div>
              <div className='flex items-center justify-center'>
                <input
                  type='checkbox'
                  // eslint-disable-next-line tailwindcss/classnames-order
                  className='checked:bg-checkBox_check h-5 w-5 cursor-none appearance-none rounded-[4px] bg-checkBox bg-contain bg-center bg-no-repeat checked:bg-contain checked:bg-center checked:bg-no-repeat'
                />
                <label
                  htmlFor='no_all'
                  className='pl-2 text-base font-normal text-caption'
                >
                  일회용품도 함께 주세요
                </label>
              </div>
            </div>
            <textarea
              placeholder='도시락 주문시 요청 사항을 입력해 주세요.'
              className='h-[115px] w-[100%] cursor-none rounded-xl border border-border px-[15px] py-[10px]'
              style={{ resize: 'none' }}
            ></textarea>
            <div className='flex items-center justify-between pt-[65px]'>
              <div>
                <p className='text-lg font-normal text-main'>총 결제금액</p>
                <p className='text-3xl font-normal text-main'>39,900원</p>
              </div>
              <button className='h-20 w-[200px] rounded-xl bg-primary text-center text-xl font-medium text-white hover:bg-primary-hover'>
                주문하기
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default OrderDetail;

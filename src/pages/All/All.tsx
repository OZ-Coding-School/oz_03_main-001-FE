import logo from '../../assets/images/dosilockLogo.png';

const All = () => {
  const allList = [
    '우유',
    '메밀',
    '땅콩',
    '대두',
    '밀',
    '호두',
    '복숭아',
    '토마토',
    '고등어',
    '게',
    '새우',
    '오징어',
    '닭고기',
    '쇠고기',
    '돼지고기',
    '난류',
    '홍합',
    '굴',
    '조개',
    '전복',
    '아황산류',
  ];

  return (
    <div className='flex flex-col items-center justify-center gap-12 pt-[114px]'>
      <div>
        <img className='h-[73px] w-[200px]' src={logo} alt='로고' />
      </div>
      <form className='h-[560px] w-[630px] rounded-[28px] border border-border px-[40px] pb-[46px] pt-[40px]'>
        <p className='h-10 text-xl font-medium leading-10 text-main'>
          추가정보 입력
        </p>
        <p className='text-sm font-normal text-caption'>
          회원님의 알레르기 정보를 체크해주세요
        </p>
        <div className='pt-[30px]'>
          <input
            id='no_all'
            name='알레르기 없음'
            type='checkbox'
            className='h-5 w-5'
          />
          <label htmlFor='no_all' className='px-5 text-base font-normal'>
            알레르기 없음
          </label>
        </div>
        <div className='flex flex-wrap gap-[20px] pb-[27px] pt-[35px]'>
          {allList.map((all, index) => {
            return (
              <div
                key={index}
                className='flex w-[120px] items-center justify-start'
              >
                <input
                  id={`yse_${all}`}
                  name={all}
                  type='checkbox'
                  className='h-5 w-5'
                />
                <label
                  htmlFor={`yse_${all}`}
                  className='px-5 text-base font-normal text-main'
                >
                  {all}
                </label>
              </div>
            );
          })}
        </div>
        <button
          className='h-[70px] w-[549px] rounded-xl border border-border bg-primary px-[20px] py-[12px] text-lg font-bold text-white hover:bg-primary-hover'
          type='submit'
        >
          입력 완료 버튼
        </button>
      </form>
    </div>
  );
};

export default All;

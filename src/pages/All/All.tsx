// AllForm.tsx
import logo from '../../assets/images/dosirockLogo.png';
// import { Link } from 'react-router-dom';
import useAllergiesForm from '../../hooks/useAllForm';
import { useState } from 'react';
import ConfirmModal from './Modal/ConfirmModal';

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
    '소고기',
    '돼지고기',
    '난류(가금류)',
    '홍합',
    '굴',
    '조개류',
    '전복',
    '아황산류',
  ];

  const {
    noAll,
    handleCheckAll,
    checkAllList,
    isCheckEmpty,
    postAll,
    errorAll,
  } = useAllergiesForm([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    sessionStorage.removeItem('accessToken');
    // sessionStorage.removeItem('refresh_token');
    // sessionStorage.removeItem('user');
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-12'>
      <div>
        <button onClick={handleImageClick}>
          <img
            className='h-[73px] w-[200px] cursor-none'
            src={logo}
            alt='로고'
          />
        </button>
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
        />
      </div>
      <form className='w-[630px] rounded-[28px] border border-border px-[40px] pb-[46px] pt-[40px]'>
        <p className='h-10 text-xl font-medium leading-10 text-main'>
          추가정보 입력
        </p>
        <p className='text-sm font-normal text-caption'>
          회원님의 알레르기 정보를 체크해주세요
        </p>
        <div className='flex items-center pt-[30px]'>
          <input
            id='no_all'
            name='알레르기 없음'
            type='checkbox'
            className='h-6 w-6 cursor-none appearance-none rounded-[4px] bg-checkBox bg-contain bg-center bg-no-repeat checked:bg-checkBox_check checked:bg-contain checked:bg-center checked:bg-no-repeat'
            checked={noAll}
            onChange={(e) => handleCheckAll(e.target.checked, 'no_all')}
          />
          <label htmlFor='no_all' className='px-5 text-base font-normal'>
            알레르기 없음
          </label>
          {errorAll && (
            <span className='pl-1 text-xs font-medium text-primary-hover'>
              {errorAll}
            </span>
          )}
        </div>
        <div className='flex flex-wrap items-center gap-[20px] pb-[35px] pt-[35px]'>
          {allList.map((all) => (
            <div
              key={all}
              className='flex w-[120px] items-center justify-start'
            >
              <input
                id={all}
                name={all}
                type='checkbox'
                checked={checkAllList[all]}
                disabled={noAll}
                onChange={(e) => handleCheckAll(e.target.checked, e.target.id)} // 체크 여부와 ID 전달
                className='h-6 w-6 cursor-none appearance-none rounded-[4px] bg-checkBox bg-contain bg-center bg-no-repeat checked:bg-checkBox_check checked:bg-contain checked:bg-center checked:bg-no-repeat'
              />
              <label
                htmlFor={all}
                className='pl-[10px] text-base font-normal text-main'
              >
                {all}
              </label>
            </div>
          ))}
        </div>
        <button
          className={`h-[70px] w-[549px] rounded-xl border border-border px-[20px] py-[12px] text-lg font-bold text-white ${
            isCheckEmpty ? 'bg-disabled' : 'bg-primary hover:bg-primary-hover'
          }`}
          type='submit'
          onClick={postAll}
        >
          입력 완료
        </button>
        {/* <Link to='/welcome'>
          <div className='text-center'>
            <button
              onClick={() => localStorage.setItem('All', 'empty')}
              className='cursor-none pt-[25px] text-base font-semibold text-main'
            >
              다음에 입력하기
            </button>
          </div>
        </Link> */}
      </form>
    </div>
  );
};

export default All;

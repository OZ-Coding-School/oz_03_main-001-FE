import { useState } from 'react';
import logo from '../../assets/images/dosirockLogo.png';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal/Modal';

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

  const navigate = useNavigate();

  // 모달 상태 관리
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // '알레르기 없음' 체크 상태 관리
  const [noAll, setNoAll] = useState<boolean>(false);
  // 체크 된 알레르기 목록 관리
  const [checkAllList, setCheckedList] = useState<string[]>([]);

  // 알레르기 미 체크시 메세지 관리
  const [errorAll, setErrorAll] = useState('');

  // 체크 상태 관리 함수 -> 체크상태와 아이디 받아옴
  const handleCheckAll = (checked: boolean, id: string) => {
    if (id === 'no_all') {
      setNoAll(checked);
      setErrorAll('');
      // 알레르기 없음이 체크되었다면 다른 알레르기 체크 상태 초기화
      if (checked) {
        setCheckedList([]);
      }
    } else {
      if (checked) {
        setCheckedList([...checkAllList, id]);
        setErrorAll('');
      } else if (!checked) {
        setCheckedList(checkAllList.filter((all) => all !== id));
      }
    }
  };

  // 체크된 알레르기가 하나도 없다는 불린 값
  const isCheckEmpty = checkAllList.length === 0 && !noAll;

  // 버튼 클릭 시 서버에 전송
  const postAll = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isCheckEmpty) {
      setErrorAll('* 알레르기가 없을 시 없음을 체크해주세요');
      return false;
    }
    // 알레르기 체크 상태에 따라 전송 배열 바꾸기
    const postData = noAll ? [] : checkAllList;

    try {
      const response = await axios.post(
        'http://api.dosirock.store/v1/users/allergies',
        {
          allergies: postData,
        }
      );
      console.error('서버 요청 성공:', response);
      console.log(postData);
      // 성공 시 페이지 이동
      navigate('/welcome');

      // 실패 시 에러
    } catch (error) {
      console.error('서버 요청 실패:', error);
      console.log(postData);
      setModalOpen(true);
      setModalMessage('서버 문제로 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center gap-12'>
      <Link to='/'>
        <img className='h-[73px] w-[200px] cursor-none' src={logo} alt='로고' />
      </Link>
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
            // eslint-disable-next-line tailwindcss/classnames-order
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
        <div className='flex flex-wrap gap-[20px] pb-[35px] pt-[35px]'>
          {allList.map((all, index) => {
            return (
              <div
                key={index}
                className='flex w-[120px] items-center justify-start'
              >
                <input
                  id={all}
                  name={all}
                  type='checkbox'
                  checked={checkAllList.includes(all)}
                  disabled={noAll}
                  onChange={(e) => {
                    handleCheckAll(e.target.checked, e.target.id);
                  }}
                  // eslint-disable-next-line tailwindcss/classnames-order
                  className='h-6 w-6 cursor-none appearance-none rounded-[4px] bg-checkBox bg-contain bg-center bg-no-repeat checked:bg-checkBox_check checked:bg-contain checked:bg-center checked:bg-no-repeat'
                />
                <label
                  htmlFor={all}
                  className='px-5 text-base font-normal text-main'
                >
                  {all}
                </label>
              </div>
            );
          })}
        </div>
        <div className='relative'>
          <button
            className={`h-[70px] w-[549px] rounded-xl border border-border px-[20px] py-[12px] text-lg font-bold text-white ${
              isCheckEmpty ? 'bg-disabled' : 'bg-primary hover:bg-primary-hover'
            }`}
            type='submit'
            onClick={postAll}
          >
            입력 완료
          </button>
          <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
            {modalMessage}
          </Modal>
        </div>
      </form>
    </div>
  );
};

export default All;

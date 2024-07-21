import { useState } from 'react';
import logo from '../../assets/images/dosilockLogo.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

  // '알레르기 없음' 체크 상태 관리
  const [noAll, setNoAll] = useState<boolean>(false);
  // 체크 된 알레르기 목록 관리
  const [checkAllList, setCheckedList] = useState<string[]>([]);

  // 체크 상태 관리 함수 -> 체크상태와 아이디 받아옴
  const handleCheckAll = (checked: boolean, id: string) => {
    if (id === 'no_all') {
      setNoAll(checked);
      // 알레르기 없음이 체크되었다면 다른 알레르기 체크 상태 초기화
      if (checked) {
        setCheckedList([]);
      }
    } else {
      if (checked) {
        setCheckedList([...checkAllList, id]);
      } else if (!checked) {
        setCheckedList(checkAllList.filter((all) => all !== id));
      }
    }
  };

  // 버튼 클릭 시 서버에 전송
  const postAll = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // 알레르기 체크 상태에 따라 전송 배열 바꾸기
    const postData = noAll ? [] : checkAllList;

    try {
      const response = await axios.post('/api/v1/users/allergies', {
        allergies: postData,
      });
      console.error('서버 요청 성공:', response);
      console.log(postData);
      // 성공 시 페이지 이동
      navigate('/welcome');

      // 실패 시 에러
    } catch (error) {
      console.error('서버 요청 실패:', error);

      console.log(postData);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center gap-12 pt-[114px]'>
      <div>
        <img className='h-[73px] w-[200px]' src={logo} alt='로고' />
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
            // eslint-disable-next-line tailwindcss/classnames-order
            className='checked:bg-checkBox h-6 w-6 appearance-none rounded-[4px] checked:bg-contain checked:bg-center checked:bg-no-repeat'
            style={{ border: '1px solid #D9D9D9' }}
            checked={noAll}
            onChange={(e) => handleCheckAll(e.target.checked, 'no_all')}
          />
          <label htmlFor='no_all' className='px-5 text-base font-normal'>
            알레르기 없음
          </label>
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
                  className='checked:bg-checkBox h-6 w-6 appearance-none rounded-[4px] checked:bg-contain checked:bg-center checked:bg-no-repeat'
                  style={{ border: '1px solid #D9D9D9' }}
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
        <button
          className='h-[70px] w-[549px] rounded-xl border border-border bg-primary px-[20px] py-[12px] text-lg font-bold text-white hover:bg-primary-hover'
          type='submit'
          onClick={postAll}
        >
          입력 완료
        </button>
      </form>
    </div>
  );
};

export default All;

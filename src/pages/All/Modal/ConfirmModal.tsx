/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import { toast } from 'react-toastify';
import { FcHighPriority } from 'react-icons/fc';

type ConfirmModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  // 모달 외부 클릭 시 닫히도록 처리
  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = async () => {
    // const accessToken = sessionStorage.getItem('accessToken');
    try {
      // // 서버에 DELETE 요청 보내기
      // await axios.delete(
      //   `https://api.dosirock.store/v1/users`,
      //   // { credential: 'include' }
      //   // { withCredentials: true }
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //     },
      //   }
      // );

      sessionStorage.removeItem('accessToken');

      // 사용자 데이터 삭제 성공 후 페이지 이동
      onConfirm();
      navigate('/');
    } catch (error) {
      console.error('서버 요청 실패:', error);
      toast.error('서버 문제로 잠시 후 다시 시도해 주세요 !', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { width: '330px', background: '#FFF4B8', color: 'black' },
      });
    }
  };

  return ReactDOM.createPortal(
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-gray30 bg-opacity-40'
      onClick={handleBackgroundClick}
    >
      <div
        className='w-[420px] rounded-lg bg-white px-[35px] py-6 shadow-lg'
        onClick={(e) => e.stopPropagation()} // 모달 내용 클릭 시 이벤트 전파 방지
      >
        <div className='flex items-center pb-4'>
          <FcHighPriority style={{ width: '20px', height: '20px' }} />
          <h2 className='text-black pl-2 text-lg font-bold'>
            회원가입 진행중입니다.
          </h2>
        </div>
        <p className='pb-4'>이전 정보를 잃어버리고 홈으로 이동하시겠습니까?</p>
        <div className='flex items-center justify-between pt-[15px]'>
          <button
            className='w-[130px] rounded-lg bg-[#FCA5A5] bg-opacity-40 py-3 text-lg text-main hover:bg-[#F87171] hover:text-xl hover:font-bold'
            onClick={handleConfirm}
          >
            네
          </button>
          <button
            className='w-[130px] rounded-lg bg-[#BFDBFE] bg-opacity-40 py-3 text-lg text-main hover:bg-[#60A5FA] hover:text-xl hover:font-bold'
            onClick={onClose}
          >
            아니오
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmModal;

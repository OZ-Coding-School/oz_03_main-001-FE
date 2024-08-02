/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
// useAllergiesForm.ts
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const useAllergiesForm = (_initialState: string[]) => {
  const navigate = useNavigate();

  const [noAll, setNoAll] = useState<boolean>(false);
  const [checkAllList, setCheckedList] = useState<Record<string, boolean>>({});
  const [errorAll, setErrorAll] = useState('');

  const handleCheckAll = (checked: boolean, id: string) => {
    if (id === 'no_all') {
      setNoAll(checked);
      setErrorAll('');
      if (checked) setCheckedList({});
    } else {
      setCheckedList((prevList) => ({
        ...prevList,
        [id]: checked,
      }));
      setErrorAll('');
    }
  };

  const isCheckEmpty = checkAllList === null && !noAll;

  const postAll = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (isCheckEmpty) {
      toast.error('알레르기 정보를 입력해 주세요 !', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: { background: '#FFF4B8', color: 'black' },
      });
      setErrorAll('* 알레르기가 없을 시 없음을 체크해주세요');
      return;
    }

    const postData = noAll ? {} : checkAllList;

    try {
      const accessToken = sessionStorage.getItem('access_token');
      console.log(accessToken);

      const response = await axios.post(
        'https://api.dosirock.store/v1/users/allergies/',
        { allergies: postData },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      console.log('서버 요청 성공:', response);
      navigate('/welcome');
    } catch (error) {
      console.error('서버 요청 실패:', error);
      console.log(postData);
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

  return {
    noAll,
    setNoAll,
    checkAllList,
    setCheckedList,
    errorAll,
    handleCheckAll,
    isCheckEmpty,
    postAll,
  };
};

export default useAllergiesForm;

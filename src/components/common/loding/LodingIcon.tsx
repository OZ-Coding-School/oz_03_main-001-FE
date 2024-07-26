import { useEffect, useState } from 'react';
import munuhIcon from '../../../assets/images/munuh-profile.png';
import koriIcon from '../../../assets/images/kori-profile.png';
import tigimIcon from '../../../assets/images/tigim-profile.png';
import './lodingSpin.css';

const icons = [munuhIcon, koriIcon, tigimIcon];

const LoadingIcon = () => {
  const [currentIcon, setCurrentIcon] = useState(icons[0]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIcon((prevIcon) => {
        const currentIndex = icons.indexOf(prevIcon);
        const nextIndex = (currentIndex + 1) % icons.length;
        return icons[nextIndex];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <img
      src={currentIcon}
      alt='Loading icon'
      className='animate-logoSpin h-10 w-10'
    />
  );
};

export default LoadingIcon;

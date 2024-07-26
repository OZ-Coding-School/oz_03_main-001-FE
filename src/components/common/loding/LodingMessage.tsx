type Props = {
  message: string;
};

const LoadingMessage: React.FC<Props> = ({ message }) => (
  <div className='animate-pulse pl-2 text-[18px] font-semibold text-main'>
    {message}
  </div>
);

export default LoadingMessage;

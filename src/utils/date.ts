// 현재 날짜를 YYYY.MM.DD 형식으로 반환하는 함수

export const getCurrentDate = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

// 폼 데이터 타입 정의
export type FormData = {
  name: string;
  contact_number: string;
  address: string;
  detail_address: string;
  delivery_memo?: string;
  is_disposable?: boolean;
  cooking_memo?: string;
  total_price: number;
};

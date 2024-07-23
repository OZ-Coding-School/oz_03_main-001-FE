// 로그인 요청 데이터 인터페이스
export interface LoginRequest {
  user_id: string;
  password: string;
}

// 로그인 응답 데이터 인터페이스
export interface LoginResponse {
  token: string;
  user_id: string;
  password: string;
}

export interface UserDataResponse {
  account_id: string;
  address: string;
  city: string;
  email: string;
  name: string;
  role_name: string;
}
export interface LoginResponseProps {
  user: UserDataResponse;
  tokens: TokensResponse;
}

interface TokensResponse {
  access: TokenProps;
  refresh: TokenProps;
}

interface TokenProps {
  expires: Date;
  token: string;
}

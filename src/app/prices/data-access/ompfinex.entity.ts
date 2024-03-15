export interface OmpfinexDataResponse<T> {
  status: string;
  data: T;
}
export interface OmpfinexCurrency {
  id: string;
  name: string;
  icon_path: string;
  networks: OmpfinexNetworkCurrency[],
  decimal_precision: number,
  color: string;
  category: {
    slug: null
  }
}
export interface OmpfinexNetworkCurrency {
  network: string;
  withdraw_enabled: boolean,
  deposit_enabled: boolean,
  withdraw_fee: string;
  minimum_withdraw_amount: string;
}

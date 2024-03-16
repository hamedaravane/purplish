import { KucoinWebsocketMarketSnapshotData } from '@prices/data-access/entity/kucoin.entity';

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

export interface ompfinexWebsocketMessage {
  id?: number;
  connect?: {
    client: string;
    ping: 6;
    pong: boolean;
    version: string;
  };
  subscribe?: {};
  push?: {
    channel: 'public-market:r-price-ag';
    pub: {
      data: {
        data: ompfinexMarketData[];
      };
      offset: number;
    }
  };
  history?: {
    epoch: string;
    offset: number;
    publications: []
  }
}

export interface ompfinexMarketData {
  price: string;
  t: number;
  v: string;
  m: number;
}

export interface ompfinexHistoryPublication {
  data: ompfinexPublicationData[];
  offset: number;
}

export interface ompfinexPublicationData {
  a: string;
  p: string;
  t: 'buy' | 'sell';
}

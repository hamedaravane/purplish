export interface OmpfinexDataResponse<T> {
  status: string;
  data: T;
}

/**
 * @deprecated
 * We do not need this model anymore. use market model, instead.
 * @author Hamed
 */
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

/**
 * this interface only use in currency interface. and we do not need it.
 */
export interface OmpfinexNetworkCurrency {
  network: string;
  withdraw_enabled: boolean,
  deposit_enabled: boolean,
  withdraw_fee: string;
  minimum_withdraw_amount: string;
}

interface OmpfinexMarketCurrency {
  id: string;
  icon_path: string;
  name: string;
}

export interface OmpfinexMarketDto {
  id: number;
  base_currency: OmpfinexMarketCurrency;
  quote_currency: OmpfinexMarketCurrency;
  name: string;
  min_price: number;
  max_price: number;
  last_price: number;
  day_change_percent: number;
  tradingview_symbol: string;
  liked_by_user: boolean;
}

export interface OmpfinexMarket {
  id: number;
  baseCurrency: {
    id: string;
    iconPath: string;
    name: string;
  };
  quoteCurrency: {
    id: string;
    iconPath: string;
    name: string;
  };
  name: string;
}

export function convertToOmpfinexMarketDomain(data: OmpfinexMarketDto[]): OmpfinexMarket[] {
  return data.map((market) => {
    return {
      id: market.id,
      baseCurrency: {
        id: market.base_currency.id,
        iconPath: market.base_currency.icon_path,
        name: market.base_currency.name,
      },
      quoteCurrency: {
        id: market.quote_currency.id,
        iconPath: market.quote_currency.icon_path,
        name: market.quote_currency.name,
      },
      name: market.name,
    }
  })
}

export interface OmpfinexMarketWebsocketDto {
  price: string,
  v: string,
  t: number,
  m: number
}

export interface OmpfinexMarketWebsocket {
  id: number;
  currencyId: string;
  currencyName: string;
  iconPath: string;
  name: string;
  timestamp: number;
  volume: string;
  price: string;
}

export function convertOmpfinexMarketWebsocket(
  websocketDto: OmpfinexMarketWebsocketDto[],
  markets: OmpfinexMarket[]
): OmpfinexMarketWebsocket[] {
  const wsDtoMap = new Map(websocketDto.map(item => [item.m, item]));
  return markets.filter(market => market.quoteCurrency.id === 'USDT')
    .map(market => {
      const wsItem = wsDtoMap.get(market.id);
      return wsItem ? {
        id: market.id,
        currencyId: market.baseCurrency.id,
        currencyName: market.baseCurrency.name,
        iconPath: market.baseCurrency.iconPath,
        name: market.name,
        timestamp: wsItem.t,
        volume: wsItem.v,
        price: wsItem.price
      } : null;
    })
    .filter(item => item !== null) as OmpfinexMarketWebsocket[];
}

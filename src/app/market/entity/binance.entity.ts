export interface BinanceSocket{
  data: BinanceStreamDataDto,
  stream: string
}

export interface BinanceStreamDataDto {
  e: string;  // Event type
  E: number;  // Event time
  s: string;  // Symbol
  t: number;  // Trade ID
  p: string;  // Price
  q: string;  // Quantity
  b: number;  // Buyer order ID
  a: number;  // Seller order ID
  T: number;  // Trade time
  m: boolean; // Is the buyer the market maker?
  M: boolean; // Ignore
}

export interface BinanceStreamData {
  eventType: string;  // Event type
  eventTime: number;  // Event time
  symbol: string;  // Symbol
  tradeId: number;  // Trade ID
  price: string;  // Price
  quantity: string;  // Quantity
  buyerOrderId: number;  // Buyer order ID
  sellerOrderID: number;  // Seller order ID
  tradeTime: number;  // Trade time
  marketMaker: boolean; // Is the buyer the market maker?
  ignore: boolean; // Ignore
}

export function convertToBinanceDto(messages: BinanceSocket): BinanceStreamData{
  return {
    buyerOrderId: messages.data.b,
    eventTime: messages.data.E,
    eventType: messages.data.e,
    symbol: messages.data.s,
    ignore: messages.data.M,
    marketMaker: messages.data.m,
    price: messages.data.p,
    quantity: messages.data.q,
    sellerOrderID: messages.data.a,
    tradeId: messages.data.t,
    tradeTime: messages.data.T
  }
}


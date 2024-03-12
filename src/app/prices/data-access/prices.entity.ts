export interface KucoinPublicBulletResponse {
  code: string;
  data: KucoinPublicTokenData;
}

export interface KucoinPublicTokenData {
  token: string;
  instanceServers: KucoinInstanceServer[];
}

export interface KucoinInstanceServer {
  endpoint: string,
  encrypt: boolean,
  protocol: string,
  pingInterval: number,
  pingTimeout: number
}

export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

export interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
}

export interface ITxData {
  from: string;
  to: string;
  nonce: string;
  gasPrice: string;
  gasLimit: string;
  value: string;
  data: string;
}

export interface IBlockScoutTx {
  value: string;
  txreceipt_status: string;
  transactionIndex: string;
  to: string;
  timeStamp: string;
  nonce: string;
  isError: string;
  input: string;
  hash: string;
  gasUsed: string;
  gasPrice: string;
  gas: string;
  from: string;
  cumulativeGasUsed: string;
  contractAddress: string;
  confirmations: string;
  blockNumber: string;
  blockHash: string;
}

export interface IBlockScoutTokenTx {
  value: string;
  transactionIndex: string;
  tokenSymbol: string;
  tokenName: string;
  tokenDecimal: string;
  to: string;
  timeStamp: string;
  nonce: string;
  input: string;
  hash: string;
  gasUsed: string;
  gasPrice: string;
  gas: string;
  from: string;
  cumulativeGasUsed: string;
  contractAddress: string;
  confirmations: string;
  blockNumber: string;
  blockHash: string;
}

export interface IParsedTx {
  timestamp: string;
  hash: string;
  from: string;
  to: string;
  nonce: string;
  gasPrice: string;
  gasUsed: string;
  fee: string;
  value: string;
  input: string;
  error: boolean;
  asset: IAssetData;
  operations: ITxOperation[];
}

export interface ITxOperation {
  asset: IAssetData;
  value: string;
  from: string;
  to: string;
  functionName: string;
}

export interface IGasPricesResponse {
  fastWait: number;
  avgWait: number;
  blockNum: number;
  fast: number;
  fastest: number;
  fastestWait: number;
  safeLow: number;
  safeLowWait: number;
  speed: number;
  block_time: number;
  average: number;
}

export interface IGasPrice {
  time: number;
  price: number;
}

export interface IGasPrices {
  timestamp: number;
  slow: IGasPrice;
  average: IGasPrice;
  fast: IGasPrice;
}

export interface IMethodArgument {
  type: string;
}

export interface IMethod {
  signature: string;
  name: string;
  args: IMethodArgument[];
}

export interface IBoxImage {
  "@type": string;
  contentUrl: {
    [label: string]: string;
  };
}

export interface IBoxProfile {
  memberSince: string;
  coverPhoto: IBoxImage[];
  location: string;
  emoji: string;
  job: string;
  employer: string;
  website: string;
  description: string;
  ethereum_proof: {
    consent_msg: string;
    consent_signature: string;
    linked_did: string;
  };
  proof_did: string;
  github: string;
  image: IBoxImage[];
  name: string;
}

export interface Config {
  dbCollection: string;
  dbName: string;
  dburl: string;
  privateKey: string;
  bot: boolean;
  apiPort: number;
  reboot: boolean;
  newETF: boolean;
  discordToken: string;
  exposureAddress: string;
  exposureFactoryAddress: string;
  routerAddress: string;
  USDCAddress: string;
  APIURL: string;
  discordNotifications: boolean;
  accounts: TradingAccounts[];
  WAVAX: WAVAX;
  tokens: Tokens[];
  cqtKey: string
  baskets: {[key: string]: any}
}
export interface Bias {
  buy: number;
  sell: number;
}
export interface TradingAccounts {
  publicKey: string;
  privateKey: string;
}
export interface WAVAX {
  name: string;
  token: string;
  quote: string;
  pairAddress: string;
  tokenAddress: string;
  quoteAddress: string;
}
export interface Status {
  epoch: boolean;
}
export interface Tokens {
  name: string;
  token: string;
  quote: string;
  pairAddress: string;
  tokenAddress: string;
  quoteAddress: string;
}
export interface ExposureToTrade {
  name: string
  amountToTrade: number
  toTradeUSD: number
  currentPrice: number
  estimatedNewPrice: number
}

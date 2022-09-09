import {sleep} from "./util";
import {ExposureToTrade} from "./types";
import exp from "constants";

const PairABI = require("../constants/abi/pair.json")
const ERC20ABI = require("../constants/abi/erc20.json")
const RouterABI = require("../constants/abi/router.json");
const ExposureABI = require("../constants/abi/exposure.json")

const config: any = {
    "WAVAX": {
        "name": "WAVAX/USDC",
        "token": "WAVAX",
        "quote": "USDC",
        "pairAddress": "0xf4003F4efBE8691B60249E6afbD307aBE7758adb",
        "tokenAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7",
        "quoteAddress": "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E"
    },
    "baskets": {
        "0x452cfC754A3889aaBD43Ec575bE62467859434B7": {
            "tokenAddress": "0x452cfC754A3889aaBD43Ec575bE62467859434B7",
            "joeAddress": "https://traderjoexyz.com/trade?inputCurrency=AVAX&outputCurrency=0x452cfC754A3889aaBD43Ec575bE62467859434B7#/",
            "name": "XPSR Alpha 10",
            "symbol": "XPSRA10",
            "tokens": [
                {
                    "name": "JoeToken/WAVAX",
                    "token": "JoeToken",
                    "quote": "WAVAX",
                    "pairAddress": "0x454E67025631C065d3cFAD6d71E6892f74487a15",
                    "tokenAddress": "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                },
                {
                    "name": "Yeti Finance/WAVAX",
                    "token": "Yeti Finance",
                    "quote": "WAVAX",
                    "pairAddress": "0xbdc7EF37283BC67D50886c4afb64877E3e83f869",
                    "tokenAddress": "0x77777777777d4554c39223C354A05825b2E8Faa3",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                },
                {
                    "name": "Platypus/WAVAX",
                    "token": "Platypus",
                    "quote": "WAVAX",
                    "pairAddress": "0xCDFD91eEa657cc2701117fe9711C9a4F61FEED23",
                    "tokenAddress": "0x22d4002028f537599bE9f666d1c4Fa138522f9c8",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                },
                {
                    "name": "Echidna Token/WAVAX",
                    "token": "Echidna Token",
                    "quote": "WAVAX",
                    "pairAddress": "0x218e6A0AD170460F93eA784FbcC92B57DF13316E",
                    "tokenAddress": "0xeb8343D5284CaEc921F035207ca94DB6BAaaCBcd",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                },
                {
                    "name": "Vector Finance/WAVAX",
                    "token": "Vector Finance",
                    "quote": "WAVAX",
                    "pairAddress": "0x9EF0C12b787F90F59cBBE0b611B82D30CAB92929",
                    "tokenAddress": "0x5817D4F0b62A59b17f75207DA1848C2cE75e7AF4",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                },
                {
                    "name": "Wrapped Ether/WAVAX",
                    "token": "Wrapped Ether",
                    "quote": "WAVAX",
                    "pairAddress": "0xFE15c2695F1F920da45C30AAE47d11dE51007AF9",
                    "tokenAddress": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                },
                {
                    "name": "Magic Internet Money/WAVAX",
                    "token": "Magic Internet Money",
                    "quote": "WAVAX",
                    "pairAddress": "0x781655d802670bbA3c89aeBaaEa59D3182fD755D",
                    "tokenAddress": "0x130966628846BFd36ff31a822705796e8cb8C18D",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                },
                {
                    "name": "GMX/WAVAX",
                    "token": "GMX",
                    "quote": "WAVAX",
                    "pairAddress": "0x0c91a070f862666bBcce281346BE45766d874D98",
                    "tokenAddress": "0x62edc0692BD897D2295872a9FFCac5425011c661",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                },
                {
                    "name": "Staked AVAX/WAVAX",
                    "token": "Staked AVAX",
                    "quote": "WAVAX",
                    "pairAddress": "0x4b946c91C2B1a7d7C40FB3C130CdfBaf8389094d",
                    "tokenAddress": "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
                    "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
                }
            ]
        }
    },
    "tokens": [
        {
            "name": "JoeToken/WAVAX",
            "token": "JoeToken",
            "quote": "WAVAX",
            "pairAddress": "0x454E67025631C065d3cFAD6d71E6892f74487a15",
            "tokenAddress": "0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        },
        {
            "name": "Yeti Finance/WAVAX",
            "token": "Yeti Finance",
            "quote": "WAVAX",
            "pairAddress": "0xbdc7EF37283BC67D50886c4afb64877E3e83f869",
            "tokenAddress": "0x77777777777d4554c39223C354A05825b2E8Faa3",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        },
        {
            "name": "Platypus/WAVAX",
            "token": "Platypus",
            "quote": "WAVAX",
            "pairAddress": "0xCDFD91eEa657cc2701117fe9711C9a4F61FEED23",
            "tokenAddress": "0x22d4002028f537599bE9f666d1c4Fa138522f9c8",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        },
        {
            "name": "Echidna Token/WAVAX",
            "token": "Echidna Token",
            "quote": "WAVAX",
            "pairAddress": "0x218e6A0AD170460F93eA784FbcC92B57DF13316E",
            "tokenAddress": "0xeb8343D5284CaEc921F035207ca94DB6BAaaCBcd",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        },
        {
            "name": "Vector Finance/WAVAX",
            "token": "Vector Finance",
            "quote": "WAVAX",
            "pairAddress": "0x9EF0C12b787F90F59cBBE0b611B82D30CAB92929",
            "tokenAddress": "0x5817D4F0b62A59b17f75207DA1848C2cE75e7AF4",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        },
        {
            "name": "Wrapped Ether/WAVAX",
            "token": "Wrapped Ether",
            "quote": "WAVAX",
            "pairAddress": "0xFE15c2695F1F920da45C30AAE47d11dE51007AF9",
            "tokenAddress": "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        },
        {
            "name": "Magic Internet Money/WAVAX",
            "token": "Magic Internet Money",
            "quote": "WAVAX",
            "pairAddress": "0x781655d802670bbA3c89aeBaaEa59D3182fD755D",
            "tokenAddress": "0x130966628846BFd36ff31a822705796e8cb8C18D",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        },
        {
            "name": "GMX/WAVAX",
            "token": "GMX",
            "quote": "WAVAX",
            "pairAddress": "0x0c91a070f862666bBcce281346BE45766d874D98",
            "tokenAddress": "0x62edc0692BD897D2295872a9FFCac5425011c661",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        },
        {
            "name": "Staked AVAX/WAVAX",
            "token": "Staked AVAX",
            "quote": "WAVAX",
            "pairAddress": "0x4b946c91C2B1a7d7C40FB3C130CdfBaf8389094d",
            "tokenAddress": "0x2b2C81e08f1Af8835a78Bb2A90AE924ACE0eA4bE",
            "quoteAddress": "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7"
        }
    ]
}

export class ExposureInfo {
    private Provider: any;
    private Web3: any;
    private Tokens: any;
    private WAVAX: any;
    private CurrentEpoch: any;
    private ExposureObject: any;
    ExposureAddress: string
    USDCAddress: string;

    constructor(provider: any, web3: any, exposureAddress: string) {
        this.Provider = provider
        this.Web3 = web3
        this.Tokens = config.tokens
        this.WAVAX = config.WAVAX
        this.CurrentEpoch = undefined
        this.ExposureAddress = exposureAddress
        this.ExposureObject = new this.Web3.eth.Contract(ExposureABI, this.ExposureAddress)
        this.USDCAddress = config.WAVAX.quoteAddress
    }

    async getUSDTest() {

        let pair1 = new this.Web3.eth.Contract(PairABI, this.Tokens[0].pairAddress)
        let reserves2 = await pair1.methods.getReserves().call()
        let token02 = await pair1.methods.token0().call()
        let price
        if (token02 == this.Tokens[0].tokenAddress) {
            price = ((reserves2._reserve0 * 1e18) / reserves2._reserve1);
        } else {
            price = ((reserves2._reserve1 * 1e18) / reserves2._reserve0);
        }
        console.log(price, this.Tokens[0].tokenAddress, token02)

        let pair = new this.Web3.eth.Contract(PairABI, this.WAVAX.pairAddress)
        let reserves = await pair.methods.getReserves().call()
        let token0 = await pair.methods.token0().call()
        let usdPrice = ((Number(reserves._reserve0) * (10 ** 36)) / (Number(reserves._reserve1) * (10 ** 12)) / (10 ** 18))
        console.log(((price * (10 ** 18)) / usdPrice) / (10 ** 18), token0, this.WAVAX.tokenAddress)
        console.log((price / (10 ** 18)) / (usdPrice / (10 ** 18)))
    }

    async getPrice(tokenAddress: string, pairAddress: string, divide: boolean | undefined, wavaxPrice: number | undefined): Promise<number> {
        return new Promise(async (resolve, reject) => {
            let pair = new this.Web3.eth.Contract(PairABI, pairAddress)

            let reserves = await pair.methods.getReserves().call()
            let token0 = await pair.methods.token0().call()


            if (!reserves._reserve1 || !reserves._reserve0 || !token0) {
                // if (!divide)
                //     reserves.reserve1 *= (10**12)
                reject(0)
                return 0
            }


            let price = reserves._reserve1 / reserves._reserve0
            if (token0 == tokenAddress) {
                if (!divide) {
                    price = 1 / (reserves._reserve0 / (reserves._reserve1 * 10 ** 12))
                } else {
                    price = reserves._reserve0 / reserves._reserve1
                    if (!divide) {
                    }
                }

            }

            if (!divide)
                resolve(price)
            if (wavaxPrice)
                resolve(wavaxPrice / price)
        })
    }


    async getSupply(tokenAddress: string): Promise<number> {
        return new Promise(async (resolve, reject) => {
            let token = new this.Web3.eth.Contract(ERC20ABI, tokenAddress)
            try {
                let mcap = await token.methods.totalSupply().call()
                resolve(Number(BigInt(mcap) / BigInt(10 ** 18)))
            } catch {
                reject(0)
            }

        })
    }

    async getExposurePrice(tokenAddress: string): Promise<number> {
        return new Promise(async resolve => {
            if (!this.CurrentEpoch)
                this.CurrentEpoch = await this.ExposureObject.methods.epoch().call()
            try {

            } catch {

            }
            let price = await this.ExposureObject.methods.getTokenPrice(this.CurrentEpoch, tokenAddress).call().catch((err: any) => console.log(err))
            console.log(price)
            resolve(Number(BigInt(price) / BigInt(10 ** 15)) / (1000))
        })
    }

    async getIndexPrice(): Promise<number> {
        return new Promise(async resolve => {
            if (!this.CurrentEpoch)
                this.CurrentEpoch = await this.ExposureObject.methods.epoch().call()
            let divisor = 100000000
            let v = 0
            for (const i in this.Tokens) {
                let val = await this.ExposureObject.methods.getTokenMarketCap(this.CurrentEpoch, this.Tokens[i].tokenAddress).call().catch((err: any) => console.log(err))
                v += Number(BigInt(val) / BigInt(10 ** 18))
            }
            resolve(v / divisor)
        })
    }

    async actualIndexPrice(): Promise<number> {
        return new Promise(async resolve => {
            if (!this.CurrentEpoch)
                this.CurrentEpoch = await this.ExposureObject.methods.epoch().call()
            let divisor = 100000000
            let mcaps = await this.getPricesAndMcaps()
            delete mcaps.mcaps["WAVAX"]
            // @ts-ignore
            let v = await Object.values(mcaps.mcaps).reduce((tot, val) => tot + val, 0)

            // @ts-ignore
            resolve(v / divisor)
        })
    }

    async tokenPortionIndex(tracked: boolean | null): Promise<number> {
        return new Promise(async resolve => {
            this.CurrentEpoch = await this.ExposureObject.methods.epoch().call()
            let v = 0
            for (const i in this.Tokens) {
                if (tracked) {
                    let wavaxPrice = await this.getPrice(this.WAVAX.tokenAddress, this.WAVAX.pairAddress, false, 0)
                    let price = await this.getPrice(this.Tokens[i].tokenAddress, this.Tokens[i].pairAddress, true, wavaxPrice)
                    let portion = await this.ExposureObject.methods.getTokenPortions(this.CurrentEpoch, this.Tokens[i].tokenAddress).call()
                    v += ((price) * (portion)) / 1e18
                    continue
                }
                let price = await this.ExposureObject.methods.getTokenPrice(this.CurrentEpoch, this.Tokens[i].tokenAddress).call()
                let portion = await this.ExposureObject.methods.getTokenPortions(this.CurrentEpoch, this.Tokens[i].tokenAddress).call()
                v += ((price / 1e18) * (portion / 1e18))
            }
            resolve(v)
        })
    }

    async getPortions(): Promise<{[key: string]: number}> {
        return new Promise(async resolve => {
            this.CurrentEpoch = await this.ExposureObject.methods.epoch().call()
            let portions: { [key: string]: number } = {}
            for (const i in this.Tokens) {
                let portion = await this.ExposureObject.methods.getTokenPortions(this.CurrentEpoch, this.Tokens[i].tokenAddress).call()
                portions[this.Tokens[i].token] = Number(BigInt(portion) / BigInt(10 ** 10)) / (10 ** 8)
            }
            resolve(portions)
        })
    }

    async getExposureWeights() {
        return new Promise(async resolve => {
            this.CurrentEpoch = await this.ExposureObject.methods.epoch().call()
            let portions: { [key: string]: number } = {}
            for (const i in this.Tokens) {
                let portion = await this.ExposureObject.methods._tokenWeights(this.CurrentEpoch, this.Tokens[i].tokenAddress).call()
                portions[this.Tokens[i].token] = Number(BigInt(portion) / BigInt(10 ** 10)) / (10 ** 8)
            }
            resolve(portions)
        })
    }

    async getActualWeights() {
        return new Promise(async resolve => {
            let totalMCAP = 0
            let weights: { [key: string]: number } = {}
            let mcaps = await this.getPricesAndMcaps()
            for (const i in mcaps.mcaps) {
                if (i == "WAVAX")
                    continue
                totalMCAP += mcaps.mcaps[i]
            }
            for (const i in mcaps.mcaps) {
                if (i == "WAVAX")
                    continue
                weights[i] = mcaps.mcaps[i] / totalMCAP
            }
            resolve(weights)
        })
    }

    async getPortionChange(): Promise<any> {
        return new Promise(async resolve => {
            this.CurrentEpoch = await this.ExposureObject.methods.epoch().call()
            let currentPortions: any = await this.getPortions()
            let previousPortions: { [key: string]: number } = {}
            for (const i in this.Tokens) {
                let portion = await this.ExposureObject.methods.getTokenPortions(this.CurrentEpoch - 1, this.Tokens[i].tokenAddress).call()
                previousPortions[this.Tokens[i].token] = Number(BigInt(portion) / BigInt(10 ** 10)) / (10 ** 8)
            }
            let portionChange: { [key: string]: number } = {}
            for (const i in currentPortions) {
                portionChange[i] = currentPortions[i] - previousPortions[i]
            }
            let tokensToBuy: { [key: string]: number } = {}
            let tokensToSell: { [key: string]: number } = {}
            for (const i in this.Tokens) {
                let buyAmount = await this.ExposureObject.methods.getTokenBuyAmount(this.CurrentEpoch, this.Tokens[i].tokenAddress).call()
                let sellAmount = await this.ExposureObject.methods.getTokenSellAmount(this.CurrentEpoch, this.Tokens[i].tokenAddress).call()

                tokensToBuy[this.Tokens[i].token] = Number(BigInt(buyAmount) / BigInt(10 ** 10)) / (10 ** 8)
                tokensToSell[this.Tokens[i].token] = Number(BigInt(sellAmount) / BigInt(10 ** 10)) / (10 ** 8)

            }
            resolve([portionChange, tokensToBuy, tokensToSell])
            console.log(portionChange, tokensToBuy, tokensToSell)
        })
    }

    async getExposureMarketCaps() {

    }

    async getNAV(): Promise<number> {
        return new Promise(async resolve => {
            let balances = await this.getAllExposureTokenBalances(this.ExposureAddress)
            let prices = await this.getPricesAndMcaps()
            delete prices.prices["WAVAX"]
            let nav = await Object.values(prices.prices).reduce((tot: number, token, i) => tot + (balances[this.Tokens[i].token] * prices.prices[this.Tokens[i].token]), 0)
            resolve(nav)
        })
    }

    async getBalanceOfAddress(tokenAddress: string, publicKey: string): Promise<number> {
        return new Promise(async resolve => {
            let token = new this.Web3.eth.Contract(ERC20ABI, tokenAddress)
            let tokenBalance = await token.methods.balanceOf(publicKey).call()
            resolve(Number(BigInt(tokenBalance) / BigInt(10 ** 10)) / (10 ** 8))
        })
    }

    async getAllExposureTokenBalances(accountAddress: string): Promise<{ [key: string]: number }> {
        return new Promise(async resolve => {
            let balances: { [key: string]: any } = {
                'WAVAX': await this.getBalanceOfAddress(this.WAVAX.tokenAddress, accountAddress),
                'USDC': await this.getBalanceOfAddress(this.USDCAddress, accountAddress)
            }
            for (const i in this.Tokens) {

                balances[this.Tokens[i].token] = await this.getBalanceOfAddress(this.Tokens[i].tokenAddress, accountAddress)
            }
            resolve(balances)
        })
    }

    async getPricesAndMcaps(): Promise<any> {
        return new Promise(async resolve => {
            let wavaxPrice: number = await this.getPrice(this.WAVAX.tokenAddress, this.WAVAX.pairAddress, false, 0)
            let wavaxSupply: number = await this.getSupply(this.WAVAX.tokenAddress)
            wavaxSupply *= wavaxPrice
            let prices: { [key: string]: any } = {"WAVAX": wavaxPrice}
            let mcaps: { [key: string]: any } = {"WAVAX": wavaxSupply}
            for (const i in this.Tokens) {
                let price = await this.getPrice(this.Tokens[i].tokenAddress, this.Tokens[i].pairAddress, true, wavaxPrice)
                let supply = await this.getSupply(this.Tokens[i].tokenAddress)
                prices[this.Tokens[i].token] = price
                mcaps[this.Tokens[i].token] = supply * price
                await sleep(100)
            }
            resolve({prices, mcaps})
        })
    }

    async epochNotification(notif: boolean) {
        return new Promise(async ok => {
            let nav = await this.getNAV()
            // let prices = await this.getPricesAndMcaps()
            // let p = "**Prices**: \n"
            // let pa: { [key: string]: any } = {}
            // let ma: any[any] = []
            // let m = "**MCAPs**: \n"
            // for (const i in prices.prices) {
            //     p += i + ": " + prices.prices[i].toLocaleString() + "\n"
            //     m += i + ": " + prices.mcaps[i].toLocaleString() + "\n"
            //     pa[i] = prices.prices[i]
            //     ma[i] = prices.prices[i]
            // }
            // let ep = "**Exposure Prices**: \n"
            // let xp: { [key: string]: any } = {}
            // for (const i in this.e.Tokens) {
            //     let pr = await this.getExposurePrice(this.e.Tokens[i].tokenAddress)
            //     ep += this.e.Tokens[i].token + ": " + pr.toLocaleString() + "\n"
            //     xp[i] = pr
            // }
            let ind = await this.getIndexPrice()
            let actual = await this.actualIndexPrice()
            let portion = await this.tokenPortionIndex(false)
            let tportion = await this.tokenPortionIndex(true)
            let shareBalance = await this.ExposureObject.methods.totalSupply().call()
            let info = "Index Price:                                $" + ind.toLocaleString() + "\nPortion Index Price:                  $" + portion.toLocaleString() + "\nTracked Portion Index Price:   $" + tportion.toLocaleString() + "\nTrue Index Price:                       $" + actual.toLocaleString()
                + "\nNAV: $" + nav.toLocaleString() + " \n" + "NAV Per Share: $" + (nav / (Number(BigInt(shareBalance) / BigInt(10 ** 16)) / 100)).toLocaleString() + "\n" + "Total Shares: " + shareBalance + "\n"
            // + p + ep

            ok(info)
        })
    }

    async calculateTradeAmount(side: boolean) {
        let prices = await this.getPricesAndMcaps()
        let toTrade: ExposureToTrade[] = []
        let method = "getTokenSellAmount"
        if (side)
            method = "getTokenBuyAmount"
        for (const i in this.Tokens) {
            let tradeAmount = await this.ExposureObject.methods[method](this.CurrentEpoch.toString(), this.Tokens[i].tokenAddress).call().catch((err: any) => {
                console.log(err)
            })
            toTrade.push({
                name: this.Tokens[i].name,
                amountToTrade: (Number(BigInt(tradeAmount) / BigInt(10 ** 14)) / 10 ** 4),
                toTradeUSD: (Number(BigInt(tradeAmount) / BigInt(10 ** 14)) / 10 ** 4) * prices.prices[this.Tokens[i].name],
                currentPrice: prices.prices[this.Tokens[i].name],
                estimatedNewPrice: 0
            })
        }
        return toTrade
    }
}

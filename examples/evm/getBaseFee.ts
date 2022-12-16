import { Coinflect, BN } from "coinflect/dist"
import { EVMAPI } from "coinflect/dist/apis/evm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const cchain: EVMAPI = coinflect.CChain()

const main = async (): Promise<any> => {
  const baseFeeResponse: string = await cchain.getBaseFee()
  const baseFee: BN = new BN(parseInt(baseFeeResponse))
  console.log(`BaseFee: ${baseFee.toString()}`)
}

main()

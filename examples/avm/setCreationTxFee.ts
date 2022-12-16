import { Coinflect, BN } from "coinflect/dist"
import { AVMAPI } from "coinflect/dist/apis/avm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const xchain: AVMAPI = coinflect.XChain()

const main = async (): Promise<any> => {
  const fee: BN = new BN(507)
  xchain.setCreationTxFee(fee)
  const txFee: BN = xchain.getCreationTxFee()
  console.log(txFee)
}

main()

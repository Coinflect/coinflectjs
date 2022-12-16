import { Coinflect } from "coinflect/dist"
import { InfoAPI } from "coinflect/dist/apis/info"
import { GetTxFeeResponse } from "coinflect/dist/apis/info/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const info: InfoAPI = coinflect.Info()

const main = async (): Promise<any> => {
  const iGetTxFeeResponse: GetTxFeeResponse = await info.getTxFee()
  console.log(iGetTxFeeResponse)
}

main()

import { Coinflect } from "coinflect/dist"
import { AVMAPI } from "coinflect/dist/apis/avm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const xchain: AVMAPI = coinflect.XChain()

const main = async (): Promise<any> => {
  const status: string = await xchain.getTxStatus(
    "2WdpWdsqE26Qypmf66No8KeBYbNhdk3zSG7a5uNYZ3FLSvCu1D"
  )
  console.log(status)
}

main()

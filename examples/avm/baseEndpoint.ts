import { Coinflect } from "coinflect/dist"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const baseEndpoint: string = "rpc"
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
coinflect.setAddress(ip, port, protocol, baseEndpoint)

const main = async (): Promise<any> => {
  const baseEndpoint: string = coinflect.getBaseEndpoint()
  console.log(baseEndpoint)
}

main()

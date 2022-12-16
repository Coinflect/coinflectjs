import { Coinflect } from "coinflect/dist"
import { AVMAPI } from "coinflect/dist/apis/avm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const xchain: AVMAPI = coinflect.XChain()

const main = async (): Promise<any> => {
  const address: string = "X-custom18jma8ppw3nhx5r4ap8clazz0dps7rv5u9xde7p"
  const balance: object = await xchain.getBalance(address, "CFLT")
  console.log(balance)
}

main()

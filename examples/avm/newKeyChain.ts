import { Coinflect } from "coinflect/dist"
import { AVMAPI, KeyChain } from "coinflect/dist/apis/avm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const xchain: AVMAPI = coinflect.XChain()

const main = async (): Promise<any> => {
  const keyChain: KeyChain = xchain.newKeyChain()
  console.log(keyChain)
}

main()

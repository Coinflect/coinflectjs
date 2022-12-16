import { Coinflect } from "coinflect/dist"
import { PlatformVMAPI } from "coinflect/dist/apis/platformvm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const pchain: PlatformVMAPI = coinflect.PChain()

const main = async (): Promise<any> => {
  const ids: string[] = []
  const subnets: object[] = await pchain.getSubnets(ids)
  console.log(subnets)
}

main()

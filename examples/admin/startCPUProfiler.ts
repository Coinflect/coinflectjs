import { Coinflect } from "coinflect/dist"
import { AdminAPI } from "coinflect/dist/apis/admin"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const admin: AdminAPI = coinflect.Admin()

const main = async (): Promise<any> => {
  const successful: boolean = await admin.startCPUProfiler()
  console.log(successful)
}

main()

import { Coinflect } from "coinflect/dist"
import { HealthAPI } from "coinflect/dist/apis/health"
import { HealthResponse } from "coinflect/dist/apis/health/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const health: HealthAPI = coinflect.Health()

const main = async (): Promise<any> => {
  const healthResponse: HealthResponse = await health.health()
  console.log(healthResponse)
}

main()

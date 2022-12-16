import { Coinflect } from "coinflect/dist"
import { MetricsAPI } from "coinflect/dist/apis/metrics"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const metrics: MetricsAPI = coinflect.Metrics()

const main = async (): Promise<any> => {
  const m: string = await metrics.getMetrics()
  console.log(m)
}

main()

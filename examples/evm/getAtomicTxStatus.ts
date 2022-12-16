import { Coinflect } from "coinflect/dist"
import { EVMAPI } from "coinflect/dist/apis/evm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const cchain: EVMAPI = coinflect.CChain()

const main = async (): Promise<any> => {
  const txID: string = "FCry2Z1Su9KZqK1XRMhxQS6XuPorxDm3C3RBT7hw32ojiqyvP"
  const status: string = await cchain.getAtomicTxStatus(txID)
  console.log(status)
}

main()

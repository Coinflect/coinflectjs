import { Coinflect, Buffer } from "../../src"
import { PlatformVMAPI, Tx } from "../../src/apis/platformvm"

const ip: string = "api.coinflect.com"
const port: number = 443
const protocol: string = "https"
const networkID: number = 1
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const pchain: PlatformVMAPI = coinflect.PChain()

const main = async (): Promise<any> => {
  const txID: string = "7mnY7SqR1s8aTJShjvW1Yebe4snCzsjhonFrrXiWBE4L9x9A6"
  const hex = (await pchain.getTx(txID)) as string
  const buf: Buffer = new Buffer(hex.slice(2), "hex")
  const tx: Tx = new Tx()
  tx.fromBuffer(buf)
  const jsonStr: string = JSON.stringify(tx)
  console.log(jsonStr)
  const jsn: Object = JSON.parse(jsonStr)
  console.log(jsn)
}

main()

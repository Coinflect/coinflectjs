import { Coinflect } from "coinflect/dist"
import { KeystoreAPI } from "coinflect/dist/apis/keystore"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const keystore: KeystoreAPI = coinflect.NodeKeys()

const main = async (): Promise<any> => {
  const username: string = "username"
  const password: string = "Vz48jjHLTCcAepH95nT4B"
  const user: string = await keystore.exportUser(username, password)
  console.log(user)
}

main()

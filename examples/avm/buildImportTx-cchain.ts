import { Coinflect, BN, Buffer } from "coinflect/dist"
import {
  AVMAPI,
  KeyChain,
  UTXOSet,
  UnsignedTx,
  Tx
} from "coinflect/dist/apis/avm"
import { GetUTXOsResponse } from "coinflect/dist/apis/avm/interfaces"
import {
  PrivateKeyPrefix,
  DefaultLocalGenesisPrivateKey,
  Defaults,
  UnixNow
} from "coinflect/dist/utils"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const coinflect: Coinflect = new Coinflect(ip, port, protocol, networkID)
const xchain: AVMAPI = coinflect.XChain()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`
xKeychain.importKey(privKey)
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
const cChainBlockchainID: string = Defaults.network[networkID].C.blockchainID
const threshold: number = 1
const locktime: BN = new BN(0)
const asOf: BN = UnixNow()
const memo: Buffer = Buffer.from(
  "AVM utility method buildImportTx to import CFLT to the X-Chain from the C-Chain"
)

const main = async (): Promise<any> => {
  const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs(
    xAddressStrings,
    cChainBlockchainID
  )
  const utxoSet: UTXOSet = avmUTXOResponse.utxos

  const unsignedTx: UnsignedTx = await xchain.buildImportTx(
    utxoSet,
    xAddressStrings,
    cChainBlockchainID,
    xAddressStrings,
    xAddressStrings,
    xAddressStrings,
    memo,
    asOf,
    locktime,
    threshold
  )
  const tx: Tx = unsignedTx.sign(xKeychain)
  const txid: string = await xchain.issueTx(tx)
  console.log(`Success! TXID: ${txid}`)
}

main()

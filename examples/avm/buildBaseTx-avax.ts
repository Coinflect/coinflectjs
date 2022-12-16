import { Coinflect, BN, Buffer } from "coinflect/dist"
import {
  AVMAPI,
  KeyChain,
  UTXOSet,
  UnsignedTx,
  Tx
} from "coinflect/dist/apis/avm"
import {
  GetBalanceResponse,
  GetUTXOsResponse
} from "coinflect/dist/apis/avm/interfaces"
import { Defaults } from "coinflect/dist/utils"
import {
  PrivateKeyPrefix,
  DefaultLocalGenesisPrivateKey,
  UnixNow
} from "coinflect/dist/utils"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 1337
const xBlockchainID: string = Defaults.network[networkID].X.blockchainID
const cfltAssetID: string = Defaults.network[networkID].X.cfltAssetID
const coinflect: Coinflect = new Coinflect(
  ip,
  port,
  protocol,
  networkID,
  xBlockchainID
)
const xchain: AVMAPI = coinflect.XChain()
const xKeychain: KeyChain = xchain.keyChain()
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`
xKeychain.importKey(privKey)
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
const asOf: BN = UnixNow()
const threshold: number = 1
const locktime: BN = new BN(0)
const memo: Buffer = Buffer.from("AVM utility method buildBaseTx to send CFLT")
const fee: BN = xchain.getDefaultTxFee()

const main = async (): Promise<any> => {
  const getBalanceResponse: GetBalanceResponse = await xchain.getBalance(
    xAddressStrings[0],
    cfltAssetID
  )
  const balance: BN = new BN(getBalanceResponse.balance)
  const avmUTXOResponse: GetUTXOsResponse = await xchain.getUTXOs(
    xAddressStrings
  )
  const utxoSet: UTXOSet = avmUTXOResponse.utxos
  const amount: BN = balance.sub(fee)

  const unsignedTx: UnsignedTx = await xchain.buildBaseTx(
    utxoSet,
    amount,
    cfltAssetID,
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

import Mnemonic from "coinflect/dist/utils/mnemonic"
const mnemonic: Mnemonic = Mnemonic.getInstance()

const main = async (): Promise<any> => {
  const lang: string = "spanish"
  mnemonic.setDefaultWordlist(lang)
}
main()

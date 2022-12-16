import { getCoinflect, createTests, Matcher } from "./e2etestlib"
import { HealthAPI } from "../src/apis/health/api"
import Coinflect from "src"

describe("Info", (): void => {
  const coinflect: Coinflect = getCoinflect()
  const health: HealthAPI = coinflect.Health()

  // test_name          response_promise               resp_fn                 matcher           expected_value/obtained_value
  const tests_spec: any = [
    [
      "healthResponse",
      () => health.health(),
      (x) => {
        return x.healthy
      },
      Matcher.toBe,
      () => true
    ]
  ]

  createTests(tests_spec)
})
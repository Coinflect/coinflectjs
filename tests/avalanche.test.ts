import mockAxios from "jest-mock-axios"
import { Coinflect, CoinflectCore } from "../src"
import { AVMAPI } from "../src/apis/avm/api"
import { AdminAPI } from "../src/apis/admin/api"
import { HealthAPI } from "../src/apis/health/api"
import { InfoAPI } from "../src/apis/info/api"
import { KeystoreAPI } from "../src/apis/keystore/api"
import { MetricsAPI } from "../src/apis/metrics/api"
import { PlatformVMAPI } from "../src/apis/platformvm/api"
import { TestAPI } from "./testlib"
import { AxiosRequestConfig } from "axios"
import { HttpResponse } from "jest-mock-axios/dist/lib/mock-axios-types"

describe("Coinflect", (): void => {
  const blockchainID: string =
    "6h2s5de1VC65meajE1L2PjvZ1MXvHc3F6eqPCGKuDt4MxiweF"
  let host: string = "127.0.0.1"
  const port: number = 9650
  const networkID: number = 1337
  let protocol: string = "https"
  let coinflect: Coinflect
  let coinflectCore: CoinflectCore
  const api: string = "api.coinflect.com"
  const url: string = "https://api.coinflect.com:9650"
  const encrypted: string = "https"
  const skipinit: boolean = true
  beforeAll((): void => {
    coinflect = new Coinflect(
      host,
      port,
      protocol,
      networkID,
      undefined,
      undefined,
      undefined,
      skipinit
    )
    coinflect.addAPI("admin", AdminAPI)
    coinflect.addAPI("xchain", AVMAPI, "/ext/subnet/avm", blockchainID)
    coinflect.addAPI("health", HealthAPI)
    coinflect.addAPI("info", InfoAPI)
    coinflect.addAPI("keystore", KeystoreAPI)
    coinflect.addAPI("metrics", MetricsAPI)
    coinflect.addAPI("pchain", PlatformVMAPI)
  })
  test("Remove special characters", (): void => {
    host = "a&&&&p#i,.@a+v(a)x$.~n%e't:w*o?r<k>"
    protocol = "h@t&@&@t#p+s()$"
    coinflect = new Coinflect(host, port, protocol, networkID)
    expect(coinflect.getHost()).toBe(api)
    expect(coinflect.getProtocol()).toBe(encrypted)
    expect(coinflect.getURL()).toBe(url)
    coinflectCore = new CoinflectCore(host, port, protocol)
    expect(coinflectCore.getHost()).toBe(api)
    expect(coinflectCore.getProtocol()).toBe(encrypted)
    expect(coinflectCore.getURL()).toBe(url)
  })
  test("Can specify base endpoint", (): void => {
    coinflect = new Coinflect()
    coinflect.setAddress(api, port, encrypted, "rpc")
    coinflect.setNetworkID(networkID)
    expect(coinflect.getHost()).toBe(api)
    expect(coinflect.getProtocol()).toBe(encrypted)
    expect(coinflect.getPort()).toBe(port)
    expect(coinflect.getBaseEndpoint()).toBe("rpc")
    expect(coinflect.getURL()).toBe(`${url}/rpc`)
    expect(coinflect.getNetworkID()).toBe(networkID)
  })
  test("Can initialize without port", (): void => {
    protocol = encrypted
    host = api
    coinflect = new Coinflect(host, undefined, protocol, networkID)
    expect(coinflect.getPort()).toBe(undefined)
    expect(coinflect.getURL()).toBe(`${protocol}://${api}`)
    coinflectCore = new CoinflectCore(host, undefined, protocol)
    expect(coinflectCore.getPort()).toBe(undefined)
    expect(coinflectCore.getURL()).toBe(`${protocol}://${api}`)
  })
  test("Can initialize with port", (): void => {
    protocol = encrypted
    coinflect = new Coinflect(host, port, protocol, networkID)
    expect(coinflect.getIP()).toBe(host)
    expect(coinflect.getHost()).toBe(host)
    expect(coinflect.getPort()).toBe(port)
    expect(coinflect.getProtocol()).toBe(protocol)
    expect(coinflect.getURL()).toBe(`${protocol}://${host}:${port}`)
    expect(coinflect.getNetworkID()).toBe(1337)
    expect(coinflect.getHeaders()).toStrictEqual({})
    coinflect.setNetworkID(50)
    expect(coinflect.getNetworkID()).toBe(50)
    coinflect.setNetworkID(12345)
    expect(coinflect.getNetworkID()).toBe(12345)
  })

  test("Endpoints correct", (): void => {
    expect(coinflect.Admin()).not.toBeInstanceOf(AVMAPI)
    expect(coinflect.Admin()).toBeInstanceOf(AdminAPI)

    expect(coinflect.XChain()).not.toBeInstanceOf(AdminAPI)
    expect(coinflect.XChain()).toBeInstanceOf(AVMAPI)

    expect(coinflect.Health()).not.toBeInstanceOf(KeystoreAPI)
    expect(coinflect.Health()).toBeInstanceOf(HealthAPI)

    expect(coinflect.Info()).not.toBeInstanceOf(KeystoreAPI)
    expect(coinflect.Info()).toBeInstanceOf(InfoAPI)

    expect(coinflect.PChain()).not.toBeInstanceOf(KeystoreAPI)
    expect(coinflect.PChain()).toBeInstanceOf(PlatformVMAPI)

    expect(coinflect.NodeKeys()).not.toBeInstanceOf(PlatformVMAPI)
    expect(coinflect.NodeKeys()).toBeInstanceOf(KeystoreAPI)

    expect(coinflect.Metrics()).not.toBeInstanceOf(KeystoreAPI)
    expect(coinflect.Metrics()).toBeInstanceOf(MetricsAPI)

    expect(coinflect.Admin().getRPCID()).toBe(1)
    expect(coinflect.XChain().getRPCID()).toBe(1)
    expect(coinflect.PChain().getRPCID()).toBe(1)
    expect(coinflect.NodeKeys().getRPCID()).toBe(1)
  })

  test("Create new API", (): void => {
    coinflect.addAPI("avm2", AVMAPI)
    expect(coinflect.api("avm2")).toBeInstanceOf(AVMAPI)

    coinflect.addAPI("keystore2", KeystoreAPI, "/ext/keystore2")
    expect(coinflect.api("keystore2")).toBeInstanceOf(KeystoreAPI)

    coinflect.api("keystore2").setBaseURL("/ext/keystore3")
    expect(coinflect.api("keystore2").getBaseURL()).toBe("/ext/keystore3")

    expect(coinflect.api("keystore2").getDB()).toHaveProperty("namespace")
  })

  test("Customize headers", (): void => {
    coinflect.setHeader("X-Custom-Header", "example")
    coinflect.setHeader("X-Foo", "Foo")
    coinflect.setHeader("X-Bar", "Bar")
    expect(coinflect.getHeaders()).toStrictEqual({
      "X-Custom-Header": "example",
      "X-Foo": "Foo",
      "X-Bar": "Bar"
    })
    coinflect.removeHeader("X-Foo")
    expect(coinflect.getHeaders()).toStrictEqual({
      "X-Custom-Header": "example",
      "X-Bar": "Bar"
    })
    coinflect.removeAllHeaders()
    expect(coinflect.getHeaders()).toStrictEqual({})
  })

  test("Customize request config", (): void => {
    expect(coinflect.getRequestConfig()).toStrictEqual({})
    coinflect.setRequestConfig("withCredentials", true)
    coinflect.setRequestConfig("withFoo", "Foo")
    coinflect.setRequestConfig("withBar", "Bar")
    expect(coinflect.getRequestConfig()).toStrictEqual({
      withCredentials: true,
      withFoo: "Foo",
      withBar: "Bar"
    })
    coinflect.removeRequestConfig("withFoo")
    expect(coinflect.getRequestConfig()).toStrictEqual({
      withCredentials: true,
      withBar: "Bar"
    })
    coinflect.removeAllRequestConfigs()
    expect(coinflect.getRequestConfig()).toStrictEqual({})
  })
})

describe("HTTP Operations", (): void => {
  const host: string = "127.0.0.1"
  const port: number = 8080
  const protocol: string = "http"
  const path: string = "/ext/testingrequests"
  let coinflect: Coinflect
  beforeAll((): void => {
    coinflect = new Coinflect(
      host,
      port,
      protocol,
      12345,
      undefined,
      undefined,
      undefined,
      true
    )
    coinflect.addAPI("testingrequests", TestAPI, path)
  })

  afterEach((): void => {
    mockAxios.reset()
  })

  test("GET works", async (): Promise<void> => {
    const input: string = "TestGET"
    const api: TestAPI = coinflect.api("testingrequests")
    const result: Promise<object> = api.TestGET(input, `/${input}`)
    const payload: object = {
      result: {
        output: input
      }
    }
    const responseObj: HttpResponse = {
      data: payload
    }
    mockAxios.mockResponse(responseObj)
    const response: any = await result
    expect(mockAxios.request).toHaveBeenCalledTimes(1)
    expect(response.output).toBe(input)
  })

  test("DELETE works", async (): Promise<void> => {
    const input: string = "TestDELETE"
    const api: TestAPI = coinflect.api("testingrequests")
    const axiosConfig: AxiosRequestConfig = {
      baseURL: `${protocol}://${host}:${port}`,
      responseType: "text"
    }
    const result: Promise<object> = api.TestDELETE(
      input,
      `/${input}`,
      axiosConfig
    )
    const payload: object = {
      result: {
        output: input
      }
    }
    const responseObj: HttpResponse = {
      data: payload
    }
    mockAxios.mockResponse(responseObj)
    const response: any = await result
    expect(mockAxios.request).toHaveBeenCalledTimes(1)
    expect(response.output).toBe(input)
  })

  test("POST works", async (): Promise<void> => {
    const input: string = "TestPOST"
    const api: TestAPI = coinflect.api("testingrequests")
    const result: Promise<object> = api.TestPOST(input, `/${input}`)
    const payload: object = {
      result: {
        output: input
      }
    }
    const responseObj: HttpResponse = {
      data: payload
    }
    mockAxios.mockResponse(responseObj)
    const response: any = await result
    expect(mockAxios.request).toHaveBeenCalledTimes(1)
    expect(response.output).toBe(input)
  })

  test("PUT works", async (): Promise<void> => {
    const input: string = "TestPUT"
    const api: TestAPI = coinflect.api("testingrequests")
    const result: Promise<object> = api.TestPUT(input, `/${input}`)
    const payload: object = {
      result: {
        output: input
      }
    }
    const responseObj: HttpResponse = {
      data: payload
    }
    mockAxios.mockResponse(responseObj)
    const response: any = await result
    expect(mockAxios.request).toHaveBeenCalledTimes(1)
    expect(response.output).toBe(input)
  })

  test("PATCH works", async (): Promise<void> => {
    const input: string = "TestPATCH"
    const api: TestAPI = coinflect.api("testingrequests")
    const result: Promise<object> = api.TestPATCH(input, `/${input}`)
    const payload: object = {
      result: {
        output: input
      }
    }
    const responseObj: HttpResponse = {
      data: payload
    }
    mockAxios.mockResponse(responseObj)
    const response: any = await result
    expect(mockAxios.request).toHaveBeenCalledTimes(1)
    expect(response.output).toBe(input)
  })
})

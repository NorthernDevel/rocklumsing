import { useHttpClient } from '~/composables/useHttpClient'
import {
  P2cDeposit,
  P2cResponse,
  requestP2cUploadSlip,
} from '~/models/p2c.model'

export const getP2cDepositPending = async (): Promise<P2cResponse> => {
  const { data: response } = await useHttpClient().post<P2cResponse>(
    `/p2c/depositPending`,
    {}
  )
  return response
}

export const getP2cDepositStatus = async (): Promise<P2cDeposit> => {
  const { data: response } = await useHttpClient().post<P2cDeposit>(
    `/p2c/depositStatus`,
    {}
  )
  return response
}

export const getP2cDeposit = async (amount: number): Promise<P2cDeposit> => {
  const { data: response } = await useHttpClient().post<P2cDeposit>(
    `/p2c/deposit`,
    { amount }
  )
  return response
}

export const getP2cUploadSlip = async (
  body: requestP2cUploadSlip
): Promise<P2cResponse> => {
  const { data: response } = await useHttpClient().post<P2cResponse>(
    `/p2c/uploadSlip`,
    body
  )
  return response
}

export const getP2cCancelTransfer = async (
  ref: string[]
): Promise<P2cResponse> => {
  const { data: response } = await useHttpClient().post<P2cResponse>(
    `/p2c/requestCancelTransfer`,
    { ref }
  )
  return response
}

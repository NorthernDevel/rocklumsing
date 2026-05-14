
import type { requestP2cUploadSlip } from '~/models/p2c.model'
import * as services from '~/server/services/p2c'

export const useP2cDepositPending = async () => {
  const { code, message, data } = await services.getP2cDepositPending()
  if (!code || code != '0') return { status: false, code, data: undefined, message }
  return { status: true, code,  data, message }
}

export const useP2cDepositStatus = async () => {
  const { code, message, data } = await services.getP2cDepositStatus()
  if (!code || code != '0') return { status: false, code, data: undefined, message }
  return { status: true, code, data, message }
}

export const useP2cDeposit = async (amount: number) => {
  const { code, message, data } = await services.getP2cDeposit(amount)
  if (!code || code != '0') return { status: false, code, data, message }
  return { status: true, code, data, message }
}

export const useP2cUploadSlip = async (body: requestP2cUploadSlip) => {
  const { code, message, data } = await services.getP2cUploadSlip(body)
  if (!code || code != '0') return { status: false, data: undefined, message }
  return { status: true, data, message }
}

export const useP2cCancelTransfer = async (ref: string[]) => {
  const { code, message, data } = await services.getP2cCancelTransfer(ref)
  if (!code || code != '0') return { status: false, code, data: undefined, message }
  return { status: true, code, data, message }
}

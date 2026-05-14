import { useHttpClient } from '~/composables/useHttpClient'
import type {
  Bonus,
  BonusDetail,
  RequestBonus,
  RequestBonusDetail,
} from '~/models/bonus.model'
import {
  Cashback,
  CashbackTurnOverDetail,
  RequestCashbackType,
} from '~/models/cashback.model'
import {
  Commission,
  CommissionTurnOverDetail,
  RequestCommissionTurnOverDetail,
} from '~/models/commission.model'
import {
  Information,
  RequestUpdateInformation,
  RequestUpdatePromptpay,
} from '~/models/information.model'
import type {
  UpdatePeer2PayUID,
  RequestUpdatePeer2PayUID,
} from '~/models/peer-to-pay.model'

export const getBonus = async (body: RequestBonus): Promise<Bonus> => {
  const { data: response } = await useHttpClient().post<Bonus>(
    `/customer/getBonus`,
    body,
  )
  return response
}

export const getBonusDetail = async (
  body: RequestBonusDetail,
): Promise<BonusDetail> => {
  const { data: response } = await useHttpClient().post<BonusDetail>(
    `/customer/getBonusDetail`,
    body,
  )
  return response
}

export const getCashback = async (): Promise<Cashback> => {
  const { data: response } = await useHttpClient().get<Cashback>(
    `/customer/getCashback`,
  )
  return response
}

export const getCashbackTurnOverDetail = async (
  body: RequestCashbackType,
): Promise<CashbackTurnOverDetail> => {
  const { data: response } = await useHttpClient().post<CashbackTurnOverDetail>(
    `/customer/getCashbackTurnOverDetail`,
    body,
  )
  return response
}

export const getCommission = async (): Promise<Commission> => {
  const { data: response } = await useHttpClient().get<Commission>(
    `/customer/getCommission`,
  )
  return response
}

export const getCommissionTurnOverDetail = async (
  body: RequestCommissionTurnOverDetail,
): Promise<CommissionTurnOverDetail> => {
  const { data: response } =
    await useHttpClient().post<CommissionTurnOverDetail>(
      `/customer/getCommissionTurnOverDetail`,
      body,
    )
  return response
}

export const getUpdatePeer2PayUID = async (
  body: RequestUpdatePeer2PayUID,
): Promise<UpdatePeer2PayUID> => {
  const { data: response } = await useHttpClient().post<UpdatePeer2PayUID>(
    `/customer/getCommissionTurnOverDetail`,
    body,
  )
  return response
}

export const getUpdateInformation = async (
  body: RequestUpdateInformation,
): Promise<Information> => {
  const { data: response } = await useHttpClient().post<Information>(
    `/customer/getUpdateInformation`,
    body,
  )
  return response
}

export const getInformation = async (): Promise<Information> => {
  const { data: response } = await useHttpClient().get<Information>(
    `/customer/getInformation`,
  )
  return response
}

export const getUpdatePromptpay = async (
  body: RequestUpdatePromptpay,
): Promise<Information> => {
  const { data: response } = await useHttpClient().post<Information>(
    `/customer/getUpdatePromptpay`,
    body,
  )
  return response
}

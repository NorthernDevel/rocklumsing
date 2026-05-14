export interface P2cDeposit {
  code: string
  message: string
  data?: P2cDepositData
}

export interface P2cDepositData {
  list: P2cDepositList[]
  summary: string
  createdDate: string
  expiredDate: string
  fullAmount: string
}

export interface P2cDepositList {
  amount: string
  bankName: string
  accountNumber: string
  firstName: string
  lastName: string
  ref: string
  createdDate: string
  expiredDate: string
  status: string
  fullAmount: string
  bankShort: string
}

export interface P2cResponse {
  code: string
  message: string
  data: any
}

export interface requestP2cUploadSlip {
  imgSlip: string
  ref: string
}

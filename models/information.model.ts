export interface Information {
  code: string
  message: string
  data?: InformationData
}

export interface InformationData {
  accountNumber: string
  bankShort: string
  firstNameEN: string
  firstNameTH: string
  lastNameEN: string
  lastNameTH: string
  phoneNo: string
  promptpayNo: string
  usernameProduct: string
}

export interface RequestUpdateInformation {
  firstName?: string
  lastName?: string
  firstNameEN?: string
  lastNameEN?: string
  promptPayID?: string
}

export interface RequestUpdatePromptpay {
  firstNameEn?: string
  lastNameEn?: string
  promptPayID?: string
}

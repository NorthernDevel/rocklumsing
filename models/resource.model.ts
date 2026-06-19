export interface ResoucesData {
  id: string
  siteCode: string
  logo: string
  info: InfoData
  registerType: RegisterTypes
  promotionNotify: boolean
  extraApplication: ExtraApplication
  tags: string[]
  announcement: Announcement
  imageUrl: ImageURL
  url: string
  createdAt: Date
  updatedAt: Date
  contacts: ContactData[]
  banners: BannerData[]
  promotions: PromotionData[]
  popups: any[]
  seoMeta: SEOMetaData
  providerBlackList?: string[]
  gameBlackList?: string[]
}

export type RegisterTypes =
  | 'OTP_PHONE_SHORT'
  | 'OTP_REQUIRE_BANK'
  | 'CAPTCHA_NO_PHONE'
  | 'CAPTCHA_REQUIRE_BANK'
  | 'USER_BY_PHONE'
  | 'CAPTCHA_PHONE_SHORT'

export interface Announcement {
  display: DisplayData
  isActive: boolean
}

export interface DisplayData {
  en: string
  th: string
}

export interface BannerData {
  id: string
  siteId: string
  image: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ContactData {
  id: string
  siteId: string
  provider: string
  display: DisplayData
  options: Options
  createdAt: Date
  updatedAt: Date
}

export interface Options {
  link: string
  lineId?: string
}

export interface ImageURL {
  logo: string
  popup: string
  banner: string
  promotion: string
}

export interface InfoData {
  title: DisplayData
  language: Language
  description: DisplayData
}

export interface Language {
  en: boolean
  th: boolean
}

export interface PromotionData {
  id: string
  siteId: string
  refId: null
  image: string
  title: string
  shortContent: string
  content: string
  slug: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ExtraApplication {
  ios: ExtraApplicationInfo
  andriod: ExtraApplicationInfo
}

export interface ExtraApplicationInfo {
  active: boolean
  source: string
}

export interface FooterDescription {
  title: DisplayData
  description?: DisplayData
}

export interface SEOMetaData {
  title: string
  keywords: string
  description: string
}

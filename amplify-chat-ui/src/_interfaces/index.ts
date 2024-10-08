type Locale = "en-US" | "ru-RU"

export interface Configuration {
  token: string
  color: string
  lang: Locale
  whitelabel: boolean
  popupIcon: string
  popupMessage: string
  windowHeading: string
  welcomeMessage: string
  addUnreadDot: boolean
  bottomIndent: number
  rightIndent: number
  zIndex: number
  buttonSize: number
  bedrockEngine: boolean
  streamGetAnswer: boolean
}

export type QchatApiVersion = "v1" | "v2"

export interface QchatConfiguration {
  token: string
  apiUrl: string
  apiStreamingUrl: string
  apiVersion: QchatApiVersion
  streamGetAnswer: boolean
  sourcePattern: string
}

type Role = "system" | "user" | "assistant"

export interface MessageType {
  role: Role
  content: string
  lang: string | "en_US"
  requestId?: string
}

export type EventType = "TEST" | "POPUP_SEEN" | "POPUP_CALLED" | "POPUP_NO_ANSWER_CLIENT" | "POPUP_NO_ANSWER_SERVER"

export type LikeStatus = "good_answer" | "wrong_answer"

interface Localization {
  clear: string
  collapse: string
  resize: string
  send: string
  inputPlaceholder: string
  errorMessage: string
}

export type Localizations = {
  [key in Locale]: Localization
}

export type ReactionType = "LIKE" | "DISLIKE"

declare global {
  interface Window {
    qchatQueryParams?: URLSearchParams
  }
}

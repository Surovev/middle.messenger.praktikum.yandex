import Block from '../utils/Block';

export type inputNames = {
  first_name?: string | RegExp;
  second_name?: string | RegExp;
  login?: string | RegExp;
  email?: string | RegExp;
  password?: string | RegExp;
  newPassword?: string | RegExp;
  password_repeated?: string | RegExp;
  phone?: string | RegExp;
  empty?: string;
};

export interface RequestOptions {
    data?: RequestData,
    headers?: {[key: string]: string},
    timeout?: number,
    method?: string
}

export interface RequestOptionsMethodGet {
    data?: { [key: string]: string },
    timeout?: number,
    headers?: {[key: string]: string}
}

export enum Methods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export type RequestData =
  Document | null | undefined

export interface Options {
  timeout?: number;
  method?: Methods;
  headers?: {[key: string]: string}
  data?: unknown;
}

export interface HandleNameChangeInterface {
  target: HTMLInputElement;
}

export interface BlockEvents {
  [event: string]: (e: Event) => void;
}

export type BlockProps = {
  events?: BlockEvents
} & {
  [key: string]: unknown
};

export interface BlockMeta {
  tag: string,
  props: object
}

export interface BlockConnect {
  props: object
}

export interface BlockChildren {
  [key: string] : Block | Array<Block>
}

export type Indexed<T = any> = {
  [key in string]: T;
}

export interface SignInData {
  login: string,
  password: string
}

export interface SignUpData extends SignInData{
  first_name: string,
  second_name: string,
  email: string,
  phone: string
}

export interface stringsObject {
  [key: string]: string
}

export interface ChangeUsersInChatData {
  users: string[],
  chatId: string
}

export interface ChatIdData {
  chatId: string
}

export interface ProfileInfoData {
  first_name: string
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string
}

export interface ChangePasswordData {
  oldPassword: string,
  newPassword: string
}

export interface CreateChatData {
  title: string
}

export interface SearchUserData {
  login: string
}

export interface WebSocketProps {
  userId: string,
  chatId: string,
  token: string
}

export interface SocketSendData {
  content: string,
  type: string
}

export interface WebSocketEvents {
  onOpen: () => void
  onClose: (event: CloseEvent) => void
  onError: (event: ErrorEvent) => void
  onMessage: (event: MessageEvent) => void
}

export interface messageFromSocket {
  chat_id : number
  content : string
  file: unknown
  id: number
  is_read: boolean
  time: string
  type: string
  user_id: number
}

export type HTTPMethod = (url: string, options?: Options, timeout?: number) => Promise<XMLHttpRequest>

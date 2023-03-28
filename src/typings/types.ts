export type inputNames = {
  first_name?: string | RegExp;
  second_name?: string | RegExp;
  login?: string | RegExp;
  email?: string | RegExp;
  password?: string | RegExp;
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

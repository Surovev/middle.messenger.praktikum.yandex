import { Methods, Options, RequestData } from '../typings/types';

const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function queryStringify(data: any) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

class HTTPTransport {
  get = (url: any, options: Options = {}) => this.request(
    url,
    { ...options, method: METHODS.GET as Methods },
    options.timeout ? options.timeout : 0,
  );

  post = (url: string | URL, options: Options = {}) => this.request(
    url,
    { ...options, method: METHODS.POST as Methods },
    options.timeout,
  );

  put = (url: string | URL, options: Options = {}) => this.request(
    url,
    { ...options, method: METHODS.PUT as Methods },
    options.timeout,
  );

  delete = (url: string | URL, options: Options = {}) => this.request(
    url,
    { ...options, method: METHODS.DELETE as Methods },
    options.timeout,
  );

  request = (url: string | URL, options: Options = {}, timeout = 5000) => {
    const { headers = {}, method, data }: Options = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key] as string);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data as RequestData);
      }
    });
  };
}

export default HTTPTransport;

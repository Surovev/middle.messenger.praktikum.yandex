import { HTTPMethod, Methods } from '../typings/types';
import queryStringify from './helpers/queryString';

export default class HTTPTransport {
  public get:HTTPMethod = (url, options = {}) => {
    const { data } = options;
    const query = data ? url + queryStringify(data as {}) : url;
    return this._request(
      query,
      { ...options, method: Methods.GET },
      options.timeout,
    );
  };

  public put:HTTPMethod = (url, options = {}) => this._request(
    url,
    { ...options, method: Methods.PUT },
    options.timeout,
  );

  public post:HTTPMethod = (url, options = {}) => this._request(
    url,
    { ...options, method: Methods.POST },
    options.timeout,
  );

  public delete:HTTPMethod = (url, options = {}) => this._request(
    url,
    { ...options, method: Methods.DELETE },
    options.timeout,
  );

  private _request:HTTPMethod = (
    url,
    options = { method: Methods.GET },
    timeout = 5000,
  ) => {
    const { headers, method, data } = options;
    return new Promise((resolve, reject) => {
      if (!method) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('No method');
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === Methods.GET;

      xhr.open(method, url);

      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const headerName in headers) {
        xhr.setRequestHeader(headerName, headers[headerName] as string);
      }
      xhr.withCredentials = true;

      xhr.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          resolve(xhr);
        } else {
          reject(xhr);
        }
      };
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

import type { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders } from "axios";
import type { Options } from "vue-request";
import axios from "axios";
import { useRequest, setGlobalOptions } from "vue-request";
import { closeCdLoading, openCdLoading } from "./cdLoading";
import { cdNotifyError } from "./cdUI";
import { cdLogError } from "@cd_vuejs3/utils";

/**
 * https://github.com/attojs/vue-request
 * https://next.attojs.com/guide/introduction.html
 *
 * https://axios-http.com/docs/api_intro
 * https://github.com/axios/axios.git
 */
const service: AxiosInstance = axios.create({
  timeout: import.meta.env.REQUEST_TIMEOUT ?? 60_000
  // paramsSerializer: params => qs.stringify(params, { arrayFormat: "repeat", skipNulls: true })
});

service.interceptors.request.use(
  config => {
    if (!config.headers) {
      config["headers"] = {} as AxiosRequestHeaders;
    }
    config.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8;" }, config.headers);

    return config;
  },
  error => {
    cdLogError(error);
    throw Error(error);
  }
);

service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    cdLogError(error);
    throw Error(error);
  }
);

export type RequestCallback = {
  onSuccess?: Function;
  onFailed?: Function;
};

export type RequestOptions<R, P extends unknown[]> = {
  noLoading?: boolean | undefined;
  noError?: boolean | undefined;
  [args: string]: boolean | undefined;
} & Options<R, P>;

setGlobalOptions({
  manual: true
});

export function request<R, P extends unknown[] = []>(axiosConfig: (...args: P) => AxiosRequestConfig | Promise<AxiosRequestConfig>, options?: RequestOptions<R, P>): ReturnType<typeof useRequest<R, P>>;

export function request<R, P extends unknown[] = [], T extends boolean = boolean>(axiosConfig: (...args: P) => AxiosRequestConfig | Promise<AxiosRequestConfig>, options: RequestOptions<R, P>, returnAxios: T): T extends true ? (...args: P) => Promise<R> : ReturnType<typeof useRequest<R, P>>;

export function request<R, P extends unknown[] = [], T extends boolean = boolean, C extends RequestCallback = RequestCallback>(
  axiosConfig: (...args: P) => AxiosRequestConfig | Promise<AxiosRequestConfig>,
  options: RequestOptions<R, P>,
  returnAxios: T,
  callback?: C
): T extends true ? (...args: P) => Promise<R> : ReturnType<typeof useRequest<R, P>>;

export function request<R, P extends unknown[] = [], T extends boolean = boolean, C extends RequestCallback = RequestCallback>(axiosConfig: (...args: P) => AxiosRequestConfig | Promise<AxiosRequestConfig>, options?: RequestOptions<R, P>, returnAxios?: T, callback?: C) {
  const axiosService = async (...args: P): Promise<any> => {
    try {
      !options?.noLoading && Promise.resolve(undefined).then(openCdLoading);
      // eslint-disable-next-line no-restricted-syntax
      const { data: res } = await service(await axiosConfig(...args));
      !options?.noLoading && closeCdLoading();
      if (callback?.onSuccess && typeof callback.onSuccess === "function") {
        // return callback.onSuccess(res, ...args) as unknown as Promise<R>;
        callback.onSuccess(res, ...args);
      }
      return res as unknown as Promise<R>;
    } catch (error: any) {
      !options?.noLoading && closeCdLoading();
      !options?.noError && cdNotifyError(error?.message ?? error);
      if (callback?.onFailed && typeof callback.onFailed === "function") {
        callback.onFailed(error, ...args);
      } else {
        throw error;
      }
    }
  };

  return returnAxios ? axiosService : useRequest<R, P>(axiosService, options);
}

export default request;

import { notification } from "ant-design-vue";
import axios from "axios";

const cancelTokenSource = axios.CancelToken.source();

const commonAxios = axios.create({
  cancelToken: cancelTokenSource.token,
  baseURL: "http://219.255.6.129:23333",
});

commonAxios.interceptors.request.use(function (config): any {
  if (typeof window === undefined) {
    return;
  }

  // const cookies: Record<string, string> = cookie.parse(document?.cookie ?? '');

  // if (!cookies['access_token']) {
  //     const controller = new AbortController();

  //     const cfg = {
  //         ...config,
  //         signal: controller.signal,
  //     };

  //     return cfg;
  // }

  config.headers = Object.assign({}, config.headers, {
    "Content-Type": "application/json",
    // 'access_token': cookies['access_token'],
  });

  return config;
});

commonAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    console.log(error);
    console.error("error", error?.response);
    const errorCode = String(error?.response?.status ?? "");

    if (errorCode === "401") {
      notification.error({
        key: "error-notification",
        message: "토큰이 만료되었습니다. 로그인을 다시 해주세요.",
        description: errorCode,
      });
    } else if (errorCode === "403") {
      notification.error({
        key: "error-notification",
        message: "권한이 없습니다.",
        description: errorCode,
      });
    } else {
      notification.error({
        key: "error-notification",
        message: "API 에러 발생",
        description: errorCode,
      });
    }
    return Promise.reject(error);
  }
);

export default commonAxios;

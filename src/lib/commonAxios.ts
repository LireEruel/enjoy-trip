import { useUserStore } from "@/stores/user";
import { notification } from "ant-design-vue";
import axios from "axios";
import { useRouter } from "vue-router";

const cancelTokenSource = axios.CancelToken.source();
const router = useRouter();
const commonAxios = axios.create({
  cancelToken: cancelTokenSource.token,
  baseURL: "http://219.255.6.129:23333",
  //baseURL: "http://localhost:80",
});

commonAxios.interceptors.request.use(function (config): any {
  const userStore = useUserStore();
  if (typeof window === undefined) {
    return;
  }
  config.headers = Object.assign({}, config.headers, {
    "Content-Type": "application/json",
    Authorization: userStore.userInfo?.accessToken,
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

    if (errorCode === "403") {
      notification.error({
        key: "error-notification",
        message: "토큰이 만료되었습니다. 로그인을 다시 해주세요.",
        description: errorCode,
      });
      localStorage.clear();
      router.push({
        name: "home",
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

<template>
  <section id="auth" ref="root">
    <signup-form
      :on-loading-api="onLoadingApi"
      :sign-up-form-state="signUpFormState"
      @onSubmitSignUpFrom="onSubmitSignUpFrom"
      @turnToLogin="turnToLogin"
    >
    </signup-form>
    <login-form
      :on-loading-api="onLoadingApi"
      :loginFormState="loginFormState"
      @onSubmitLoginForm="onSubmitLoginForm"
      @turnToSignUp="turnToSignUp"
    ></login-form>

    <div id="slider"></div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { JoinUser, LoginUser, loginWithIdAndPassword } from "..";
import { requestSignUp } from "../api/signup";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { SignUpFormType, LoginType } from "../types";
import { LoginForm, SignupForm } from "../components";
import { useUserStore } from "../../../stores/user";

const router = useRouter();
const root = ref(null as HTMLElement | null);
const onLoadingApi = ref(false);
const userStore = useUserStore();

const signUpFormState = ref<SignUpFormType>({
  userId: "",
  userPass: "",
  userPassComfirm: "",
  userName: "",
  email: "",
  isValidId: false,
});

const loginFormState = ref<LoginType>({
  userId: "",
  userPass: "",
  remember: false,
});

const turnToSignUp = () => {
  if (root != null) {
    root.value?.classList.add("sign-up");
  }
};

const onSubmitLoginForm = async () => {
  onLoadingApi.value = true;
  const submitData: LoginUser = {
    userId: loginFormState.value.userId,
    userPass: loginFormState.value.userPass,
  };
  try {
    const res = await loginWithIdAndPassword(submitData);
    Swal.fire("Success!", "로그인 성공", "success").then(() => {
      userStore.userInfo = res;
      router.push("/");
    });
    console.log(res);
  } catch (e) {
    console.error(e);
  } finally {
    onLoadingApi.value = false;
  }
};

const onSubmitSignUpFrom = async () => {
  const splitedEmail = signUpFormState.value.email.split("@");
  onLoadingApi.value = true;

  const submitData: JoinUser = {
    userId: signUpFormState.value.userId,
    userPass: signUpFormState.value.userPass,
    userName: signUpFormState.value.userName,
    emailId: splitedEmail[0],
    emailDomain: splitedEmail[1],
  };
  try {
    await requestSignUp(submitData);
    Swal.fire("Success!", "Welcome our service!", "success").then(() => {
      signUpFormState.value.email = "";
      signUpFormState.value.isValidId = false;
      signUpFormState.value.userId = "";
      signUpFormState.value.userName = "";
      signUpFormState.value.userPass = "";
      signUpFormState.value.userPassComfirm = "";
      turnToLogin();
    });
  } catch (e) {
    console.error(e);
  } finally {
    onLoadingApi.value = false;
  }
};

const turnToLogin = () => {
  if (root != null) {
    root.value?.classList.remove("sign-up");
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Quattrocento+Sans&display=swap");
$root-height: calc(100vh - 110px);
#auth {
  width: 100%;
  height: $root-height;
  display: flex;
  align-items: center;

  flex-direction: row;
  font-family: "Quattrocento Sans";
  overflow: hidden;

  h2 {
    font-weight: bolder;
  }

  &.sign-up #slider {
    left: 50%;
  }

  .id-input-wrapper {
    display: flex;
    gap: 2%;
    align-items: center;
  }

  form {
    height: 100%;
    flex: 0 0 50%;
    padding: 0 10vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f2f2f7;
    .ant-input {
      padding: 0.5rem;
    }

    .submit-btn {
      width: 100%;
    }
  }
}

#slider {
  color: white;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: calc(100% - 40px);
  background-image: url("../asset/SliderBackground.jpg");
  background-attachment: fixed;
  background-size: 100vw;
  background-position: bottom;
  transition: left 300ms ease;
  clip-path: inset(0);

  & div {
    color: white;
    position: fixed;
    height: 100%;
    width: 50vw;
    padding: 50px;
    top: 0;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  #login-text {
    left: 0;
  }
  #sign-up-text {
    left: 50vw;
  }
}

.toggle {
  margin-top: 1rem;
  text-align: right;
  color: #757575;
  span {
    color: blue;
    cursor: pointer;
  }
}
</style>

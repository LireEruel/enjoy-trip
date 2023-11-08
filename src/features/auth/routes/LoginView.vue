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

    <div id="slider">
      <div id="login-text">
        <h1>Good to see you again</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <div id="sign-up-text">
        <h1>Welcome to the thing</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { JoinUser, LoginUser, loginWithIdAndPassword } from "..";
import { requestSignUp } from "../api/signup";
import Swal from "sweetalert2";
//import { useRouter } from "vue-router";
import { SignUpFormType, LoginType } from "../types";
import { LoginForm, SignupForm } from "../components";

//const router = useRouter();
const root = ref(null as HTMLElement | null);
const onLoadingApi = ref(false);

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
    await loginWithIdAndPassword(submitData);
    Swal.fire("Success!", "로그인 성공", "success").then(() => {
      //router.push("/");
      console.log(sessionStorage.length);
    });
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

#auth {
  width: 100%;
  height: 100%;
  display: flex;
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
    flex: 0 0 50%;
    padding: 10vh 10vw;
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
  height: 100vh;
  background-image: url(https://images.unsplash.com/photo-1533299346856-b1a85808f2ec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1489&q=80);
  background-attachment: fixed;
  background-size: 100vw;
  transition: left 300ms ease;
  clip-path: inset(0);

  &:before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: blue;
    opacity: 0.5;
  }

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

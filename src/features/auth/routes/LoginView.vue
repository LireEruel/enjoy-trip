<template>
  <section id="auth" ref="root">
    <a-form
      id="sign-up"
      :model="signUpFormState"
      name="basic"
      autocomplete="off"
      layout="vertical"
      @finish="onSubmitSignUpFrom"
      @finishFailed="onFinishFailed"
    >
      <h2>Sign up</h2>
      <a-form-item
        label="Id"
        name="userId"
        :rules="[{ required: true, message: 'Please input your userId!' }]"
      >
        <a-input v-model:value="signUpFormState.userId" />
      </a-form-item>

      <a-form-item
        label="Username"
        name="userName"
        :rules="[{ required: true, message: 'Please input your name!' }]"
      >
        <a-input v-model:value="signUpFormState.userName" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="userPass"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="signUpFormState.userPass" />
      </a-form-item>

      <a-form-item
        label="Password Confirm"
        name="userPassComfirm"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="signUpFormState.userPassComfirm" />
      </a-form-item>

      <a-form-item
        label="Email"
        name="email"
        :rules="[
          {
            required: true,
            type: 'email',
            message: 'Please input your email!',
          },
        ]"
      >
        <a-input v-model:value="signUpFormState.email" />
      </a-form-item>
      <a-form-item>
        <a-button
          :loading="onLoadingApi"
          type="primary"
          html-type="submit"
          class="submit-btn"
          >Sign up</a-button
        >
        <div class="toggle">
          Already have an account?
          <span @click="turnToLogin">Log in</span>
        </div>
      </a-form-item>
    </a-form>

    <a-form
      :model="loginFormState"
      @finish="onSubmitLoginForm"
      @finishFailed="onFinishFailed"
      name="loginForm"
      autocomplete="off"
      layout="vertical"
    >
      <h2>Log In</h2>
      <a-form-item
        label="Id"
        name="userId"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="loginFormState.userId" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="userPass"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="loginFormState.userPass" />
      </a-form-item>

      <a-form-item name="remember">
        <a-checkbox v-model:checked="loginFormState.remember"
          >로그인 상태 유지하기</a-checkbox
        >
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="submit-btn"
          >Submit</a-button
        >
        <div class="toggle">
          혹시 처음이신가요?
          <span @click="turnToSignUp">회원 가입</span>
        </div>
      </a-form-item>
    </a-form>

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
import { ref, reactive } from "vue";
import { JoinUser, LoginUser } from "..";
import { requestSignUp } from "../api/signup";
import { loginWithIdAndPassword } from "../api/login";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
const router = useRouter();
const root = ref(null as HTMLElement | null);
const onLoadingApi = ref(false);

type SigunUpType = {
  userId: String;
  userPass: String;
  userPassComfirm: String;
  userName: String;
  email: String;
};

type LoginType = {
  userId: String;
  userPass: String;
  remember: Boolean;
};

const signUpFormState = reactive<SigunUpType>({
  userId: "",
  userPass: "",
  userPassComfirm: "",
  userName: "",
  email: "",
});

const loginFormState = reactive<LoginType>({
  userId: "",
  userPass: "",
  remember: false,
});

const turnToSignUp = () => {
  if (root != null) {
    root.value?.classList.add("sign-up");
  }
};

const onSubmitLoginForm = async (values: LoginUser) => {
  onLoadingApi.value = true;
  const submitData: LoginUser = {
    userId: values.userId,
    userPass: values.userPass,
  };
  try {
    //await loginWithIdAndPassword(submitData);
    Swal.fire("Success!", "로그인 성공", "success").then(() => {
      router.push("/");
    });
  } catch (e) {
    console.error(e);
  } finally {
    onLoadingApi.value = false;
  }
};

const onSubmitSignUpFrom = async (values: SigunUpType) => {
  const splitedEmail = values.email.split("@");
  onLoadingApi.value = true;
  const submitData: JoinUser = {
    userId: values.userId,
    userPass: values.userPass,
    userName: values.userName,
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

const onFinishFailed = () => {
  Swal.fire("Failed!", "입력 형식을 다시 살펴봐주세요!", "warning");
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
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  font-family: "Quattrocento Sans";
  overflow: hidden;

  h2 {
    font-weight: bolder;
  }

  &.sign-up #slider {
    left: 50vw;
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
  width: 50vw;
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

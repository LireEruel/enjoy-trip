<template>
  <section id="auth" ref="root">
    <a-form
      id="sign-up"
      :model="formState"
      name="basic"
      autocomplete="off"
      layout="vertical"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Id"
        name="userId"
        :rules="[{ required: true, message: 'Please input your userId!' }]"
      >
        <a-input v-model:value="formState.userId" />
      </a-form-item>

      <a-form-item
        label="Username"
        name="userName"
        :rules="[{ required: true, message: 'Please input your name!' }]"
      >
        <a-input v-model:value="formState.userName" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="userPass"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.userPass" />
      </a-form-item>

      <a-form-item
        label="Password Confirm"
        name="userPassComfirm"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.userPassComfirm" />
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
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <button>Sign up</button>

      <div class="toggle">
        Already have an account?
        <span @click="turnToLogin">Log in</span>
      </div>
    </a-form>

    <form id="login">
      <h2>Log In</h2>
      <label>Username</label>
      <input type="text" placeholder="username" />
      <Label>Password</Label>
      <input type="password" placeholder="password" />
      <button>Log In</button>
      <div class="toggle">
        Have you been here before?
        <span @click="turnToSignUp">Sign up</span>
      </div>
    </form>

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

const root = ref(null as HTMLElement | null);

type SigunUpType = {
  userId: String;
  userPass: String;
  userPassComfirm: String;
  userName: String;
  email: String;
};

const formState = reactive<SigunUpType>({
  userId: "",
  userPass: "",
  userPassComfirm: "",
  userName: "",
  email: "",
});

const turnToSignUp = () => {
  if (root != null) {
    root.value?.classList.add("sign-up");
  }
};

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const turnToLogin = () => {
  if (root != null) {
    root.value?.classList.remove("sign-up");
  }
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Quattrocento+Sans&display=swap");

#auth {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  $gray: #b5b5b5;
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
    label {
      margin-bottom: 5px;
    }
    button,
    input {
      padding: 10px;
      margin-bottom: 15px;
      border-radius: 5px;
      font-size: 1.25rem;
      outline: none;
    }

    input {
      border: 1px solid $gray;
      transition: 125ms ease;
      &:focus {
        border-color: blue;
        box-shadow: 0 0 0 2pt rgba(blue, 0.3);
      }
    }

    button {
      color: white;
      border: none;
      margin-top: 20px;
      background: rgba(blue, 0.7);
      box-shadow: 0 3px 15px 5px rgba(black, 0.2);
      cursor: pointer;
      font-family: "Quattrocento Sans";
      transition: 75ms ease;

      &:active {
        background: blue;
        transform: scale(0.95);
      }
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
  text-align: center;
  color: #757575;
  span {
    color: blue;
    cursor: pointer;
  }
}
</style>

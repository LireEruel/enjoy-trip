<template>
  <a-form
    :model="props.loginFormState"
    @finish="emit('onSubmitLoginForm')"
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
      <a-input v-model:value="props.loginFormState.userId" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="userPass"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="props.loginFormState.userPass" />
    </a-form-item>

    <a-form-item name="remember">
      <a-checkbox v-model:checked="props.loginFormState.remember"
        >로그인 상태 유지하기</a-checkbox
      >
    </a-form-item>

    <a-form-item>
      <a-button
        type="primary"
        html-type="submit"
        class="submit-btn"
        :loading="onLoadingApi"
        >Submit</a-button
      >
      <div class="toggle">
        혹시 처음이신가요?
        <span @click="emit('turnToSignUp')">회원 가입</span>
      </div>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { LoginType } from "../types";
import Swal from "sweetalert2";

const props = defineProps<{
  loginFormState: LoginType;
  onLoadingApi: boolean;
}>();

const emit = defineEmits(["onSubmitLoginForm", "turnToSignUp"]);

const onFinishFailed = () => {
  Swal.fire("Failed!", "입력 형식을 다시 살펴봐주세요!", "warning");
};
</script>

<template>
  <a-form
    id="sign-up"
    :model="signUpFormState"
    name="basic"
    autocomplete="off"
    layout="vertical"
    @finish="emit('onSubmitSignUpFrom')"
    @finishFailed="onFinishFailed"
  >
    <h2>Sign up</h2>
    <a-form-item
      label="Id"
      name="userId"
      :rules="[{ required: true, message: 'Please input your userId!' }]"
    >
      <div class="id-input-wrapper">
        <a-input
          v-model:value="signUpFormState.userId"
          @change="onChangeInputId"
        />
        <a-button
          :loading="isLoadingIdConfirm"
          @action="loadIdConfirm"
          :disabled="isValidId"
        >
          아이디 확인
        </a-button>
      </div>
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
        <span @click="emit('turnToLogin')">Log in</span>
      </div>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";
import { SignUpFormType } from "../types";
import { checkDuplicateID } from "../api";
import Swal from "sweetalert2";

const isLoadingIdConfirm = ref(false);
const isValidId = ref(false);

const props = defineProps<{
  signUpFormState: SignUpFormType;
  onLoadingApi: boolean;
}>();

const emit = defineEmits(["onSubmitSignUpFrom", "turnToLogin"]);

const onChangeInputId = () => {
  isValidId.value = false;
};

const onFinishFailed = () => {
  Swal.fire("Failed!", "입력 형식을 다시 살펴봐주세요!", "warning");
};

const loadIdConfirm = async () => {
  isLoadingIdConfirm.value = true;
  try {
    await checkDuplicateID(props.signUpFormState.userId);
    isValidId.value = true;
  } catch (error) {
    isLoadingIdConfirm.value = false;
  } finally {
    isLoadingIdConfirm.value = false;
  }
};
</script>

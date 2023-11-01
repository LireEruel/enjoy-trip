<template>
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
      <div class="id-input-wrapper">
        <a-input
          v-model:value="signUpFormState.userId"
          @change="onChangeInputId"
        />
        <a-button
          :loading="isLoadingIdConfirm"
          @click="loadIdConfirm"
          :disabled="
            signUpFormState.userId.length == 0 || signUpFormState.isValidId
          "
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
const props = defineProps<{
  signUpFormState: SignUpFormType;
  onLoadingApi: boolean;
}>();

const emit = defineEmits(["onSubmitSignUpFrom", "turnToLogin"]);

const onChangeInputId = () => {
  props.signUpFormState.isValidId = false;
};

const onFinishFailed = () => {
  Swal.fire("Failed!", "입력 형식을 다시 살펴봐주세요!", "warning");
};

const loadIdConfirm = async () => {
  isLoadingIdConfirm.value = true;
  try {
    await checkDuplicateID(props.signUpFormState.userId);
    props.signUpFormState.isValidId = true;
  } catch (error) {
    Swal.fire("Failed!", "아이디가 중복되었습니다.", "warning");
    isLoadingIdConfirm.value = false;
  } finally {
    isLoadingIdConfirm.value = false;
  }
};

const onSubmitSignUpFrom = () => {
  if (props.signUpFormState.isValidId) {
    emit("onSubmitSignUpFrom");
  } else {
    Swal.fire("Failed!", "아이디 중복 확인을 해주세요!", "warning");
  }
};
</script>

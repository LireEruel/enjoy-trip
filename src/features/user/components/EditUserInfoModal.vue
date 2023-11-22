<template>
  <a-modal :open="open" footer="">
    <a-form
      id="sign-up"
      :model="editUserInfoForm"
      name="basic"
      autocomplete="off"
      layout="vertical"
      @finish="onSubmitFrom"
      @finishFailed="onFinishFailed"
    >
      <h2>유저 정보 수정</h2>

      <a-form-item
        label="Username"
        name="userName"
        :rules="[{ required: true, message: 'Please input your name!' }]"
      >
        <a-input v-model:value="editUserInfoForm.userName" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="userPass"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="editUserInfoForm.userPass" />
      </a-form-item>

      <a-form-item
        label="Password Confirm"
        name="userPassComfirm"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="editUserInfoForm.userPassComfirm" />
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
        <a-input v-model:value="editUserInfoForm.email" />
      </a-form-item>
      <div class="button-wrap">
        <a-button danger @click="emit('close')">삭제</a-button>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="submit-btn">
            수정
          </a-button>
        </a-form-item>
      </div>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { EditUserInfoParam } from "..";
import { ref } from "vue";
import Swal from "sweetalert2";

const { open } = defineProps<{ open: boolean }>();
const emit = defineEmits(["close", "submit"]);
const userInfo = useUserStore().userInfo;

type EditUserInfoFormType = {
  userPass: String;
  userPassComfirm: String;
  userName: String;
  email: String;
};

const editUserInfoForm = ref<EditUserInfoFormType>({
  userPass: "",
  userPassComfirm: "",
  userName: userInfo ? userInfo.userName : "",
  email: userInfo ? `${userInfo.emailId}@${userInfo.emailDomain}` : "",
});

const onSubmitFrom = () => {
  const splitedEmail = editUserInfoForm.value.email.split("@");

  const param: EditUserInfoParam = {
    cusNo: userInfo ? userInfo.cusNo : 0,
    userPass: editUserInfoForm.value.userPass,
    userName: editUserInfoForm.value.userName,
    emailId: splitedEmail[0],
    emailDomain: splitedEmail[1],
    profileImg: 0,
  };

  emit("submit", param);
};

const onFinishFailed = () => {
  Swal.fire("error", "입력값을 다시 확인해주세요.", "error");
};
</script>

<style scoped lang="scss">
.button-wrap {
  display: flex;
  gap: 1rem;
  justify-content: end;
}
</style>

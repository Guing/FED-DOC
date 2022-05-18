<template>
  <a-button v-if="!user.isLogin" type="primary" class="user-profile-component" @click="login">
    登录
  </a-button>
  <div v-else>
    <a-dropdown-button class="user-profile-component">
      <router-link to="/setting">{{ user.userName }}</router-link>
      <template #overlay>
        <a-menu class="user-profile-dropdown">
          <a-menu-item key="0" @click="logout">登出</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown-button>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { useStore } from 'vuex';
  import { UserProps } from '@/store/user';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  export default defineComponent({
    props: {
      user: {
        type: Object as PropType<UserProps>,
        required: true
      }
    },
    setup() {
      const store = useStore();
      const router = useRouter();
      const login = () => {
        store.commit('login');
        message.success('登录成功', 2);
      };
      const logout = () => {
        store.commit('logout');
        message.success('退出登录成功，2秒后跳转到首页', 2);
        setTimeout(() => {
          router.push('/');
        }, 2000);
      };
      return {
        login,
        logout
      };
    }
  });
</script>

<style lang="less" scoped>
  .user-profile-dropdown {
    border-radius: 2px !important;
  }
  .user-operation > * {
    margin-left: 30px !important;
  }
</style>

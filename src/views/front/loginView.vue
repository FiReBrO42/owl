<template>
  <form class="row mt-5">
    <div class="col-10 col-md-7 col-lg-4 d-flex login_container">
      <h2 class="fs-2 mb-3 mb-lg-6 login_title">登入</h2>
      <div class="mb-3 mb-lg-3 d-flex login_input_container">
        <label for="login_account" class="fs-5">帳號</label>
        <input
          type="text"
          id="login_account"
          class="mt-2"
          placeholder="請輸入email帳號"
          v-model="user.username"
        />
      </div>
      <div class="mb-4 mb-lg-5 d-flex login_input_container">
        <label for="login_password" class="fs-5">密碼</label>
        <input
          type="password"
          id="login_password"
          class="mt-2"
          placeholder="請輸入密碼"
          v-model="user.password"
        />
      </div>
      <button
        type="submit"
        class="fs-7 btn form_btn form_btn_submit login_btn"
        @click.prevent="login()"
      >
        登入
      </button>
    </div>
  </form>
</template>
<script>
const { VITE_APP_URL } = import.meta.env

export default {
  data() {
    return {
      user: {
        username: 'sam1246747@hotmail.com',
        password: '12332112As'
      }
    }
  },
  methods: {
    login() {
      const apiUrl = `${VITE_APP_URL}/v2/admin/signin`

      this.$http
        .post(apiUrl, this.user)
        .then((res) => {
          const { token, expired } = res.data

          // 設定cookie
          document.cookie = `owl=${token}; expires=${expired}`
          this.$swal(res.data.message).then(() => {
              this.$router.push('/admin/adminRestaurants')
          })

        })
        .catch(() => {
          this.$swal('請確認帳號密碼是否正確')
        })
    }
  },
  mounted() {

  }
}
</script>

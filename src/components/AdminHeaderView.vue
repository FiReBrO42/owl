<template>
  <header class="row d-flex header_container mb-3">
    <div class="col-3 col-lg-2 col-lg-1">
      <h1 class="header_logo admin_header_logo">
        <router-link to="/"> Home </router-link>
      </h1>
    </div>
    <div class="col-8 col-lg-3 col-lg-3 header_menu_btn admin_header_menu_btn">
      <router-link class="fs-7" to="/admin/adminRestaurants">餐廳</router-link>
      <router-link class="fs-7" to="/admin/adminViewpoints">景點</router-link>
      <router-link class="fs-7" to="/" @click.prevent="logout()">登出</router-link>
    </div>
  </header>
</template>

<script>
const { VITE_APP_URL } = import.meta.env
export default {
  data() {
    return {
      hamMenuActive: false
    }
  },
  methods: {
    logout() {
      const apiUrl = `${VITE_APP_URL}/v2/logout`
      this.$http.post(apiUrl).then(() => {
        this.$swal('登出成功')
      })
    }
  }
}
</script>

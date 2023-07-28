<template>
  <header class="row d-flex header_container mb-3">
    <div class="col-3 col-lg-2 col-lg-1">
      <h1 class="header_logo">
        <router-link to="/"> Home </router-link>
      </h1>
    </div>
    <div class="col-6 col-lg-3 col-lg-3 header_menu_btn">
      <router-link to="/login">後台登入</router-link>
      <a href="javascript:void(0)" class="fs-8" @click="hamMenuSwitch()">MENU</a>
    </div>
  </header>
  <div class="ham_menu_container" :class="{ show: hamMenuActive }">
    <div class="container h-100">
      <div class="row d-flex">
        <!-- 懸浮按鈕 -->
        <div class="col-5 col-lg-2 ham_menu_link_container">
          <router-link class="fs-1" to="/viewpoints" @click="hamMenuSwitch()">景點</router-link>
        </div>
        <div class="col-5 col-lg-2 ham_menu_link_container">
          <router-link class="fs-1" to="/restaurants" @click="hamMenuSwitch()">餐廳</router-link>
        </div>
        <div class="col-5 col-lg-2 ham_menu_link_container">
          <router-link class="fs-1" to="/feedbackForm" @click="hamMenuSwitch()"
            >推薦回饋</router-link
          >
        </div>
        <!-- 關閉按鈕 -->
        <div class="col-2 col-lg-1 me-4 me-lg-0 mt-3 ">
          <button type="button" class="btn btn_close" @click="hamMenuSwitch()">
            <span class="material-icons"> close </span>
          </button>
        </div>
        <!-- LOGO圖 -->
        <div class="col-6 col-lg-3 ham_menu_logo">
          <router-link to="/" @click="hamMenuSwitch()">
            <img src="/img/common/icon_logo_white.png" alt="Logo圖" />
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
    return {
      hamMenuActive: false
    }
  },
  methods: {
    hamMenuSwitch() {
      this.hamMenuActive = !this.hamMenuActive
    }
  }
}
</script>

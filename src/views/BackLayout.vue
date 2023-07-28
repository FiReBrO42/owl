<template>
    <AdminHeaderView/>
    <RouterView></RouterView>
      <FooterView/>
  </template>
  
  <script>
  // 引入 RouterView
  import { RouterView } from 'vue-router'
  import AdminHeaderView from '@/components/AdminHeaderView.vue';
  import FooterView from '@/components/FooterView.vue';
  
  export default {
    components: {
      RouterView,AdminHeaderView,FooterView
    },
  }
  </script>
  
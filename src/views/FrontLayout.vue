<template>
  <HeaderView/>
  <RouterView></RouterView>
  <FooterView/>
</template>

<script>
// 引入 RouterView
import { RouterView } from 'vue-router'
import HeaderView from '@/components/HeaderView.vue';
import FooterView from '@/components/FooterView.vue';

export default {
  components: {
    RouterView,HeaderView,FooterView
  },
}
</script>

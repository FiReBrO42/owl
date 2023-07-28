<template>
  <swiper
    :slides-per-view="1"
    :space-between="50"
    :modules="modules"
    :thumbs="{ swiper: thumbsSwiper }"
    
    class="myThumbsSwiper"
  >
    <swiper-slide v-for="(item, index) in thumbsImages" :key="index">
      <img :src="item.imageUrl" :alt="item.imgAlt" />
    </swiper-slide>

  </swiper>
  <swiper
    class="myThumbsList"
    ref="myThumbsList"
    :modules="modules"
    watch-slides-progress
    :slides-per-view="4"
    :space-between="20"
    :freeMode="true"
    @swiper="setThumbsSwiper"
    :breakpoints="{
      '768': {
        slidesPerView: 4,
        spaceBetween: 32,
      },
    }"
  >
    <swiper-slide v-for="(item, index) in thumbsImages" :key="index">
      <img :src="item.imageUrl" :alt="item.imgAlt" />
    </swiper-slide>
  </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Thumbs, FreeMode } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/thumbs'

export default {
  props: ['thumbsImages'],
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      thumbsSwiper: '',
      modules: [Thumbs, FreeMode],
      // 將 props 資料複製到本地資料
    }
  },
  methods: {
    setThumbsSwiper() {
      // 取得該元素 的 swiper ，賦予給 thumbsSwiper ，使其更新
      const myThumbsList = document.querySelector('.myThumbsList')
      this.thumbsSwiper = myThumbsList.swiper
    }
  },
  mounted() {
  },
}
</script>

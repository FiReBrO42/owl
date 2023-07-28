<template>
  <div class="swiper_title_container d-flex">
    <h5 class="swiper_title">精選</h5>
    <div class="btn_swiper_switch_container d-flex">
      <button
        type="button"
        class="btn btn_swiper_switch"
        @click="swiperSwitch()"
        :class="{ active: swiperStates }"
        :disabled="swiperStates"
      >
        <h5>景點</h5></button
      ><button
        type="button"
        class="btn btn_swiper_switch"
        @click="swiperSwitch()"
        :class="{ active: !swiperStates }"
        :disabled="!swiperStates"
      >
        <h5>餐廳</h5>
      </button>
    </div>
  </div>
  <swiper
    :slidesPerView="2"
    :spaceBetween="16"
    :navigation="true"
    :modules="modules"
    class="mySwiper"
    :breakpoints="{
      '768': {
        slidesPerView: 3,
        spaceBetween: 16
      },
      '1024': {
        slidesPerView: 5,
        spaceBetween: 18.8
      }
    }"
  >
      <swiper-slide v-show="swiperStates === true" v-for="item in renderViewpoint" :key="item.id">
        <router-link :to="'viewpoint/' + item.id">
          <div class="mySwiper_content_img_container">
            <img :src="item.imagesUrl[0].imageUrl" :alt="item.imagesUrl[0].imageAlt" />
          </div>
          <p class="fs-7 mt-2 mySwiper_content_sub">{{ item.title }}</p>
        </router-link>
      </swiper-slide>

      <swiper-slide v-show="swiperStates === false" v-for="item in renderRestaurant" :key="item.id">
        <router-link :to="'restaurant/' + item.id">
          <div class="mySwiper_content_img_container">
            <img :src="item.imagesUrl[0].imageUrl" :alt="item.imagesUrl[0].imageAlt" />
          </div>
          <p class="fs-7 mt-2 mySwiper_content_sub">{{ item.title }}</p>
        </router-link>
      </swiper-slide>

  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue'

// Import Swiper styles
import 'swiper/css'

import 'swiper/css/navigation'

import './scss/_mySwiper.scss'

// import required modules
import { Navigation } from 'swiper/modules'
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      modules: [Navigation],
      swiperStates: true,
      getProductsList: [],
      renderRestaurant: [],
      renderViewpoint: []
    }
  },
  methods: {
    swiperSwitch() {
      this.swiperStates = !this.swiperStates

      const mySwiperRef = document.querySelector('.mySwiper').swiper
      mySwiperRef.slideTo(0)
    },
    // 取得產品，渲染並能篩選
    getProductsApi() {
      const apiUrl = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products/all`

      this.$http.get(apiUrl).then((res) => {
        // 將API取得資料賦予到該物件
        this.getProductsList = res.data.products
        this.classifyProduct('餐廳')
        this.classifyProduct('景點')
      })
    },
    classifyProduct(categoryName) {
      if (categoryName === '餐廳') {
        this.renderRestaurant = this.getProductsList.filter((item) => {
          return item.category === categoryName
        })
      } else if (categoryName === '景點') {
        this.renderViewpoint = this.getProductsList.filter((item) => {
          return item.category === categoryName
        })
      }
    }
  },
  mounted() {
    this.getProductsApi()
  }
}
</script>

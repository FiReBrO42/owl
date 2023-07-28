<template>
  <div class="row d-flex title_container viewpoints_top_container">
    <div class="col-12 mb-3">
      <h2 class="fs-2 fw-bold">{{ renderProductsList.title }}</h2>
    </div>
  </div>
  <div class="row d-flex product_container">
    <div class="col-12 col-lg-5">
      <ThumbsSwiper :thumbsImages="renderProductsList.imagesUrl" />
    </div>
    <div class="col-11 col-lg-7 d-flex product_content_container">
      <div class="product_content">
        <h5 class="fs-5">簡介</h5>
      </div>
      <div class="d-flex mt-2 product_content_group">
        <div class="product_content_txt">
          <p class="fs-7 product_content_sub">
            {{ renderProductsList.content }}
          </p>
        </div>
      </div>
      <div class="d-flex mt-7 product_content_group">
        <div class="me-0 me-lg-3 product_content_time_group">
          <div class="product_content_title">
            <h5 class="fs-5 me-4">營業時間</h5>
          </div>
          <div class="product_content_txt">
            <p class="fs-7">{{ openTimes }}</p>
          </div>
        </div>
        <div class="mt-2 mt-lg-0  product_content_time_group">
          <div class=" product_content_title ">
            <h5 class="fs-5 me-4">公休時間</h5>
          </div>
          <div class="product_content_txt">
            <p class="fs-7">{{publicHoliday}}</p>
          </div>
        </div>
      </div>
      <div class="d-flex mt-2 product_content_group">
        <div class="product_content_title">
          <h5 class="fs-5 me-4">地理位置</h5>
        </div>
        <div class="product_content_txt">
          <p class="fs-7">{{ renderProductsList.address }}</p>
        </div>
      </div>
      <div class="mt-2 product_content_googleMap">
        <iframe
          :src="renderProductsList.googleMapUrl"
          width="100%"
          height="100%"
          style="border: 0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env
import ThumbsSwiper from '@/components/ThumbsSwiper.vue'

export default {
  components: {
    ThumbsSwiper
  },
  data() {
    return {
      productId: '',
      // 產品列表
      // 因此處是採用陣列，props時要注意 [0]
      renderProductsList: {},
      openTimes:'',
      publicHoliday:''
    }
  },
  /*   watch: {
    '$route': 'renderProduct', // 監聽路由變化，更新資料
  },
  created() {
    this.renderProduct(); // 初始化時更新資料
  }, */
  methods: {
    // 取得產品，渲染並能篩選
    getProductsApi(id) {
      const apiUrl = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`

      this.$http.get(apiUrl).then((res) => {
        // 將API取得資料賦予到該物件
        this.renderProductsList = res.data.product
        this.openTimes = res.data.product.time.openTimes
        this.publicHoliday = res.data.product.time.publicHoliday

      })
    },
    getProductId() {
      this.productId = this.$route.params.id
      this.getProductsApi(this.productId)
    }
  },
  mounted() {
    this.getProductId()
  }
}
</script>

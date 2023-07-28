<template>
  <div class="row d-flex viewpoints_top_container">
    <div class="col-3 col-lg-2">
      <h2 class="fs-2 fw-bold">景點</h2>
    </div>
    <div class="col-5 col-lg-3 col-lg-2 viewpoints_area_container">
      <select
        name="timeSort"
        id="timeSort"
        class="fs-7 py-2 ps-3 ps-lg-6"
        v-model="sortStyle"
        @change="renderProduct()"
      >
        <option class="custom_option" selected value="asc">新增時間舊到新</option>
        <option class="custom_option" value="desc">新增時間新到舊</option>
      </select>
    </div>
  </div>
  <ul class="row mt-6 mt-lg-3 viewpoints_list">
    <template v-for="item in renderProductsList" :key="item.id">
      <li class="mb-3 mb-lg-6 viewpoints_list_content">
        <router-link :to="'viewpoint/'+item.id">
          <figure class="viewpoints_list_content_img">
            <img :src="item.imagesUrl[0].imageUrl" :alt="item.imagesUrl[0].imageAlt" />
            <div class="viewpoints_list_content_infoTime">
              <p class="fs-7">營業時間</p>
              <p class="fs-7">{{ item.time.openTimes }}</p>
              <p class="fs-7">{{ item.time.publicHoliday }}</p>
            </div>
          </figure>
          <div class="viewpoints_list_content_name">
            <h5 class="fs-6">{{ item.title }}</h5>
          </div>
        </router-link>
      </li>
    </template>
  </ul>
  <div class="row viewpoints_pagination_container">
    <nav aria-label="Page navigation example" class="col-12 d-flex">
      <ul class="pagination d-flex">
        <li class="page-item" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link previous"
            href="#"
            aria-label="Previous"
            @click.prevent="getProductsApi(pagination.current_page - 1)"
          >
            <span class="material-icons"> arrow_back_ios_new </span>
          </a>
        </li>
        <li
          class="page-item"
          :class="{ active: page === pagination.current_page }"
          v-for="page in pagination.total_pages"
          :key="page + 'page'"
        >
        <a class="page-link" href="#" @click.prevent="getProductsApi(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link next"
            href="#"
            aria-label="Next"
            @click.prevent="getProductsApi(pagination.current_page + 1)"
          >
            <span class="material-icons"> arrow_forward_ios </span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data() {
    return {
      sortStyle: 'asc',
      // 產品API列表
      getProductsList: [],
      // 產品列表
      renderProductsList: [],
      // 分頁內容
      pagination: {
        total_pages: 0,
        current_page: 0,
        has_pre: false,
        has_next: false,
        category: ''
      }
    }
  },
  methods: {
    // 取得產品，渲染並能篩選
    getProductsApi(page = 1, category = '景點') {
      const apiUrl = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/products?page=${page}&category=${category}`

      this.$http.get(apiUrl).then((res) => {
        // 將API取得資料賦予到該物件
        this.getProductsList = res.data.products
        this.pagination = res.data.pagination
        this.renderProduct()
      })
    },
    renderProduct() {
      if (this.sortStyle === 'asc') {
        this.renderProductsList = [...this.getProductsList].sort((a, b) => {
          const indexA = this.getProductsList.indexOf(a)
          const indexB = this.getProductsList.indexOf(b)
          return indexA - indexB
        })
      } else if (this.sortStyle === 'desc') {
        this.renderProductsList = [...this.getProductsList].sort((a, b) => {
          const indexA = this.getProductsList.indexOf(a)
          const indexB = this.getProductsList.indexOf(b)
          return indexB - indexA
        })
      }
    }
  },
  mounted() {
    this.getProductsApi()
  }
}
</script>

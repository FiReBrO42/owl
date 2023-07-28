<template>
  <div class="row d-flex viewpoints_top_container admin_top_container">
    <div class="col-3 col-lg-2">
      <h2 class="fs-2 fw-bold">餐廳</h2>
    </div>
    <div class="col-6 col-lg-3 col-lg-2 viewpoints_area_container">
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
  <div class="d-none d-lg-flex row pt-5 pb-2 admin_title_container">
    <div class="col-1 admin_title_type">
      <h5 class="fs-5">類別</h5>
    </div>
    <div class="col-1 admin_title_type">
      <h5 class="fs-5">縮圖</h5>
    </div>
    <div class="col-2 admin_title_type">
      <h5 class="fs-5">名稱</h5>
    </div>
    <div class="col-2 admin_title_type">
      <h5 class="fs-5">時間</h5>
    </div>
    <div class="col-2 admin_title_type">
      <h5 class="fs-5">地點</h5>
    </div>
  </div>
  <ul class="row admin_content_list_container">
    <template v-for="item in renderProductsList" :key="item.id">
      <li class="d-flex col-6 col-lg-12 py-4 px-0 col12 admin_content_list">
        <div class="col-1 d-flex admin_content_type">
          <h4 class="fs-7 d-block d-lg-none me-3">類別:</h4>
          <h5 class="fs-7">{{ item.category }}</h5>
        </div>
        <div class="col-1 d-flex admin_content_img">
          <h4 class="fs-7 d-block d-lg-none me-3">縮圖:</h4>
          <img :src="item.imagesUrl[0].imageUrl" :alt="item.imagesUrl[0].imageAlt" />
        </div>
        <div class="col-2 d-flex admin_content_name">
          <h4 class="fs-7 d-block d-lg-none me-3">名稱:</h4>
          <h5 class="fs-7">{{ item.title }}</h5>
        </div>
        <div class="col-2 d-none d-lg-flex admin_content_openTimes">
          <h5 class="fs-7">{{ item.time.openTimes }}</h5>
        </div>
        <div class="col-2 d-none d-lg-flex admin_content_address">
          <h5 class="fs-7">{{ item.address }}</h5>
        </div>
        <div class="d-flex admin_content_btn">
          <button
            type="button"
            class="fs-7 btn form_btn admin_content_btn_edit"
            @click="openModal(item)"
          >
            編輯
          </button>
          <button
            type="button"
            class="fs-7 btn form_btn admin_content_btn_del"
            @click="del(item.id)"
          >
            刪除
          </button>
        </div>
      </li>
    </template>
  </ul>
  <div
    class="row mt-6 viewpoints_pagination_container admin_pagination_container"
    v-if="pagination.total_pages !== 0"
  >
    <nav aria-label="Page navigation example" class="col-12 d-flex">
      <ul class="pagination d-flex">
        <!-- 上一頁 -->
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
        <!-- 頁碼 -->
        <li
          class="page-item"
          :class="{ active: page === pagination.current_page }"
          v-for="page in pagination.total_pages"
          :key="page + 'page'"
        >
          <a class="page-link" href="#" @click.prevent="getProductsApi(page)">{{ page }}</a>
        </li>
        <!-- 下一頁 -->
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

  <!-- Modal -->
  <div
    class="modal fade"
    id="editModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title fs-2" id="exampleModalLabel">
            {{ editTemplateProduct.title }}
          </h2>
          <label for="input_is_enabled">
            <input
              type="checkbox"
              id="input_is_enabled"
              name="is_enabled"
              v-model="editTemplateProduct.is_enabled"
              :checked="editTemplateProduct.is_enabled"
              @change="updateIsEnabled()"
            />
            啟用
          </label>
        </div>
        <div class="modal-body row d-flex">
          <div class="col-12 col-lg-6 d-flex form_txtInput_container">
            <div class="d-flex form_txtInput_label_container">
              <div class="mb-3 mb-lg-2 form_txtInput_label form_txtInput_label_type_container fs-5">
                <h5 class="fs-5 me-4 me-lg-0">類別</h5>
                <div class="mt-0 mt-lg-3 d-flex input_type_container">
                  <label for="input_type_restaurant" class="d-flex">
                    <input
                      name="input_type"
                      type="radio"
                      id="input_type_restaurant"
                      class="mt-2 form_radio"
                      placeholder="餐廳"
                      v-model="editTemplateProduct.category"
                      value="餐廳"
                    />
                    <span class="material-icons material-icons_radio">
                      radio_button_unchecked
                    </span>
                    餐廳
                  </label>
                  <label for="input_type_viewpoint" class="d-flex">
                    <input
                      name="input_type"
                      type="radio"
                      id="input_type_viewpoint"
                      class="mt-2 form_radio"
                      placeholder="景點"
                      v-model="editTemplateProduct.category"
                      value="景點"
                    />
                    <span class="material-icons material-icons_radio">
                      radio_button_unchecked
                    </span>
                    景點
                  </label>
                </div>
              </div>
              <label
                for="input_openTimes"
                class="mb-3 mb-lg-2 form_txtInput_label form_txtInput_label_time fs-5"
              >
                營業時間
                <input
                  type="text"
                  id="input_openTimes"
                  class="mt-2 form_txtInput form_txtInput_txt"
                  placeholder="格式為24小時制:07:00-21:00"
                  v-model="editTemplateProduct.time.openTimes"
                />
              </label>
            </div>
            <div class="d-flex form_txtInput_label_container">
              <label for="input_address" class="mb-3 mb-lg-2 form_txtInput_label fs-5">
                地點
                <input
                  type="text"
                  id="input_address"
                  class="mt-2 form_txtInput form_txtInput_txt"
                  placeholder="例如:438台中市外埔區溪底路26號 "
                  v-model="editTemplateProduct.address"
                />
              </label>
              <label
                for="input_publicHoliday"
                class="mb-3 mb-lg-2 input_publicHoliday form_txtInput_label form_txtInput_label_time fs-5"
              >
                公休時間
                <input
                  type="text"
                  id="input_publicHoliday"
                  class="mt-2 form_txtInput form_txtInput_txt"
                  placeholder="輸入公休日"
                  v-model="editTemplateProduct.time.publicHoliday"
                />
              </label>
            </div>
            <div class="mt-0 mt-lg-3">
              <h5 class="fs-5 mb-0 mb-lg-2 form_imageInput_container_title">圖片上傳</h5>
              <ul class="imageInput_list_container mt-2 mt-lg-3">
                <template v-for="(item, index) in editTemplateProduct.imagesUrl" :key="index">
                  <li class="imageInput_list_img_container">
                    <img :src="item.imageUrl" :alt="item.imageAlt" />
                  </li>
                </template>
              </ul>
              <label for="input_imgUrl" class="mt-3 mt-lg-2 imageInput_imgUrl_label">
                <input
                  type="text"
                  id="input_imgUrl"
                  class="imageInput_imgUrl"
                  placeholder="請輸入圖片連結"
                  v-model="imageUpdateUrl"
                />
              </label>
              <div class="mt-3 d-flex imageInput_imgUrl_btn_container">
                <label for="fileInput" class="btn imageInput_imgUrl_btn_file_label"
                  >本地檔案上傳</label
                >
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  class="form_btn imageInput_imgUrl_btn_file"
                  @change="updateLocalImageAPI"
                />
                <button
                  type="button"
                  class="btn form_btn imageInput_imgUrl_btn_sure"
                  @click="updateImage()"
                >
                  確定新增</button
                ><button
                  type="button"
                  class="btn form_btn imageInput_imgUrl_btn_del"
                  @click="deleImg()"
                >
                  刪除圖片
                </button>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-5 d-flex form_imageInput_container">
            <label for="input_sub" class="d-flex mt-0 form_txtInput_label fs-5">
              簡介
              <textarea
                name=""
                id="input_sub"
                class="mt-2 form_txtInput form_txtInput_textarea"
                cols="100%"
                rows="30vh"
                placeholder="說明文字...."
                v-model="editTemplateProduct.content"
              ></textarea>
            </label>
          </div>
        </div>
        <div class="mt modal-footer">
          <button
            type="button"
            @click="hideModal()"
            class="fs-7 btn form_btn admin_content_btn_del"
          >
            關閉
          </button>
          <button
            type="button"
            class="fs-7 btn form_btn admin_content_btn_edit"
            @click="submitModal(editTemplateProduct.id)"
          >
            修改發佈
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from 'bootstrap'
const { VITE_APP_URL, VITE_APP_PATH, VITE_APP_TOKEN } = import.meta.env

export default {
  data() {
    return {
      sortStyle: 'asc',
      myModal: null,
      // 單產品內容
      editTemplateProduct: {
        id: '',
        unit: '',
        origin_price: '',
        price: '',
        category: '',
        title: '',
        time: {
          openTimes: '',
          publicHoliday: ''
        },
        address: '',
        content: '',
        imagesUrl: [
          {
            imageUrl: '',
            imageAlt: '',
            timeStamp: ''
          }
        ],
        googleMapUrl: ''
      },
      // 產品API列表
      getProductsList: [],
      // 產品列表
      renderProductsList: [],
      imageUpdateUrl: '',
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
    openModal(itemContent) {
      this.myModal.show()
      this.editTemplateProduct = itemContent
    },
    hideModal() {
      this.myModal.hide()
    },
    submitModal(id) {
      const apiUrl = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/product/${id}`

      const data = {
        data: this.editTemplateProduct
      }

      this.$http
        .put(apiUrl, data)
        .then((res) => {
          this.getProductsApi(this.pagination.current_page, '餐廳')
          this.$swal(res.data.message).then(() => {
            this.myModal.hide()
          })
        })
        .catch((err) => {
          this.$swal(err.data.message).then(() => {
            this.myModal.hide()
          })
        })
    },
    del(id) {
      const apiUrl = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/product/${id}`

      this.$swal({
        title: '確定刪除嗎?',
        text: '你將會無法恢復資料!!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '#BB8D74',
        cancelButtonColor: '#919191',
        confirmButtonText: '確定刪除!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.$http
            .delete(apiUrl)
            .then((res) => {
              this.$swal('完成', `${res.data.message}`, 'success')
              this.getProductsApi(this.pagination.current_page, '餐廳')
            })
            .catch((err) => {
              this.$swal('錯誤', `${err.data.message}`, 'error')
            })
        }
      })
    },
    // 取得產品，渲染並能篩選
    getProductsApi(page = 1, category = '餐廳') {
      const apiUrl = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/products?page=${page}&category=${category}`

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
    },
    // 驗證登入
    check() {
      const apiUrl = `${VITE_APP_URL}/v2/api/user/check`
      this.$http
        .post(apiUrl)
        .then(() => {
          this.getProductsApi()
        })
        .catch(() => {
          alert('驗證失敗，請重新登入')
          this.$router.push('/login')
        })
    },
    updateLocalImageAPI(event) {
      // 將本地圖片上傳，然後將連結放入imageUpdateUrl ，並渲染到大張首圖
      // 取得檔案資料
      const file = event.target.files[0]
      // 檢查獲取檔案型別，並驗證是否符合條件
      const fileType = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase()

      if (fileType !== 'jpg' && fileType !== 'png') {
        alert('上傳檔案只能是 jpg、png 格式!，請注意格式上傳呦')
        return
      }

      // 創建包含表單數據的 formData物件
      const formData = new FormData()
      // 添加 key 與 檔案
      formData.append('file-to-upload', file)
      // 使用 API
      const apiUrl = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/upload`
      this.$http
        .post(apiUrl, formData)
        .then((res) => {
          // 取得回傳的圖片連結
          this.imageUpdateUrl = res.data.imageUrl
          this.$swal('成功',res.data.message,'success')
        })
        .catch((err) => {
          this.$swal('錯誤',err.data.message,'error')
        })
    },
    updateImage() {
      // 確定新增，推入imageArray，並重新渲染到下方小圖之中，空值不能新增
      const obj = {
        imageUrl: this.imageUpdateUrl,
        imageAlt: this.editTemplateProduct.title + '圖片',
        timeStamp: Date.now()
      }
      // 將obj 物件 推入到 imageArray 中
      this.editTemplateProduct.imagesUrl.push(obj)
    },
    deleImg() {
      //  刪除imageArray最後一張圖片(陣列從後面排列)，更新渲染陣列imagesRender
      this.editTemplateProduct.imagesUrl.pop()
    }
  },
  mounted() {
    // 宣告在data中，並在組件渲染到DOM後，初始化myModal
    this.myModal = new Modal(document.querySelector('#editModal'))

    // 設定this.$http header全域默認設定
    this.$http.defaults.headers.common.Authorization = `${VITE_APP_TOKEN}`

    this.check()
  }
}
</script>

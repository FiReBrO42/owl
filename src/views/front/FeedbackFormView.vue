<template>
  <div class="row mb-3 mt-6 mt-lg-0">
    <h2 class="fs-2 fw-bold">推薦回饋表</h2>
  </div>
  <div class="row">
    <form class="container form_container" @submit.prevent="formSubmit()">
      <div class="row d-flex form_container_layout">
        <div class="col-12 col-lg-6 d-flex form_txtInput_container">
          <div class="d-flex form_txtInput_label_container">
            <label for="input_name" class="form_txtInput_label form_txtInput_label_name fs-5">
              名稱
              <input
                type="text"
                id="input_name"
                class="mt-2 form_txtInput form_txtInput_txt"
                placeholder="例如:忘憂谷"
                v-model="form.title"
                required="required"
              />
            </label>
            <div class="form_txtInput_label form_txtInput_label_type_container fs-5">
              <h5 class="fs-5">類別</h5>
              <div class="mt-3 d-flex input_type_container">
                <label for="input_type_restaurant" class="d-flex">
                  <input
                    name="input_type"
                    type="radio"
                    id="input_type_restaurant"
                    class="mt-2 form_radio"
                    placeholder="餐廳"
                    value="餐廳"
                    v-model="form.category"
                    :checked="form.category === '餐廳'"
                    required="required"
                  />
                  <span class="material-icons material-icons_radio"> radio_button_unchecked </span>
                  餐廳
                </label>
                <label for="input_type_viewpoint" class="d-flex">
                  <input
                    name="input_type"
                    type="radio"
                    id="input_type_viewpoint"
                    class="mt-2 form_radio"
                    placeholder="景點"
                    value="景點"
                    v-model="form.category"
                    required="required"
                  />
                  <span class="material-icons material-icons_radio"> radio_button_unchecked </span>
                  景點
                </label>
              </div>
            </div>
          </div>
          <div class="d-flex form_txtInput_label_container">
            <label for="input_openTimes" class="form_txtInput_label form_txtInput_label_time fs-5">
              營業時間
              <input
                type="text"
                id="input_openTimes"
                class="mt-2 form_txtInput form_txtInput_txt"
                placeholder="格式為24小時制:07:00-21:00"
                v-model="form.time.openTimes"
                required="required"
              />
            </label>
            <label
              for="input_publicHoliday"
              class="input_publicHoliday form_txtInput_label form_txtInput_label_time fs-5"
            >
              公休時間
              <input
                type="text"
                id="input_publicHoliday"
                class="mt-2 form_txtInput form_txtInput_txt"
                placeholder="例如:公休一/無公休日"
                v-model="form.time.publicHoliday"
                required="required"
              />
            </label>
          </div>
          <div class="mt-3 mt-lg-0 d-flex input_address_label_container">
            <label for="input_address" class="form_txtInput_label fs-5">
              地點
              <input
                type="text"
                id="input_address"
                class="mt-2 form_txtInput form_txtInput_txt"
                placeholder="例如:438台中市外埔區溪底路26號 "
                v-model="form.address"
                @change="googleMapApi()"
                required="required"
              />
            </label>
            <div class="address_content_googleMap_container">
              <iframe
                id="address_content_googleMap"
                :src="form.googleMapUrl"
                width="100%"
                height="100%"
                style="border: 0"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <label for="input_sub" class="mt-3 mt-lg-0 form_txtInput_label fs-5">
            簡介
            <textarea
              name=""
              id="input_sub"
              class="mt-2 form_txtInput form_txtInput_textarea"
              cols="100%"
              rows="30vh"
              placeholder="說明文字...."
              v-model="form.content"
              required="required"
            ></textarea>
          </label>
        </div>
        <div class="col-12 col-lg-1 my-3 my-lg-0 d-flex form_divide_container">
          <span class="form_divide"></span>
        </div>
        <div class="col-12 col-lg-5 d-flex form_imageInput_container">
          <h5 class="fs-5 mb-2 form_imageInput_container_title">圖片上傳</h5>
          <figure class="imageInput_img_container">
            <img :src="imageUpdateUrl" alt="圖片" />
          </figure>
          <ul class="imageInput_list_container mt-3">
            <template v-for="(imagesRender, index) in imagesRender" :key="index">
              <li class="imageInput_list_img_container">
                <img :src="imagesRender.imageUrl" :alt="imagesRender.imageAlt" />
              </li>
            </template>
          </ul>
          <label for="input_imgUrl" class="mt-3 imageInput_imgUrl_label">
            <input
              type="text"
              id="input_imgUrl"
              class="imageInput_imgUrl"
              placeholder="請輸入圖片連結"
              v-model="imageUpdateUrl"
            />
          </label>
          <div class="mt-2 d-flex imageInput_imgUrl_btn_container">
            <label for="fileInput" class="btn imageInput_imgUrl_btn_file_label">本地檔案上傳</label>
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
          <h5 class="fs-5 mt-3 form_imageInput_container_title">驗證碼</h5>
          <div class="mt-2 d-flex imageInput_verification_container">
            <input
              type="text"
              class="imageInput_verification"
              placeholder="請輸入驗證碼"
              v-model="userVerifyCode"
              required="required"
            />
            <div class="imageInput_verification_canvas_container">
              <canvas
                class="verification_canvas"
                ref="canvas"
                width="110"
                height="40"
                @click="refreshCaptcha"
              ></canvas>
            </div>
          </div>
          <button type="submit" class="mt-3 btn form_btn form_btn_submit">
            確認送出
            <span class="material-icons">done</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH, VITE_APP_TOKEN } = import.meta.env
export default {
  data() {
    return {
      userVerifyCode: '',
      verifyCode: '',
      form: {
        is_enabled: 1,
        unit: '個',
        origin_price: 1,
        price: 1,
        category: '餐廳',
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
        googleMapUrl:
          'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3615.550013102598!2d121.5367189!3d25.015402!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xec78966a3d7b4efc!2z5ZyL56uL6Ie654Gj5aSn5a2455Sf5ZG956eR5a246aSo!5e0!3m2!1szh-TW!2stw!4v1534244255311'
      },
      imageArray: [],
      imagesRender: [],
      imageUpdateUrl: 'https://via.placeholder.com/200'
    }
  },
  methods: {
    drawCaptcha() {
      const show_num = []
      // 取得該 HTML
      const canvas = this.$refs.canvas
      // 取得渲染環境及繪圖函數(2D繪圖)
      const context = canvas.getContext('2d')
      // 取得 畫布的寬高
      const canvas_width = canvas.width
      const canvas_height = canvas.height
      // 定義裡面的資料有哪些
      const sCode =
        'a,b,c,d,e,f,g,h,i,j,k,m,n,p,q,r,s,t,u,v,w,x,y,z,A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0'
      // 組成陣列，以逗號為分隔條件
      const aCode = sCode.split(',')
      // 陣列長度
      const aLength = aCode.length
      // 清空畫布
      context.clearRect(0, 0, canvas_width, canvas_height)
      // 迴圈 條件 不超過 4
      for (let i = 0; i < 4; i++) {
        // 回傳小於等於所給數字的最大整數
        // 偽隨機小數 (pseudo-random) 介於 0 到 1 之間(包含 0，不包含 1)
        const j = Math.floor(Math.random() * aLength)
        // 旋轉角度隨機數值
        const deg = Math.random() - 0.5
        // 陣列第J個資料
        const txt = aCode[j]
        // 陣列資料的i個 傳入 txt的資料並小寫化
        show_num[i] = txt
        // XY軸 隨機數值
        const x = 10 + i * 20
        const y = 20 + Math.random() * 8
        //字體設定
        context.font = 'bold 1.5rem 微软雅黑'

        // XY軸 位置 ，旋轉角度
        context.translate(x, y)
        context.rotate(deg)

        // 設定填滿圖形時用的顏色
        context.fillStyle = this.randomColor()
        // 在畫布上繪製填塞的文字,X座標,Y座標
        context.fillText(txt, 0, 0)

        context.rotate(-deg)
        context.translate(-x, -y)
      }

      // 裝飾背景線
      for (let i = 0; i <= 5; i++) {
        // 設定勾勒圖形時用的顏色.
        context.strokeStyle = this.randomColor()
        // 產生新路徑
        context.beginPath()
        // 移動到 隨機 X Y
        context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height)
        // 畫線調到 隨機 XY
        context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height)
        // 執行繪圖這個功能
        context.stroke()
      }

      // 裝飾背景的點
      for (let i = 0; i <= 30; i++) {
        context.strokeStyle = this.randomColor()
        context.beginPath()
        const x = Math.random() * canvas_width
        const y = Math.random() * canvas_height
        context.moveTo(x, y)
        // 畫線調到 隨機 XY+1單位 (看起來就會像點)
        context.lineTo(x + 1, y + 1)
        context.stroke()
      }

      this.verifyCode = show_num.join('')
    },
    // 重新更新驗證碼渲染
    refreshCaptcha() {
      this.drawCaptcha()
    },
    // 隨機顏色RGB數值
    randomColor() {
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return `rgb(${r},${g},${b})`
    },
    renderImage() {
      //將 imageArray 陣列 倒序，推入 imagesRender ，並渲染
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
          alert('圖片上傳成功')
        })
        .catch((err) => {
          alert(err.response.data.message)
        })
    },
    updateImage() {
      // 確定新增，推入imageArray，並重新渲染到下方小圖之中，空值不能新增
      const obj = {
        imageUrl: this.imageUpdateUrl,
        imageAlt: this.form.title + '圖片',
        timeStamp: Date.now()
      }
      // 將obj 物件 推入到 imageArray 中
      this.imageArray.push(obj)
      this.sortRenderImg()
      this.form.imagesUrl = [...this.imageArray]
    },
    deleImg() {
      //  刪除imageArray最後一張圖片(陣列從後面排列)，更新渲染陣列imagesRender
      this.imageArray.pop()
      this.sortRenderImg()
    },
    sortRenderImg() {
      // 重新排列 倒序
      const ArraySortB_A = [...this.imageArray].sort((a, b) => {
        return b.timeStamp - a.timeStamp
      })
      // 將排列完成的放入到 imagesRender 中
      this.imagesRender = { ...ArraySortB_A }
    },
    formSubmit() {
      const apiUrl = `${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/admin/product`

      this.form.imagesUrl = JSON.parse(JSON.stringify(this.imageArray))

      const data = {
        data: this.form
      }

      //檢查驗證碼 ，無誤才可送出
      // 如驗證碼錯誤
      if (this.userVerifyCode.toLowerCase() !== this.verifyCode.toLowerCase()) {
        this.$swal('錯誤', '驗證碼錯誤', 'error')
      }
      // 如驗證碼為空
      else if (this.userVerifyCode.toLowerCase() === '') {
        this.swal('錯誤', '請輸入驗證碼', 'error')
      }
      // 如輸入正確
      else {
        this.$swal({
          title: '確定新增嗎?',
          text: '請確保資訊是否都有填寫完整正確，再送出!',
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#BB8D74',
          cancelButtonColor: '#919191',
          confirmButtonText: '確定新增'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$http
              .post(apiUrl, data)
              .then((res) => {
                this.$swal('成功', res.data.message, 'success')
              })
              .catch((err) => {
                this.$swal(err.data.message)
              })
          }
        })
      }
    },
    wrongAlert() {
      //驗證碼錯誤提示
    },
    googleMapApi() {
      const key = 'AIzaSyB9JF9zPks-ExJceYoROUo5Ef04KlLJNOU'

      this.form.googleMapUrl =
        'https://www.google.com/maps/embed/v1/place?key=' +
        `${key}` +
        '&q=' +
        this.form.address +
        '&language=zh-TW'
    }
  },
  mounted() {
    this.drawCaptcha()

    // 設定this.$http header全域默認設定
    this.$http.defaults.headers.common.Authorization = `${VITE_APP_TOKEN}`
  }
}
</script>

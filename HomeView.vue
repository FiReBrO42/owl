<template>
  <div id="CanvasContainer">
    <div v-for="(star, index) in stars" :key="index" class="star"></div>
  </div>
  <div class="row">
    <div class="col-12 col-lg-8 home_title_container">
      <h2 class="display-3 fw-bold home_title">夜貓子</h2>
      <h2 class="display-3 fw-bold home_title">為你提供夜晚的好選擇</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-10 col-lg-5 home_sub_container">
      <p class="fs-6">
        晚上不知道要去哪裡嗎?想要單純欣賞夜晚的美景，還是想要邊享用美食搭配美景呢?或者享受夜間生活呢?<br />
        不用再煩惱了，夜貓子已經幫你整理好，推薦你許多熱門景點餐廳
      </p>
    </div>
  </div>
  <div class="row d-flex home_swiper_container mt-5 mt-lg-0">
    <div class="col-12 col-lg-8">
      <SwiperView />
    </div>
  </div>
</template>

<script>
import SwiperView from '@/components/SwiperView.vue'
// 匯入 gsap
import { gsap } from 'gsap'

export default {
  data() {
    return {
      container: '',
      stars: '',
      numStars: 10
    }
  },
  components: {
    SwiperView
  },
  methods: {
    gsapStar() {
      // 獲取容器元素
      const container = document.getElementById('CanvasContainer')

      // 創建多個流星元素
      for (let i = 0; i < this.numStars; i++) {
        // 創建流星元素
        const star = document.createElement('div')
        star.className = 'star' // 設置流星的 CSS 類名

        // 將流星元素添加到容器中
        container.appendChild(star)

        // 設置流星的初始位置
        gsap.set(star, {
          x: gsap.utils.random(window.innerWidth - 100, window.innerWidth), // 隨機設置 x 軸位置（右上角區域）
          y: gsap.utils.random(-100, 0), // 隨機設置 y 軸位置（在畫面之外）
          opacity: 0, // 初始時透明度為 0
          scale: 0.5 // 初始時縮放為 0.5
        })

        // 創建流星的動畫
        gsap.to(star, {
          x: gsap.utils.random(-window.innerWidth, -50), // 目標位置（超出左邊界）
          y: window.innerHeight + 100, // 目標位置（超出下邊界）
          opacity: 1, // 透明度漸變為 1
          scale: 1, // 縮放漸變為 1
          duration: gsap.utils.random(3, 6), // 動畫持續時間（隨機範圍）
          delay: gsap.utils.random(0, 2), // 延遲時間（隨機範圍）
          repeat: -1, // 重複播放動畫
          ease: 'none', // 不應用任何緩動效果
          onComplete: () => {
            gsap.set(star, { opacity: 0 }) // 動畫完成後，將透明度重置為 0
          }
        })
      }
    }
  },
  mounted() {
    this.gsapStar()
  }
}
</script>

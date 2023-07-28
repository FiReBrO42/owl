<template>
  <div class="row d-flex viewpoints_top_container">
    <div class="col-3 col-lg-2">
      <h2 class="fs-2 fw-bold">餐廳</h2>
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
        <router-link :to="'restaurant' + '/' + item.id">
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
      },
      restaurantsList: [
        {
          id: '0',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '1',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '2',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '3',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '4',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '5',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '6',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '7',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '8',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        },
        {
          id: '9',
          type: 'restaurant',
          name: '晀高0',
          time: {
            openTimes: '11:00~21:00',
            publicHoliday: '無公休日'
          },
          address: '434台中市龍井區中埠路',
          content:
            '啡文學龍井店是一家獨特的咖啡館，位於龍井地區。該店提供一個舒適、溫馨的環境，讓客人可以放鬆身心，享受優質的咖啡體驗。店內擁有豐富的咖啡種類，從經典的拿鐵到創意的特調，滿足不同口味的需求。這裡的咖啡師們都是經驗豐富且對咖啡熱情滿滿，他們將用心為您調製出絕美的咖啡藝術品。此外，店家僅收現金，這使得付款過程更加迅速方便。無論是候位還是品味咖啡，啡文學龍井店都是您放鬆身心、享受美好時光的理想去處。',
          imagesUrl: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1529&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1478098711619-5ab0b478d6e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1443&q=80'
            },
            {
              imageUrl: '/img/restaurants/眺高/img_眺高_01.jpg',
              imageAlt: '晀高圖片'
            }
          ],
          googleMapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116464.24665756975!2d120.42288929726557!3d24.188992000000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346915808f98cebb%3A0xa4210c9dbe041efa!2z5ZWh5paH5a24IOm-jeS6leW6l--8iOePvuWgtOWAmeS9jSAvIOWDheaUtuePvumHke-8iQ!5e0!3m2!1szh-TW!2stw!4v1689183865016!5m2!1szh-TW!2stw'
        }
      ]
    }
  },
  methods: {
    // 取得產品，渲染並能篩選
    getProductsApi(page = 1, category = '餐廳') {
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

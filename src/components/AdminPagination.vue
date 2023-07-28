<template>
  <div
    class="row mt-6 viewpoints_pagination_container admin_pagination_container"
    v-if="pagination.total_pages !== 0"
  >
    <nav aria-label="Page navigation example" class="col-12 d-flex">
      <ul class="pagination d-flex">
        <!-- 上一頁 -->
        <li class="page-item disabled" :class="{ disabled: !pagination.has_pre }">
          <a
            class="page-link previous"
            href="#"
            aria-label="Previous"
            @click.prevent="renderProduct(pagination.current_page - 1)"
          >
            <span class="material-icons"> arrow_back_ios_new </span>
          </a>
        </li>
        <!-- 頁碼 -->
        <li
          class="page-item active"
          :class="{ active: page === pagination.current_page }"
          v-for="page in pagination.total_pages"
          :key="page + 'page'"
        >
          <a class="page-link" href="#" @click.prevent="renderProduct(page)">{{ page }}</a>
        </li>
        <!-- 下一頁 -->
        <li class="page-item" :class="{ disabled: !pagination.has_next }">
          <a
            class="page-link next"
            href="#"
            aria-label="Next"
            @click.prevent="renderProduct(pagination.current_page + 1)"
          >
            <span class="material-icons"> arrow_forward_ios </span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
    props: ['pagination','renderProduct'],


}
</script>
<!-- 
  
props方法: @click.prevent="renderProduct(page)
emit 方法: @click.prevent="$emit('change_page',page) 自訂譯名稱 ,參數
html 使用 @change_page= "根元件methods"
 -->
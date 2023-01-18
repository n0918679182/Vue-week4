export default {
    props: ['pages', 'getData'], // 2. 接收 page 參數傳入    3. 準備一個 getData 來呼叫元件外部的方法
    template: `<div>
                    <nav aria-label="Page navigation example">
                        <!-- {{ page }} 所以直接在畫面印出 page 最方便快速-->
                        <ul class="pagination">
                                                <!-- 判斷若無前一頁(後端回傳boolean) 則加上 disabled -->
                            <li class="page-item" :class="{ disabled: !pages.has_pre }">
                                <a class="page-link" href="#" aria-label="Previous" @click.prevent="getData(pages.current_page-1)">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>
                                                <!-- 判斷當前頁面是否等於頁號 是的話加上 active -->
                            <li class="page-item" :class="{ active: page === pages.current_page }"
                                v-for="page in pages.total_pages" :key="page+'page'">
                                                            <!-- 4. 呼叫 getData 並帶入參數 -->
                                <a class="page-link" href="#" @click.prevent="getData(page)">{{page}}</a>
                            </li>
                                                <!-- 判斷若無前一頁(後端回傳boolean) 則加上 disabled -->
                            <li class="page-item" :class="{ disabled: !pages.has_next }">
                                <a class="page-link" href="#" aria-label="Next" @click.prevent="getData(pages.current_page+1)">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>`,
                // 使用 emit 觸發外層方法 :
                // 1. @click.prevent="$emit('change-page', page)"  
                //                    $emit('自訂方法名稱', 參數)
    mounted() {
        console.log('page', this.page); // 因為非同步的關係 這個時候還未取得資料
    },
}
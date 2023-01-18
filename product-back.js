import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';
import pagination from './pagination.js';
import productmodals from './product-modal.js';
import deletemodal from './delete-modal.js';

let productModal = null;
let delProductModal = null;

createApp({
    data() {
        return {
            apiUrl: 'https://vue3-course-api.hexschool.io/v2',
            apiPath: 'wweilin',
            products: [],
            pages: {},
            isNew: false,
            tempProduct: {
                imagesUrl: [],
            },
        }
    },
    mounted() {
        productModal = new bootstrap.Modal(document.getElementById('productModal'), {
            keyboard: false
        });

        delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
            keyboard: false
        });

        // 取出 Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
        axios.defaults.headers.common.Authorization = token;

        this.checkAdmin();
    },
    methods: {
        checkAdmin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    this.getData();
                })
                .catch((err) => {
                    alert(err.response.data.message)
                    window.location = 'login.html';
                })
        },
        //         預設參數
        getData(page=1) {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products?page=${page}`;
            axios.get(url).then((response) => {
                const {products, pagination} = response.data;
                this.products = products;
                this.pages = pagination;
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        updateProduct() {
            let url = `${this.apiUrl}/api/${this.apiPath}/admin/product`;
            let http = 'post';

            if (!this.isNew) {
                url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;
                http = 'put'
            }

            axios[http](url, { data: this.tempProduct }).then((response) => {
                alert(response.data.message);
                productModal.hide();
                this.getData();
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        openModal(isNew, item) {
            if (isNew === 'new') {
                this.tempProduct = {
                    imagesUrl: [],
                };
                this.isNew = true;
                productModal.show();
            } else if (isNew === 'edit') {
                this.tempProduct = { ...item };
                this.isNew = false;
                productModal.show();
            } else if (isNew === 'delete') {
                this.tempProduct = { ...item };
                delProductModal.show()
            }
        },
        delProduct() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`;

            axios.delete(url).then((response) => {
                alert(response.data.message);
                delProductModal.hide();
                this.getData();
            }).catch((err) => {
                alert(err.response.data.message);
            })
        },
        createImages() {
            this.tempProduct.imagesUrl = [];
            this.tempProduct.imagesUrl.push('');
        },
    },
    components: {
        pagination,
        productmodals,
        deletemodal
    }
}).mount('#app');
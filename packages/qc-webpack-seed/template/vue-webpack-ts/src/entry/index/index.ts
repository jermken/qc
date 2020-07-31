import { Vue } from 'vue-property-decorator'
import App from '@/pages/app.vue'
import VueRouter from 'vue-router'
import router from '@/route/route'

Vue.use(VueRouter)

new Vue({
    router,
    render: (h) => {
        return h(App)
    }
}).$mount('#app')

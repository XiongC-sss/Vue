import Vue from "vue"
//导入resource发送请求获取数据
import VueResource from "vue-resource"
Vue.use(VueResource);
Vue.http.options.root='http://www.liulongbin.top:3005';
Vue.http.options.emulateJSON = true;

//导入vueX放置组件中通用的数据
import Vuex from "vuex"
Vue.use(Vuex);
// //先定义一个全局的car用来读取本地浏览器储存的car 若本地没有储存则 为空数组
var car = JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
    state:{
        car:car,//购物车中的商品数据 用数组存起来 每一条当成一个对象 {id:商品的id, count:商品的数量，price:商品的价格，selected:是否被选取}
    },
    mutations:{
        addCar(state,goodInfo){
            var flag = false;
            //购物车中存在相同的商品
            this.state.car.some(item=>{
                if(item.id == goodInfo.id){
                    item.count += parseInt(goodInfo.count);
                    flag = true;
                    return true;
                }
            });
            //购物车中不存在相同的商品
            if(!flag){
                state.car.push(goodInfo);
            }
            //插入到购物车后将数据储存在浏览器的本地
            localStorage.setItem('car',window.JSON.stringify(state.car));
        },
        changeCar(state,goodInfo){
            //当用户在购物车中更改购买商品数量  接收一个对象 包含商品的id 和 数量  更改store中car的数量 再更新local中的数量
            state.car.some( item => {
                if(item.id == goodInfo.id){
                    item.count = parseInt(goodInfo.count);
                    return true;
                }
            });
            localStorage.setItem('car',window.JSON.stringify(state.car));
        },
        removeCarList(state,id){
            //删除store中car数据
            state.car.some( (item,i) => {
                if (item.id == id){
                    state.car.splice(i,1);
                }
            });
            localStorage.setItem('car',window.JSON.stringify(state.car));
        },
        updateSelected(state,goodsSel){
            //更新car中的selected数据 操作是否选中
            state.car.some( item => {
                if(item.id == goodsSel.id){
                    item.selected = goodsSel.selected;
                }
            });
            localStorage.setItem('car',window.JSON.stringify(state.car));
        }
        },
    getters:{
        getCount:function (state) {
            //利用getters的计算属性还改变底部购物车商品数量
            var c = 0;
            state.car.forEach( item => {
                c += parseInt(item.count);
            });
            return c;
        },
        getCarCount:function (state) {
            //将购物车中的商品  id: count实例化成一个对象病返回 用来初始化购物车中numbox商品数量
            var o = {};
            state.car.forEach( item => {
                o[item.id] = item.count;
            });
            return o;
        },
        getSelected:function (state) {
            //获取购物车商品 selected属性
            var o = {};
            state.car.forEach( item => {
                o[item.id] = item.selected;
            });
            return o;
        },
        getCountAndAmount:function (state) {
            //计算获取购物车商品总数和总价
            var o = {count:0,amount:0};
            state.car.forEach( item => {
                if(item.selected){
                    //当商品被选中
                    o.count += item.count;
                    o.amount += item.count * item.price;
                }
            });
            return o;
        }

    }
});

//导入路由
import VueRouter from "vue-router"
Vue.use(VueRouter);

//导入抽离路由文件
import router from "./router.js"

//导入组件
import app from "./App.vue"

//按需要导入mint-ui Header
import { Header,Swipe,SwipeItem,Button,Lazyload,Switch} from "mint-ui"
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name,Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);


//导入mui
import '../lib/mui/css/mui.min.css'
import '../lib/mui/css/icons-extra.css'

//导入时间插件
import moment from "moment"
//定义全局过滤器
Vue.filter('dateFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
    //使用moment初始化时间
    return moment(dataStr).format(pattern);
});


//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview);





var vm = new Vue({
    el:"#app",
    render:c=>c(app),//render渲染组件把app组件直接渲染成html
    router,//挂载路由对象
    store,//挂载vueX对象
});
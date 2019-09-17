//导入路由
import VueRouter from "vue-router"

//导入路由组件
import home from "./components/tabBar/homeContainer.vue"
import vip from "./components/tabBar/vipContainer.vue"
import shopCar from "./components/tabBar/shopCarContainer.vue"
import search from "./components/tabBar/search.vue"
import newList from "./components/news/NewList.vue"
import newInfo from "./components/news/newInfo.vue"
import photoList from "./components/photos/PhotoList.vue"
import photoInfo from "./components/photos/PhotoInfo.vue"
import goodsList from "./components/Goods/goodsList.vue"
import goodsInfo from "./components/Goods/goodsInfo.vue"
import goodsDesc from "./components/Goods/goodsDesc.vue"
import goodsComment from "./components/Goods/goodsComment.vue"

//创建路由
var router = new VueRouter({
    //匹配路由规则
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:home},
        {path:'/vip',component:vip},
        {path:'/shopCar',component:shopCar},
        {path:'/search',component:search},
        {path:'/home/newList',component:newList},
        {path:'/home/newInfo/:id',component:newInfo},
        {path:'/home/photoList',component:photoList},
        {path:'/home/photoinfo/:id',component:photoInfo},
        {path:'/home/goodsList',component:goodsList},
        {path:'/home/goodsInfo/:id',component:goodsInfo},
        {path:'/home/goodsDesc/:id',component:goodsDesc,name:'goodsDesc'},
        {path:'/home/goodsComment/:id',component:goodsComment,name: 'goodsComment'}

    ],
    //更改选择路由的默认类
    linkActiveClass:" mui-active",
});

export default router;
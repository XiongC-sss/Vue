<template>
    <div>
        <ul class="mui-table-view">
<!--            循环生成新闻列表-->
            <li class="mui-table-view-cell mui-media" v-for="item in NewList" :key="item.id">
                <router-link :to="'/home/newInfo/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h1>{{item.title}}</h1>
                        <p class='mui-ellipsis'>
                            <span>发布时间:{{ item.add_time | dateFormat }}</span>
                            <span>评论数:{{item.click}}</span>
                        </p>
                    </div>
                </router-link>
            </li>



        </ul>
    </div>
</template>
<style lang="scss" scoped>
    .mui-table-view .mui-media {
        h1 {
            font-size: 14px;
        }
        .mui-ellipsis{
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
<script>
    import { Toast} from "mint-ui"
    export default {
        data(){
            return{
                NewList:[],
            }
        },
        created(){
            this.getNewList();
        },
        methods:{
            //获取新闻列表
            getNewList(){
                this.$http.get('api/getnewslist').then( result => {
                    if(result.body.status === 0){
                        this.NewList = result.body.message;
                    }else {
                        Toast("加载新闻列表失败");
                    }
                })
            }
        }
    }
</script>
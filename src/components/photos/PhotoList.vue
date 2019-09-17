<template>
    <div>
<!--顶部图片导航-->
        <div id="slider" class="mui-slider">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id === 0 ? ' mui-active' : '']" v-for="item in created" :key="item.id" @click="getPhoto(item.id)" >
                        {{item.title}}
                    </a>
                </div>
            </div>
        </div>
<!--图标列表-->
        <ul class="photoList">
            <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="infoTitle">{{ item.title }}</h1>
                    <div class="zhiayao">{{ item.zhaiyao}}</div>
                </div>
            </router-link>

        </ul>
    </div>
</template>
<style lang="scss" scoped>
* { touch-action: pan-y;}
.photoList{
    list-style: none;
    margin: 0;
    padding: 10px;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 10px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img{
            width: 100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info{
            color: white;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,0.4);
            max-height: 84px;
            .infoTitle{
                font-size: 14px;
            }
            .zhiayao{
                font-size: 13px;
            }

        }
    }
}
</style>
<script>
    import mui from "../../../lib/mui/js/mui.min.js"
    export default {
        data(){
            return {
                created :[],
                list:[],
            }
        },
        created(){
            this.getCreatedList();
            this.getPhoto(0);
        },
        mounted(){
            //当组件渲染好并且放到页面中去 再初始化滚动条  操作元素最好在mounted中 此时元素是最新的
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{
            //获取顶部图片导航栏数据
            getCreatedList(){
                this.$http.get("api/getimgcategory").then( result => {
                    if(result.body.status === 0){
                        result.body.message.unshift({title: "全部",id: 0});
                        this.created = result.body.message;
                    }
                })
            },
            //获取图片列表数据
            getPhoto(created){
                this.$http.get("api/getimages/"+created).then( result => {
                    if(result.body.status === 0){
                        this.list = result.body.message;
                    }
                })
            }
        }
    }
</script>
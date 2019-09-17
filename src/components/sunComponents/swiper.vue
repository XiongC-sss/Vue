<template>
    <div>
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunBoTu" :key="item.img">
<!--给轮播图组件添加一个宽度类（首页需要填满，商品详情需要自适应）-->
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<style lang="scss" scoped>
    .mint-swipe{
        height: 200px;
        .mint-swipe-item{
            text-align: center;
            img{
                height: 100%;
            }
            .full{
                width: 100%;
            }
        }
    }
</style>

<script>
    export default {
        //接受父组件的轮播图数据 和宽度是否填满的bool值
        props:['lunBoTu','isfull']
    }
</script>
<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1' style="height: 25px">
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" :value="carCount" ref="number" @change="changeDate"/>
            <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
        </div>
    </div>
</template>
<style lang="scss" scoped></style>
<script>
    //导入mui.js
    import mui from "../../../lib/mui/js/mui.min"
    export default {
        mounted() {
            //初始化数字选择框组件
            mui(".mui-numbox").numbox();
        },
        methods:{
            changeDate(){
                //购物车numbox调用store中的方法来更新store.state.car
                this.$store.commit("changeCar",{
                    id: this.goodsId,
                    count: this.$refs.number.value,
                })
            }
        },
        props:["carCount","goodsId"]
    }
</script>
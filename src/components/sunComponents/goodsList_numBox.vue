<template>
    <div>
        <div class="mui-numbox" data-numbox-min='1'>
            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
            <input id="test" class="mui-input-numbox" type="number" value="1" ref="number" @change="setDate"/>
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
            setDate(){
                //$emit自动触发自定义事件getSon从而触发父组件传过来的方法 最后将值传递给父组件
                this.$emit("getSon",this.$refs.number.value)
            }
        },
        props:['goodsMax'],
        watch:{
            //属性监听 因为父组件中传过来的goodsMax可能开始为undefined  当goods发生改变时就更改numbox的 max
            'goodsMax': function (newVal,oldVal) {
                //通过js方式设置numbox的max
                mui(".mui-numbox").numbox().setOption('max',newVal);
            }
        }
    }
</script>
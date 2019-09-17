<template>
    <div>
        <combox :id="$route.params.id"></combox>
    </div>
</template>
<style lang="scss" scoped>
</style>
<script>
    //导入评论组件
import combox from "../sunComponents/comment.vue"
    export default {
        //注册组件
        components:{
            combox,
        }
    }
</script>
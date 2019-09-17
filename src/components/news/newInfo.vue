<template>
    <div class="newInfo-container">
<!--新闻详情组件-->
       <h1 class="title">{{ newInfo.title }}</h1>
        <p class="subtitle">
            <span>发布时间:{{ newInfo.add_time }}</span>
            <span>点击:{{ newInfo.click }}次</span>
        </p>
        <hr>
        <div class="content" v-html="newInfo.content"></div>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<style lang="scss" scoped>
    .newInfo-container{
        padding: 0 4px;
        .title{
            font-size: 16px;
            text-align: center;
            color: red;
            margin: 15px 0;
        }
        .subtitle{
            font-size: 13px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
        }
        .content{

        }
    }
</style>
<script>
    // 引入评论组件
    import comment from "../sunComponents/comment.vue"
    import { Toast } from "mint-ui"
    export default {
        data(){
            return{
                id:this.$route.params.id,
                newInfo:{},
            }
        },
        created(){
          this.getNewInfo();
        },
        methods:{
            //获取新闻详情
            getNewInfo(){
                this.$http.get('api/getnew/'+this.id).then( result=> {
                    if(result.body.status === 0){
                        this.newInfo = result.body.message[0];
                    }else {
                        Toast("获取新闻详情失败")
                    }
                })
            }
        },
        components:{
            //评论子组件
            'comment-box':comment,
        }

    }
</script>
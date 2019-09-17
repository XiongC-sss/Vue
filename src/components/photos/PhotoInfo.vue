<template>
    <div class="info-container">
<!--title-->
        <h1>{{ info.title }}</h1>
        <p class="subtitle">
            <span>发布时间: {{ info.add_time | dateFormat}}</span>
            <span>点击:{{ info.click }}次</span>
        </p>
<!--缩略图-->
        <vue-preview :slides="list" class="thumbs" ></vue-preview>
<!--详细信息-->
        <div class="content" v-html="info.content"></div>
<!--评论组件-->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<style lang="scss" scoped>
    .info-container{
        padding: 3px;
        h1{
            color: #26a2ff;
            font-size:15px;
            text-align: center;
            margin: 15px 0;
        }
        .subtitle{
            display: flex;
            justify-content: space-between;
            font-size: 13px;
        }
        .content{
            font-size: 13px;
            line-height: 30px;
        }
        /*缩略图需要加的样式*/
        .thumbs {
            /deep/ .my-gallery {
                display: flex;
                flex-wrap: wrap;
                figure {
                    width: 30%;
                    margin: 5px;
                    img {
                        width: 100%;
                    }
                }
            }
        }
    }
</style>
<script>
    //引入评论组件
    import comment from "../sunComponents/comment.vue"
    export default{
        data(){
            return{
                info:{},
                id: this.$route.params.id,
                list:[],
            }
        },
        created(){
          this.getInfo();
          this.getImg();
        },
        methods:{
            getInfo(){
                //获取图片信息
                this.$http.get("api/getimageInfo/" + this.id).then( result => {
                    if(result.body.status === 0){
                        this.info = result.body.message[0];
                    }
                })
            },
            getImg(){
                //获取缩略图
                this.$http.get("api/getthumimages/" + this.id).then( result => {
                    if(result.body.status === 0){
                        result.body.message.forEach( item => {
                            item.w = 600;
                            item.h = 400;
                            item.msrc = item.src;
                        });
                        this.list = result.body.message;
                    }
                })
            }
        },
        components:{
            "cmt-box":comment,
        }
    }
</script>
<template>
    <div class="cmt-container">
    <!--评论组件-->
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入内容(不多于120字)" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
<!--网友评论主体-->
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in comment" :key="i">
                <div class="cmt-title">第{{i+1}}楼&nbsp;用户:{{ item.user_name }};<span>发表时间:{{ item.add_time | dateFormat}}</span></div>
                <div class="cmt-body">{{ item.content === 'undefined' ? '此用户很懒，什么都没留下' : item.content}}</div>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>
</template>
<style lang="scss" scoped>
    .cmt-container{
        h3{
            font-size: 18px;
        }
        textarea{
            font-size: 14px;
            height: 85px;
            margin: 0px;
        }
        .cmt-list{
            margin: 5px 0;
            .cmt-item{
                font-size: 13px;
                .cmt-title{
                    line-height: 30px;
                    background-color: #ccc;
                    span{
                        float: right;
                    }
                }
                .cmt-body{
                    line-height: 35px;
                    text-indent: 2em;
                }
            }
        }
    }
</style>
<script>
    import { Toast} from "mint-ui"
    export default {
        data(){
            return{
                pageIndex:1,
                comment:[],
                msg:"",
            }
        },
        created(){
            this.getComments();
        },
        methods:{
            //获取评论列表
            getComments(){
                this.$http.get('api/getcomments/'+this.id+'?pageindex=' + this.pageIndex).then( result => {
                    if(result.body.status === 0){
                        //concat是拼接数组
                        this.comment = this.comment.concat(result.body.message);
                    }else {
                        Toast("获取评论失败");
                   }
                })
            },
            //获取更多评论
            getMore(){
                this.pageIndex++;
                this.getComments();
            },
            //提交评论
            postComment(){
                if(this.msg.trim().length === 0){
                    return Toast("评论不能为空");
                }
                this.$http.post("api/postcomment/"+ this.$route.params.id,{
                    content: this.msg.trim(),
                }).then( result =>{
                    if(result.body.status === 0){
                        var cmt={
                            user_name:"匿名用户",
                            add_time: Date.now(),
                            content: this.msg.trim(),
                        };
                        this.comment.unshift(cmt);
                        this.msg = "";
                    }
                })
            }
        },
        //评论父页面的id用来获取专属评论
        props:["id"],
    }
</script>
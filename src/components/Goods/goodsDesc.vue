<template>
    <div class="goodsDesc-container">
        <h3>{{ info.title}}</h3>
        <hr>
        <div class="content" v-html="info.content"></div>
    </div>
</template>
<style lang="scss" >
    .goodsDesc-container{
        padding: 4px;
        h3{
            font-size: 16px;
            text-align: center;
            margin: 15px 0;
        }
        .content{
            img{
                width: 100%;
            }
        }
    }

</style>

<script>
export default {
    data() {
        return {
            info: {}
        }
    },
    created(){
      this.getDesc();
    },
    methods:{
        getDesc(){
            this.$http.get('api/goods/getdesc/'+ this.$route.params.id).then( result =>{
                if(result.body.status === 0){
                    this.info = result.body.message[0];
                }
            })
        }
    }
}
</script>
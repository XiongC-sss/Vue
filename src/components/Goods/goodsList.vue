<template>
    <div class="goodsList">
        <div class="goodsItem"  v-for="(item,index) in goodsList" :key="index" @click="getDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h3 class="title">{{ item.title }}</h3>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{ item.sell_price}}</span>
                    <span class="old">￥{{ item.market_price}}</span>
                </p>
                <p class="sell">
                    <span>热卖中</span>
                    <span>库存{{ item.stock_quantity}}</span>
                </p>
            </div>
        </div>
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
    </div>

</template>
<style lang="scss" scoped>
    .goodsList{
        display: flex;
        flex-wrap: wrap;
        padding: 7px;
        justify-content: space-between;
        .goodsItem{
            width: 49%;
            border-right: 1px solid #ccc;
            box-shadow: 0 0 8px #ccc;
            margin: 3px;
            padding: 2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            min-height: 293px;
            img{
                width: 100%;
            }
            .title{
                font-size: 14px;
            }
            .info{
                background-color: #eee;
                p{
                    margin: 0;
                    padding: 5px;
                };
                .price{
                    .now{
                        color: red;
                        font-weight: bold;
                        font-size: 16px;
                        margin-right: 5px;
                    }
                    .old{
                        text-decoration: line-through;
                        font-size: 12px;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                }
            }

        }
    }
</style>
<script>
    // export default 导出自己组件的page对象
    export default {
        data(){
            return{
                pageIndex:1,
                goodsList: [],
            }
        },
        created(){
          this.getGoodsList();
        },
        methods:{
            getGoodsList(){
                //发送请求获取商品列表数据
                this.$http.get('api/getgoods?pageindex='+ this.pageIndex).then( result => {
                    if(result.body.status === 0){
                        //对获取的数组进行拼接
                        this.goodsList = this.goodsList.concat(result.body.message);
                    }
                });
            },
            getMore(){
                //获取更多商品列表数据
                this.pageIndex++;
                this.getGoodsList();
            },
            //没有使用router-link实现跳转   编程式导航
            getDetail(id){
                this.$router.push({path:'/home/goodsInfo/'+id});
            }
        }
    }
</script>
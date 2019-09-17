<template>
    <div class="shopCar-container">
        <div class="carList">
        <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-switch v-model="$store.getters.getSelected[item.id]"
                    @change="changeSelected(item.id,$store.getters.getSelected[item.id])"></mt-switch>
                    <img :src="item.thumb_path" alt="">
                    <div class="info">
                        <h1>{{ item.title }}</h1>
                        <p>
                            <span class="price">￥{{ item.sell_price}}</span>
                            <!--获取储存商品 id count的对象-->
                            <numBox style="display: inline-block;margin: 0 10px" :carCount="$store.getters.getCarCount[item.id]" :goodsId="item.id"></numBox>
                            <a href="#" @click="removeCar(item.id,i)">删除</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner" style="justify-content: space-between">
                   <div class="left"><p> 总计(不含运费)</p><p>已勾选商品件<span class="red">{{ $store.getters.getCountAndAmount.count}}</span>件，总合计<span class="red">￥{{ $store.getters.getCountAndAmount.amount}}</span></p></div>
                    <mt-button type="danger">结算</mt-button>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
    .shopCar-container{
        background-color: #eeeeee;
        overflow: hidden;
        .carList{
            .mui-card-content-inner{
                /*//流使布局 上下左右都居中*/
                /*display: flex;*/
                /*align-items: center;*/
                /*justify-content: space-between;*/
                display: flex;
                align-items: center;
                img{
                    width: 60px;
                    height: 60px;
                    margin: 0 50px;
                }
                h1{
                    font-size: 14px;
                }
                .info{
                    p {
                        margin-top: 12px;
                        .price {
                            color: red;
                            font-weight: bold;
                        }
                    }
                }

            }
        }
        .buy{
            .buyBox{
                justify-content: space-between;
                .red{
                    color: red;
                    font-size: 14px;
                    font-weight: bold;
                }
            }
        }
    }
</style>
<script>
    import numBox from "../sunComponents/shopCar_numBox.vue"
    export default {
        data(){
            return{
                goodsList:[],
            }
        },
        created(){
            this.getGoodListCar()
        },
        methods:{
            getGoodListCar(){
                //获取购物车数据
                var ids = [];//定义一个空数组用来放购物车商品的id
                this.$store.state.car.forEach(item=>ids.push(item.id));//在state中获取商品id  push到数组中
                this.$http.get('api/goods/getshopcarlist/'+ ids.join(',')).then( result =>{
                    //join将ids数组拼接成字符串
                    if(result.body.status === 0){
                        this.goodsList = result.body.message;
                    }
                })
            },
            removeCar(id,i){
                //购物车中商品删除
                //删除页面
                this.goodsList.splice(i,1);
                //删除store数据
                this.$store.commit("removeCarList",id)
            },
            changeSelected(id,val){
                this.$store.commit("updateSelected",{id,selected: val})
            }
        },
        components: {
            numBox
        }
    }
</script>
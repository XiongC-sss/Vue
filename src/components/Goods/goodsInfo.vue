<template>

    <div class="goods-container">
<!--加入购物车小球半场动画-->
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        >
            <div class="ball" v-show="ball" ref="ball"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :lunBoTu="lubutu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{ goods.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价:<del>￥{{goods.market_price}}</del>&nbsp;&nbsp;<span class="now_price">￥{{goods.sell_price}}</span>
                    </p>
                    <p>购买数量:<numBox style="display: inline-block;margin-left: 20px" @getSon="getSelectedCount" :goodsMax="goods.stock_quantity"></numBox></p>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click="addShopCar">加入购物车</mt-button>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号:{{goods.goods_no}}</p>
                    <p>库存情况:{{goods.stock_quantity}}件</p>
                    <p>上架时间:{{goods.add_time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
    .goods-container{
        background-color: #eeeeee;
        overflow: hidden;
        .now_price{
            font-size: 16px;
            color: red;
            font-weight: bold;
        }
        .mui-card-footer{
            display: block;
            button{
                margin: 15px 0;
            }
        }
        .ball{
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: red;
            position: absolute;
            z-index: 99;
            left: 155px;
            top: 390px;
        }
    }
</style>
<script>
    import swiper from "../sunComponents/swiper.vue"
    import numBox from "../sunComponents/goodsList_numBox.vue"
    export default {
        data(){
            return{
                id: this.$route.params.id,
                lubutu:[],
                goods:{},
                ball:false,
                selectedCount:1,
            }
        },
        created(){
            this.getLunBo();
            this.getGoods();
        },
        methods:{
          getLunBo(){
              //获取轮播图数据
              this.$http.get('api/getthumimages/' + this.id).then( result => {
                  if(result.body.status === 0){
                      result.body.message.forEach( item =>{
                          item.img = item.src;
                      });
                      this.lubutu = result.body.message;
                  }
              })
          },
          getGoods(){
              //获取商品参数信息
              this.$http.get('api/goods/getinfo/'+ this.id).then( result => {
                  if(result.body.status === 0){
                      this.goods = result.body.message[0];
                  }
              })
          },
          getDesc(id){
              //编程式导航获取图文信息
              this.$router.push({
                  name:"goodsDesc",
                  params:{ id }
              })
          },
          getComment(id){
              //编程式导航获取评论
              this.$router.push({
                  name:"goodsComment",
                  params:{ id }
              })
          },
          addShopCar(){
              //加入购物车动画
              this.ball = !this.ball;
              var goodInfo = {
              //{id:商品的id, count:商品的数量，price:商品的价格，selected:false}
                  id: this.id,
                  count: this.selectedCount,
                  price: this.goods.sell_price,
                  selected: true,
              };
              this.$store.commit("addCar",goodInfo);
          },
          beforeEnter(el){
              //小球准备动画 钩子函数
              el.style.transform = "translate(0, 0)";
          },
          enter(el,done){
              //小球动画 钩子函数
              el.offsetWidth;
              //getBoundingClientRect返回一个对象　rectObject.top：元素上边到视窗上边的距离;rectObject.right：元素右边到视窗左边的距离;rectObject.bottom：元素下边到视窗上边的距离;rectObject.left：元素左边到视窗左边的距离;
              const ballPosition = this.$refs.ball.getBoundingClientRect();
              const badgePosition = document.getElementById("badge").getBoundingClientRect();
              const xDist = badgePosition.left - ballPosition.left;
              const yDist = badgePosition.top - ballPosition.top;
              el.style.transform= `translate(${xDist}px, ${yDist}px)`;
              el.style.transition = "all 0.5s ease";
              done();
          },
          afterEnter(el){
              //小球完成动画 钩子函数
              this.ball = !this.ball;
          },
          getSelectedCount(count){
              //通过父组件给子组件传方法 获取子组件的值
              this.selectedCount = count;
          }


        },
        components:{
            //注册轮播图组件和数字框组件
            swiper,
            numBox,
        }
    }
</script>
<template>
    <div class="foot">
        <div class="footer-main">
            <div class="footer-xlx">
                <img class="xlx" src="/image/logo02.png" alt="" />
            </div>
            <div class="footer-factory">
                <img class="factory" src="/image/foot-factory.png" alt="">
            </div>
            <div class="copytight">
                <ul class="copy-top">
                    <li><a href="#">关于我们</a></li>
                    <li>｜</li>
                    <li><a href="#">联系我们</a></li>
                    <li>｜</li>
                    <li><a href="#">意见反馈</a></li>
                    <li>｜</li>
                    <li><a href="#">版权声明</a></li>
                </ul>
                <div class="copy-bottom">
                  <span class="">{{webconfig.copyright ? webconfig.copyright : ""}}</span>
                  <a class="go" href="https://beian.miit.gov.cn/" target="_blank">{{webconfig.icp ? webconfig.icp : ""}}</a>
                  <p style="text-align: center;margin-top: 5px">
                    <a href="javascript:;" style="color: #FFF" @click="goAgreement(userServiceAgreement.code)">《{{userServiceAgreement.title}}》</a>
                    <a href="javascript:;" style="color: #FFF" @click="goAgreement(privateAgreement.code)">《{{privateAgreement.title}}》</a>
                  </p>

                </div>
            </div>
            <div class="wx">
                <div class="wx-bg">
                    <img :src="guanfangwx.imgUrl" :alt="guanfangwx.imageName" :title="guanfangwx.imageName">
                </div>
                <div class="wx-dsc">{{guanfangwx.imageName}}</div>
            </div>
            <div class="wx">
                <div class="wx-bg">
                    <img :src="teacherwx.imgUrl" :alt="teacherwx.imageName" :title="teacherwx.imageName">
                </div>
                <div class="wx-dsc">{{teacherwx.imageName}}</div>
            </div>

        </div>
    </div>
</template>

<script>
import {getImageByCode} from '@/common/api/picture.js'
import imgCode from '@/common/globalImages.js'
import {webConfig} from '@/common/api/webConfig.js'
import {getAgreementByCode} from '@/common/api/agreement'

export default{
    data(){
        return{
          webconfig: {
            id: "",//主键
            keywords: "",//站点关键字
            ext03: "",//扩展字段3
            ext02: "",//扩展字段2
            title: "",//网站标题
            logo: "",//网站LOGO
            ext01: "",//扩展字段1
            icp: "",//备案号
            copyright: "",//网站版权信息
            website: "",//网址
            description: ""//网站描述
          },
          userServiceAgreement: {
            id: "",
            title: "",
            content: "",
            code: ""
          },
          privateAgreement:{
            id: "",
            title: "",
            content: "",
            code: ""
          },
          guanfangwx:{
              imageName:'',
              imgUrl:''
          },
          teacherwx:{
              imageName:'',
              imgUrl:''
          }
        }
    },
    created(){
      this.__init()
      this.getImageByCodeGuanfangwx()
      this.getImageByCodeTeacherwx()
      this.getServiceAgreement("6HG6326I");//
      this.getPrivateAgreement("6GFL2QGQ");//
    },
    methods:{
      async __init(){
        let res = await webConfig()
        this.webconfig = res.data.data
      },
      //获取服务协议
      getServiceAgreement(code){
        getAgreementByCode(code).then(res => {
          if(res.meta.code === '200'){
            this.userServiceAgreement = res.data.data
          }
        })
      },
      //获取隐私协议
      getPrivateAgreement(code){
        getAgreementByCode(code).then(res => {
          if(res.meta.code === '200'){
            this.privateAgreement = res.data.data
          }
        })
      },
      //跳转到隐私页面
      goAgreement(code){
        this.$router.push({
          path: '/agreement',
          query: {
            code: code,
          }
        })
      },
      getImageByCodeGuanfangwx(){
          getImageByCode({imageCode:imgCode.global_guanfangcode}).then(res => {
            let data = res.data.data;
            this.guanfangwx = {
                imageName:data.imageName,
                imgUrl:data.imageUrl
            }
          })
      },
      getImageByCodeTeacherwx(){
          getImageByCode({imageCode:imgCode.global_teachercode}).then(res => {
            let data = res.data.data;
            this.teacherwx = {
                imageName:data.imageName,
                imgUrl:data.imageUrl
            }
          })
      }
    }
}


</script>

<style scoped>
.foot{
    width: 100%;
    min-width: 1200px;
    height: 150px;
    background: #3483FF;
    opacity: 1;
    border-radius: 0px;
}
.footer-main{
    display: flex;
  justify-content: space-around;
    align-items: center;
    width: 1200px;
    height: 100%;
    color: #FFFFFF;
    margin: auto;
}
.footer-xlx{
    width:110px;
    opacity: 1;
}
.xlx{
    width: 100%;
    height: 100%;
}
.footer-factory{
    width: 130px;
    margin:0 20px;

}
.factory{
    width: 100%;
    height: 100%;
}
.copy-top{
    font-size: 14px;
    margin:0 10px 10px 50px;
    display: flex;
}
.copy-top li{
    margin: 0 10px;
}
.copy-top li a{
    color: #FFFFFF !important;
}
.copy-bottom{
    font-size: 12px;
}
.wx{
    margin-left: 20px;
    width: 80px;
    height: 100px;

    font-size: 12px;
}
.wx-bg{

    width: 80px;
    height: 80px;

}
.wx img{
    width: 100%;
    height: 100%;
}
.wx-dsc{
  text-align: center;
}
.go{
    color: #FFFFFF;
    text-decoration:underline;
    padding-left:10px
}
</style>

<template>
  <div class="order">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="order-tabs">
      <el-tab-pane label="全部订单" name="first">
        <OrderItem :orderList="totalList"></OrderItem>
        <pagination
          v-show="totalPage > 0"
          :total="totalPage"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getList"
        />
      </el-tab-pane>
      <el-tab-pane label="已完成" name="second">
        <OrderItem :orderList="completedList"></OrderItem>
        <pagination
          v-show="completePage > 0"
          :total="completePage"
          :page.sync="finishquery.pageNum"
          :limit.sync="finishquery.pageSize"
          @pagination="finish"
        />
      </el-tab-pane>
      <el-tab-pane label="未完成" name="third" >
        <OrderItem :orderList="incompleteList"></OrderItem>
        <pagination
          v-show="incomplepage > 0"
          :total="incomplepage"
          :page.sync="overtimequery.pageNum"
          :limit.sync="overtimequery.pageSize"
          @pagination="overtime"
        />
      </el-tab-pane>
      <el-tab-pane label="订单关闭" name="fourth">
        <OrderItem :orderList="invalidList"></OrderItem>
        <pagination
          v-show="invPage > 0"
          :total="invPage"
          :page.sync="closedquery.pageNum"
          :limit.sync="closedquery.pageSize"
          @pagination="closed"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderItem from "./OrderItem.vue";
import { getByMemberId } from "@/common/api/order";
export default {
  data() {
    return {
      totalList: [],
      totalPage: 0,
      completedList: [],
      completePage:0,
      incompleteList: [],
      incomplepage: 0,
      invalidList: [],
      invPage: 0,
      activeName: "first",
      query: {
        pageSize: 10,
        pageNum: 1,
        entity: {
          orderStatus: null,
        },
      },
      finishquery:{
        pageSize: 10,
        pageNum: 1,
        entity: {
          orderStatus: "finish",
        },
      },
      overtimequery:{
        pageSize: 10,
        pageNum: 1,
        entity: {
          orderStatus: "overtime",
        },
      },
      closedquery:{
        pageSize: 10,
        pageNum: 1,
        entity: {
          orderStatus: "closed",
        },
      }
    };
  },
  components: {
    OrderItem,
  },
  created() {

    this.getList();
  },
  methods: {

    getList() {
      getByMemberId(this.query).then((res) => {
        this.totalList = res.data.pageInfo.list;
        this.totalPage = res.data.pageInfo.total;
      });
    },
    finish(){
      // this.query.entity.orderStatus = "finish";
        getByMemberId(this.finishquery).then((res) => {
          if(res.meta.code == "200"){
            this.completedList = res.data.pageInfo.list;
            this.completePage = res.data.pageInfo.total;
          }else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }

        });
    },
    overtime(){
      // this.query.entity.orderStatus = "overtime";
        getByMemberId(this.overtimequery).then((res) => {
          if(res.meta.code == "200"){
            this.incompleteList = res.data.pageInfo.list;
            this.incomplepage = res.data.pageInfo.total
          }else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }

        });
    },
    closed(){
      // this.query.entity.orderStatus = "closed";
        getByMemberId(this.closedquery).then((res) => {
          if(res.meta.code == "200"){
            this.invalidList= res.data.pageInfo.list;
            this.invPage = res.data.pageInfo.invPage
          }else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }
        });
    },
    handleClick(tab, event) {
      if (this.activeName === "second") {
        this.finish()
      } else if (this.activeName === "third") {
        this.overtime()
      }else if(this.activeName === "fourth") {
        this.closed()
      }else {
        this.getList()
      }
    },
  },
};
</script>

<style scoped>
.order-tabs {
  margin-left: 20px;
}
</style>


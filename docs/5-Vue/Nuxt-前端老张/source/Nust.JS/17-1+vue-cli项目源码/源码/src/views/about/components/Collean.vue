<template>
  <div class="my-course">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tabs">
      <el-tab-pane label="全部" name="first">
        <ColleanItem :courseList="totalList"></ColleanItem>
        <pagination
          v-show="totalpage > 0"
          :total="totalpage"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getList"
        />
      </el-tab-pane>
      <el-tab-pane label="免费课程" name="second">
        <ColleanItem :courseList="freeList"></ColleanItem>
        <pagination
          v-show="freepage > 0"
          :total="freepage"
          :page.sync="freequery.pageNum"
          :limit.sync="freequery.pageSize"
          @pagination="getfree"
        />
      </el-tab-pane>
      <el-tab-pane label="会员课程" name="third">
        <ColleanItem :courseList="vipList"></ColleanItem>
        <pagination
          v-show="vippage > 0"
          :total="vippage"
          :page.sync="vipquery.pageNum"
          :limit.sync="vipquery.pageSize"
          @pagination="getvip"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ColleanItem from "./ColleanItem.vue";
import { getFavoriteList } from "@/common/api/favorite";
import { createToken } from "@/common/api/auth";
export default {
  data() {
    return {
      activeName: "first",
      totalList: [],
      totalpage:0,
      freeList: [],
      freepage:0,
      vipList: [],
      vippage:0,
      query: {
        pageSize: 10,
        pageNum: 1,
        token: null,
        entity: {
          isFree: null,
          isMember: null,
        },
      },
      freequery: {
        pageSize: 10,
        pageNum: 1,
        token: null,
        entity: {
          isFree: 1,
          isMember: null,
        },
      },
      vipquery: {
        pageSize: 10,
        pageNum: 1,
        token: null,
        entity: {
          isFree: null,
          isMember: 1,
        },
      },
    };
  },
  components: {
    ColleanItem,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      createToken().then((res) => {
        if (res.data.token) {
          this.query.token = res.data.token;
          getFavoriteList(this.query)
            .then((res) => {
              if (res.meta.code === "200") {
                  this.totalList = res.data.pageInfo.list;
                  this.totalpage = res.data.pageInfo.total
                } else {
                  this.$message({
                    message: res.meta.msg,
                    type: "error",
                  });
                }

            })
            .catch(err => {});
        }
      });
    },
     getfree() {
      createToken().then((res) => {
        if (res.data.token) {
          this.freequery.token = res.data.token;
          getFavoriteList(this.freequery)
            .then((res) => {
              if (res.meta.code === "200") {
                  this.freeList = res.data.pageInfo.list;
                  this.freepage = res.data.pageInfo.total
                } else {
                  this.$message({
                    message: res.meta.msg,
                    type: "error",
                  });
                }

            })
            .catch((err) =>{})
        }
      });
    },
     getvip() {
      createToken().then((res) => {
        if (res.data.token) {
          this.vipquery.token = res.data.token;
          getFavoriteList(this.vipquery)
            .then((res) => {
              if (res.meta.code === "200") {
                  this.vipList= res.data.pageInfo.list;
                  this.vippage = res.data.pageInfo.total;
                } else {
                  this.$message({
                    message: res.meta.msg,
                    type: "error",
                  });
                }

            })
            .catch((err) =>{})
        }
      });
    },
    handleClick(tab, event) {
      if (this.activeName === "second") {
        this.getfree()
      } else if (this.activeName === "third") {
        this.getvip()
      } else {
        this.getList();
      }
    },
  },
};
</script>

<style scoped>
.course-tabs {
  margin-left: 20px;
}
</style>

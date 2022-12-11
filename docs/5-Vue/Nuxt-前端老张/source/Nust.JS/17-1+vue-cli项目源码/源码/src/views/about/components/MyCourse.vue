<template>
  <div class="my-course">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tabs">
      <el-tab-pane label="全部" name="first">
        <CourseItem :courseList="totalList"></CourseItem>
        <pagination
          v-show="totalpage > 0"
          :total="totalpage"
          :page.sync="query.pageNum"
          :limit.sync="query.pageSize"
          @pagination="getList"
        />
      </el-tab-pane>
      <el-tab-pane label="免费课程" name="second">
        <CourseItem :courseList="freeList"></CourseItem>
        <pagination
          v-show="freepage > 0"
          :total="freepage"
          :page.sync="freequery.pageNum"
          :limit.sync="freequery.pageSize"
          @pagination="getfree"
        />
      </el-tab-pane>
      <el-tab-pane label="会员课程" name="third">
        <CourseItem :courseList="vipList"></CourseItem>
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
import CourseItem from "./CourseItem.vue";
import { myCourses } from "@/common/api/course";

export default {
  data() {
    return {
      activeName: "first",
      courseList: 1,
      currentNav: 0,
      totalList: [],
      totalpage: 0,
      freeList: [],
      freepage:0,
      vipList: [],
      vippage: 0,
      query: {
        pageSize: 10,
        pageNum: 1,
        entity: {
          isFress: null,
          isMember: null,
        },
      },
      freequery:{
        pageSize: 10,
        pageNum: 1,
        entity: {
          isFree: 1,
          isMember: null,
        },
      },
      vipquery: {
        pageSize: 10,
        pageNum: 1,
        entity: {
          isFree: 0,
          isMember: 1,
        },
      }
    };
  },
  components: {
    CourseItem,
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      myCourses(this.query)
        .then((res) => {
          if (res.meta.code == "200") {
            res.data.pageInfo.list.map((item) => {
              switch (item.courseLevel) {
                case 1:
                  item.courseLevel = "初级";
                  break;
                case 2:
                  item.courseLevel = "中级";
                  break;
                case 3:
                  item.courseLevel = "高级";
                  break;
              }
            });
            this.totalList = res.data.pageInfo.list;
            this.totalpage = res.data.pageInfo.total;
          } else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {

        });
    },
    getfree(){
      myCourses(this.freequery)
        .then((res) => {
          if (res.meta.code == "200") {
            res.data.pageInfo.list.map((item) => {
              switch (item.courseLevel) {
                case 1:
                  item.courseLevel = "初级";
                  break;
                case 2:
                  item.courseLevel = "中级";
                  break;
                case 3:
                  item.courseLevel = "高级";
                  break;
              }
            });
            this.freeList = res.data.pageInfo.list;
            this.freepage = res.data.pageInfo.total;
          } else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {});
    },
    getvip(){
      myCourses(this.vipquery)
        .then((res) => {
          if (res.meta.code == "200") {
            res.data.pageInfo.list.map((item) => {
              switch (item.courseLevel) {
                case 1:
                  item.courseLevel = "初级";
                  break;
                case 2:
                  item.courseLevel = "中级";
                  break;
                case 3:
                  item.courseLevel = "高级";
                  break;
              }
            });
            this.vipList = res.data.pageInfo.list;
            this.vippage = res.data.pageInfo.total;
          } else {
            this.$message({
              message: res.meta.msg,
              type: "error",
            });
          }
        })
        .catch((err) => {});
    },
    handleClick(tab, event) {
      // this.getList()
      if (this.activeName === "first") {
        this.getList()
      } else if (this.activeName === "second") {
        this.getfree()
      } else if (this.activeName === "third") {
        this.getvip()
      }
    },
  },
};
</script>

<style scoped>
.course-tabs {
  margin-left: 20px;
  /* height: 800px; */
}
</style>

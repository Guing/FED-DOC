<template>
  <div class="my-course">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="course-tabs">
      <el-tab-pane label="全部消息" name="first">
        <!-- <happy-scroll> -->
          <MessageItem :messList="totalList"></MessageItem>
          <pagination
            v-show="totalListPage > 0"
            :total="totalListPage"
            :page.sync="query.pageNum"
            :limit.sync="query.pageSize"
            @pagination="getTotalList"
          />
        <!-- </happy-scroll> -->
      </el-tab-pane>
      <el-tab-pane label="已读消息" name="second" >
        <!-- <happy-scroll> -->
          <MessageItem :messList="readList"></MessageItem>
        <pagination
          v-show="readListPage > 0"
          :total="readListPage"
          :page.sync="readquery.pageNum"
          :limit.sync="readquery.pageSize"
          @pagination="getReadList"
        />
        <!-- </happy-scroll> -->

      </el-tab-pane>
      <el-tab-pane label="未读消息" name="third">
        <!-- <happy-scroll> -->
          <MessageItem :messList="unread"></MessageItem>
        <pagination
          v-show="unreadPage > 0"
          :total="unreadPage"
          :page.sync="unreadquery.pageNum"
          :limit.sync="unreadquery.pageSize"
          @pagination="getunreadList"
        />
        <!-- </happy-scroll> -->

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import MessageItem from "./MessageItem.vue";
import { getByMemberId } from "@/common/api/message";
export default {
  data() {
    return {
      activeName: "first",
      totalList: [],
      totalListPage: 0,
      readList: [],
      readListPage: 0,
      unread: [],
      unreadPage: 0,
      query: {
        pageSize: 10,
        pageNum: 1,
        entity: {
          status: null,
        },
      },
      readquery:{
        pageSize: 10,
        pageNum: 1,
        entity: {
          status: 2,
        },
      },
      unreadquery:{
        pageSize: 10,
        pageNum: 1,
        entity: {
          status: 1,
        },
      }

    };
  },
  components: {
    MessageItem,
  },
  created() {
    this.getTotalList();
  },
  methods: {
    getTotalList() {
      // this.query.entity.status = null;
      getByMemberId(this.query).then((res) => {
        if (res.meta.code == "200") {
          this.totalListPage = res.data.pageInfo.total;
          this.totalList = res.data.pageInfo.list;
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error",
          });
        }
      });
    },
    getReadList() {
      // this.query.entity.status = 2;
      getByMemberId(this.readquery).then((res) => {
        if (res.meta.code == "200") {
          this.readListPage = res.data.pageInfo.total;
          this.readList = res.data.pageInfo.list;
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error",
          });
        }
      });
    },
    getunreadList() {
      // this.query.entity.status = 1;
      getByMemberId(this.unreadquery).then((res) => {
        if (res.meta.code == "200") {
          this.unreadPage = res.data.pageInfo.total;
          this.unread = res.data.pageInfo.list;
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error",
          });
        }
      });
    },
    handleClick(tab, event) {
      if (this.activeName === "second") {
        this.getReadList();
      } else if (this.activeName == "third") {
        this.getunreadList();
      } else {
        this.getTotalList();
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

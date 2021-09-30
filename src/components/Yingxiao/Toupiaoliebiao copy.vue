<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">投票列表</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="搜索：">
            <div class="search">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="formInline.search"
                class="input-with-select"
              >
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              icon="el-icon-search"
              type="primary"
              @click="onSubmit"
              >搜索</el-button
            >
            <el-button size="small" @click="onReact">重置</el-button>
          </el-form-item>
        </el-form>
      </div>-->
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加投票</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="title" title="标题"></vxe-table-column>
          <vxe-table-column field="start_time" min-width="120" title="开始时间"></vxe-table-column>
          <vxe-table-column field="end_time" min-width="120" title="结束时间"></vxe-table-column>
          <vxe-table-column field="add_time" min-width="120" title="创建时间"></vxe-table-column>
          <vxe-table-column title="操作状态" width="140">
            <template slot-scope="scope">
              <div class="flex">
                <!-- <el-button size="small" @click="editLh(scope.row)" type="text">编辑</el-button> -->
                <el-button size="small" @click="delLh(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.toupiaoliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加投票 -->
    <el-dialog
      title="添加投票"
      :visible.sync="lhDialogVisible"
      width="530px"
      :before-close="lhHandleClose"
    >
      <div class="lhmyForm">
        <el-form
          :model="lhForm"
          :rules="rules"
          ref="lhForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="标题：" prop="title">
            <el-input size="small" v-model="lhForm.title"></el-input>
          </el-form-item>
          <el-form-item label="时间：">
            <el-date-picker
            size="small"
              v-model="lhForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format='timestamp'
            ></el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="购买价格：" prop="price">
            <el-input size="small" v-model="lhForm.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格：" prop="ot_price">
            <el-input size="small" v-model="lhForm.ot_price"></el-input>
          </el-form-item>-->
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('lhForm')">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["toupiaoliebiaoPage", "toupiaoliebiaoPageSize"])
  },
  watch: {
    toupiaoliebiaoPage: function(page) {
      this.$store.commit("toupiaoliebiaoPage", page);
      this.getData();
    },
    toupiaoliebiaoPageSize: function(pageSize) {
      this.$store.commit("toupiaoliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      id:'',
      activeName: "1",
      formInline: {
        search: ""
      },
      options: [],
      tableData: [],
      total: 0,
      lhForm: {
        title: "",
        time: []
      },
      lhDialogVisible: false,
      rules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        price: [{ required: true, message: "请输入购买价格", trigger: "blur" }],
        ot_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.vote_list({
        limit: this.toupiaoliebiaoPageSize,
        page: this.toupiaoliebiaoPage,
        keyword: this.formInline.search
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        ele.start_time = this.formatDate(ele.start_time * 1000);
        ele.end_time = this.formatDate(ele.end_time * 1000);
      });
      // const res2 = await this.$api.categoryIndex({
      //   pid: 0,
      // });
      // res2.data.forEach((ele) => {
      //   ele.value = ele.id;
      //   ele.label = ele.cate_name;
      //   if (ele.children) {
      //     ele.children.forEach((item) => {
      //       item.value = item.id;
      //       item.label = item.cate_name;
      //     });
      //   }
      // });
      // this.options = res2.data;
    },
    formatDate(date1) {
      var date = new Date(date1);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
    async submitForm(formName) {
      console.log(formName, this.lhForm);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$api.add_vote({
            title: this.lhForm.title,
            start_time: this.lhForm.time[0]/1000,
            end_time: this.lhForm.time[1]/1000,
          });
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.getData();
            this.lhDialogVisible = false;
          } else {
            this.$message.error(res.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    lhHandleClose() {
      this.lhDialogVisible = false;
    },
    async delLh(row) {
      const res = await this.$api.del_vote({
        id: row.id
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      } else {
        this.$message.error(res.msg);
      }
    },
    editLh(row){
      console.log(row);
      this.lhForm.title = row.title;
      this.lhForm.time = [Date.parse(row.start_time),Date.parse(row.end_time)];
      this.id = row.id;
      this.lhDialogVisible = true;
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    onReact() {},
    toAddShop() {
      this.id = '';
      this.lhDialogVisible = true;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("toupiaoliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("toupiaoliebiaoPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
    .search {
      /deep/ .el-select {
        width: 100px;
      }
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.lhmyForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
</style>
<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">投票统计</div>
    </div>
    <div class="nav3">
      <div class="myForm">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="时间选择：">
                <!-- <el-radio-group v-model="form.rad1" size="small">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="今天"></el-radio-button>
                  <el-radio-button label="昨天"></el-radio-button>
                  <el-radio-button label="最近7天"></el-radio-button>
                  <el-radio-button label="最近30天"></el-radio-button>
                  <el-radio-button label="本月"></el-radio-button>
                  <el-radio-button label="本年"></el-radio-button>
                </el-radio-group>-->
                <el-date-picker
                  value-format="yyyy-MM"
                  size="small"
                  style="margin-left:20px;transform: translateY(1px);"
                  v-model="form.time"
                  type="month"
                  placeholder="选择月份"
                ></el-date-picker>
                <el-button style="margin-left:20px" size="small" type="primary" @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="拼团状态：">
                <el-radio-group v-model="form.rad2" size="small">
                  <el-radio-button label="进行中"></el-radio-button>
                  <el-radio-button label="已完成"></el-radio-button>
                  <el-radio-button label="未完成"></el-radio-button>
                </el-radio-group>
                <el-button style="margin-left:20px" size="small" type="primary" @click="onSubmit"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>-->
        </el-form>
      </div>
      <!-- <div class="tit1">
        <el-button @click="AddZhuti" size="small" type="primary" icon="el-icon-plus">添加投票</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table :tree-config="{ children: 'category' }" :data="tableData">
          <vxe-table-column field="question" width="500" title="问题"></vxe-table-column>
          <vxe-table-column field="Ab" min-width="80" title="A(总数/占比%)"></vxe-table-column>
          <vxe-table-column field="Bb" min-width="80" title="B(总数/占比%)"></vxe-table-column>
          <vxe-table-column field="Cb" min-width="80" title="C(总数/占比%)"></vxe-table-column>
          <vxe-table-column field="Db" min-width="80" title="D(总数/占比%)"></vxe-table-column>
        </vxe-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "pintuanShangpingliebiaoShopPage",
      "pintuanShangpingliebiaoShopPageSize",
      "maichanghuodongnoAddSeeShopPage",
      "maichanghuodongnoAddSeeShopPageSize",
      "seeShopPage",
      "seeShopPageSize"
    ])
  },
  watch: {
    pintuanShangpingliebiaoShopPage: function(page) {
      this.$store.commit("pintuanShangpingliebiaoShopPage", page);
      this.getShopData();
    },
    pintuanShangpingliebiaoShopPageSize: function(pageSize) {
      this.$store.commit("pintuanShangpingliebiaoShopPageSize", pageSize);
      this.getShopData();
    },
    maichanghuodongnoAddSeeShopPage: function(page) {
      this.$store.commit("maichanghuodongnoAddSeeShopPage", page);
      this.getData();
    },
    maichanghuodongnoAddSeeShopPageSize: function(pageSize) {
      this.$store.commit("maichanghuodongnoAddSeeShopPageSize", pageSize);
      this.getData();
    },
    seeShopPage: function(page) {
      this.$store.commit("seeShopPage", page);
      this.getSeeData();
    },
    seeShopPageSize: function(pageSize) {
      this.$store.commit("seeShopPageSize", pageSize);
      this.getSeeData();
    }
  },
  data() {
    return {
      addArr: [],
      form: {
        rad1: "全部",
        rad2: "",
        time: [],
        search: ""
      },
      tableData: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        add_name: "",
        tag: "",
        money: ""
      },
      rules: {
        add_name: [
          { required: true, message: "请输入主题名称", trigger: "blur" }
        ],
        tag: [{ required: true, message: "请输入标识", trigger: "blur" }],
        money: [{ required: true, message: "请输入价格", trigger: "blur" }]
      },
      EditId: "",
      addfenleiDialogVisible: false,
      tableData1: [],
      total1: 0,
      searchAddForm: {
        keyword: ""
      },
      addFenleiId: "",
      addShopId: "",
      addshopDialogVisible: false,
      tableData2: [],
      total2: 0,
      seeshopDialogVisible: false,
      total3: 0,
      tableData3: [],
      seeId: "",
      tianjiafenleiDialogVisible: false
    };
  },
  created() {
    var date = new Date();
    this.form.time = `${date.getFullYear()}-${date.getMonth()+1}`;
    console.log(this.form.time)
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.wenquan_count({
        month: this.form.time
      });
      console.log(res.data);
      this.tableData = res.data;
      this.tableData.forEach(ele => {
        ele.count = 0;
        console.log(ele);
        if (!ele.A) {
          ele.A = 0;
        }
        if (!ele.B) {
          ele.B = 0;
        }
        if (!ele.C) {
          ele.C = 0;
        }
        if (!ele.D) {
          ele.D = 0;
        }
        if (ele.A != 0) {
          ele.count += Number(ele.A);
        }
        if (ele.B != 0) {
          ele.count += Number(ele.B);
        }
        if (ele.C != 0) {
          ele.count += Number(ele.C);
        }
        if (ele.D != 0) {
          ele.count += Number(ele.D);
        }
        ele.Ab = `${Number(ele.A)}/${(Number(ele.A) / ele.count) * 100}`;
        ele.Bb = `${Number(ele.B)}/${(Number(ele.B) / ele.count) * 100}`;
        ele.Cb = `${Number(ele.C)}/${(Number(ele.C) / ele.count) * 100}`;
        ele.Db = `${Number(ele.D)}/${(Number(ele.D) / ele.count) * 100}`;
      });
      this.tableData[0].question = "你对伙食是否满意?";
      this.tableData[1].question = "饭堂的卫生情况如何?";
      this.tableData[2].question = "伙食监督委员会提出的建议能否有效落实?";
      this.tableData[3].question = "你认为餐具情况、消毒情况如何?";
      this.tableData[4].question = "你觉得菜品的种类如何?";
      this.tableData[5].question = "饭菜里有没有发现异物?";
      this.tableData[6].question = "有没有冷饭冷菜的现象?";
      this.tableData[7].question = "你觉得食堂每餐的荤素搭配如何?";
      this.tableData[8].question = "食堂饭菜的份量如何?";
      this.tableData[9].question = "你觉得食堂的就餐秩序如何?";
      this.tableData[10].question = "你对伙食保障人员的服务态度评价如何?";
      this.tableData[11].question =
        "单位是否按照“1126、6211”标准，执行落实保障三餐伙食?";
      this.tableData[12].question = "食堂食物浪费情况如何?";
      this.tableData[13].question =
        "单位是否按照要求每周制定食谱，每月公布伙食开支账目?";
      this.tableData[14].question =
        "你单位是否落实采购食品验收，三餐伙食留样制度?";
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
    async getShopData() {
      const res = await this.$api.product_list({
        limit: this.pintuanShangpingliebiaoShopPageSize,
        page: this.pintuanShangpingliebiaoShopPage
      });
      console.log(res.data.data);
      this.total2 = res.data.total;
      this.tableData2 = res.data.data;
      this.tableData2.forEach(ele => {
        // ele.is_showKG = ele.is_show == "1" ? true : false;
        ele.myStatus = ele.status == "0" ? true : false;
      });
    },
    async getFenleiData() {
      const res = await this.$api.categoryIndex({
        pid: 0,
        keyword: this.searchAddForm.keyword
        // limit:this.pingtuanliebiaoPageSize,
        // page:this.pingtuanliebiaoPage
      });
      console.log(res);
      this.tableData1 = res.data;
      this.tableData1.forEach(ele => {
        ele.is_showKG = ele.is_show == "1" ? true : false;
        if (ele.children) {
          ele.children.forEach(item => {
            item.is_showKG = item.is_show == "1" ? true : false;
          });
        }
      });
    },
    async addShop(row) {
      console.log(row);
      this.addShopId = row.id;
      this.getShopData();
      this.addshopDialogVisible = true;
    },
    async getSeeData() {
      const res = await this.$api.vote_product_list({
        vote_id: this.seeId,
        limit: this.seeShopPageSize,
        page: this.seeShopPage
      });
      console.log(res);
      this.total3 = res.data.total;
      this.tableData3 = res.data.data;
      this.tableData3.forEach(ele => {
        ele.myType =
          ele.type == "1"
            ? "主食"
            : ele.type == "2"
            ? "菜品"
            : ele.type == "3"
            ? "汤"
            : "饮料";
      });
    },
    async seeShop(row) {
      console.log(row);
      this.seeId = row.id;
      this.getSeeData();
      this.seeshopDialogVisible = true;
    },
    async tabDelShop(row) {
      console.log(row);
      const res = await this.$api.del_vote_product({
        vote_product_id: row.id
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        const res2 = await this.$api.vote_product_list({
          vote_id: this.seeId,
          limit: this.maichanghuodongSeeShopPageSize,
          page: this.maichanghuodongSeeShopPage
        });
        console.log(res2);
        this.total3 = res2.data.total;
        this.tableData3 = res2.data.data;
        this.tableData3.forEach(ele => {
          ele.myType =
            ele.type == "1"
              ? "主食"
              : ele.type == "2"
              ? "菜品"
              : ele.type == "3"
              ? "汤"
              : "饮料";
        });
      } else {
        this.$message.error(res.msg);
      }
    },
    addshopHandleClose() {
      this.addshopDialogVisible = false;
    },
    tianjiafenleiHandleClose() {
      this.tianjiafenleiDialogVisible = false;
    },
    async selectAllEvent({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        var arr = [];
        records.forEach(ele => {
          if (ele.pid == 0) {
            arr.push(ele.id);
          }
        });
        const res = await this.$api.activityAdd_cate_gift({
          id: this.addFenleiId,
          category_id: arr
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async selectChangeEvent({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        console.log(row.id);
        const res = await this.$api.activityAdd_cate_gift({
          id: this.addFenleiId,
          category_id: row.id
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async addZS() {
      const res = await this.$api.add_vote_product({
        vote_id: this.addShopId,
        product_id: this.addArr,
        type: 1
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.tianjiafenleiDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    async addT() {
      const res = await this.$api.add_vote_product({
        vote_id: this.addShopId,
        product_id: this.addArr,
        type: 3
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.tianjiafenleiDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    async addYL() {
      const res = await this.$api.add_vote_product({
        vote_id: this.addShopId,
        product_id: this.addArr,
        type: 4
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.tianjiafenleiDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    async addCP() {
      const res = await this.$api.add_vote_product({
        vote_id: this.addShopId,
        product_id: this.addArr,
        type: 2
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.tianjiafenleiDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    async selectAllEvent2({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        this.addArr = [];
        records.forEach(ele => {
          this.addArr.push(ele.id);
        });
      }
    },
    async selectChangeEvent2({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        this.addArr = [];
        records.forEach(ele => {
          this.addArr.push(ele.id);
        });
      }
      // if (checked) {
      //   console.log(row.id);
      //   const res = await this.$api.add_vote_product({
      //     vote_id: this.addShopId,
      //     product_id: row.id
      //   });
      //   console.log(res);
      //   if (res.code == 200) {
      //     this.$message({
      //       message: res.msg,
      //       type: "success"
      //     });
      //   } else {
      //     this.$message.error(res.msg);
      //   }
      // }
    },
    seeshopHandleClose() {
      this.seeshopDialogVisible = false;
    },
    AddZhuti() {
      this.addDialogVisible = true;
    },
    seeXiangqin(row) {
      console.log(row);
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    onSubmit() {
      console.log(this.form);
      this.getData();
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    addfenleiHandleClose() {
      this.addfenleiDialogVisible = false;
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pingtuanliebiaoPage", val);
    },
    searchAddOnSubmit() {
      this.getFenleiData();
    },
    searchAddOnResult() {
      this.searchAddForm.keyword = "";
      this.$store.commit("pingtuanliebiaoPage", 1);
      this.getFenleiData();
    },
    editZhuti(row) {
      console.log(row);
      this.addForm.add_name = row.title;
      this.addDialogVisible = true;
      this.EditId = row.id;
    },
    async delZhutiFenlei(row) {
      console.log(row);
      const res = await this.$api.del_vote({
        id: row.id
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    async delZhuti(row) {
      console.log(row);
      const res = await this.$api.activityDel_gift({
        id: row.id
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    addZhutiFenlei(row) {
      this.addFenleiId = row.id;
      this.addfenleiDialogVisible = true;
      this.getFenleiData();
    },
    AddOnSubmit(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$api.add_vote({
            title: this.addForm.title,
            start_time: this.addForm.time[0] / 1000,
            end_time: this.addForm.time[1] / 1000
          });
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.getData();
            this.addDialogVisible = false;
          } else {
            this.$message.error(res.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pingtuanliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pingtuanliebiaoPage", val);
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pintuanShangpingliebiaoShopPageSize", val);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`, 2);
      this.$store.commit("pintuanShangpingliebiaoShopPage", val);
    },
    handleSizeChange3(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("seeShopPageSize", val);
    },
    handleCurrentChange3(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("seeShopPage", val);
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
  margin-top: 20px;
  height: 110px;
  .box {
    background: #fff;
    height: 110px;
    box-shadow: 0px 0 4px 2px #dddddd !important;
  }
}
.nav3 {
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
      margin-top: 3px;
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
  }
}
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
  }
  .myImg {
    position: relative;
    width: 60px;
    height: 60px;
    display: inline-block;
    margin-right: 12px;
    .closeBtn {
      position: absolute;
      top: -6px;
      right: -4px;
      width: 20px;
      height: 20px;
      .el-button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    /deep/ .image-slot {
      border: 1px solid #ddd;
      border-radius: 4px;
      background-color: #fafafa;
      width: 58px;
      height: 58px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
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
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
</style>
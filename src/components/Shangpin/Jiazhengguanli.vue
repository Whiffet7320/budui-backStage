<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">家政管理</div>
      <!-- <div class="tit2">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="商品" name="1"></el-tab-pane>
          <el-tab-pane label="家政" name="2"></el-tab-pane>
        </el-tabs>
      </div>-->
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品分类：">
            <el-cascader size="small" :options="options" :props="{ checkStrictly: true }" clearable></el-cascader>
          </el-form-item>
          <el-form-item label="商品搜索：">
            <el-input size="small" v-model="formInline.user" placeholder="商品搜索"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
      </div> -->
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加家政</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <!-- <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">分类：{{row.category_name}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">商品市场价格：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">成本价：{{ row.price }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">收藏：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">虚拟销量：3C数码/手机</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>-->
          <vxe-table-column field="id" title="家政ID"></vxe-table-column>
          <vxe-table-column field="role" title="家政图">
            <template slot-scope="scope">
              <el-image :src="scope.row.avatar" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="title" title="标题"></vxe-table-column>
          <vxe-table-column field="sell_num" title="销量"></vxe-table-column>
          <vxe-table-column field="category_name" title="分类"></vxe-table-column>
          <!-- <vxe-table-column field="sort" title="排序"></vxe-table-column> -->
          <vxe-table-column field="myStatus" title="状态(是否上架)">
            <template slot-scope="scope">
              <el-switch @change="changeKG(scope.row)" v-model="scope.row.myStatus"></el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column field="add_time" title="创建时间"></vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">编辑</el-button>
                <!-- <el-button
                  size="small"
                  @click="toEditShop(scope.row)"
                  type="text"
                  >查看评论</el-button
                >-->
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <!-- 添加/编辑家政 -->
        <el-dialog
          title="添加/编辑家政"
          :visible.sync="addDialogVisible"
          width="700px"
          :before-close="addHandleClose"
        >
          <div class="myAddForm">
            <el-form :model="addForm" ref="addForm" label-width="100px" class="demo-addForm">
              <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="父级">
                <el-select
                  size="small"
                  v-model="addForm.pid"
                  placeholder="请选择"
                >
                  <el-option label="顶级分类" value="0"></el-option>
                  <el-option
                    v-for="item in tableData"
                    :key="item.id"
                    :label="item.cate_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
              </el-row>-->
              <el-row>
                <el-col :span="20">
                  <el-form-item label="家政标题：">
                    <el-input size="small" placeholder="请输入家政标题" v-model="addForm.title"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="20">
                  <el-form-item label="家政图片：">
                    <div @click="companyList('avatar')" class="myImg">
                      <el-image :src="addForm.avatar" fit="fill" style="width: 60px; height: 60px">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg('avatar')" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品分类：" prop="category_id">
                    <el-cascader
                      v-model="addForm.category_id"
                      size="small"
                      :options="options"
                      clearable
                    ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
            <el-col :span="10">
              <el-form-item label="排序：">
                <el-input size="small" v-model="addForm.sort"></el-input>
              </el-form-item>
            </el-col>
              </el-row>-->
              <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="状态" prop="is_show">
                <el-radio-group v-model="addForm.is_show">
                  <el-radio label="显示"></el-radio>1
                  <el-radio label="隐藏"></el-radio>0
                </el-radio-group>
              </el-form-item>
            </el-col>
              </el-row>-->
              <el-row>
                <el-col :span="20">
                  <el-form-item>
                    <el-button size="small" type="primary" @click="AddOnSubmit('addForm')">提交</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </el-dialog>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.jiazhengliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["jiazhengliebiaoPage", "jiazhengliebiaoPageSize", "shopIndex"])
  },
  watch: {
    jiazhengliebiaoPage: function(page) {
      this.$store.commit("jiazhengliebiaoPage", page);
      this.getData();
    },
    jiazhengliebiaoPageSize: function(pageSize) {
      this.$store.commit("jiazhengliebiaoPageSize", pageSize);
      this.getData();
    },
    shopIndex: function() {
      this.activeName = this.shopIndex;
      console.log(this.activeName);
      this.getData();
    }
  },
  data() {
    return {
      imgStatus: "",
      imgFile: "",
      id: "",
      addDialogVisible: false,
      activeName: "1",
      formInline: {
        user: "",
        region: ""
      },
      options: [],
      tableData: [],
      total: 0,
      addForm: {
        title: "",
        avatar: "",
        category_id: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res2 = await this.$api.category_list({
        type: 2
      });
      console.log(res2);
      res2.data.forEach(ele => {
        ele.value = ele.id;
        ele.label = ele.category_name;
        if (ele.children) {
          ele.children.forEach(item => {
            item.value = item.id;
            item.label = item.category_name;
          });
        }
      });
      this.options = res2.data;
      const res = await this.$api.homework_list({
        limit: this.jiazhengliebiaoPageSize,
        page: this.jiazhengliebiaoPage
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        // ele.is_showKG = ele.is_show == "1" ? true : false;
        ele.myStatus = ele.status == "0" ? true : false;
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
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.update_homework_status({
        homework_id: row.id,
        status: row.myStatus == false ? "1" : "0"
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      console.log(row);
      this.$store.commit("shopObj", row);
      this.$router.push({ name: "Tianjiashangping" });
    },
    addHandleClose() {
      this.addDialogVisible = false;
      this.id = "";
    },
    async toDelShop(row) {
      console.log(row);
      const res = await this.$api.del_product({
        product_id: row.id
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    tabsHandleClick(tab) {
      console.log(tab.index);
      this.$store.commit("shopIndex", (Number(tab.index) + 1).toString());
    },
    onSubmit() {
      console.log("submit!");
    },
    toAddShop() {
      for (const key in this.addForm) {
        this.$set(this.addForm, key, "");
      }
      this.addDialogVisible = true;
      this.id = '';
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      this.addDialogVisible = true;
      this.addForm.category_id = [row.category_id];
      this.addForm.title = row.title;
      this.addForm.avatar = row.avatar;
    },
    async tabDel(row) {
      console.log(row);
      const res = await this.$api.del_homework({
        homework_id: row.id
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        setTimeout(() => {
          this.getData();
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
    AddOnSubmit(formName) {
      console.log(this.addForm);
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const res = await this.$api.save_homework({
            ...this.addForm,
            category_id: this.addForm.category_id[0],
            id:this.id
          });
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            this.addDialogVisible = false;
            this.getData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 删除图片
    delImg(val) {
      if (val == "tb") {
        this.$set(this.addForm, "pic", "");
      } else if (this.imgStatus == "dt") {
        this.$set(this.addForm, "big_pic", "");
      } else if (this.imgStatus == "avatar") {
        this.$set(this.addForm, "avatar", "");
      }
    },
    // 上传图片
    companyList(val) {
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_homework_pic(this.imgFile);
          console.log(`${this.$url}/${res.data.path}`);
          var resImg = `${this.$url}/${res.data.path}`;
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "pic", resImg);
          } else if (this.imgStatus == "dt") {
            this.$set(this.addForm, "big_pic", resImg);
          } else if (this.imgStatus == "avatar") {
            this.$set(this.addForm, "avatar", resImg);
          }
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jiazhengliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jiazhengliebiaoPage", val);
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
.displayN {
  display: none;
}
</style>
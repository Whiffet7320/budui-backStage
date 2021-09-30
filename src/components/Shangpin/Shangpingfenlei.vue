<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">商品分类</div>
       <div class="tit2">
        <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="商品分类" name="1"></el-tab-pane>
          <el-tab-pane label="家政分类" name="2"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="商品分类：">
            <el-select
              size="small"
              v-model="searchForm.pid"
              placeholder="商品分类"
            >
              <el-option label="顶级分类" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="状态：">
            <el-select v-model="searchForm.status" placeholder="状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="分类名称：">
            <el-input
              v-model="searchForm.keyword"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="searchOnSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div> -->
      <div class="tit1">
        <el-button
          @click="AddFenlei"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加分类</el-button
        >
      </div>
      <div class="myTable">
        <vxe-table
          :tree-config="{
            children: 'children',
          }"
          align="center"
          :data="tableData"
        >
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column
            tree-node
            field="category_name"
            title="分类名称"
          ></vxe-table-column>
          <!-- <vxe-table-column field="pic" title="分类图标">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.pic"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column> -->
          <!-- <vxe-table-column field="sort" title="排序"></vxe-table-column> -->
          <vxe-table-column field="add_time" title="添加时间"></vxe-table-column>
          <!-- <vxe-table-column field="is_show" title="状态(是否显示)">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG(scope.row)"
                v-model="scope.row.is_showKG"
              >
              </el-switch>
            </template>
          </vxe-table-column> -->
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="tabEdit(scope.row)"
                  >编辑</el-button
                >
                <el-button size="small" type="text" @click="tabDel(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- 添加分类 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addForm"
          label-width="100px"
          class="demo-addForm"
        >
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
          </el-row> -->
          <el-row>
            <el-col :span="20">
              <el-form-item label="分类名称：" prop="category_name">
                <el-input
                  size="small"
                  placeholder="请输入分类名称"
                  v-model="addForm.category_name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="分类图标(180*180)">
                <div @click="companyList('tb')" class="myImg">
                  <el-image
                    :src="addForm.pic"
                    fit="fill"
                    style="width: 60px; height: 60px"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg('tb')" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row>
            <el-col :span="20">
              <el-form-item label="分类大图(468*340)">
                <div @click="companyList('dt')" class="myImg">
                  <el-image
                    :src="addForm.big_pic"
                    fit="fill"
                    style="width: 60px; height: 60px"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg('dt')" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="分类类型：" prop="type">
                <el-radio-group v-model="addForm.type">
                  <el-radio label="1">商品</el-radio>
                  <el-radio label="2">家政</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <!-- <el-row>
            <el-col :span="10">
              <el-form-item label="排序：">
                <el-input size="small" v-model="addForm.sort"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="状态" prop="is_show">
                <el-radio-group v-model="addForm.is_show">
                  <el-radio label="显示"></el-radio>1
                  <el-radio label="隐藏"></el-radio>0
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button
                  size="small"
                  type="primary"
                  @click="AddOnSubmit('addForm')"
                  >提交</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
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
    ...mapState(["fenleiIndex"])
  },
  watch: {
    fenleiIndex: function() {
      this.activeName = this.fenleiIndex;
      console.log(this.activeName);
      this.getData();
    }
  },
  data() {
    return {
      activeName:'1',
      searchForm: {
        pid: "",
        status: "",
        keyword: "",
      },
      tableData: [],
      addDialogVisible: false,
      addForm: {
        category_name: "",
        type: "",
      },
      rules: {
        category_name: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        is_show: [{ required: true, message: "请选择状态", trigger: "change" }],
        type: [{ required: true, message: "请选择分类", trigger: "change" }],
      },
      imgStatus: "",
      imgFile: "",
      id: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.category_list({
        type:this.activeName,
      });
      console.log(res);
      this.tableData = res.data;
      this.tableData.forEach((ele) => {
        ele.type = ele.type.toString()
        // ele.is_showKG = ele.is_show == "1" ? true : false;
        // if (ele.children) {
        //   ele.children.forEach((item) => {
        //     item.is_showKG = item.is_show == "1" ? true : false;
        //   });
        // }
      });
    },
    tabsHandleClick(tab) {
      console.log(tab.index);
      this.$store.commit("fenleiIndex", (Number(tab.index) + 1).toString());
    },
    // 开关（显示/隐藏）
    // async changeKG(row) {
    //   console.log(row);
    //   const res = await this.$api.categorySave({
    //     ...row,
    //     is_show: row.is_showKG == true ? "1" : "0",
    //   });
    //   if (res.code == 200) {
    //     this.$message({
    //       message: res.msg,
    //       type: "success",
    //     });
    //     this.addDialogVisible = false;
    //     this.getData();
    //   }
    // },
    searchOnSubmit() {
      console.log(this.searchForm);
    },
    AddFenlei() {
      for (const key in this.addForm) {
        this.$set(this.addForm, key, "");
      }
      this.addDialogVisible = true;
    },
    addHandleClose() {
      this.addDialogVisible = false;
      this.id = '';
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      this.addDialogVisible = true;
      this.addForm = { ...row };
    },
    async tabDel(row) {
      console.log(row);
      const res = await this.$api.del_category({
        category_id:row.id
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
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
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.save_category({
            ...this.addForm,
            category_id:this.id
          });
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
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
          this.imgFile.append("image[]", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.productUpload(this.imgFile);
          console.log(res.data[0]);
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "pic", res.data[0]);
          } else if (this.imgStatus == "dt") {
            this.$set(this.addForm, "big_pic", res.data[0]);
          }
          that.$refs.fileInputList.value = '';
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
  },
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
      vertical-align: middle;
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 0px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
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
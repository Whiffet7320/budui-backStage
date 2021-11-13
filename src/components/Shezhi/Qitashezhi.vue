<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">其他设置</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <!-- <el-row>
            <el-col :span="12">
              <el-form-item label="设置公告标题：">
                <el-input size="small" v-model="ruleForm.title"></el-input>
              </el-form-item>
            </el-col>
          </el-row> -->
          <el-row>
            <el-col :span="12">
              <el-form-item label="设置公告内容：">
                <el-input size="small" v-model="ruleForm.content"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              icon="el-icon-s-promotion"
              size="small"
              type="primary"
              @click="submitForm"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id:'',
      ruleForm: {
        title:'',
        content:'',
      },
      rules: {
        title: [
          {
            required: true,
            message: "请输入公告标题",
            trigger: "blur"
          }
        ],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.get_article();
      console.log(res);
      this.ruleForm.content = res.data.content;
      this.id = res.data.id;
    },
    async submitForm() {
      const res = await this.$api.save_article({
        content:this.ruleForm.content,
        id:this.id
      })
      console.log(res)
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData()
      }else{
          this.$message.error(res.msg);
      }
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
}
</style>
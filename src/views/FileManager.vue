<template>
  <div>
    <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <el-input
          placeholder="上传文件路径，以 / 开头"
          v-model="filepath"
          clearable
        ></el-input>
      </el-col>
      <el-col :span="4">
        <el-upload
          action="#"
          :multiple="false"
          :http-request="uploadFile"
          :show-file-list="false"
          :before-upload="checkUploadFile"
        >
          <el-button type="success" round>上传文件</el-button>
        </el-upload>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="refreshTable" round
          >刷新文件列表</el-button
        >
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="resFileTableData" style="width: 100%">
        <el-table-column prop="filepath" label="文件路径"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间"></el-table-column>
        <el-table-column prop="expireTime" label="过期时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="showFile(scope.row)" type="text"
              ><i class="el-icon-view"></i
            ></el-button>
            |
            <el-button @click="deleteFile(scope.row)" type="text"
              ><i class="el-icon-delete"></i
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filepath: "",
      resFileTableData: [],
    };
  },

  methods: {
    checkUploadFile(file) {
      if (this.filepath.trim() === "") {
        this.$message.error("文件上传路径不能为空");
        return false;
      }
      if (!this.filepath.startsWith("/") || this.filepath.length <= 1) {
        this.$message.error("非法文件路径，文件路径必须以/开头");
        return false;
      }
      this.$message.info("开始上传");
      return true;
    },

    uploadFile(param) {
      const formData = new FormData();
      formData.append("file", param.file);
      formData.append("filepath", this.filepath);
      let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
      console.log(this.$axios);
      this.$axios
        .put("/base-service/res-file/upload", formData, config)
        .then((resp) => {
          if (resp.status === 200 && resp.data.code === 20000) {
            this.$message.success("上传成功");
          } else {
            console.log(resp);
            this.$message.error(resp.data.message);
          }
          this.refreshTable();
        })
        .catch((err) => {
          console.log(err);
          this.$message.warning("上传失败");
          this.refreshTable();
        });
    },

    refreshTable() {
      const that = this;
      this.$axios
        .get("/base-service/res-file/list")
        .then((resp) => {
          that.resFileTableData = resp.data.data;
          this.$message.info("刷新成功");
        })
        .catch((err) => {
          this.$message.error("刷新失败");
        });
    },

    showFile(row) {
      var filepath =
        "http://127.0.0.1:8080/leek/base-service/res-file/show" + row.filepath;
      window.open(filepath, "_blank");
    },

    deleteFile(row) {
      this.$axios.delete("/base-service/res-file/delete?filepath=" + row.filepath)
      .then((resp) => {
        this.$message.info(resp.data.message);
        this.refreshTable();
      })
      .catch((err) => {
        this.$message.error('删除失败');
      });
    },
  },
};
</script>
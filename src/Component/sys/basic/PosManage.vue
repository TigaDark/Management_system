<template>
  <div>
    <el-input
      size="small"
      style="width: 300px;margin-right: 10px"
      placeholder="添加职位"
      prefix-icon="el-icon-plus"
      v-model="posi.name"
      @keydown.enter.native="addPosition">
    </el-input>
    <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition" >添加</el-button>
    <div class="posTable">
      <el-table
        size="small"
        stripe
        :data="postions"
        border
        style="width: 70%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="55">
        </el-table-column>
        <el-table-column
          prop="name"
          label="职位名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建时间"
          width="300">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="updataHandleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-dialog
              title="提示"
              :visible.sync="updataDialogVisible"
              width="30%">
              <el-tag>职位</el-tag><el-input style="width: 150px;margin-left:20px" v-model="updataPosi.name" placeholder="请输入修改后的职位名称"></el-input>
                <span slot="footer" class="dialog-footer">
                <el-button @click="updataDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doUpdata">确 定</el-button>
                </span>
            </el-dialog>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" size="small" style="margin-top: 8px" :disabled="delePostions.length===0" @click="deleMany" >批量删除</el-button>
    </div>

  </div>
</template>

<script>
export default {
  mounted () {
    this.initPosition()
  },
  data () {
    return {
      updataPosi: {
        id: '',
        name: ''
      },
      updataDialogVisible: false,
      posi: {
        name: ''
      },
      postions: [],
      delePostions: []
    }
  },
  methods: {
    async initPosition () {
      const { data: res } = await this.$http.get('/system/basic/pos/')
      if (res) {
        this.postions = res
      }
    },
    updataHandleEdit (index, row) {
      this.updataPosi.name = row.name
      this.updataPosi.id = row.id
      this.updataDialogVisible = true
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除【' + row.name + '】职位(注意若该职位上有任职人员则无法删除), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('/system/basic/pos/' + row.id)
        if (res) {
          this.initPosition()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async addPosition () {
      if (this.posi.name) {
        const { data: res } = await this.$http.post('/system/basic/pos/', this.posi)
        if (res) {
          this.initPosition()
          this.posi.name = ''
        }
      } else {
        this.$message.error('添加的职位不能为空!')
      }
    },
    async doUpdata () {
      if (this.updataPosi.name) {
        const { data: res } = await this.$http.put('/system/basic/pos/', this.updataPosi)
        if (res) {
          this.initPosition()
          this.updataPosi.name = ''
        }
        this.updataDialogVisible = false
      } else {
        this.$message.error('添加的职位不能为空!')
      }
    },
    handleSelectionChange (rows) {
      this.delePostions = rows
    },
    async deleMany () {
      this.$confirm('此操作将永久删除【' + this.delePostions.length + '】个职位(注意若该职位上有任职人员则无法删除), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 批量删除 你传的是数组 怎么传呢? 一般都是
        let ids = '?'
        this.delePostions.forEach(item => {
          ids += 'ids=' + item.id + '&'
        })
        const { data: res } = await this.$http.delete('/system/basic/pos/' + ids)
        if (res) {
          this.initPosition()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
    .posTable{
      margin-top: 10px;
    }
</style>

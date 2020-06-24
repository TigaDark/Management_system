<template>
  <div>
    <el-input
      size="small"
      style="width: 300px;margin-right: 10px"
      placeholder="添加职称"
      prefix-icon="el-icon-plus"
      v-model="job.name"
      @keydown.enter.native="addJob">
    </el-input>
    <el-select v-model="job.titleLevel" placeholder="职称等级" clearable size="small">
      <el-option
        v-for="item in titleLevels"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
    <el-button icon="el-icon-plus" size="small" type="primary" @click="addJobLevel" style="margin-left: 8px">添加</el-button>
    <div class="posTable">
      <el-table
        size="small"
        stripe
        :data="jobs"
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
          label="职称名称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="titleLevel"
          label="职称级别"
          width="120">
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createDate"
        >
        </el-table-column>
        <el-table-column
          label="是否启用">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
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
              <el-tag>职称</el-tag>
              <el-input style="width: 150px;margin-left:40px" v-model="updatajob.name" placeholder="请输入修改后的职称名称" size="small"></el-input>
              <br>
              <el-tag>职称级别</el-tag>
              <el-select v-model="updatajob.titleLevel" placeholder="职称等级" clearable size="small" style="width: 150px;margin-left:20px">
                <el-option
                  v-for="item in titleLevels"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <br>
              <el-tag>是否启用</el-tag>

              <el-switch
                style="margin-left:20px"
                v-model="updatajob.enabled"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-text="启用"
                inactive-text="警用">
              </el-switch>
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
      <el-button type="danger" size="small" style="margin-top: 8px" :disabled="deleJobLevels.length===0" @click="deleMany" >批量删除</el-button>
    </div>

  </div>
</template>

<script>
export default {
  mounted () {
    this.initJobLevel()
  },
  data () {
    return {
      updatajob: {
        id: '',
        name: '',
        titleLevel: '',
        enabled: ''
      },
      updataDialogVisible: false,
      job: {
        name: '',
        titleLevel: ''
      },
      jobs: [],
      deleJobLevels: [],
      titleLevels: [
        '正高级',
        '副高级',
        '中级',
        '初级',
        '员级'
      ]
    }
  },

  methods: {
    async initJobLevel () {
      const { data: res } = await this.$http.get('/system/basic/joblevel/')
      if (res) {
        this.jobs = res
      }
    },
    async addJobLevel () {
      if (this.job.name && this.job.titleLevel) {
        const { data: res } = await this.$http.post('/system/basic/joblevel/', this.job)
        if (res) {
          this.initJobLevel()
          this.job.name = ''
        }
      } else {
        this.$message.error('添加的职位不能为空!')
      }
    },
    updataHandleEdit (index, row) {
      this.updatajob.name = row.name
      this.updatajob.id = row.id
      this.updatajob.enabled = row.enabled
      this.updatajob.titleLevel = row.titleLevel
      this.updataDialogVisible = true
    },
    async doUpdata () {
      if (this.updatajob.name && this.updatajob.titleLevel) {
        const { data: res } = await this.$http.put('/system/basic/joblevel/', this.updatajob)
        if (res) {
          this.initJobLevel()
          this.updatajob.name = ''
          this.updatajob.id = ''
        }
        this.updataDialogVisible = false
      } else {
        this.$message.error('修改职称不能为空!')
      }
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除【' + row.name + '】职称(注意若该职称上有任职人员则无法删除), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.delete('/system/basic/joblevel/' + row.id)
        if (res) {
          this.initJobLevel()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleMany () {
      this.$confirm('此操作将永久删除【' + this.deleJobLevels.length + '】个职位(注意若该职位上有任职人员则无法删除), 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 批量删除 你传的是数组 怎么传呢? 一般都是
        let ids = '?'
        this.deleJobLevels.forEach(item => {
          ids += 'ids=' + item.id + '&'
        })
        const { data: res } = await this.$http.delete('/system/basic/joblevel/' + ids)
        if (res) {
          this.initJobLevel()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleSelectionChange (rows) {
      this.deleJobLevels = rows
    }
  }
}
</script>

<style scoped>

</style>

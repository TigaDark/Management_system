<template>
<div>
  <el-tabs v-model="activeName" type="card">
    <el-tab-pane label="部门管理" name="first"><Dep></Dep></el-tab-pane>
    <el-tab-pane label="职位管理" name="second"><Pos></Pos></el-tab-pane>
    <el-tab-pane label="职称管理" name="third"><Job></Job></el-tab-pane>
    <el-tab-pane label="奖惩规则" name="fourth"><Ec></Ec></el-tab-pane>
    <el-tab-pane label="权限组" name="fifth"><Per></Per></el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import Dep from '../../Component/sys/basic/DepManage'
import Job from '../../Component/sys/basic/JobLevelManage'
import Per from '../../Component/sys/basic/PermissManage'
import Pos from '../../Component/sys/basic/PosManage'
import Ec from '../../Component/sys/basic/EcManage'
export default {
  data () {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  components: {
    Dep,
    Job,
    Per,
    Pos,
    Ec
  }
}
</script>

<style>

</style>

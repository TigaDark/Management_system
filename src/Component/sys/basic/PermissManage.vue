<template>
  <div>
    <el-input
      size="small"
      placeholder="添加职位"
      prefix-icon="el-icon-plus"
      v-model="pos.name">
    </el-input>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pos: {
        name: ''
      }
    }
  }
}
</script>

<style scoped>

</style>

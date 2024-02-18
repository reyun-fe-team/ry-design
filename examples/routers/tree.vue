<template>
  <div style="width: 400px; border: 1px solid red">
    <rd-tree
      ref="tree"
      :data="data"
      show-checkbox
      default-expand-all
      node-key="value"
      highlight-current
      check-strictly
      :props="defaultProps"></rd-tree>

    <div class="buttons">
      <Button @click="getCheckedNodes">通过 node 获取</Button>
      <Button @click="getCheckedKeys">通过 key 获取</Button>
      <Button @click="setCheckedNodes">通过 node 设置</Button>
      <Button @click="setCheckedKeys">通过 key 设置</Button>
      <Button @click="resetChecked">清空</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          value: 1,
          label:
            '一级 1----超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试超长测试',
          children: [
            {
              value: 4,
              label: '二级 1-1',
              children: [
                {
                  value: 9,
                  label: '三级 1-1-1'
                },
                {
                  value: 10,
                  label: '三级 1-1-2'
                }
              ]
            }
          ]
        },
        {
          value: 2,
          label: '一级 2',
          children: [
            {
              value: 5,
              label: '二级 2-1'
            },
            {
              value: 6,
              label: '二级 2-2'
            }
          ]
        },
        {
          value: 3,
          label: '一级 3',
          children: [
            {
              value: 7,
              label: '二级 3-1'
            },
            {
              value: 8,
              label: '二级 3-2'
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          value: 5,
          label: '二级 2-1'
        },
        {
          value: 9,
          label: '三级 1-1-1'
        }
      ])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    }
  }
}
</script>
<template>
  <div style="text-align: center">
    <h1>type = list</h1>
    <rd-dropdown
      type="list"
      :data="listData"></rd-dropdown>
    <h1>type = group</h1>
    <rd-dropdown
      trigger="click"
      type="group"
      :data="groupData"></rd-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [
        { label: 'label1', value: 'value1', disabled: false },
        { label: 'label2', value: 'value2', disabled: false },
        { label: 'label3', value: 'value3', disabled: true, tooltip: '一个提示内容333' },
        { label: 'label4', value: 'value4', disabled: false, tooltip: '一个提示内容444' },
        { label: 'label5', value: 'value5', disabled: false },
        { label: 'label6', value: 'value6', disabled: false },
        { label: 'label7', value: 'value7', disabled: false },
        { label: 'label8', value: 'value8', disabled: false },
        { label: 'label9', value: 'value9', disabled: false },
        {
          label: '这是一个超长的名称这是一个超长的名称这是一个超长的名称这是一个超长的名称',
          value: 'value10',
          disabled: false
        }
      ],
      groupData: [
        {
          title: '我是分类一',
          items: [
            {
              label: 'label1',
              value: 'value1',
              disabled: false,
              tooltip: '我是label1的提示内容'
            },
            {
              label: 'label2',
              value: 'value2',
              disabled: true,
              tooltip: '我是label2的提示内容'
            },
            {
              label: 'label3',
              value: 'value3'
            },
            {
              label: 'label4',
              value: 'value4'
            },
            {
              label: 'label5',
              value: 'value5'
            }
          ]
        },
        {
          title: '我是分类二',
          items: [
            {
              label: '一个特别长的label1，重复一个特别长的label1',
              value: '1111',
              disabled: false,
              tooltip: '我是label1的提示内容，重复我是label1的提示内容'
            },
            {
              label: '一个特别长的label2，重复一个特别长的label2',
              value: '2222',
              disabled: true,
              tooltip: '我是label2的提示内容，重复我是label2的提示内容'
            },
            {
              label: 'label3label3label3',
              value: '3333'
            },
            {
              label: 'label4',
              value: '4444'
            },
            {
              label: 'label5',
              value: '5555'
            }
          ]
        },
        {
          title: '我是分类三',
          items: [
            {
              label: '1111',
              value: '1111',
              disabled: false,
              tooltip: '1111111111111111111111111111'
            },
            {
              label: '2222',
              value: '2222',
              disabled: true,
              tooltip: '222222222222222222222222'
            },
            {
              label: '3333',
              value: '3333'
            },
            {
              label: '444',
              value: '4444'
            },
            {
              label: '5555',
              value: '5555'
            }
          ]
        },
        {
          title: '我是分类四',
          items: [
            {
              label: '1111',
              value: '1111',
              disabled: false,
              tooltip: '1111111111111111111111111111'
            },
            {
              label: '2222',
              value: '2222',
              disabled: true,
              tooltip: '222222222222222222222222'
            },
            {
              label: '3333',
              value: '3333'
            },
            {
              label: '444',
              value: '4444'
            },
            {
              label: '5555',
              value: '5555'
            }
          ]
        }
      ]
    }
  },
  methods: {}
}
</script>

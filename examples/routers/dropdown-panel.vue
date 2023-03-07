<template>
  <div>
    <h3>自定义按钮文案</h3>
    <h4>content 参数</h4>
    <rd-dropdown-panel
      :data="list"
      trigger="click"
      content="自定义"></rd-dropdown-panel>
    <h4>使用slot=content</h4>
    <rd-dropdown-panel
      :data="list"
      content="自定义">
      <template #content>自定义插槽</template>
    </rd-dropdown-panel>
    <br />
    <br />
    <br />
    <h3>展示形式</h3>
    <h4>默认方式</h4>
    <rd-dropdown-panel
      type="list"
      :data="listData"></rd-dropdown-panel>
    <h4>分类样式</h4>
    <rd-dropdown-panel
      type="group"
      :data="groupData"></rd-dropdown-panel>
    <br />
    <br />
    <br />
    <h3>返回更多数据</h3>
    <h4>默认只返回value</h4>
    <rd-dropdown-panel
      :data="list"
      @on-click="onClick"></rd-dropdown-panel>
    <h4>label-value</h4>
    <rd-dropdown-panel
      :data="list"
      label-value
      @on-click="onClick"></rd-dropdown-panel>
    <br />
    <br />
    <br />
    <h3>使用插槽</h3>
    <h4>slot=item</h4>
    <rd-dropdown-panel :data="list">
      <template #item="{ data }">{{ data.label }} + {{ data.value }}</template>
    </rd-dropdown-panel>
    <rd-dropdown-panel
      type="group"
      :data="groupData">
      <template #groupItem="{ data }">自定义插槽 {{ data.value }}</template>
    </rd-dropdown-panel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { label: 'label1', value: 'value1', disabled: false },
        { label: 'label2', value: 'value2', disabled: false },
        { label: 'label3', value: 'value3', disabled: true, tooltip: '一个提示内容333' }
      ],
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
          icon: 'ry-icon-chanpinx',
          tooltip: '????',
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
  methods: {
    onClick(value) {
      console.log(value)
    }
  }
}
</script>

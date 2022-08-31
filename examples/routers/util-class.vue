<template>
  <div>
    <Alert>默认</Alert>
    <div class="base">
      <p
        v-for="index in max"
        :key="index">
        maxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmax
      </p>
    </div>
    <Alert>有</Alert>
    <div class="base small-scroll">
      <p
        v-for="index in max"
        :key="index">
        maxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmax
      </p>
    </div>
    <Alert>小区域滑动</Alert>
    <div class="base small-scroll">
      <rd-text-item-show
        :tooltip="basic.text"
        two-line-display
        :data="basic">
        <template #btnGroup>
          <Icon type="md-create" />
        </template>
      </rd-text-item-show>
      <rd-text-item-show
        type="title"
        :data="title">
        <template #btnGroup>
          <Icon type="md-create" />
        </template>
      </rd-text-item-show>
      <rd-text-item-show
        type="title"
        :data="title">
        <template #btnGroup>
          <Icon type="md-create" />
        </template>
      </rd-text-item-show>
      <rd-text-item-show
        type="title"
        :data="title">
        <template #btnGroup>
          <Icon type="md-create" />
        </template>
      </rd-text-item-show>
      <rd-text-item-show
        type="classify"
        :data="classify">
        <template #btnGroup>
          <Icon type="md-create" />
        </template>
      </rd-text-item-show>
    </div>
    <Alert>Select</Alert>
    <Select
      v-model="selectValue"
      style="width: 200px">
      <Option
        v-for="item in cityList"
        :key="item.value"
        :value="item.value">
        {{ item.label }}
      </Option>
    </Select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modal1: false,
      max: 20,
      basic: {
        text: '极速创建基础信息极速创建基础信息'
      },
      title: {
        title: '极速创建基础信息',
        subTitle: '单项显示控件 示例极速创建基础信息，单项显示控件 示例'
      },
      classify: {
        classify: {
          name: '商品库名称',
          id: '5533567'
        },
        info: {
          name: '商品名称',
          id: '5533567'
        },
        thumbnail:
          'https://t7.baidu.com/it/u=138126325,1485620701&fm=218&app=126&size=f242,150&n=0&f=JPEG&fmt=auto?s=7FAB2EC3909A35D01E299C1A030010D2&sec=1656176400&t=2db15a0e3ebd7bde9bff89d831d1633f'
      },
      cityList: [
        {
          value: 'New York',
          label: 'New York'
        },
        {
          value: 'London',
          label: 'London'
        },
        {
          value: 'Sydney',
          label: 'Sydney'
        },
        {
          value: 'Ottawa',
          label: 'Ottawa'
        },
        {
          value: 'Paris',
          label: 'Paris'
        },
        {
          value: 'Canberra',
          label: 'Canberra'
        },
        {
          value: '1',
          label: '1'
        },
        {
          value: '2',
          label: '2'
        }
      ],
      selectValue: ''
    }
  }
}
</script>
<style lang="less" scoped>
.base {
  overflow: auto;
  width: 200px;
  height: 200px;
  padding: 0 16px;
  border: 1px solid #ccc;
}
</style>

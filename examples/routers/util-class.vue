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
    <div class="base small-scroll-y">
      <p
        v-for="index in max"
        :key="index">
        maxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmaxmax
      </p>
    </div>
    <Alert>小区域滑动</Alert>
    <div class="base small-scroll-y">
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
    <Alert>Modals</Alert>
    <Button @click="modal = true">打开 modal</Button>

    <Modal
      v-model="modal"
      title="111">
      <div
        style="height: 450px; overflow-y: scroll"
        class="small-scroll-y">
        <p
          v-for="item in 200"
          :key="item"
          style="white-space: nowrap">
          ConteContent of dialogContent of dialogContent of dialogContent of dialogContent of
          dialogContent of dialogContent of dialognt of dialog
        </p>
      </div>
    </Modal>
    <Button @click="onClick1">弹框居中滚动条更改样式</Button>
    <div v-if="modalVisible1">
      <rd-modals
        v-model="modalVisible1"
        is-slot-default-header
        footer-border-none
        :header-obj="headerObj"
        :width="600"
        @on-cancel="handleCancel1">
        <div slot="content">
          <Form
            :label-width="72"
            class="form-content"
            @submit.native.prevent>
            <template v-for="item in formData.arr">
              <FormItem :key="item">
                <span slot="label">搜索{{ item }}</span>
                <Input
                  v-model="formData.search"
                  clearable
                  style="width: 184px"></Input>
              </FormItem>
            </template>
          </Form>
        </div>
      </rd-modals>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      selectValue: '',
      modal: false,
      modals: false,
      modalVisible1: false,
      modalVisible2: false,
      headerObj: {
        title: '带副标题的弹框',
        subTitle: '个广告计划',
        subNum: 3,
        titleNum: 5,
        total: 500
      },
      formData: {
        search: '',
        arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      },
      accountList: [
        {
          label: '西瓜科技有限公司',
          disabled: false,
          children: [
            {
              accountId: 'a-1',
              name: '账户a-1'
            },
            {
              accountId: 'a-2',
              name: '账户a-2'
            }
          ]
        },
        {
          label: '芒果科技有限公司',
          disabled: false,
          children: [
            {
              accountId: 'b-1',
              name: '账户a-1'
            },
            {
              accountId: 'b-2',
              name: '账户a-2'
            }
          ]
        }
      ]
    }
  },
  methods: {
    onClick1() {
      this.modalVisible1 = true
    },
    handleCancel1() {
      this.modalVisible1 = false
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
 /deep/ .ivu-modal-body {
  overflow-y: auto;
  height: 300px !important;
}
</style>

<template>
  <div style="padding: 20px">
    <Button @click="onClick1">带副标题的弹框</Button>
    <Button @click="onClick2">普通弹框</Button>
    <Button @click="onClickDelete1">删除弹框普通</Button>
    <Button @click="onClickDelete2">删除弹框slot可替换</Button>
    <Button @click="onClickDeep">嵌套弹窗</Button>
    <Button @click="onClickScroll">scroll弹窗</Button>
    <div v-if="modalVisible1">
      <rd-drawer
        v-model="modalVisible1"
        is-slot-default-header
        is-create
        footer-border-none
        :header-obj="headerObj"
        :width="600"
        class-name="center-modal mini-scroll-y"
        @on-cancel="handleCancel1">
        <div slot="content">
          <div style="width: 300px; height: 1000px; background: #2b85e4"></div>
          <Form
            :label-width="72"
            class="form-content"
            @submit.native.prevent>
            <FormItem label="账号">
              <Select
                v-model="formData.accountIds"
                :max-tag-count="2"
                class="select"
                filterable
                multiple
                placeholder="请搜索或选择媒体账号"
                style="width: 400px">
                <OptionGroup
                  v-for="item in accountList"
                  :key="item.label"
                  :label="item.label">
                  <Option
                    v-for="(el, index) in item.children"
                    :key="index"
                    :disabled="item.disabled"
                    :value="el.accountId">
                    {{ el.name }}
                  </Option>
                </OptionGroup>
              </Select>
            </FormItem>
            <FormItem label="搜索">
              <Input
                v-model="formData.search"
                clearable
                placeholder="输入名称"
                style="width: 184px"></Input>
            </FormItem>
          </Form>
        </div>
      </rd-drawer>
    </div>
    <div v-if="modalVisible2">
      <rd-drawer
        v-model="modalVisible2"
        is-reset
        title="普通弹框"
        :width="600"
        class-name="center-modal mini-scroll-y"
        @on-cancel="handleCancel2">
        <div slot="content">
          <Form
            :label-width="72"
            class="form-content"
            @submit.native.prevent>
            <FormItem label="账号">
              <Select
                v-model="formData.accountIds"
                :max-tag-count="2"
                class="select"
                filterable
                multiple
                placeholder="请搜索或选择媒体账号"
                style="width: 400px">
                <OptionGroup
                  v-for="item in accountList"
                  :key="item.label"
                  :label="item.label">
                  <Option
                    v-for="(el, index) in item.children"
                    :key="index"
                    :disabled="item.disabled"
                    :value="el.accountId">
                    {{ el.name }}
                  </Option>
                </OptionGroup>
              </Select>
            </FormItem>
            <FormItem label="搜索">
              <Input
                v-model="formData.search"
                clearable
                placeholder="输入名称"
                style="width: 184px"></Input>
            </FormItem>
          </Form>
        </div>
      </rd-drawer>
    </div>
    <div v-if="deleteVisible">
      <rd-drawer
        v-model="deleteVisible"
        :width="400"
        class-name="center-modal mini-scroll-y"
        @on-cancel="deleteHandleCancel"
        @on-ok="deleteHandleCancel">
        <div slot="content">
          <rd-delete-modals :delete-has-close="deleteHasClose">
            <span slot="delete-modal-content">这是一段利用slot插入内容的事例</span>
            <span slot="delete-modal-img">
              <img
                :src="require('@src/images/batch-upload-xls/batch-upload-xls.png')"
                alt="" />
            </span>
          </rd-delete-modals>
        </div>
      </rd-drawer>
    </div>
    <div v-if="deepVisible">
      <rd-drawer
        v-model="deepVisible"
        :width="400"
        class-name="center-modal mini-scroll-y"
        @on-cancel="onClickDeepCancel"
        @on-ok="onClickDeepCancel">
        <div slot="content">
          <Button @click="onClickDeep1">弹窗</Button>
          <div v-if="deepVisible1">
            <rd-drawer
              v-model="deepVisible1"
              close-scroll
              :width="400"
              class-name="center-modal mini-scroll-y"
              @on-cancel="onClickDeepCancel1"
              @on-ok="onClickDeepCancel1">
              <div slot="content">
                <rd-delete-modals :delete-has-close="deleteHasClose">
                  <span slot="delete-modal-content">这是一段利用slot插入内容的事例</span>
                  <span slot="delete-modal-img">
                    <img
                      :src="require('@src/images/batch-upload-xls/batch-upload-xls.png')"
                      alt="" />
                  </span>
                </rd-delete-modals>
              </div>
            </rd-drawer>
          </div>
        </div>
      </rd-drawer>
    </div>
    <div v-if="scrollVisible">
      <rd-drawer
        v-model="scrollVisible"
        :width="400"
        @on-cancel="onClickDeepCancel"
        @on-ok="onClickDeepCancel">
        <div slot="content">
          <div style="width: 100%; height: 1000px; background: #2b85e4">我是容器内容</div>
        </div>
      </rd-drawer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modalVisible1: false,
      modalVisible2: false,
      deleteVisible: false,
      deleteHasClose: false,
      deepVisible: false,
      deepVisible1: false,
      scrollVisible: false,
      headerObj: {
        title: '带副标题的弹框',
        subTitle: '个广告计划',
        subNum: 3,
        titleNum: 5,
        total: 500
      },
      formData: {
        accountIds: [],
        search: ''
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
      ],
      deleteContent: '<div style="text-align: left;">这是一条正常警告</div>'
    }
  },
  methods: {
    onClick1() {
      this.modalVisible1 = true
    },
    handleCancel1() {
      this.modalVisible1 = false
    },
    onClick2() {
      this.modalVisible2 = true
    },
    handleCancel2() {
      this.modalVisible2 = false
    },
    deleteHandleCancel() {
      this.deleteVisible = false
    },
    onClickDelete1() {
      this.$Modal.confirm({
        render: h => {
          return h('rd-delete-modals', {
            props: {
              deleteContent: this.deleteContent,
              styles: {
                color: 'red'
              }
            },
            okText: '确定',
            cancelText: '取消',
            onOk: () => {
              this.$Modal.remove()
            },
            onCancel: () => {
              this.$Modal.remove()
            },
            on: {
              deleteInput: () => {
                this.$Modal.remove()
              }
            }
          })
        }
      })
    },
    onClickDelete2() {
      this.deleteVisible = true
    },
    onClickDeep() {
      this.deepVisible = true
    },
    onClickScroll() {
      this.scrollVisible = true
    },
    onClickDeepCancel() {
      this.deepVisible = false
      this.scrollVisible = false
    },
    onClickDeep1() {
      this.deepVisible1 = true
    },
    onClickDeepCancel1() {
      this.deepVisible1 = false
    }
  }
}
</script>

<style lang="less">
.center-modal {
  display: flex;
  justify-content: center;
  align-items: center;

  .ivu-modal {
    top: 0;
  }
}

.mini-scroll-y {
  & ::-webkit-scrollbar {
    width: 4px; //竖轴宽度
    height: 0; //横轴宽度
  }

  /* 滚动槽 */
  & ::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 8%);
    border-radius: 0;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 25%);
  }

  & ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 8%);
    border-radius: 10px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 25%);
  }
}
</style>

<template>
  <main>
    <rd-table-multi-inputs
      :columns="columns"
      :table-list="tableList"
      :add-new-data="addNewData"
      :max="10"
      @updateData="updateData"></rd-table-multi-inputs>
  </main>
</template>
<script>
export default {
  data() {
    return {
      tableList: [
        {
          accountName: '账户名',
          actionTrackName: '',
          actionTrackUrl: '',
          actionbarClickUrl: ''
        },
        {
          accountName: '账户名',
          actionTrackName: '',
          actionTrackUrl: '',
          actionbarClickUrl: ''
        }
      ],
      addNewData: {
        accountName: '账户名',
        actionTrackName: '',
        actionTrackUrl: '',
        actionbarClickUrl: ''
      },
      columns: [
        {
          type: 'index',
          width: 40,
          align: 'center'
        },
        {
          title: '账户名称',
          key: 'accountName'
        },
        {
          title: '监测名称',
          key: 'actionTrackName',
          slot: 'actionTrackName',
          type: 'input',
          placeholder: '请输入监测名称'
        },
        {
          title: '第三方点击监测链接',
          key: 'actionTrackUrl',
          slot: 'actionTrackUrl',
          type: 'input',
          placeholder: '请输入第三方点击监测链接',
          validate: value => this.trackUrlValidator(value, true)
        },
        {
          title: '第三方ActionBar点击监测链接',
          key: 'actionbarClickUrl',
          slot: 'actionbarClickUrl',
          type: 'input',
          placeholder: '请输入第三方ActionBar点击监测链接，回车换行',
          validate: value => this.trackUrlValidator(value, true)
        },
        {
          title: ' ',
          key: 'del',
          slot: 'del',
          width: 46
        }
      ]
    }
  },
  methods: {
    updateData() {
      // 返回参数一 返回表格所有数据
      // 返回参数二 返回错误提示信息
    },
    trackUrlValidator(value, noCheckNull) {
      // noCheckNull 传入这个参数不校验为空的状态
      let reg = /(https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/
      let param = null
      param = [
        '__MAC__',
        '__MAC2__',
        '__MAC3__',
        '__ANDROIDID2__',
        '__ANDROIDID3__',
        '__IMEI2__',
        '__IMEI3__',
        '__IDFA2__',
        '__IDFA3__',
        '__TS__',
        '__IP__',
        '__CALLBACK__',
        '__DID__',
        '__DNAME__',
        '__CID__',
        '__AID__'
      ].find(elem => {
        return value.includes(elem)
      })

      return new Promise((resolve, reject) => {
        if (!value && !noCheckNull) {
          reject(new Error('监测链接不得为空'))
        }
        let config = reg.test(value)
        if (value !== '' && (!config || !param)) {
          reject(new Error('监测链接格式不正确'))
        }
        resolve(true)
      })
    }
  }
}
</script>
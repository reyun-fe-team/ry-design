const errorClass = 'rd-error-prevent-modal-row-error-text'

export const columnsMap = new Map([
  [
    'objectLabel',
    {
      title: '防出错对象',
      key: 'objectLabel',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('span', row.message)
      }
    }
  ],
  [
    'accountLabel',
    {
      title: '投放账户',
      key: 'accountLabel',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('span', row.message)
      }
    }
  ],
  [
    'position',
    {
      title: '可选投放位置',
      key: 'position',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('rd-ellipsis', {
          class: row.error ? [errorClass] : '',
          props: {
            text: row.message,
            lines: 2,
            tooltip: true,
            transfer: true
          }
        })
      }
    }
  ],
  [
    'goal',
    {
      title: '可选优化目标',
      key: 'goal',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('rd-ellipsis', {
          class: row.error ? [errorClass] : '',
          props: {
            text: row.message,
            lines: 2,
            tooltip: true,
            transfer: true
          }
        })
      }
    }
  ],
  [
    'deepGoal',
    {
      title: '可选深度优化目标',
      key: 'deepGoal',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('rd-ellipsis', {
          class: row.error ? [errorClass] : '',
          props: {
            text: row.message,
            lines: 2,
            tooltip: true,
            transfer: true
          }
        })
      }
    }
  ],
  [
    'bid',
    {
      title: '出价限制',
      key: 'bid',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('span', { class: row.error ? [errorClass] : '' }, row.message)

        // let len = row.text.length
        // if (len === 0) {
        //   return h('span', '-')
        // }

        // let group = []
        // row.text.forEach((e, i) => {
        //   let unit = len !== i + 1 ? '、' : ''
        //   group.push(h('span', { class: e.error ? [errorClass] : '' }, e.text + unit))
        // })
        // return h('div', [group])
      }
    }
  ],
  [
    'deepBid',
    {
      title: '深度出价限制',
      key: 'deepBid',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('span', { class: row.error ? [errorClass] : '' }, row.message)

        // let len = row.text.length
        // if (len === 0) {
        //   return h('span', '-')
        // }

        // let group = []
        // row.text.forEach((e, i) => {
        //   let unit = len !== i + 1 ? '、' : ''
        //   group.push(h('span', { class: e.error ? [errorClass] : '' }, e.text + unit))
        // })
        // return h('div', [group])
      }
    }
  ],
  [
    'budgetPlan',
    {
      title: '项目预算限制',
      key: 'budgetPlan',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('span', {
          class: row.error ? [errorClass] : '',
          domProps: {
            innerHTML: `${row.message}`
          }
        })

        // let len = row.text.length
        // if (len === 0) {
        //   return h('span', '-')
        // }

        // let group = []
        // row.text.forEach((e, i) => {
        //   let unit = len !== i + 1 ? '、' : ''
        //   group.push(h('span', { class: e.error ? [errorClass] : '' }, e.text + unit))
        // })

        // return h('div', [group])
      }
    }
  ],
  [
    'budgetAd',
    {
      title: '广告预算限制',
      key: 'budgetAd',
      minWidth: 180,
      render: (h, params) => {
        let row = params.row[params.column.key]
        return h('span', {
          class: row.error ? [errorClass] : '',
          domProps: {
            innerHTML: `${row.message}`
          }
        })

        // let len = row.text.length
        // if (len === 0) {
        //   return h('span', '-')
        // }

        // let group = []
        // row.text.forEach((e, i) => {
        //   let unit = len !== i + 1 ? '、' : ''
        //   group.push(h('span', { class: e.error ? [errorClass] : '' }, e.text + unit))
        // })
        // return h('div', [group])
      }
    }
  ]
])

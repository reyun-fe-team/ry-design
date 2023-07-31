export default {
  name: 'rowRender',
  functional: true,
  props: {
    render: Function,
    row: Object,
    index: Number
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index
    }
    return ctx.props.render(h, params)
  }
}

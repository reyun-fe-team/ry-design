/*
 * @Author: yangyufeng
 * @Date: 2022-04-11 17:27:35
 * @LastEditTime: 2022-10-31 16:45:35
 * @LastEditors: 杨玉峰 yangyufeng@mobvista.com
 * @Description: 用于render函数渲染自定义组件(局部注册组件使用)
 * @FilePath: /ry-design/src/components/base/render
 */
export default {
  name: 'RenderFunction',
  functional: true,
  props: {
    render: Function,
    options: Object
  },
  render: (h, ctx) => {
    return ctx.props.render(h, ctx.props.options)
  }
}

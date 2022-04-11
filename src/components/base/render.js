/*
 * @Author: yangyufeng
 * @Date: 2022-04-11 17:27:35
 * @LastEditTime: 2022-04-11 17:29:29
 * @LastEditors: Please set LastEditors
 * @Description: 用于render函数渲染自定义组件(局部注册组件使用)
 * @FilePath: /ry-design/src/components/base/render.js
 */
export default {
  name: 'RenderCell',
  functional: true,
  props: {
    render: Function
  },
  render: (h, ctx) => {
    return ctx.props.render(h);
  }
};
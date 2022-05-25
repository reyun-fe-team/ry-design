/*
 * @Author: yangyufeng
 * @Date: 2022-04-11 17:27:35
 * @LastEditTime: 2022-05-25 15:41:51
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @Description: 用于render函数渲染自定义组件(局部注册组件使用)
 * @FilePath: /ry-design/src/components/base/render.js
 */
export default {
  name: 'RenderFunction',
  functional: true,
  props: {
    render: Function
  },
  render: (h, ctx) => {
    return ctx.props.render(h);
  }
};
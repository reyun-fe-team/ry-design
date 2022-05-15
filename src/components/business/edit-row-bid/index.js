/*
 * @Author: 杨玉峰 yangyufeng@reyun.com
 * @Date: 2022-05-07 18:50:13
 * @LastEditors: 杨玉峰 yangyufeng@reyun.com
 * @LastEditTime: 2022-05-07 18:51:32
 * @FilePath: /ry-design/src/components/basics/edit-row-bid/index.js
 * @Description: 在预览广告的表格中，修改单独一行的数据（出价、深度出价、ROI、名称）
 */
import EditBid from './edit-bid'

EditBid.install = function(Vue) {
  Vue.component(EditBid.name, EditBid)
}

export default EditBid
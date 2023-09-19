<template>
  <div>
    <h2>placement-location</h2>
    <div
      v-for="option in data"
      :key="option.label"
      style="margin-bottom: 24px">
      {{ option.label }}:{{ option.checked }}
      <br />
      <p
        v-for="item in option.children"
        :key="item.label"
        style="margin-left: 30px">
        {{ item }}
      </p>
    </div>
    <div style="margin-bottom: 60px" />
    <rd-placement-location
      :data="data"
      :show-checkbox="showCheckbox"
      :multiple="multiple"></rd-placement-location>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCheckbox: false,
      multiple: true,
      data: [
        {
          label: '微信朋友圈',
          expand: false,
          disabled: false,
          checked: false,
          // childrenRule: {
          //   multiple: true
          // },
          children: [
            {
              label: '微信公众号与小程序',
              expand: false,
              disabled: false,
              checked: false
            },
            {
              label: '微信新闻插件',
              multiple: true,
              expand: false,
              disabled: false,
              checked: false
            }
          ]
        },
        {
          label: 'QQ、腾讯信息流、腾讯音乐',
          expand: false,
          disabled: false,
          checked: false,
          childrenRule: {
            multiple: false
          },
          children: [
            {
              label: 'QQ浏览器',
              expand: false,
              disabled: false,
              checked: false
            },
            {
              label: 'QQ、腾讯音乐及游戏',
              multiple: true,
              expand: false,
              disabled: false,
              checked: false
            }
          ]
        },
        {
          label: '微信视频号',
          expand: false,
          disabled: false,
          checked: false
        }
      ]
    }
  },

  methods: {}
}
</script>

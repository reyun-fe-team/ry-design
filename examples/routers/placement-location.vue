<template>
  <div>
    <h2>placement-location</h2>
    <div
      v-for="option in dataToutiao"
      :key="option.label"
      style="margin-bottom: 24px">
      {{ option.label }}:{{ option.checked }}-{{ option.expand }}
      <br />
      <p
        v-for="item in option.children"
        :key="item.label"
        style="margin-left: 30px">
        {{ item }}
      </p>
    </div>

    <h2 style="margin: 16px 0">头条 {{ valueToutiao }}</h2>
    <rd-placement-location
      v-model="valueToutiao"
      :data="dataToutiao"
      show-checkbox
      show-all
      :loading="loading"
      @on-title-click="onTitleClick"
      @on-on-select-all="onTitleClick"></rd-placement-location>
    <h2 style="margin: 16px 0">广点通-广告位置{{ valueGdtPosition }}</h2>
    <div @click="updateValue">点击设置空</div>
    <div @click="updateValueAdd">点击添加</div>
    <div @click="reset">重置并请求接口</div>
    <rd-placement-location
      v-model="valueGdtPosition"
      :data="dataGdtPosition"
      show-checkbox></rd-placement-location>
    <h2 style="margin: 16px 0">广点通-创意形式{{ valueGdtCreative }}</h2>
    <rd-placement-location
      v-model="valueGdtCreative"
      show-checkbox
      :data="dataGdtCreative"></rd-placement-location>
    <h2 style="margin: 16px 0">广点通-创意形式-单选{{ valueGdtCreativeRadio }}</h2>
    <rd-placement-location
      v-model="valueGdtCreative"
      :multiple="false"
      :data="dataGdtCreative"></rd-placement-location>
    <h2 style="margin: 16px 0">广点通-创意形式-局部单选{{ valueGdtCreativeRadio }}</h2>
    <rd-placement-location
      v-model="valueGdtCreativeRadio"
      :data="dataGdtCreativeRadioPart"></rd-placement-location>
    <h2 style="margin: 16px 0">没有数据的场景</h2>
    <rd-placement-location
      style="margin-top: 16px"
      :loading="loading"></rd-placement-location>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      valueToutiao: [],
      valueGdtPosition: [],
      valueGdtCreative: [],
      valueGdtCreativeRadio: [],
      valueGdtCreativeRadioPart: [],
      dataEmpty: [],
      dataToutiao: [
        {
          label: '今日头条',
          expand: true,
          disabled: false,
          checked: false,
          value: '今日头条'
        },
        {
          label: '西瓜视频',
          expand: false,
          disabled: false,
          checked: false,
          value: '西瓜视频'
        },
        {
          label: '穿山甲',
          expand: false,
          disabled: false,
          checked: false,
          childrenRule: {
            multiple: false
          },
          value: '穿山甲',
          children: [
            {
              label: '激励视频',
              disabled: false,
              checked: false,
              value: '激励视频'
            },
            {
              label: '原生',
              disabled: true,
              checked: false,
              value: '原生'
            },
            {
              label: '开屏',
              disabled: false,
              checked: false,
              value: '开屏'
            }
          ]
        }
      ],
      dataGdtPosition: [],
      dataGdtPosition1: [
        {
          label: '微信朋友圈',
          expand: true,
          disabled: false,
          checked: false,
          value: '微信朋友圈'
        },
        {
          label: '微信公众号与小程序',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: '微信公众号与小程序',
              disabled: false,
              checked: false,
              value: '微信公众号与小程序'
            },
            {
              label: '微信新闻插件',
              disabled: false,
              checked: false,
              value: '微信新闻插件'
            }
          ]
        },
        {
          label: '优量汇',
          expand: true,
          disabled: false,
          checked: false,
          value: '优量汇'
        },
        {
          label: 'QQ、腾讯信息流、腾讯音乐',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: 'QQ浏览器',
              disabled: false,
              checked: false,
              value: 'QQ浏览器'
            },
            {
              label: 'QQ、腾讯音乐及游戏',
              disabled: false,
              checked: false,
              value: 'QQ、腾讯音乐及游戏'
            }
          ]
        }
      ],
      dataGdtPosition2: [
        {
          label: '微信朋友圈',
          expand: true,
          disabled: false,
          checked: false,
          value: '微信朋友圈'
        },
        {
          label: '微信公众号与小程序',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: '微信公众号与小程序',
              disabled: false,
              checked: false,
              value: '微信公众号与小程序'
            },
            {
              label: '微信新闻插件',
              disabled: false,
              checked: false,
              value: '微信新闻插件'
            }
          ]
        },
        {
          label: '优量汇',
          expand: true,
          disabled: false,
          checked: false,
          value: '优量汇'
        },
        {
          label: 'QQ、腾讯信息流、腾讯音乐',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: 'QQ浏览器',
              disabled: false,
              checked: false,
              value: 'QQ浏览器'
            },
            {
              label: 'QQ、腾讯音乐及游戏',
              disabled: false,
              checked: false,
              value: 'QQ、腾讯音乐及游戏'
            }
          ]
        }
      ],
      dataGdtCreative: [
        {
          label: '图片',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: '横版三小图 3:2',
              disabled: false,
              checked: false,
              value: '横版三小图 3:2',
              disabledValues: ['格子广告']
            },
            {
              label: '横版小图 3:2',
              disabled: false,
              checked: false,
              value: '横版小图 3:2',
              disabledValues: ['格子广告']
            },
            {
              label: '常规大图 1:1',
              disabled: false,
              checked: false,
              value: '常规大图 1:1',
              disabledValues: ['格子广告']
            },
            {
              label: '方形大图 1:1',
              disabled: false,
              checked: false,
              value: '方形大图 1:1',
              disabledValues: ['格子广告']
            },
            {
              label: '竖版大图 9:16',
              disabled: false,
              checked: false,
              value: '竖版大图 9:16'
            },
            {
              label: '通栏大图 7:2',
              disabled: false,
              checked: false,
              value: '通栏大图 7:2'
            }
          ]
        },
        {
          label: '其他',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: '激励浏览广告',
              disabled: false,
              checked: false,
              value: '激励浏览广告'
              // disabledValues: ['格子广告']
            },
            {
              label: '格子广告',
              disabled: false,
              checked: false,
              value: '格子广告',
              disabledValues: [
                '横版三小图 3:2',
                // '激励浏览广告',
                '横版小图 3:2',
                '方形大图 1:1',
                '竖版大图 9:16',
                '通栏大图 7:2',
                '常规大图 1:1'
              ]
            }
          ]
        }
      ],
      dataGdtCreativeRadio: [
        {
          label: '图片',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: '横版三小图 3:2',
              disabled: false,
              checked: false,
              value: '横版三小图 3:2'
            },
            {
              label: '横版小图 3:2',
              disabled: true,
              checked: false,
              value: '横版小图 3:2'
            },
            {
              label: '常规大图 1:1',
              disabled: false,
              checked: false,
              value: '常规大图 1:1'
            },
            {
              label: '方形大图 1:1',
              disabled: false,
              checked: false,
              value: '方形大图 1:1'
            },
            {
              label: '竖版大图 9:16',
              disabled: false,
              checked: false,
              value: '竖版大图 9:16'
            },
            {
              label: '通栏大图 7:2',
              disabled: false,
              checked: false,
              value: '通栏大图 7:2'
            }
          ]
        },
        {
          label: '其他',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: '激励浏览广告',
              disabled: false,
              checked: false,
              value: '激励浏览广告',
              disabledValues: ['格子广告']
            },
            {
              label: '格子广告',
              disabled: false,
              checked: false,
              value: '格子广告',
              disabledValues: [
                '横版三小图 3:2',
                '激励浏览广告',
                '横版小图 3:2',
                '方形大图 1:1',
                '竖版大图 9:16',
                '通栏大图 7:2',
                '常规大图 1:1'
              ]
            }
          ]
        }
      ],
      dataGdtCreativeRadioPart: [
        {
          label: '图片',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          childrenRule: {
            multiple: false
          },
          children: [
            {
              label: '横版三小图 3:2',
              disabled: false,
              checked: false,
              value: '横版三小图 3:2'
            },
            {
              label: '横版小图 3:2',
              disabled: true,
              checked: false,
              value: '横版小图 3:2'
            },
            {
              label: '常规大图 1:1',
              disabled: false,
              checked: false,
              value: '常规大图 1:1'
            },
            {
              label: '方形大图 1:1',
              disabled: false,
              checked: false,
              value: '方形大图 1:1'
            },
            {
              label: '竖版大图 9:16',
              disabled: false,
              checked: false,
              value: '竖版大图 9:16'
            },
            {
              label: '通栏大图 7:2',
              disabled: false,
              checked: false,
              value: '通栏大图 7:2'
            }
          ]
        },
        {
          label: '其他',
          expand: true,
          disabled: false,
          checked: false,
          value: '',
          children: [
            {
              label: '激励浏览广告',
              disabled: false,
              checked: false,
              value: '激励浏览广告'
              // disabledValues: ['格子广告']
            },
            {
              label: '格子广告',
              disabled: false,
              checked: false,
              value: '格子广告',
              disabledValues: [
                '横版三小图 3:2',
                '激励浏览广告',
                '横版小图 3:2',
                '方形大图 1:1',
                '竖版大图 9:16',
                '通栏大图 7:2',
                '常规大图 1:1'
              ]
            }
          ]
        }
      ]
    }
  },
  mounted() {
    this.dataGdtPosition = this.dataGdtPosition1
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },
  methods: {
    onTitleClick(value) {
      if (value) {
        if (
          (value.length === 1 && value.includes('穿山甲')) ||
          (value.length === 2 &&
            value.includes('穿山甲') &&
            value.some(val => ['激励视频', '原生', '开屏'].includes(val)))
        ) {
          this.dataToutiao.forEach(item => {
            if (item.value === '穿山甲') {
              item.expand = true
            }
          })
        } else {
          this.dataToutiao.forEach(item => {
            if (item.value === '穿山甲') {
              item.expand = false
            }
          })
          this.valueToutiao = this.valueToutiao.filter(val => {
            return !['激励视频', '原生', '开屏'].includes(val)
          })
        }
      }
    },
    updateValue() {
      this.valueGdtPosition = []
    },
    updateValueAdd() {
      this.valueGdtPosition.push('微信新闻插件')
    },
    reset() {
      this.valueGdtPosition = []
      setTimeout(() => {
        this.dataGdtPosition = this.dataGdtPosition2
      }, 2000)
    }
  }
}
</script>

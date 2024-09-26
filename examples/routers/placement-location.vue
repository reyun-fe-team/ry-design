<template>
  <div>
    <h2>placement-location</h2>
    <rd-placement-location
      v-if="true"
      v-model="testValue"
      :data="testListData"
      show-checkbox
      show-all></rd-placement-location>
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
      v-if="true"
      v-model="valueToutiao"
      :data="dataToutiao"
      show-checkbox
      show-all
      :loading="loading"
      :item-min-width="62"
      @on-title-click="onTitleClick"
      @on-select-all="onTitleClick">
      <template
        slot="select-item"
        slot-scope="{ row }">
        {{ row.label }}
        <Tooltip
          v-if="row.message"
          :content="row.message"
          theme="light"
          transfer>
          <Icon
            size="14"
            custom="iconfont ry-icon-illustrate"
            @click.stop></Icon>
        </Tooltip>
      </template>
    </rd-placement-location>

    <h2 style="margin: 16px 0">快手{{ valueKuaishou }}</h2>

    <rd-placement-location
      v-model="valueKuaishou"
      style="width: 212px"
      :data="dataKuaishou"
      show-checkbox
      :item-width="152"
      show-all>
      <template
        slot="select-item"
        slot-scope="{ row }">
        {{ row.label }}
        <Tooltip
          slot="select-action"
          style="float: right"
          :content="row.label"
          theme="light">
          <span
            style="color: #3989fa; cursor: default"
            @click.stop>
            预览
          </span>
        </Tooltip>
      </template>
    </rd-placement-location>

    <h2 style="margin: 16px 0">广点通-广告位置{{ valueGdtPosition }}</h2>
    <div @click="updateValue">点击设置空</div>
    <div @click="updateValueAdd">点击添加</div>
    <div @click="reset">重置并请求接口</div>
    <rd-placement-location
      v-if="true"
      v-model="valueGdtPosition"
      :data="dataGdtPosition"
      show-checkbox
      show-all></rd-placement-location>

    <h2 style="margin: 16px 0">广点通-创意形式{{ valueGdtCreative }}</h2>
    <rd-placement-location
      v-model="valueGdtCreative"
      style="width: 650px"
      :item-min-width="152"
      show-checkbox
      :data="dataGdtCreative"></rd-placement-location>
    <h2 style="margin: 16px 0">广点通-创意形式-单选{{ valueGdtCreativeRadio }}</h2>
    <rd-placement-location
      v-if="true"
      v-model="valueGdtCreativeCur"
      show-checkbox
      show-all
      :multiple="false"
      :data="dataGdtCreativeCur"></rd-placement-location>
    视频号动态-单选{{ valueGdtCreative3 }}
    <rd-placement-location
      v-if="true"
      v-model="valueGdtCreative3"
      show-checkbox
      :multiple="false"
      :data="dataGdtPosition3"></rd-placement-location>
    视频号直播-disabled{{ valueGdtCreative4 }}
    <rd-placement-location
      v-if="true"
      v-model="valueGdtCreative4"
      show-checkbox
      multiple
      :data="dataGdtPosition4"></rd-placement-location>
    视频号直播-clearValue{{ valueGdtCreative5 }}
    <rd-placement-location
      v-if="true"
      v-model="valueGdtCreative5"
      show-checkbox
      multiple
      :data="dataGdtPosition5"></rd-placement-location>
    <h2 style="margin: 16px 0">广点通-创意形式-局部单选{{ valueGdtCreativeRadio }}</h2>
    <rd-placement-location
      v-if="true"
      v-model="valueGdtCreativeRadio"
      :data="dataGdtCreativeRadioPart"></rd-placement-location>
    <h2 style="margin: 16px 0">没有数据的场景</h2>
    <rd-placement-location
      v-if="true"
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
      valueKuaishou: [],
      valueGdtPosition: [],
      valueGdtCreative: ['格子广告'],
      valueGdtCreativeCur: ['格子广告'],
      valueGdtCreative3: ['微信视频号'],
      valueGdtCreative4: ['微信视频号'],
      valueGdtCreative5: ['微信视频号'],
      valueGdtCreativeRadio: ['格子广告'],
      valueGdtCreativeRadioPart: [],
      dataEmpty: [],
      testValue: [],
      testListData: [
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
          disabled: true,
          checked: false,
          value: '西瓜视频'
        }
      ],
      dataToutiao: [
        {
          label: '今日头条',
          expand: true,
          disabled: false,
          checked: false,
          value: '今日头条',
          message: 'message'
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
              value: '激励视频',
              message: 'message'
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
          label: '微信朋友圈1',
          value: 'WEIXIN_MOMENTS',
          expand: false,
          disabled: false,
          checked: false,
          children: [
            {
              label: '微信朋友圈',
              disabled: false,
              checked: false,
              value: 'SITE_SET_MOMENTS'
            }
          ]
        },
        {
          label: '微信公众号与小程序',
          value: 'WEIXIN_PROGRAM',
          expand: true,
          disabled: false,
          checked: false,
          children: [
            {
              label: '微信公众号与小程序',
              disabled: false,
              checked: false,
              value: 'SITE_SET_WECHAT'
            },
            {
              label: '微信新闻插件',
              disabled: false,
              checked: false,
              value: 'SITE_SET_WECHAT_PLUGIN'
            }
          ]
        },
        {
          label: 'QQ、腾讯信息流、腾讯音乐',
          value: 'MOBILE_INNER',
          expand: true,
          disabled: false,
          checked: false,
          children: [
            {
              label: 'QQ浏览器',
              disabled: false,
              checked: false,
              value: 'SITE_SET_KANDIAN'
            },
            {
              label: 'QQ、腾讯音乐及游戏',
              disabled: false,
              checked: false,
              value: 'SITE_SET_QQ_MUSIC_GAME'
            }
          ]
        },
        {
          label: '腾讯新闻与腾讯视频',
          value: 'TENCENT_NEWS_VIDEO',
          expand: true,
          disabled: false,
          checked: false,
          children: [
            {
              label: '腾讯新闻',
              disabled: false,
              checked: false,
              value: 'SITE_SET_TENCENT_NEWS'
            },
            {
              label: '腾讯视频',
              disabled: false,
              checked: false,
              value: 'SITE_SET_TENCENT_VIDEO'
            }
          ]
        },
        {
          label: '优量汇',
          value: 'MOBILE_UNION',
          expand: false,
          disabled: false,
          checked: false,
          children: [
            {
              label: '优量汇',
              disabled: false,
              checked: false,
              value: 'SITE_SET_MOBILE_UNION'
            }
          ]
        },
        {
          label: '微信视频号',
          value: 'CHANNELS',
          expand: false,
          disabled: false,
          checked: false,
          children: [
            {
              label: '微信视频号',
              disabled: false,
              checked: false,
              value: 'SITE_SET_CHANNELS'
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
      dataGdtPosition3: [
        {
          label: '微信视频号',
          value: 'CHANNELS',
          expand: false,
          disabled: false,
          checked: false,
          children: [
            {
              label: '微信视频号',
              disabled: false,
              checked: false,
              value: 'SITE_SET_CHANNELS'
            }
          ]
        },
        {
          label: '微信朋友圈',
          value: 'WEIXIN_MOMENTS',
          expand: false,
          disabled: false,
          checked: false,
          children: [
            {
              label: '微信朋友圈',
              disabled: false,
              checked: false,
              value: 'SITE_SET_MOMENTS'
            }
          ]
        },
        {
          label: '微信公众号与小程序',
          value: 'WEIXIN_PROGRAM',
          expand: true,
          disabled: false,
          checked: false,
          children: [
            {
              label: '微信公众号与小程序',
              disabled: false,
              checked: false,
              value: 'SITE_SET_WECHAT'
            },
            {
              label: '微信新闻插件',
              disabled: true,
              checked: false,
              value: 'SITE_SET_WECHAT_PLUGIN'
            }
          ]
        }
      ],
      dataGdtPosition4: [
        {
          label: '微信视频号',
          expand: true,
          disabled: false,
          checked: false,
          value: '微信视频号',
          disabledValues: ['微信公众号与小程序']
        },
        {
          label: '微信朋友圈',
          expand: true,
          disabled: false,
          checked: false,
          value: '微信朋友圈',
          disabledValues: ['微信公众号与小程序']
        },
        {
          label: '微信公众号与小程序',
          expand: true,
          disabled: false,
          checked: false,
          value: '微信公众号与小程序',
          children: [],
          disabledValues: ['微信视频号', '微信朋友圈']
        }
      ],
      dataGdtPosition5: [
        {
          label: '微信视频号',
          value: 'CHANNELS',
          expand: false,
          disabled: false,
          checked: false,
          clearValues: ['WEIXIN_PROGRAM'],
          children: [
            {
              label: '微信视频号',
              disabled: false,
              checked: false,
              value: 'SITE_SET_CHANNELS'
            }
          ]
        },
        {
          label: '微信朋友圈',
          value: 'WEIXIN_MOMENTS',
          expand: false,
          disabled: false,
          checked: false,
          clearValues: ['WEIXIN_PROGRAM'],
          children: [
            {
              label: '微信朋友圈',
              disabled: false,
              checked: false,
              value: 'SITE_SET_MOMENTS'
            }
          ]
        },
        {
          label: '微信公众号与小程序',
          value: 'WEIXIN_PROGRAM',
          expand: true,
          disabled: false,
          checked: false,
          clearValues: ['CHANNELS', 'WEIXIN_MOMENTS'],
          children: [
            {
              label: '微信公众号与小程序',
              disabled: false,
              checked: false,
              value: 'SITE_SET_WECHAT'
            },
            {
              label: '微信新闻插件',
              disabled: true,
              checked: false,
              value: 'SITE_SET_WECHAT_PLUGIN'
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
              showCheckbox: false,
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
      dataGdtCreativeCur: [
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
      ],
      dataKuaishou: [
        {
          label: '信息流广告',
          expand: true,
          disabled: false,
          checked: false,
          value: 'information'
        },
        {
          label: '上下滑大屏广告',
          expand: true,
          disabled: false,
          checked: false,
          value: 'downward'
        },
        {
          label: '激励视频和广告',
          expand: true,
          disabled: false,
          checked: false,
          value: 'videos'
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

<template>
  <div class="container">
    <!-- ... existing template code ... -->
    <div class="code-wrapper">
      <div class="value-display">
        <h3>初始值：</h3>
        <pre><code>{{ JSON.stringify(selectMultiple, null, 2) }}</code></pre>
      </div>
      <div class="value-display">
        <h3>自定义计算值：</h3>
        <pre><code>{{ JSON.stringify(commitData, null, 2) }}</code></pre>
      </div>
      <div class="value-display">
        <h3>组件根据层级结构计算值：</h3>
        <pre><code>{{ JSON.stringify(hierarchicalChangeValue, null, 2) }}</code></pre>
      </div>
    </div>

    <div class="header">
      <h2>filter-list-cascader</h2>
      <div class="button-group">
        <Button
          class="action-button"
          @click="fu">
          赋予
        </Button>
        <Button
          class="action-button"
          @click="clear">
          清空
        </Button>
      </div>
    </div>

    <section class="cascader-section">
      <section>
        <rd-filter-list-cascader
          v-model="selectMultiple"
          :data="options"
          :width="360"
          :height="320"
          :input-width="260"
          filterable
          multiple
          show-select-option
          @on-hierarchical-change="handleHierarchicalChange"></rd-filter-list-cascader>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectMultiple: [],
      // 级联选择器改变的值
      hierarchicalChangeValue: [],
      options: [
        {
          children: [
            {
              children: [],
              label: '历史项目',
              value: '1161'
            },
            {
              children: [],
              label: '京P·OX334',
              value: '1170'
            },
            {
              children: [],
              label: '测试项目1',
              value: '1177'
            },
            {
              children: [],
              label: '新建项目组',
              value: '1199'
            },
            {
              children: [],
              label: '千川项目',
              value: '13062'
            },
            {
              children: [],
              label: 'zyj',
              value: '13070'
            },
            {
              children: [],
              label: 'ma-test1',
              value: '13103'
            },
            {
              children: [],
              label: '新建项目-老权限',
              value: '13128'
            }
          ],
          label: '历史项目',
          value: '1'
        },
        {
          children: [
            {
              children: [],
              label: '新建项目搜索',
              value: '13072'
            }
          ],
          label: '新建项目搜索',
          value: '24'
        },
        {
          children: [
            {
              children: [],
              label: '京N·UT457',
              value: '1162'
            },
            {
              children: [],
              label: '京C·97TU1',
              value: '1167'
            },
            {
              children: [],
              label: '第三二次',
              value: '1174'
            },
            {
              children: [],
              label: '新测试',
              value: '1196'
            },
            {
              children: [],
              label: '管理员的项目',
              value: '13094'
            },
            {
              children: [],
              label: '防出错项目',
              value: '13097'
            },
            {
              children: [],
              label: 'ma-test',
              value: '13101'
            },
            {
              children: [],
              label: '优化经理-新建项目',
              value: '13189'
            }
          ],
          label: '京N·UT457',
          value: '2'
        },
        {
          children: [
            {
              children: [],
              label: '银河系',
              value: '1197'
            }
          ],
          label: '银河系',
          value: '15'
        },
        {
          children: [
            {
              children: [],
              label: '京J·JV7778',
              value: '1176'
            },
            {
              children: [],
              label: 'XXX',
              value: '1189'
            },
            {
              children: [],
              label: '素材项目',
              value: '1200'
            },
            {
              children: [],
              label: '123',
              value: '1216'
            },
            {
              children: [],
              label: 'aaab',
              value: '13058'
            },
            {
              children: [],
              label: '头条专用项目',
              value: '13067'
            },
            {
              children: [],
              label: '测试',
              value: '13069'
            },
            {
              children: [],
              label: '添加项目名称测试',
              value: '13073'
            },
            {
              children: [],
              label: '添加项目测试',
              value: '13074'
            },
            {
              children: [],
              label: '广告费给',
              value: '13075'
            },
            {
              children: [],
              label: '没有所属产品的项目',
              value: '13076'
            },
            {
              children: [],
              label: 'Z项目',
              value: '13080'
            },
            {
              children: [],
              label: 'XXXX项目',
              value: '13081'
            },
            {
              children: [],
              label: '测试带项目管理的项目',
              value: '13091'
            },
            {
              children: [],
              label: '得三四点',
              value: '13099'
            },
            {
              children: [],
              label: 'ma-test2',
              value: '13102'
            }
          ],
          label: '京J·JV7778',
          value: '-1'
        },
        {
          children: [
            {
              children: [],
              label: '测试上传素材',
              value: '13079'
            }
          ],
          label: '测试上传素材',
          value: '5753'
        },
        {
          children: [
            {
              children: [],
              label: '$$$$',
              value: '1188'
            }
          ],
          label: '$$$$',
          value: '9'
        },
        {
          children: [
            {
              children: [],
              label: 'test26',
              value: '13183'
            }
          ],
          label: 'test26',
          value: '5824'
        },
        {
          children: [
            {
              children: [],
              label: '防出错项目-021',
              value: '13098'
            }
          ],
          label: '防出错项目-021',
          value: '5758'
        },
        {
          children: [
            {
              children: [],
              label: '优化经理建的项目',
              value: '13188'
            }
          ],
          label: '优化经理建的项目',
          value: '5826'
        },
        {
          children: [
            {
              children: [],
              label: '测试-0624-01',
              value: '1203'
            },
            {
              children: [],
              label: '测试头条',
              value: '1205'
            },
            {
              children: [],
              label: '测试快手',
              value: '1207'
            },
            {
              children: [],
              label: '测试百度',
              value: '1208'
            },
            {
              children: [],
              label: '测试增加123',
              value: '13057'
            }
          ],
          label: '测试-0624-01',
          value: '21'
        }
      ],
      options1: [
        {
          value: 1,
          label: '东南',
          children: [
            {
              value: '1-1',
              label: '上海'
              // children: [
              //   { value: 3, label: '普陀' },
              //   { value: 4, label: '黄埔' },
              //   { value: 5, label: '徐汇' }
              // ]
            },
            {
              value: '1-2',
              label: '江苏'
              // children: [
              //   { value: 8, label: '南京' },
              //   { value: 9, label: '苏州' },
              //   { value: 10, label: '无锡' }
              // ]
            },
            {
              value: '1-3',
              label: '浙江'
              // children: [
              //   { value: 13, label: '杭州' },
              //   { value: 14, label: '宁波' },
              //   { value: 15, label: '嘉兴' }
              // ]
            }
          ]
        },
        {
          value: 2,
          label: '西北',
          children: [
            {
              value: '2-1',
              label: '浙江1'
              // children: [
              //   { value: 19, label: '西安' },
              //   { value: 20, label: '延安' }
              // ]
            },
            {
              value: '2-2',
              label: '新疆维吾尔族自治区'
              // children: [
              //   { value: 22, label: '乌鲁木齐' },
              //   { value: 23, label: '克拉玛依' }
              // ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    commitData() {
      return this.options.reduce((list, { children = [], value }) => {
        const designerRoleIdList = children
          .filter(val => this.selectMultiple.includes(val.value))
          .map(val => val.value)
        if (designerRoleIdList.length) {
          list.push({
            designerRoleType: value,
            designerRoleIdList
          })
        }
        return list
      }, [])
    }
  },
  methods: {
    fu() {
      setTimeout(() => {
        this.selectMultiple = ['13098', '13057', '13099', '13075']
      }, 60)
    },
    clear() {
      this.selectMultiple = []
    },
    handleHierarchicalChange(value) {
      this.hierarchicalChangeValue = value
    }
  }
}
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.button-group {
  display: flex;
  gap: 12px;
}

.action-button {
  min-width: 80px;
}

.code-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.value-display {
  flex: 1;
}

.value-display h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
  font-weight: 500;
}

pre {
  background-color: #f8f9fa;
  padding: 16px;
  border-radius: 6px;
  overflow: auto;
  margin: 0;
  border: 1px solid #eee;
}

code {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.cascader-section {
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 代码高亮样式优化 */
code {
  .string {
    color: #e3116c;
  }
  .number {
    color: #0898c0;
  }
  .boolean {
    color: #36acaa;
  }
  .null {
    color: #998;
  }
  .key {
    color: #905;
  }
}

/* 响应式布局 */
@media (max-width: 768px) {
  .code-wrapper {
    grid-template-columns: 1fr;
  }

  .header {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }
}
</style>

<template>
  <div class="container">
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
          ref="cascader"
          v-model="selectMultiple"
          :data="options"
          :width="360"
          :height="320"
          :input-width="260"
          :level-key-map="{
            level0: 'productIds',
            level1: 'appIds'
          }"
          filterable
          multiple
          show-select-option
          @on-hierarchical-change="handleHierarchicalChange"
          @on-data-loaded="handleDataLoaded"
          @on-data-error="handleDataError"></rd-filter-list-cascader>
      </section>
    </section>
    <!-- ... existing template code ... -->
    <div class="warning-tip">
      <i class="warning-icon">ℹ</i>
      1. 传递本地数据配置rd-filter-list-cascader的data属性即可 2.
      如需使用接口数据，则去掉data属性配置dataSource属性
    </div>
    <div class="code-wrapper">
      <div class="value-display">
        <h3>初始值（适用于提交场景呢，只获取叶子结点值）：</h3>
        <pre><code>{{ JSON.stringify(selectMultiple, null, 2) }}</code></pre>
      </div>
      <div class="value-display">
        <h3>自定义计算值（适用于展示场景，根据层级结构展示）：</h3>
        <pre><code>{{ JSON.stringify(commitData, null, 2) }}</code></pre>
      </div>
      <div class="value-display">
        <h3>按层级结构计算值（适用于提交场景，获取不同节点的数据）：</h3>
        <pre><code>{{ JSON.stringify(hierarchicalChangeValue, null, 2) }}</code></pre>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectMultiple: [],
      // 级联选择器改变的值
      hierarchicalChangeValue: [],
      // 本地数据
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
      // 接口数据
      dataSource: {
        api: 'http://test-api2.adsdesk.cn/adsdesk/api/user/app/tree',
        method: 'POST',
        dataPath: 'data.data',
        headers: {
          authorization:
            'Adsdesk ZXlKaGJHY2lPaUpJVXpVeE1pSjkuZXlKemRXSWlPaUl5TWpZNElpd2ljbUpoWTFabGNuTnBiMjRpT2lJeExqQWlMQ0p5YjJ4bElqb2lUVUZPUVVkRlVpSXNJbTFsWkdsaFVHVnliV2x6YzJsdmJpSTZJbUpoYVdSMUxHSnBiR2xpYVd4cExHZGtkSFl6TUN4cmRXRnBjMmh2ZFN4eGFXRnVZMmgxWVc0c2RHOTFkR2xoYnlJc0ltZHliM1Z3U1dRaU9pSXhNVFV5SWl3aVkzVnpkRzl0WlhKSlpDSTZNVEF3TWpVc0ltUmxjSFJKWkhNaU9sdGRMQ0psYm1SVWFXMWxJanA3SW5sbFlYSWlPakl3T1Rrc0ltMXZiblJvVm1Gc2RXVWlPakV5TENKdGIyNTBhQ0k2SWtSRlEwVk5Ra1ZTSWl3aVpHRjVUMlpOYjI1MGFDSTZNekVzSW1SaGVVOW1XV1ZoY2lJNk16WTFMQ0prWVhsUFpsZGxaV3NpT2lKVVNGVlNVMFJCV1NJc0ltaHZkWElpT2pBc0ltMXBiblYwWlNJNk1Dd2ljMlZqYjI1a0lqb3dMQ0p1WVc1dklqb3dMQ0pqYUhKdmJtOXNiMmQ1SWpwN0ltTmhiR1Z1WkdGeVZIbHdaU0k2SW1semJ6ZzJNREVpTENKcFpDSTZJa2xUVHlKOWZTd2lkWE5sY2tsa0lqb3lNalk0TENKMWRXbGtJam9pUVRsQ1F6QkRRakk0TWtVMk5FTXpRemxDUTBSRk5EY3hNamcyTWpNd01FTWlMQ0psYldGcGJDSTZJbnBvWVc1bmJXVnVaMEJ5WlhsMWJpNWpiMjBpZlEucW1kQlNHZTFQbnpKTlZtWGNhdEpaQWx3TEtBZU9OSFZiSXFlaFpVSHNtX0FvZjVpV0tBNTg3bk55Y25tVDJsLWNKX09Hdk5MQXlDQmtwTkFEZTVWOGc='
        }
      }
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
    },
    handleDataLoaded(data) {
      console.log('handleDataLoaded', data)
    },
    handleDataError(error) {
      console.log('handleDataError', error)
    }
  }
}
</script>
<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px;
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
  max-height: 768px; /* Add max height */
  overflow: auto; /* Enable scrolling */
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

.warning-tip {
  background-color: #fff3e0;
  border-left: 4px solid #ff9800;
  padding: 12px 16px;
  margin: 16px 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: #795548;
}

.warning-icon {
  margin-right: 8px;
  color: #ff9800;
  font-style: normal;
  font-weight: bold;
}
</style>

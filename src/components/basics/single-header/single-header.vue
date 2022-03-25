<template>
  <main :class="classes">
    <div v-if="isShowTitle" :class="prefixCls + '-title'">
      {{ titleName }}
    </div>
    <div :class="prefixCls + '-content'">
      <div :class="prefixCls + '-content-slot'">
        <slot name="content"></slot>
      </div>
      <div :class="prefixCls + '-content-button-group'">
        <Button :class="prefixCls + '-content-button'" @click="handleReset"
          >{{ resetText }}
        </Button>
        <Button
          :class="prefixCls + '-content-button'"
          :loading="loading"
          type="primary"
          @click="handleQuery"
          >{{ queryText }}
        </Button>
      </div>
    </div>
  </main>
</template>

<script>
const { prefix } = require('../../../config.js');
const prefixCls = prefix + 'single-header';
export default {
  name: prefixCls,
  props: {
    isShowTitle: {
      type: Boolean,
      default: true
    },
    titleName: {
      type: String,
      default: '定向包'
    },
    loading: {
      type: Boolean,
      default: false
    },
    resetText: {
      type: String,
      default: '重置'
    },
    queryText: {
      type: String,
      default: '查询'
    }
  },
  data() {
    return {
      prefixCls
    };
  },
  computed: {
    classes() {
      return [
        `${prefixCls}-wrapper`,
        {
          [`${prefixCls}-group`]: this.prepend || this.append
        }
      ];
    }
  },
  methods: {
    // 重置
    handleReset() {
      this.$emit('on-reset');
    },
    // 查询
    handleQuery() {
      this.$emit('on-query');
    }
  }
};
</script>

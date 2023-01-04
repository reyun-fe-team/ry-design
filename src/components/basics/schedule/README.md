props

v-model/value 数据项 String 7*24*colspan
weekList 星期天 Array  ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日']
colspan 1小时分几块 Number 1=>1小时1块，2=>1小时0-30，30-60

events
on-white-block 获取白色块的数据 [{weekDay: 1, startHour: 1, endHour: 24}]
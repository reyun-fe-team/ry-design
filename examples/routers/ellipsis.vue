<template>
  <Tabs v-model="activeName">
    <TabPane
      label="示例1-按照字符数省略 40字符"
      name="1">
      <div
        v-if="activeName === '1'"
        class="content">
        <rd-ellipsis
          :text="text"
          :length="40"
          theme="light"
          tooltip />
      </div>
    </TabPane>
    <TabPane
      label="示例2-按照高度省略 100px 高"
      name="2">
      <div
        v-if="activeName === '2'"
        class="content">
        <rd-ellipsis
          :text="text"
          :height="100"
          tooltip />
      </div>
    </TabPane>
    <TabPane
      label="示例3-按照行数省略 2行"
      name="3">
      <div
        v-if="activeName === '3'"
        class="content">
        <rd-ellipsis
          :text="text"
          :lines="2"
          enable-css
          tooltip />
      </div>
    </TabPane>
    <TabPane
      label="示例4-slot 前缀 自定义省略 后缀"
      name="4">
      <div
        v-if="activeName === '4'"
        class="content">
        <rd-ellipsis
          :text="text"
          :length="40"
          tooltip>
          <span slot="prefix">
            前缀-
            <Icon type="md-bulb" />
          </span>
          <span
            slot="more"
            style="color: red">
            ...更多
          </span>
          <Icon
            slot="suffix"
            type="md-copy" />
        </rd-ellipsis>
      </div>
    </TabPane>
    <TabPane
      label="示例5-表格中使用"
      name="5">
      <div
        v-if="activeName === '5'"
        class="content">
        <Table
          style="width: 300px"
          :max-height="350"
          :columns="column"
          :data="currentTable.data"
          border>
          <template
            slot="trackName"
            slot-scope="{ row }">
            <rd-ellipsis
              :text="row.actionTrackUrl"
              :lines="2"
              enable-css
              tooltip
              transfer></rd-ellipsis>
          </template>
        </Table>
        <rd-page
          style="width: 300px"
          type="m-middle"
          :current="pager.current"
          :size="pager.pageSize"
          :total="body.length"
          @page-change="handlePageChange"></rd-page>
      </div>
    </TabPane>
    <TabPane
      label="示例6-表格中使用-css方式"
      name="6">
      <Table
        v-if="activeName === '6'"
        :columns="column"
        :data="body"
        border>
        <template
          slot="trackName"
          slot-scope="{ row }">
          <div style="display: flex; align-items: center">
            <rd-ellipsis
              :text="row.actionTrackUrl"
              :lines="2"
              :enable-css="true"
              tooltip
              transfer></rd-ellipsis>
            <Icon type="md-create" />
          </div>
        </template>
      </Table>
    </TabPane>
    <TabPane
      label="示例7-宽高变了，自动计算"
      name="7">
      <div
        v-if="activeName === '7'"
        class="content">
        <Button @click="setHeightPx">改变高度</Button>
        <div style="margin: 10px 0">
          <rd-ellipsis
            style="width: 200px; line-height: 25px; background-color: #f00"
            auto-resize
            :style="{ height: height + 'px' }"
            :text="text"
            tooltip />
        </div>
        <div>
          <Button @click="setWidthPx">改变宽度</Button>
          <div style="margin: 10px 0">
            <rd-ellipsis
              auto-resize
              style="height: 25px; line-height: 25px; background-color: #f00"
              :style="{ width: width + 'px' }"
              :text="text"
              tooltip />
          </div>
        </div>
      </div>
    </TabPane>
  </Tabs>
</template>

<script>
import { getTableData } from '@src/util/assist.js'

export default {
  data() {
    return {
      activeName: '1',
      pager: {
        // 当前页数
        current: 1,
        // 每页数量
        pageSize: 50
      },
      height: 400,
      width: 1000,
      text: '史蒂夫·乔布斯（英语：Steve Jobs），是一名美国企业家、营销家和发明家，苹果公司的联合创始人之一，曾任董事长及首席执行官职位，NeXT创办人及首席执行官，也是皮克斯动画的创办人并曾任首席执行官，2006年为华特迪士尼公司的董事会成员。2017年9月苹果发布会举行的地方，以他命名为 Steve Jobs Theater 。',
      column: [
        {
          key: 'advertiserId',
          title: '姓名',
          width: 100
        },
        {
          key: 'trackName',
          title: '备注',
          slot: 'trackName',
          width: 200
        }
      ],
      body: [
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=c44e947f06344206f20ed59d8d1c6399&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-1',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=7c7bfd3f065e31c055a7bd6fa53b54da&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-2',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=3af0642281ed7010cfb90f09a2612e71&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-3',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=56739ac416a51dbdc4f9fb56e49ec5ae&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-4',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=aa9f2544fbe2ac147eea691688c572c7&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-5',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=9129b7450a6d2f4e62cd48628c435b5e&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-6',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=6d6d83a5d30658ece210b882a04e01bb&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-7',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=fd91e6324885d20a4259fb01c52b24b5&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-8',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=abe8d828c985bc284aedea8275d5c0dd&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-9',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=7a10c34b7a69ac34a4fadbd0111f5019&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-10',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=8240055ae55575e7a550b579d0f4ce41&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-11',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=b2774446cca51e84eaee128492fe1afc&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-12',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=d3b6ee5f17a25390fd702b6eef6e5494&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-13',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=5b5e154c7b9cd62fcf21a39f50eb384e&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-14',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=96c5f874f380a6b03101389dc7a878fa&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-15',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=a485317fe00b85fe9cc8ccced0bebeee&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-16',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=baf40eec5e4b4e43d0bfd0381e76c3a4&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-17',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=431217d2eb580f23a396a77d2771a921&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-18',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=cca21a99b5b2f40d9e969bdd914c6002&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-19',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=9fdcbbac0c3b715646446bcc3946f944&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-20',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=a839787dc2e0eacdd0f959bb01e11835&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-21',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=05e5eb2650e9a31841f69d7ffbc840b0&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-22',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=7ef64ab405e3567193a2ea0e77d4fd57&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-23',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=ac8d5cdd6bde42c46c1207544df28683&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-24',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=c25c757ec3f7cc64c3675b551c06900b&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-25',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=3b6f5e231973a4f540ad2866ee5e774b&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-26',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=543b1f8a89b7f14fbd5f853d7c024602&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-27',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=f2ac7cba2a765e687caf0d543a412650&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-28',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=4a3c35a3c1a3c5ab97353c300ecb32dd&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-29',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=e662a0837f3cb341d80cba9bc9c62f2e&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-30',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=51506e6603322e2337c60a0a03a4cabb&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-31',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=4758aecf295e8100b94719e7d1abd987&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-32',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=872e05f5c9ab0cda38142d3271b30232&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-33',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=1908138ff7f9dfb9dc6d9a062df183e4&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-34',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=d3f08076750d97a92c281729d3022bfc&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-35',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=7ed5431954e516f939cf79e5ae38af91&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-36',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=a7df6ee5be6f27e6b1fbf6c012a1b333&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-37',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=43fee26805652adeadfdd0556d058fa6&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-38',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=e026a6051f9a2788b93eb099c5d9698d&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-39',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=2618ee080f0723fa39520564cab7c253&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-40',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=b23d0233185fa1e9a16b7ddd49920b65&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-41',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=3fdd1865f2c1e9cda1bac5b9ac31bac3&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-42',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        },
        {
          actionTrackUrl:
            'https://cda.lilisi.com/tracking?dap_code=8b33ceb99cee6d6e118e104334a285b4&trackid=__TRACKID__&creative_id=__CREATIVEID__&os=__OS__&mac=__MAC1__&idfa_md5=__IDFAMD5__&ip=__IP__&ua=__UA__&ts=__TS__&sub1=__CREATIVEID__&caid=__CAID__',
          advertiserId: '不限',
          appPackage: '',
          checkStatus: true,
          commentClickTrackUrl: '',
          displayResult: '',
          gameClickTrackUrl: '',
          liveOnTrackUrl: '',
          reasonPhrase: '',
          siteName: '',
          trackName: 'Wgame_IOS_B站_公测_华优代投_2627556_付费直投_定向游戏兴趣_小图_1012-43',
          trackUrl: '',
          videoPlay3STrackUrl: '',
          videoPlay5STrackUrl: ''
        }
      ]
    }
  },
  computed: {
    // 计算当前的页数据
    currentTable() {
      const { current = 1, pageSize = 50 } = this.pager
      return getTableData(current, pageSize, this.body)
    }
  },
  methods: {
    setHeightPx() {
      this.height -= 10
    },
    // 分页
    handlePageChange({ current, size }) {
      this.pager.current = current
      this.pager.pageSize = size
    },
    setWidthPx() {
      this.width -= 10
    }
  }
}
</script>

<style
  lang="less"
  scoped>
.content {
  width: 300px;
  padding: 10px;
  margin: 20px 0;
  background-color: #7bbfea;
}
.ivu-table-wrapper {
  .ivu-icon {
    display: none;
  }
  .ivu-table-row-hover {
    .ivu-icon {
      display: inline-block;
    }
  }
}
</style>

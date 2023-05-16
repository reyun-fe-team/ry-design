<template>
  <div>
    <h4>基本用法</h4>
    <br />
    <rd-space>
      <div>Space</div>
      <Input
        placeholder="Enter something..."
        style="width: 100px" />
      <Button type="primary">Button</Button>
    </rd-space>
    <br />
    <br />
    <br />
    <h4>垂直间距</h4>
    <br />
    <div style="width: 400px">
      <rd-space
        :size="20"
        direction="vertical"
        fill>
        <Button
          type="primary"
          long>
          Button
        </Button>
        <Button
          type="success"
          long>
          Button
        </Button>
        <Button
          type="error"
          long>
          Button
        </Button>
      </rd-space>
    </div>
    <br />
    <br />
    <br />
    <h4>尺寸</h4>
    <p>
      内置 4 个尺寸，mini - 4px small - 8px (默认) medium - 16px large -
      24px，也支持传数字来自定义尺寸。
    </p>
    <br />
    <div>
      <RadioGroup
        v-model="size"
        type="button">
        <Radio label="mini">mini</Radio>
        <Radio label="small">small</Radio>
        <Radio label="medium">medium</Radio>
        <Radio label="large">large</Radio>
      </RadioGroup>
    </div>
    <br />
    <div>
      <rd-space :size="size">
        <Button type="primary">Item1</Button>
        <Button type="primary">Item2</Button>
        <Button type="primary">Item3</Button>
      </rd-space>
    </div>
    <br />
    <br />
    <br />
    <h4>对齐</h4>
    <p>内置 4 种对齐方式，分别为 start center end baseline，在水平模式下默认为 center。</p>
    <br />
    <div>
      <RadioGroup
        v-model="align"
        type="button">
        <Radio label="start">start</Radio>
        <Radio label="center">center</Radio>
        <Radio label="end">end</Radio>
        <Radio label="baseline">baseline</Radio>
      </RadioGroup>
    </div>
    <br />
    <div style="width: 300px; padding: 10px; background-color: #ccc">
      <rd-space :align="align">
        <div>Space</div>
        <Button type="primary">Item2</Button>
        <Card title="Card">Card content</Card>
      </rd-space>
    </div>
    <br />
    <br />
    <br />
    <h4>环绕间距</h4>
    <p>环绕类型的间距，四周都有间距，一般用于换行的场景。</p>
    <br />
    <div style="width: 600px; padding: 30px; background-color: #ccc">
      <rd-space wrap>
        <Button type="primary">Item1</Button>
        <Button type="primary">Item2</Button>
        <Button type="primary">Item3</Button>
        <Button type="primary">Item4</Button>
        <Button type="primary">Item5</Button>
        <Button type="primary">Item6</Button>
        <Button type="primary">Item7</Button>
        <Button type="primary">Item8</Button>
        <Button type="primary">Item9</Button>
        <Button type="primary">Item10</Button>
        <Button type="primary">Item11</Button>
        <Button type="primary">Item12</Button>
        <Button type="primary">Item13</Button>
        <Button type="primary">Item14</Button>
        <Button type="primary">Item15</Button>
        <Button type="primary">Item16</Button>
        <Button type="primary">Item17</Button>
        <Button type="primary">Item18</Button>
        <Button type="primary">Item19</Button>
        <Button type="primary">Item20</Button>
      </rd-space>
    </div>
    <br />
    <br />
    <br />
    <h4>分隔符</h4>
    <p>为相邻子元素设置分隔符。</p>
    <br />
    <rd-space>
      <template #split>
        <Divider type="vertical" />
      </template>
      <Button type="primary">Item1</Button>
      <Button type="primary">Item2</Button>
      <Button type="primary">Item3</Button>
      <Button type="primary">Item4</Button>
    </rd-space>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</template>
<script>
export default {
  data() {
    return {
      size: 'medium',
      align: 'center'
    }
  }
}
</script>
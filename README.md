# nk-util

> CSS样式工具类，该项目用于收集日常使用的常用工具样式

### 项目结构
```
- build 经过打包编译的资源
- demo 示例文件
- extra 好用的插件
- src nkutil的源码
    - pulgins 插件扩展，包括了JS以及CSS文件
    - style 样式扩展，一些基础的样式类
    - node_pulgins node扩展的插件
```

### CSS命名规范
##### 组织规范
- 命名全为小写，中间以"-"分隔。规则格式为：CSS命名空间-CSS作用位置(**可以多个**)-CSS的扩展描述(**可以多个**)。
```css
/** nkutil的header的小标题样式 */
.nk-header-title-min{
    font-size: 13px;
}

/** ukutil的10号字体样式文本样式 */
.nk-text-10{
    font-size: 10px;
}

```
- 该CSS为当前页面有效的样式，命名以"m"开头
```css
/** 首页顶部标题样式 */
.m-header-title{
    color: blue;
}
```
- 该CSS为全局有效的扩展的样式，命名以"g"开头
```css
/** 全局有效的header样式 */
.g-header-title{
    color: #333;
}
```

##### 常用词汇（参考frozenui）
- 状态词汇

| 单词 | 意思 |
| :-: | :-: |
| show | 显示 |
| hide | 隐藏 |
| current | 当前状态 |
| active | 激活态 |
| checked | 选中态 |
| selected | 已选中状态 |
| disabled | 失效状态 |
| done | 完成状态 |
| focus | 聚焦状态 |
| blur | 失去焦点状态 |

- 缩写

| 单词 | 意思 |
| :-: | :-: |
| -s | small |
| -lg | large |
| -l | left |
| -r | right |
| -t | top |
| -b | bottom |
| -thumb | thumbnail（缩略图） | 
| -img | images |
| -nav | navigation（导航） |
| -cnt | content |
| -hd | header |
| -bd | body |
| -ft | footer |
| -txt | text |
| -btn | button |
| -multi | multiple（多个） |

- 常用的属性或模块

| 单词 | 意思 |
| :-: | :-: |
| -default | 默认样式 | 
| -wrap | 外层 | 
| -pure | 简版 | 
| -stable | 稳的，用于灰色背景 | 
| -border/-outline | 带边框的 | 
| -vertical | 垂直 | 
| -horizontal | 横向 | 
| -divider | 分割 | 
| -muted | 减轻的，不明亮的 | 
| -highlight | 高亮的 | 
| -group | 组的 |
| -item | 子元素 | 
| -title | 标题 | 
| -subtitle | 小标题 |
| -state | 状态 |
| -guide | 引导性 | 
| -link | 链接 |
| -bar | 工具栏 | 
| -success | 成功的 | 
| -warn | 警告的 | 
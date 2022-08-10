export const defalutMenus = {
   back: {
     icon: 't-icon t-angle-left'
   },
  // login: true,
  left: [
    {
      name: '文件',
      icon: 't-icon t-folder',
      children: [
        { name: '导入文件', keyboard: 'Ctrl+I', action: 'load' },
        {},
        { name: '保存', keyboard: 'Ctrl+S', action: 'save' },
        { name: '下载JSON文件', action: 'downloadJson' },
        { name: '导出HTML文件', action: 'downloadHtml'},
        {},
        { name: '下载为PNG', action: 'downloadPng' },
        { name: '下载为SVG', action: 'downloadSvg' }
      ]
    },
    {
      name: '编辑',
      icon: 't-icon t-edit',
      children: [
        { name: '撤销', keyboard: 'Ctrl+Z', action: 'undo' },
        { name: '恢复  ', keyboard: 'Ctrl+Shift+Z', action: 'redo' },
        {},
        { name: '剪切  ', keyboard: 'Ctrl+X', action: 'cut' },
        { name: '复制  ', keyboard: 'Ctrl+C', action: 'copy' },
        { name: '粘贴  ', keyboard: 'Ctrl+V', action: 'paste' }
      ]
    },
    {
      name: '保存',
      icon: 't-icon t-save',
      action: 'save'
    },
    {
      name: '撤销',
      icon: 't-icon t-reply',
      action: 'undo'
    }
  ]
  // middle: []
};

export const defalutUserMenus = [];

export const defalutMaterials = [
  {
    name: '基础图形库',
    expand: true,
    show: true,
    list: []
  },
  {
    name: '基本形状',
    expand: false,
    show: true,
    list: [
      {
        name: 'square',
        icon: 't-icon t-rect',
        id: 1,
        data: {
          text: '正方形',
          rect: {
            width: 100,
            height: 100
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'square',
          icon: '\ue64d',
          iconFamily: 'topology',
          iconColor: '#2f54eb'
        }
      },
      {
        name: 'rectangle',
        icon: 't-icon t-rectangle',
        id: 2,
        data: {
          text: '圆角矩形',
          rect: {
            width: 200,
            height: 50
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 0.1,
          name: 'rectangle'
        }
      },
      {
        name: 'circle',
        icon: 't-icon t-circle',
        id: 3,
        data: {
          text: '圆',
          rect: {
            width: 100,
            height: 100
          },
          name: 'circle',
          textMaxLine: 1
        }
      },
      {
        name: 'triangle',
        icon: 't-icon t-triangle',
        id: 4,
        data: {
          text: '三角形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'triangle'
        }
      },
      {
        name: 'diamond',
        icon: 't-icon t-diamond',
        id: 5,
        data: {
          text: '菱形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'diamond'
        }
      },
      {
        name: 'pentagon',
        icon: 't-icon t-pentagon',
        id: 6,
        data: {
          text: '五边形',
          rect: {
            width: 100,
            height: 100
          },
          name: 'pentagon'
        }
      },
      {
        name: 'hexagon',
        icon: 't-icon t-hexagon',
        id: 7,
        data: {
          text: '六边形',
          rect: {
            width: 100,
            height: 100
          },
          paddingTop: 10,
          paddingBottom: 10,
          name: 'hexagon'
        }
      },
      {
        name: 'pentagram',
        icon: 't-icon t-pentagram',
        id: 8,
        data: {
          text: '五角星',
          rect: {
            width: 100,
            height: 100
          },
          name: 'pentagram'
        }
      },
      {
        name: 'leftArrow',
        icon: 't-icon t-arrow-left',
        id: 9,
        data: {
          text: '左箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'leftArrow'
        }
      },
      {
        name: 'rightArrow',
        icon: 't-icon t-arrow-right',
        id: 10,
        data: {
          text: '右箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'rightArrow'
        }
      },
      {
        name: 'twowayArrow',
        icon: 't-icon t-twoway-arrow',
        id: 11,
        data: {
          text: '双向箭头',
          rect: {
            width: 200,
            height: 100
          },
          name: 'twowayArrow'
        }
      },
      {
        name: 'line',
        icon: 't-icon t-line',
        id: 12,
        data: {
          text: '直线',
          rect: {
            width: 100,
            height: 100
          },
          name: 'line'
        }
      },
      {
        name: 'cloud',
        icon: 't-icon t-cloud',
        id: 13,
        data: {
          text: '云',
          rect: {
            width: 100,
            height: 100
          },
          name: 'cloud'
        }
      },
      {
        name: 'message',
        icon: 't-icon t-msg',
        id: 14,
        data: {
          text: '消息框',
          rect: {
            width: 100,
            height: 100
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'message'
        }
      },
      {
        name: 'file',
        icon: 't-icon t-file',
        id: 15,
        data: {
          text: '文档',
          rect: {
            width: 80,
            height: 100
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          name: 'file'
        }
      },
      {
        name: 'text',
        icon: 't-icon t-text',
        id: 16,
        data: {
          text: '文字框',
          rect: {
            width: 160,
            height: 30
          },
          name: 'text'
        }
      },
      {
        name: 'image',
        icon: 't-icon t-image',
        id: 17,
        data: {
          text: '',
          rect: {
            width: 100,
            height: 100
          },
          name: 'image',
          image: '/assets/img/logo.png'
        }
      },
      {
        name: 'cube',
        icon: 't-icon t-cube',
        id: 18,
        data: {
          text: '立方体',
          rect: {
            width: 50,
            height: 70
          },
          is3D: true,
          z: 10,
          zRotate: 15,
          fillStyle: '#ddd',
          name: 'cube',
          icon: '\ue63c',
          iconFamily: 'topology',
          iconColor: '#777',
          iconSize: 30
        }
      },
      {
        name: 'people',
        icon: 't-icon t-people',
        id: 19,
        data: {
          text: '用户',
          rect: {
            width: 70,
            height: 100
          },
          name: 'people'
        }
      },
      {
        name: '视频/网页',
        icon: 't-icon t-pc',
        id: 20,
        data: {
          text: '视频/网页',
          rect: {
            width: 200,
            height: 200
          },
          paddingLeft: 10,
          paddingRight: 10,
          paddingTop: 10,
          paddingBottom: 10,
          // strokeStyle: 'transparent',
          name: 'div'
        }
      },
      {
        name: '涂鸦',
        icon: 't-icon t-pencil',
        class: '架构拓扑图',
        data: {
          name: 'graffiti',
          type: 0, //  0- 连线； 1- 节点
          doing: true,
          rect: {
            width: 100,
            height: 100
          }
        }
      },
      {
        name: '涂鸦2',
        icon: 't-icon t-pencil-close',
        class: '架构拓扑图',
        data: {
          name: 'graffiti',
          type: 0, //  0- 连线； 1- 节点
          closePath: true, // 是否闭合
          doing: true,
          rect: {
            width: 0,
            height: 0
          }
        }
      },
      {
        name: '钢笔',
        icon: 't-icon t-pen',
        class: '架构拓扑图',
        data: {
          name: 'lines',
          type: 1, //  1- 连线
          doing: true,
          rect: {
            width: 0,
            height: 0
          }
        }
      },
      {
        name: '钢笔节点',
        icon: 't-icon t-dakai',
        class: '架构拓扑图',
        data: {
          isNode: true,
          name: 'lines',
          type: 0, //  0- 节点
          doing: true,

          rect: {
            width: 0,
            height: 0
          }
        }
      },
      {
        name: '钢笔闭合节点',
        icon: 't-icon t-quanfengbi',
        class: '架构拓扑图',
        data: {
          name: 'lines',
          type: 0, //  0- 节点
          doing: true,
          closePath: true, // 是否闭合
          rect: {
            width: 0,
            height: 0
          }
        }
      }
    ]
  },
  {
    name: '图表控件（echarts）',
    expand: false,
    show: true,
    list: [
      {
        name: '折线图',
        icon: 't-icon t-line-chart',
        id: 48,
        data: {
          text: '折线图',
          rect: {
            width: 300,
            height: 200
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                xAxis: {
                  type: 'category',
                  data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                  type: 'value'
                },
                series: [
                  {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line'
                  }
                ]
              }
            }
          }
        }
      },
      {
        name: '柱状图',
        icon: 't-icon t-bar-chart',
        id: 49,
        data: {
          text: '柱状图',
          rect: {
            width: 300,
            height: 200
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                color: ['#3398DB'],
                tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                  }
                },
                grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
                },
                xAxis: [
                  {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: {
                      alignWithLabel: true
                    }
                  }
                ],
                yAxis: [
                  {
                    type: 'value'
                  }
                ],
                series: [
                  {
                    name: '直接访问',
                    type: 'bar',
                    barWidth: '60%',
                    data: [10, 52, 200, 334, 390, 330, 220]
                  }
                ]
              }
            }
          }
        }
      },
      {
        name: '饼图',
        icon: 't-icon t-pie-chart',
        id: 50,
        data: {
          text: '饼图',
          rect: {
            width: 200,
            height: 200
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                tooltip: {
                  trigger: 'item',
                  formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                  orient: 'vertical',
                  x: 'left',
                  data: [
                    '直接访问',
                    '邮件营销',
                    '联盟广告',
                    '视频广告',
                    '搜索引擎'
                  ]
                },
                series: [
                  {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                      normal: {
                        show: false,
                        position: 'center'
                      },
                      emphasis: {
                        show: true,
                        textStyle: {
                          fontSize: '30',
                          fontWeight: 'bold'
                        }
                      }
                    },
                    labelLine: {
                      normal: {
                        show: false
                      }
                    },
                    data: [
                      { value: 335, name: '直接访问' },
                      { value: 310, name: '邮件营销' },
                      { value: 234, name: '联盟广告' },
                      { value: 135, name: '视频广告' },
                      { value: 1548, name: '搜索引擎' }
                    ]
                  }
                ]
              }
            }
          }
        }
      },
      {
        name: '仪表盘',
        icon: 't-icon t-dashboard-chart',
        id: 51,
        data: {
          text: '仪表盘',
          rect: {
            width: 300,
            height: 300
          },
          name: 'echarts',
          data: {
            echarts: {
              option: {
                tooltip: {
                  formatter: '{a} <br/>{b} : {c}%'
                },
                toolbox: {
                  feature: {
                    restore: {},
                    saveAsImage: {}
                  }
                },
                series: [
                  {
                    name: '业务指标',
                    type: 'gauge',
                    detail: { formatter: '{value}%' },
                    data: [{ value: 50, name: '完成率' }]
                  }
                ]
              }
            }
          }
        }
      }
    ]
  },
  {
    iconUrl: '//at.alicdn.com/t/c/font_3562987_7wtvdvxywl7.css',
    expand: false,
    show: true,
    list: []
  },
  {
    iconUrl: '//at.alicdn.com/t/c/font_3560668_y2e6askrww.css',
    expand: false,
    show: true,
    list: []
  }
];

export const images = [
  {
    image:
      ''
  }
];

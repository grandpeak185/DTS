(function() {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var accent3 = style.getPropertyValue('--accent3').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();
  var positive = style.getPropertyValue('--positive').trim();
  var negative = style.getPropertyValue('--negative').trim();

  var axisLine = { lineStyle: { color: rule } };
  var axisLabel = { color: muted, fontSize: 11 };
  var splitLine = { lineStyle: { color: rule, type: 'dashed' } };

  // ===== Chart 1: 2026年PDCI运价指数走势（vs 2025对比）=====
  var pdciChart = echarts.init(document.getElementById('chart-pdci'), null, { renderer: 'svg' });
  pdciChart.setOption({
    animation: false,
    tooltip: { trigger: 'axis', appendToBody: true },
    legend: { bottom: 5, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: '8%', right: '5%', bottom: '12%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
      axisLine: axisLine,
      axisLabel: axisLabel
    },
    yAxis: {
      type: 'value',
      name: '指数点',
      nameTextStyle: { color: muted, fontSize: 11 },
      min: 900,
      max: 1300,
      axisLine: axisLine,
      axisLabel: axisLabel,
      splitLine: splitLine
    },
    series: [
      {
        name: '2026年PDCI',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        data: [1220, 1180, 1200, 1057, 1006, 970, 973],
        itemStyle: { color: accent },
        lineStyle: { width: 3, color: accent },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: accent + '40' },
              { offset: 1, color: accent + '05' }
            ]
          }
        },
        markPoint: {
          symbol: 'pin',
          symbolSize: 40,
          data: [
            { name: 'Q1高点', value: 1220, xAxis: 0, yAxis: 1220, itemStyle: { color: positive } },
            { name: '最低', value: 970, xAxis: 5, yAxis: 970, itemStyle: { color: negative } }
          ],
          label: { fontSize: 10, color: '#fff' }
        }
      },
      {
        name: '2025年同期PDCI',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        data: [1120, 1085, 1150, 1130, 1100, 1080, 1027],
        itemStyle: { color: muted },
        lineStyle: { width: 1.5, color: muted, type: 'dashed' }
      }
    ]
  });
  window.addEventListener('resize', function() { pdciChart.resize(); });

  // ===== Chart 2: 货源结构（2026年）=====
  var cargoChart = echarts.init(document.getElementById('chart-cargo'), null, { renderer: 'svg' });
  cargoChart.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c}%' },
    legend: { show: false },
    series: [{
      type: 'pie',
      radius: ['35%', '65%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: true,
      itemStyle: { borderRadius: 6, borderColor: bg2, borderWidth: 2 },
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        color: ink,
        fontSize: 11
      },
      labelLine: { length: 12, length2: 12 },
      data: [
        { value: 35, name: '煤炭', itemStyle: { color: accent } },
        { value: 25, name: '矿石', itemStyle: { color: accent2 } },
        { value: 15, name: '建材', itemStyle: { color: accent3 } },
        { value: 12, name: '粮食', itemStyle: { color: positive } },
        { value: 8, name: '钢材/纸浆', itemStyle: { color: '#8e44ad' } },
        { value: 5, name: '其他', itemStyle: { color: muted } }
      ]
    }]
  });
  window.addEventListener('resize', function() { cargoChart.resize(); });

  // ===== Chart 3: 内贸集运市场份额（2026年）=====
  var shareChart = echarts.init(document.getElementById('chart-share'), null, { renderer: 'svg' });
  shareChart.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c}%' },
    legend: { show: false },
    series: [{
      type: 'pie',
      radius: '62%',
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 4, borderColor: bg2, borderWidth: 2 },
      label: {
        formatter: '{b}\n{d}%',
        color: ink,
        fontSize: 11
      },
      data: [
        { value: 40.2, name: '泛亚航运', itemStyle: { color: accent } },
        { value: 20.6, name: '中谷物流', itemStyle: { color: accent2 } },
        { value: 15.8, name: '安通控股', itemStyle: { color: accent3 } },
        { value: 4, name: '信风海运', itemStyle: { color: '#8e44ad' } },
        { value: 19.4, name: '其他船公司', itemStyle: { color: muted } }
      ]
    }]
  });
  window.addEventListener('resize', function() { shareChart.resize(); });

  // ===== Chart 4: 三强企业雷达对比（2026年）=====
  var radarChart = echarts.init(document.getElementById('chart-radar'), null, { renderer: 'svg' });
  radarChart.setOption({
    animation: false,
    tooltip: { appendToBody: true },
    legend: { bottom: 5, textStyle: { color: muted, fontSize: 11 } },
    radar: {
      indicator: [
        { name: '运力规模', max: 100 },
        { name: '网络覆盖', max: 100 },
        { name: '成本控制', max: 100 },
        { name: '盈利能力', max: 100 },
        { name: '海南布局', max: 100 },
        { name: '政策红利', max: 100 }
      ],
      center: ['50%', '48%'],
      radius: '62%',
      axisName: { color: ink, fontSize: 11 },
      splitLine: { lineStyle: { color: rule } },
      splitArea: { areaStyle: { color: [bg2, '#f8fafc'] } },
      axisLine: { lineStyle: { color: rule } }
    },
    series: [{
      type: 'radar',
      data: [
        {
          value: [92, 95, 75, 72, 70, 85],
          name: '泛亚航运',
          itemStyle: { color: accent },
          areaStyle: { color: accent + '20' },
          lineStyle: { width: 2 }
        },
        {
          value: [88, 80, 95, 90, 40, 60],
          name: '中谷物流',
          itemStyle: { color: accent2 },
          areaStyle: { color: accent2 + '20' },
          lineStyle: { width: 2 }
        },
        {
          value: [85, 65, 70, 62, 95, 95],
          name: '安通控股',
          itemStyle: { color: accent3 },
          areaStyle: { color: accent3 + '20' },
          lineStyle: { width: 2 }
        },
        {
          value: [45, 60, 65, 55, 50, 40],
          name: '信风海运',
          itemStyle: { color: '#8e44ad' },
          areaStyle: { color: '#8e44ad20' },
          lineStyle: { width: 2 }
        }
      ]
    }]
  });
  window.addEventListener('resize', function() { radarChart.resize(); });

  // ===== Chart 5: 洋浦港内贸vs外贸吞吐量对比 =====
  var yangpuSplitChart = echarts.init(document.getElementById('chart-yangpu-split'), null, { renderer: 'svg' });
  yangpuSplitChart.setOption({
    animation: false,
    tooltip: {
      trigger: 'axis',
      appendToBody: true,
      formatter: function(params) {
        var str = params[0].name + '<br/>';
        params.forEach(function(p) {
          str += p.marker + p.seriesName + ': ' + p.value + ' 万标箱<br/>';
        });
        return str;
      }
    },
    legend: { bottom: 5, textStyle: { color: muted, fontSize: 11 } },
    grid: { left: '8%', right: '5%', bottom: '12%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['2025年全年', '2026年H1（估）'],
      axisLine: axisLine,
      axisLabel: axisLabel
    },
    yAxis: {
      type: 'value',
      name: '万标箱',
      nameTextStyle: { color: muted, fontSize: 11 },
      axisLine: axisLine,
      axisLabel: axisLabel,
      splitLine: splitLine
    },
    series: [
      {
        name: '内贸箱量',
        type: 'bar',
        barWidth: '25%',
        stack: 'total',
        data: [222, 90],
        itemStyle: {
          color: accent,
          borderRadius: [0, 0, 0, 0]
        },
        label: { show: true, position: 'inside', color: '#fff', fontSize: 11, formatter: '{c}万' }
      },
      {
        name: '外贸箱量',
        type: 'bar',
        barWidth: '25%',
        stack: 'total',
        data: [109, 104],
        itemStyle: {
          color: accent3,
          borderRadius: [4, 4, 0, 0]
        },
        label: { show: true, position: 'inside', color: '#fff', fontSize: 11, formatter: '{c}万' }
      },
      {
        name: '总吞吐量',
        type: 'line',
        data: [331, 194],
        itemStyle: { color: positive },
        lineStyle: { width: 2, type: 'dashed' },
        symbol: 'circle',
        symbolSize: 8,
        label: { show: true, position: 'top', color: positive, fontSize: 11, formatter: '{c}万' }
      }
    ]
  });
  window.addEventListener('resize', function() { yangpuSplitChart.resize(); });

  // ===== Chart 6: 海南市场份额（2026年）=====
  var hainanShareChart = echarts.init(document.getElementById('chart-hainan-share'), null, { renderer: 'svg' });
  hainanShareChart.setOption({
    animation: false,
    tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c}%' },
    legend: { show: false },
    series: [{
      type: 'pie',
      radius: ['38%', '65%'],
      center: ['50%', '45%'],
      itemStyle: { borderRadius: 6, borderColor: bg2, borderWidth: 2 },
      label: {
        formatter: '{b}\n{d}%',
        color: ink,
        fontSize: 11
      },
      labelLine: { length: 12, length2: 12 },
      data: [
        { value: 62, name: '泛亚航运', itemStyle: { color: accent } },
        { value: 18, name: '安通控股', itemStyle: { color: accent3 } },
        { value: 5, name: '中谷物流', itemStyle: { color: accent2 } },
        { value: 2, name: '信风海运', itemStyle: { color: '#8e44ad' } },
        { value: 13, name: '其他船公司', itemStyle: { color: muted } }
      ]
    }]
  });
  window.addEventListener('resize', function() { hainanShareChart.resize(); });

})();

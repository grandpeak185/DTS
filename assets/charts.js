(function() {
  'use strict';

  function initChart(domId, option) {
    var dom = document.getElementById(domId);
    if (!dom) return;
    var chart = echarts.init(dom);
    chart.setOption(option);
    window.addEventListener('resize', function() {
      chart.resize();
    });
    return chart;
  }

  // PDCI走势折线图
  initChart('chart-pdci', {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e5e7eb',
      textStyle: { color: '#1f2937', fontSize: 12 }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['5月下旬', '6月中旬', '7月初', '7月中旬', '7月下旬', '8月初'],
      axisLine: { lineStyle: { color: '#9ca3af' } },
      axisLabel: { color: '#6b7280', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      min: 900,
      max: 1050,
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f3f4f6' } },
      axisLabel: { color: '#6b7280', fontSize: 11 }
    },
    series: [{
      name: 'PDCI',
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 8,
      data: [990, 985, 970, 955, 973, 967],
      itemStyle: { color: '#1a56db' },
      lineStyle: { width: 3 },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(26,86,219,0.25)' },
          { offset: 1, color: 'rgba(26,86,219,0.02)' }
        ])
      },
      markPoint: {
        data: [
          { type: 'max', name: '最高', itemStyle: { color: '#dc2626' } },
          { type: 'min', name: '最低', itemStyle: { color: '#059669' } }
        ],
        label: { fontSize: 10 }
      }
    }]
  });

  // 海南内贸市场份额饼图
  initChart('chart-share', {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e5e7eb',
      textStyle: { color: '#1f2937', fontSize: 12 }
    },
    legend: {
      orient: 'horizontal',
      bottom: 0,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: { color: '#4b5563', fontSize: 11 }
    },
    series: [{
      name: '市场份额',
      type: 'pie',
      radius: ['40%', '65%'],
      center: ['50%', '45%'],
      avoidLabelOverlap: true,
      itemStyle: {
        borderRadius: 6,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        formatter: '{b}\n{c}%',
        fontSize: 11,
        color: '#374151'
      },
      labelLine: { show: true, length: 10, length2: 8 },
      data: [
        { value: 56, name: '泛亚航运', itemStyle: { color: '#1a56db' } },
        { value: 22, name: '安通控股', itemStyle: { color: '#db2777' } },
        { value: 12, name: '中谷物流', itemStyle: { color: '#059669' } },
        { value: 3, name: '信风海运', itemStyle: { color: '#d97706' } },
        { value: 7, name: '其他', itemStyle: { color: '#9ca3af' } }
      ]
    }]
  });
})();

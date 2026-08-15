/**
 * 内贸集装箱航运纵横 - 图表配置
 */

// 海南内贸市场份额数据（三步内贸加权法计算结果）
const hainanMarketData = {
  companies: ['泛亚航运', '安通控股', '中谷物流', '信风海运', '其他'],
  shares: [58.69, 20.66, 11.39, 2.85, 7.41],
  colors: ['#1a5276', '#2874a6', '#5499c7', '#85c1e9', '#d4e6f1']
};

// PDCI运价指数走势（近10周）
const pdciTrendData = {
  weeks: ['6/2-6/8', '6/9-6/15', '6/16-6/22', '6/23-6/29', '6/30-7/6', '7/7-7/13', '7/14-7/20', '7/21-7/27', '7/25-7/31', '8/1-8/7'],
  values: [985, 978, 972, 965, 958, 955, 948, 955, 973, 967]
};

// 洋浦港集装箱吞吐量走势（2026年月度）
const yangpuVolumeData = {
  months: ['1月', '2月', '3月', '4月', '5月', '6月'],
  values: [32.9, 28.5, 36.97, 35.2, 33.8, 32.5] // 单位：万标箱，1月封关首月32.9万，Q1合计98.37万
};

// 船公司股价走势（近5日，模拟数据基于搜索结果）
const stockPriceData = {
  days: ['8/11', '8/12', '8/13', '8/14', '8/15'],
  zhonggu: [10.95, 10.88, 10.92, 10.85, 10.48], // 中谷物流
  antong: [3.25, 3.28, 3.35, 3.42, 3.38]        // 安通控股（重组预期推动）
};

// 区域子指数最新数据
const regionalIndexData = {
  regions: ['东北', '华北', '福建', '山东', '华东', '华南'],
  values: [1025, 980, 945, 960, 955, 875],
  changes: [1.2, 0.8, 0.5, -0.9, -1.1, -1.5]
};

/**
 * 渲染海南内贸市场份额饼图
 */
function renderHainanMarketChart() {
  const container = document.getElementById('chart-hainan-market');
  if (!container) return;
  const width = container.clientWidth;
  const height = Math.min(width * 0.6, 320);
  const radius = Math.min(width, height) / 2 - 20;
  const cx = width / 2;
  const cy = height / 2;

  let svg = `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;">`;
  let startAngle = 0;

  hainanMarketData.shares.forEach((share, i) => {
    const angle = (share / 100) * Math.PI * 2;
    const endAngle = startAngle + angle;
    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;

    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    svg += `<path d="${path}" fill="${hainanMarketData.colors[i]}" stroke="#fff" stroke-width="2" />`;

    // 标签
    const labelAngle = startAngle + angle / 2;
    const labelR = radius * 0.65;
    const lx = cx + labelR * Math.cos(labelAngle);
    const ly = cy + labelR * Math.sin(labelAngle);
    svg += `<text x="${lx}" y="${ly}" text-anchor="middle" dominant-baseline="middle" fill="#fff" font-size="12" font-weight="bold">${share}%</text>`;

    startAngle = endAngle;
  });

  // 图例
  const legendX = width > 400 ? width - 100 : 10;
  const legendY = width > 400 ? 20 : height - 80;
  hainanMarketData.companies.forEach((name, i) => {
    const ly = legendY + i * 22;
    svg += `<rect x="${legendX}" y="${ly}" width="12" height="12" fill="${hainanMarketData.colors[i]}" rx="2"/>`;
    svg += `<text x="${legendX + 18}" y="${ly + 10}" font-size="11" fill="#333">${name}</text>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

/**
 * 渲染PDCI运价指数走势图
 */
function renderPDCITrendChart() {
  const container = document.getElementById('chart-pdci-trend');
  if (!container) return;
  const width = container.clientWidth;
  const height = Math.min(width * 0.5, 280);
  const padding = { top: 20, right: 30, bottom: 40, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const minVal = Math.min(...pdciTrendData.values) - 20;
  const maxVal = Math.max(...pdciTrendData.values) + 20;

  let svg = `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;">`;

  // 网格线
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    const val = Math.round(maxVal - (maxVal - minVal) / 4 * i);
    svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e0e0e0" stroke-width="1"/>`;
    svg += `<text x="${padding.left - 8}" y="${y + 4}" text-anchor="end" font-size="10" fill="#888">${val}</text>`;
  }

  // 折线
  let pathD = '';
  pdciTrendData.values.forEach((val, i) => {
    const x = padding.left + (chartW / (pdciTrendData.values.length - 1)) * i;
    const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    pathD += (i === 0 ? 'M' : 'L') + ` ${x} ${y}`;
  });
  svg += `<path d="${pathD}" fill="none" stroke="#1a5276" stroke-width="2.5" stroke-linejoin="round"/>`;

  // 数据点和数值
  pdciTrendData.values.forEach((val, i) => {
    const x = padding.left + (chartW / (pdciTrendData.values.length - 1)) * i;
    const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    svg += `<circle cx="${x}" cy="${y}" r="4" fill="#1a5276" stroke="#fff" stroke-width="2"/>`;
    if (i === pdciTrendData.values.length - 1) {
      svg += `<text x="${x}" y="${y - 10}" text-anchor="middle" font-size="11" fill="#1a5276" font-weight="bold">${val}</text>`;
    }
  });

  // X轴标签
  pdciTrendData.weeks.forEach((week, i) => {
    const x = padding.left + (chartW / (pdciTrendData.weeks.length - 1)) * i;
    svg += `<text x="${x}" y="${height - 15}" text-anchor="middle" font-size="9" fill="#666">${week}</text>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

/**
 * 渲染洋浦港吞吐量柱状图
 */
function renderYangpuVolumeChart() {
  const container = document.getElementById('chart-yangpu-volume');
  if (!container) return;
  const width = container.clientWidth;
  const height = Math.min(width * 0.5, 260);
  const padding = { top: 20, right: 20, bottom: 35, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const barW = chartW / yangpuVolumeData.months.length * 0.6;

  const maxVal = Math.max(...yangpuVolumeData.values) * 1.2;

  let svg = `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;">`;

  // 网格线
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    const val = Math.round(maxVal - (maxVal / 4) * i);
    svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e0e0e0" stroke-width="1"/>`;
    svg += `<text x="${padding.left - 8}" y="${y + 4}" text-anchor="end" font-size="10" fill="#888">${val}</text>`;
  }

  // 柱状
  yangpuVolumeData.values.forEach((val, i) => {
    const x = padding.left + (chartW / yangpuVolumeData.months.length) * i + (chartW / yangpuVolumeData.months.length - barW) / 2;
    const barH = (val / maxVal) * chartH;
    const y = padding.top + chartH - barH;
    svg += `<rect x="${x}" y="${y}" width="${barW}" height="${barH}" fill="#2874a6" rx="3"/>`;
    svg += `<text x="${x + barW / 2}" y="${y - 5}" text-anchor="middle" font-size="10" fill="#333">${val}</text>`;
  });

  // X轴标签
  yangpuVolumeData.months.forEach((month, i) => {
    const x = padding.left + (chartW / yangpuVolumeData.months.length) * i + (chartW / yangpuVolumeData.months.length) / 2;
    svg += `<text x="${x}" y="${height - 10}" text-anchor="middle" font-size="11" fill="#666">${month}</text>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

/**
 * 渲染区域子指数横向条形图
 */
function renderRegionalIndexChart() {
  const container = document.getElementById('chart-regional-index');
  if (!container) return;
  const width = container.clientWidth;
  const height = 220;
  const padding = { top: 10, right: 60, bottom: 10, left: 50 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const barH = chartH / regionalIndexData.regions.length * 0.7;
  const gap = chartH / regionalIndexData.regions.length * 0.3;

  const maxVal = 1200;

  let svg = `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;">`;

  regionalIndexData.regions.forEach((region, i) => {
    const y = padding.top + (barH + gap) * i;
    const bw = (regionalIndexData.values[i] / maxVal) * chartW;
    const color = regionalIndexData.changes[i] >= 0 ? '#27ae60' : '#e74c3c';

    svg += `<text x="${padding.left - 8}" y="${y + barH / 2 + 4}" text-anchor="end" font-size="11" fill="#333">${region}</text>`;
    svg += `<rect x="${padding.left}" y="${y}" width="${bw}" height="${barH}" fill="${color}" rx="3" opacity="0.85"/>`;
    svg += `<text x="${padding.left + bw + 5}" y="${y + barH / 2 + 4}" font-size="10" fill="#333">${regionalIndexData.values[i]} (${regionalIndexData.changes[i] > 0 ? '+' : ''}${regionalIndexData.changes[i]}%)</text>`;
  });

  svg += '</svg>';
  container.innerHTML = svg;
}

/**
 * 渲染船公司股价走势对比图
 */
function renderStockPriceChart() {
  const container = document.getElementById('chart-stock-price');
  if (!container) return;
  const width = container.clientWidth;
  const height = Math.min(width * 0.5, 260);
  const padding = { top: 20, right: 80, bottom: 35, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const allVals = [...stockPriceData.zhonggu, ...stockPriceData.antong];
  const minVal = Math.min(...allVals) * 0.95;
  const maxVal = Math.max(...allVals) * 1.05;

  let svg = `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:auto;">`;

  // 网格线
  for (let i = 0; i <= 4; i++) {
    const y = padding.top + (chartH / 4) * i;
    const val = (maxVal - (maxVal - minVal) / 4 * i).toFixed(2);
    svg += `<line x1="${padding.left}" y1="${y}" x2="${width - padding.right}" y2="${y}" stroke="#e0e0e0" stroke-width="1"/>`;
    svg += `<text x="${padding.left - 8}" y="${y + 4}" text-anchor="end" font-size="10" fill="#888">${val}</text>`;
  }

  // 中谷物流折线
  let pathD1 = '';
  stockPriceData.zhonggu.forEach((val, i) => {
    const x = padding.left + (chartW / (stockPriceData.days.length - 1)) * i;
    const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    pathD1 += (i === 0 ? 'M' : 'L') + ` ${x} ${y}`;
  });
  svg += `<path d="${pathD1}" fill="none" stroke="#1a5276" stroke-width="2.5"/>`;

  // 安通控股折线
  let pathD2 = '';
  stockPriceData.antong.forEach((val, i) => {
    const x = padding.left + (chartW / (stockPriceData.days.length - 1)) * i;
    const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    pathD2 += (i === 0 ? 'M' : 'L') + ` ${x} ${y}`;
  });
  svg += `<path d="${pathD2}" fill="none" stroke="#e67e22" stroke-width="2.5" stroke-dasharray="5,3"/>`;

  // 数据点
  stockPriceData.zhonggu.forEach((val, i) => {
    const x = padding.left + (chartW / (stockPriceData.days.length - 1)) * i;
    const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    svg += `<circle cx="${x}" cy="${y}" r="3.5" fill="#1a5276" stroke="#fff" stroke-width="1.5"/>`;
  });
  stockPriceData.antong.forEach((val, i) => {
    const x = padding.left + (chartW / (stockPriceData.days.length - 1)) * i;
    const y = padding.top + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
    svg += `<circle cx="${x}" cy="${y}" r="3.5" fill="#e67e22" stroke="#fff" stroke-width="1.5"/>`;
  });

  // X轴标签
  stockPriceData.days.forEach((day, i) => {
    const x = padding.left + (chartW / (stockPriceData.days.length - 1)) * i;
    svg += `<text x="${x}" y="${height - 12}" text-anchor="middle" font-size="10" fill="#666">${day}</text>`;
  });

  // 图例
  const lx = width - 75;
  svg += `<line x1="${lx}" y1="18" x2="${lx + 20}" y2="18" stroke="#1a5276" stroke-width="2.5"/>`;
  svg += `<text x="${lx + 25}" y="22" font-size="10" fill="#333">中谷物流</text>`;
  svg += `<line x1="${lx}" y1="35" x2="${lx + 20}" y2="35" stroke="#e67e22" stroke-width="2.5" stroke-dasharray="5,3"/>`;
  svg += `<text x="${lx + 25}" y="39" font-size="10" fill="#333">安通控股</text>`;

  svg += '</svg>';
  container.innerHTML = svg;
}

// 页面加载完成后渲染所有图表
document.addEventListener('DOMContentLoaded', function() {
  renderHainanMarketChart();
  renderPDCITrendChart();
  renderYangpuVolumeChart();
  renderRegionalIndexChart();
  renderStockPriceChart();
});

// 窗口大小改变时重绘图表
window.addEventListener('resize', function() {
  renderHainanMarketChart();
  renderPDCITrendChart();
  renderYangpuVolumeChart();
  renderRegionalIndexChart();
  renderStockPriceChart();
});

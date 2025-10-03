export function formatNumber(num) {
    if (num >= 1e9) {
      // Billion
      return (num / 1e9)?.toFixed(1)?.replace(/\.0$/, '') + 'B';
    }
    if (num >= 1e6) {
      // Million
      return (num / 1e6)?.toFixed(1)?.replace(/\.0$/, '') + 'M';
    }
    if (num >= 1e3) {
      // Thousand
      return (num / 1e3)?.toFixed(1)?.replace(/\.0$/, '') + 'K';
    }
    return num?.toString();
  }
  
// DateUtils implementation (this would typically be in src/utils/DateUtils.js)
const DateUtils = {
  formatDate: (date, format = 'MM/DD/YYYY') => {
    if (!date) return '';
    
    const d = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(d.getTime())) return '';
    
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const year = d.getFullYear();
    
    let result = format;
    result = result.replace('DD', day);
    result = result.replace('MM', month);
    result = result.replace('YYYY', year);
    
    return result;
  },
  
  timeAgo: (date) => {
    if (!date) return '';
    
    const d = typeof date === 'string' ? new Date(date) : date;
    
    if (isNaN(d.getTime())) return '';
    
    const now = new Date();
    const seconds = Math.floor((now - d) / 1000);
    
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      return interval === 1 ? '1 year ago' : `${interval} years ago`;
    }
    
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return interval === 1 ? '1 month ago' : `${interval} months ago`;
    }
    
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return interval === 1 ? '1 day ago' : `${interval} days ago`;
    }
    
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return interval === 1 ? '1 hour ago' : `${interval} hours ago`;
    }
    
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return interval === 1 ? '1 minute ago' : `${interval} minutes ago`;
    }
    
    return seconds < 10 ? 'just now' : `${seconds} seconds ago`;
  },
  
  isSameDay: (date1, date2) => {
    if (!date1 || !date2) return false;
    
    const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
    const d2 = typeof date2 === 'string' ? new Date(date2) : date2;
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return false;
    
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }
};

describe('DateUtils', () => {
  describe('formatDate', () => {
    it('formats date correctly with default format', () => {
      const date = new Date(2023, 0, 15); // January 15, 2023
      expect(DateUtils.formatDate(date)).toBe('01/15/2023');
    });

    it('formats date correctly with custom format', () => {
      const date = new Date(2023, 0, 15); // January 15, 2023
      expect(DateUtils.formatDate(date, 'DD-MM-YYYY')).toBe('15-01-2023');
    });

    it('handles string dates', () => {
      expect(DateUtils.formatDate('2023-01-15')).toBe('01/15/2023');
    });

    it('returns empty string for null or undefined date', () => {
      expect(DateUtils.formatDate(null)).toBe('');
      expect(DateUtils.formatDate(undefined)).toBe('');
    });

    it('returns empty string for invalid date', () => {
      expect(DateUtils.formatDate('not-a-date')).toBe('');
    });
  });

  describe('timeAgo', () => {
    it('returns "just now" for very recent dates', () => {
      const now = new Date();
      expect(DateUtils.timeAgo(now)).toBe('just now');
    });

    it('returns correct time for seconds ago', () => {
      const date = new Date(Date.now() - 30 * 1000); // 30 seconds ago
      expect(DateUtils.timeAgo(date)).toBe('30 seconds ago');
    });

    it('returns correct time for minutes ago', () => {
      const date = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago
      expect(DateUtils.timeAgo(date)).toBe('5 minutes ago');
    });

    it('handles singular forms correctly', () => {
      const oneMinuteAgo = new Date(Date.now() - 60 * 1000);
      expect(DateUtils.timeAgo(oneMinuteAgo)).toBe('1 minute ago');
      
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      expect(DateUtils.timeAgo(oneHourAgo)).toBe('1 hour ago');
      
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(DateUtils.timeAgo(oneDayAgo)).toBe('1 day ago');
    });

    it('returns empty string for null or undefined date', () => {
      expect(DateUtils.timeAgo(null)).toBe('');
      expect(DateUtils.timeAgo(undefined)).toBe('');
    });

    it('returns empty string for invalid date', () => {
      expect(DateUtils.timeAgo('not-a-date')).toBe('');
    });
  });

  describe('isSameDay', () => {
    it('returns true for same day', () => {
      const date1 = new Date(2023, 0, 15, 10, 30); // January 15, 2023, 10:30
      const date2 = new Date(2023, 0, 15, 15, 45); // January 15, 2023, 15:45
      expect(DateUtils.isSameDay(date1, date2)).toBe(true);
    });

    it('returns false for different days', () => {
      const date1 = new Date(2023, 0, 15); // January 15, 2023
      const date2 = new Date(2023, 0, 16); // January 16, 2023
      expect(DateUtils.isSameDay(date1, date2)).toBe(false);
    });

    it('handles string dates', () => {
      expect(DateUtils.isSameDay('2023-01-15T10:30:00', '2023-01-15T15:45:00')).toBe(true);
      expect(DateUtils.isSameDay('2023-01-15', '2023-01-16')).toBe(false);
    });

    it('returns false for null or undefined dates', () => {
      expect(DateUtils.isSameDay(null, new Date())).toBe(false);
      expect(DateUtils.isSameDay(new Date(), undefined)).toBe(false);
      expect(DateUtils.isSameDay(null, null)).toBe(false);
    });

    it('returns false for invalid dates', () => {
      expect(DateUtils.isSameDay('not-a-date', new Date())).toBe(false);
    });
  });
});



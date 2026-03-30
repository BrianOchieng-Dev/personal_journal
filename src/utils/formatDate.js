import { format, formatDistanceToNow, isDate } from 'date-fns';

/**
 * Converts a Firestore timestamp or regular date to a JS Date object safely.
 */
export const toJSDate = (date) => {
  if (!date) return null;
  if (isDate(date)) return date;
  if (typeof date.toDate === 'function') return date.toDate();
  return new Date(date);
};

/**
 * Formats a date for the Dashboard cards (e.g., "Mar 30, 2026")
 */
export const formatDashboardDate = (date) => {
  const d = toJSDate(date);
  if (!d) return 'Recently';
  return format(d, 'MMM d, yyyy');
};

/**
 * Formats a date for the Timeline list (e.g., "Mon, 30 Mar")
 */
export const formatTimelineDate = (date) => {
  const d = toJSDate(date);
  if (!d) return 'Recently';
  return format(d, 'EEE, d MMM');
};

/**
 * Formats a date header string (e.g., "March 2026")
 */
export const formatMonthYear = (date) => {
  const d = toJSDate(date);
  if (!d) return 'Recent';
  return format(d, 'MMMM yyyy');
};

/**
 * Formats a date for the Editor header (e.g., "March 30, 2026")
 */
export const formatEditorDate = (date) => {
  const d = toJSDate(date);
  if (!d) return format(new Date(), 'MMMM d, yyyy');
  return format(d, 'MMMM d, yyyy');
};

/**
 * Formats a timestamp into a relative "last saved" string.
 */
export const formatLastSaved = (date) => {
  const d = toJSDate(date);
  if (!d) return 'Just now';
  
  // If saved within the last minute
  const now = new Date();
  if (now - d < 60000) return 'Just now';
  
  return formatDistanceToNow(d, { addSuffix: true });
};

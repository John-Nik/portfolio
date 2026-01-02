/**
 * Freeze time is defined as the time between pressing the "start game" button, and the game board becoming interactive
 */
export const FREEZE_TIME = 2000; // In milliseconds

/**
 * Delay in milliseconds to wait after the player loses before running post-loss cleanup and 
 * UI transitions (hiding/resetting bomb count, stopping autoplay, restoring UI state, etc.)
 */
export const POST_LOSE_CLEANUP_DELAY = 5000;

/**
 * Delay in milliseconds to wait after the player wins before running post-loss cleanup and 
 * UI transitions (hiding/resetting bomb count, stopping autoplay, restoring UI state, etc.)
 */
export const POST_WIN_CLEANUP_DELAY = 30000; // In milliseconds
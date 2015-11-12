const DEFAULT_TIMEOUT = 1000;
const DEFAULT_INTERVAL = 50;

// Waits for a specific count of a DOM query selector
export function waitsFor(selector, count, opt, cb) {
  let intervalCount = 0;

  if (typeof opt === 'function') {
    cb = opt;
    opt = {};
  }

  if (!opt.timeout) {
    opt.timeout = DEFAULT_TIMEOUT;
  }

  if (!opt.interval) {
    opt.interval = DEFAULT_INTERVAL;
  }

  const maxInterval = opt.timeout / opt.interval;

  let interval = setInterval(() => {
    const el = $(selector);

    if (el.length === count) {
      clearInterval(interval);
      cb(el);
    } else if (++intervalCount >= maxInterval) {
      clearInterval(interval);
      fail('The DOM query selector "' + selector + '" should have ' + count + ' element' + (count > 1 ? 's' : ''));
    }
  }, opt.interval);

  return interval;
}

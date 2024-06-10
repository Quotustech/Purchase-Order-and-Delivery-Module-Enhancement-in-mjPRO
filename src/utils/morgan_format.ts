import morgan from 'morgan';

// Define colorful custom Morgan tokens
morgan.token('method', (req, res) => `\x1b[34m${req.method}\x1b[0m` || ''); // Blue
morgan.token('url', (req, res) => `\x1b[32m${req.url}\x1b[0m` || ''); // Green
morgan.token('status', (req, res) => {
  const status = res.statusCode;
  if (status >= 500) {
    return `\x1b[31m${status}\x1b[0m`; // Red
  } else if (status >= 400) {
    return `\x1b[33m${status}\x1b[0m`; // Yellow
  } else if (status >= 300) {
    return `\x1b[36m${status}\x1b[0m`; // Cyan
  } else {
    return `\x1b[32m${status}\x1b[0m`; // Green
  }
});
morgan.token('response-time', (req, res) => `\x1b[35m${res.getHeader('X-Response-Time')} ms\x1b[0m` || ''); // Magenta
morgan.token('date', () => `\x1b[90m${new Date().toISOString()}\x1b[0m` || ''); // Gray

// Define the format string using the custom tokens
const format = ':method :url :status :res[content-length] - :response-time :date';

// Create the custom Morgan middleware
const customMorgan = morgan(format);

// Export the custom Morgan middleware
export default customMorgan;

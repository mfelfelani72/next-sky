/*
 * @Author: Mohammad mfelfelani72@gmail.com
 * @Date: 2026-02-22 07:49:10
 * @LastEditors: Mohammad mfelfelani72@gmail.com
 * @LastEditTime: 2026-02-22 07:52:14
 * @FilePath: /next-sky-dev/scripts/run-dev.js
 * @Description: 
 * 
 */

const { execSync } = require('child_process');
const os = require('os');

const isWindows = os.platform() === 'win32';

console.log(`Detected OS: ${isWindows ? 'Windows' : 'Linux/Mac'}`);

try {
  if (isWindows) {
    // Windows command - with cross-env
    console.log('Running Windows command...');
    execSync('cross-env NEXT_PUBLIC_BASE_PORT=:3333 next dev --turbopack -p 3333', { 
      stdio: 'inherit',
      shell: true 
    });
  } else {
    // Linux/Mac command - without cross-env
    console.log('Running Linux/Mac command...');
    execSync('NEXT_PUBLIC_BASE_PORT=:3000 next dev --turbopack -p 3000', { 
      stdio: 'inherit',
      shell: true 
    });
  }
} catch (error) {
  console.error('Error running dev command:', error.message);
  process.exit(1);
}
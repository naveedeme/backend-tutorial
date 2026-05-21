// ─── Initial Virtual Filesystem ──────────────────────────────────────────────
export const INITIAL_FS = {
  '/': { type: 'dir', children: ['home', 'etc', 'usr'] },
  '/home': { type: 'dir', children: ['user'] },
  '/home/user': { type: 'dir', children: ['projects', '.npmrc'] },
  '/home/user/projects': { type: 'dir', children: [] },
  '/home/user/.npmrc': { type: 'file', content: 'registry=https://registry.npmjs.org/' },
  '/etc': { type: 'dir', children: ['hosts'] },
  '/etc/hosts': { type: 'file', content: '127.0.0.1 localhost\n::1 localhost' },
  '/usr': { type: 'dir', children: ['local'] },
  '/usr/local': { type: 'dir', children: ['bin'] },
  '/usr/local/bin': { type: 'dir', children: [] }
};

export const INITIAL_CWD = '/home/user/projects';

// ─── npm Package Database ─────────────────────────────────────────────────────
const NPM_PACKAGES = {
  express: { version: '4.19.2', deps: ['accepts', 'array-flatten', 'body-parser', 'content-disposition', 'cookie', 'debug', 'depd', 'encodeurl', 'escape-html', 'etag', 'finalhandler', 'fresh', 'http-errors', 'merge-descriptors', 'methods', 'on-finished', 'parseurl', 'path-to-regexp', 'proxy-addr', 'qs', 'range-parser', 'safe-buffer', 'send', 'serve-static', 'setprototypeof', 'statuses', 'type-is', 'utils-merge', 'vary'], size: '207kB' },
  mongoose: { version: '8.3.4', deps: ['bson', 'kareem', 'mongodb', 'mpath', 'mquery', 'ms', 'sift'], size: '1.2MB' },
  dotenv: { version: '16.4.5', deps: [], size: '90kB' },
  cors: { version: '2.8.5', deps: ['object-assign', 'vary'], size: '42kB' },
  'body-parser': { version: '1.20.2', deps: ['bytes', 'content-type', 'debug', 'depd', 'destroy', 'http-errors', 'iconv-lite', 'on-finished', 'qs', 'raw-body', 'type-is', 'unpipe'], size: '118kB' },
  jsonwebtoken: { version: '9.0.2', deps: ['jws', 'lodash.includes', 'lodash.isboolean', 'lodash.isinteger', 'lodash.isnumber', 'lodash.isplainobject', 'lodash.isstring', 'lodash.once', 'ms', 'semver'], size: '164kB' },
  bcryptjs: { version: '2.4.3', deps: [], size: '72kB' },
  prisma: { version: '5.14.0', deps: ['@prisma/engines', '@prisma/get-platform'], size: '8.4MB' },
  '@prisma/client': { version: '5.14.0', deps: ['@prisma/engines-version'], size: '1.1MB' },
  nodemon: { version: '3.1.3', deps: ['chokidar', 'debug', 'ignore-by-default', 'minimatch', 'pstree.remy', 'semver', 'simple-update-notifier', 'supports-color', 'touch', 'undefsafe'], size: '320kB' },
  pg: { version: '8.12.0', deps: ['pg-connection-string', 'pg-pool', 'pg-protocol', 'pg-types', 'pgpass'], size: '468kB' },
  'pg-hstore': { version: '2.3.4', deps: ['underscore'], size: '28kB' },
  sequelize: { version: '6.37.3', deps: ['@types/debug', '@types/validator', 'dottie', 'inflection', 'lodash', 'moment', 'moment-timezone', 'retry-as-promised', 'semver', 'sequelize-pool', 'toposort', 'validator', 'wkx'], size: '2.8MB' },
  'socket.io': { version: '4.7.5', deps: ['accepts', 'base64id', 'cors', 'debug', 'engine.io', 'socket.io-adapter', 'socket.io-parser'], size: '890kB' },
  axios: { version: '1.7.2', deps: ['follow-redirects', 'form-data', 'proxy-from-env'], size: '165kB' },
  multer: { version: '1.4.5', deps: ['append-field', 'busboy', 'concat-stream', 'mkdirp', 'object-assign', 'on-finished', 'type-is', 'xtend'], size: '124kB' },
  joi: { version: '17.13.1', deps: ['@hapi/hoek', '@hapi/topo', '@sideway/address', '@sideway/formula', '@sideway/pinpoint'], size: '250kB' },
  winston: { version: '3.13.0', deps: ['@colors/colors', '@dabh/diagnostics', 'async', 'is-stream', 'logform', 'one-time', 'readable-stream', 'safe-stable-stringify', 'stack-trace', 'triple-beam'], size: '340kB' },
  redis: { version: '4.6.14', deps: ['@redis/bloom', '@redis/client', '@redis/graph', '@redis/json', '@redis/search', '@redis/time-series'], size: '1.4MB' },
  'next': { version: '14.2.4', deps: [], size: '22MB' },
  react: { version: '18.3.1', deps: ['loose-envify'], size: '340kB' },
  'react-dom': { version: '18.3.1', deps: ['loose-envify', 'scheduler'], size: '1.1MB' },
  typescript: { version: '5.4.5', deps: [], size: '19MB' },
  'ts-node': { version: '10.9.2', deps: ['@cspotcode/source-map-support', '@tsconfig/node10', '@tsconfig/node12', '@tsconfig/node14', '@tsconfig/node16', '@types/node', 'acorn', 'acorn-walk', 'arg', 'create-require', 'diff', 'make-error', 'v8-compile-cache-lib', 'yn'], size: '2.1MB' },
  'express-validator': { version: '7.1.0', deps: ['lodash', 'validator'], size: '185kB' },
  helmet: { version: '7.1.0', deps: [], size: '88kB' },
  'morgan': { version: '1.10.0', deps: ['basic-auth', 'debug', 'depd', 'on-finished', 'on-headers'], size: '58kB' },
  'compression': { version: '1.7.4', deps: ['accepts', 'bytes', 'compressible', 'debug', 'on-headers', 'safe-buffer', 'vary'], size: '68kB' },
  'express-rate-limit': { version: '7.3.1', deps: [], size: '82kB' },
  'passport': { version: '0.7.0', deps: ['passport-strategy', 'pause', 'utils-merge'], size: '118kB' },
  'passport-local': { version: '1.0.0', deps: ['passport-strategy'], size: '24kB' },
  'passport-jwt': { version: '4.0.1', deps: ['jsonwebtoken', 'passport-strategy'], size: '44kB' }
};

// ─── Simulated DB State ───────────────────────────────────────────────────────
export const INITIAL_DB_STATE = {
  psql: {
    connected: false,
    currentDb: null,
    databases: ['postgres', 'template0', 'template1'],
    tables: {}
  },
  mongo: {
    connected: false,
    currentDb: 'test',
    databases: ['admin', 'config', 'local', 'test'],
    collections: { test: [] }
  }
};

// ─── Command Handlers ─────────────────────────────────────────────────────────
export function handleCommand(raw, state) {
  const trimmed = raw.trim();
  if (!trimmed) return { output: [], newState: state };

  const [cmd, ...args] = trimmed.split(/\s+/);
  const cmdLower = cmd.toLowerCase();

  // Mode-specific handling
  if (state.mode === 'node') return handleNodeREPL(trimmed, state);
  if (state.mode === 'psql') return handlePSQL(trimmed, state);
  if (state.mode === 'mongo') return handleMongo(trimmed, state);

  // Bash mode
  switch (cmdLower) {
    case 'help': return cmdHelp(state);
    case 'clear': return { output: [{ type: 'clear' }], newState: state };
    case 'pwd': return { output: [{ type: 'out', text: state.cwd }], newState: state };
    case 'ls': return cmdLs(args, state);
    case 'cd': return cmdCd(args, state);
    case 'mkdir': return cmdMkdir(args, state);
    case 'touch': return cmdTouch(args, state);
    case 'cat': return cmdCat(args, state);
    case 'echo': return { output: [{ type: 'out', text: args.join(' ').replace(/^["']|["']$/g, '') }], newState: state };
    case 'rm': return cmdRm(args, state);
    case 'mv': return cmdMv(args, state);
    case 'cp': return cmdCp(args, state);
    case 'node': return cmdNode(args, state);
    case 'npm': return cmdNpm(args, state);
    case 'npx': return cmdNpx(args, state);
    case 'git': return cmdGit(args, state);
    case 'psql': return cmdPsql(args, state);
    case 'mongo':
    case 'mongosh': return cmdMongo(args, state);
    case 'which': return { output: [{ type: 'out', text: `/usr/local/bin/${args[0] || 'node'}` }], newState: state };
    case 'whoami': return { output: [{ type: 'out', text: 'user' }], newState: state };
    case 'date': return { output: [{ type: 'out', text: new Date().toString() }], newState: state };
    case 'env': return cmdEnv(state);
    case 'export': return cmdExport(args, state);
    case 'history': return cmdHistory(state);
    case 'exit': return { output: [{ type: 'warn', text: 'Use the shell controls to close the terminal.' }], newState: state };
    case 'curl': return cmdCurl(args, state);
    case 'ping': return cmdPing(args, state);
    case 'man': return cmdMan(args, state);
    default:
      return {
        output: [{ type: 'error', text: `bash: ${cmd}: command not found\nType 'help' to see available commands.` }],
        newState: state
      };
  }
}

// ─── Resolve Path ─────────────────────────────────────────────────────────────
function resolvePath(path, cwd) {
  if (path === '~') return '/home/user';
  if (path.startsWith('~/')) return '/home/user' + path.slice(1);
  if (path.startsWith('/')) return normalizePath(path);
  return normalizePath(cwd + '/' + path);
}

function normalizePath(path) {
  const parts = path.split('/').filter(Boolean);
  const result = [];
  for (const p of parts) {
    if (p === '..') result.pop();
    else if (p !== '.') result.push(p);
  }
  return '/' + result.join('/');
}

// ─── ls ───────────────────────────────────────────────────────────────────────
function cmdLs(args, state) {
  const { fs, cwd } = state;
  const showHidden = args.includes('-la') || args.includes('-a') || args.includes('-al');
  const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
  const pathArg = args.find(a => !a.startsWith('-')) || cwd;
  const target = resolvePath(pathArg, cwd);

  if (!fs[target]) return { output: [{ type: 'error', text: `ls: ${pathArg}: No such file or directory` }], newState: state };
  if (fs[target].type === 'file') return { output: [{ type: 'out', text: target.split('/').pop() }], newState: state };

  const children = fs[target].children || [];
  const toShow = showHidden
    ? ['.', '..', ...children]
    : children.filter(c => !c.startsWith('.'));

  if (longFormat) {
    const now = new Date();
    const date = `${now.toLocaleString('default', { month: 'short' })} ${now.getDate()}`;
    const lines = toShow.map(name => {
      const fullPath = target === '/' ? `/${name}` : `${target}/${name}`;
      const node = fs[fullPath] || (name === '.' ? fs[target] : null);
      const isDir = node?.type === 'dir' || name === '.' || name === '..';
      const perm = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
      const color = isDir ? 'dir' : 'file';
      return `${perm}  1 user user  4096 ${date} <span class="ls-${color}">${name}</span>`;
    });
    return { output: [{ type: 'html', text: `total ${toShow.length * 8}\n${lines.join('\n')}` }], newState: state };
  }

  const colored = toShow.map(name => {
    const fullPath = target === '/' ? `/${name}` : `${target}/${name}`;
    const node = fs[fullPath];
    const isDir = node?.type === 'dir';
    return `<span class="ls-${isDir ? 'dir' : 'file'}">${name}</span>`;
  });

  return { output: [{ type: 'html', text: colored.join('  ') }], newState: state };
}

// ─── cd ───────────────────────────────────────────────────────────────────────
function cmdCd(args, state) {
  const { fs, cwd } = state;
  const target = args[0] || '/home/user';
  const resolved = resolvePath(target, cwd);

  if (!fs[resolved]) return { output: [{ type: 'error', text: `cd: ${target}: No such file or directory` }], newState: state };
  if (fs[resolved].type !== 'dir') return { output: [{ type: 'error', text: `cd: ${target}: Not a directory` }], newState: state };

  return { output: [], newState: { ...state, cwd: resolved } };
}

// ─── mkdir ────────────────────────────────────────────────────────────────────
function cmdMkdir(args, state) {
  if (!args.length) return { output: [{ type: 'error', text: 'mkdir: missing operand' }], newState: state };
  const newFs = { ...state.fs };
  const out = [];

  for (const arg of args.filter(a => !a.startsWith('-'))) {
    const resolved = resolvePath(arg, state.cwd);
    const parent = resolved.split('/').slice(0, -1).join('/') || '/';
    if (!newFs[parent]) { out.push({ type: 'error', text: `mkdir: ${arg}: No such file or directory` }); continue; }
    if (newFs[resolved]) { out.push({ type: 'error', text: `mkdir: ${arg}: File exists` }); continue; }
    newFs[resolved] = { type: 'dir', children: [] };
    const parentNode = newFs[parent];
    const dirName = resolved.split('/').pop();
    newFs[parent] = { ...parentNode, children: [...(parentNode.children || []), dirName] };
  }

  return { output: out, newState: { ...state, fs: newFs } };
}

// ─── touch ────────────────────────────────────────────────────────────────────
function cmdTouch(args, state) {
  if (!args.length) return { output: [{ type: 'error', text: 'touch: missing file operand' }], newState: state };
  const newFs = { ...state.fs };

  for (const arg of args) {
    const resolved = resolvePath(arg, state.cwd);
    const parent = resolved.split('/').slice(0, -1).join('/') || '/';
    if (!newFs[parent]) continue;
    if (!newFs[resolved]) {
      newFs[resolved] = { type: 'file', content: '' };
      const fileName = resolved.split('/').pop();
      newFs[parent] = { ...newFs[parent], children: [...(newFs[parent].children || []), fileName] };
    }
  }

  return { output: [], newState: { ...state, fs: newFs } };
}

// ─── cat ─────────────────────────────────────────────────────────────────────
function cmdCat(args, state) {
  if (!args.length) return { output: [{ type: 'error', text: 'cat: missing file operand' }], newState: state };
  const out = [];

  for (const arg of args.filter(a => !a.startsWith('-'))) {
    const resolved = resolvePath(arg, state.cwd);
    const node = state.fs[resolved];
    if (!node) { out.push({ type: 'error', text: `cat: ${arg}: No such file or directory` }); continue; }
    if (node.type === 'dir') { out.push({ type: 'error', text: `cat: ${arg}: Is a directory` }); continue; }
    out.push({ type: 'out', text: node.content || '(empty file)' });
  }

  return { output: out, newState: state };
}

// ─── rm ───────────────────────────────────────────────────────────────────────
function cmdRm(args, state) {
  const recursive = args.includes('-r') || args.includes('-rf') || args.includes('-f');
  const files = args.filter(a => !a.startsWith('-'));
  if (!files.length) return { output: [{ type: 'error', text: 'rm: missing operand' }], newState: state };

  const newFs = { ...state.fs };
  const out = [];

  for (const arg of files) {
    const resolved = resolvePath(arg, state.cwd);
    if (!newFs[resolved]) { out.push({ type: 'error', text: `rm: ${arg}: No such file or directory` }); continue; }
    if (newFs[resolved].type === 'dir' && !recursive) {
      out.push({ type: 'error', text: `rm: ${arg}: is a directory (use -r to remove)` }); continue;
    }
    const parent = resolved.split('/').slice(0, -1).join('/') || '/';
    const name = resolved.split('/').pop();
    if (newFs[parent]) {
      newFs[parent] = { ...newFs[parent], children: newFs[parent].children.filter(c => c !== name) };
    }
    delete newFs[resolved];
  }

  return { output: out, newState: { ...state, fs: newFs } };
}

// ─── mv / cp ─────────────────────────────────────────────────────────────────
function cmdMv(args, state) {
  if (args.length < 2) return { output: [{ type: 'error', text: 'mv: missing destination' }], newState: state };
  const [src, dest] = args;
  const srcPath = resolvePath(src, state.cwd);
  const destPath = resolvePath(dest, state.cwd);
  const newFs = { ...state.fs };

  if (!newFs[srcPath]) return { output: [{ type: 'error', text: `mv: ${src}: No such file or directory` }], newState: state };

  newFs[destPath] = newFs[srcPath];
  delete newFs[srcPath];

  const srcParent = srcPath.split('/').slice(0, -1).join('/') || '/';
  const srcName = srcPath.split('/').pop();
  const destParent = destPath.split('/').slice(0, -1).join('/') || '/';
  const destName = destPath.split('/').pop();

  if (newFs[srcParent]) newFs[srcParent] = { ...newFs[srcParent], children: newFs[srcParent].children.filter(c => c !== srcName) };
  if (newFs[destParent]) newFs[destParent] = { ...newFs[destParent], children: [...(newFs[destParent].children || []), destName] };

  return { output: [], newState: { ...state, fs: newFs } };
}

function cmdCp(args, state) {
  if (args.length < 2) return { output: [{ type: 'error', text: 'cp: missing destination' }], newState: state };
  const [src, dest] = args;
  const srcPath = resolvePath(src, state.cwd);
  const destPath = resolvePath(dest, state.cwd);
  const newFs = { ...state.fs };

  if (!newFs[srcPath]) return { output: [{ type: 'error', text: `cp: ${src}: No such file or directory` }], newState: state };
  newFs[destPath] = { ...newFs[srcPath] };

  const destParent = destPath.split('/').slice(0, -1).join('/') || '/';
  const destName = destPath.split('/').pop();
  if (newFs[destParent]) newFs[destParent] = { ...newFs[destParent], children: [...(newFs[destParent].children || []), destName] };

  return { output: [], newState: { ...state, fs: newFs } };
}

// ─── node ─────────────────────────────────────────────────────────────────────
function cmdNode(args, state) {
  if (!args.length || args[0] === '-e') {
    if (args[0] === '-e') {
      const code = args.slice(1).join(' ');
      return { output: evalNodeCode(code), newState: state };
    }
    return {
      output: [
        { type: 'info', text: 'Welcome to Node.js v20.14.0.' },
        { type: 'info', text: "Type '.help' for more information." }
      ],
      newState: { ...state, mode: 'node' }
    };
  }

  const file = args[0];
  const resolved = resolvePath(file, state.cwd);
  const node = state.fs[resolved];
  if (!node) return { output: [{ type: 'error', text: `node: ${file}: No such file or directory` }], newState: state };

  const result = evalNodeCode(node.content || '');
  return { output: result, newState: state };
}

function evalNodeCode(code) {
  // Safe subset eval simulation
  const outputs = [];
  const lines = code.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('//')) continue;

    const consoleMatch = trimmed.match(/^console\.(log|error|warn|info)\((.*)\)$/);
    if (consoleMatch) {
      const [, method, arg] = consoleMatch;
      try {
        // Safe eval for simple expressions
        const val = safeEval(arg);
        const type = method === 'error' ? 'error' : method === 'warn' ? 'warn' : 'out';
        outputs.push({ type, text: String(val) });
      } catch {
        outputs.push({ type: 'out', text: arg.replace(/^['"]|['"]$/g, '') });
      }
      continue;
    }

    const mathMatch = trimmed.match(/^(\d[\d\s+\-*/().]*\d|\d)$/);
    if (mathMatch) {
      try {
        const result = Function(`"use strict"; return (${trimmed})`)();
        outputs.push({ type: 'out', text: String(result) });
      } catch { /**/ }
    }
  }
  return outputs.length ? outputs : [{ type: 'out', text: 'undefined' }];
}

function safeEval(expr) {
  const clean = expr.replace(/^['"`]|['"`]$/g, '');
  if (!isNaN(expr)) return Number(expr);
  if (expr.includes('+') || expr.includes('*') || expr.includes('-')) {
    return Function(`"use strict"; return (${expr})`)();
  }
  return clean;
}

// ─── npm ─────────────────────────────────────────────────────────────────────
function cmdNpm(args, state) {
  const sub = args[0];
  switch (sub) {
    case 'init': return npmInit(args, state);
    case 'install':
    case 'i': return npmInstall(args.slice(1), state);
    case 'run': return npmRun(args.slice(1), state);
    case 'start': return npmRun(['start'], state);
    case 'test': return npmRun(['test'], state);
    case '--version':
    case '-v': return { output: [{ type: 'out', text: '10.8.1' }], newState: state };
    case 'list':
    case 'ls': return npmList(state);
    case 'uninstall':
    case 'remove': return npmUninstall(args.slice(1), state);
    case 'help':
    case undefined:
      return { output: [{ type: 'out', text: 'npm <command>\n\nUsage:\n  npm init\n  npm install <package>\n  npm run <script>\n  npm start\n  npm test\n  npm list\n\nAll commands have --help.' }], newState: state };
    default:
      return { output: [{ type: 'error', text: `npm: unknown command: ${sub}` }], newState: state };
  }
}

function npmInit(args, state) {
  const yes = args.includes('-y') || args.includes('--yes');
  const cwd = state.cwd;
  const name = cwd.split('/').pop() || 'my-app';

  const pkg = {
    name,
    version: '1.0.0',
    description: '',
    main: 'index.js',
    scripts: { test: 'echo "Error: no test specified" && exit 1' },
    keywords: [],
    author: '',
    license: 'ISC'
  };

  const pkgJson = JSON.stringify(pkg, null, 2);
  const newFs = { ...state.fs };
  const pkgPath = cwd + '/package.json';
  newFs[pkgPath] = { type: 'file', content: pkgJson };
  const parent = newFs[cwd];
  if (parent && !parent.children.includes('package.json')) {
    newFs[cwd] = { ...parent, children: [...parent.children, 'package.json'] };
  }

  const out = yes
    ? [{ type: 'success', text: `Wrote to ${pkgPath}:\n\n${pkgJson}` }]
    : [
        { type: 'info', text: 'This utility will walk you through creating a package.json file.' },
        { type: 'info', text: 'Press ^C at any time to quit.' },
        { type: 'out', text: `package name: (${name})` },
        { type: 'out', text: 'version: (1.0.0)' },
        { type: 'out', text: 'description:' },
        { type: 'out', text: 'entry point: (index.js)' },
        { type: 'out', text: 'git repository:' },
        { type: 'out', text: 'keywords:' },
        { type: 'out', text: 'author:' },
        { type: 'out', text: 'license: (ISC)' },
        { type: 'success', text: `\nWrote to ${pkgPath}:\n\n${pkgJson}` }
      ];

  return { output: out, newState: { ...state, fs: newFs } };
}

function npmInstall(pkgs, state) {
  if (!pkgs.length || pkgs[0] === '--save-dev' || pkgs[0] === '-D') {
    // npm install (no packages - install from package.json)
    return {
      output: [{ type: 'install', packages: [], restore: true }],
      newState: state
    };
  }

  const saveDev = pkgs.includes('--save-dev') || pkgs.includes('-D');
  const packages = pkgs.filter(p => !p.startsWith('-'));

  const known = packages.map(p => {
    const base = p.replace(/^@?[^@]+/, m => m).split('@')[0] || p;
    return { name: p, info: NPM_PACKAGES[base] || NPM_PACKAGES[p] };
  });

  return {
    output: [{ type: 'install', packages: known, saveDev }],
    newState: state
  };
}

export function getInstallOutput(packages, saveDev, restore) {
  if (restore) {
    return [
      { type: 'info', text: 'npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory.' },
      { type: 'out', text: '' },
      { type: 'success', text: 'added 234 packages in 3s' },
      { type: 'out', text: '' },
      { type: 'out', text: '73 packages are looking for funding\n  run `npm fund` for details' },
      { type: 'out', text: '' },
      { type: 'out', text: 'found 0 vulnerabilities' }
    ];
  }

  const depCount = packages.reduce((n, p) => n + (p.info?.deps?.length || 0) + 1, 0);
  const size = packages.map(p => p.info?.size || '~50kB').join(', ');
  const lines = [
    { type: 'out', text: '' }
  ];

  packages.forEach(pkg => {
    const info = pkg.info || {};
    if (info.deps?.length) {
      lines.push({ type: 'out', text: `npm warn deprecated: Some ${pkg.name} deps may have deprecation notices` });
    }
  });

  lines.push({ type: 'out', text: '' });
  lines.push({ type: 'success', text: `added ${depCount} packages${saveDev ? ' (dev)' : ''} in ${(Math.random() * 4 + 1).toFixed(0)}s` });
  lines.push({ type: 'out', text: '' });
  lines.push({ type: 'out', text: 'found 0 vulnerabilities' });

  return lines;
}

function npmRun(args, state) {
  const script = args[0];
  const pkgPath = state.cwd + '/package.json';
  const pkgNode = state.fs[pkgPath];

  if (!pkgNode) return { output: [{ type: 'error', text: 'npm: no package.json found. Run npm init first.' }], newState: state };

  let pkg;
  try { pkg = JSON.parse(pkgNode.content); } catch { return { output: [{ type: 'error', text: 'npm: invalid package.json' }], newState: state }; }

  if (!script) {
    const scripts = Object.keys(pkg.scripts || {});
    return { output: [{ type: 'out', text: `Scripts defined in package.json:\n  ${scripts.map(s => `npm run ${s}`).join('\n  ')}` }], newState: state };
  }

  const scriptCmd = pkg.scripts?.[script];
  if (!scriptCmd) return { output: [{ type: 'error', text: `npm run: missing script: ${script}` }], newState: state };

  if (script === 'start' || scriptCmd.includes('node') || scriptCmd.includes('nodemon')) {
    return {
      output: [
        { type: 'info', text: `> ${pkg.name}@${pkg.version} ${script}` },
        { type: 'info', text: `> ${scriptCmd}` },
        { type: 'out', text: '' },
        { type: 'success', text: '🚀 Server running on http://localhost:3000' },
        { type: 'out', text: 'Press Ctrl+C to stop.' }
      ],
      newState: state
    };
  }

  return {
    output: [
      { type: 'info', text: `> ${pkg.name}@${pkg.version} ${script}` },
      { type: 'info', text: `> ${scriptCmd}` },
      { type: 'out', text: '' },
      { type: 'out', text: scriptCmd }
    ],
    newState: state
  };
}

function npmList(state) {
  const pkgPath = state.cwd + '/package.json';
  const pkgNode = state.fs[pkgPath];
  if (!pkgNode) return { output: [{ type: 'error', text: 'npm: no package.json found.' }], newState: state };

  try {
    const pkg = JSON.parse(pkgNode.content);
    const deps = Object.entries(pkg.dependencies || {}).map(([n, v]) => `├── ${n}@${v}`);
    const devDeps = Object.entries(pkg.devDependencies || {}).map(([n, v]) => `├── ${n}@${v} (dev)`);
    return {
      output: [{
        type: 'out',
        text: `${pkg.name}@${pkg.version}\n${[...deps, ...devDeps].join('\n') || '(no dependencies)'}`
      }],
      newState: state
    };
  } catch {
    return { output: [{ type: 'error', text: 'npm: could not parse package.json' }], newState: state };
  }
}

function npmUninstall(pkgs, state) {
  const names = pkgs.filter(p => !p.startsWith('-'));
  return {
    output: [
      { type: 'out', text: '' },
      { type: 'success', text: `removed ${names.length} package${names.length !== 1 ? 's' : ''} in 0.5s` }
    ],
    newState: state
  };
}

// ─── npx ─────────────────────────────────────────────────────────────────────
function cmdNpx(args, state) {
  const [tool, ...rest] = args;
  if (!tool) return { output: [{ type: 'error', text: 'npx: missing command' }], newState: state };

  if (tool === 'create-next-app') {
    const name = rest.find(a => !a.startsWith('-')) || 'my-next-app';
    return {
      output: [
        { type: 'install', packages: [{ name: 'create-next-app', info: { deps: [], size: '45MB' } }], scaffold: true, scaffoldType: 'next', scaffoldName: name }
      ],
      newState: state
    };
  }

  if (tool === 'create-react-app') {
    const name = rest.find(a => !a.startsWith('-')) || 'my-react-app';
    return {
      output: [{ type: 'install', packages: [], scaffold: true, scaffoldType: 'cra', scaffoldName: name }],
      newState: state
    };
  }

  if (tool === 'prisma') {
    return handlePrismaCmd(rest, state);
  }

  if (tool === 'ts-node') {
    return { output: [{ type: 'out', text: `[ts-node] Running ${rest[0] || 'file.ts'}` }], newState: state };
  }

  return {
    output: [{ type: 'info', text: `npx: loading ${tool}@latest...` }, { type: 'out', text: `Running ${tool} ${rest.join(' ')}` }],
    newState: state
  };
}

function handlePrismaCmd(args, state) {
  const sub = args[0];
  switch (sub) {
    case 'init':
      return {
        output: [
          { type: 'out', text: '' },
          { type: 'success', text: '✔ Your Prisma schema was created at prisma/schema.prisma' },
          { type: 'out', text: '  You can now open it in your favorite editor.' },
          { type: 'out', text: '' },
          { type: 'warn', text: 'warn You already have a .gitignore. Don\'t forget to exclude .env to not commit any secret.' },
          { type: 'out', text: '' },
          { type: 'info', text: 'Next steps:' },
          { type: 'out', text: '1. Set the DATABASE_URL in the .env file to point to your existing database.' },
          { type: 'out', text: '2. Set the provider of the datasource block in schema.prisma to match your database:' },
          { type: 'out', text: '   postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.' },
          { type: 'out', text: '3. Run npx prisma db pull to turn your database schema into a Prisma schema.' },
          { type: 'out', text: '4. Run npx prisma generate to generate the Prisma Client.' }
        ],
        newState: state
      };
    case 'migrate':
      if (args[1] === 'dev') {
        const name = args[args.indexOf('--name') + 1] || 'init';
        return {
          output: [
            { type: 'out', text: '' },
            { type: 'info', text: 'Applying migration `20240101000000_' + name + '`' },
            { type: 'out', text: '' },
            { type: 'success', text: 'The following migration(s) have been created and applied from new schema changes:' },
            { type: 'out', text: `migrations/\n  └─ 20240101000000_${name}/\n    └─ migration.sql` },
            { type: 'out', text: '' },
            { type: 'success', text: '✔ Generated Prisma Client (v5.14.0) to ./node_modules/@prisma/client' }
          ],
          newState: state
        };
      }
      return { output: [{ type: 'error', text: 'Unknown migrate command. Use: npx prisma migrate dev --name <name>' }], newState: state };
    case 'generate':
      return {
        output: [
          { type: 'out', text: '' },
          { type: 'success', text: '✔ Generated Prisma Client (v5.14.0) to ./node_modules/@prisma/client in 234ms' },
          { type: 'out', text: '' },
          { type: 'out', text: 'Start using Prisma Client in Node.js (See: https://pris.ly/d/client)' }
        ],
        newState: state
      };
    case 'studio':
      return {
        output: [
          { type: 'out', text: '' },
          { type: 'success', text: '✔ Prisma Studio is up on http://localhost:5555' }
        ],
        newState: state
      };
    case 'db':
      if (args[1] === 'push') {
        return {
          output: [
            { type: 'out', text: '' },
            { type: 'success', text: '✔ Your database is now in sync with your Prisma schema.' },
            { type: 'success', text: '✔ Generated Prisma Client (v5.14.0)' }
          ],
          newState: state
        };
      }
      return { output: [{ type: 'error', text: `Unknown db command: ${args[1]}` }], newState: state };
    case 'format':
      return { output: [{ type: 'success', text: '✔ Formatted schema.prisma' }], newState: state };
    default:
      return {
        output: [{
          type: 'out',
          text: 'Usage:\n  npx prisma init\n  npx prisma generate\n  npx prisma migrate dev --name <name>\n  npx prisma db push\n  npx prisma studio\n  npx prisma format'
        }],
        newState: state
      };
  }
}

// ─── git ─────────────────────────────────────────────────────────────────────
function cmdGit(args, state) {
  const sub = args[0];
  switch (sub) {
    case 'init':
      return {
        output: [{ type: 'success', text: `Initialized empty Git repository in ${state.cwd}/.git/` }],
        newState: { ...state, git: { initialized: true, branch: 'main', staged: [], committed: [], remote: null } }
      };
    case 'status':
      if (!state.git?.initialized) return { output: [{ type: 'error', text: 'fatal: not a git repository' }], newState: state };
      return {
        output: [{
          type: 'out',
          text: `On branch ${state.git.branch}\n\nNothing to commit, working tree clean.`
        }],
        newState: state
      };
    case 'add':
      if (!state.git?.initialized) return { output: [{ type: 'error', text: 'fatal: not a git repository' }], newState: state };
      return { output: [], newState: state };
    case 'commit':
      if (!state.git?.initialized) return { output: [{ type: 'error', text: 'fatal: not a git repository' }], newState: state };
      const msgIdx = args.indexOf('-m');
      const msg = msgIdx >= 0 ? args.slice(msgIdx + 1).join(' ').replace(/^["']|["']$/g, '') : '';
      if (!msg) return { output: [{ type: 'error', text: 'error: switch `m\' requires a value' }], newState: state };
      const hash = Math.random().toString(36).slice(2, 9);
      return {
        output: [{ type: 'success', text: `[${state.git.branch} ${hash}] ${msg}\n 1 file changed, 1 insertion(+)` }],
        newState: state
      };
    case 'push':
      if (!state.git?.initialized) return { output: [{ type: 'error', text: 'fatal: not a git repository' }], newState: state };
      return {
        output: [
          { type: 'out', text: 'Enumerating objects: 3, done.' },
          { type: 'out', text: 'Counting objects: 100% (3/3), done.' },
          { type: 'out', text: 'Writing objects: 100% (3/3), 280 bytes | 280.00 KiB/s, done.' },
          { type: 'success', text: `Branch '${state.git.branch}' set up to track remote branch '${state.git.branch}' from 'origin'.` }
        ],
        newState: state
      };
    case 'log':
      if (!state.git?.initialized) return { output: [{ type: 'error', text: 'fatal: not a git repository' }], newState: state };
      return { output: [{ type: 'out', text: 'fatal: your current branch \'main\' does not have any commits yet' }], newState: state };
    case 'clone':
      const repoUrl = args[1] || '';
      const repoName = repoUrl.split('/').pop().replace('.git', '') || 'repo';
      return {
        output: [
          { type: 'out', text: `Cloning into '${repoName}'...` },
          { type: 'out', text: 'remote: Enumerating objects: 42, done.' },
          { type: 'out', text: 'Resolving deltas: 100% (12/12), done.' }
        ],
        newState: state
      };
    case 'branch':
      if (!state.git?.initialized) return { output: [{ type: 'error', text: 'fatal: not a git repository' }], newState: state };
      return { output: [{ type: 'out', text: `* ${state.git?.branch || 'main'}` }], newState: state };
    case 'checkout':
      return { output: [{ type: 'out', text: `Switched to branch '${args[1] || 'main'}'` }], newState: state };
    default:
      return { output: [{ type: 'out', text: `usage: git <command> [options]\n\nCommon commands: init, clone, add, commit, push, pull, status, log, branch, checkout` }], newState: state };
  }
}

// ─── psql ─────────────────────────────────────────────────────────────────────
function cmdPsql(args, state) {
  return {
    output: [
      { type: 'info', text: 'psql (16.3)' },
      { type: 'info', text: "Type \"help\" for help." },
      { type: 'out', text: '' }
    ],
    newState: { ...state, mode: 'psql', db: { ...INITIAL_DB_STATE.psql, connected: true, currentDb: 'postgres' } }
  };
}

function handlePSQL(input, state) {
  const trimmed = input.trim().toLowerCase();

  if (trimmed === '\\q' || trimmed === 'exit' || trimmed === 'quit') {
    return { output: [], newState: { ...state, mode: 'bash' } };
  }

  if (trimmed === 'help' || trimmed === '\\h') {
    return {
      output: [{
        type: 'out',
        text: 'You are using psql, the command-line interface to PostgreSQL.\n\nType:  \\copyright  copyright info\n       \\h  SQL command help\n       \\?  psql commands\n       \\g  or terminate with semicolon to execute query\n       \\q  quit'
      }],
      newState: state
    };
  }

  if (trimmed === '\\l' || trimmed === '\\list') {
    const dbs = state.db?.databases || ['postgres', 'template0', 'template1'];
    const rows = dbs.map(db => `  ${db.padEnd(20)} | postgres | UTF8`).join('\n');
    return {
      output: [{
        type: 'out',
        text: `                                  List of databases\n   Name               | Owner    | Encoding\n----------------------+----------+----------\n${rows}\n(${dbs.length} rows)`
      }],
      newState: state
    };
  }

  if (trimmed.startsWith('\\c ') || trimmed.startsWith('\\connect ')) {
    const db = trimmed.split(/\s+/)[1];
    return {
      output: [{ type: 'info', text: `You are now connected to database "${db}" as user "postgres".` }],
      newState: { ...state, db: { ...state.db, currentDb: db } }
    };
  }

  if (trimmed === '\\dt' || trimmed === '\\dt+') {
    const tables = state.db?.tables?.[state.db?.currentDb] || [];
    if (!tables.length) return { output: [{ type: 'out', text: 'Did not find any relations.' }], newState: state };
    const rows = tables.map(t => `  public | ${t.padEnd(20)} | table | postgres`).join('\n');
    return {
      output: [{
        type: 'out',
        text: `         List of relations\n Schema | Name                 | Type  | Owner\n--------+----------------------+-------+----------\n${rows}`
      }],
      newState: state
    };
  }

  // SQL queries
  if (trimmed.endsWith(';') || trimmed.includes('select') || trimmed.includes('create') || trimmed.includes('insert') || trimmed.includes('update') || trimmed.includes('delete')) {
    return handleSQLQuery(input, state);
  }

  return {
    output: [{ type: 'error', text: `psql: ERROR: syntax error at or near "${input.split(' ')[0]}"` }],
    newState: state
  };
}

function handleSQLQuery(sql, state) {
  const lower = sql.toLowerCase().trim();

  if (lower.startsWith('create table')) {
    const match = sql.match(/create\s+table\s+(\w+)/i);
    const tableName = match?.[1] || 'table1';
    const db = state.db?.currentDb || 'postgres';
    const tables = { ...(state.db?.tables || {}), [db]: [...(state.db?.tables?.[db] || []), tableName] };
    return {
      output: [{ type: 'success', text: 'CREATE TABLE' }],
      newState: { ...state, db: { ...state.db, tables } }
    };
  }

  if (lower.startsWith('insert')) return { output: [{ type: 'success', text: 'INSERT 0 1' }], newState: state };
  if (lower.startsWith('update')) return { output: [{ type: 'success', text: 'UPDATE 1' }], newState: state };
  if (lower.startsWith('delete')) return { output: [{ type: 'success', text: 'DELETE 1' }], newState: state };

  if (lower.startsWith('select')) {
    if (lower.includes('now()')) return { output: [{ type: 'out', text: `              now\n-------------------------------\n ${new Date().toISOString()}\n(1 row)` }], newState: state };
    if (lower.includes('version()')) return { output: [{ type: 'out', text: ' PostgreSQL 16.3 on x86_64-pc-linux-gnu\n(1 row)' }], newState: state };
    if (lower.includes('current_user')) return { output: [{ type: 'out', text: ' current_user\n--------------\n postgres\n(1 row)' }], newState: state };
    if (lower.includes('1 + 1')) return { output: [{ type: 'out', text: ' ?column?\n----------\n        2\n(1 row)' }], newState: state };
    return { output: [{ type: 'out', text: ' (0 rows)' }], newState: state };
  }

  if (lower === 'begin;' || lower === 'begin') return { output: [{ type: 'success', text: 'BEGIN' }], newState: state };
  if (lower === 'commit;' || lower === 'commit') return { output: [{ type: 'success', text: 'COMMIT' }], newState: state };
  if (lower === 'rollback;' || lower === 'rollback') return { output: [{ type: 'success', text: 'ROLLBACK' }], newState: state };

  return { output: [{ type: 'out', text: 'Query executed. (0 rows affected)' }], newState: state };
}

// ─── mongo ────────────────────────────────────────────────────────────────────
function cmdMongo(args, state) {
  return {
    output: [
      { type: 'info', text: 'Current Mongosh Log ID: 6651f8c2e5c3ab2d' },
      { type: 'info', text: 'Connecting to: mongodb://127.0.0.1:27017' },
      { type: 'success', text: 'Using MongoDB: 7.0.9' },
      { type: 'success', text: 'Using Mongosh: 2.2.9' },
      { type: 'out', text: '' },
      { type: 'info', text: "Type 'help' for help." },
      { type: 'out', text: '' }
    ],
    newState: { ...state, mode: 'mongo', mongo: { ...INITIAL_DB_STATE.mongo, connected: true } }
  };
}

function handleMongo(input, state) {
  const trimmed = input.trim();

  if (trimmed === 'exit' || trimmed === 'quit()') {
    return { output: [], newState: { ...state, mode: 'bash' } };
  }

  if (trimmed === 'help') {
    return {
      output: [{
        type: 'out',
        text: `  show dbs             Print a list of all available databases.\n  use <db>             Switch current database to <db>.\n  show collections     Print a list of all collections for current database.\n  db.<collection>.find()  Query documents.\n  db.<collection>.insertOne({})  Insert a document.\n  exit                 Quit the shell.`
      }],
      newState: state
    };
  }

  if (trimmed === 'show dbs' || trimmed === 'show databases') {
    const dbs = state.mongo?.databases || ['admin', 'config', 'local', 'test'];
    const out = dbs.map(db => `${db.padEnd(12)} 0 B`).join('\n');
    return { output: [{ type: 'out', text: out }], newState: state };
  }

  if (trimmed.startsWith('use ')) {
    const db = trimmed.slice(4).trim();
    return {
      output: [{ type: 'info', text: `switched to db ${db}` }],
      newState: { ...state, mongo: { ...state.mongo, currentDb: db } }
    };
  }

  if (trimmed === 'show collections') {
    const db = state.mongo?.currentDb || 'test';
    const cols = state.mongo?.collections?.[db] || [];
    return { output: [{ type: 'out', text: cols.length ? cols.join('\n') : '(no collections)' }], newState: state };
  }

  // db.collection commands
  const dbMatch = trimmed.match(/^db\.(\w+)\.(\w+)\((.*)\)$/);
  if (dbMatch) {
    const [, collection, method, argsStr] = dbMatch;
    return handleMongoMethod(collection, method, argsStr, state);
  }

  return {
    output: [{ type: 'error', text: `MongoServerError: unknown command: '${trimmed.split(' ')[0].split('.')[0]}'` }],
    newState: state
  };
}

function handleMongoMethod(collection, method, args, state) {
  switch (method) {
    case 'find':
    case 'findOne':
      return {
        output: [{ type: 'out', text: method === 'find' ? '[ /* documents */ ]' : 'null' }],
        newState: state
      };
    case 'insertOne':
      return {
        output: [{
          type: 'out',
          text: `{\n  acknowledged: true,\n  insertedId: ObjectId('${Math.random().toString(36).slice(2, 26)}')\n}`
        }],
        newState: state
      };
    case 'insertMany':
      return { output: [{ type: 'out', text: '{\n  acknowledged: true,\n  insertedIds: { \'0\': ObjectId(\'...\') }\n}' }], newState: state };
    case 'updateOne':
    case 'updateMany':
      return { output: [{ type: 'out', text: `{ acknowledged: true, modifiedCount: 1, upsertedId: null, upsertedCount: 0, matchedCount: 1 }` }], newState: state };
    case 'deleteOne':
    case 'deleteMany':
      return { output: [{ type: 'out', text: '{ acknowledged: true, deletedCount: 1 }' }], newState: state };
    case 'countDocuments':
      return { output: [{ type: 'out', text: '0' }], newState: state };
    case 'createIndex':
      return { output: [{ type: 'out', text: `${collection}` }], newState: state };
    case 'aggregate':
      return { output: [{ type: 'out', text: '[ /* aggregation results */ ]' }], newState: state };
    case 'drop':
      return { output: [{ type: 'out', text: 'true' }], newState: state };
    default:
      return { output: [{ type: 'error', text: `TypeError: db.${collection}.${method} is not a function` }], newState: state };
  }
}

// ─── Node REPL ────────────────────────────────────────────────────────────────
function handleNodeREPL(input, state) {
  if (input === '.exit' || input === 'process.exit()' || input === 'process.exit(0)') {
    return { output: [], newState: { ...state, mode: 'bash' } };
  }

  if (input === '.help') {
    return {
      output: [{
        type: 'out',
        text: `.break     Sometimes you get stuck, this gets you out\n.clear     Alias for .break\n.editor    Enter editor mode\n.exit      Exit the REPL\n.help      Print this help message\n.load      Load JS from a file into the REPL session\n.save      Save all evaluated commands in this REPL session to a file`
      }],
      newState: state
    };
  }

  // Simulate common Node.js operations
  if (input.includes('require(')) {
    const match = input.match(/require\(['"]([^'"]+)['"]\)/);
    const mod = match?.[1] || 'module';
    return { output: [{ type: 'out', text: `[Function: ${mod}] { ... }` }], newState: state };
  }

  if (input === 'process.version') return { output: [{ type: 'out', text: "'v20.14.0'" }], newState: state };
  if (input === 'process.platform') return { output: [{ type: 'out', text: "'linux'" }], newState: state };
  if (input === 'process.env.NODE_ENV') return { output: [{ type: 'out', text: "'development'" }], newState: state };
  if (input === 'typeof process') return { output: [{ type: 'out', text: "'object'" }], newState: state };

  const results = evalNodeCode(input);
  if (results.length) return { output: results, newState: state };

  // Try simple expression eval
  try {
    const result = Function(`"use strict"; return (${input})`)();
    const display = typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result);
    return { output: [{ type: 'out', text: display }], newState: state };
  } catch (e) {
    if (input.endsWith('{') || input.endsWith('(') || input.endsWith(',')) {
      return { output: [{ type: 'out', text: '...' }], newState: state };
    }
    // Declaration or statement
    if (input.startsWith('const ') || input.startsWith('let ') || input.startsWith('var ') || input.startsWith('function ')) {
      return { output: [{ type: 'out', text: 'undefined' }], newState: state };
    }
    return { output: [{ type: 'error', text: e.message }], newState: state };
  }
}

// ─── Other commands ──────────────────────────────────────────────────────────
function cmdHelp(state) {
  return {
    output: [{
      type: 'html',
      text: `<div class="help-grid">
<div class="help-section">
  <div class="help-title">📁 File System</div>
  <div>ls [-la]  &nbsp; List directory</div>
  <div>cd &lt;dir&gt;  &nbsp; Change directory</div>
  <div>mkdir &lt;dir&gt; Make directory</div>
  <div>touch &lt;file&gt; Create file</div>
  <div>cat &lt;file&gt; &nbsp;Read file</div>
  <div>rm [-rf] &nbsp; Remove</div>
  <div>mv / cp  &nbsp; Move / Copy</div>
  <div>pwd      &nbsp; Print directory</div>
</div>
<div class="help-section">
  <div class="help-title">📦 npm / npx</div>
  <div>npm init [-y]</div>
  <div>npm install &lt;pkg&gt;</div>
  <div>npm run &lt;script&gt;</div>
  <div>npm start / test</div>
  <div>npm list</div>
  <div>npx prisma &lt;cmd&gt;</div>
  <div>npx create-next-app</div>
</div>
<div class="help-section">
  <div class="help-title">🟢 Node.js</div>
  <div>node          &nbsp; Start REPL</div>
  <div>node -e &lt;code&gt; Run inline</div>
  <div>node &lt;file&gt;  &nbsp; Run file</div>
  <div>  .help       &nbsp; REPL help</div>
  <div>  .exit       &nbsp; Exit REPL</div>
</div>
<div class="help-section">
  <div class="help-title">🐘 PostgreSQL</div>
  <div>psql          &nbsp; Connect</div>
  <div>  \\l          &nbsp; List databases</div>
  <div>  \\c &lt;db&gt;    &nbsp; Connect to DB</div>
  <div>  \\dt         &nbsp; List tables</div>
  <div>  SQL;        &nbsp; Run query</div>
  <div>  \\q          &nbsp; Exit</div>
</div>
<div class="help-section">
  <div class="help-title">🍃 MongoDB</div>
  <div>mongosh       &nbsp; Connect</div>
  <div>  show dbs    &nbsp; List DBs</div>
  <div>  use &lt;db&gt;   &nbsp; Switch DB</div>
  <div>  db.col.find() Query</div>
  <div>  exit        &nbsp; Exit</div>
</div>
<div class="help-section">
  <div class="help-title">🔧 Git</div>
  <div>git init / clone</div>
  <div>git add / commit</div>
  <div>git push / pull</div>
  <div>git status / log</div>
  <div>git branch / checkout</div>
</div>
</div>`
    }],
    newState: state
  };
}

function cmdEnv(state) {
  const envVars = state.env || {};
  const defaults = {
    HOME: '/home/user',
    USER: 'user',
    SHELL: '/bin/bash',
    PATH: '/usr/local/bin:/usr/bin:/bin',
    NODE_ENV: 'development',
    PORT: '3000'
  };
  const all = { ...defaults, ...envVars };
  const text = Object.entries(all).map(([k, v]) => `${k}=${v}`).join('\n');
  return { output: [{ type: 'out', text: text }], newState: state };
}

function cmdExport(args, state) {
  const newEnv = { ...state.env };
  for (const arg of args) {
    const [key, ...rest] = arg.split('=');
    if (rest.length) newEnv[key] = rest.join('=').replace(/^["']|["']$/g, '');
  }
  return { output: [], newState: { ...state, env: newEnv } };
}

function cmdHistory(state) {
  const hist = state.history || [];
  const text = hist.map((cmd, i) => `  ${String(i + 1).padStart(4)}  ${cmd}`).join('\n');
  return { output: [{ type: 'out', text: text || '(no history)' }], newState: state };
}

function cmdCurl(args, state) {
  const url = args.find(a => !a.startsWith('-')) || '';
  if (!url) return { output: [{ type: 'error', text: 'curl: no URL specified!' }], newState: state };

  // Simulate some known endpoints
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    if (url.includes('/api/')) {
      const endpoint = url.split('/api/')[1] || '';
      return {
        output: [{
          type: 'out',
          text: JSON.stringify({
            success: true,
            data: endpoint.includes('user') ? { id: 1, name: 'John Doe', email: 'john@example.com' } : { message: 'API response', endpoint }
          }, null, 2)
        }],
        newState: state
      };
    }
    return { output: [{ type: 'error', text: 'curl: (7) Failed to connect to localhost port 3000 after 0 ms: Connection refused' }], newState: state };
  }

  return {
    output: [{
      type: 'out',
      text: `{"message": "Simulated response from ${url}"}`
    }],
    newState: state
  };
}

function cmdPing(args, state) {
  const host = args.find(a => !a.startsWith('-')) || 'localhost';
  return {
    output: [
      { type: 'out', text: `PING ${host}: 56 data bytes` },
      { type: 'out', text: `64 bytes from ${host}: icmp_seq=0 ttl=64 time=0.044 ms` },
      { type: 'out', text: `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.083 ms` }
    ],
    newState: state
  };
}

function cmdMan(args, state) {
  const cmd = args[0];
  const manPages = {
    node: 'NODE(1) — Node.js JavaScript runtime\n\nSYNOPSIS\n  node [options] [file]\n\nDESCRIPTION\n  Node.js is a JavaScript runtime built on Chrome\'s V8 JavaScript engine.',
    npm: 'NPM(1) — Node Package Manager\n\nSYNOPSIS\n  npm <command> [args]\n\nCOMMANDS\n  init, install, run, start, test, list, publish...',
    git: 'GIT(1) — the stupid content tracker\n\nSYNOPSIS\n  git <command> [options]\n\nCOMMANDS\n  init, clone, add, commit, push, pull, fetch, merge...'
  };
  const page = manPages[cmd];
  if (!page) return { output: [{ type: 'error', text: `man: ${cmd}: No manual entry for ${cmd}` }], newState: state };
  return { output: [{ type: 'out', text: page }], newState: state };
}

// ─── Tab Completion ───────────────────────────────────────────────────────────
export function getCompletions(input, state) {
  const { fs, cwd, mode } = state;

  if (mode === 'node') {
    const nodeBuiltins = ['console.log(', 'console.error(', 'process.exit(', 'process.version', 'process.env', 'require(', 'module.exports', '.exit', '.help', '.clear'];
    return nodeBuiltins.filter(c => c.startsWith(input));
  }

  if (mode === 'psql') {
    const psqlCmds = ['\\l', '\\dt', '\\q', '\\c ', '\\h', 'SELECT ', 'INSERT INTO ', 'CREATE TABLE ', 'DROP TABLE '];
    return psqlCmds.filter(c => c.toLowerCase().startsWith(input.toLowerCase()));
  }

  if (mode === 'mongo') {
    const mongoCmds = ['show dbs', 'show collections', 'use ', 'db.', 'exit', 'help'];
    return mongoCmds.filter(c => c.startsWith(input));
  }

  // Bash mode
  const parts = input.split(' ');
  if (parts.length === 1) {
    const cmds = ['ls', 'cd', 'mkdir', 'touch', 'cat', 'rm', 'mv', 'cp', 'echo', 'pwd', 'clear', 'node', 'npm', 'npx', 'git', 'psql', 'mongosh', 'which', 'whoami', 'env', 'export', 'history', 'help', 'curl', 'ping', 'man'];
    return cmds.filter(c => c.startsWith(input));
  }

  // Path completion
  const lastPart = parts[parts.length - 1];
  const parentPath = lastPart.includes('/') ? resolvePath(lastPart.split('/').slice(0, -1).join('/') || '.', cwd) : cwd;
  const parentNode = fs[parentPath];
  if (!parentNode?.children) return [];

  const prefix = lastPart.includes('/') ? lastPart.split('/').slice(0, -1).join('/') + '/' : '';
  const searchPrefix = lastPart.split('/').pop();

  return parentNode.children
    .filter(child => child.startsWith(searchPrefix))
    .map(child => {
      const fullPath = `${parentPath}/${child}`;
      const isDir = fs[fullPath]?.type === 'dir';
      return [...parts.slice(0, -1), prefix + child + (isDir ? '/' : '')].join(' ');
    });
}

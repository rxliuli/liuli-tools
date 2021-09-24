/* eslint-disable */
//prettier-ignore
module.exports = {
name: "@liuli-util/yarn-plugin-changed",
factory: function (require) {
var plugin = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    __markAsModule(target);
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // ../../node_modules/simple-git/src/lib/errors/git-error.js
  var require_git_error = __commonJS({
    "../../node_modules/simple-git/src/lib/errors/git-error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitError = void 0;
      var GitError = class extends Error {
        constructor(task, message) {
          super(message);
          this.task = task;
          Object.setPrototypeOf(this, new.target.prototype);
        }
      };
      exports.GitError = GitError;
    }
  });

  // ../../node_modules/simple-git/src/lib/errors/git-response-error.js
  var require_git_response_error = __commonJS({
    "../../node_modules/simple-git/src/lib/errors/git-response-error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitResponseError = void 0;
      var git_error_1 = require_git_error();
      var GitResponseError = class extends git_error_1.GitError {
        constructor(git2, message) {
          super(void 0, message || String(git2));
          this.git = git2;
        }
      };
      exports.GitResponseError = GitResponseError;
    }
  });

  // ../../node_modules/simple-git/src/lib/errors/git-construct-error.js
  var require_git_construct_error = __commonJS({
    "../../node_modules/simple-git/src/lib/errors/git-construct-error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitConstructError = void 0;
      var git_error_1 = require_git_error();
      var GitConstructError = class extends git_error_1.GitError {
        constructor(config, message) {
          super(void 0, message);
          this.config = config;
        }
      };
      exports.GitConstructError = GitConstructError;
    }
  });

  // ../../node_modules/simple-git/src/lib/errors/git-plugin-error.js
  var require_git_plugin_error = __commonJS({
    "../../node_modules/simple-git/src/lib/errors/git-plugin-error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitPluginError = void 0;
      var git_error_1 = require_git_error();
      var GitPluginError = class extends git_error_1.GitError {
        constructor(task, plugin2, message) {
          super(task, message);
          this.task = task;
          this.plugin = plugin2;
          Object.setPrototypeOf(this, new.target.prototype);
        }
      };
      exports.GitPluginError = GitPluginError;
    }
  });

  // ../../node_modules/simple-git/src/lib/errors/task-configuration-error.js
  var require_task_configuration_error = __commonJS({
    "../../node_modules/simple-git/src/lib/errors/task-configuration-error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TaskConfigurationError = void 0;
      var git_error_1 = require_git_error();
      var TaskConfigurationError = class extends git_error_1.GitError {
        constructor(message) {
          super(void 0, message);
        }
      };
      exports.TaskConfigurationError = TaskConfigurationError;
    }
  });

  // ../../node_modules/ms/index.js
  var require_ms = __commonJS({
    "../../node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "weeks":
          case "week":
          case "w":
            return n * w;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + "d";
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + "h";
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + "m";
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, "day");
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, "hour");
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, "minute");
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, "second");
        }
        return ms + " ms";
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
      }
    }
  });

  // ../../node_modules/debug/src/common.js
  var require_common = __commonJS({
    "../../node_modules/debug/src/common.js"(exports, module) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require_ms();
        createDebug.destroy = destroy;
        Object.keys(env).forEach((key) => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self2 = debug;
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self2.diff = ms;
            self2.prev = prevTime;
            self2.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== "string") {
              args.unshift("%O");
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === "%%") {
                return "%";
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === "function") {
                const val = args[index];
                match = formatter.call(self2, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self2, args);
            const logFn = self2.log || createDebug.log;
            logFn.apply(self2, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug.useColors();
          debug.color = createDebug.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug.destroy;
          Object.defineProperty(debug, "enabled", {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: (v) => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === "function") {
            createDebug.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          let i;
          const split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, ".*?");
            if (namespaces[0] === "-") {
              createDebug.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
            } else {
              createDebug.names.push(new RegExp("^" + namespaces + "$"));
            }
          }
        }
        function disable() {
          const namespaces = [
            ...createDebug.names.map(toNamespace),
            ...createDebug.skips.map(toNamespace).map((namespace) => "-" + namespace)
          ].join(",");
          createDebug.enable("");
          return namespaces;
        }
        function enabled(name) {
          if (name[name.length - 1] === "*") {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name)) {
              return false;
            }
          }
          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, "*");
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }
  });

  // ../../node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "../../node_modules/debug/src/browser.js"(exports, module) {
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = localstorage();
      exports.destroy = (() => {
        let warned = false;
        return () => {
          if (!warned) {
            warned = true;
            console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
          }
        };
      })();
      exports.colors = [
        "#0000CC",
        "#0000FF",
        "#0033CC",
        "#0033FF",
        "#0066CC",
        "#0066FF",
        "#0099CC",
        "#0099FF",
        "#00CC00",
        "#00CC33",
        "#00CC66",
        "#00CC99",
        "#00CCCC",
        "#00CCFF",
        "#3300CC",
        "#3300FF",
        "#3333CC",
        "#3333FF",
        "#3366CC",
        "#3366FF",
        "#3399CC",
        "#3399FF",
        "#33CC00",
        "#33CC33",
        "#33CC66",
        "#33CC99",
        "#33CCCC",
        "#33CCFF",
        "#6600CC",
        "#6600FF",
        "#6633CC",
        "#6633FF",
        "#66CC00",
        "#66CC33",
        "#9900CC",
        "#9900FF",
        "#9933CC",
        "#9933FF",
        "#99CC00",
        "#99CC33",
        "#CC0000",
        "#CC0033",
        "#CC0066",
        "#CC0099",
        "#CC00CC",
        "#CC00FF",
        "#CC3300",
        "#CC3333",
        "#CC3366",
        "#CC3399",
        "#CC33CC",
        "#CC33FF",
        "#CC6600",
        "#CC6633",
        "#CC9900",
        "#CC9933",
        "#CCCC00",
        "#CCCC33",
        "#FF0000",
        "#FF0033",
        "#FF0066",
        "#FF0099",
        "#FF00CC",
        "#FF00FF",
        "#FF3300",
        "#FF3333",
        "#FF3366",
        "#FF3399",
        "#FF33CC",
        "#FF33FF",
        "#FF6600",
        "#FF6633",
        "#FF9900",
        "#FF9933",
        "#FFCC00",
        "#FFCC33"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
          return true;
        }
        if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
          return false;
        }
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      function formatArgs(args) {
        args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
        if (!this.useColors) {
          return;
        }
        const c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        let index = 0;
        let lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, (match) => {
          if (match === "%%") {
            return;
          }
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      exports.log = console.debug || console.log || (() => {
      });
      function save(namespaces) {
        try {
          if (namespaces) {
            exports.storage.setItem("debug", namespaces);
          } else {
            exports.storage.removeItem("debug");
          }
        } catch (error) {
        }
      }
      function load() {
        let r;
        try {
          r = exports.storage.getItem("debug");
        } catch (error) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      function localstorage() {
        try {
          return localStorage;
        } catch (error) {
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (error) {
          return "[UnexpectedJSONParseError]: " + error.message;
        }
      };
    }
  });

  // ../../node_modules/has-flag/index.js
  var require_has_flag = __commonJS({
    "../../node_modules/has-flag/index.js"(exports, module) {
      "use strict";
      module.exports = (flag, argv = process.argv) => {
        const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
        const position = argv.indexOf(prefix + flag);
        const terminatorPosition = argv.indexOf("--");
        return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
      };
    }
  });

  // ../../node_modules/supports-color/index.js
  var require_supports_color = __commonJS({
    "../../node_modules/supports-color/index.js"(exports, module) {
      "use strict";
      var os = __require("os");
      var tty = __require("tty");
      var hasFlag = require_has_flag();
      var { env } = process;
      var forceColor;
      if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
        forceColor = 0;
      } else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
        forceColor = 1;
      }
      if ("FORCE_COLOR" in env) {
        if (env.FORCE_COLOR === "true") {
          forceColor = 1;
        } else if (env.FORCE_COLOR === "false") {
          forceColor = 0;
        } else {
          forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
        }
      }
      function translateLevel(level) {
        if (level === 0) {
          return false;
        }
        return {
          level,
          hasBasic: true,
          has256: level >= 2,
          has16m: level >= 3
        };
      }
      function supportsColor(haveStream, streamIsTTY) {
        if (forceColor === 0) {
          return 0;
        }
        if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
          return 3;
        }
        if (hasFlag("color=256")) {
          return 2;
        }
        if (haveStream && !streamIsTTY && forceColor === void 0) {
          return 0;
        }
        const min = forceColor || 0;
        if (env.TERM === "dumb") {
          return min;
        }
        if (process.platform === "win32") {
          const osRelease = os.release().split(".");
          if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
          }
          return 1;
        }
        if ("CI" in env) {
          if (["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
            return 1;
          }
          return min;
        }
        if ("TEAMCITY_VERSION" in env) {
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
        }
        if (env.COLORTERM === "truecolor") {
          return 3;
        }
        if ("TERM_PROGRAM" in env) {
          const version = parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
          switch (env.TERM_PROGRAM) {
            case "iTerm.app":
              return version >= 3 ? 3 : 2;
            case "Apple_Terminal":
              return 2;
          }
        }
        if (/-256(color)?$/i.test(env.TERM)) {
          return 2;
        }
        if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
          return 1;
        }
        if ("COLORTERM" in env) {
          return 1;
        }
        return min;
      }
      function getSupportLevel(stream) {
        const level = supportsColor(stream, stream && stream.isTTY);
        return translateLevel(level);
      }
      module.exports = {
        supportsColor: getSupportLevel,
        stdout: translateLevel(supportsColor(true, tty.isatty(1))),
        stderr: translateLevel(supportsColor(true, tty.isatty(2)))
      };
    }
  });

  // ../../node_modules/debug/src/node.js
  var require_node = __commonJS({
    "../../node_modules/debug/src/node.js"(exports, module) {
      var tty = __require("tty");
      var util = __require("util");
      exports.init = init;
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.destroy = util.deprecate(() => {
      }, "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      exports.colors = [6, 2, 3, 4, 5, 1];
      try {
        const supportsColor = require_supports_color();
        if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
          exports.colors = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            128,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
          ];
        }
      } catch (error) {
      }
      exports.inspectOpts = Object.keys(process.env).filter((key) => {
        return /^debug_/i.test(key);
      }).reduce((obj, key) => {
        const prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, (_, k) => {
          return k.toUpperCase();
        });
        let val = process.env[key];
        if (/^(yes|on|true|enabled)$/i.test(val)) {
          val = true;
        } else if (/^(no|off|false|disabled)$/i.test(val)) {
          val = false;
        } else if (val === "null") {
          val = null;
        } else {
          val = Number(val);
        }
        obj[prop] = val;
        return obj;
      }, {});
      function useColors() {
        return "colors" in exports.inspectOpts ? Boolean(exports.inspectOpts.colors) : tty.isatty(process.stderr.fd);
      }
      function formatArgs(args) {
        const { namespace: name, useColors: useColors2 } = this;
        if (useColors2) {
          const c = this.color;
          const colorCode = "[3" + (c < 8 ? c : "8;5;" + c);
          const prefix = `  ${colorCode};1m${name} [0m`;
          args[0] = prefix + args[0].split("\n").join("\n" + prefix);
          args.push(colorCode + "m+" + module.exports.humanize(this.diff) + "[0m");
        } else {
          args[0] = getDate() + name + " " + args[0];
        }
      }
      function getDate() {
        if (exports.inspectOpts.hideDate) {
          return "";
        }
        return new Date().toISOString() + " ";
      }
      function log(...args) {
        return process.stderr.write(util.format(...args) + "\n");
      }
      function save(namespaces) {
        if (namespaces) {
          process.env.DEBUG = namespaces;
        } else {
          delete process.env.DEBUG;
        }
      }
      function load() {
        return process.env.DEBUG;
      }
      function init(debug) {
        debug.inspectOpts = {};
        const keys = Object.keys(exports.inspectOpts);
        for (let i = 0; i < keys.length; i++) {
          debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
        }
      }
      module.exports = require_common()(exports);
      var { formatters } = module.exports;
      formatters.o = function(v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts).split("\n").map((str) => str.trim()).join(" ");
      };
      formatters.O = function(v) {
        this.inspectOpts.colors = this.useColors;
        return util.inspect(v, this.inspectOpts);
      };
    }
  });

  // ../../node_modules/debug/src/index.js
  var require_src = __commonJS({
    "../../node_modules/debug/src/index.js"(exports, module) {
      if (typeof process === "undefined" || process.type === "renderer" || process.browser === true || process.__nwjs) {
        module.exports = require_browser();
      } else {
        module.exports = require_node();
      }
    }
  });

  // ../../node_modules/@kwsites/file-exists/dist/src/index.js
  var require_src2 = __commonJS({
    "../../node_modules/@kwsites/file-exists/dist/src/index.js"(exports) {
      "use strict";
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var fs_1 = __require("fs");
      var debug_1 = __importDefault(require_src());
      var log = debug_1.default("@kwsites/file-exists");
      function check(path3, isFile, isDirectory) {
        log(`checking %s`, path3);
        try {
          const stat = fs_1.statSync(path3);
          if (stat.isFile() && isFile) {
            log(`[OK] path represents a file`);
            return true;
          }
          if (stat.isDirectory() && isDirectory) {
            log(`[OK] path represents a directory`);
            return true;
          }
          log(`[FAIL] path represents something other than a file or directory`);
          return false;
        } catch (e) {
          if (e.code === "ENOENT") {
            log(`[FAIL] path is not accessible: %o`, e);
            return false;
          }
          log(`[FATAL] %o`, e);
          throw e;
        }
      }
      function exists(path3, type = exports.READABLE) {
        return check(path3, (type & exports.FILE) > 0, (type & exports.FOLDER) > 0);
      }
      exports.exists = exists;
      exports.FILE = 1;
      exports.FOLDER = 2;
      exports.READABLE = exports.FILE + exports.FOLDER;
    }
  });

  // ../../node_modules/@kwsites/file-exists/dist/index.js
  var require_dist = __commonJS({
    "../../node_modules/@kwsites/file-exists/dist/index.js"(exports) {
      "use strict";
      function __export2(m) {
        for (var p in m)
          if (!exports.hasOwnProperty(p))
            exports[p] = m[p];
      }
      Object.defineProperty(exports, "__esModule", { value: true });
      __export2(require_src2());
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/util.js
  var require_util = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/util.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pick = exports.bufferToString = exports.prefixedArray = exports.asNumber = exports.asStringArray = exports.asArray = exports.objectToString = exports.remove = exports.including = exports.append = exports.folderExists = exports.forEachLineWithContent = exports.toLinesWithContent = exports.last = exports.first = exports.splitOn = exports.isUserFunction = exports.asFunction = exports.NOOP = void 0;
      var file_exists_1 = require_dist();
      var NOOP = () => {
      };
      exports.NOOP = NOOP;
      function asFunction(source) {
        return typeof source === "function" ? source : exports.NOOP;
      }
      exports.asFunction = asFunction;
      function isUserFunction(source) {
        return typeof source === "function" && source !== exports.NOOP;
      }
      exports.isUserFunction = isUserFunction;
      function splitOn(input, char) {
        const index = input.indexOf(char);
        if (index <= 0) {
          return [input, ""];
        }
        return [
          input.substr(0, index),
          input.substr(index + 1)
        ];
      }
      exports.splitOn = splitOn;
      function first(input, offset = 0) {
        return isArrayLike(input) && input.length > offset ? input[offset] : void 0;
      }
      exports.first = first;
      function last(input, offset = 0) {
        if (isArrayLike(input) && input.length > offset) {
          return input[input.length - 1 - offset];
        }
      }
      exports.last = last;
      function isArrayLike(input) {
        return !!(input && typeof input.length === "number");
      }
      function toLinesWithContent(input, trimmed = true, separator = "\n") {
        return input.split(separator).reduce((output, line) => {
          const lineContent = trimmed ? line.trim() : line;
          if (lineContent) {
            output.push(lineContent);
          }
          return output;
        }, []);
      }
      exports.toLinesWithContent = toLinesWithContent;
      function forEachLineWithContent(input, callback) {
        return toLinesWithContent(input, true).map((line) => callback(line));
      }
      exports.forEachLineWithContent = forEachLineWithContent;
      function folderExists(path3) {
        return file_exists_1.exists(path3, file_exists_1.FOLDER);
      }
      exports.folderExists = folderExists;
      function append(target, item) {
        if (Array.isArray(target)) {
          if (!target.includes(item)) {
            target.push(item);
          }
        } else {
          target.add(item);
        }
        return item;
      }
      exports.append = append;
      function including(target, item) {
        if (Array.isArray(target) && !target.includes(item)) {
          target.push(item);
        }
        return target;
      }
      exports.including = including;
      function remove(target, item) {
        if (Array.isArray(target)) {
          const index = target.indexOf(item);
          if (index >= 0) {
            target.splice(index, 1);
          }
        } else {
          target.delete(item);
        }
        return item;
      }
      exports.remove = remove;
      exports.objectToString = Object.prototype.toString.call.bind(Object.prototype.toString);
      function asArray(source) {
        return Array.isArray(source) ? source : [source];
      }
      exports.asArray = asArray;
      function asStringArray(source) {
        return asArray(source).map(String);
      }
      exports.asStringArray = asStringArray;
      function asNumber(source, onNaN = 0) {
        if (source == null) {
          return onNaN;
        }
        const num = parseInt(source, 10);
        return isNaN(num) ? onNaN : num;
      }
      exports.asNumber = asNumber;
      function prefixedArray(input, prefix) {
        const output = [];
        for (let i = 0, max = input.length; i < max; i++) {
          output.push(prefix, input[i]);
        }
        return output;
      }
      exports.prefixedArray = prefixedArray;
      function bufferToString(input) {
        return (Array.isArray(input) ? Buffer.concat(input) : input).toString("utf-8");
      }
      exports.bufferToString = bufferToString;
      function pick(source, properties) {
        return Object.assign({}, ...properties.map((property) => property in source ? { [property]: source[property] } : {}));
      }
      exports.pick = pick;
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/argument-filters.js
  var require_argument_filters = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/argument-filters.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.filterHasLength = exports.filterFunction = exports.filterPlainObject = exports.filterStringOrStringArray = exports.filterStringArray = exports.filterString = exports.filterPrimitives = exports.filterArray = exports.filterType = void 0;
      var util_1 = require_util();
      function filterType(input, filter, def) {
        if (filter(input)) {
          return input;
        }
        return arguments.length > 2 ? def : void 0;
      }
      exports.filterType = filterType;
      var filterArray = (input) => {
        return Array.isArray(input);
      };
      exports.filterArray = filterArray;
      function filterPrimitives(input, omit) {
        return /number|string|boolean/.test(typeof input) && (!omit || !omit.includes(typeof input));
      }
      exports.filterPrimitives = filterPrimitives;
      var filterString = (input) => {
        return typeof input === "string";
      };
      exports.filterString = filterString;
      var filterStringArray = (input) => {
        return Array.isArray(input) && input.every(exports.filterString);
      };
      exports.filterStringArray = filterStringArray;
      var filterStringOrStringArray = (input) => {
        return exports.filterString(input) || Array.isArray(input) && input.every(exports.filterString);
      };
      exports.filterStringOrStringArray = filterStringOrStringArray;
      function filterPlainObject(input) {
        return !!input && util_1.objectToString(input) === "[object Object]";
      }
      exports.filterPlainObject = filterPlainObject;
      function filterFunction(input) {
        return typeof input === "function";
      }
      exports.filterFunction = filterFunction;
      var filterHasLength = (input) => {
        if (input == null || "number|boolean|function".includes(typeof input)) {
          return false;
        }
        return Array.isArray(input) || typeof input === "string" || typeof input.length === "number";
      };
      exports.filterHasLength = filterHasLength;
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/exit-codes.js
  var require_exit_codes = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/exit-codes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.ExitCodes = void 0;
      var ExitCodes;
      (function(ExitCodes2) {
        ExitCodes2[ExitCodes2["SUCCESS"] = 0] = "SUCCESS";
        ExitCodes2[ExitCodes2["ERROR"] = 1] = "ERROR";
        ExitCodes2[ExitCodes2["UNCLEAN"] = 128] = "UNCLEAN";
      })(ExitCodes = exports.ExitCodes || (exports.ExitCodes = {}));
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/git-output-streams.js
  var require_git_output_streams = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/git-output-streams.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitOutputStreams = void 0;
      var GitOutputStreams = class {
        constructor(stdOut, stdErr) {
          this.stdOut = stdOut;
          this.stdErr = stdErr;
        }
        asStrings() {
          return new GitOutputStreams(this.stdOut.toString("utf8"), this.stdErr.toString("utf8"));
        }
      };
      exports.GitOutputStreams = GitOutputStreams;
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/line-parser.js
  var require_line_parser = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/line-parser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RemoteLineParser = exports.LineParser = void 0;
      var LineParser = class {
        constructor(regExp, useMatches) {
          this.matches = [];
          this.parse = (line, target) => {
            this.resetMatches();
            if (!this._regExp.every((reg, index) => this.addMatch(reg, index, line(index)))) {
              return false;
            }
            return this.useMatches(target, this.prepareMatches()) !== false;
          };
          this._regExp = Array.isArray(regExp) ? regExp : [regExp];
          if (useMatches) {
            this.useMatches = useMatches;
          }
        }
        useMatches(target, match) {
          throw new Error(`LineParser:useMatches not implemented`);
        }
        resetMatches() {
          this.matches.length = 0;
        }
        prepareMatches() {
          return this.matches;
        }
        addMatch(reg, index, line) {
          const matched = line && reg.exec(line);
          if (matched) {
            this.pushMatch(index, matched);
          }
          return !!matched;
        }
        pushMatch(_index, matched) {
          this.matches.push(...matched.slice(1));
        }
      };
      exports.LineParser = LineParser;
      var RemoteLineParser = class extends LineParser {
        addMatch(reg, index, line) {
          return /^remote:\s/.test(String(line)) && super.addMatch(reg, index, line);
        }
        pushMatch(index, matched) {
          if (index > 0 || matched.length > 1) {
            super.pushMatch(index, matched);
          }
        }
      };
      exports.RemoteLineParser = RemoteLineParser;
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/simple-git-options.js
  var require_simple_git_options = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/simple-git-options.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createInstanceConfig = void 0;
      var defaultOptions = {
        binary: "git",
        maxConcurrentProcesses: 5,
        config: []
      };
      function createInstanceConfig(...options) {
        const baseDir = process.cwd();
        const config = Object.assign(Object.assign({ baseDir }, defaultOptions), ...options.filter((o) => typeof o === "object" && o));
        config.baseDir = config.baseDir || baseDir;
        return config;
      }
      exports.createInstanceConfig = createInstanceConfig;
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/task-options.js
  var require_task_options = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/task-options.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.trailingFunctionArgument = exports.trailingOptionsArgument = exports.getTrailingOptions = exports.appendTaskOptions = void 0;
      var argument_filters_1 = require_argument_filters();
      var util_1 = require_util();
      function appendTaskOptions(options, commands = []) {
        if (!argument_filters_1.filterPlainObject(options)) {
          return commands;
        }
        return Object.keys(options).reduce((commands2, key) => {
          const value = options[key];
          if (argument_filters_1.filterPrimitives(value, ["boolean"])) {
            commands2.push(key + "=" + value);
          } else {
            commands2.push(key);
          }
          return commands2;
        }, commands);
      }
      exports.appendTaskOptions = appendTaskOptions;
      function getTrailingOptions(args, initialPrimitive = 0, objectOnly = false) {
        const command = [];
        for (let i = 0, max = initialPrimitive < 0 ? args.length : initialPrimitive; i < max; i++) {
          if ("string|number".includes(typeof args[i])) {
            command.push(String(args[i]));
          }
        }
        appendTaskOptions(trailingOptionsArgument(args), command);
        if (!objectOnly) {
          command.push(...trailingArrayArgument(args));
        }
        return command;
      }
      exports.getTrailingOptions = getTrailingOptions;
      function trailingArrayArgument(args) {
        const hasTrailingCallback = typeof util_1.last(args) === "function";
        return argument_filters_1.filterType(util_1.last(args, hasTrailingCallback ? 1 : 0), argument_filters_1.filterArray, []);
      }
      function trailingOptionsArgument(args) {
        const hasTrailingCallback = argument_filters_1.filterFunction(util_1.last(args));
        return argument_filters_1.filterType(util_1.last(args, hasTrailingCallback ? 1 : 0), argument_filters_1.filterPlainObject);
      }
      exports.trailingOptionsArgument = trailingOptionsArgument;
      function trailingFunctionArgument(args, includeNoop = true) {
        const callback = util_1.asFunction(util_1.last(args));
        return includeNoop || util_1.isUserFunction(callback) ? callback : void 0;
      }
      exports.trailingFunctionArgument = trailingFunctionArgument;
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/task-parser.js
  var require_task_parser = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/task-parser.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseStringResponse = exports.callTaskParser = void 0;
      var util_1 = require_util();
      function callTaskParser(parser, streams) {
        return parser(streams.stdOut, streams.stdErr);
      }
      exports.callTaskParser = callTaskParser;
      function parseStringResponse(result, parsers, ...texts) {
        texts.forEach((text) => {
          for (let lines = util_1.toLinesWithContent(text), i = 0, max = lines.length; i < max; i++) {
            const line = (offset = 0) => {
              if (i + offset >= max) {
                return;
              }
              return lines[i + offset];
            };
            parsers.some(({ parse }) => parse(line, result));
          }
        });
        return result;
      }
      exports.parseStringResponse = parseStringResponse;
    }
  });

  // ../../node_modules/simple-git/src/lib/utils/index.js
  var require_utils = __commonJS({
    "../../node_modules/simple-git/src/lib/utils/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_argument_filters(), exports);
      __exportStar(require_exit_codes(), exports);
      __exportStar(require_git_output_streams(), exports);
      __exportStar(require_line_parser(), exports);
      __exportStar(require_simple_git_options(), exports);
      __exportStar(require_task_options(), exports);
      __exportStar(require_task_parser(), exports);
      __exportStar(require_util(), exports);
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/check-is-repo.js
  var require_check_is_repo = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/check-is-repo.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.checkIsBareRepoTask = exports.checkIsRepoRootTask = exports.checkIsRepoTask = exports.CheckRepoActions = void 0;
      var utils_1 = require_utils();
      var CheckRepoActions;
      (function(CheckRepoActions2) {
        CheckRepoActions2["BARE"] = "bare";
        CheckRepoActions2["IN_TREE"] = "tree";
        CheckRepoActions2["IS_REPO_ROOT"] = "root";
      })(CheckRepoActions = exports.CheckRepoActions || (exports.CheckRepoActions = {}));
      var onError = ({ exitCode }, error, done, fail) => {
        if (exitCode === utils_1.ExitCodes.UNCLEAN && isNotRepoMessage(error)) {
          return done(Buffer.from("false"));
        }
        fail(error);
      };
      var parser = (text) => {
        return text.trim() === "true";
      };
      function checkIsRepoTask(action) {
        switch (action) {
          case CheckRepoActions.BARE:
            return checkIsBareRepoTask();
          case CheckRepoActions.IS_REPO_ROOT:
            return checkIsRepoRootTask();
        }
        const commands = ["rev-parse", "--is-inside-work-tree"];
        return {
          commands,
          format: "utf-8",
          onError,
          parser
        };
      }
      exports.checkIsRepoTask = checkIsRepoTask;
      function checkIsRepoRootTask() {
        const commands = ["rev-parse", "--git-dir"];
        return {
          commands,
          format: "utf-8",
          onError,
          parser(path3) {
            return /^\.(git)?$/.test(path3.trim());
          }
        };
      }
      exports.checkIsRepoRootTask = checkIsRepoRootTask;
      function checkIsBareRepoTask() {
        const commands = ["rev-parse", "--is-bare-repository"];
        return {
          commands,
          format: "utf-8",
          onError,
          parser
        };
      }
      exports.checkIsBareRepoTask = checkIsBareRepoTask;
      function isNotRepoMessage(error) {
        return /(Not a git repository|Kein Git-Repository)/i.test(String(error));
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/CleanSummary.js
  var require_CleanSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/CleanSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.cleanSummaryParser = exports.CleanResponse = void 0;
      var utils_1 = require_utils();
      var CleanResponse = class {
        constructor(dryRun) {
          this.dryRun = dryRun;
          this.paths = [];
          this.files = [];
          this.folders = [];
        }
      };
      exports.CleanResponse = CleanResponse;
      var removalRegexp = /^[a-z]+\s*/i;
      var dryRunRemovalRegexp = /^[a-z]+\s+[a-z]+\s*/i;
      var isFolderRegexp = /\/$/;
      function cleanSummaryParser(dryRun, text) {
        const summary = new CleanResponse(dryRun);
        const regexp = dryRun ? dryRunRemovalRegexp : removalRegexp;
        utils_1.toLinesWithContent(text).forEach((line) => {
          const removed = line.replace(regexp, "");
          summary.paths.push(removed);
          (isFolderRegexp.test(removed) ? summary.folders : summary.files).push(removed);
        });
        return summary;
      }
      exports.cleanSummaryParser = cleanSummaryParser;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/task.js
  var require_task = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/task.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isEmptyTask = exports.isBufferTask = exports.straightThroughBufferTask = exports.straightThroughStringTask = exports.configurationErrorTask = exports.adhocExecTask = exports.EMPTY_COMMANDS = void 0;
      var task_configuration_error_1 = require_task_configuration_error();
      exports.EMPTY_COMMANDS = [];
      function adhocExecTask(parser) {
        return {
          commands: exports.EMPTY_COMMANDS,
          format: "empty",
          parser
        };
      }
      exports.adhocExecTask = adhocExecTask;
      function configurationErrorTask(error) {
        return {
          commands: exports.EMPTY_COMMANDS,
          format: "empty",
          parser() {
            throw typeof error === "string" ? new task_configuration_error_1.TaskConfigurationError(error) : error;
          }
        };
      }
      exports.configurationErrorTask = configurationErrorTask;
      function straightThroughStringTask(commands, trimmed = false) {
        return {
          commands,
          format: "utf-8",
          parser(text) {
            return trimmed ? String(text).trim() : text;
          }
        };
      }
      exports.straightThroughStringTask = straightThroughStringTask;
      function straightThroughBufferTask(commands) {
        return {
          commands,
          format: "buffer",
          parser(buffer) {
            return buffer;
          }
        };
      }
      exports.straightThroughBufferTask = straightThroughBufferTask;
      function isBufferTask(task) {
        return task.format === "buffer";
      }
      exports.isBufferTask = isBufferTask;
      function isEmptyTask(task) {
        return task.format === "empty" || !task.commands.length;
      }
      exports.isEmptyTask = isEmptyTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/clean.js
  var require_clean = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/clean.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isCleanOptionsArray = exports.cleanTask = exports.cleanWithOptionsTask = exports.CleanOptions = exports.CONFIG_ERROR_UNKNOWN_OPTION = exports.CONFIG_ERROR_MODE_REQUIRED = exports.CONFIG_ERROR_INTERACTIVE_MODE = void 0;
      var CleanSummary_1 = require_CleanSummary();
      var utils_1 = require_utils();
      var task_1 = require_task();
      exports.CONFIG_ERROR_INTERACTIVE_MODE = "Git clean interactive mode is not supported";
      exports.CONFIG_ERROR_MODE_REQUIRED = 'Git clean mode parameter ("n" or "f") is required';
      exports.CONFIG_ERROR_UNKNOWN_OPTION = "Git clean unknown option found in: ";
      var CleanOptions;
      (function(CleanOptions2) {
        CleanOptions2["DRY_RUN"] = "n";
        CleanOptions2["FORCE"] = "f";
        CleanOptions2["IGNORED_INCLUDED"] = "x";
        CleanOptions2["IGNORED_ONLY"] = "X";
        CleanOptions2["EXCLUDING"] = "e";
        CleanOptions2["QUIET"] = "q";
        CleanOptions2["RECURSIVE"] = "d";
      })(CleanOptions = exports.CleanOptions || (exports.CleanOptions = {}));
      var CleanOptionValues = new Set(["i", ...utils_1.asStringArray(Object.values(CleanOptions))]);
      function cleanWithOptionsTask(mode, customArgs) {
        const { cleanMode, options, valid } = getCleanOptions(mode);
        if (!cleanMode) {
          return task_1.configurationErrorTask(exports.CONFIG_ERROR_MODE_REQUIRED);
        }
        if (!valid.options) {
          return task_1.configurationErrorTask(exports.CONFIG_ERROR_UNKNOWN_OPTION + JSON.stringify(mode));
        }
        options.push(...customArgs);
        if (options.some(isInteractiveMode)) {
          return task_1.configurationErrorTask(exports.CONFIG_ERROR_INTERACTIVE_MODE);
        }
        return cleanTask(cleanMode, options);
      }
      exports.cleanWithOptionsTask = cleanWithOptionsTask;
      function cleanTask(mode, customArgs) {
        const commands = ["clean", `-${mode}`, ...customArgs];
        return {
          commands,
          format: "utf-8",
          parser(text) {
            return CleanSummary_1.cleanSummaryParser(mode === CleanOptions.DRY_RUN, text);
          }
        };
      }
      exports.cleanTask = cleanTask;
      function isCleanOptionsArray(input) {
        return Array.isArray(input) && input.every((test) => CleanOptionValues.has(test));
      }
      exports.isCleanOptionsArray = isCleanOptionsArray;
      function getCleanOptions(input) {
        let cleanMode;
        let options = [];
        let valid = { cleanMode: false, options: true };
        input.replace(/[^a-z]i/g, "").split("").forEach((char) => {
          if (isCleanMode(char)) {
            cleanMode = char;
            valid.cleanMode = true;
          } else {
            valid.options = valid.options && isKnownOption(options[options.length] = `-${char}`);
          }
        });
        return {
          cleanMode,
          options,
          valid
        };
      }
      function isCleanMode(cleanMode) {
        return cleanMode === CleanOptions.FORCE || cleanMode === CleanOptions.DRY_RUN;
      }
      function isKnownOption(option) {
        return /^-[a-z]$/i.test(option) && CleanOptionValues.has(option.charAt(1));
      }
      function isInteractiveMode(option) {
        if (/^-[^\-]/.test(option)) {
          return option.indexOf("i") > 0;
        }
        return option === "--interactive";
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/ConfigList.js
  var require_ConfigList = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/ConfigList.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.configGetParser = exports.configListParser = exports.ConfigList = void 0;
      var utils_1 = require_utils();
      var ConfigList = class {
        constructor() {
          this.files = [];
          this.values = Object.create(null);
        }
        get all() {
          if (!this._all) {
            this._all = this.files.reduce((all, file) => {
              return Object.assign(all, this.values[file]);
            }, {});
          }
          return this._all;
        }
        addFile(file) {
          if (!(file in this.values)) {
            const latest = utils_1.last(this.files);
            this.values[file] = latest ? Object.create(this.values[latest]) : {};
            this.files.push(file);
          }
          return this.values[file];
        }
        addValue(file, key, value) {
          const values = this.addFile(file);
          if (!values.hasOwnProperty(key)) {
            values[key] = value;
          } else if (Array.isArray(values[key])) {
            values[key].push(value);
          } else {
            values[key] = [values[key], value];
          }
          this._all = void 0;
        }
      };
      exports.ConfigList = ConfigList;
      function configListParser(text) {
        const config = new ConfigList();
        for (const item of configParser(text)) {
          config.addValue(item.file, String(item.key), item.value);
        }
        return config;
      }
      exports.configListParser = configListParser;
      function configGetParser(text, key) {
        let value = null;
        const values = [];
        const scopes = new Map();
        for (const item of configParser(text, key)) {
          if (item.key !== key) {
            continue;
          }
          values.push(value = item.value);
          if (!scopes.has(item.file)) {
            scopes.set(item.file, []);
          }
          scopes.get(item.file).push(value);
        }
        return {
          key,
          paths: Array.from(scopes.keys()),
          scopes,
          value,
          values
        };
      }
      exports.configGetParser = configGetParser;
      function configFilePath(filePath) {
        return filePath.replace(/^(file):/, "");
      }
      function* configParser(text, requestedKey = null) {
        const lines = text.split("\0");
        for (let i = 0, max = lines.length - 1; i < max; ) {
          const file = configFilePath(lines[i++]);
          let value = lines[i++];
          let key = requestedKey;
          if (value.includes("\n")) {
            const line = utils_1.splitOn(value, "\n");
            key = line[0];
            value = line[1];
          }
          yield { file, key, value };
        }
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/config.js
  var require_config = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/config.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitConfigScope = void 0;
      var ConfigList_1 = require_ConfigList();
      var utils_1 = require_utils();
      var GitConfigScope;
      (function(GitConfigScope2) {
        GitConfigScope2["system"] = "system";
        GitConfigScope2["global"] = "global";
        GitConfigScope2["local"] = "local";
        GitConfigScope2["worktree"] = "worktree";
      })(GitConfigScope = exports.GitConfigScope || (exports.GitConfigScope = {}));
      function asConfigScope(scope, fallback2) {
        if (typeof scope === "string" && GitConfigScope.hasOwnProperty(scope)) {
          return scope;
        }
        return fallback2;
      }
      function addConfigTask(key, value, append, scope) {
        const commands = ["config", `--${scope}`];
        if (append) {
          commands.push("--add");
        }
        commands.push(key, value);
        return {
          commands,
          format: "utf-8",
          parser(text) {
            return text;
          }
        };
      }
      function getConfigTask(key, scope) {
        const commands = ["config", "--null", "--show-origin", "--get-all", key];
        if (scope) {
          commands.splice(1, 0, `--${scope}`);
        }
        return {
          commands,
          format: "utf-8",
          parser(text) {
            return ConfigList_1.configGetParser(text, key);
          }
        };
      }
      function listConfigTask(scope) {
        const commands = ["config", "--list", "--show-origin", "--null"];
        if (scope) {
          commands.push(`--${scope}`);
        }
        return {
          commands,
          format: "utf-8",
          parser(text) {
            return ConfigList_1.configListParser(text);
          }
        };
      }
      function default_1() {
        return {
          addConfig(key, value, ...rest) {
            return this._runTask(addConfigTask(key, value, rest[0] === true, asConfigScope(rest[1], GitConfigScope.local)), utils_1.trailingFunctionArgument(arguments));
          },
          getConfig(key, scope) {
            return this._runTask(getConfigTask(key, asConfigScope(scope, void 0)), utils_1.trailingFunctionArgument(arguments));
          },
          listConfig(...rest) {
            return this._runTask(listConfigTask(asConfigScope(rest[0], void 0)), utils_1.trailingFunctionArgument(arguments));
          }
        };
      }
      exports.default = default_1;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/reset.js
  var require_reset = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/reset.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.getResetMode = exports.resetTask = exports.ResetMode = void 0;
      var task_1 = require_task();
      var ResetMode;
      (function(ResetMode2) {
        ResetMode2["MIXED"] = "mixed";
        ResetMode2["SOFT"] = "soft";
        ResetMode2["HARD"] = "hard";
        ResetMode2["MERGE"] = "merge";
        ResetMode2["KEEP"] = "keep";
      })(ResetMode = exports.ResetMode || (exports.ResetMode = {}));
      var ResetModes = Array.from(Object.values(ResetMode));
      function resetTask(mode, customArgs) {
        const commands = ["reset"];
        if (isValidResetMode(mode)) {
          commands.push(`--${mode}`);
        }
        commands.push(...customArgs);
        return task_1.straightThroughStringTask(commands);
      }
      exports.resetTask = resetTask;
      function getResetMode(mode) {
        if (isValidResetMode(mode)) {
          return mode;
        }
        switch (typeof mode) {
          case "string":
          case "undefined":
            return ResetMode.SOFT;
        }
        return;
      }
      exports.getResetMode = getResetMode;
      function isValidResetMode(mode) {
        return ResetModes.includes(mode);
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/api.js
  var require_api = __commonJS({
    "../../node_modules/simple-git/src/lib/api.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var git_construct_error_1 = require_git_construct_error();
      var git_error_1 = require_git_error();
      var git_plugin_error_1 = require_git_plugin_error();
      var git_response_error_1 = require_git_response_error();
      var task_configuration_error_1 = require_task_configuration_error();
      var check_is_repo_1 = require_check_is_repo();
      var clean_1 = require_clean();
      var config_1 = require_config();
      var reset_1 = require_reset();
      var api = {
        CheckRepoActions: check_is_repo_1.CheckRepoActions,
        CleanOptions: clean_1.CleanOptions,
        GitConfigScope: config_1.GitConfigScope,
        GitConstructError: git_construct_error_1.GitConstructError,
        GitError: git_error_1.GitError,
        GitPluginError: git_plugin_error_1.GitPluginError,
        GitResponseError: git_response_error_1.GitResponseError,
        ResetMode: reset_1.ResetMode,
        TaskConfigurationError: task_configuration_error_1.TaskConfigurationError
      };
      exports.default = api;
    }
  });

  // ../../node_modules/simple-git/src/lib/plugins/command-config-prefixing-plugin.js
  var require_command_config_prefixing_plugin = __commonJS({
    "../../node_modules/simple-git/src/lib/plugins/command-config-prefixing-plugin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.commandConfigPrefixingPlugin = void 0;
      var utils_1 = require_utils();
      function commandConfigPrefixingPlugin(configuration) {
        const prefix = utils_1.prefixedArray(configuration, "-c");
        return {
          type: "spawn.args",
          action(data) {
            return [...prefix, ...data];
          }
        };
      }
      exports.commandConfigPrefixingPlugin = commandConfigPrefixingPlugin;
    }
  });

  // ../../node_modules/simple-git/src/lib/plugins/error-detection.plugin.js
  var require_error_detection_plugin = __commonJS({
    "../../node_modules/simple-git/src/lib/plugins/error-detection.plugin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.errorDetectionPlugin = exports.errorDetectionHandler = void 0;
      var git_error_1 = require_git_error();
      function isTaskError(result) {
        return !!(result.exitCode && result.stdErr.length);
      }
      function getErrorMessage(result) {
        return Buffer.concat([...result.stdOut, ...result.stdErr]);
      }
      function errorDetectionHandler(overwrite = false, isError = isTaskError, errorMessage = getErrorMessage) {
        return (error, result) => {
          if (!overwrite && error || !isError(result)) {
            return error;
          }
          return errorMessage(result);
        };
      }
      exports.errorDetectionHandler = errorDetectionHandler;
      function errorDetectionPlugin(config) {
        return {
          type: "task.error",
          action(data, context) {
            const error = config(data.error, {
              stdErr: context.stdErr,
              stdOut: context.stdOut,
              exitCode: context.exitCode
            });
            if (Buffer.isBuffer(error)) {
              return { error: new git_error_1.GitError(void 0, error.toString("utf-8")) };
            }
            return {
              error
            };
          }
        };
      }
      exports.errorDetectionPlugin = errorDetectionPlugin;
    }
  });

  // ../../node_modules/simple-git/src/lib/plugins/plugin-store.js
  var require_plugin_store = __commonJS({
    "../../node_modules/simple-git/src/lib/plugins/plugin-store.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PluginStore = void 0;
      var utils_1 = require_utils();
      var PluginStore = class {
        constructor() {
          this.plugins = new Set();
        }
        add(plugin2) {
          const plugins = [];
          utils_1.asArray(plugin2).forEach((plugin3) => plugin3 && this.plugins.add(utils_1.append(plugins, plugin3)));
          return () => {
            plugins.forEach((plugin3) => this.plugins.delete(plugin3));
          };
        }
        exec(type, data, context) {
          let output = data;
          const contextual = Object.freeze(Object.create(context));
          for (const plugin2 of this.plugins) {
            if (plugin2.type === type) {
              output = plugin2.action(output, contextual);
            }
          }
          return output;
        }
      };
      exports.PluginStore = PluginStore;
    }
  });

  // ../../node_modules/simple-git/src/lib/plugins/progress-monitor-plugin.js
  var require_progress_monitor_plugin = __commonJS({
    "../../node_modules/simple-git/src/lib/plugins/progress-monitor-plugin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.progressMonitorPlugin = void 0;
      var utils_1 = require_utils();
      function progressMonitorPlugin(progress) {
        const progressCommand = "--progress";
        const progressMethods = ["checkout", "clone", "fetch", "pull", "push"];
        const onProgress = {
          type: "spawn.after",
          action(_data, context) {
            var _a;
            if (!context.commands.includes(progressCommand)) {
              return;
            }
            (_a = context.spawned.stderr) === null || _a === void 0 ? void 0 : _a.on("data", (chunk) => {
              const message = /^([\s\S]+?):\s*(\d+)% \((\d+)\/(\d+)\)/.exec(chunk.toString("utf8"));
              if (!message) {
                return;
              }
              progress({
                method: context.method,
                stage: progressEventStage(message[1]),
                progress: utils_1.asNumber(message[2]),
                processed: utils_1.asNumber(message[3]),
                total: utils_1.asNumber(message[4])
              });
            });
          }
        };
        const onArgs = {
          type: "spawn.args",
          action(args, context) {
            if (!progressMethods.includes(context.method)) {
              return args;
            }
            return utils_1.including(args, progressCommand);
          }
        };
        return [onArgs, onProgress];
      }
      exports.progressMonitorPlugin = progressMonitorPlugin;
      function progressEventStage(input) {
        return String(input.toLowerCase().split(" ", 1)) || "unknown";
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/plugins/simple-git-plugin.js
  var require_simple_git_plugin = __commonJS({
    "../../node_modules/simple-git/src/lib/plugins/simple-git-plugin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
    }
  });

  // ../../node_modules/simple-git/src/lib/plugins/spawn-options-plugin.js
  var require_spawn_options_plugin = __commonJS({
    "../../node_modules/simple-git/src/lib/plugins/spawn-options-plugin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.spawnOptionsPlugin = void 0;
      var utils_1 = require_utils();
      function spawnOptionsPlugin(spawnOptions) {
        const options = utils_1.pick(spawnOptions, ["uid", "gid"]);
        return {
          type: "spawn.options",
          action(data) {
            return Object.assign(Object.assign({}, options), data);
          }
        };
      }
      exports.spawnOptionsPlugin = spawnOptionsPlugin;
    }
  });

  // ../../node_modules/simple-git/src/lib/plugins/timout-plugin.js
  var require_timout_plugin = __commonJS({
    "../../node_modules/simple-git/src/lib/plugins/timout-plugin.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.timeoutPlugin = void 0;
      var git_plugin_error_1 = require_git_plugin_error();
      function timeoutPlugin({ block }) {
        if (block > 0) {
          return {
            type: "spawn.after",
            action(_data, context) {
              var _a, _b;
              let timeout;
              function wait() {
                timeout && clearTimeout(timeout);
                timeout = setTimeout(kill, block);
              }
              function stop() {
                var _a2, _b2;
                (_a2 = context.spawned.stdout) === null || _a2 === void 0 ? void 0 : _a2.off("data", wait);
                (_b2 = context.spawned.stderr) === null || _b2 === void 0 ? void 0 : _b2.off("data", wait);
                context.spawned.off("exit", stop);
                context.spawned.off("close", stop);
              }
              function kill() {
                stop();
                context.kill(new git_plugin_error_1.GitPluginError(void 0, "timeout", `block timeout reached`));
              }
              (_a = context.spawned.stdout) === null || _a === void 0 ? void 0 : _a.on("data", wait);
              (_b = context.spawned.stderr) === null || _b === void 0 ? void 0 : _b.on("data", wait);
              context.spawned.on("exit", stop);
              context.spawned.on("close", stop);
              wait();
            }
          };
        }
      }
      exports.timeoutPlugin = timeoutPlugin;
    }
  });

  // ../../node_modules/simple-git/src/lib/plugins/index.js
  var require_plugins = __commonJS({
    "../../node_modules/simple-git/src/lib/plugins/index.js"(exports) {
      "use strict";
      var __createBinding = exports && exports.__createBinding || (Object.create ? function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() {
          return m[k];
        } });
      } : function(o, m, k, k2) {
        if (k2 === void 0)
          k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = exports && exports.__exportStar || function(m, exports2) {
        for (var p in m)
          if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
            __createBinding(exports2, m, p);
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      __exportStar(require_command_config_prefixing_plugin(), exports);
      __exportStar(require_error_detection_plugin(), exports);
      __exportStar(require_plugin_store(), exports);
      __exportStar(require_progress_monitor_plugin(), exports);
      __exportStar(require_simple_git_plugin(), exports);
      __exportStar(require_spawn_options_plugin(), exports);
      __exportStar(require_timout_plugin(), exports);
    }
  });

  // ../../node_modules/simple-git/src/lib/git-logger.js
  var require_git_logger = __commonJS({
    "../../node_modules/simple-git/src/lib/git-logger.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitLogger = exports.createLogger = void 0;
      var debug_1 = require_src();
      var utils_1 = require_utils();
      debug_1.default.formatters.L = (value) => String(utils_1.filterHasLength(value) ? value.length : "-");
      debug_1.default.formatters.B = (value) => {
        if (Buffer.isBuffer(value)) {
          return value.toString("utf8");
        }
        return utils_1.objectToString(value);
      };
      function createLog() {
        return debug_1.default("simple-git");
      }
      function prefixedLogger(to, prefix, forward) {
        if (!prefix || !String(prefix).replace(/\s*/, "")) {
          return !forward ? to : (message, ...args) => {
            to(message, ...args);
            forward(message, ...args);
          };
        }
        return (message, ...args) => {
          to(`%s ${message}`, prefix, ...args);
          if (forward) {
            forward(message, ...args);
          }
        };
      }
      function childLoggerName(name, childDebugger, { namespace: parentNamespace }) {
        if (typeof name === "string") {
          return name;
        }
        const childNamespace = childDebugger && childDebugger.namespace || "";
        if (childNamespace.startsWith(parentNamespace)) {
          return childNamespace.substr(parentNamespace.length + 1);
        }
        return childNamespace || parentNamespace;
      }
      function createLogger(label, verbose, initialStep, infoDebugger = createLog()) {
        const labelPrefix = label && `[${label}]` || "";
        const spawned = [];
        const debugDebugger = typeof verbose === "string" ? infoDebugger.extend(verbose) : verbose;
        const key = childLoggerName(utils_1.filterType(verbose, utils_1.filterString), debugDebugger, infoDebugger);
        return step(initialStep);
        function sibling(name, initial) {
          return utils_1.append(spawned, createLogger(label, key.replace(/^[^:]+/, name), initial, infoDebugger));
        }
        function step(phase) {
          const stepPrefix = phase && `[${phase}]` || "";
          const debug = debugDebugger && prefixedLogger(debugDebugger, stepPrefix) || utils_1.NOOP;
          const info = prefixedLogger(infoDebugger, `${labelPrefix} ${stepPrefix}`, debug);
          return Object.assign(debugDebugger ? debug : info, {
            label,
            sibling,
            info,
            step
          });
        }
      }
      exports.createLogger = createLogger;
      var GitLogger = class {
        constructor(_out = createLog()) {
          this._out = _out;
          this.error = prefixedLogger(_out, "[ERROR]");
          this.warn = prefixedLogger(_out, "[WARN]");
        }
        silent(silence = false) {
          if (silence !== this._out.enabled) {
            return;
          }
          const { namespace } = this._out;
          const env = (process.env.DEBUG || "").split(",").filter((s) => !!s);
          const hasOn = env.includes(namespace);
          const hasOff = env.includes(`-${namespace}`);
          if (!silence) {
            if (hasOff) {
              utils_1.remove(env, `-${namespace}`);
            } else {
              env.push(namespace);
            }
          } else {
            if (hasOn) {
              utils_1.remove(env, namespace);
            } else {
              env.push(`-${namespace}`);
            }
          }
          debug_1.default.enable(env.join(","));
        }
      };
      exports.GitLogger = GitLogger;
    }
  });

  // ../../node_modules/simple-git/src/lib/runners/tasks-pending-queue.js
  var require_tasks_pending_queue = __commonJS({
    "../../node_modules/simple-git/src/lib/runners/tasks-pending-queue.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.TasksPendingQueue = void 0;
      var git_error_1 = require_git_error();
      var git_logger_1 = require_git_logger();
      var TasksPendingQueue = class {
        constructor(logLabel = "GitExecutor") {
          this.logLabel = logLabel;
          this._queue = new Map();
        }
        withProgress(task) {
          return this._queue.get(task);
        }
        createProgress(task) {
          const name = TasksPendingQueue.getName(task.commands[0]);
          const logger = git_logger_1.createLogger(this.logLabel, name);
          return {
            task,
            logger,
            name
          };
        }
        push(task) {
          const progress = this.createProgress(task);
          progress.logger("Adding task to the queue, commands = %o", task.commands);
          this._queue.set(task, progress);
          return progress;
        }
        fatal(err) {
          for (const [task, { logger }] of Array.from(this._queue.entries())) {
            if (task === err.task) {
              logger.info(`Failed %o`, err);
              logger(`Fatal exception, any as-yet un-started tasks run through this executor will not be attempted`);
            } else {
              logger.info(`A fatal exception occurred in a previous task, the queue has been purged: %o`, err.message);
            }
            this.complete(task);
          }
          if (this._queue.size !== 0) {
            throw new Error(`Queue size should be zero after fatal: ${this._queue.size}`);
          }
        }
        complete(task) {
          const progress = this.withProgress(task);
          if (progress) {
            this._queue.delete(task);
          }
        }
        attempt(task) {
          const progress = this.withProgress(task);
          if (!progress) {
            throw new git_error_1.GitError(void 0, "TasksPendingQueue: attempt called for an unknown task");
          }
          progress.logger("Starting task");
          return progress;
        }
        static getName(name = "empty") {
          return `task:${name}:${++TasksPendingQueue.counter}`;
        }
      };
      exports.TasksPendingQueue = TasksPendingQueue;
      TasksPendingQueue.counter = 0;
    }
  });

  // ../../node_modules/simple-git/src/lib/runners/git-executor-chain.js
  var require_git_executor_chain = __commonJS({
    "../../node_modules/simple-git/src/lib/runners/git-executor-chain.js"(exports) {
      "use strict";
      var __awaiter = exports && exports.__awaiter || function(thisArg, _arguments, P, generator) {
        function adopt(value) {
          return value instanceof P ? value : new P(function(resolve) {
            resolve(value);
          });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
          function fulfilled(value) {
            try {
              step(generator.next(value));
            } catch (e) {
              reject(e);
            }
          }
          function rejected(value) {
            try {
              step(generator["throw"](value));
            } catch (e) {
              reject(e);
            }
          }
          function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
          }
          step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitExecutorChain = void 0;
      var child_process_1 = __require("child_process");
      var git_error_1 = require_git_error();
      var task_1 = require_task();
      var utils_1 = require_utils();
      var tasks_pending_queue_1 = require_tasks_pending_queue();
      var GitExecutorChain = class {
        constructor(_executor, _scheduler, _plugins) {
          this._executor = _executor;
          this._scheduler = _scheduler;
          this._plugins = _plugins;
          this._chain = Promise.resolve();
          this._queue = new tasks_pending_queue_1.TasksPendingQueue();
        }
        get binary() {
          return this._executor.binary;
        }
        get cwd() {
          return this._cwd || this._executor.cwd;
        }
        set cwd(cwd) {
          this._cwd = cwd;
        }
        get env() {
          return this._executor.env;
        }
        get outputHandler() {
          return this._executor.outputHandler;
        }
        chain() {
          return this;
        }
        push(task) {
          this._queue.push(task);
          return this._chain = this._chain.then(() => this.attemptTask(task));
        }
        attemptTask(task) {
          return __awaiter(this, void 0, void 0, function* () {
            const onScheduleComplete = yield this._scheduler.next();
            const onQueueComplete = () => this._queue.complete(task);
            try {
              const { logger } = this._queue.attempt(task);
              return yield task_1.isEmptyTask(task) ? this.attemptEmptyTask(task, logger) : this.attemptRemoteTask(task, logger);
            } catch (e) {
              throw this.onFatalException(task, e);
            } finally {
              onQueueComplete();
              onScheduleComplete();
            }
          });
        }
        onFatalException(task, e) {
          const gitError = e instanceof git_error_1.GitError ? Object.assign(e, { task }) : new git_error_1.GitError(task, e && String(e));
          this._chain = Promise.resolve();
          this._queue.fatal(gitError);
          return gitError;
        }
        attemptRemoteTask(task, logger) {
          return __awaiter(this, void 0, void 0, function* () {
            const args = this._plugins.exec("spawn.args", [...task.commands], pluginContext(task, task.commands));
            const raw = yield this.gitResponse(task, this.binary, args, this.outputHandler, logger.step("SPAWN"));
            const outputStreams = yield this.handleTaskData(task, args, raw, logger.step("HANDLE"));
            logger(`passing response to task's parser as a %s`, task.format);
            if (task_1.isBufferTask(task)) {
              return utils_1.callTaskParser(task.parser, outputStreams);
            }
            return utils_1.callTaskParser(task.parser, outputStreams.asStrings());
          });
        }
        attemptEmptyTask(task, logger) {
          return __awaiter(this, void 0, void 0, function* () {
            logger(`empty task bypassing child process to call to task's parser`);
            return task.parser(this);
          });
        }
        handleTaskData(task, args, result, logger) {
          const { exitCode, rejection, stdOut, stdErr } = result;
          return new Promise((done, fail) => {
            logger(`Preparing to handle process response exitCode=%d stdOut=`, exitCode);
            const { error } = this._plugins.exec("task.error", { error: rejection }, Object.assign(Object.assign({}, pluginContext(task, args)), result));
            if (error && task.onError) {
              logger.info(`exitCode=%s handling with custom error handler`);
              return task.onError(result, error, (newStdOut) => {
                logger.info(`custom error handler treated as success`);
                logger(`custom error returned a %s`, utils_1.objectToString(newStdOut));
                done(new utils_1.GitOutputStreams(Array.isArray(newStdOut) ? Buffer.concat(newStdOut) : newStdOut, Buffer.concat(stdErr)));
              }, fail);
            }
            if (error) {
              logger.info(`handling as error: exitCode=%s stdErr=%s rejection=%o`, exitCode, stdErr.length, rejection);
              return fail(error);
            }
            logger.info(`retrieving task output complete`);
            done(new utils_1.GitOutputStreams(Buffer.concat(stdOut), Buffer.concat(stdErr)));
          });
        }
        gitResponse(task, command, args, outputHandler, logger) {
          return __awaiter(this, void 0, void 0, function* () {
            const outputLogger = logger.sibling("output");
            const spawnOptions = this._plugins.exec("spawn.options", {
              cwd: this.cwd,
              env: this.env,
              windowsHide: true
            }, pluginContext(task, task.commands));
            return new Promise((done) => {
              const stdOut = [];
              const stdErr = [];
              let attempted = false;
              let rejection;
              function attemptClose(exitCode, event = "retry") {
                if (attempted || stdErr.length || stdOut.length) {
                  logger.info(`exitCode=%s event=%s rejection=%o`, exitCode, event, rejection);
                  done({
                    stdOut,
                    stdErr,
                    exitCode,
                    rejection
                  });
                  attempted = true;
                }
                if (!attempted) {
                  attempted = true;
                  setTimeout(() => attemptClose(exitCode, "deferred"), 50);
                  logger("received %s event before content on stdOut/stdErr", event);
                }
              }
              logger.info(`%s %o`, command, args);
              logger("%O", spawnOptions);
              const spawned = child_process_1.spawn(command, args, spawnOptions);
              spawned.stdout.on("data", onDataReceived(stdOut, "stdOut", logger, outputLogger.step("stdOut")));
              spawned.stderr.on("data", onDataReceived(stdErr, "stdErr", logger, outputLogger.step("stdErr")));
              spawned.on("error", onErrorReceived(stdErr, logger));
              spawned.on("close", (code) => attemptClose(code, "close"));
              spawned.on("exit", (code) => attemptClose(code, "exit"));
              if (outputHandler) {
                logger(`Passing child process stdOut/stdErr to custom outputHandler`);
                outputHandler(command, spawned.stdout, spawned.stderr, [...args]);
              }
              this._plugins.exec("spawn.after", void 0, Object.assign(Object.assign({}, pluginContext(task, args)), { spawned, kill(reason) {
                if (spawned.killed) {
                  return;
                }
                rejection = reason;
                spawned.kill("SIGINT");
              } }));
            });
          });
        }
      };
      exports.GitExecutorChain = GitExecutorChain;
      function pluginContext(task, commands) {
        return {
          method: utils_1.first(task.commands) || "",
          commands
        };
      }
      function onErrorReceived(target, logger) {
        return (err) => {
          logger(`[ERROR] child process exception %o`, err);
          target.push(Buffer.from(String(err.stack), "ascii"));
        };
      }
      function onDataReceived(target, name, logger, output) {
        return (buffer) => {
          logger(`%s received %L bytes`, name, buffer);
          output(`%B`, buffer);
          target.push(buffer);
        };
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/runners/git-executor.js
  var require_git_executor = __commonJS({
    "../../node_modules/simple-git/src/lib/runners/git-executor.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.GitExecutor = void 0;
      var git_executor_chain_1 = require_git_executor_chain();
      var GitExecutor = class {
        constructor(binary = "git", cwd, _scheduler, _plugins) {
          this.binary = binary;
          this.cwd = cwd;
          this._scheduler = _scheduler;
          this._plugins = _plugins;
          this._chain = new git_executor_chain_1.GitExecutorChain(this, this._scheduler, this._plugins);
        }
        chain() {
          return new git_executor_chain_1.GitExecutorChain(this, this._scheduler, this._plugins);
        }
        push(task) {
          return this._chain.push(task);
        }
      };
      exports.GitExecutor = GitExecutor;
    }
  });

  // ../../node_modules/simple-git/src/lib/task-callback.js
  var require_task_callback = __commonJS({
    "../../node_modules/simple-git/src/lib/task-callback.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.taskCallback = void 0;
      var git_response_error_1 = require_git_response_error();
      var utils_1 = require_utils();
      function taskCallback(task, response, callback = utils_1.NOOP) {
        const onSuccess = (data) => {
          callback(null, data);
        };
        const onError = (err) => {
          if ((err === null || err === void 0 ? void 0 : err.task) === task) {
            callback(err instanceof git_response_error_1.GitResponseError ? addDeprecationNoticeToError(err) : err, void 0);
          }
        };
        response.then(onSuccess, onError);
      }
      exports.taskCallback = taskCallback;
      function addDeprecationNoticeToError(err) {
        let log = (name) => {
          console.warn(`simple-git deprecation notice: accessing GitResponseError.${name} should be GitResponseError.git.${name}, this will no longer be available in version 3`);
          log = utils_1.NOOP;
        };
        return Object.create(err, Object.getOwnPropertyNames(err.git).reduce(descriptorReducer, {}));
        function descriptorReducer(all, name) {
          if (name in err) {
            return all;
          }
          all[name] = {
            enumerable: false,
            configurable: false,
            get() {
              log(name);
              return err.git[name];
            }
          };
          return all;
        }
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/change-working-directory.js
  var require_change_working_directory = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/change-working-directory.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.changeWorkingDirectoryTask = void 0;
      var utils_1 = require_utils();
      var task_1 = require_task();
      function changeWorkingDirectoryTask(directory, root) {
        return task_1.adhocExecTask((instance) => {
          if (!utils_1.folderExists(directory)) {
            throw new Error(`Git.cwd: cannot change to non-directory "${directory}"`);
          }
          return (root || instance).cwd = directory;
        });
      }
      exports.changeWorkingDirectoryTask = changeWorkingDirectoryTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/hash-object.js
  var require_hash_object = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/hash-object.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hashObjectTask = void 0;
      var task_1 = require_task();
      function hashObjectTask(filePath, write) {
        const commands = ["hash-object", filePath];
        if (write) {
          commands.push("-w");
        }
        return task_1.straightThroughStringTask(commands, true);
      }
      exports.hashObjectTask = hashObjectTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/InitSummary.js
  var require_InitSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/InitSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseInit = exports.InitSummary = void 0;
      var InitSummary = class {
        constructor(bare, path3, existing, gitDir) {
          this.bare = bare;
          this.path = path3;
          this.existing = existing;
          this.gitDir = gitDir;
        }
      };
      exports.InitSummary = InitSummary;
      var initResponseRegex = /^Init.+ repository in (.+)$/;
      var reInitResponseRegex = /^Rein.+ in (.+)$/;
      function parseInit(bare, path3, text) {
        const response = String(text).trim();
        let result;
        if (result = initResponseRegex.exec(response)) {
          return new InitSummary(bare, path3, false, result[1]);
        }
        if (result = reInitResponseRegex.exec(response)) {
          return new InitSummary(bare, path3, true, result[1]);
        }
        let gitDir = "";
        const tokens = response.split(" ");
        while (tokens.length) {
          const token = tokens.shift();
          if (token === "in") {
            gitDir = tokens.join(" ");
            break;
          }
        }
        return new InitSummary(bare, path3, /^re/i.test(response), gitDir);
      }
      exports.parseInit = parseInit;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/init.js
  var require_init = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/init.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.initTask = void 0;
      var InitSummary_1 = require_InitSummary();
      var bareCommand = "--bare";
      function hasBareCommand(command) {
        return command.includes(bareCommand);
      }
      function initTask(bare = false, path3, customArgs) {
        const commands = ["init", ...customArgs];
        if (bare && !hasBareCommand(commands)) {
          commands.splice(1, 0, bareCommand);
        }
        return {
          commands,
          format: "utf-8",
          parser(text) {
            return InitSummary_1.parseInit(commands.includes("--bare"), path3, text);
          }
        };
      }
      exports.initTask = initTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/DiffSummary.js
  var require_DiffSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/DiffSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.DiffSummary = void 0;
      var DiffSummary = class {
        constructor() {
          this.changed = 0;
          this.deletions = 0;
          this.insertions = 0;
          this.files = [];
        }
      };
      exports.DiffSummary = DiffSummary;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-diff-summary.js
  var require_parse_diff_summary = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-diff-summary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseDiffResult = void 0;
      var DiffSummary_1 = require_DiffSummary();
      function parseDiffResult(stdOut) {
        const lines = stdOut.trim().split("\n");
        const status = new DiffSummary_1.DiffSummary();
        readSummaryLine(status, lines.pop());
        for (let i = 0, max = lines.length; i < max; i++) {
          const line = lines[i];
          textFileChange(line, status) || binaryFileChange(line, status);
        }
        return status;
      }
      exports.parseDiffResult = parseDiffResult;
      function readSummaryLine(status, summary) {
        (summary || "").trim().split(", ").forEach(function(text) {
          const summary2 = /(\d+)\s([a-z]+)/.exec(text);
          if (!summary2) {
            return;
          }
          summaryType(status, summary2[2], parseInt(summary2[1], 10));
        });
      }
      function summaryType(status, key, value) {
        const match = /([a-z]+?)s?\b/.exec(key);
        if (!match || !statusUpdate[match[1]]) {
          return;
        }
        statusUpdate[match[1]](status, value);
      }
      var statusUpdate = {
        file(status, value) {
          status.changed = value;
        },
        deletion(status, value) {
          status.deletions = value;
        },
        insertion(status, value) {
          status.insertions = value;
        }
      };
      function textFileChange(input, { files }) {
        const line = input.trim().match(/^(.+)\s+\|\s+(\d+)(\s+[+\-]+)?$/);
        if (line) {
          var alterations = (line[3] || "").trim();
          files.push({
            file: line[1].trim(),
            changes: parseInt(line[2], 10),
            insertions: alterations.replace(/-/g, "").length,
            deletions: alterations.replace(/\+/g, "").length,
            binary: false
          });
          return true;
        }
        return false;
      }
      function binaryFileChange(input, { files }) {
        const line = input.match(/^(.+) \|\s+Bin ([0-9.]+) -> ([0-9.]+) ([a-z]+)$/);
        if (line) {
          files.push({
            file: line[1].trim(),
            before: +line[2],
            after: +line[3],
            binary: true
          });
          return true;
        }
        return false;
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-list-log-summary.js
  var require_parse_list_log_summary = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-list-log-summary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createListLogSummaryParser = exports.SPLITTER = exports.COMMIT_BOUNDARY = exports.START_BOUNDARY = void 0;
      var utils_1 = require_utils();
      var parse_diff_summary_1 = require_parse_diff_summary();
      exports.START_BOUNDARY = "\xF2\xF2\xF2\xF2\xF2\xF2 ";
      exports.COMMIT_BOUNDARY = " \xF2\xF2";
      exports.SPLITTER = " \xF2 ";
      var defaultFieldNames = ["hash", "date", "message", "refs", "author_name", "author_email"];
      function lineBuilder(tokens, fields) {
        return fields.reduce((line, field, index) => {
          line[field] = tokens[index] || "";
          return line;
        }, Object.create({ diff: null }));
      }
      function createListLogSummaryParser(splitter = exports.SPLITTER, fields = defaultFieldNames) {
        return function(stdOut) {
          const all = utils_1.toLinesWithContent(stdOut, true, exports.START_BOUNDARY).map(function(item) {
            const lineDetail = item.trim().split(exports.COMMIT_BOUNDARY);
            const listLogLine = lineBuilder(lineDetail[0].trim().split(splitter), fields);
            if (lineDetail.length > 1 && !!lineDetail[1].trim()) {
              listLogLine.diff = parse_diff_summary_1.parseDiffResult(lineDetail[1]);
            }
            return listLogLine;
          });
          return {
            all,
            latest: all.length && all[0] || null,
            total: all.length
          };
        };
      }
      exports.createListLogSummaryParser = createListLogSummaryParser;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/log.js
  var require_log = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/log.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.logTask = exports.parseLogOptions = void 0;
      var parse_list_log_summary_1 = require_parse_list_log_summary();
      var utils_1 = require_utils();
      var task_1 = require_task();
      var excludeOptions;
      (function(excludeOptions2) {
        excludeOptions2[excludeOptions2["--pretty"] = 0] = "--pretty";
        excludeOptions2[excludeOptions2["max-count"] = 1] = "max-count";
        excludeOptions2[excludeOptions2["maxCount"] = 2] = "maxCount";
        excludeOptions2[excludeOptions2["n"] = 3] = "n";
        excludeOptions2[excludeOptions2["file"] = 4] = "file";
        excludeOptions2[excludeOptions2["format"] = 5] = "format";
        excludeOptions2[excludeOptions2["from"] = 6] = "from";
        excludeOptions2[excludeOptions2["to"] = 7] = "to";
        excludeOptions2[excludeOptions2["splitter"] = 8] = "splitter";
        excludeOptions2[excludeOptions2["symmetric"] = 9] = "symmetric";
        excludeOptions2[excludeOptions2["mailMap"] = 10] = "mailMap";
        excludeOptions2[excludeOptions2["multiLine"] = 11] = "multiLine";
        excludeOptions2[excludeOptions2["strictDate"] = 12] = "strictDate";
      })(excludeOptions || (excludeOptions = {}));
      function prettyFormat(format, splitter) {
        const fields = [];
        const formatStr = [];
        Object.keys(format).forEach((field) => {
          fields.push(field);
          formatStr.push(String(format[field]));
        });
        return [
          fields,
          formatStr.join(splitter)
        ];
      }
      function userOptions(input) {
        const output = Object.assign({}, input);
        Object.keys(input).forEach((key) => {
          if (key in excludeOptions) {
            delete output[key];
          }
        });
        return output;
      }
      function parseLogOptions(opt = {}, customArgs = []) {
        const splitter = opt.splitter || parse_list_log_summary_1.SPLITTER;
        const format = opt.format || {
          hash: "%H",
          date: opt.strictDate === false ? "%ai" : "%aI",
          message: "%s",
          refs: "%D",
          body: opt.multiLine ? "%B" : "%b",
          author_name: opt.mailMap !== false ? "%aN" : "%an",
          author_email: opt.mailMap !== false ? "%aE" : "%ae"
        };
        const [fields, formatStr] = prettyFormat(format, splitter);
        const suffix = [];
        const command = [
          `--pretty=format:${parse_list_log_summary_1.START_BOUNDARY}${formatStr}${parse_list_log_summary_1.COMMIT_BOUNDARY}`,
          ...customArgs
        ];
        const maxCount = opt.n || opt["max-count"] || opt.maxCount;
        if (maxCount) {
          command.push(`--max-count=${maxCount}`);
        }
        if (opt.from && opt.to) {
          const rangeOperator = opt.symmetric !== false ? "..." : "..";
          suffix.push(`${opt.from}${rangeOperator}${opt.to}`);
        }
        if (opt.file) {
          suffix.push("--follow", opt.file);
        }
        utils_1.appendTaskOptions(userOptions(opt), command);
        return {
          fields,
          splitter,
          commands: [
            ...command,
            ...suffix
          ]
        };
      }
      exports.parseLogOptions = parseLogOptions;
      function logTask(splitter, fields, customArgs) {
        return {
          commands: ["log", ...customArgs],
          format: "utf-8",
          parser: parse_list_log_summary_1.createListLogSummaryParser(splitter, fields)
        };
      }
      exports.logTask = logTask;
      function default_1() {
        return {
          log(...rest) {
            const next = utils_1.trailingFunctionArgument(arguments);
            const task = rejectDeprecatedSignatures(...rest) || createLogTask(parseLogOptions(utils_1.trailingOptionsArgument(arguments), utils_1.filterType(arguments[0], utils_1.filterArray)));
            return this._runTask(task, next);
          }
        };
        function createLogTask(options) {
          return logTask(options.splitter, options.fields, options.commands);
        }
        function rejectDeprecatedSignatures(from, to) {
          return utils_1.filterString(from) && utils_1.filterString(to) && task_1.configurationErrorTask(`git.log(string, string) should be replaced with git.log({ from: string, to: string })`);
        }
      }
      exports.default = default_1;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/MergeSummary.js
  var require_MergeSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/MergeSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.MergeSummaryDetail = exports.MergeSummaryConflict = void 0;
      var MergeSummaryConflict = class {
        constructor(reason, file = null, meta) {
          this.reason = reason;
          this.file = file;
          this.meta = meta;
        }
        toString() {
          return `${this.file}:${this.reason}`;
        }
      };
      exports.MergeSummaryConflict = MergeSummaryConflict;
      var MergeSummaryDetail = class {
        constructor() {
          this.conflicts = [];
          this.merges = [];
          this.result = "success";
        }
        get failed() {
          return this.conflicts.length > 0;
        }
        get reason() {
          return this.result;
        }
        toString() {
          if (this.conflicts.length) {
            return `CONFLICTS: ${this.conflicts.join(", ")}`;
          }
          return "OK";
        }
      };
      exports.MergeSummaryDetail = MergeSummaryDetail;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/PullSummary.js
  var require_PullSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/PullSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.PullSummary = void 0;
      var PullSummary = class {
        constructor() {
          this.remoteMessages = {
            all: []
          };
          this.created = [];
          this.deleted = [];
          this.files = [];
          this.deletions = {};
          this.insertions = {};
          this.summary = {
            changes: 0,
            deletions: 0,
            insertions: 0
          };
        }
      };
      exports.PullSummary = PullSummary;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-remote-objects.js
  var require_parse_remote_objects = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-remote-objects.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.remoteMessagesObjectParsers = void 0;
      var utils_1 = require_utils();
      function objectEnumerationResult(remoteMessages) {
        return remoteMessages.objects = remoteMessages.objects || {
          compressing: 0,
          counting: 0,
          enumerating: 0,
          packReused: 0,
          reused: { count: 0, delta: 0 },
          total: { count: 0, delta: 0 }
        };
      }
      function asObjectCount(source) {
        const count = /^\s*(\d+)/.exec(source);
        const delta = /delta (\d+)/i.exec(source);
        return {
          count: utils_1.asNumber(count && count[1] || "0"),
          delta: utils_1.asNumber(delta && delta[1] || "0")
        };
      }
      exports.remoteMessagesObjectParsers = [
        new utils_1.RemoteLineParser(/^remote:\s*(enumerating|counting|compressing) objects: (\d+),/i, (result, [action, count]) => {
          const key = action.toLowerCase();
          const enumeration = objectEnumerationResult(result.remoteMessages);
          Object.assign(enumeration, { [key]: utils_1.asNumber(count) });
        }),
        new utils_1.RemoteLineParser(/^remote:\s*(enumerating|counting|compressing) objects: \d+% \(\d+\/(\d+)\),/i, (result, [action, count]) => {
          const key = action.toLowerCase();
          const enumeration = objectEnumerationResult(result.remoteMessages);
          Object.assign(enumeration, { [key]: utils_1.asNumber(count) });
        }),
        new utils_1.RemoteLineParser(/total ([^,]+), reused ([^,]+), pack-reused (\d+)/i, (result, [total, reused, packReused]) => {
          const objects = objectEnumerationResult(result.remoteMessages);
          objects.total = asObjectCount(total);
          objects.reused = asObjectCount(reused);
          objects.packReused = utils_1.asNumber(packReused);
        })
      ];
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-remote-messages.js
  var require_parse_remote_messages = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-remote-messages.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.RemoteMessageSummary = exports.parseRemoteMessages = void 0;
      var utils_1 = require_utils();
      var parse_remote_objects_1 = require_parse_remote_objects();
      var parsers = [
        new utils_1.RemoteLineParser(/^remote:\s*(.+)$/, (result, [text]) => {
          result.remoteMessages.all.push(text.trim());
          return false;
        }),
        ...parse_remote_objects_1.remoteMessagesObjectParsers,
        new utils_1.RemoteLineParser([/create a (?:pull|merge) request/i, /\s(https?:\/\/\S+)$/], (result, [pullRequestUrl]) => {
          result.remoteMessages.pullRequestUrl = pullRequestUrl;
        }),
        new utils_1.RemoteLineParser([/found (\d+) vulnerabilities.+\(([^)]+)\)/i, /\s(https?:\/\/\S+)$/], (result, [count, summary, url]) => {
          result.remoteMessages.vulnerabilities = {
            count: utils_1.asNumber(count),
            summary,
            url
          };
        })
      ];
      function parseRemoteMessages(_stdOut, stdErr) {
        return utils_1.parseStringResponse({ remoteMessages: new RemoteMessageSummary() }, parsers, stdErr);
      }
      exports.parseRemoteMessages = parseRemoteMessages;
      var RemoteMessageSummary = class {
        constructor() {
          this.all = [];
        }
      };
      exports.RemoteMessageSummary = RemoteMessageSummary;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-pull.js
  var require_parse_pull = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-pull.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parsePullResult = exports.parsePullDetail = void 0;
      var PullSummary_1 = require_PullSummary();
      var utils_1 = require_utils();
      var parse_remote_messages_1 = require_parse_remote_messages();
      var FILE_UPDATE_REGEX = /^\s*(.+?)\s+\|\s+\d+\s*(\+*)(-*)/;
      var SUMMARY_REGEX = /(\d+)\D+((\d+)\D+\(\+\))?(\D+(\d+)\D+\(-\))?/;
      var ACTION_REGEX = /^(create|delete) mode \d+ (.+)/;
      var parsers = [
        new utils_1.LineParser(FILE_UPDATE_REGEX, (result, [file, insertions, deletions]) => {
          result.files.push(file);
          if (insertions) {
            result.insertions[file] = insertions.length;
          }
          if (deletions) {
            result.deletions[file] = deletions.length;
          }
        }),
        new utils_1.LineParser(SUMMARY_REGEX, (result, [changes, , insertions, , deletions]) => {
          if (insertions !== void 0 || deletions !== void 0) {
            result.summary.changes = +changes || 0;
            result.summary.insertions = +insertions || 0;
            result.summary.deletions = +deletions || 0;
            return true;
          }
          return false;
        }),
        new utils_1.LineParser(ACTION_REGEX, (result, [action, file]) => {
          utils_1.append(result.files, file);
          utils_1.append(action === "create" ? result.created : result.deleted, file);
        })
      ];
      var parsePullDetail = (stdOut, stdErr) => {
        return utils_1.parseStringResponse(new PullSummary_1.PullSummary(), parsers, stdOut, stdErr);
      };
      exports.parsePullDetail = parsePullDetail;
      var parsePullResult = (stdOut, stdErr) => {
        return Object.assign(new PullSummary_1.PullSummary(), exports.parsePullDetail(stdOut, stdErr), parse_remote_messages_1.parseRemoteMessages(stdOut, stdErr));
      };
      exports.parsePullResult = parsePullResult;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-merge.js
  var require_parse_merge = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-merge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseMergeDetail = exports.parseMergeResult = void 0;
      var MergeSummary_1 = require_MergeSummary();
      var utils_1 = require_utils();
      var parse_pull_1 = require_parse_pull();
      var parsers = [
        new utils_1.LineParser(/^Auto-merging\s+(.+)$/, (summary, [autoMerge]) => {
          summary.merges.push(autoMerge);
        }),
        new utils_1.LineParser(/^CONFLICT\s+\((.+)\): Merge conflict in (.+)$/, (summary, [reason, file]) => {
          summary.conflicts.push(new MergeSummary_1.MergeSummaryConflict(reason, file));
        }),
        new utils_1.LineParser(/^CONFLICT\s+\((.+\/delete)\): (.+) deleted in (.+) and/, (summary, [reason, file, deleteRef]) => {
          summary.conflicts.push(new MergeSummary_1.MergeSummaryConflict(reason, file, { deleteRef }));
        }),
        new utils_1.LineParser(/^CONFLICT\s+\((.+)\):/, (summary, [reason]) => {
          summary.conflicts.push(new MergeSummary_1.MergeSummaryConflict(reason, null));
        }),
        new utils_1.LineParser(/^Automatic merge failed;\s+(.+)$/, (summary, [result]) => {
          summary.result = result;
        })
      ];
      var parseMergeResult = (stdOut, stdErr) => {
        return Object.assign(exports.parseMergeDetail(stdOut, stdErr), parse_pull_1.parsePullResult(stdOut, stdErr));
      };
      exports.parseMergeResult = parseMergeResult;
      var parseMergeDetail = (stdOut) => {
        return utils_1.parseStringResponse(new MergeSummary_1.MergeSummaryDetail(), parsers, stdOut);
      };
      exports.parseMergeDetail = parseMergeDetail;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/merge.js
  var require_merge = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/merge.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.mergeTask = void 0;
      var git_response_error_1 = require_git_response_error();
      var parse_merge_1 = require_parse_merge();
      var task_1 = require_task();
      function mergeTask(customArgs) {
        if (!customArgs.length) {
          return task_1.configurationErrorTask("Git.merge requires at least one option");
        }
        return {
          commands: ["merge", ...customArgs],
          format: "utf-8",
          parser(stdOut, stdErr) {
            const merge = parse_merge_1.parseMergeResult(stdOut, stdErr);
            if (merge.failed) {
              throw new git_response_error_1.GitResponseError(merge);
            }
            return merge;
          }
        };
      }
      exports.mergeTask = mergeTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-push.js
  var require_parse_push = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-push.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parsePushDetail = exports.parsePushResult = void 0;
      var utils_1 = require_utils();
      var parse_remote_messages_1 = require_parse_remote_messages();
      function pushResultPushedItem(local, remote, status) {
        const deleted = status.includes("deleted");
        const tag = status.includes("tag") || /^refs\/tags/.test(local);
        const alreadyUpdated = !status.includes("new");
        return {
          deleted,
          tag,
          branch: !tag,
          new: !alreadyUpdated,
          alreadyUpdated,
          local,
          remote
        };
      }
      var parsers = [
        new utils_1.LineParser(/^Pushing to (.+)$/, (result, [repo]) => {
          result.repo = repo;
        }),
        new utils_1.LineParser(/^updating local tracking ref '(.+)'/, (result, [local]) => {
          result.ref = Object.assign(Object.assign({}, result.ref || {}), { local });
        }),
        new utils_1.LineParser(/^[*-=]\s+([^:]+):(\S+)\s+\[(.+)]$/, (result, [local, remote, type]) => {
          result.pushed.push(pushResultPushedItem(local, remote, type));
        }),
        new utils_1.LineParser(/^Branch '([^']+)' set up to track remote branch '([^']+)' from '([^']+)'/, (result, [local, remote, remoteName]) => {
          result.branch = Object.assign(Object.assign({}, result.branch || {}), {
            local,
            remote,
            remoteName
          });
        }),
        new utils_1.LineParser(/^([^:]+):(\S+)\s+([a-z0-9]+)\.\.([a-z0-9]+)$/, (result, [local, remote, from, to]) => {
          result.update = {
            head: {
              local,
              remote
            },
            hash: {
              from,
              to
            }
          };
        })
      ];
      var parsePushResult = (stdOut, stdErr) => {
        const pushDetail = exports.parsePushDetail(stdOut, stdErr);
        const responseDetail = parse_remote_messages_1.parseRemoteMessages(stdOut, stdErr);
        return Object.assign(Object.assign({}, pushDetail), responseDetail);
      };
      exports.parsePushResult = parsePushResult;
      var parsePushDetail = (stdOut, stdErr) => {
        return utils_1.parseStringResponse({ pushed: [] }, parsers, stdOut, stdErr);
      };
      exports.parsePushDetail = parsePushDetail;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/push.js
  var require_push = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/push.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pushTask = exports.pushTagsTask = void 0;
      var parse_push_1 = require_parse_push();
      var utils_1 = require_utils();
      function pushTagsTask(ref = {}, customArgs) {
        utils_1.append(customArgs, "--tags");
        return pushTask(ref, customArgs);
      }
      exports.pushTagsTask = pushTagsTask;
      function pushTask(ref = {}, customArgs) {
        const commands = ["push", ...customArgs];
        if (ref.branch) {
          commands.splice(1, 0, ref.branch);
        }
        if (ref.remote) {
          commands.splice(1, 0, ref.remote);
        }
        utils_1.remove(commands, "-v");
        utils_1.append(commands, "--verbose");
        utils_1.append(commands, "--porcelain");
        return {
          commands,
          format: "utf-8",
          parser: parse_push_1.parsePushResult
        };
      }
      exports.pushTask = pushTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/FileStatusSummary.js
  var require_FileStatusSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/FileStatusSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.FileStatusSummary = exports.fromPathRegex = void 0;
      exports.fromPathRegex = /^(.+) -> (.+)$/;
      var FileStatusSummary = class {
        constructor(path3, index, working_dir) {
          this.path = path3;
          this.index = index;
          this.working_dir = working_dir;
          if (index + working_dir === "R") {
            const detail = exports.fromPathRegex.exec(path3) || [null, path3, path3];
            this.from = detail[1] || "";
            this.path = detail[2] || "";
          }
        }
      };
      exports.FileStatusSummary = FileStatusSummary;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/StatusSummary.js
  var require_StatusSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/StatusSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseStatusSummary = exports.StatusSummary = void 0;
      var utils_1 = require_utils();
      var FileStatusSummary_1 = require_FileStatusSummary();
      var StatusSummary = class {
        constructor() {
          this.not_added = [];
          this.conflicted = [];
          this.created = [];
          this.deleted = [];
          this.modified = [];
          this.renamed = [];
          this.files = [];
          this.staged = [];
          this.ahead = 0;
          this.behind = 0;
          this.current = null;
          this.tracking = null;
        }
        isClean() {
          return !this.files.length;
        }
      };
      exports.StatusSummary = StatusSummary;
      var PorcelainFileStatus;
      (function(PorcelainFileStatus2) {
        PorcelainFileStatus2["ADDED"] = "A";
        PorcelainFileStatus2["DELETED"] = "D";
        PorcelainFileStatus2["MODIFIED"] = "M";
        PorcelainFileStatus2["RENAMED"] = "R";
        PorcelainFileStatus2["COPIED"] = "C";
        PorcelainFileStatus2["UNMERGED"] = "U";
        PorcelainFileStatus2["UNTRACKED"] = "?";
        PorcelainFileStatus2["IGNORED"] = "!";
        PorcelainFileStatus2["NONE"] = " ";
      })(PorcelainFileStatus || (PorcelainFileStatus = {}));
      function renamedFile(line) {
        const detail = /^(.+) -> (.+)$/.exec(line);
        if (!detail) {
          return {
            from: line,
            to: line
          };
        }
        return {
          from: String(detail[1]),
          to: String(detail[2])
        };
      }
      function parser(indexX, indexY, handler) {
        return [`${indexX}${indexY}`, handler];
      }
      function conflicts(indexX, ...indexY) {
        return indexY.map((y) => parser(indexX, y, (result, file) => utils_1.append(result.conflicted, file)));
      }
      var parsers = new Map([
        parser(PorcelainFileStatus.NONE, PorcelainFileStatus.ADDED, (result, file) => utils_1.append(result.created, file)),
        parser(PorcelainFileStatus.NONE, PorcelainFileStatus.DELETED, (result, file) => utils_1.append(result.deleted, file)),
        parser(PorcelainFileStatus.NONE, PorcelainFileStatus.MODIFIED, (result, file) => utils_1.append(result.modified, file)),
        parser(PorcelainFileStatus.ADDED, PorcelainFileStatus.NONE, (result, file) => utils_1.append(result.created, file) && utils_1.append(result.staged, file)),
        parser(PorcelainFileStatus.ADDED, PorcelainFileStatus.MODIFIED, (result, file) => utils_1.append(result.created, file) && utils_1.append(result.staged, file) && utils_1.append(result.modified, file)),
        parser(PorcelainFileStatus.DELETED, PorcelainFileStatus.NONE, (result, file) => utils_1.append(result.deleted, file) && utils_1.append(result.staged, file)),
        parser(PorcelainFileStatus.MODIFIED, PorcelainFileStatus.NONE, (result, file) => utils_1.append(result.modified, file) && utils_1.append(result.staged, file)),
        parser(PorcelainFileStatus.MODIFIED, PorcelainFileStatus.MODIFIED, (result, file) => utils_1.append(result.modified, file) && utils_1.append(result.staged, file)),
        parser(PorcelainFileStatus.RENAMED, PorcelainFileStatus.NONE, (result, file) => {
          utils_1.append(result.renamed, renamedFile(file));
        }),
        parser(PorcelainFileStatus.RENAMED, PorcelainFileStatus.MODIFIED, (result, file) => {
          const renamed = renamedFile(file);
          utils_1.append(result.renamed, renamed);
          utils_1.append(result.modified, renamed.to);
        }),
        parser(PorcelainFileStatus.UNTRACKED, PorcelainFileStatus.UNTRACKED, (result, file) => utils_1.append(result.not_added, file)),
        ...conflicts(PorcelainFileStatus.ADDED, PorcelainFileStatus.ADDED, PorcelainFileStatus.UNMERGED),
        ...conflicts(PorcelainFileStatus.DELETED, PorcelainFileStatus.DELETED, PorcelainFileStatus.UNMERGED),
        ...conflicts(PorcelainFileStatus.UNMERGED, PorcelainFileStatus.ADDED, PorcelainFileStatus.DELETED, PorcelainFileStatus.UNMERGED),
        ["##", (result, line) => {
          const aheadReg = /ahead (\d+)/;
          const behindReg = /behind (\d+)/;
          const currentReg = /^(.+?(?=(?:\.{3}|\s|$)))/;
          const trackingReg = /\.{3}(\S*)/;
          const onEmptyBranchReg = /\son\s([\S]+)$/;
          let regexResult;
          regexResult = aheadReg.exec(line);
          result.ahead = regexResult && +regexResult[1] || 0;
          regexResult = behindReg.exec(line);
          result.behind = regexResult && +regexResult[1] || 0;
          regexResult = currentReg.exec(line);
          result.current = regexResult && regexResult[1];
          regexResult = trackingReg.exec(line);
          result.tracking = regexResult && regexResult[1];
          regexResult = onEmptyBranchReg.exec(line);
          result.current = regexResult && regexResult[1] || result.current;
        }]
      ]);
      var parseStatusSummary = function(text) {
        const lines = text.trim().split("\n");
        const status = new StatusSummary();
        for (let i = 0, l = lines.length; i < l; i++) {
          splitLine(status, lines[i]);
        }
        return status;
      };
      exports.parseStatusSummary = parseStatusSummary;
      function splitLine(result, lineStr) {
        const trimmed = lineStr.trim();
        switch (" ") {
          case trimmed.charAt(2):
            return data(trimmed.charAt(0), trimmed.charAt(1), trimmed.substr(3));
          case trimmed.charAt(1):
            return data(PorcelainFileStatus.NONE, trimmed.charAt(0), trimmed.substr(2));
          default:
            return;
        }
        function data(index, workingDir, path3) {
          const raw = `${index}${workingDir}`;
          const handler = parsers.get(raw);
          if (handler) {
            handler(result, path3);
          }
          if (raw !== "##") {
            result.files.push(new FileStatusSummary_1.FileStatusSummary(path3, index, workingDir));
          }
        }
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/status.js
  var require_status = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/status.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.statusTask = void 0;
      var StatusSummary_1 = require_StatusSummary();
      function statusTask(customArgs) {
        return {
          format: "utf-8",
          commands: ["status", "--porcelain", "-b", "-u", ...customArgs],
          parser(text) {
            return StatusSummary_1.parseStatusSummary(text);
          }
        };
      }
      exports.statusTask = statusTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/simple-git-api.js
  var require_simple_git_api = __commonJS({
    "../../node_modules/simple-git/src/lib/simple-git-api.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.SimpleGitApi = void 0;
      var task_callback_1 = require_task_callback();
      var change_working_directory_1 = require_change_working_directory();
      var config_1 = require_config();
      var hash_object_1 = require_hash_object();
      var init_1 = require_init();
      var log_1 = require_log();
      var merge_1 = require_merge();
      var push_1 = require_push();
      var status_1 = require_status();
      var task_1 = require_task();
      var utils_1 = require_utils();
      var SimpleGitApi = class {
        constructor(_executor) {
          this._executor = _executor;
        }
        _runTask(task, then) {
          const chain = this._executor.chain();
          const promise = chain.push(task);
          if (then) {
            task_callback_1.taskCallback(task, promise, then);
          }
          return Object.create(this, {
            then: { value: promise.then.bind(promise) },
            catch: { value: promise.catch.bind(promise) },
            _executor: { value: chain }
          });
        }
        add(files) {
          return this._runTask(task_1.straightThroughStringTask(["add", ...utils_1.asArray(files)]), utils_1.trailingFunctionArgument(arguments));
        }
        cwd(directory) {
          const next = utils_1.trailingFunctionArgument(arguments);
          if (typeof directory === "string") {
            return this._runTask(change_working_directory_1.changeWorkingDirectoryTask(directory, this._executor), next);
          }
          if (typeof (directory === null || directory === void 0 ? void 0 : directory.path) === "string") {
            return this._runTask(change_working_directory_1.changeWorkingDirectoryTask(directory.path, directory.root && this._executor || void 0), next);
          }
          return this._runTask(task_1.configurationErrorTask("Git.cwd: workingDirectory must be supplied as a string"), next);
        }
        hashObject(path3, write) {
          return this._runTask(hash_object_1.hashObjectTask(path3, write === true), utils_1.trailingFunctionArgument(arguments));
        }
        init(bare) {
          return this._runTask(init_1.initTask(bare === true, this._executor.cwd, utils_1.getTrailingOptions(arguments)), utils_1.trailingFunctionArgument(arguments));
        }
        merge() {
          return this._runTask(merge_1.mergeTask(utils_1.getTrailingOptions(arguments)), utils_1.trailingFunctionArgument(arguments));
        }
        mergeFromTo(remote, branch) {
          if (!(utils_1.filterString(remote) && utils_1.filterString(branch))) {
            return this._runTask(task_1.configurationErrorTask(`Git.mergeFromTo requires that the 'remote' and 'branch' arguments are supplied as strings`));
          }
          return this._runTask(merge_1.mergeTask([remote, branch, ...utils_1.getTrailingOptions(arguments)]), utils_1.trailingFunctionArgument(arguments, false));
        }
        outputHandler(handler) {
          this._executor.outputHandler = handler;
          return this;
        }
        push() {
          const task = push_1.pushTask({
            remote: utils_1.filterType(arguments[0], utils_1.filterString),
            branch: utils_1.filterType(arguments[1], utils_1.filterString)
          }, utils_1.getTrailingOptions(arguments));
          return this._runTask(task, utils_1.trailingFunctionArgument(arguments));
        }
        stash() {
          return this._runTask(task_1.straightThroughStringTask(["stash", ...utils_1.getTrailingOptions(arguments)]), utils_1.trailingFunctionArgument(arguments));
        }
        status() {
          return this._runTask(status_1.statusTask(utils_1.getTrailingOptions(arguments)), utils_1.trailingFunctionArgument(arguments));
        }
      };
      exports.SimpleGitApi = SimpleGitApi;
      Object.assign(SimpleGitApi.prototype, config_1.default(), log_1.default());
    }
  });

  // ../../node_modules/@kwsites/promise-deferred/dist/index.js
  var require_dist2 = __commonJS({
    "../../node_modules/@kwsites/promise-deferred/dist/index.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.createDeferred = exports.deferred = void 0;
      function deferred() {
        let done;
        let fail;
        let status = "pending";
        const promise = new Promise((_done, _fail) => {
          done = _done;
          fail = _fail;
        });
        return {
          promise,
          done(result) {
            if (status === "pending") {
              status = "resolved";
              done(result);
            }
          },
          fail(error) {
            if (status === "pending") {
              status = "rejected";
              fail(error);
            }
          },
          get fulfilled() {
            return status !== "pending";
          },
          get status() {
            return status;
          }
        };
      }
      exports.deferred = deferred;
      exports.createDeferred = deferred;
      exports.default = deferred;
    }
  });

  // ../../node_modules/simple-git/src/lib/runners/scheduler.js
  var require_scheduler = __commonJS({
    "../../node_modules/simple-git/src/lib/runners/scheduler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.Scheduler = void 0;
      var utils_1 = require_utils();
      var promise_deferred_1 = require_dist2();
      var git_logger_1 = require_git_logger();
      var createScheduledTask = (() => {
        let id = 0;
        return () => {
          id++;
          const { promise, done } = promise_deferred_1.createDeferred();
          return {
            promise,
            done,
            id
          };
        };
      })();
      var Scheduler = class {
        constructor(concurrency = 2) {
          this.concurrency = concurrency;
          this.logger = git_logger_1.createLogger("", "scheduler");
          this.pending = [];
          this.running = [];
          this.logger(`Constructed, concurrency=%s`, concurrency);
        }
        schedule() {
          if (!this.pending.length || this.running.length >= this.concurrency) {
            this.logger(`Schedule attempt ignored, pending=%s running=%s concurrency=%s`, this.pending.length, this.running.length, this.concurrency);
            return;
          }
          const task = utils_1.append(this.running, this.pending.shift());
          this.logger(`Attempting id=%s`, task.id);
          task.done(() => {
            this.logger(`Completing id=`, task.id);
            utils_1.remove(this.running, task);
            this.schedule();
          });
        }
        next() {
          const { promise, id } = utils_1.append(this.pending, createScheduledTask());
          this.logger(`Scheduling id=%s`, id);
          this.schedule();
          return promise;
        }
      };
      exports.Scheduler = Scheduler;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/apply-patch.js
  var require_apply_patch = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/apply-patch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.applyPatchTask = void 0;
      var task_1 = require_task();
      function applyPatchTask(patches, customArgs) {
        return task_1.straightThroughStringTask(["apply", ...customArgs, ...patches]);
      }
      exports.applyPatchTask = applyPatchTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/BranchDeleteSummary.js
  var require_BranchDeleteSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/BranchDeleteSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.isSingleBranchDeleteFailure = exports.branchDeletionFailure = exports.branchDeletionSuccess = exports.BranchDeletionBatch = void 0;
      var BranchDeletionBatch = class {
        constructor() {
          this.all = [];
          this.branches = {};
          this.errors = [];
        }
        get success() {
          return !this.errors.length;
        }
      };
      exports.BranchDeletionBatch = BranchDeletionBatch;
      function branchDeletionSuccess(branch, hash) {
        return {
          branch,
          hash,
          success: true
        };
      }
      exports.branchDeletionSuccess = branchDeletionSuccess;
      function branchDeletionFailure(branch) {
        return {
          branch,
          hash: null,
          success: false
        };
      }
      exports.branchDeletionFailure = branchDeletionFailure;
      function isSingleBranchDeleteFailure(test) {
        return test.success;
      }
      exports.isSingleBranchDeleteFailure = isSingleBranchDeleteFailure;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-branch-delete.js
  var require_parse_branch_delete = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-branch-delete.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.hasBranchDeletionError = exports.parseBranchDeletions = void 0;
      var BranchDeleteSummary_1 = require_BranchDeleteSummary();
      var utils_1 = require_utils();
      var deleteSuccessRegex = /(\S+)\s+\(\S+\s([^)]+)\)/;
      var deleteErrorRegex = /^error[^']+'([^']+)'/m;
      var parsers = [
        new utils_1.LineParser(deleteSuccessRegex, (result, [branch, hash]) => {
          const deletion = BranchDeleteSummary_1.branchDeletionSuccess(branch, hash);
          result.all.push(deletion);
          result.branches[branch] = deletion;
        }),
        new utils_1.LineParser(deleteErrorRegex, (result, [branch]) => {
          const deletion = BranchDeleteSummary_1.branchDeletionFailure(branch);
          result.errors.push(deletion);
          result.all.push(deletion);
          result.branches[branch] = deletion;
        })
      ];
      var parseBranchDeletions = (stdOut, stdErr) => {
        return utils_1.parseStringResponse(new BranchDeleteSummary_1.BranchDeletionBatch(), parsers, stdOut, stdErr);
      };
      exports.parseBranchDeletions = parseBranchDeletions;
      function hasBranchDeletionError(data, processExitCode) {
        return processExitCode === utils_1.ExitCodes.ERROR && deleteErrorRegex.test(data);
      }
      exports.hasBranchDeletionError = hasBranchDeletionError;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/BranchSummary.js
  var require_BranchSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/BranchSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.BranchSummaryResult = void 0;
      var BranchSummaryResult = class {
        constructor() {
          this.all = [];
          this.branches = {};
          this.current = "";
          this.detached = false;
        }
        push(current, detached, name, commit, label) {
          if (current) {
            this.detached = detached;
            this.current = name;
          }
          this.all.push(name);
          this.branches[name] = {
            current,
            name,
            commit,
            label
          };
        }
      };
      exports.BranchSummaryResult = BranchSummaryResult;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-branch.js
  var require_parse_branch = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-branch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseBranchSummary = void 0;
      var BranchSummary_1 = require_BranchSummary();
      var utils_1 = require_utils();
      var parsers = [
        new utils_1.LineParser(/^(\*\s)?\((?:HEAD )?detached (?:from|at) (\S+)\)\s+([a-z0-9]+)\s(.*)$/, (result, [current, name, commit, label]) => {
          result.push(!!current, true, name, commit, label);
        }),
        new utils_1.LineParser(/^(\*\s)?(\S+)\s+([a-z0-9]+)\s(.*)$/s, (result, [current, name, commit, label]) => {
          result.push(!!current, false, name, commit, label);
        })
      ];
      function parseBranchSummary(stdOut) {
        return utils_1.parseStringResponse(new BranchSummary_1.BranchSummaryResult(), parsers, stdOut);
      }
      exports.parseBranchSummary = parseBranchSummary;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/branch.js
  var require_branch = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/branch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.deleteBranchTask = exports.deleteBranchesTask = exports.branchLocalTask = exports.branchTask = exports.containsDeleteBranchCommand = void 0;
      var git_response_error_1 = require_git_response_error();
      var parse_branch_delete_1 = require_parse_branch_delete();
      var parse_branch_1 = require_parse_branch();
      var utils_1 = require_utils();
      function containsDeleteBranchCommand(commands) {
        const deleteCommands = ["-d", "-D", "--delete"];
        return commands.some((command) => deleteCommands.includes(command));
      }
      exports.containsDeleteBranchCommand = containsDeleteBranchCommand;
      function branchTask(customArgs) {
        const isDelete = containsDeleteBranchCommand(customArgs);
        const commands = ["branch", ...customArgs];
        if (commands.length === 1) {
          commands.push("-a");
        }
        if (!commands.includes("-v")) {
          commands.splice(1, 0, "-v");
        }
        return {
          format: "utf-8",
          commands,
          parser(stdOut, stdErr) {
            if (isDelete) {
              return parse_branch_delete_1.parseBranchDeletions(stdOut, stdErr).all[0];
            }
            return parse_branch_1.parseBranchSummary(stdOut);
          }
        };
      }
      exports.branchTask = branchTask;
      function branchLocalTask() {
        const parser = parse_branch_1.parseBranchSummary;
        return {
          format: "utf-8",
          commands: ["branch", "-v"],
          parser
        };
      }
      exports.branchLocalTask = branchLocalTask;
      function deleteBranchesTask(branches, forceDelete = false) {
        return {
          format: "utf-8",
          commands: ["branch", "-v", forceDelete ? "-D" : "-d", ...branches],
          parser(stdOut, stdErr) {
            return parse_branch_delete_1.parseBranchDeletions(stdOut, stdErr);
          },
          onError({ exitCode, stdOut }, error, done, fail) {
            if (!parse_branch_delete_1.hasBranchDeletionError(String(error), exitCode)) {
              return fail(error);
            }
            done(stdOut);
          }
        };
      }
      exports.deleteBranchesTask = deleteBranchesTask;
      function deleteBranchTask(branch, forceDelete = false) {
        const task = {
          format: "utf-8",
          commands: ["branch", "-v", forceDelete ? "-D" : "-d", branch],
          parser(stdOut, stdErr) {
            return parse_branch_delete_1.parseBranchDeletions(stdOut, stdErr).branches[branch];
          },
          onError({ exitCode, stdErr, stdOut }, error, _, fail) {
            if (!parse_branch_delete_1.hasBranchDeletionError(String(error), exitCode)) {
              return fail(error);
            }
            throw new git_response_error_1.GitResponseError(task.parser(utils_1.bufferToString(stdOut), utils_1.bufferToString(stdErr)), String(error));
          }
        };
        return task;
      }
      exports.deleteBranchTask = deleteBranchTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/CheckIgnore.js
  var require_CheckIgnore = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/CheckIgnore.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseCheckIgnore = void 0;
      var parseCheckIgnore = (text) => {
        return text.split(/\n/g).map((line) => line.trim()).filter((file) => !!file);
      };
      exports.parseCheckIgnore = parseCheckIgnore;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/check-ignore.js
  var require_check_ignore = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/check-ignore.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.checkIgnoreTask = void 0;
      var CheckIgnore_1 = require_CheckIgnore();
      function checkIgnoreTask(paths) {
        return {
          commands: ["check-ignore", ...paths],
          format: "utf-8",
          parser: CheckIgnore_1.parseCheckIgnore
        };
      }
      exports.checkIgnoreTask = checkIgnoreTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/clone.js
  var require_clone = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/clone.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.cloneMirrorTask = exports.cloneTask = void 0;
      var task_1 = require_task();
      var utils_1 = require_utils();
      function cloneTask(repo, directory, customArgs) {
        const commands = ["clone", ...customArgs];
        if (typeof repo === "string") {
          commands.push(repo);
        }
        if (typeof directory === "string") {
          commands.push(directory);
        }
        return task_1.straightThroughStringTask(commands);
      }
      exports.cloneTask = cloneTask;
      function cloneMirrorTask(repo, directory, customArgs) {
        utils_1.append(customArgs, "--mirror");
        return cloneTask(repo, directory, customArgs);
      }
      exports.cloneMirrorTask = cloneMirrorTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-commit.js
  var require_parse_commit = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-commit.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseCommitResult = void 0;
      var utils_1 = require_utils();
      var parsers = [
        new utils_1.LineParser(/^\[([^\s]+)( \([^)]+\))? ([^\]]+)/, (result, [branch, root, commit]) => {
          result.branch = branch;
          result.commit = commit;
          result.root = !!root;
        }),
        new utils_1.LineParser(/\s*Author:\s(.+)/i, (result, [author]) => {
          const parts = author.split("<");
          const email = parts.pop();
          if (!email || !email.includes("@")) {
            return;
          }
          result.author = {
            email: email.substr(0, email.length - 1),
            name: parts.join("<").trim()
          };
        }),
        new utils_1.LineParser(/(\d+)[^,]*(?:,\s*(\d+)[^,]*)(?:,\s*(\d+))/g, (result, [changes, insertions, deletions]) => {
          result.summary.changes = parseInt(changes, 10) || 0;
          result.summary.insertions = parseInt(insertions, 10) || 0;
          result.summary.deletions = parseInt(deletions, 10) || 0;
        }),
        new utils_1.LineParser(/^(\d+)[^,]*(?:,\s*(\d+)[^(]+\(([+-]))?/, (result, [changes, lines, direction]) => {
          result.summary.changes = parseInt(changes, 10) || 0;
          const count = parseInt(lines, 10) || 0;
          if (direction === "-") {
            result.summary.deletions = count;
          } else if (direction === "+") {
            result.summary.insertions = count;
          }
        })
      ];
      function parseCommitResult(stdOut) {
        const result = {
          author: null,
          branch: "",
          commit: "",
          root: false,
          summary: {
            changes: 0,
            insertions: 0,
            deletions: 0
          }
        };
        return utils_1.parseStringResponse(result, parsers, stdOut);
      }
      exports.parseCommitResult = parseCommitResult;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/commit.js
  var require_commit = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/commit.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.commitTask = void 0;
      var parse_commit_1 = require_parse_commit();
      function commitTask(message, files, customArgs) {
        const commands = ["commit"];
        message.forEach((m) => commands.push("-m", m));
        commands.push(...files, ...customArgs);
        return {
          commands,
          format: "utf-8",
          parser: parse_commit_1.parseCommitResult
        };
      }
      exports.commitTask = commitTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/diff.js
  var require_diff = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/diff.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.diffSummaryTask = void 0;
      var parse_diff_summary_1 = require_parse_diff_summary();
      function diffSummaryTask(customArgs) {
        return {
          commands: ["diff", "--stat=4096", ...customArgs],
          format: "utf-8",
          parser(stdOut) {
            return parse_diff_summary_1.parseDiffResult(stdOut);
          }
        };
      }
      exports.diffSummaryTask = diffSummaryTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-fetch.js
  var require_parse_fetch = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-fetch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseFetchResult = void 0;
      var utils_1 = require_utils();
      var parsers = [
        new utils_1.LineParser(/From (.+)$/, (result, [remote]) => {
          result.remote = remote;
        }),
        new utils_1.LineParser(/\* \[new branch]\s+(\S+)\s*-> (.+)$/, (result, [name, tracking]) => {
          result.branches.push({
            name,
            tracking
          });
        }),
        new utils_1.LineParser(/\* \[new tag]\s+(\S+)\s*-> (.+)$/, (result, [name, tracking]) => {
          result.tags.push({
            name,
            tracking
          });
        })
      ];
      function parseFetchResult(stdOut, stdErr) {
        const result = {
          raw: stdOut,
          remote: null,
          branches: [],
          tags: []
        };
        return utils_1.parseStringResponse(result, parsers, stdOut, stdErr);
      }
      exports.parseFetchResult = parseFetchResult;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/fetch.js
  var require_fetch = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/fetch.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.fetchTask = void 0;
      var parse_fetch_1 = require_parse_fetch();
      function fetchTask(remote, branch, customArgs) {
        const commands = ["fetch", ...customArgs];
        if (remote && branch) {
          commands.push(remote, branch);
        }
        return {
          commands,
          format: "utf-8",
          parser: parse_fetch_1.parseFetchResult
        };
      }
      exports.fetchTask = fetchTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/parsers/parse-move.js
  var require_parse_move = __commonJS({
    "../../node_modules/simple-git/src/lib/parsers/parse-move.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseMoveResult = void 0;
      var utils_1 = require_utils();
      var parsers = [
        new utils_1.LineParser(/^Renaming (.+) to (.+)$/, (result, [from, to]) => {
          result.moves.push({ from, to });
        })
      ];
      function parseMoveResult(stdOut) {
        return utils_1.parseStringResponse({ moves: [] }, parsers, stdOut);
      }
      exports.parseMoveResult = parseMoveResult;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/move.js
  var require_move = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/move.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.moveTask = void 0;
      var parse_move_1 = require_parse_move();
      var utils_1 = require_utils();
      function moveTask(from, to) {
        return {
          commands: ["mv", "-v", ...utils_1.asArray(from), to],
          format: "utf-8",
          parser: parse_move_1.parseMoveResult
        };
      }
      exports.moveTask = moveTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/pull.js
  var require_pull = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/pull.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.pullTask = void 0;
      var parse_pull_1 = require_parse_pull();
      function pullTask(remote, branch, customArgs) {
        const commands = ["pull", ...customArgs];
        if (remote && branch) {
          commands.splice(1, 0, remote, branch);
        }
        return {
          commands,
          format: "utf-8",
          parser(stdOut, stdErr) {
            return parse_pull_1.parsePullResult(stdOut, stdErr);
          }
        };
      }
      exports.pullTask = pullTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/GetRemoteSummary.js
  var require_GetRemoteSummary = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/GetRemoteSummary.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseGetRemotesVerbose = exports.parseGetRemotes = void 0;
      var utils_1 = require_utils();
      function parseGetRemotes(text) {
        const remotes = {};
        forEach(text, ([name]) => remotes[name] = { name });
        return Object.values(remotes);
      }
      exports.parseGetRemotes = parseGetRemotes;
      function parseGetRemotesVerbose(text) {
        const remotes = {};
        forEach(text, ([name, url, purpose]) => {
          if (!remotes.hasOwnProperty(name)) {
            remotes[name] = {
              name,
              refs: { fetch: "", push: "" }
            };
          }
          if (purpose && url) {
            remotes[name].refs[purpose.replace(/[^a-z]/g, "")] = url;
          }
        });
        return Object.values(remotes);
      }
      exports.parseGetRemotesVerbose = parseGetRemotesVerbose;
      function forEach(text, handler) {
        utils_1.forEachLineWithContent(text, (line) => handler(line.split(/\s+/)));
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/remote.js
  var require_remote = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/remote.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.removeRemoteTask = exports.remoteTask = exports.listRemotesTask = exports.getRemotesTask = exports.addRemoteTask = void 0;
      var GetRemoteSummary_1 = require_GetRemoteSummary();
      var task_1 = require_task();
      function addRemoteTask(remoteName, remoteRepo, customArgs = []) {
        return task_1.straightThroughStringTask(["remote", "add", ...customArgs, remoteName, remoteRepo]);
      }
      exports.addRemoteTask = addRemoteTask;
      function getRemotesTask(verbose) {
        const commands = ["remote"];
        if (verbose) {
          commands.push("-v");
        }
        return {
          commands,
          format: "utf-8",
          parser: verbose ? GetRemoteSummary_1.parseGetRemotesVerbose : GetRemoteSummary_1.parseGetRemotes
        };
      }
      exports.getRemotesTask = getRemotesTask;
      function listRemotesTask(customArgs = []) {
        const commands = [...customArgs];
        if (commands[0] !== "ls-remote") {
          commands.unshift("ls-remote");
        }
        return task_1.straightThroughStringTask(commands);
      }
      exports.listRemotesTask = listRemotesTask;
      function remoteTask(customArgs = []) {
        const commands = [...customArgs];
        if (commands[0] !== "remote") {
          commands.unshift("remote");
        }
        return task_1.straightThroughStringTask(commands);
      }
      exports.remoteTask = remoteTask;
      function removeRemoteTask(remoteName) {
        return task_1.straightThroughStringTask(["remote", "remove", remoteName]);
      }
      exports.removeRemoteTask = removeRemoteTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/stash-list.js
  var require_stash_list = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/stash-list.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.stashListTask = void 0;
      var parse_list_log_summary_1 = require_parse_list_log_summary();
      var log_1 = require_log();
      function stashListTask(opt = {}, customArgs) {
        const options = log_1.parseLogOptions(opt);
        const parser = parse_list_log_summary_1.createListLogSummaryParser(options.splitter, options.fields);
        return {
          commands: ["stash", "list", ...options.commands, ...customArgs],
          format: "utf-8",
          parser
        };
      }
      exports.stashListTask = stashListTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/sub-module.js
  var require_sub_module = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/sub-module.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.updateSubModuleTask = exports.subModuleTask = exports.initSubModuleTask = exports.addSubModuleTask = void 0;
      var task_1 = require_task();
      function addSubModuleTask(repo, path3) {
        return subModuleTask(["add", repo, path3]);
      }
      exports.addSubModuleTask = addSubModuleTask;
      function initSubModuleTask(customArgs) {
        return subModuleTask(["init", ...customArgs]);
      }
      exports.initSubModuleTask = initSubModuleTask;
      function subModuleTask(customArgs) {
        const commands = [...customArgs];
        if (commands[0] !== "submodule") {
          commands.unshift("submodule");
        }
        return task_1.straightThroughStringTask(commands);
      }
      exports.subModuleTask = subModuleTask;
      function updateSubModuleTask(customArgs) {
        return subModuleTask(["update", ...customArgs]);
      }
      exports.updateSubModuleTask = updateSubModuleTask;
    }
  });

  // ../../node_modules/simple-git/src/lib/responses/TagList.js
  var require_TagList = __commonJS({
    "../../node_modules/simple-git/src/lib/responses/TagList.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.parseTagList = exports.TagList = void 0;
      var TagList = class {
        constructor(all, latest) {
          this.all = all;
          this.latest = latest;
        }
      };
      exports.TagList = TagList;
      var parseTagList = function(data, customSort = false) {
        const tags = data.split("\n").map(trimmed).filter(Boolean);
        if (!customSort) {
          tags.sort(function(tagA, tagB) {
            const partsA = tagA.split(".");
            const partsB = tagB.split(".");
            if (partsA.length === 1 || partsB.length === 1) {
              return singleSorted(toNumber(partsA[0]), toNumber(partsB[0]));
            }
            for (let i = 0, l = Math.max(partsA.length, partsB.length); i < l; i++) {
              const diff = sorted(toNumber(partsA[i]), toNumber(partsB[i]));
              if (diff) {
                return diff;
              }
            }
            return 0;
          });
        }
        const latest = customSort ? tags[0] : [...tags].reverse().find((tag) => tag.indexOf(".") >= 0);
        return new TagList(tags, latest);
      };
      exports.parseTagList = parseTagList;
      function singleSorted(a, b) {
        const aIsNum = isNaN(a);
        const bIsNum = isNaN(b);
        if (aIsNum !== bIsNum) {
          return aIsNum ? 1 : -1;
        }
        return aIsNum ? sorted(a, b) : 0;
      }
      function sorted(a, b) {
        return a === b ? 0 : a > b ? 1 : -1;
      }
      function trimmed(input) {
        return input.trim();
      }
      function toNumber(input) {
        if (typeof input === "string") {
          return parseInt(input.replace(/^\D+/g, ""), 10) || 0;
        }
        return 0;
      }
    }
  });

  // ../../node_modules/simple-git/src/lib/tasks/tag.js
  var require_tag = __commonJS({
    "../../node_modules/simple-git/src/lib/tasks/tag.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.addAnnotatedTagTask = exports.addTagTask = exports.tagListTask = void 0;
      var TagList_1 = require_TagList();
      function tagListTask(customArgs = []) {
        const hasCustomSort = customArgs.some((option) => /^--sort=/.test(option));
        return {
          format: "utf-8",
          commands: ["tag", "-l", ...customArgs],
          parser(text) {
            return TagList_1.parseTagList(text, hasCustomSort);
          }
        };
      }
      exports.tagListTask = tagListTask;
      function addTagTask(name) {
        return {
          format: "utf-8",
          commands: ["tag", name],
          parser() {
            return { name };
          }
        };
      }
      exports.addTagTask = addTagTask;
      function addAnnotatedTagTask(name, tagMessage) {
        return {
          format: "utf-8",
          commands: ["tag", "-a", "-m", tagMessage, name],
          parser() {
            return { name };
          }
        };
      }
      exports.addAnnotatedTagTask = addAnnotatedTagTask;
    }
  });

  // ../../node_modules/simple-git/src/git.js
  var require_git = __commonJS({
    "../../node_modules/simple-git/src/git.js"(exports, module) {
      var { GitExecutor } = require_git_executor();
      var { SimpleGitApi } = require_simple_git_api();
      var { Scheduler } = require_scheduler();
      var { GitLogger } = require_git_logger();
      var { configurationErrorTask } = require_task();
      var {
        asArray,
        filterArray,
        filterPrimitives,
        filterString,
        filterStringOrStringArray,
        filterType,
        getTrailingOptions,
        trailingFunctionArgument,
        trailingOptionsArgument
      } = require_utils();
      var { applyPatchTask } = require_apply_patch();
      var { branchTask, branchLocalTask, deleteBranchesTask, deleteBranchTask } = require_branch();
      var { checkIgnoreTask } = require_check_ignore();
      var { checkIsRepoTask } = require_check_is_repo();
      var { cloneTask, cloneMirrorTask } = require_clone();
      var { cleanWithOptionsTask, isCleanOptionsArray } = require_clean();
      var { commitTask } = require_commit();
      var { diffSummaryTask } = require_diff();
      var { fetchTask } = require_fetch();
      var { moveTask } = require_move();
      var { pullTask } = require_pull();
      var { pushTagsTask } = require_push();
      var { addRemoteTask, getRemotesTask, listRemotesTask, remoteTask, removeRemoteTask } = require_remote();
      var { getResetMode, resetTask } = require_reset();
      var { stashListTask } = require_stash_list();
      var { addSubModuleTask, initSubModuleTask, subModuleTask, updateSubModuleTask } = require_sub_module();
      var { addAnnotatedTagTask, addTagTask, tagListTask } = require_tag();
      var { straightThroughBufferTask, straightThroughStringTask } = require_task();
      function Git(options, plugins) {
        this._executor = new GitExecutor(options.binary, options.baseDir, new Scheduler(options.maxConcurrentProcesses), plugins);
        this._logger = new GitLogger();
      }
      (Git.prototype = Object.create(SimpleGitApi.prototype)).constructor = Git;
      Git.prototype._logger = null;
      Git.prototype.customBinary = function(command) {
        this._executor.binary = command;
        return this;
      };
      Git.prototype.env = function(name, value) {
        if (arguments.length === 1 && typeof name === "object") {
          this._executor.env = name;
        } else {
          (this._executor.env = this._executor.env || {})[name] = value;
        }
        return this;
      };
      Git.prototype.stashList = function(options) {
        return this._runTask(stashListTask(trailingOptionsArgument(arguments) || {}, filterArray(options) && options || []), trailingFunctionArgument(arguments));
      };
      function createCloneTask(api, task, repoPath, localPath) {
        if (typeof repoPath !== "string") {
          return configurationErrorTask(`git.${api}() requires a string 'repoPath'`);
        }
        return task(repoPath, filterType(localPath, filterString), getTrailingOptions(arguments));
      }
      Git.prototype.clone = function() {
        return this._runTask(createCloneTask("clone", cloneTask, ...arguments), trailingFunctionArgument(arguments));
      };
      Git.prototype.mirror = function() {
        return this._runTask(createCloneTask("mirror", cloneMirrorTask, ...arguments), trailingFunctionArgument(arguments));
      };
      Git.prototype.mv = function(from, to) {
        return this._runTask(moveTask(from, to), trailingFunctionArgument(arguments));
      };
      Git.prototype.checkoutLatestTag = function(then) {
        var git2 = this;
        return this.pull(function() {
          git2.tags(function(err, tags) {
            git2.checkout(tags.latest, then);
          });
        });
      };
      Git.prototype.commit = function(message, files, options, then) {
        const next = trailingFunctionArgument(arguments);
        const messages = [];
        if (filterStringOrStringArray(message)) {
          messages.push(...asArray(message));
        } else {
          console.warn("simple-git deprecation notice: git.commit: requires the commit message to be supplied as a string/string[], this will be an error in version 3");
        }
        return this._runTask(commitTask(messages, asArray(filterType(files, filterStringOrStringArray, [])), [...filterType(options, filterArray, []), ...getTrailingOptions(arguments, 0, true)]), next);
      };
      Git.prototype.pull = function(remote, branch, options, then) {
        return this._runTask(pullTask(filterType(remote, filterString), filterType(branch, filterString), getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.fetch = function(remote, branch) {
        return this._runTask(fetchTask(filterType(remote, filterString), filterType(branch, filterString), getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.silent = function(silence) {
        console.warn("simple-git deprecation notice: git.silent: logging should be configured using the `debug` library / `DEBUG` environment variable, this will be an error in version 3");
        this._logger.silent(!!silence);
        return this;
      };
      Git.prototype.tags = function(options, then) {
        return this._runTask(tagListTask(getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.rebase = function() {
        return this._runTask(straightThroughStringTask(["rebase", ...getTrailingOptions(arguments)]), trailingFunctionArgument(arguments));
      };
      Git.prototype.reset = function(mode) {
        return this._runTask(resetTask(getResetMode(mode), getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.revert = function(commit) {
        const next = trailingFunctionArgument(arguments);
        if (typeof commit !== "string") {
          return this._runTask(configurationErrorTask("Commit must be a string"), next);
        }
        return this._runTask(straightThroughStringTask(["revert", ...getTrailingOptions(arguments, 0, true), commit]), next);
      };
      Git.prototype.addTag = function(name) {
        const task = typeof name === "string" ? addTagTask(name) : configurationErrorTask("Git.addTag requires a tag name");
        return this._runTask(task, trailingFunctionArgument(arguments));
      };
      Git.prototype.addAnnotatedTag = function(tagName, tagMessage) {
        return this._runTask(addAnnotatedTagTask(tagName, tagMessage), trailingFunctionArgument(arguments));
      };
      Git.prototype.checkout = function() {
        const commands = ["checkout", ...getTrailingOptions(arguments, true)];
        return this._runTask(straightThroughStringTask(commands), trailingFunctionArgument(arguments));
      };
      Git.prototype.checkoutBranch = function(branchName, startPoint, then) {
        return this.checkout(["-b", branchName, startPoint], trailingFunctionArgument(arguments));
      };
      Git.prototype.checkoutLocalBranch = function(branchName, then) {
        return this.checkout(["-b", branchName], trailingFunctionArgument(arguments));
      };
      Git.prototype.deleteLocalBranch = function(branchName, forceDelete, then) {
        return this._runTask(deleteBranchTask(branchName, typeof forceDelete === "boolean" ? forceDelete : false), trailingFunctionArgument(arguments));
      };
      Git.prototype.deleteLocalBranches = function(branchNames, forceDelete, then) {
        return this._runTask(deleteBranchesTask(branchNames, typeof forceDelete === "boolean" ? forceDelete : false), trailingFunctionArgument(arguments));
      };
      Git.prototype.branch = function(options, then) {
        return this._runTask(branchTask(getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.branchLocal = function(then) {
        return this._runTask(branchLocalTask(), trailingFunctionArgument(arguments));
      };
      Git.prototype.raw = function(commands) {
        const createRestCommands = !Array.isArray(commands);
        const command = [].slice.call(createRestCommands ? arguments : commands, 0);
        for (let i = 0; i < command.length && createRestCommands; i++) {
          if (!filterPrimitives(command[i])) {
            command.splice(i, command.length - i);
            break;
          }
        }
        command.push(...getTrailingOptions(arguments, 0, true));
        var next = trailingFunctionArgument(arguments);
        if (!command.length) {
          return this._runTask(configurationErrorTask("Raw: must supply one or more command to execute"), next);
        }
        return this._runTask(straightThroughStringTask(command), next);
      };
      Git.prototype.submoduleAdd = function(repo, path3, then) {
        return this._runTask(addSubModuleTask(repo, path3), trailingFunctionArgument(arguments));
      };
      Git.prototype.submoduleUpdate = function(args, then) {
        return this._runTask(updateSubModuleTask(getTrailingOptions(arguments, true)), trailingFunctionArgument(arguments));
      };
      Git.prototype.submoduleInit = function(args, then) {
        return this._runTask(initSubModuleTask(getTrailingOptions(arguments, true)), trailingFunctionArgument(arguments));
      };
      Git.prototype.subModule = function(options, then) {
        return this._runTask(subModuleTask(getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.listRemote = function() {
        return this._runTask(listRemotesTask(getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.addRemote = function(remoteName, remoteRepo, then) {
        return this._runTask(addRemoteTask(remoteName, remoteRepo, getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.removeRemote = function(remoteName, then) {
        return this._runTask(removeRemoteTask(remoteName), trailingFunctionArgument(arguments));
      };
      Git.prototype.getRemotes = function(verbose, then) {
        return this._runTask(getRemotesTask(verbose === true), trailingFunctionArgument(arguments));
      };
      Git.prototype.remote = function(options, then) {
        return this._runTask(remoteTask(getTrailingOptions(arguments)), trailingFunctionArgument(arguments));
      };
      Git.prototype.tag = function(options, then) {
        const command = getTrailingOptions(arguments);
        if (command[0] !== "tag") {
          command.unshift("tag");
        }
        return this._runTask(straightThroughStringTask(command), trailingFunctionArgument(arguments));
      };
      Git.prototype.updateServerInfo = function(then) {
        return this._runTask(straightThroughStringTask(["update-server-info"]), trailingFunctionArgument(arguments));
      };
      Git.prototype.pushTags = function(remote, then) {
        const task = pushTagsTask({ remote: filterType(remote, filterString) }, getTrailingOptions(arguments));
        return this._runTask(task, trailingFunctionArgument(arguments));
      };
      Git.prototype.rm = function(files) {
        return this._runTask(straightThroughStringTask(["rm", "-f", ...asArray(files)]), trailingFunctionArgument(arguments));
      };
      Git.prototype.rmKeepLocal = function(files) {
        return this._runTask(straightThroughStringTask(["rm", "--cached", ...asArray(files)]), trailingFunctionArgument(arguments));
      };
      Git.prototype.catFile = function(options, then) {
        return this._catFile("utf-8", arguments);
      };
      Git.prototype.binaryCatFile = function() {
        return this._catFile("buffer", arguments);
      };
      Git.prototype._catFile = function(format, args) {
        var handler = trailingFunctionArgument(args);
        var command = ["cat-file"];
        var options = args[0];
        if (typeof options === "string") {
          return this._runTask(configurationErrorTask("Git.catFile: options must be supplied as an array of strings"), handler);
        }
        if (Array.isArray(options)) {
          command.push.apply(command, options);
        }
        const task = format === "buffer" ? straightThroughBufferTask(command) : straightThroughStringTask(command);
        return this._runTask(task, handler);
      };
      Git.prototype.diff = function(options, then) {
        const command = ["diff", ...getTrailingOptions(arguments)];
        if (typeof options === "string") {
          command.splice(1, 0, options);
          this._logger.warn("Git#diff: supplying options as a single string is now deprecated, switch to an array of strings");
        }
        return this._runTask(straightThroughStringTask(command), trailingFunctionArgument(arguments));
      };
      Git.prototype.diffSummary = function() {
        return this._runTask(diffSummaryTask(getTrailingOptions(arguments, 1)), trailingFunctionArgument(arguments));
      };
      Git.prototype.applyPatch = function(patches) {
        const task = !filterStringOrStringArray(patches) ? configurationErrorTask(`git.applyPatch requires one or more string patches as the first argument`) : applyPatchTask(asArray(patches), getTrailingOptions([].slice.call(arguments, 1)));
        return this._runTask(task, trailingFunctionArgument(arguments));
      };
      Git.prototype.revparse = function() {
        const commands = ["rev-parse", ...getTrailingOptions(arguments, true)];
        return this._runTask(straightThroughStringTask(commands, true), trailingFunctionArgument(arguments));
      };
      Git.prototype.show = function(options, then) {
        return this._runTask(straightThroughStringTask(["show", ...getTrailingOptions(arguments, 1)]), trailingFunctionArgument(arguments));
      };
      Git.prototype.clean = function(mode, options, then) {
        const usingCleanOptionsArray = isCleanOptionsArray(mode);
        const cleanMode = usingCleanOptionsArray && mode.join("") || filterType(mode, filterString) || "";
        const customArgs = getTrailingOptions([].slice.call(arguments, usingCleanOptionsArray ? 1 : 0));
        return this._runTask(cleanWithOptionsTask(cleanMode, customArgs), trailingFunctionArgument(arguments));
      };
      Git.prototype.exec = function(then) {
        const task = {
          commands: [],
          format: "utf-8",
          parser() {
            if (typeof then === "function") {
              then();
            }
          }
        };
        return this._runTask(task);
      };
      Git.prototype.clearQueue = function() {
        return this;
      };
      Git.prototype.checkIgnore = function(pathnames, then) {
        return this._runTask(checkIgnoreTask(asArray(filterType(pathnames, filterStringOrStringArray, []))), trailingFunctionArgument(arguments));
      };
      Git.prototype.checkIsRepo = function(checkType, then) {
        return this._runTask(checkIsRepoTask(filterType(checkType, filterString)), trailingFunctionArgument(arguments));
      };
      module.exports = Git;
    }
  });

  // ../../node_modules/simple-git/src/lib/git-factory.js
  var require_git_factory = __commonJS({
    "../../node_modules/simple-git/src/lib/git-factory.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.gitInstanceFactory = exports.gitExportFactory = exports.esModuleFactory = void 0;
      var api_1 = require_api();
      var plugins_1 = require_plugins();
      var utils_1 = require_utils();
      var Git = require_git();
      function esModuleFactory(defaultExport) {
        return Object.defineProperties(defaultExport, {
          __esModule: { value: true },
          default: { value: defaultExport }
        });
      }
      exports.esModuleFactory = esModuleFactory;
      function gitExportFactory(factory, extra) {
        return Object.assign(function(...args) {
          return factory.apply(null, args);
        }, api_1.default, extra || {});
      }
      exports.gitExportFactory = gitExportFactory;
      function gitInstanceFactory(baseDir, options) {
        const plugins = new plugins_1.PluginStore();
        const config = utils_1.createInstanceConfig(baseDir && (typeof baseDir === "string" ? { baseDir } : baseDir) || {}, options);
        if (!utils_1.folderExists(config.baseDir)) {
          throw new api_1.default.GitConstructError(config, `Cannot use simple-git on a directory that does not exist`);
        }
        if (Array.isArray(config.config)) {
          plugins.add(plugins_1.commandConfigPrefixingPlugin(config.config));
        }
        config.progress && plugins.add(plugins_1.progressMonitorPlugin(config.progress));
        config.timeout && plugins.add(plugins_1.timeoutPlugin(config.timeout));
        config.spawnOptions && plugins.add(plugins_1.spawnOptionsPlugin(config.spawnOptions));
        plugins.add(plugins_1.errorDetectionPlugin(plugins_1.errorDetectionHandler(true)));
        config.errors && plugins.add(plugins_1.errorDetectionPlugin(config.errors));
        return new Git(config, plugins);
      }
      exports.gitInstanceFactory = gitInstanceFactory;
    }
  });

  // ../../node_modules/simple-git/src/lib/runners/promise-wrapped.js
  var require_promise_wrapped = __commonJS({
    "../../node_modules/simple-git/src/lib/runners/promise-wrapped.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      exports.gitP = void 0;
      var git_response_error_1 = require_git_response_error();
      var git_factory_1 = require_git_factory();
      var functionNamesBuilderApi = [
        "customBinary",
        "env",
        "outputHandler",
        "silent"
      ];
      var functionNamesPromiseApi = [
        "add",
        "addAnnotatedTag",
        "addConfig",
        "addRemote",
        "addTag",
        "applyPatch",
        "binaryCatFile",
        "branch",
        "branchLocal",
        "catFile",
        "checkIgnore",
        "checkIsRepo",
        "checkout",
        "checkoutBranch",
        "checkoutLatestTag",
        "checkoutLocalBranch",
        "clean",
        "clone",
        "commit",
        "cwd",
        "deleteLocalBranch",
        "deleteLocalBranches",
        "diff",
        "diffSummary",
        "exec",
        "fetch",
        "getRemotes",
        "init",
        "listConfig",
        "listRemote",
        "log",
        "merge",
        "mergeFromTo",
        "mirror",
        "mv",
        "pull",
        "push",
        "pushTags",
        "raw",
        "rebase",
        "remote",
        "removeRemote",
        "reset",
        "revert",
        "revparse",
        "rm",
        "rmKeepLocal",
        "show",
        "stash",
        "stashList",
        "status",
        "subModule",
        "submoduleAdd",
        "submoduleInit",
        "submoduleUpdate",
        "tag",
        "tags",
        "updateServerInfo"
      ];
      function gitP(...args) {
        let git2;
        let chain = Promise.resolve();
        try {
          git2 = git_factory_1.gitInstanceFactory(...args);
        } catch (e) {
          chain = Promise.reject(e);
        }
        function builderReturn() {
          return promiseApi;
        }
        function chainReturn() {
          return chain;
        }
        const promiseApi = [...functionNamesBuilderApi, ...functionNamesPromiseApi].reduce((api, name) => {
          const isAsync = functionNamesPromiseApi.includes(name);
          const valid = isAsync ? asyncWrapper(name, git2) : syncWrapper(name, git2, api);
          const alternative = isAsync ? chainReturn : builderReturn;
          Object.defineProperty(api, name, {
            enumerable: false,
            configurable: false,
            value: git2 ? valid : alternative
          });
          return api;
        }, {});
        return promiseApi;
        function asyncWrapper(fn, git3) {
          return function(...args2) {
            if (typeof args2[args2.length] === "function") {
              throw new TypeError("Promise interface requires that handlers are not supplied inline, trailing function not allowed in call to " + fn);
            }
            return chain.then(function() {
              return new Promise(function(resolve, reject) {
                const callback = (err, result) => {
                  if (err) {
                    return reject(toError(err));
                  }
                  resolve(result);
                };
                args2.push(callback);
                git3[fn].apply(git3, args2);
              });
            });
          };
        }
        function syncWrapper(fn, git3, api) {
          return (...args2) => {
            git3[fn](...args2);
            return api;
          };
        }
      }
      exports.gitP = gitP;
      function toError(error) {
        if (error instanceof Error) {
          return error;
        }
        if (typeof error === "string") {
          return new Error(error);
        }
        return new git_response_error_1.GitResponseError(error);
      }
    }
  });

  // ../../node_modules/simple-git/src/index.js
  var require_src3 = __commonJS({
    "../../node_modules/simple-git/src/index.js"(exports, module) {
      var { gitP } = require_promise_wrapped();
      var { esModuleFactory, gitInstanceFactory, gitExportFactory } = require_git_factory();
      module.exports = esModuleFactory(gitExportFactory(gitInstanceFactory, { gitP }));
    }
  });

  // ../../node_modules/universalify/index.js
  var require_universalify = __commonJS({
    "../../node_modules/universalify/index.js"(exports) {
      "use strict";
      exports.fromCallback = function(fn) {
        return Object.defineProperty(function(...args) {
          if (typeof args[args.length - 1] === "function")
            fn.apply(this, args);
          else {
            return new Promise((resolve, reject) => {
              fn.call(this, ...args, (err, res) => err != null ? reject(err) : resolve(res));
            });
          }
        }, "name", { value: fn.name });
      };
      exports.fromPromise = function(fn) {
        return Object.defineProperty(function(...args) {
          const cb = args[args.length - 1];
          if (typeof cb !== "function")
            return fn.apply(this, args);
          else
            fn.apply(this, args.slice(0, -1)).then((r) => cb(null, r), cb);
        }, "name", { value: fn.name });
      };
    }
  });

  // ../../node_modules/graceful-fs/polyfills.js
  var require_polyfills = __commonJS({
    "../../node_modules/graceful-fs/polyfills.js"(exports, module) {
      var constants = __require("constants");
      var origCwd = process.cwd;
      var cwd = null;
      var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
      process.cwd = function() {
        if (!cwd)
          cwd = origCwd.call(process);
        return cwd;
      };
      try {
        process.cwd();
      } catch (er) {
      }
      if (typeof process.chdir === "function") {
        chdir = process.chdir;
        process.chdir = function(d) {
          cwd = null;
          chdir.call(process, d);
        };
        if (Object.setPrototypeOf)
          Object.setPrototypeOf(process.chdir, chdir);
      }
      var chdir;
      module.exports = patch;
      function patch(fs) {
        if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
          patchLchmod(fs);
        }
        if (!fs.lutimes) {
          patchLutimes(fs);
        }
        fs.chown = chownFix(fs.chown);
        fs.fchown = chownFix(fs.fchown);
        fs.lchown = chownFix(fs.lchown);
        fs.chmod = chmodFix(fs.chmod);
        fs.fchmod = chmodFix(fs.fchmod);
        fs.lchmod = chmodFix(fs.lchmod);
        fs.chownSync = chownFixSync(fs.chownSync);
        fs.fchownSync = chownFixSync(fs.fchownSync);
        fs.lchownSync = chownFixSync(fs.lchownSync);
        fs.chmodSync = chmodFixSync(fs.chmodSync);
        fs.fchmodSync = chmodFixSync(fs.fchmodSync);
        fs.lchmodSync = chmodFixSync(fs.lchmodSync);
        fs.stat = statFix(fs.stat);
        fs.fstat = statFix(fs.fstat);
        fs.lstat = statFix(fs.lstat);
        fs.statSync = statFixSync(fs.statSync);
        fs.fstatSync = statFixSync(fs.fstatSync);
        fs.lstatSync = statFixSync(fs.lstatSync);
        if (!fs.lchmod) {
          fs.lchmod = function(path3, mode, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs.lchmodSync = function() {
          };
        }
        if (!fs.lchown) {
          fs.lchown = function(path3, uid, gid, cb) {
            if (cb)
              process.nextTick(cb);
          };
          fs.lchownSync = function() {
          };
        }
        if (platform === "win32") {
          fs.rename = function(fs$rename) {
            return function(from, to, cb) {
              var start = Date.now();
              var backoff = 0;
              fs$rename(from, to, function CB(er) {
                if (er && (er.code === "EACCES" || er.code === "EPERM") && Date.now() - start < 6e4) {
                  setTimeout(function() {
                    fs.stat(to, function(stater, st) {
                      if (stater && stater.code === "ENOENT")
                        fs$rename(from, to, CB);
                      else
                        cb(er);
                    });
                  }, backoff);
                  if (backoff < 100)
                    backoff += 10;
                  return;
                }
                if (cb)
                  cb(er);
              });
            };
          }(fs.rename);
        }
        fs.read = function(fs$read) {
          function read(fd, buffer, offset, length, position, callback_) {
            var callback;
            if (callback_ && typeof callback_ === "function") {
              var eagCounter = 0;
              callback = function(er, _, __) {
                if (er && er.code === "EAGAIN" && eagCounter < 10) {
                  eagCounter++;
                  return fs$read.call(fs, fd, buffer, offset, length, position, callback);
                }
                callback_.apply(this, arguments);
              };
            }
            return fs$read.call(fs, fd, buffer, offset, length, position, callback);
          }
          if (Object.setPrototypeOf)
            Object.setPrototypeOf(read, fs$read);
          return read;
        }(fs.read);
        fs.readSync = function(fs$readSync) {
          return function(fd, buffer, offset, length, position) {
            var eagCounter = 0;
            while (true) {
              try {
                return fs$readSync.call(fs, fd, buffer, offset, length, position);
              } catch (er) {
                if (er.code === "EAGAIN" && eagCounter < 10) {
                  eagCounter++;
                  continue;
                }
                throw er;
              }
            }
          };
        }(fs.readSync);
        function patchLchmod(fs2) {
          fs2.lchmod = function(path3, mode, callback) {
            fs2.open(path3, constants.O_WRONLY | constants.O_SYMLINK, mode, function(err, fd) {
              if (err) {
                if (callback)
                  callback(err);
                return;
              }
              fs2.fchmod(fd, mode, function(err2) {
                fs2.close(fd, function(err22) {
                  if (callback)
                    callback(err2 || err22);
                });
              });
            });
          };
          fs2.lchmodSync = function(path3, mode) {
            var fd = fs2.openSync(path3, constants.O_WRONLY | constants.O_SYMLINK, mode);
            var threw = true;
            var ret;
            try {
              ret = fs2.fchmodSync(fd, mode);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs2.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs2.closeSync(fd);
              }
            }
            return ret;
          };
        }
        function patchLutimes(fs2) {
          if (constants.hasOwnProperty("O_SYMLINK")) {
            fs2.lutimes = function(path3, at, mt, cb) {
              fs2.open(path3, constants.O_SYMLINK, function(er, fd) {
                if (er) {
                  if (cb)
                    cb(er);
                  return;
                }
                fs2.futimes(fd, at, mt, function(er2) {
                  fs2.close(fd, function(er22) {
                    if (cb)
                      cb(er2 || er22);
                  });
                });
              });
            };
            fs2.lutimesSync = function(path3, at, mt) {
              var fd = fs2.openSync(path3, constants.O_SYMLINK);
              var ret;
              var threw = true;
              try {
                ret = fs2.futimesSync(fd, at, mt);
                threw = false;
              } finally {
                if (threw) {
                  try {
                    fs2.closeSync(fd);
                  } catch (er) {
                  }
                } else {
                  fs2.closeSync(fd);
                }
              }
              return ret;
            };
          } else {
            fs2.lutimes = function(_a, _b, _c, cb) {
              if (cb)
                process.nextTick(cb);
            };
            fs2.lutimesSync = function() {
            };
          }
        }
        function chmodFix(orig) {
          if (!orig)
            return orig;
          return function(target, mode, cb) {
            return orig.call(fs, target, mode, function(er) {
              if (chownErOk(er))
                er = null;
              if (cb)
                cb.apply(this, arguments);
            });
          };
        }
        function chmodFixSync(orig) {
          if (!orig)
            return orig;
          return function(target, mode) {
            try {
              return orig.call(fs, target, mode);
            } catch (er) {
              if (!chownErOk(er))
                throw er;
            }
          };
        }
        function chownFix(orig) {
          if (!orig)
            return orig;
          return function(target, uid, gid, cb) {
            return orig.call(fs, target, uid, gid, function(er) {
              if (chownErOk(er))
                er = null;
              if (cb)
                cb.apply(this, arguments);
            });
          };
        }
        function chownFixSync(orig) {
          if (!orig)
            return orig;
          return function(target, uid, gid) {
            try {
              return orig.call(fs, target, uid, gid);
            } catch (er) {
              if (!chownErOk(er))
                throw er;
            }
          };
        }
        function statFix(orig) {
          if (!orig)
            return orig;
          return function(target, options, cb) {
            if (typeof options === "function") {
              cb = options;
              options = null;
            }
            function callback(er, stats) {
              if (stats) {
                if (stats.uid < 0)
                  stats.uid += 4294967296;
                if (stats.gid < 0)
                  stats.gid += 4294967296;
              }
              if (cb)
                cb.apply(this, arguments);
            }
            return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
          };
        }
        function statFixSync(orig) {
          if (!orig)
            return orig;
          return function(target, options) {
            var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
            if (stats.uid < 0)
              stats.uid += 4294967296;
            if (stats.gid < 0)
              stats.gid += 4294967296;
            return stats;
          };
        }
        function chownErOk(er) {
          if (!er)
            return true;
          if (er.code === "ENOSYS")
            return true;
          var nonroot = !process.getuid || process.getuid() !== 0;
          if (nonroot) {
            if (er.code === "EINVAL" || er.code === "EPERM")
              return true;
          }
          return false;
        }
      }
    }
  });

  // ../../node_modules/graceful-fs/legacy-streams.js
  var require_legacy_streams = __commonJS({
    "../../node_modules/graceful-fs/legacy-streams.js"(exports, module) {
      var Stream = __require("stream").Stream;
      module.exports = legacy;
      function legacy(fs) {
        return {
          ReadStream,
          WriteStream
        };
        function ReadStream(path3, options) {
          if (!(this instanceof ReadStream))
            return new ReadStream(path3, options);
          Stream.call(this);
          var self2 = this;
          this.path = path3;
          this.fd = null;
          this.readable = true;
          this.paused = false;
          this.flags = "r";
          this.mode = 438;
          this.bufferSize = 64 * 1024;
          options = options || {};
          var keys = Object.keys(options);
          for (var index = 0, length = keys.length; index < length; index++) {
            var key = keys[index];
            this[key] = options[key];
          }
          if (this.encoding)
            this.setEncoding(this.encoding);
          if (this.start !== void 0) {
            if (typeof this.start !== "number") {
              throw TypeError("start must be a Number");
            }
            if (this.end === void 0) {
              this.end = Infinity;
            } else if (typeof this.end !== "number") {
              throw TypeError("end must be a Number");
            }
            if (this.start > this.end) {
              throw new Error("start must be <= end");
            }
            this.pos = this.start;
          }
          if (this.fd !== null) {
            process.nextTick(function() {
              self2._read();
            });
            return;
          }
          fs.open(this.path, this.flags, this.mode, function(err, fd) {
            if (err) {
              self2.emit("error", err);
              self2.readable = false;
              return;
            }
            self2.fd = fd;
            self2.emit("open", fd);
            self2._read();
          });
        }
        function WriteStream(path3, options) {
          if (!(this instanceof WriteStream))
            return new WriteStream(path3, options);
          Stream.call(this);
          this.path = path3;
          this.fd = null;
          this.writable = true;
          this.flags = "w";
          this.encoding = "binary";
          this.mode = 438;
          this.bytesWritten = 0;
          options = options || {};
          var keys = Object.keys(options);
          for (var index = 0, length = keys.length; index < length; index++) {
            var key = keys[index];
            this[key] = options[key];
          }
          if (this.start !== void 0) {
            if (typeof this.start !== "number") {
              throw TypeError("start must be a Number");
            }
            if (this.start < 0) {
              throw new Error("start must be >= zero");
            }
            this.pos = this.start;
          }
          this.busy = false;
          this._queue = [];
          if (this.fd === null) {
            this._open = fs.open;
            this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
            this.flush();
          }
        }
      }
    }
  });

  // ../../node_modules/graceful-fs/clone.js
  var require_clone2 = __commonJS({
    "../../node_modules/graceful-fs/clone.js"(exports, module) {
      "use strict";
      module.exports = clone;
      var getPrototypeOf = Object.getPrototypeOf || function(obj) {
        return obj.__proto__;
      };
      function clone(obj) {
        if (obj === null || typeof obj !== "object")
          return obj;
        if (obj instanceof Object)
          var copy = { __proto__: getPrototypeOf(obj) };
        else
          var copy = Object.create(null);
        Object.getOwnPropertyNames(obj).forEach(function(key) {
          Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
        });
        return copy;
      }
    }
  });

  // ../../node_modules/graceful-fs/graceful-fs.js
  var require_graceful_fs = __commonJS({
    "../../node_modules/graceful-fs/graceful-fs.js"(exports, module) {
      var fs = __require("fs");
      var polyfills = require_polyfills();
      var legacy = require_legacy_streams();
      var clone = require_clone2();
      var util = __require("util");
      var gracefulQueue;
      var previousSymbol;
      if (typeof Symbol === "function" && typeof Symbol.for === "function") {
        gracefulQueue = Symbol.for("graceful-fs.queue");
        previousSymbol = Symbol.for("graceful-fs.previous");
      } else {
        gracefulQueue = "___graceful-fs.queue";
        previousSymbol = "___graceful-fs.previous";
      }
      function noop() {
      }
      function publishQueue(context, queue2) {
        Object.defineProperty(context, gracefulQueue, {
          get: function() {
            return queue2;
          }
        });
      }
      var debug = noop;
      if (util.debuglog)
        debug = util.debuglog("gfs4");
      else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
        debug = function() {
          var m = util.format.apply(util, arguments);
          m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
          console.error(m);
        };
      if (!fs[gracefulQueue]) {
        queue = global[gracefulQueue] || [];
        publishQueue(fs, queue);
        fs.close = function(fs$close) {
          function close(fd, cb) {
            return fs$close.call(fs, fd, function(err) {
              if (!err) {
                resetQueue();
              }
              if (typeof cb === "function")
                cb.apply(this, arguments);
            });
          }
          Object.defineProperty(close, previousSymbol, {
            value: fs$close
          });
          return close;
        }(fs.close);
        fs.closeSync = function(fs$closeSync) {
          function closeSync(fd) {
            fs$closeSync.apply(fs, arguments);
            resetQueue();
          }
          Object.defineProperty(closeSync, previousSymbol, {
            value: fs$closeSync
          });
          return closeSync;
        }(fs.closeSync);
        if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
          process.on("exit", function() {
            debug(fs[gracefulQueue]);
            __require("assert").equal(fs[gracefulQueue].length, 0);
          });
        }
      }
      var queue;
      if (!global[gracefulQueue]) {
        publishQueue(global, fs[gracefulQueue]);
      }
      module.exports = patch(clone(fs));
      if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
        module.exports = patch(fs);
        fs.__patched = true;
      }
      function patch(fs2) {
        polyfills(fs2);
        fs2.gracefulify = patch;
        fs2.createReadStream = createReadStream;
        fs2.createWriteStream = createWriteStream;
        var fs$readFile = fs2.readFile;
        fs2.readFile = readFile;
        function readFile(path3, options, cb) {
          if (typeof options === "function")
            cb = options, options = null;
          return go$readFile(path3, options, cb);
          function go$readFile(path4, options2, cb2, startTime) {
            return fs$readFile(path4, options2, function(err) {
              if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
                enqueue([go$readFile, [path4, options2, cb2], err, startTime || Date.now(), Date.now()]);
              else {
                if (typeof cb2 === "function")
                  cb2.apply(this, arguments);
              }
            });
          }
        }
        var fs$writeFile = fs2.writeFile;
        fs2.writeFile = writeFile;
        function writeFile(path3, data, options, cb) {
          if (typeof options === "function")
            cb = options, options = null;
          return go$writeFile(path3, data, options, cb);
          function go$writeFile(path4, data2, options2, cb2, startTime) {
            return fs$writeFile(path4, data2, options2, function(err) {
              if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
                enqueue([go$writeFile, [path4, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
              else {
                if (typeof cb2 === "function")
                  cb2.apply(this, arguments);
              }
            });
          }
        }
        var fs$appendFile = fs2.appendFile;
        if (fs$appendFile)
          fs2.appendFile = appendFile;
        function appendFile(path3, data, options, cb) {
          if (typeof options === "function")
            cb = options, options = null;
          return go$appendFile(path3, data, options, cb);
          function go$appendFile(path4, data2, options2, cb2, startTime) {
            return fs$appendFile(path4, data2, options2, function(err) {
              if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
                enqueue([go$appendFile, [path4, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
              else {
                if (typeof cb2 === "function")
                  cb2.apply(this, arguments);
              }
            });
          }
        }
        var fs$copyFile = fs2.copyFile;
        if (fs$copyFile)
          fs2.copyFile = copyFile;
        function copyFile(src, dest, flags, cb) {
          if (typeof flags === "function") {
            cb = flags;
            flags = 0;
          }
          return go$copyFile(src, dest, flags, cb);
          function go$copyFile(src2, dest2, flags2, cb2, startTime) {
            return fs$copyFile(src2, dest2, flags2, function(err) {
              if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
                enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
              else {
                if (typeof cb2 === "function")
                  cb2.apply(this, arguments);
              }
            });
          }
        }
        var fs$readdir = fs2.readdir;
        fs2.readdir = readdir;
        function readdir(path3, options, cb) {
          if (typeof options === "function")
            cb = options, options = null;
          return go$readdir(path3, options, cb);
          function go$readdir(path4, options2, cb2, startTime) {
            return fs$readdir(path4, options2, function(err, files) {
              if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
                enqueue([go$readdir, [path4, options2, cb2], err, startTime || Date.now(), Date.now()]);
              else {
                if (files && files.sort)
                  files.sort();
                if (typeof cb2 === "function")
                  cb2.call(this, err, files);
              }
            });
          }
        }
        if (process.version.substr(0, 4) === "v0.8") {
          var legStreams = legacy(fs2);
          ReadStream = legStreams.ReadStream;
          WriteStream = legStreams.WriteStream;
        }
        var fs$ReadStream = fs2.ReadStream;
        if (fs$ReadStream) {
          ReadStream.prototype = Object.create(fs$ReadStream.prototype);
          ReadStream.prototype.open = ReadStream$open;
        }
        var fs$WriteStream = fs2.WriteStream;
        if (fs$WriteStream) {
          WriteStream.prototype = Object.create(fs$WriteStream.prototype);
          WriteStream.prototype.open = WriteStream$open;
        }
        Object.defineProperty(fs2, "ReadStream", {
          get: function() {
            return ReadStream;
          },
          set: function(val) {
            ReadStream = val;
          },
          enumerable: true,
          configurable: true
        });
        Object.defineProperty(fs2, "WriteStream", {
          get: function() {
            return WriteStream;
          },
          set: function(val) {
            WriteStream = val;
          },
          enumerable: true,
          configurable: true
        });
        var FileReadStream = ReadStream;
        Object.defineProperty(fs2, "FileReadStream", {
          get: function() {
            return FileReadStream;
          },
          set: function(val) {
            FileReadStream = val;
          },
          enumerable: true,
          configurable: true
        });
        var FileWriteStream = WriteStream;
        Object.defineProperty(fs2, "FileWriteStream", {
          get: function() {
            return FileWriteStream;
          },
          set: function(val) {
            FileWriteStream = val;
          },
          enumerable: true,
          configurable: true
        });
        function ReadStream(path3, options) {
          if (this instanceof ReadStream)
            return fs$ReadStream.apply(this, arguments), this;
          else
            return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
        }
        function ReadStream$open() {
          var that = this;
          open(that.path, that.flags, that.mode, function(err, fd) {
            if (err) {
              if (that.autoClose)
                that.destroy();
              that.emit("error", err);
            } else {
              that.fd = fd;
              that.emit("open", fd);
              that.read();
            }
          });
        }
        function WriteStream(path3, options) {
          if (this instanceof WriteStream)
            return fs$WriteStream.apply(this, arguments), this;
          else
            return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
        }
        function WriteStream$open() {
          var that = this;
          open(that.path, that.flags, that.mode, function(err, fd) {
            if (err) {
              that.destroy();
              that.emit("error", err);
            } else {
              that.fd = fd;
              that.emit("open", fd);
            }
          });
        }
        function createReadStream(path3, options) {
          return new fs2.ReadStream(path3, options);
        }
        function createWriteStream(path3, options) {
          return new fs2.WriteStream(path3, options);
        }
        var fs$open = fs2.open;
        fs2.open = open;
        function open(path3, flags, mode, cb) {
          if (typeof mode === "function")
            cb = mode, mode = null;
          return go$open(path3, flags, mode, cb);
          function go$open(path4, flags2, mode2, cb2, startTime) {
            return fs$open(path4, flags2, mode2, function(err, fd) {
              if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
                enqueue([go$open, [path4, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
              else {
                if (typeof cb2 === "function")
                  cb2.apply(this, arguments);
              }
            });
          }
        }
        return fs2;
      }
      function enqueue(elem) {
        debug("ENQUEUE", elem[0].name, elem[1]);
        fs[gracefulQueue].push(elem);
        retry();
      }
      var retryTimer;
      function resetQueue() {
        var now = Date.now();
        for (var i = 0; i < fs[gracefulQueue].length; ++i) {
          if (fs[gracefulQueue][i].length > 2) {
            fs[gracefulQueue][i][3] = now;
            fs[gracefulQueue][i][4] = now;
          }
        }
        retry();
      }
      function retry() {
        clearTimeout(retryTimer);
        retryTimer = void 0;
        if (fs[gracefulQueue].length === 0)
          return;
        var elem = fs[gracefulQueue].shift();
        var fn = elem[0];
        var args = elem[1];
        var err = elem[2];
        var startTime = elem[3];
        var lastTime = elem[4];
        if (startTime === void 0) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args);
        } else if (Date.now() - startTime >= 6e4) {
          debug("TIMEOUT", fn.name, args);
          var cb = args.pop();
          if (typeof cb === "function")
            cb.call(null, err);
        } else {
          var sinceAttempt = Date.now() - lastTime;
          var sinceStart = Math.max(lastTime - startTime, 1);
          var desiredDelay = Math.min(sinceStart * 1.2, 100);
          if (sinceAttempt >= desiredDelay) {
            debug("RETRY", fn.name, args);
            fn.apply(null, args.concat([startTime]));
          } else {
            fs[gracefulQueue].push(elem);
          }
        }
        if (retryTimer === void 0) {
          retryTimer = setTimeout(retry, 0);
        }
      }
    }
  });

  // ../../node_modules/fs-extra/lib/fs/index.js
  var require_fs = __commonJS({
    "../../node_modules/fs-extra/lib/fs/index.js"(exports) {
      "use strict";
      var u = require_universalify().fromCallback;
      var fs = require_graceful_fs();
      var api = [
        "access",
        "appendFile",
        "chmod",
        "chown",
        "close",
        "copyFile",
        "fchmod",
        "fchown",
        "fdatasync",
        "fstat",
        "fsync",
        "ftruncate",
        "futimes",
        "lchmod",
        "lchown",
        "link",
        "lstat",
        "mkdir",
        "mkdtemp",
        "open",
        "opendir",
        "readdir",
        "readFile",
        "readlink",
        "realpath",
        "rename",
        "rm",
        "rmdir",
        "stat",
        "symlink",
        "truncate",
        "unlink",
        "utimes",
        "writeFile"
      ].filter((key) => {
        return typeof fs[key] === "function";
      });
      Object.assign(exports, fs);
      api.forEach((method) => {
        exports[method] = u(fs[method]);
      });
      exports.realpath.native = u(fs.realpath.native);
      exports.exists = function(filename, callback) {
        if (typeof callback === "function") {
          return fs.exists(filename, callback);
        }
        return new Promise((resolve) => {
          return fs.exists(filename, resolve);
        });
      };
      exports.read = function(fd, buffer, offset, length, position, callback) {
        if (typeof callback === "function") {
          return fs.read(fd, buffer, offset, length, position, callback);
        }
        return new Promise((resolve, reject) => {
          fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
            if (err)
              return reject(err);
            resolve({ bytesRead, buffer: buffer2 });
          });
        });
      };
      exports.write = function(fd, buffer, ...args) {
        if (typeof args[args.length - 1] === "function") {
          return fs.write(fd, buffer, ...args);
        }
        return new Promise((resolve, reject) => {
          fs.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
            if (err)
              return reject(err);
            resolve({ bytesWritten, buffer: buffer2 });
          });
        });
      };
      if (typeof fs.writev === "function") {
        exports.writev = function(fd, buffers, ...args) {
          if (typeof args[args.length - 1] === "function") {
            return fs.writev(fd, buffers, ...args);
          }
          return new Promise((resolve, reject) => {
            fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
              if (err)
                return reject(err);
              resolve({ bytesWritten, buffers: buffers2 });
            });
          });
        };
      }
    }
  });

  // ../../node_modules/fs-extra/lib/mkdirs/utils.js
  var require_utils2 = __commonJS({
    "../../node_modules/fs-extra/lib/mkdirs/utils.js"(exports, module) {
      "use strict";
      var path3 = __require("path");
      module.exports.checkPath = function checkPath(pth) {
        if (process.platform === "win32") {
          const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path3.parse(pth).root, ""));
          if (pathHasInvalidWinCharacters) {
            const error = new Error(`Path contains invalid characters: ${pth}`);
            error.code = "EINVAL";
            throw error;
          }
        }
      };
    }
  });

  // ../../node_modules/fs-extra/lib/mkdirs/make-dir.js
  var require_make_dir = __commonJS({
    "../../node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports, module) {
      "use strict";
      var fs = require_fs();
      var { checkPath } = require_utils2();
      var getMode = (options) => {
        const defaults = { mode: 511 };
        if (typeof options === "number")
          return options;
        return { ...defaults, ...options }.mode;
      };
      module.exports.makeDir = async (dir, options) => {
        checkPath(dir);
        return fs.mkdir(dir, {
          mode: getMode(options),
          recursive: true
        });
      };
      module.exports.makeDirSync = (dir, options) => {
        checkPath(dir);
        return fs.mkdirSync(dir, {
          mode: getMode(options),
          recursive: true
        });
      };
    }
  });

  // ../../node_modules/fs-extra/lib/mkdirs/index.js
  var require_mkdirs = __commonJS({
    "../../node_modules/fs-extra/lib/mkdirs/index.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromPromise;
      var { makeDir: _makeDir, makeDirSync } = require_make_dir();
      var makeDir = u(_makeDir);
      module.exports = {
        mkdirs: makeDir,
        mkdirsSync: makeDirSync,
        mkdirp: makeDir,
        mkdirpSync: makeDirSync,
        ensureDir: makeDir,
        ensureDirSync: makeDirSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/util/utimes.js
  var require_utimes = __commonJS({
    "../../node_modules/fs-extra/lib/util/utimes.js"(exports, module) {
      "use strict";
      var fs = require_graceful_fs();
      function utimesMillis(path3, atime, mtime, callback) {
        fs.open(path3, "r+", (err, fd) => {
          if (err)
            return callback(err);
          fs.futimes(fd, atime, mtime, (futimesErr) => {
            fs.close(fd, (closeErr) => {
              if (callback)
                callback(futimesErr || closeErr);
            });
          });
        });
      }
      function utimesMillisSync(path3, atime, mtime) {
        const fd = fs.openSync(path3, "r+");
        fs.futimesSync(fd, atime, mtime);
        return fs.closeSync(fd);
      }
      module.exports = {
        utimesMillis,
        utimesMillisSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/util/stat.js
  var require_stat = __commonJS({
    "../../node_modules/fs-extra/lib/util/stat.js"(exports, module) {
      "use strict";
      var fs = require_fs();
      var path3 = __require("path");
      var util = __require("util");
      function getStats(src, dest, opts) {
        const statFunc = opts.dereference ? (file) => fs.stat(file, { bigint: true }) : (file) => fs.lstat(file, { bigint: true });
        return Promise.all([
          statFunc(src),
          statFunc(dest).catch((err) => {
            if (err.code === "ENOENT")
              return null;
            throw err;
          })
        ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
      }
      function getStatsSync(src, dest, opts) {
        let destStat;
        const statFunc = opts.dereference ? (file) => fs.statSync(file, { bigint: true }) : (file) => fs.lstatSync(file, { bigint: true });
        const srcStat = statFunc(src);
        try {
          destStat = statFunc(dest);
        } catch (err) {
          if (err.code === "ENOENT")
            return { srcStat, destStat: null };
          throw err;
        }
        return { srcStat, destStat };
      }
      function checkPaths(src, dest, funcName, opts, cb) {
        util.callbackify(getStats)(src, dest, opts, (err, stats) => {
          if (err)
            return cb(err);
          const { srcStat, destStat } = stats;
          if (destStat) {
            if (areIdentical(srcStat, destStat)) {
              const srcBaseName = path3.basename(src);
              const destBaseName = path3.basename(dest);
              if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
                return cb(null, { srcStat, destStat, isChangingCase: true });
              }
              return cb(new Error("Source and destination must not be the same."));
            }
            if (srcStat.isDirectory() && !destStat.isDirectory()) {
              return cb(new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`));
            }
            if (!srcStat.isDirectory() && destStat.isDirectory()) {
              return cb(new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`));
            }
          }
          if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
            return cb(new Error(errMsg(src, dest, funcName)));
          }
          return cb(null, { srcStat, destStat });
        });
      }
      function checkPathsSync(src, dest, funcName, opts) {
        const { srcStat, destStat } = getStatsSync(src, dest, opts);
        if (destStat) {
          if (areIdentical(srcStat, destStat)) {
            const srcBaseName = path3.basename(src);
            const destBaseName = path3.basename(dest);
            if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
              return { srcStat, destStat, isChangingCase: true };
            }
            throw new Error("Source and destination must not be the same.");
          }
          if (srcStat.isDirectory() && !destStat.isDirectory()) {
            throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
          }
          if (!srcStat.isDirectory() && destStat.isDirectory()) {
            throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
          }
        }
        if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
          throw new Error(errMsg(src, dest, funcName));
        }
        return { srcStat, destStat };
      }
      function checkParentPaths(src, srcStat, dest, funcName, cb) {
        const srcParent = path3.resolve(path3.dirname(src));
        const destParent = path3.resolve(path3.dirname(dest));
        if (destParent === srcParent || destParent === path3.parse(destParent).root)
          return cb();
        fs.stat(destParent, { bigint: true }, (err, destStat) => {
          if (err) {
            if (err.code === "ENOENT")
              return cb();
            return cb(err);
          }
          if (areIdentical(srcStat, destStat)) {
            return cb(new Error(errMsg(src, dest, funcName)));
          }
          return checkParentPaths(src, srcStat, destParent, funcName, cb);
        });
      }
      function checkParentPathsSync(src, srcStat, dest, funcName) {
        const srcParent = path3.resolve(path3.dirname(src));
        const destParent = path3.resolve(path3.dirname(dest));
        if (destParent === srcParent || destParent === path3.parse(destParent).root)
          return;
        let destStat;
        try {
          destStat = fs.statSync(destParent, { bigint: true });
        } catch (err) {
          if (err.code === "ENOENT")
            return;
          throw err;
        }
        if (areIdentical(srcStat, destStat)) {
          throw new Error(errMsg(src, dest, funcName));
        }
        return checkParentPathsSync(src, srcStat, destParent, funcName);
      }
      function areIdentical(srcStat, destStat) {
        return destStat.ino && destStat.dev && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
      }
      function isSrcSubdir(src, dest) {
        const srcArr = path3.resolve(src).split(path3.sep).filter((i) => i);
        const destArr = path3.resolve(dest).split(path3.sep).filter((i) => i);
        return srcArr.reduce((acc, cur, i) => acc && destArr[i] === cur, true);
      }
      function errMsg(src, dest, funcName) {
        return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
      }
      module.exports = {
        checkPaths,
        checkPathsSync,
        checkParentPaths,
        checkParentPathsSync,
        isSrcSubdir,
        areIdentical
      };
    }
  });

  // ../../node_modules/fs-extra/lib/copy-sync/copy-sync.js
  var require_copy_sync = __commonJS({
    "../../node_modules/fs-extra/lib/copy-sync/copy-sync.js"(exports, module) {
      "use strict";
      var fs = require_graceful_fs();
      var path3 = __require("path");
      var mkdirsSync = require_mkdirs().mkdirsSync;
      var utimesMillisSync = require_utimes().utimesMillisSync;
      var stat = require_stat();
      function copySync(src, dest, opts) {
        if (typeof opts === "function") {
          opts = { filter: opts };
        }
        opts = opts || {};
        opts.clobber = "clobber" in opts ? !!opts.clobber : true;
        opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
        if (opts.preserveTimestamps && process.arch === "ia32") {
          console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
        }
        const { srcStat, destStat } = stat.checkPathsSync(src, dest, "copy", opts);
        stat.checkParentPathsSync(src, srcStat, dest, "copy");
        return handleFilterAndCopy(destStat, src, dest, opts);
      }
      function handleFilterAndCopy(destStat, src, dest, opts) {
        if (opts.filter && !opts.filter(src, dest))
          return;
        const destParent = path3.dirname(dest);
        if (!fs.existsSync(destParent))
          mkdirsSync(destParent);
        return getStats(destStat, src, dest, opts);
      }
      function startCopy(destStat, src, dest, opts) {
        if (opts.filter && !opts.filter(src, dest))
          return;
        return getStats(destStat, src, dest, opts);
      }
      function getStats(destStat, src, dest, opts) {
        const statSync = opts.dereference ? fs.statSync : fs.lstatSync;
        const srcStat = statSync(src);
        if (srcStat.isDirectory())
          return onDir(srcStat, destStat, src, dest, opts);
        else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
          return onFile(srcStat, destStat, src, dest, opts);
        else if (srcStat.isSymbolicLink())
          return onLink(destStat, src, dest, opts);
        else if (srcStat.isSocket())
          throw new Error(`Cannot copy a socket file: ${src}`);
        else if (srcStat.isFIFO())
          throw new Error(`Cannot copy a FIFO pipe: ${src}`);
        throw new Error(`Unknown file: ${src}`);
      }
      function onFile(srcStat, destStat, src, dest, opts) {
        if (!destStat)
          return copyFile(srcStat, src, dest, opts);
        return mayCopyFile(srcStat, src, dest, opts);
      }
      function mayCopyFile(srcStat, src, dest, opts) {
        if (opts.overwrite) {
          fs.unlinkSync(dest);
          return copyFile(srcStat, src, dest, opts);
        } else if (opts.errorOnExist) {
          throw new Error(`'${dest}' already exists`);
        }
      }
      function copyFile(srcStat, src, dest, opts) {
        fs.copyFileSync(src, dest);
        if (opts.preserveTimestamps)
          handleTimestamps(srcStat.mode, src, dest);
        return setDestMode(dest, srcStat.mode);
      }
      function handleTimestamps(srcMode, src, dest) {
        if (fileIsNotWritable(srcMode))
          makeFileWritable(dest, srcMode);
        return setDestTimestamps(src, dest);
      }
      function fileIsNotWritable(srcMode) {
        return (srcMode & 128) === 0;
      }
      function makeFileWritable(dest, srcMode) {
        return setDestMode(dest, srcMode | 128);
      }
      function setDestMode(dest, srcMode) {
        return fs.chmodSync(dest, srcMode);
      }
      function setDestTimestamps(src, dest) {
        const updatedSrcStat = fs.statSync(src);
        return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
      }
      function onDir(srcStat, destStat, src, dest, opts) {
        if (!destStat)
          return mkDirAndCopy(srcStat.mode, src, dest, opts);
        return copyDir(src, dest, opts);
      }
      function mkDirAndCopy(srcMode, src, dest, opts) {
        fs.mkdirSync(dest);
        copyDir(src, dest, opts);
        return setDestMode(dest, srcMode);
      }
      function copyDir(src, dest, opts) {
        fs.readdirSync(src).forEach((item) => copyDirItem(item, src, dest, opts));
      }
      function copyDirItem(item, src, dest, opts) {
        const srcItem = path3.join(src, item);
        const destItem = path3.join(dest, item);
        const { destStat } = stat.checkPathsSync(srcItem, destItem, "copy", opts);
        return startCopy(destStat, srcItem, destItem, opts);
      }
      function onLink(destStat, src, dest, opts) {
        let resolvedSrc = fs.readlinkSync(src);
        if (opts.dereference) {
          resolvedSrc = path3.resolve(process.cwd(), resolvedSrc);
        }
        if (!destStat) {
          return fs.symlinkSync(resolvedSrc, dest);
        } else {
          let resolvedDest;
          try {
            resolvedDest = fs.readlinkSync(dest);
          } catch (err) {
            if (err.code === "EINVAL" || err.code === "UNKNOWN")
              return fs.symlinkSync(resolvedSrc, dest);
            throw err;
          }
          if (opts.dereference) {
            resolvedDest = path3.resolve(process.cwd(), resolvedDest);
          }
          if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
            throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
          }
          if (fs.statSync(dest).isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
            throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
          }
          return copyLink(resolvedSrc, dest);
        }
      }
      function copyLink(resolvedSrc, dest) {
        fs.unlinkSync(dest);
        return fs.symlinkSync(resolvedSrc, dest);
      }
      module.exports = copySync;
    }
  });

  // ../../node_modules/fs-extra/lib/copy-sync/index.js
  var require_copy_sync2 = __commonJS({
    "../../node_modules/fs-extra/lib/copy-sync/index.js"(exports, module) {
      "use strict";
      module.exports = {
        copySync: require_copy_sync()
      };
    }
  });

  // ../../node_modules/fs-extra/lib/path-exists/index.js
  var require_path_exists = __commonJS({
    "../../node_modules/fs-extra/lib/path-exists/index.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromPromise;
      var fs = require_fs();
      function pathExists3(path3) {
        return fs.access(path3).then(() => true).catch(() => false);
      }
      module.exports = {
        pathExists: u(pathExists3),
        pathExistsSync: fs.existsSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/copy/copy.js
  var require_copy = __commonJS({
    "../../node_modules/fs-extra/lib/copy/copy.js"(exports, module) {
      "use strict";
      var fs = require_graceful_fs();
      var path3 = __require("path");
      var mkdirs = require_mkdirs().mkdirs;
      var pathExists3 = require_path_exists().pathExists;
      var utimesMillis = require_utimes().utimesMillis;
      var stat = require_stat();
      function copy(src, dest, opts, cb) {
        if (typeof opts === "function" && !cb) {
          cb = opts;
          opts = {};
        } else if (typeof opts === "function") {
          opts = { filter: opts };
        }
        cb = cb || function() {
        };
        opts = opts || {};
        opts.clobber = "clobber" in opts ? !!opts.clobber : true;
        opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
        if (opts.preserveTimestamps && process.arch === "ia32") {
          console.warn(`fs-extra: Using the preserveTimestamps option in 32-bit node is not recommended;

    see https://github.com/jprichardson/node-fs-extra/issues/269`);
        }
        stat.checkPaths(src, dest, "copy", opts, (err, stats) => {
          if (err)
            return cb(err);
          const { srcStat, destStat } = stats;
          stat.checkParentPaths(src, srcStat, dest, "copy", (err2) => {
            if (err2)
              return cb(err2);
            if (opts.filter)
              return handleFilter(checkParentDir, destStat, src, dest, opts, cb);
            return checkParentDir(destStat, src, dest, opts, cb);
          });
        });
      }
      function checkParentDir(destStat, src, dest, opts, cb) {
        const destParent = path3.dirname(dest);
        pathExists3(destParent, (err, dirExists) => {
          if (err)
            return cb(err);
          if (dirExists)
            return getStats(destStat, src, dest, opts, cb);
          mkdirs(destParent, (err2) => {
            if (err2)
              return cb(err2);
            return getStats(destStat, src, dest, opts, cb);
          });
        });
      }
      function handleFilter(onInclude, destStat, src, dest, opts, cb) {
        Promise.resolve(opts.filter(src, dest)).then((include) => {
          if (include)
            return onInclude(destStat, src, dest, opts, cb);
          return cb();
        }, (error) => cb(error));
      }
      function startCopy(destStat, src, dest, opts, cb) {
        if (opts.filter)
          return handleFilter(getStats, destStat, src, dest, opts, cb);
        return getStats(destStat, src, dest, opts, cb);
      }
      function getStats(destStat, src, dest, opts, cb) {
        const stat2 = opts.dereference ? fs.stat : fs.lstat;
        stat2(src, (err, srcStat) => {
          if (err)
            return cb(err);
          if (srcStat.isDirectory())
            return onDir(srcStat, destStat, src, dest, opts, cb);
          else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice())
            return onFile(srcStat, destStat, src, dest, opts, cb);
          else if (srcStat.isSymbolicLink())
            return onLink(destStat, src, dest, opts, cb);
          else if (srcStat.isSocket())
            return cb(new Error(`Cannot copy a socket file: ${src}`));
          else if (srcStat.isFIFO())
            return cb(new Error(`Cannot copy a FIFO pipe: ${src}`));
          return cb(new Error(`Unknown file: ${src}`));
        });
      }
      function onFile(srcStat, destStat, src, dest, opts, cb) {
        if (!destStat)
          return copyFile(srcStat, src, dest, opts, cb);
        return mayCopyFile(srcStat, src, dest, opts, cb);
      }
      function mayCopyFile(srcStat, src, dest, opts, cb) {
        if (opts.overwrite) {
          fs.unlink(dest, (err) => {
            if (err)
              return cb(err);
            return copyFile(srcStat, src, dest, opts, cb);
          });
        } else if (opts.errorOnExist) {
          return cb(new Error(`'${dest}' already exists`));
        } else
          return cb();
      }
      function copyFile(srcStat, src, dest, opts, cb) {
        fs.copyFile(src, dest, (err) => {
          if (err)
            return cb(err);
          if (opts.preserveTimestamps)
            return handleTimestampsAndMode(srcStat.mode, src, dest, cb);
          return setDestMode(dest, srcStat.mode, cb);
        });
      }
      function handleTimestampsAndMode(srcMode, src, dest, cb) {
        if (fileIsNotWritable(srcMode)) {
          return makeFileWritable(dest, srcMode, (err) => {
            if (err)
              return cb(err);
            return setDestTimestampsAndMode(srcMode, src, dest, cb);
          });
        }
        return setDestTimestampsAndMode(srcMode, src, dest, cb);
      }
      function fileIsNotWritable(srcMode) {
        return (srcMode & 128) === 0;
      }
      function makeFileWritable(dest, srcMode, cb) {
        return setDestMode(dest, srcMode | 128, cb);
      }
      function setDestTimestampsAndMode(srcMode, src, dest, cb) {
        setDestTimestamps(src, dest, (err) => {
          if (err)
            return cb(err);
          return setDestMode(dest, srcMode, cb);
        });
      }
      function setDestMode(dest, srcMode, cb) {
        return fs.chmod(dest, srcMode, cb);
      }
      function setDestTimestamps(src, dest, cb) {
        fs.stat(src, (err, updatedSrcStat) => {
          if (err)
            return cb(err);
          return utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime, cb);
        });
      }
      function onDir(srcStat, destStat, src, dest, opts, cb) {
        if (!destStat)
          return mkDirAndCopy(srcStat.mode, src, dest, opts, cb);
        return copyDir(src, dest, opts, cb);
      }
      function mkDirAndCopy(srcMode, src, dest, opts, cb) {
        fs.mkdir(dest, (err) => {
          if (err)
            return cb(err);
          copyDir(src, dest, opts, (err2) => {
            if (err2)
              return cb(err2);
            return setDestMode(dest, srcMode, cb);
          });
        });
      }
      function copyDir(src, dest, opts, cb) {
        fs.readdir(src, (err, items) => {
          if (err)
            return cb(err);
          return copyDirItems(items, src, dest, opts, cb);
        });
      }
      function copyDirItems(items, src, dest, opts, cb) {
        const item = items.pop();
        if (!item)
          return cb();
        return copyDirItem(items, item, src, dest, opts, cb);
      }
      function copyDirItem(items, item, src, dest, opts, cb) {
        const srcItem = path3.join(src, item);
        const destItem = path3.join(dest, item);
        stat.checkPaths(srcItem, destItem, "copy", opts, (err, stats) => {
          if (err)
            return cb(err);
          const { destStat } = stats;
          startCopy(destStat, srcItem, destItem, opts, (err2) => {
            if (err2)
              return cb(err2);
            return copyDirItems(items, src, dest, opts, cb);
          });
        });
      }
      function onLink(destStat, src, dest, opts, cb) {
        fs.readlink(src, (err, resolvedSrc) => {
          if (err)
            return cb(err);
          if (opts.dereference) {
            resolvedSrc = path3.resolve(process.cwd(), resolvedSrc);
          }
          if (!destStat) {
            return fs.symlink(resolvedSrc, dest, cb);
          } else {
            fs.readlink(dest, (err2, resolvedDest) => {
              if (err2) {
                if (err2.code === "EINVAL" || err2.code === "UNKNOWN")
                  return fs.symlink(resolvedSrc, dest, cb);
                return cb(err2);
              }
              if (opts.dereference) {
                resolvedDest = path3.resolve(process.cwd(), resolvedDest);
              }
              if (stat.isSrcSubdir(resolvedSrc, resolvedDest)) {
                return cb(new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`));
              }
              if (destStat.isDirectory() && stat.isSrcSubdir(resolvedDest, resolvedSrc)) {
                return cb(new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`));
              }
              return copyLink(resolvedSrc, dest, cb);
            });
          }
        });
      }
      function copyLink(resolvedSrc, dest, cb) {
        fs.unlink(dest, (err) => {
          if (err)
            return cb(err);
          return fs.symlink(resolvedSrc, dest, cb);
        });
      }
      module.exports = copy;
    }
  });

  // ../../node_modules/fs-extra/lib/copy/index.js
  var require_copy2 = __commonJS({
    "../../node_modules/fs-extra/lib/copy/index.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromCallback;
      module.exports = {
        copy: u(require_copy())
      };
    }
  });

  // ../../node_modules/fs-extra/lib/remove/rimraf.js
  var require_rimraf = __commonJS({
    "../../node_modules/fs-extra/lib/remove/rimraf.js"(exports, module) {
      "use strict";
      var fs = require_graceful_fs();
      var path3 = __require("path");
      var assert = __require("assert");
      var isWindows = process.platform === "win32";
      function defaults(options) {
        const methods = [
          "unlink",
          "chmod",
          "stat",
          "lstat",
          "rmdir",
          "readdir"
        ];
        methods.forEach((m) => {
          options[m] = options[m] || fs[m];
          m = m + "Sync";
          options[m] = options[m] || fs[m];
        });
        options.maxBusyTries = options.maxBusyTries || 3;
      }
      function rimraf(p, options, cb) {
        let busyTries = 0;
        if (typeof options === "function") {
          cb = options;
          options = {};
        }
        assert(p, "rimraf: missing path");
        assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
        assert.strictEqual(typeof cb, "function", "rimraf: callback function required");
        assert(options, "rimraf: invalid options argument provided");
        assert.strictEqual(typeof options, "object", "rimraf: options should be object");
        defaults(options);
        rimraf_(p, options, function CB(er) {
          if (er) {
            if ((er.code === "EBUSY" || er.code === "ENOTEMPTY" || er.code === "EPERM") && busyTries < options.maxBusyTries) {
              busyTries++;
              const time = busyTries * 100;
              return setTimeout(() => rimraf_(p, options, CB), time);
            }
            if (er.code === "ENOENT")
              er = null;
          }
          cb(er);
        });
      }
      function rimraf_(p, options, cb) {
        assert(p);
        assert(options);
        assert(typeof cb === "function");
        options.lstat(p, (er, st) => {
          if (er && er.code === "ENOENT") {
            return cb(null);
          }
          if (er && er.code === "EPERM" && isWindows) {
            return fixWinEPERM(p, options, er, cb);
          }
          if (st && st.isDirectory()) {
            return rmdir(p, options, er, cb);
          }
          options.unlink(p, (er2) => {
            if (er2) {
              if (er2.code === "ENOENT") {
                return cb(null);
              }
              if (er2.code === "EPERM") {
                return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
              }
              if (er2.code === "EISDIR") {
                return rmdir(p, options, er2, cb);
              }
            }
            return cb(er2);
          });
        });
      }
      function fixWinEPERM(p, options, er, cb) {
        assert(p);
        assert(options);
        assert(typeof cb === "function");
        options.chmod(p, 438, (er2) => {
          if (er2) {
            cb(er2.code === "ENOENT" ? null : er);
          } else {
            options.stat(p, (er3, stats) => {
              if (er3) {
                cb(er3.code === "ENOENT" ? null : er);
              } else if (stats.isDirectory()) {
                rmdir(p, options, er, cb);
              } else {
                options.unlink(p, cb);
              }
            });
          }
        });
      }
      function fixWinEPERMSync(p, options, er) {
        let stats;
        assert(p);
        assert(options);
        try {
          options.chmodSync(p, 438);
        } catch (er2) {
          if (er2.code === "ENOENT") {
            return;
          } else {
            throw er;
          }
        }
        try {
          stats = options.statSync(p);
        } catch (er3) {
          if (er3.code === "ENOENT") {
            return;
          } else {
            throw er;
          }
        }
        if (stats.isDirectory()) {
          rmdirSync(p, options, er);
        } else {
          options.unlinkSync(p);
        }
      }
      function rmdir(p, options, originalEr, cb) {
        assert(p);
        assert(options);
        assert(typeof cb === "function");
        options.rmdir(p, (er) => {
          if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")) {
            rmkids(p, options, cb);
          } else if (er && er.code === "ENOTDIR") {
            cb(originalEr);
          } else {
            cb(er);
          }
        });
      }
      function rmkids(p, options, cb) {
        assert(p);
        assert(options);
        assert(typeof cb === "function");
        options.readdir(p, (er, files) => {
          if (er)
            return cb(er);
          let n = files.length;
          let errState;
          if (n === 0)
            return options.rmdir(p, cb);
          files.forEach((f) => {
            rimraf(path3.join(p, f), options, (er2) => {
              if (errState) {
                return;
              }
              if (er2)
                return cb(errState = er2);
              if (--n === 0) {
                options.rmdir(p, cb);
              }
            });
          });
        });
      }
      function rimrafSync(p, options) {
        let st;
        options = options || {};
        defaults(options);
        assert(p, "rimraf: missing path");
        assert.strictEqual(typeof p, "string", "rimraf: path should be a string");
        assert(options, "rimraf: missing options");
        assert.strictEqual(typeof options, "object", "rimraf: options should be object");
        try {
          st = options.lstatSync(p);
        } catch (er) {
          if (er.code === "ENOENT") {
            return;
          }
          if (er.code === "EPERM" && isWindows) {
            fixWinEPERMSync(p, options, er);
          }
        }
        try {
          if (st && st.isDirectory()) {
            rmdirSync(p, options, null);
          } else {
            options.unlinkSync(p);
          }
        } catch (er) {
          if (er.code === "ENOENT") {
            return;
          } else if (er.code === "EPERM") {
            return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
          } else if (er.code !== "EISDIR") {
            throw er;
          }
          rmdirSync(p, options, er);
        }
      }
      function rmdirSync(p, options, originalEr) {
        assert(p);
        assert(options);
        try {
          options.rmdirSync(p);
        } catch (er) {
          if (er.code === "ENOTDIR") {
            throw originalEr;
          } else if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM") {
            rmkidsSync(p, options);
          } else if (er.code !== "ENOENT") {
            throw er;
          }
        }
      }
      function rmkidsSync(p, options) {
        assert(p);
        assert(options);
        options.readdirSync(p).forEach((f) => rimrafSync(path3.join(p, f), options));
        if (isWindows) {
          const startTime = Date.now();
          do {
            try {
              const ret = options.rmdirSync(p, options);
              return ret;
            } catch {
            }
          } while (Date.now() - startTime < 500);
        } else {
          const ret = options.rmdirSync(p, options);
          return ret;
        }
      }
      module.exports = rimraf;
      rimraf.sync = rimrafSync;
    }
  });

  // ../../node_modules/fs-extra/lib/remove/index.js
  var require_remove = __commonJS({
    "../../node_modules/fs-extra/lib/remove/index.js"(exports, module) {
      "use strict";
      var fs = require_graceful_fs();
      var u = require_universalify().fromCallback;
      var rimraf = require_rimraf();
      function remove(path3, callback) {
        if (fs.rm)
          return fs.rm(path3, { recursive: true, force: true }, callback);
        rimraf(path3, callback);
      }
      function removeSync(path3) {
        if (fs.rmSync)
          return fs.rmSync(path3, { recursive: true, force: true });
        rimraf.sync(path3);
      }
      module.exports = {
        remove: u(remove),
        removeSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/empty/index.js
  var require_empty = __commonJS({
    "../../node_modules/fs-extra/lib/empty/index.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromPromise;
      var fs = require_fs();
      var path3 = __require("path");
      var mkdir = require_mkdirs();
      var remove = require_remove();
      var emptyDir = u(async function emptyDir2(dir) {
        let items;
        try {
          items = await fs.readdir(dir);
        } catch {
          return mkdir.mkdirs(dir);
        }
        return Promise.all(items.map((item) => remove.remove(path3.join(dir, item))));
      });
      function emptyDirSync(dir) {
        let items;
        try {
          items = fs.readdirSync(dir);
        } catch {
          return mkdir.mkdirsSync(dir);
        }
        items.forEach((item) => {
          item = path3.join(dir, item);
          remove.removeSync(item);
        });
      }
      module.exports = {
        emptyDirSync,
        emptydirSync: emptyDirSync,
        emptyDir,
        emptydir: emptyDir
      };
    }
  });

  // ../../node_modules/fs-extra/lib/ensure/file.js
  var require_file = __commonJS({
    "../../node_modules/fs-extra/lib/ensure/file.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromCallback;
      var path3 = __require("path");
      var fs = require_graceful_fs();
      var mkdir = require_mkdirs();
      function createFile(file, callback) {
        function makeFile() {
          fs.writeFile(file, "", (err) => {
            if (err)
              return callback(err);
            callback();
          });
        }
        fs.stat(file, (err, stats) => {
          if (!err && stats.isFile())
            return callback();
          const dir = path3.dirname(file);
          fs.stat(dir, (err2, stats2) => {
            if (err2) {
              if (err2.code === "ENOENT") {
                return mkdir.mkdirs(dir, (err3) => {
                  if (err3)
                    return callback(err3);
                  makeFile();
                });
              }
              return callback(err2);
            }
            if (stats2.isDirectory())
              makeFile();
            else {
              fs.readdir(dir, (err3) => {
                if (err3)
                  return callback(err3);
              });
            }
          });
        });
      }
      function createFileSync(file) {
        let stats;
        try {
          stats = fs.statSync(file);
        } catch {
        }
        if (stats && stats.isFile())
          return;
        const dir = path3.dirname(file);
        try {
          if (!fs.statSync(dir).isDirectory()) {
            fs.readdirSync(dir);
          }
        } catch (err) {
          if (err && err.code === "ENOENT")
            mkdir.mkdirsSync(dir);
          else
            throw err;
        }
        fs.writeFileSync(file, "");
      }
      module.exports = {
        createFile: u(createFile),
        createFileSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/ensure/link.js
  var require_link = __commonJS({
    "../../node_modules/fs-extra/lib/ensure/link.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromCallback;
      var path3 = __require("path");
      var fs = require_graceful_fs();
      var mkdir = require_mkdirs();
      var pathExists3 = require_path_exists().pathExists;
      var { areIdentical } = require_stat();
      function createLink(srcpath, dstpath, callback) {
        function makeLink(srcpath2, dstpath2) {
          fs.link(srcpath2, dstpath2, (err) => {
            if (err)
              return callback(err);
            callback(null);
          });
        }
        fs.lstat(dstpath, (_, dstStat) => {
          fs.lstat(srcpath, (err, srcStat) => {
            if (err) {
              err.message = err.message.replace("lstat", "ensureLink");
              return callback(err);
            }
            if (dstStat && areIdentical(srcStat, dstStat))
              return callback(null);
            const dir = path3.dirname(dstpath);
            pathExists3(dir, (err2, dirExists) => {
              if (err2)
                return callback(err2);
              if (dirExists)
                return makeLink(srcpath, dstpath);
              mkdir.mkdirs(dir, (err3) => {
                if (err3)
                  return callback(err3);
                makeLink(srcpath, dstpath);
              });
            });
          });
        });
      }
      function createLinkSync(srcpath, dstpath) {
        let dstStat;
        try {
          dstStat = fs.lstatSync(dstpath);
        } catch {
        }
        try {
          const srcStat = fs.lstatSync(srcpath);
          if (dstStat && areIdentical(srcStat, dstStat))
            return;
        } catch (err) {
          err.message = err.message.replace("lstat", "ensureLink");
          throw err;
        }
        const dir = path3.dirname(dstpath);
        const dirExists = fs.existsSync(dir);
        if (dirExists)
          return fs.linkSync(srcpath, dstpath);
        mkdir.mkdirsSync(dir);
        return fs.linkSync(srcpath, dstpath);
      }
      module.exports = {
        createLink: u(createLink),
        createLinkSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/ensure/symlink-paths.js
  var require_symlink_paths = __commonJS({
    "../../node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module) {
      "use strict";
      var path3 = __require("path");
      var fs = require_graceful_fs();
      var pathExists3 = require_path_exists().pathExists;
      function symlinkPaths(srcpath, dstpath, callback) {
        if (path3.isAbsolute(srcpath)) {
          return fs.lstat(srcpath, (err) => {
            if (err) {
              err.message = err.message.replace("lstat", "ensureSymlink");
              return callback(err);
            }
            return callback(null, {
              toCwd: srcpath,
              toDst: srcpath
            });
          });
        } else {
          const dstdir = path3.dirname(dstpath);
          const relativeToDst = path3.join(dstdir, srcpath);
          return pathExists3(relativeToDst, (err, exists) => {
            if (err)
              return callback(err);
            if (exists) {
              return callback(null, {
                toCwd: relativeToDst,
                toDst: srcpath
              });
            } else {
              return fs.lstat(srcpath, (err2) => {
                if (err2) {
                  err2.message = err2.message.replace("lstat", "ensureSymlink");
                  return callback(err2);
                }
                return callback(null, {
                  toCwd: srcpath,
                  toDst: path3.relative(dstdir, srcpath)
                });
              });
            }
          });
        }
      }
      function symlinkPathsSync(srcpath, dstpath) {
        let exists;
        if (path3.isAbsolute(srcpath)) {
          exists = fs.existsSync(srcpath);
          if (!exists)
            throw new Error("absolute srcpath does not exist");
          return {
            toCwd: srcpath,
            toDst: srcpath
          };
        } else {
          const dstdir = path3.dirname(dstpath);
          const relativeToDst = path3.join(dstdir, srcpath);
          exists = fs.existsSync(relativeToDst);
          if (exists) {
            return {
              toCwd: relativeToDst,
              toDst: srcpath
            };
          } else {
            exists = fs.existsSync(srcpath);
            if (!exists)
              throw new Error("relative srcpath does not exist");
            return {
              toCwd: srcpath,
              toDst: path3.relative(dstdir, srcpath)
            };
          }
        }
      }
      module.exports = {
        symlinkPaths,
        symlinkPathsSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/ensure/symlink-type.js
  var require_symlink_type = __commonJS({
    "../../node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module) {
      "use strict";
      var fs = require_graceful_fs();
      function symlinkType(srcpath, type, callback) {
        callback = typeof type === "function" ? type : callback;
        type = typeof type === "function" ? false : type;
        if (type)
          return callback(null, type);
        fs.lstat(srcpath, (err, stats) => {
          if (err)
            return callback(null, "file");
          type = stats && stats.isDirectory() ? "dir" : "file";
          callback(null, type);
        });
      }
      function symlinkTypeSync(srcpath, type) {
        let stats;
        if (type)
          return type;
        try {
          stats = fs.lstatSync(srcpath);
        } catch {
          return "file";
        }
        return stats && stats.isDirectory() ? "dir" : "file";
      }
      module.exports = {
        symlinkType,
        symlinkTypeSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/ensure/symlink.js
  var require_symlink = __commonJS({
    "../../node_modules/fs-extra/lib/ensure/symlink.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromCallback;
      var path3 = __require("path");
      var fs = require_fs();
      var _mkdirs = require_mkdirs();
      var mkdirs = _mkdirs.mkdirs;
      var mkdirsSync = _mkdirs.mkdirsSync;
      var _symlinkPaths = require_symlink_paths();
      var symlinkPaths = _symlinkPaths.symlinkPaths;
      var symlinkPathsSync = _symlinkPaths.symlinkPathsSync;
      var _symlinkType = require_symlink_type();
      var symlinkType = _symlinkType.symlinkType;
      var symlinkTypeSync = _symlinkType.symlinkTypeSync;
      var pathExists3 = require_path_exists().pathExists;
      var { areIdentical } = require_stat();
      function createSymlink(srcpath, dstpath, type, callback) {
        callback = typeof type === "function" ? type : callback;
        type = typeof type === "function" ? false : type;
        fs.lstat(dstpath, (err, stats) => {
          if (!err && stats.isSymbolicLink()) {
            Promise.all([
              fs.stat(srcpath),
              fs.stat(dstpath)
            ]).then(([srcStat, dstStat]) => {
              if (areIdentical(srcStat, dstStat))
                return callback(null);
              _createSymlink(srcpath, dstpath, type, callback);
            });
          } else
            _createSymlink(srcpath, dstpath, type, callback);
        });
      }
      function _createSymlink(srcpath, dstpath, type, callback) {
        symlinkPaths(srcpath, dstpath, (err, relative) => {
          if (err)
            return callback(err);
          srcpath = relative.toDst;
          symlinkType(relative.toCwd, type, (err2, type2) => {
            if (err2)
              return callback(err2);
            const dir = path3.dirname(dstpath);
            pathExists3(dir, (err3, dirExists) => {
              if (err3)
                return callback(err3);
              if (dirExists)
                return fs.symlink(srcpath, dstpath, type2, callback);
              mkdirs(dir, (err4) => {
                if (err4)
                  return callback(err4);
                fs.symlink(srcpath, dstpath, type2, callback);
              });
            });
          });
        });
      }
      function createSymlinkSync(srcpath, dstpath, type) {
        let stats;
        try {
          stats = fs.lstatSync(dstpath);
        } catch {
        }
        if (stats && stats.isSymbolicLink()) {
          const srcStat = fs.statSync(srcpath);
          const dstStat = fs.statSync(dstpath);
          if (areIdentical(srcStat, dstStat))
            return;
        }
        const relative = symlinkPathsSync(srcpath, dstpath);
        srcpath = relative.toDst;
        type = symlinkTypeSync(relative.toCwd, type);
        const dir = path3.dirname(dstpath);
        const exists = fs.existsSync(dir);
        if (exists)
          return fs.symlinkSync(srcpath, dstpath, type);
        mkdirsSync(dir);
        return fs.symlinkSync(srcpath, dstpath, type);
      }
      module.exports = {
        createSymlink: u(createSymlink),
        createSymlinkSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/ensure/index.js
  var require_ensure = __commonJS({
    "../../node_modules/fs-extra/lib/ensure/index.js"(exports, module) {
      "use strict";
      var file = require_file();
      var link = require_link();
      var symlink = require_symlink();
      module.exports = {
        createFile: file.createFile,
        createFileSync: file.createFileSync,
        ensureFile: file.createFile,
        ensureFileSync: file.createFileSync,
        createLink: link.createLink,
        createLinkSync: link.createLinkSync,
        ensureLink: link.createLink,
        ensureLinkSync: link.createLinkSync,
        createSymlink: symlink.createSymlink,
        createSymlinkSync: symlink.createSymlinkSync,
        ensureSymlink: symlink.createSymlink,
        ensureSymlinkSync: symlink.createSymlinkSync
      };
    }
  });

  // ../../node_modules/jsonfile/utils.js
  var require_utils3 = __commonJS({
    "../../node_modules/jsonfile/utils.js"(exports, module) {
      function stringify(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
        const EOF = finalEOL ? EOL : "";
        const str = JSON.stringify(obj, replacer, spaces);
        return str.replace(/\n/g, EOL) + EOF;
      }
      function stripBom(content) {
        if (Buffer.isBuffer(content))
          content = content.toString("utf8");
        return content.replace(/^\uFEFF/, "");
      }
      module.exports = { stringify, stripBom };
    }
  });

  // ../../node_modules/jsonfile/index.js
  var require_jsonfile = __commonJS({
    "../../node_modules/jsonfile/index.js"(exports, module) {
      var _fs;
      try {
        _fs = require_graceful_fs();
      } catch (_) {
        _fs = __require("fs");
      }
      var universalify = require_universalify();
      var { stringify, stripBom } = require_utils3();
      async function _readFile(file, options = {}) {
        if (typeof options === "string") {
          options = { encoding: options };
        }
        const fs = options.fs || _fs;
        const shouldThrow = "throws" in options ? options.throws : true;
        let data = await universalify.fromCallback(fs.readFile)(file, options);
        data = stripBom(data);
        let obj;
        try {
          obj = JSON.parse(data, options ? options.reviver : null);
        } catch (err) {
          if (shouldThrow) {
            err.message = `${file}: ${err.message}`;
            throw err;
          } else {
            return null;
          }
        }
        return obj;
      }
      var readFile = universalify.fromPromise(_readFile);
      function readFileSync(file, options = {}) {
        if (typeof options === "string") {
          options = { encoding: options };
        }
        const fs = options.fs || _fs;
        const shouldThrow = "throws" in options ? options.throws : true;
        try {
          let content = fs.readFileSync(file, options);
          content = stripBom(content);
          return JSON.parse(content, options.reviver);
        } catch (err) {
          if (shouldThrow) {
            err.message = `${file}: ${err.message}`;
            throw err;
          } else {
            return null;
          }
        }
      }
      async function _writeFile(file, obj, options = {}) {
        const fs = options.fs || _fs;
        const str = stringify(obj, options);
        await universalify.fromCallback(fs.writeFile)(file, str, options);
      }
      var writeFile = universalify.fromPromise(_writeFile);
      function writeFileSync(file, obj, options = {}) {
        const fs = options.fs || _fs;
        const str = stringify(obj, options);
        return fs.writeFileSync(file, str, options);
      }
      var jsonfile = {
        readFile,
        readFileSync,
        writeFile,
        writeFileSync
      };
      module.exports = jsonfile;
    }
  });

  // ../../node_modules/fs-extra/lib/json/jsonfile.js
  var require_jsonfile2 = __commonJS({
    "../../node_modules/fs-extra/lib/json/jsonfile.js"(exports, module) {
      "use strict";
      var jsonFile = require_jsonfile();
      module.exports = {
        readJson: jsonFile.readFile,
        readJsonSync: jsonFile.readFileSync,
        writeJson: jsonFile.writeFile,
        writeJsonSync: jsonFile.writeFileSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/output/index.js
  var require_output = __commonJS({
    "../../node_modules/fs-extra/lib/output/index.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromCallback;
      var fs = require_graceful_fs();
      var path3 = __require("path");
      var mkdir = require_mkdirs();
      var pathExists3 = require_path_exists().pathExists;
      function outputFile(file, data, encoding, callback) {
        if (typeof encoding === "function") {
          callback = encoding;
          encoding = "utf8";
        }
        const dir = path3.dirname(file);
        pathExists3(dir, (err, itDoes) => {
          if (err)
            return callback(err);
          if (itDoes)
            return fs.writeFile(file, data, encoding, callback);
          mkdir.mkdirs(dir, (err2) => {
            if (err2)
              return callback(err2);
            fs.writeFile(file, data, encoding, callback);
          });
        });
      }
      function outputFileSync(file, ...args) {
        const dir = path3.dirname(file);
        if (fs.existsSync(dir)) {
          return fs.writeFileSync(file, ...args);
        }
        mkdir.mkdirsSync(dir);
        fs.writeFileSync(file, ...args);
      }
      module.exports = {
        outputFile: u(outputFile),
        outputFileSync
      };
    }
  });

  // ../../node_modules/fs-extra/lib/json/output-json.js
  var require_output_json = __commonJS({
    "../../node_modules/fs-extra/lib/json/output-json.js"(exports, module) {
      "use strict";
      var { stringify } = require_utils3();
      var { outputFile } = require_output();
      async function outputJson(file, data, options = {}) {
        const str = stringify(data, options);
        await outputFile(file, str, options);
      }
      module.exports = outputJson;
    }
  });

  // ../../node_modules/fs-extra/lib/json/output-json-sync.js
  var require_output_json_sync = __commonJS({
    "../../node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module) {
      "use strict";
      var { stringify } = require_utils3();
      var { outputFileSync } = require_output();
      function outputJsonSync(file, data, options) {
        const str = stringify(data, options);
        outputFileSync(file, str, options);
      }
      module.exports = outputJsonSync;
    }
  });

  // ../../node_modules/fs-extra/lib/json/index.js
  var require_json = __commonJS({
    "../../node_modules/fs-extra/lib/json/index.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromPromise;
      var jsonFile = require_jsonfile2();
      jsonFile.outputJson = u(require_output_json());
      jsonFile.outputJsonSync = require_output_json_sync();
      jsonFile.outputJSON = jsonFile.outputJson;
      jsonFile.outputJSONSync = jsonFile.outputJsonSync;
      jsonFile.writeJSON = jsonFile.writeJson;
      jsonFile.writeJSONSync = jsonFile.writeJsonSync;
      jsonFile.readJSON = jsonFile.readJson;
      jsonFile.readJSONSync = jsonFile.readJsonSync;
      module.exports = jsonFile;
    }
  });

  // ../../node_modules/fs-extra/lib/move-sync/move-sync.js
  var require_move_sync = __commonJS({
    "../../node_modules/fs-extra/lib/move-sync/move-sync.js"(exports, module) {
      "use strict";
      var fs = require_graceful_fs();
      var path3 = __require("path");
      var copySync = require_copy_sync2().copySync;
      var removeSync = require_remove().removeSync;
      var mkdirpSync = require_mkdirs().mkdirpSync;
      var stat = require_stat();
      function moveSync(src, dest, opts) {
        opts = opts || {};
        const overwrite = opts.overwrite || opts.clobber || false;
        const { srcStat, isChangingCase = false } = stat.checkPathsSync(src, dest, "move", opts);
        stat.checkParentPathsSync(src, srcStat, dest, "move");
        if (!isParentRoot(dest))
          mkdirpSync(path3.dirname(dest));
        return doRename(src, dest, overwrite, isChangingCase);
      }
      function isParentRoot(dest) {
        const parent = path3.dirname(dest);
        const parsedPath = path3.parse(parent);
        return parsedPath.root === parent;
      }
      function doRename(src, dest, overwrite, isChangingCase) {
        if (isChangingCase)
          return rename(src, dest, overwrite);
        if (overwrite) {
          removeSync(dest);
          return rename(src, dest, overwrite);
        }
        if (fs.existsSync(dest))
          throw new Error("dest already exists.");
        return rename(src, dest, overwrite);
      }
      function rename(src, dest, overwrite) {
        try {
          fs.renameSync(src, dest);
        } catch (err) {
          if (err.code !== "EXDEV")
            throw err;
          return moveAcrossDevice(src, dest, overwrite);
        }
      }
      function moveAcrossDevice(src, dest, overwrite) {
        const opts = {
          overwrite,
          errorOnExist: true
        };
        copySync(src, dest, opts);
        return removeSync(src);
      }
      module.exports = moveSync;
    }
  });

  // ../../node_modules/fs-extra/lib/move-sync/index.js
  var require_move_sync2 = __commonJS({
    "../../node_modules/fs-extra/lib/move-sync/index.js"(exports, module) {
      "use strict";
      module.exports = {
        moveSync: require_move_sync()
      };
    }
  });

  // ../../node_modules/fs-extra/lib/move/move.js
  var require_move2 = __commonJS({
    "../../node_modules/fs-extra/lib/move/move.js"(exports, module) {
      "use strict";
      var fs = require_graceful_fs();
      var path3 = __require("path");
      var copy = require_copy2().copy;
      var remove = require_remove().remove;
      var mkdirp = require_mkdirs().mkdirp;
      var pathExists3 = require_path_exists().pathExists;
      var stat = require_stat();
      function move(src, dest, opts, cb) {
        if (typeof opts === "function") {
          cb = opts;
          opts = {};
        }
        const overwrite = opts.overwrite || opts.clobber || false;
        stat.checkPaths(src, dest, "move", opts, (err, stats) => {
          if (err)
            return cb(err);
          const { srcStat, isChangingCase = false } = stats;
          stat.checkParentPaths(src, srcStat, dest, "move", (err2) => {
            if (err2)
              return cb(err2);
            if (isParentRoot(dest))
              return doRename(src, dest, overwrite, isChangingCase, cb);
            mkdirp(path3.dirname(dest), (err3) => {
              if (err3)
                return cb(err3);
              return doRename(src, dest, overwrite, isChangingCase, cb);
            });
          });
        });
      }
      function isParentRoot(dest) {
        const parent = path3.dirname(dest);
        const parsedPath = path3.parse(parent);
        return parsedPath.root === parent;
      }
      function doRename(src, dest, overwrite, isChangingCase, cb) {
        if (isChangingCase)
          return rename(src, dest, overwrite, cb);
        if (overwrite) {
          return remove(dest, (err) => {
            if (err)
              return cb(err);
            return rename(src, dest, overwrite, cb);
          });
        }
        pathExists3(dest, (err, destExists) => {
          if (err)
            return cb(err);
          if (destExists)
            return cb(new Error("dest already exists."));
          return rename(src, dest, overwrite, cb);
        });
      }
      function rename(src, dest, overwrite, cb) {
        fs.rename(src, dest, (err) => {
          if (!err)
            return cb();
          if (err.code !== "EXDEV")
            return cb(err);
          return moveAcrossDevice(src, dest, overwrite, cb);
        });
      }
      function moveAcrossDevice(src, dest, overwrite, cb) {
        const opts = {
          overwrite,
          errorOnExist: true
        };
        copy(src, dest, opts, (err) => {
          if (err)
            return cb(err);
          return remove(src, cb);
        });
      }
      module.exports = move;
    }
  });

  // ../../node_modules/fs-extra/lib/move/index.js
  var require_move3 = __commonJS({
    "../../node_modules/fs-extra/lib/move/index.js"(exports, module) {
      "use strict";
      var u = require_universalify().fromCallback;
      module.exports = {
        move: u(require_move2())
      };
    }
  });

  // ../../node_modules/fs-extra/lib/index.js
  var require_lib = __commonJS({
    "../../node_modules/fs-extra/lib/index.js"(exports, module) {
      "use strict";
      module.exports = {
        ...require_fs(),
        ...require_copy_sync2(),
        ...require_copy2(),
        ...require_empty(),
        ...require_ensure(),
        ...require_json(),
        ...require_mkdirs(),
        ...require_move_sync2(),
        ...require_move3(),
        ...require_output(),
        ...require_path_exists(),
        ...require_remove()
      };
    }
  });

  // ../../node_modules/md5-file/index.js
  var require_md5_file = __commonJS({
    "../../node_modules/md5-file/index.js"(exports, module) {
      var crypto = __require("crypto");
      var fs = __require("fs");
      var BUFFER_SIZE = 8192;
      function md5FileSync(path3) {
        const fd = fs.openSync(path3, "r");
        const hash = crypto.createHash("md5");
        const buffer = Buffer.alloc(BUFFER_SIZE);
        try {
          let bytesRead;
          do {
            bytesRead = fs.readSync(fd, buffer, 0, BUFFER_SIZE);
            hash.update(buffer.slice(0, bytesRead));
          } while (bytesRead === BUFFER_SIZE);
        } finally {
          fs.closeSync(fd);
        }
        return hash.digest("hex");
      }
      function md5File2(path3) {
        return new Promise((resolve, reject) => {
          const output = crypto.createHash("md5");
          const input = fs.createReadStream(path3);
          input.on("error", (err) => {
            reject(err);
          });
          output.once("readable", () => {
            resolve(output.read().toString("hex"));
          });
          input.pipe(output);
        });
      }
      module.exports = md5File2;
      module.exports.sync = md5FileSync;
    }
  });

  // ../../node_modules/lodash/lodash.js
  var require_lodash = __commonJS({
    "../../node_modules/lodash/lodash.js"(exports, module) {
      (function() {
        var undefined2;
        var VERSION = "4.17.21";
        var LARGE_ARRAY_SIZE = 200;
        var CORE_ERROR_TEXT = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", FUNC_ERROR_TEXT = "Expected a function", INVALID_TEMPL_VAR_ERROR_TEXT = "Invalid `variable` option passed into `_.template`";
        var HASH_UNDEFINED = "__lodash_hash_undefined__";
        var MAX_MEMOIZE_SIZE = 500;
        var PLACEHOLDER = "__lodash_placeholder__";
        var CLONE_DEEP_FLAG = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG = 4;
        var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
        var WRAP_BIND_FLAG = 1, WRAP_BIND_KEY_FLAG = 2, WRAP_CURRY_BOUND_FLAG = 4, WRAP_CURRY_FLAG = 8, WRAP_CURRY_RIGHT_FLAG = 16, WRAP_PARTIAL_FLAG = 32, WRAP_PARTIAL_RIGHT_FLAG = 64, WRAP_ARY_FLAG = 128, WRAP_REARG_FLAG = 256, WRAP_FLIP_FLAG = 512;
        var DEFAULT_TRUNC_LENGTH = 30, DEFAULT_TRUNC_OMISSION = "...";
        var HOT_COUNT = 800, HOT_SPAN = 16;
        var LAZY_FILTER_FLAG = 1, LAZY_MAP_FLAG = 2, LAZY_WHILE_FLAG = 3;
        var INFINITY = 1 / 0, MAX_SAFE_INTEGER = 9007199254740991, MAX_INTEGER = 17976931348623157e292, NAN = 0 / 0;
        var MAX_ARRAY_LENGTH = 4294967295, MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1, HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;
        var wrapFlags = [
          ["ary", WRAP_ARY_FLAG],
          ["bind", WRAP_BIND_FLAG],
          ["bindKey", WRAP_BIND_KEY_FLAG],
          ["curry", WRAP_CURRY_FLAG],
          ["curryRight", WRAP_CURRY_RIGHT_FLAG],
          ["flip", WRAP_FLIP_FLAG],
          ["partial", WRAP_PARTIAL_FLAG],
          ["partialRight", WRAP_PARTIAL_RIGHT_FLAG],
          ["rearg", WRAP_REARG_FLAG]
        ];
        var argsTag = "[object Arguments]", arrayTag = "[object Array]", asyncTag = "[object AsyncFunction]", boolTag = "[object Boolean]", dateTag = "[object Date]", domExcTag = "[object DOMException]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", nullTag = "[object Null]", objectTag = "[object Object]", promiseTag = "[object Promise]", proxyTag = "[object Proxy]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", undefinedTag = "[object Undefined]", weakMapTag = "[object WeakMap]", weakSetTag = "[object WeakSet]";
        var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
        var reEmptyStringLeading = /\b__p \+= '';/g, reEmptyStringMiddle = /\b(__p \+=) '' \+/g, reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;
        var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g, reUnescapedHtml = /[&<>"']/g, reHasEscapedHtml = RegExp(reEscapedHtml.source), reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
        var reEscape = /<%-([\s\S]+?)%>/g, reEvaluate = /<%([\s\S]+?)%>/g, reInterpolate = /<%=([\s\S]+?)%>/g;
        var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/, rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
        var reRegExpChar = /[\\^$.*+?()[\]{}|]/g, reHasRegExpChar = RegExp(reRegExpChar.source);
        var reTrimStart = /^\s+/;
        var reWhitespace = /\s/;
        var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/, reSplitDetails = /,? & /;
        var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;
        var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;
        var reEscapeChar = /\\(\\)?/g;
        var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;
        var reFlags = /\w*$/;
        var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
        var reIsBinary = /^0b[01]+$/i;
        var reIsHostCtor = /^\[object .+?Constructor\]$/;
        var reIsOctal = /^0o[0-7]+$/i;
        var reIsUint = /^(?:0|[1-9]\d*)$/;
        var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;
        var reNoMatch = /($^)/;
        var reUnescapedString = /['\n\r\u2028\u2029\\]/g;
        var rsAstralRange = "\\ud800-\\udfff", rsComboMarksRange = "\\u0300-\\u036f", reComboHalfMarksRange = "\\ufe20-\\ufe2f", rsComboSymbolsRange = "\\u20d0-\\u20ff", rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange, rsDingbatRange = "\\u2700-\\u27bf", rsLowerRange = "a-z\\xdf-\\xf6\\xf8-\\xff", rsMathOpRange = "\\xac\\xb1\\xd7\\xf7", rsNonCharRange = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", rsPunctuationRange = "\\u2000-\\u206f", rsSpaceRange = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", rsUpperRange = "A-Z\\xc0-\\xd6\\xd8-\\xde", rsVarRange = "\\ufe0e\\ufe0f", rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;
        var rsApos = "['\u2019]", rsAstral = "[" + rsAstralRange + "]", rsBreak = "[" + rsBreakRange + "]", rsCombo = "[" + rsComboRange + "]", rsDigits = "\\d+", rsDingbat = "[" + rsDingbatRange + "]", rsLower = "[" + rsLowerRange + "]", rsMisc = "[^" + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + "]", rsFitz = "\\ud83c[\\udffb-\\udfff]", rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")", rsNonAstral = "[^" + rsAstralRange + "]", rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}", rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]", rsUpper = "[" + rsUpperRange + "]", rsZWJ = "\\u200d";
        var rsMiscLower = "(?:" + rsLower + "|" + rsMisc + ")", rsMiscUpper = "(?:" + rsUpper + "|" + rsMisc + ")", rsOptContrLower = "(?:" + rsApos + "(?:d|ll|m|re|s|t|ve))?", rsOptContrUpper = "(?:" + rsApos + "(?:D|LL|M|RE|S|T|VE))?", reOptMod = rsModifier + "?", rsOptVar = "[" + rsVarRange + "]?", rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*", rsOrdLower = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", rsOrdUpper = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", rsSeq = rsOptVar + reOptMod + rsOptJoin, rsEmoji = "(?:" + [rsDingbat, rsRegional, rsSurrPair].join("|") + ")" + rsSeq, rsSymbol = "(?:" + [rsNonAstral + rsCombo + "?", rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
        var reApos = RegExp(rsApos, "g");
        var reComboMark = RegExp(rsCombo, "g");
        var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + rsSymbol + rsSeq, "g");
        var reUnicodeWord = RegExp([
          rsUpper + "?" + rsLower + "+" + rsOptContrLower + "(?=" + [rsBreak, rsUpper, "$"].join("|") + ")",
          rsMiscUpper + "+" + rsOptContrUpper + "(?=" + [rsBreak, rsUpper + rsMiscLower, "$"].join("|") + ")",
          rsUpper + "?" + rsMiscLower + "+" + rsOptContrLower,
          rsUpper + "+" + rsOptContrUpper,
          rsOrdUpper,
          rsOrdLower,
          rsDigits,
          rsEmoji
        ].join("|"), "g");
        var reHasUnicode = RegExp("[" + rsZWJ + rsAstralRange + rsComboRange + rsVarRange + "]");
        var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;
        var contextProps = [
          "Array",
          "Buffer",
          "DataView",
          "Date",
          "Error",
          "Float32Array",
          "Float64Array",
          "Function",
          "Int8Array",
          "Int16Array",
          "Int32Array",
          "Map",
          "Math",
          "Object",
          "Promise",
          "RegExp",
          "Set",
          "String",
          "Symbol",
          "TypeError",
          "Uint8Array",
          "Uint8ClampedArray",
          "Uint16Array",
          "Uint32Array",
          "WeakMap",
          "_",
          "clearTimeout",
          "isFinite",
          "parseInt",
          "setTimeout"
        ];
        var templateCounter = -1;
        var typedArrayTags = {};
        typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
        typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
        var cloneableTags = {};
        cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
        cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
        var deburredLetters = {
          "\xC0": "A",
          "\xC1": "A",
          "\xC2": "A",
          "\xC3": "A",
          "\xC4": "A",
          "\xC5": "A",
          "\xE0": "a",
          "\xE1": "a",
          "\xE2": "a",
          "\xE3": "a",
          "\xE4": "a",
          "\xE5": "a",
          "\xC7": "C",
          "\xE7": "c",
          "\xD0": "D",
          "\xF0": "d",
          "\xC8": "E",
          "\xC9": "E",
          "\xCA": "E",
          "\xCB": "E",
          "\xE8": "e",
          "\xE9": "e",
          "\xEA": "e",
          "\xEB": "e",
          "\xCC": "I",
          "\xCD": "I",
          "\xCE": "I",
          "\xCF": "I",
          "\xEC": "i",
          "\xED": "i",
          "\xEE": "i",
          "\xEF": "i",
          "\xD1": "N",
          "\xF1": "n",
          "\xD2": "O",
          "\xD3": "O",
          "\xD4": "O",
          "\xD5": "O",
          "\xD6": "O",
          "\xD8": "O",
          "\xF2": "o",
          "\xF3": "o",
          "\xF4": "o",
          "\xF5": "o",
          "\xF6": "o",
          "\xF8": "o",
          "\xD9": "U",
          "\xDA": "U",
          "\xDB": "U",
          "\xDC": "U",
          "\xF9": "u",
          "\xFA": "u",
          "\xFB": "u",
          "\xFC": "u",
          "\xDD": "Y",
          "\xFD": "y",
          "\xFF": "y",
          "\xC6": "Ae",
          "\xE6": "ae",
          "\xDE": "Th",
          "\xFE": "th",
          "\xDF": "ss",
          "\u0100": "A",
          "\u0102": "A",
          "\u0104": "A",
          "\u0101": "a",
          "\u0103": "a",
          "\u0105": "a",
          "\u0106": "C",
          "\u0108": "C",
          "\u010A": "C",
          "\u010C": "C",
          "\u0107": "c",
          "\u0109": "c",
          "\u010B": "c",
          "\u010D": "c",
          "\u010E": "D",
          "\u0110": "D",
          "\u010F": "d",
          "\u0111": "d",
          "\u0112": "E",
          "\u0114": "E",
          "\u0116": "E",
          "\u0118": "E",
          "\u011A": "E",
          "\u0113": "e",
          "\u0115": "e",
          "\u0117": "e",
          "\u0119": "e",
          "\u011B": "e",
          "\u011C": "G",
          "\u011E": "G",
          "\u0120": "G",
          "\u0122": "G",
          "\u011D": "g",
          "\u011F": "g",
          "\u0121": "g",
          "\u0123": "g",
          "\u0124": "H",
          "\u0126": "H",
          "\u0125": "h",
          "\u0127": "h",
          "\u0128": "I",
          "\u012A": "I",
          "\u012C": "I",
          "\u012E": "I",
          "\u0130": "I",
          "\u0129": "i",
          "\u012B": "i",
          "\u012D": "i",
          "\u012F": "i",
          "\u0131": "i",
          "\u0134": "J",
          "\u0135": "j",
          "\u0136": "K",
          "\u0137": "k",
          "\u0138": "k",
          "\u0139": "L",
          "\u013B": "L",
          "\u013D": "L",
          "\u013F": "L",
          "\u0141": "L",
          "\u013A": "l",
          "\u013C": "l",
          "\u013E": "l",
          "\u0140": "l",
          "\u0142": "l",
          "\u0143": "N",
          "\u0145": "N",
          "\u0147": "N",
          "\u014A": "N",
          "\u0144": "n",
          "\u0146": "n",
          "\u0148": "n",
          "\u014B": "n",
          "\u014C": "O",
          "\u014E": "O",
          "\u0150": "O",
          "\u014D": "o",
          "\u014F": "o",
          "\u0151": "o",
          "\u0154": "R",
          "\u0156": "R",
          "\u0158": "R",
          "\u0155": "r",
          "\u0157": "r",
          "\u0159": "r",
          "\u015A": "S",
          "\u015C": "S",
          "\u015E": "S",
          "\u0160": "S",
          "\u015B": "s",
          "\u015D": "s",
          "\u015F": "s",
          "\u0161": "s",
          "\u0162": "T",
          "\u0164": "T",
          "\u0166": "T",
          "\u0163": "t",
          "\u0165": "t",
          "\u0167": "t",
          "\u0168": "U",
          "\u016A": "U",
          "\u016C": "U",
          "\u016E": "U",
          "\u0170": "U",
          "\u0172": "U",
          "\u0169": "u",
          "\u016B": "u",
          "\u016D": "u",
          "\u016F": "u",
          "\u0171": "u",
          "\u0173": "u",
          "\u0174": "W",
          "\u0175": "w",
          "\u0176": "Y",
          "\u0177": "y",
          "\u0178": "Y",
          "\u0179": "Z",
          "\u017B": "Z",
          "\u017D": "Z",
          "\u017A": "z",
          "\u017C": "z",
          "\u017E": "z",
          "\u0132": "IJ",
          "\u0133": "ij",
          "\u0152": "Oe",
          "\u0153": "oe",
          "\u0149": "'n",
          "\u017F": "s"
        };
        var htmlEscapes = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        };
        var htmlUnescapes = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'"
        };
        var stringEscapes = {
          "\\": "\\",
          "'": "'",
          "\n": "n",
          "\r": "r",
          "\u2028": "u2028",
          "\u2029": "u2029"
        };
        var freeParseFloat = parseFloat, freeParseInt = parseInt;
        var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
        var freeSelf = typeof self == "object" && self && self.Object === Object && self;
        var root = freeGlobal || freeSelf || Function("return this")();
        var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
        var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
        var moduleExports = freeModule && freeModule.exports === freeExports;
        var freeProcess = moduleExports && freeGlobal.process;
        var nodeUtil = function() {
          try {
            var types = freeModule && freeModule.require && freeModule.require("util").types;
            if (types) {
              return types;
            }
            return freeProcess && freeProcess.binding && freeProcess.binding("util");
          } catch (e) {
          }
        }();
        var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer, nodeIsDate = nodeUtil && nodeUtil.isDate, nodeIsMap = nodeUtil && nodeUtil.isMap, nodeIsRegExp = nodeUtil && nodeUtil.isRegExp, nodeIsSet = nodeUtil && nodeUtil.isSet, nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
        function apply(func, thisArg, args) {
          switch (args.length) {
            case 0:
              return func.call(thisArg);
            case 1:
              return func.call(thisArg, args[0]);
            case 2:
              return func.call(thisArg, args[0], args[1]);
            case 3:
              return func.call(thisArg, args[0], args[1], args[2]);
          }
          return func.apply(thisArg, args);
        }
        function arrayAggregator(array, setter, iteratee, accumulator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            var value = array[index];
            setter(accumulator, value, iteratee(value), array);
          }
          return accumulator;
        }
        function arrayEach(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEachRight(array, iteratee) {
          var length = array == null ? 0 : array.length;
          while (length--) {
            if (iteratee(array[length], length, array) === false) {
              break;
            }
          }
          return array;
        }
        function arrayEvery(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (!predicate(array[index], index, array)) {
              return false;
            }
          }
          return true;
        }
        function arrayFilter(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (predicate(value, index, array)) {
              result[resIndex++] = value;
            }
          }
          return result;
        }
        function arrayIncludes(array, value) {
          var length = array == null ? 0 : array.length;
          return !!length && baseIndexOf(array, value, 0) > -1;
        }
        function arrayIncludesWith(array, value, comparator) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (comparator(value, array[index])) {
              return true;
            }
          }
          return false;
        }
        function arrayMap(array, iteratee) {
          var index = -1, length = array == null ? 0 : array.length, result = Array(length);
          while (++index < length) {
            result[index] = iteratee(array[index], index, array);
          }
          return result;
        }
        function arrayPush(array, values) {
          var index = -1, length = values.length, offset = array.length;
          while (++index < length) {
            array[offset + index] = values[index];
          }
          return array;
        }
        function arrayReduce(array, iteratee, accumulator, initAccum) {
          var index = -1, length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[++index];
          }
          while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
          }
          return accumulator;
        }
        function arrayReduceRight(array, iteratee, accumulator, initAccum) {
          var length = array == null ? 0 : array.length;
          if (initAccum && length) {
            accumulator = array[--length];
          }
          while (length--) {
            accumulator = iteratee(accumulator, array[length], length, array);
          }
          return accumulator;
        }
        function arraySome(array, predicate) {
          var index = -1, length = array == null ? 0 : array.length;
          while (++index < length) {
            if (predicate(array[index], index, array)) {
              return true;
            }
          }
          return false;
        }
        var asciiSize = baseProperty("length");
        function asciiToArray(string) {
          return string.split("");
        }
        function asciiWords(string) {
          return string.match(reAsciiWord) || [];
        }
        function baseFindKey(collection, predicate, eachFunc) {
          var result;
          eachFunc(collection, function(value, key, collection2) {
            if (predicate(value, key, collection2)) {
              result = key;
              return false;
            }
          });
          return result;
        }
        function baseFindIndex(array, predicate, fromIndex, fromRight) {
          var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
          while (fromRight ? index-- : ++index < length) {
            if (predicate(array[index], index, array)) {
              return index;
            }
          }
          return -1;
        }
        function baseIndexOf(array, value, fromIndex) {
          return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
        }
        function baseIndexOfWith(array, value, fromIndex, comparator) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (comparator(array[index], value)) {
              return index;
            }
          }
          return -1;
        }
        function baseIsNaN(value) {
          return value !== value;
        }
        function baseMean(array, iteratee) {
          var length = array == null ? 0 : array.length;
          return length ? baseSum(array, iteratee) / length : NAN;
        }
        function baseProperty(key) {
          return function(object) {
            return object == null ? undefined2 : object[key];
          };
        }
        function basePropertyOf(object) {
          return function(key) {
            return object == null ? undefined2 : object[key];
          };
        }
        function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
          eachFunc(collection, function(value, index, collection2) {
            accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection2);
          });
          return accumulator;
        }
        function baseSortBy(array, comparer) {
          var length = array.length;
          array.sort(comparer);
          while (length--) {
            array[length] = array[length].value;
          }
          return array;
        }
        function baseSum(array, iteratee) {
          var result, index = -1, length = array.length;
          while (++index < length) {
            var current = iteratee(array[index]);
            if (current !== undefined2) {
              result = result === undefined2 ? current : result + current;
            }
          }
          return result;
        }
        function baseTimes(n, iteratee) {
          var index = -1, result = Array(n);
          while (++index < n) {
            result[index] = iteratee(index);
          }
          return result;
        }
        function baseToPairs(object, props) {
          return arrayMap(props, function(key) {
            return [key, object[key]];
          });
        }
        function baseTrim(string) {
          return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
        }
        function baseUnary(func) {
          return function(value) {
            return func(value);
          };
        }
        function baseValues(object, props) {
          return arrayMap(props, function(key) {
            return object[key];
          });
        }
        function cacheHas(cache, key) {
          return cache.has(key);
        }
        function charsStartIndex(strSymbols, chrSymbols) {
          var index = -1, length = strSymbols.length;
          while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function charsEndIndex(strSymbols, chrSymbols) {
          var index = strSymbols.length;
          while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
          }
          return index;
        }
        function countHolders(array, placeholder) {
          var length = array.length, result = 0;
          while (length--) {
            if (array[length] === placeholder) {
              ++result;
            }
          }
          return result;
        }
        var deburrLetter = basePropertyOf(deburredLetters);
        var escapeHtmlChar = basePropertyOf(htmlEscapes);
        function escapeStringChar(chr) {
          return "\\" + stringEscapes[chr];
        }
        function getValue(object, key) {
          return object == null ? undefined2 : object[key];
        }
        function hasUnicode(string) {
          return reHasUnicode.test(string);
        }
        function hasUnicodeWord(string) {
          return reHasUnicodeWord.test(string);
        }
        function iteratorToArray(iterator) {
          var data, result = [];
          while (!(data = iterator.next()).done) {
            result.push(data.value);
          }
          return result;
        }
        function mapToArray(map) {
          var index = -1, result = Array(map.size);
          map.forEach(function(value, key) {
            result[++index] = [key, value];
          });
          return result;
        }
        function overArg(func, transform) {
          return function(arg) {
            return func(transform(arg));
          };
        }
        function replaceHolders(array, placeholder) {
          var index = -1, length = array.length, resIndex = 0, result = [];
          while (++index < length) {
            var value = array[index];
            if (value === placeholder || value === PLACEHOLDER) {
              array[index] = PLACEHOLDER;
              result[resIndex++] = index;
            }
          }
          return result;
        }
        function setToArray(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = value;
          });
          return result;
        }
        function setToPairs(set) {
          var index = -1, result = Array(set.size);
          set.forEach(function(value) {
            result[++index] = [value, value];
          });
          return result;
        }
        function strictIndexOf(array, value, fromIndex) {
          var index = fromIndex - 1, length = array.length;
          while (++index < length) {
            if (array[index] === value) {
              return index;
            }
          }
          return -1;
        }
        function strictLastIndexOf(array, value, fromIndex) {
          var index = fromIndex + 1;
          while (index--) {
            if (array[index] === value) {
              return index;
            }
          }
          return index;
        }
        function stringSize(string) {
          return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
        }
        function stringToArray(string) {
          return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string);
        }
        function trimmedEndIndex(string) {
          var index = string.length;
          while (index-- && reWhitespace.test(string.charAt(index))) {
          }
          return index;
        }
        var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
        function unicodeSize(string) {
          var result = reUnicode.lastIndex = 0;
          while (reUnicode.test(string)) {
            ++result;
          }
          return result;
        }
        function unicodeToArray(string) {
          return string.match(reUnicode) || [];
        }
        function unicodeWords(string) {
          return string.match(reUnicodeWord) || [];
        }
        var runInContext = function runInContext2(context) {
          context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));
          var Array2 = context.Array, Date2 = context.Date, Error2 = context.Error, Function2 = context.Function, Math2 = context.Math, Object2 = context.Object, RegExp2 = context.RegExp, String2 = context.String, TypeError2 = context.TypeError;
          var arrayProto = Array2.prototype, funcProto = Function2.prototype, objectProto = Object2.prototype;
          var coreJsData = context["__core-js_shared__"];
          var funcToString = funcProto.toString;
          var hasOwnProperty = objectProto.hasOwnProperty;
          var idCounter = 0;
          var maskSrcKey = function() {
            var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
            return uid ? "Symbol(src)_1." + uid : "";
          }();
          var nativeObjectToString = objectProto.toString;
          var objectCtorString = funcToString.call(Object2);
          var oldDash = root._;
          var reIsNative = RegExp2("^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
          var Buffer2 = moduleExports ? context.Buffer : undefined2, Symbol2 = context.Symbol, Uint8Array2 = context.Uint8Array, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : undefined2, getPrototype = overArg(Object2.getPrototypeOf, Object2), objectCreate = Object2.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice, spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : undefined2, symIterator = Symbol2 ? Symbol2.iterator : undefined2, symToStringTag = Symbol2 ? Symbol2.toStringTag : undefined2;
          var defineProperty = function() {
            try {
              var func = getNative(Object2, "defineProperty");
              func({}, "", {});
              return func;
            } catch (e) {
            }
          }();
          var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout, ctxNow = Date2 && Date2.now !== root.Date.now && Date2.now, ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;
          var nativeCeil = Math2.ceil, nativeFloor = Math2.floor, nativeGetSymbols = Object2.getOwnPropertySymbols, nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : undefined2, nativeIsFinite = context.isFinite, nativeJoin = arrayProto.join, nativeKeys = overArg(Object2.keys, Object2), nativeMax = Math2.max, nativeMin = Math2.min, nativeNow = Date2.now, nativeParseInt = context.parseInt, nativeRandom = Math2.random, nativeReverse = arrayProto.reverse;
          var DataView = getNative(context, "DataView"), Map2 = getNative(context, "Map"), Promise2 = getNative(context, "Promise"), Set2 = getNative(context, "Set"), WeakMap2 = getNative(context, "WeakMap"), nativeCreate = getNative(Object2, "create");
          var metaMap = WeakMap2 && new WeakMap2();
          var realNames = {};
          var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
          var symbolProto = Symbol2 ? Symbol2.prototype : undefined2, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined2, symbolToString = symbolProto ? symbolProto.toString : undefined2;
          function lodash(value) {
            if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
              if (value instanceof LodashWrapper) {
                return value;
              }
              if (hasOwnProperty.call(value, "__wrapped__")) {
                return wrapperClone(value);
              }
            }
            return new LodashWrapper(value);
          }
          var baseCreate = function() {
            function object() {
            }
            return function(proto) {
              if (!isObject(proto)) {
                return {};
              }
              if (objectCreate) {
                return objectCreate(proto);
              }
              object.prototype = proto;
              var result2 = new object();
              object.prototype = undefined2;
              return result2;
            };
          }();
          function baseLodash() {
          }
          function LodashWrapper(value, chainAll) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__chain__ = !!chainAll;
            this.__index__ = 0;
            this.__values__ = undefined2;
          }
          lodash.templateSettings = {
            "escape": reEscape,
            "evaluate": reEvaluate,
            "interpolate": reInterpolate,
            "variable": "",
            "imports": {
              "_": lodash
            }
          };
          lodash.prototype = baseLodash.prototype;
          lodash.prototype.constructor = lodash;
          LodashWrapper.prototype = baseCreate(baseLodash.prototype);
          LodashWrapper.prototype.constructor = LodashWrapper;
          function LazyWrapper(value) {
            this.__wrapped__ = value;
            this.__actions__ = [];
            this.__dir__ = 1;
            this.__filtered__ = false;
            this.__iteratees__ = [];
            this.__takeCount__ = MAX_ARRAY_LENGTH;
            this.__views__ = [];
          }
          function lazyClone() {
            var result2 = new LazyWrapper(this.__wrapped__);
            result2.__actions__ = copyArray(this.__actions__);
            result2.__dir__ = this.__dir__;
            result2.__filtered__ = this.__filtered__;
            result2.__iteratees__ = copyArray(this.__iteratees__);
            result2.__takeCount__ = this.__takeCount__;
            result2.__views__ = copyArray(this.__views__);
            return result2;
          }
          function lazyReverse() {
            if (this.__filtered__) {
              var result2 = new LazyWrapper(this);
              result2.__dir__ = -1;
              result2.__filtered__ = true;
            } else {
              result2 = this.clone();
              result2.__dir__ *= -1;
            }
            return result2;
          }
          function lazyValue() {
            var array = this.__wrapped__.value(), dir = this.__dir__, isArr = isArray(array), isRight = dir < 0, arrLength = isArr ? array.length : 0, view = getView(0, arrLength, this.__views__), start = view.start, end = view.end, length = end - start, index = isRight ? end : start - 1, iteratees = this.__iteratees__, iterLength = iteratees.length, resIndex = 0, takeCount = nativeMin(length, this.__takeCount__);
            if (!isArr || !isRight && arrLength == length && takeCount == length) {
              return baseWrapperValue(array, this.__actions__);
            }
            var result2 = [];
            outer:
              while (length-- && resIndex < takeCount) {
                index += dir;
                var iterIndex = -1, value = array[index];
                while (++iterIndex < iterLength) {
                  var data = iteratees[iterIndex], iteratee2 = data.iteratee, type = data.type, computed = iteratee2(value);
                  if (type == LAZY_MAP_FLAG) {
                    value = computed;
                  } else if (!computed) {
                    if (type == LAZY_FILTER_FLAG) {
                      continue outer;
                    } else {
                      break outer;
                    }
                  }
                }
                result2[resIndex++] = value;
              }
            return result2;
          }
          LazyWrapper.prototype = baseCreate(baseLodash.prototype);
          LazyWrapper.prototype.constructor = LazyWrapper;
          function Hash(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function hashClear() {
            this.__data__ = nativeCreate ? nativeCreate(null) : {};
            this.size = 0;
          }
          function hashDelete(key) {
            var result2 = this.has(key) && delete this.__data__[key];
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function hashGet(key) {
            var data = this.__data__;
            if (nativeCreate) {
              var result2 = data[key];
              return result2 === HASH_UNDEFINED ? undefined2 : result2;
            }
            return hasOwnProperty.call(data, key) ? data[key] : undefined2;
          }
          function hashHas(key) {
            var data = this.__data__;
            return nativeCreate ? data[key] !== undefined2 : hasOwnProperty.call(data, key);
          }
          function hashSet(key, value) {
            var data = this.__data__;
            this.size += this.has(key) ? 0 : 1;
            data[key] = nativeCreate && value === undefined2 ? HASH_UNDEFINED : value;
            return this;
          }
          Hash.prototype.clear = hashClear;
          Hash.prototype["delete"] = hashDelete;
          Hash.prototype.get = hashGet;
          Hash.prototype.has = hashHas;
          Hash.prototype.set = hashSet;
          function ListCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function listCacheClear() {
            this.__data__ = [];
            this.size = 0;
          }
          function listCacheDelete(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              return false;
            }
            var lastIndex = data.length - 1;
            if (index == lastIndex) {
              data.pop();
            } else {
              splice.call(data, index, 1);
            }
            --this.size;
            return true;
          }
          function listCacheGet(key) {
            var data = this.__data__, index = assocIndexOf(data, key);
            return index < 0 ? undefined2 : data[index][1];
          }
          function listCacheHas(key) {
            return assocIndexOf(this.__data__, key) > -1;
          }
          function listCacheSet(key, value) {
            var data = this.__data__, index = assocIndexOf(data, key);
            if (index < 0) {
              ++this.size;
              data.push([key, value]);
            } else {
              data[index][1] = value;
            }
            return this;
          }
          ListCache.prototype.clear = listCacheClear;
          ListCache.prototype["delete"] = listCacheDelete;
          ListCache.prototype.get = listCacheGet;
          ListCache.prototype.has = listCacheHas;
          ListCache.prototype.set = listCacheSet;
          function MapCache(entries) {
            var index = -1, length = entries == null ? 0 : entries.length;
            this.clear();
            while (++index < length) {
              var entry = entries[index];
              this.set(entry[0], entry[1]);
            }
          }
          function mapCacheClear() {
            this.size = 0;
            this.__data__ = {
              "hash": new Hash(),
              "map": new (Map2 || ListCache)(),
              "string": new Hash()
            };
          }
          function mapCacheDelete(key) {
            var result2 = getMapData(this, key)["delete"](key);
            this.size -= result2 ? 1 : 0;
            return result2;
          }
          function mapCacheGet(key) {
            return getMapData(this, key).get(key);
          }
          function mapCacheHas(key) {
            return getMapData(this, key).has(key);
          }
          function mapCacheSet(key, value) {
            var data = getMapData(this, key), size2 = data.size;
            data.set(key, value);
            this.size += data.size == size2 ? 0 : 1;
            return this;
          }
          MapCache.prototype.clear = mapCacheClear;
          MapCache.prototype["delete"] = mapCacheDelete;
          MapCache.prototype.get = mapCacheGet;
          MapCache.prototype.has = mapCacheHas;
          MapCache.prototype.set = mapCacheSet;
          function SetCache(values2) {
            var index = -1, length = values2 == null ? 0 : values2.length;
            this.__data__ = new MapCache();
            while (++index < length) {
              this.add(values2[index]);
            }
          }
          function setCacheAdd(value) {
            this.__data__.set(value, HASH_UNDEFINED);
            return this;
          }
          function setCacheHas(value) {
            return this.__data__.has(value);
          }
          SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
          SetCache.prototype.has = setCacheHas;
          function Stack(entries) {
            var data = this.__data__ = new ListCache(entries);
            this.size = data.size;
          }
          function stackClear() {
            this.__data__ = new ListCache();
            this.size = 0;
          }
          function stackDelete(key) {
            var data = this.__data__, result2 = data["delete"](key);
            this.size = data.size;
            return result2;
          }
          function stackGet(key) {
            return this.__data__.get(key);
          }
          function stackHas(key) {
            return this.__data__.has(key);
          }
          function stackSet(key, value) {
            var data = this.__data__;
            if (data instanceof ListCache) {
              var pairs = data.__data__;
              if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
                pairs.push([key, value]);
                this.size = ++data.size;
                return this;
              }
              data = this.__data__ = new MapCache(pairs);
            }
            data.set(key, value);
            this.size = data.size;
            return this;
          }
          Stack.prototype.clear = stackClear;
          Stack.prototype["delete"] = stackDelete;
          Stack.prototype.get = stackGet;
          Stack.prototype.has = stackHas;
          Stack.prototype.set = stackSet;
          function arrayLikeKeys(value, inherited) {
            var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result2 = skipIndexes ? baseTimes(value.length, String2) : [], length = result2.length;
            for (var key in value) {
              if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function arraySample(array) {
            var length = array.length;
            return length ? array[baseRandom(0, length - 1)] : undefined2;
          }
          function arraySampleSize(array, n) {
            return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
          }
          function arrayShuffle(array) {
            return shuffleSelf(copyArray(array));
          }
          function assignMergeValue(object, key, value) {
            if (value !== undefined2 && !eq(object[key], value) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assignValue(object, key, value) {
            var objValue = object[key];
            if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined2 && !(key in object)) {
              baseAssignValue(object, key, value);
            }
          }
          function assocIndexOf(array, key) {
            var length = array.length;
            while (length--) {
              if (eq(array[length][0], key)) {
                return length;
              }
            }
            return -1;
          }
          function baseAggregator(collection, setter, iteratee2, accumulator) {
            baseEach(collection, function(value, key, collection2) {
              setter(accumulator, value, iteratee2(value), collection2);
            });
            return accumulator;
          }
          function baseAssign(object, source) {
            return object && copyObject(source, keys(source), object);
          }
          function baseAssignIn(object, source) {
            return object && copyObject(source, keysIn(source), object);
          }
          function baseAssignValue(object, key, value) {
            if (key == "__proto__" && defineProperty) {
              defineProperty(object, key, {
                "configurable": true,
                "enumerable": true,
                "value": value,
                "writable": true
              });
            } else {
              object[key] = value;
            }
          }
          function baseAt(object, paths) {
            var index = -1, length = paths.length, result2 = Array2(length), skip = object == null;
            while (++index < length) {
              result2[index] = skip ? undefined2 : get(object, paths[index]);
            }
            return result2;
          }
          function baseClamp(number, lower, upper) {
            if (number === number) {
              if (upper !== undefined2) {
                number = number <= upper ? number : upper;
              }
              if (lower !== undefined2) {
                number = number >= lower ? number : lower;
              }
            }
            return number;
          }
          function baseClone(value, bitmask, customizer, key, object, stack) {
            var result2, isDeep = bitmask & CLONE_DEEP_FLAG, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG;
            if (customizer) {
              result2 = object ? customizer(value, key, object, stack) : customizer(value);
            }
            if (result2 !== undefined2) {
              return result2;
            }
            if (!isObject(value)) {
              return value;
            }
            var isArr = isArray(value);
            if (isArr) {
              result2 = initCloneArray(value);
              if (!isDeep) {
                return copyArray(value, result2);
              }
            } else {
              var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
              if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
              }
              if (tag == objectTag || tag == argsTag || isFunc && !object) {
                result2 = isFlat || isFunc ? {} : initCloneObject(value);
                if (!isDeep) {
                  return isFlat ? copySymbolsIn(value, baseAssignIn(result2, value)) : copySymbols(value, baseAssign(result2, value));
                }
              } else {
                if (!cloneableTags[tag]) {
                  return object ? value : {};
                }
                result2 = initCloneByTag(value, tag, isDeep);
              }
            }
            stack || (stack = new Stack());
            var stacked = stack.get(value);
            if (stacked) {
              return stacked;
            }
            stack.set(value, result2);
            if (isSet(value)) {
              value.forEach(function(subValue) {
                result2.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
              });
            } else if (isMap(value)) {
              value.forEach(function(subValue, key2) {
                result2.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
              });
            }
            var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
            var props = isArr ? undefined2 : keysFunc(value);
            arrayEach(props || value, function(subValue, key2) {
              if (props) {
                key2 = subValue;
                subValue = value[key2];
              }
              assignValue(result2, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
            });
            return result2;
          }
          function baseConforms(source) {
            var props = keys(source);
            return function(object) {
              return baseConformsTo(object, source, props);
            };
          }
          function baseConformsTo(object, source, props) {
            var length = props.length;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (length--) {
              var key = props[length], predicate = source[key], value = object[key];
              if (value === undefined2 && !(key in object) || !predicate(value)) {
                return false;
              }
            }
            return true;
          }
          function baseDelay(func, wait, args) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return setTimeout2(function() {
              func.apply(undefined2, args);
            }, wait);
          }
          function baseDifference(array, values2, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, isCommon = true, length = array.length, result2 = [], valuesLength = values2.length;
            if (!length) {
              return result2;
            }
            if (iteratee2) {
              values2 = arrayMap(values2, baseUnary(iteratee2));
            }
            if (comparator) {
              includes2 = arrayIncludesWith;
              isCommon = false;
            } else if (values2.length >= LARGE_ARRAY_SIZE) {
              includes2 = cacheHas;
              isCommon = false;
              values2 = new SetCache(values2);
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 == null ? value : iteratee2(value);
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var valuesIndex = valuesLength;
                  while (valuesIndex--) {
                    if (values2[valuesIndex] === computed) {
                      continue outer;
                    }
                  }
                  result2.push(value);
                } else if (!includes2(values2, computed, comparator)) {
                  result2.push(value);
                }
              }
            return result2;
          }
          var baseEach = createBaseEach(baseForOwn);
          var baseEachRight = createBaseEach(baseForOwnRight, true);
          function baseEvery(collection, predicate) {
            var result2 = true;
            baseEach(collection, function(value, index, collection2) {
              result2 = !!predicate(value, index, collection2);
              return result2;
            });
            return result2;
          }
          function baseExtremum(array, iteratee2, comparator) {
            var index = -1, length = array.length;
            while (++index < length) {
              var value = array[index], current = iteratee2(value);
              if (current != null && (computed === undefined2 ? current === current && !isSymbol(current) : comparator(current, computed))) {
                var computed = current, result2 = value;
              }
            }
            return result2;
          }
          function baseFill(array, value, start, end) {
            var length = array.length;
            start = toInteger(start);
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end === undefined2 || end > length ? length : toInteger(end);
            if (end < 0) {
              end += length;
            }
            end = start > end ? 0 : toLength(end);
            while (start < end) {
              array[start++] = value;
            }
            return array;
          }
          function baseFilter(collection, predicate) {
            var result2 = [];
            baseEach(collection, function(value, index, collection2) {
              if (predicate(value, index, collection2)) {
                result2.push(value);
              }
            });
            return result2;
          }
          function baseFlatten(array, depth, predicate, isStrict, result2) {
            var index = -1, length = array.length;
            predicate || (predicate = isFlattenable);
            result2 || (result2 = []);
            while (++index < length) {
              var value = array[index];
              if (depth > 0 && predicate(value)) {
                if (depth > 1) {
                  baseFlatten(value, depth - 1, predicate, isStrict, result2);
                } else {
                  arrayPush(result2, value);
                }
              } else if (!isStrict) {
                result2[result2.length] = value;
              }
            }
            return result2;
          }
          var baseFor = createBaseFor();
          var baseForRight = createBaseFor(true);
          function baseForOwn(object, iteratee2) {
            return object && baseFor(object, iteratee2, keys);
          }
          function baseForOwnRight(object, iteratee2) {
            return object && baseForRight(object, iteratee2, keys);
          }
          function baseFunctions(object, props) {
            return arrayFilter(props, function(key) {
              return isFunction(object[key]);
            });
          }
          function baseGet(object, path3) {
            path3 = castPath(path3, object);
            var index = 0, length = path3.length;
            while (object != null && index < length) {
              object = object[toKey(path3[index++])];
            }
            return index && index == length ? object : undefined2;
          }
          function baseGetAllKeys(object, keysFunc, symbolsFunc) {
            var result2 = keysFunc(object);
            return isArray(object) ? result2 : arrayPush(result2, symbolsFunc(object));
          }
          function baseGetTag(value) {
            if (value == null) {
              return value === undefined2 ? undefinedTag : nullTag;
            }
            return symToStringTag && symToStringTag in Object2(value) ? getRawTag(value) : objectToString(value);
          }
          function baseGt(value, other) {
            return value > other;
          }
          function baseHas(object, key) {
            return object != null && hasOwnProperty.call(object, key);
          }
          function baseHasIn(object, key) {
            return object != null && key in Object2(object);
          }
          function baseInRange(number, start, end) {
            return number >= nativeMin(start, end) && number < nativeMax(start, end);
          }
          function baseIntersection(arrays, iteratee2, comparator) {
            var includes2 = comparator ? arrayIncludesWith : arrayIncludes, length = arrays[0].length, othLength = arrays.length, othIndex = othLength, caches = Array2(othLength), maxLength = Infinity, result2 = [];
            while (othIndex--) {
              var array = arrays[othIndex];
              if (othIndex && iteratee2) {
                array = arrayMap(array, baseUnary(iteratee2));
              }
              maxLength = nativeMin(array.length, maxLength);
              caches[othIndex] = !comparator && (iteratee2 || length >= 120 && array.length >= 120) ? new SetCache(othIndex && array) : undefined2;
            }
            array = arrays[0];
            var index = -1, seen = caches[0];
            outer:
              while (++index < length && result2.length < maxLength) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (!(seen ? cacheHas(seen, computed) : includes2(result2, computed, comparator))) {
                  othIndex = othLength;
                  while (--othIndex) {
                    var cache = caches[othIndex];
                    if (!(cache ? cacheHas(cache, computed) : includes2(arrays[othIndex], computed, comparator))) {
                      continue outer;
                    }
                  }
                  if (seen) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseInverter(object, setter, iteratee2, accumulator) {
            baseForOwn(object, function(value, key, object2) {
              setter(accumulator, iteratee2(value), key, object2);
            });
            return accumulator;
          }
          function baseInvoke(object, path3, args) {
            path3 = castPath(path3, object);
            object = parent(object, path3);
            var func = object == null ? object : object[toKey(last(path3))];
            return func == null ? undefined2 : apply(func, object, args);
          }
          function baseIsArguments(value) {
            return isObjectLike(value) && baseGetTag(value) == argsTag;
          }
          function baseIsArrayBuffer(value) {
            return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
          }
          function baseIsDate(value) {
            return isObjectLike(value) && baseGetTag(value) == dateTag;
          }
          function baseIsEqual(value, other, bitmask, customizer, stack) {
            if (value === other) {
              return true;
            }
            if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
              return value !== value && other !== other;
            }
            return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
          }
          function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
            var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
            objTag = objTag == argsTag ? objectTag : objTag;
            othTag = othTag == argsTag ? objectTag : othTag;
            var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
            if (isSameTag && isBuffer(object)) {
              if (!isBuffer(other)) {
                return false;
              }
              objIsArr = true;
              objIsObj = false;
            }
            if (isSameTag && !objIsObj) {
              stack || (stack = new Stack());
              return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
            }
            if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
              var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
              if (objIsWrapped || othIsWrapped) {
                var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
                stack || (stack = new Stack());
                return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
              }
            }
            if (!isSameTag) {
              return false;
            }
            stack || (stack = new Stack());
            return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
          }
          function baseIsMap(value) {
            return isObjectLike(value) && getTag(value) == mapTag;
          }
          function baseIsMatch(object, source, matchData, customizer) {
            var index = matchData.length, length = index, noCustomizer = !customizer;
            if (object == null) {
              return !length;
            }
            object = Object2(object);
            while (index--) {
              var data = matchData[index];
              if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
                return false;
              }
            }
            while (++index < length) {
              data = matchData[index];
              var key = data[0], objValue = object[key], srcValue = data[1];
              if (noCustomizer && data[2]) {
                if (objValue === undefined2 && !(key in object)) {
                  return false;
                }
              } else {
                var stack = new Stack();
                if (customizer) {
                  var result2 = customizer(objValue, srcValue, key, object, source, stack);
                }
                if (!(result2 === undefined2 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result2)) {
                  return false;
                }
              }
            }
            return true;
          }
          function baseIsNative(value) {
            if (!isObject(value) || isMasked(value)) {
              return false;
            }
            var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
            return pattern.test(toSource(value));
          }
          function baseIsRegExp(value) {
            return isObjectLike(value) && baseGetTag(value) == regexpTag;
          }
          function baseIsSet(value) {
            return isObjectLike(value) && getTag(value) == setTag;
          }
          function baseIsTypedArray(value) {
            return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
          }
          function baseIteratee(value) {
            if (typeof value == "function") {
              return value;
            }
            if (value == null) {
              return identity;
            }
            if (typeof value == "object") {
              return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
            }
            return property(value);
          }
          function baseKeys(object) {
            if (!isPrototype(object)) {
              return nativeKeys(object);
            }
            var result2 = [];
            for (var key in Object2(object)) {
              if (hasOwnProperty.call(object, key) && key != "constructor") {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseKeysIn(object) {
            if (!isObject(object)) {
              return nativeKeysIn(object);
            }
            var isProto = isPrototype(object), result2 = [];
            for (var key in object) {
              if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) {
                result2.push(key);
              }
            }
            return result2;
          }
          function baseLt(value, other) {
            return value < other;
          }
          function baseMap(collection, iteratee2) {
            var index = -1, result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value, key, collection2) {
              result2[++index] = iteratee2(value, key, collection2);
            });
            return result2;
          }
          function baseMatches(source) {
            var matchData = getMatchData(source);
            if (matchData.length == 1 && matchData[0][2]) {
              return matchesStrictComparable(matchData[0][0], matchData[0][1]);
            }
            return function(object) {
              return object === source || baseIsMatch(object, source, matchData);
            };
          }
          function baseMatchesProperty(path3, srcValue) {
            if (isKey(path3) && isStrictComparable(srcValue)) {
              return matchesStrictComparable(toKey(path3), srcValue);
            }
            return function(object) {
              var objValue = get(object, path3);
              return objValue === undefined2 && objValue === srcValue ? hasIn(object, path3) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
            };
          }
          function baseMerge(object, source, srcIndex, customizer, stack) {
            if (object === source) {
              return;
            }
            baseFor(source, function(srcValue, key) {
              stack || (stack = new Stack());
              if (isObject(srcValue)) {
                baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
              } else {
                var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + "", object, source, stack) : undefined2;
                if (newValue === undefined2) {
                  newValue = srcValue;
                }
                assignMergeValue(object, key, newValue);
              }
            }, keysIn);
          }
          function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
            var objValue = safeGet(object, key), srcValue = safeGet(source, key), stacked = stack.get(srcValue);
            if (stacked) {
              assignMergeValue(object, key, stacked);
              return;
            }
            var newValue = customizer ? customizer(objValue, srcValue, key + "", object, source, stack) : undefined2;
            var isCommon = newValue === undefined2;
            if (isCommon) {
              var isArr = isArray(srcValue), isBuff = !isArr && isBuffer(srcValue), isTyped = !isArr && !isBuff && isTypedArray(srcValue);
              newValue = srcValue;
              if (isArr || isBuff || isTyped) {
                if (isArray(objValue)) {
                  newValue = objValue;
                } else if (isArrayLikeObject(objValue)) {
                  newValue = copyArray(objValue);
                } else if (isBuff) {
                  isCommon = false;
                  newValue = cloneBuffer(srcValue, true);
                } else if (isTyped) {
                  isCommon = false;
                  newValue = cloneTypedArray(srcValue, true);
                } else {
                  newValue = [];
                }
              } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
                newValue = objValue;
                if (isArguments(objValue)) {
                  newValue = toPlainObject(objValue);
                } else if (!isObject(objValue) || isFunction(objValue)) {
                  newValue = initCloneObject(srcValue);
                }
              } else {
                isCommon = false;
              }
            }
            if (isCommon) {
              stack.set(srcValue, newValue);
              mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
              stack["delete"](srcValue);
            }
            assignMergeValue(object, key, newValue);
          }
          function baseNth(array, n) {
            var length = array.length;
            if (!length) {
              return;
            }
            n += n < 0 ? length : 0;
            return isIndex(n, length) ? array[n] : undefined2;
          }
          function baseOrderBy(collection, iteratees, orders) {
            if (iteratees.length) {
              iteratees = arrayMap(iteratees, function(iteratee2) {
                if (isArray(iteratee2)) {
                  return function(value) {
                    return baseGet(value, iteratee2.length === 1 ? iteratee2[0] : iteratee2);
                  };
                }
                return iteratee2;
              });
            } else {
              iteratees = [identity];
            }
            var index = -1;
            iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
            var result2 = baseMap(collection, function(value, key, collection2) {
              var criteria = arrayMap(iteratees, function(iteratee2) {
                return iteratee2(value);
              });
              return { "criteria": criteria, "index": ++index, "value": value };
            });
            return baseSortBy(result2, function(object, other) {
              return compareMultiple(object, other, orders);
            });
          }
          function basePick(object, paths) {
            return basePickBy(object, paths, function(value, path3) {
              return hasIn(object, path3);
            });
          }
          function basePickBy(object, paths, predicate) {
            var index = -1, length = paths.length, result2 = {};
            while (++index < length) {
              var path3 = paths[index], value = baseGet(object, path3);
              if (predicate(value, path3)) {
                baseSet(result2, castPath(path3, object), value);
              }
            }
            return result2;
          }
          function basePropertyDeep(path3) {
            return function(object) {
              return baseGet(object, path3);
            };
          }
          function basePullAll(array, values2, iteratee2, comparator) {
            var indexOf2 = comparator ? baseIndexOfWith : baseIndexOf, index = -1, length = values2.length, seen = array;
            if (array === values2) {
              values2 = copyArray(values2);
            }
            if (iteratee2) {
              seen = arrayMap(array, baseUnary(iteratee2));
            }
            while (++index < length) {
              var fromIndex = 0, value = values2[index], computed = iteratee2 ? iteratee2(value) : value;
              while ((fromIndex = indexOf2(seen, computed, fromIndex, comparator)) > -1) {
                if (seen !== array) {
                  splice.call(seen, fromIndex, 1);
                }
                splice.call(array, fromIndex, 1);
              }
            }
            return array;
          }
          function basePullAt(array, indexes) {
            var length = array ? indexes.length : 0, lastIndex = length - 1;
            while (length--) {
              var index = indexes[length];
              if (length == lastIndex || index !== previous) {
                var previous = index;
                if (isIndex(index)) {
                  splice.call(array, index, 1);
                } else {
                  baseUnset(array, index);
                }
              }
            }
            return array;
          }
          function baseRandom(lower, upper) {
            return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
          }
          function baseRange(start, end, step, fromRight) {
            var index = -1, length = nativeMax(nativeCeil((end - start) / (step || 1)), 0), result2 = Array2(length);
            while (length--) {
              result2[fromRight ? length : ++index] = start;
              start += step;
            }
            return result2;
          }
          function baseRepeat(string, n) {
            var result2 = "";
            if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
              return result2;
            }
            do {
              if (n % 2) {
                result2 += string;
              }
              n = nativeFloor(n / 2);
              if (n) {
                string += string;
              }
            } while (n);
            return result2;
          }
          function baseRest(func, start) {
            return setToString(overRest(func, start, identity), func + "");
          }
          function baseSample(collection) {
            return arraySample(values(collection));
          }
          function baseSampleSize(collection, n) {
            var array = values(collection);
            return shuffleSelf(array, baseClamp(n, 0, array.length));
          }
          function baseSet(object, path3, value, customizer) {
            if (!isObject(object)) {
              return object;
            }
            path3 = castPath(path3, object);
            var index = -1, length = path3.length, lastIndex = length - 1, nested = object;
            while (nested != null && ++index < length) {
              var key = toKey(path3[index]), newValue = value;
              if (key === "__proto__" || key === "constructor" || key === "prototype") {
                return object;
              }
              if (index != lastIndex) {
                var objValue = nested[key];
                newValue = customizer ? customizer(objValue, key, nested) : undefined2;
                if (newValue === undefined2) {
                  newValue = isObject(objValue) ? objValue : isIndex(path3[index + 1]) ? [] : {};
                }
              }
              assignValue(nested, key, newValue);
              nested = nested[key];
            }
            return object;
          }
          var baseSetData = !metaMap ? identity : function(func, data) {
            metaMap.set(func, data);
            return func;
          };
          var baseSetToString = !defineProperty ? identity : function(func, string) {
            return defineProperty(func, "toString", {
              "configurable": true,
              "enumerable": false,
              "value": constant(string),
              "writable": true
            });
          };
          function baseShuffle(collection) {
            return shuffleSelf(values(collection));
          }
          function baseSlice(array, start, end) {
            var index = -1, length = array.length;
            if (start < 0) {
              start = -start > length ? 0 : length + start;
            }
            end = end > length ? length : end;
            if (end < 0) {
              end += length;
            }
            length = start > end ? 0 : end - start >>> 0;
            start >>>= 0;
            var result2 = Array2(length);
            while (++index < length) {
              result2[index] = array[index + start];
            }
            return result2;
          }
          function baseSome(collection, predicate) {
            var result2;
            baseEach(collection, function(value, index, collection2) {
              result2 = predicate(value, index, collection2);
              return !result2;
            });
            return !!result2;
          }
          function baseSortedIndex(array, value, retHighest) {
            var low = 0, high = array == null ? low : array.length;
            if (typeof value == "number" && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
              while (low < high) {
                var mid = low + high >>> 1, computed = array[mid];
                if (computed !== null && !isSymbol(computed) && (retHighest ? computed <= value : computed < value)) {
                  low = mid + 1;
                } else {
                  high = mid;
                }
              }
              return high;
            }
            return baseSortedIndexBy(array, value, identity, retHighest);
          }
          function baseSortedIndexBy(array, value, iteratee2, retHighest) {
            var low = 0, high = array == null ? 0 : array.length;
            if (high === 0) {
              return 0;
            }
            value = iteratee2(value);
            var valIsNaN = value !== value, valIsNull = value === null, valIsSymbol = isSymbol(value), valIsUndefined = value === undefined2;
            while (low < high) {
              var mid = nativeFloor((low + high) / 2), computed = iteratee2(array[mid]), othIsDefined = computed !== undefined2, othIsNull = computed === null, othIsReflexive = computed === computed, othIsSymbol = isSymbol(computed);
              if (valIsNaN) {
                var setLow = retHighest || othIsReflexive;
              } else if (valIsUndefined) {
                setLow = othIsReflexive && (retHighest || othIsDefined);
              } else if (valIsNull) {
                setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
              } else if (valIsSymbol) {
                setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
              } else if (othIsNull || othIsSymbol) {
                setLow = false;
              } else {
                setLow = retHighest ? computed <= value : computed < value;
              }
              if (setLow) {
                low = mid + 1;
              } else {
                high = mid;
              }
            }
            return nativeMin(high, MAX_ARRAY_INDEX);
          }
          function baseSortedUniq(array, iteratee2) {
            var index = -1, length = array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
              if (!index || !eq(computed, seen)) {
                var seen = computed;
                result2[resIndex++] = value === 0 ? 0 : value;
              }
            }
            return result2;
          }
          function baseToNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            return +value;
          }
          function baseToString(value) {
            if (typeof value == "string") {
              return value;
            }
            if (isArray(value)) {
              return arrayMap(value, baseToString) + "";
            }
            if (isSymbol(value)) {
              return symbolToString ? symbolToString.call(value) : "";
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function baseUniq(array, iteratee2, comparator) {
            var index = -1, includes2 = arrayIncludes, length = array.length, isCommon = true, result2 = [], seen = result2;
            if (comparator) {
              isCommon = false;
              includes2 = arrayIncludesWith;
            } else if (length >= LARGE_ARRAY_SIZE) {
              var set2 = iteratee2 ? null : createSet(array);
              if (set2) {
                return setToArray(set2);
              }
              isCommon = false;
              includes2 = cacheHas;
              seen = new SetCache();
            } else {
              seen = iteratee2 ? [] : result2;
            }
            outer:
              while (++index < length) {
                var value = array[index], computed = iteratee2 ? iteratee2(value) : value;
                value = comparator || value !== 0 ? value : 0;
                if (isCommon && computed === computed) {
                  var seenIndex = seen.length;
                  while (seenIndex--) {
                    if (seen[seenIndex] === computed) {
                      continue outer;
                    }
                  }
                  if (iteratee2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                } else if (!includes2(seen, computed, comparator)) {
                  if (seen !== result2) {
                    seen.push(computed);
                  }
                  result2.push(value);
                }
              }
            return result2;
          }
          function baseUnset(object, path3) {
            path3 = castPath(path3, object);
            object = parent(object, path3);
            return object == null || delete object[toKey(last(path3))];
          }
          function baseUpdate(object, path3, updater, customizer) {
            return baseSet(object, path3, updater(baseGet(object, path3)), customizer);
          }
          function baseWhile(array, predicate, isDrop, fromRight) {
            var length = array.length, index = fromRight ? length : -1;
            while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {
            }
            return isDrop ? baseSlice(array, fromRight ? 0 : index, fromRight ? index + 1 : length) : baseSlice(array, fromRight ? index + 1 : 0, fromRight ? length : index);
          }
          function baseWrapperValue(value, actions) {
            var result2 = value;
            if (result2 instanceof LazyWrapper) {
              result2 = result2.value();
            }
            return arrayReduce(actions, function(result3, action) {
              return action.func.apply(action.thisArg, arrayPush([result3], action.args));
            }, result2);
          }
          function baseXor(arrays, iteratee2, comparator) {
            var length = arrays.length;
            if (length < 2) {
              return length ? baseUniq(arrays[0]) : [];
            }
            var index = -1, result2 = Array2(length);
            while (++index < length) {
              var array = arrays[index], othIndex = -1;
              while (++othIndex < length) {
                if (othIndex != index) {
                  result2[index] = baseDifference(result2[index] || array, arrays[othIndex], iteratee2, comparator);
                }
              }
            }
            return baseUniq(baseFlatten(result2, 1), iteratee2, comparator);
          }
          function baseZipObject(props, values2, assignFunc) {
            var index = -1, length = props.length, valsLength = values2.length, result2 = {};
            while (++index < length) {
              var value = index < valsLength ? values2[index] : undefined2;
              assignFunc(result2, props[index], value);
            }
            return result2;
          }
          function castArrayLikeObject(value) {
            return isArrayLikeObject(value) ? value : [];
          }
          function castFunction(value) {
            return typeof value == "function" ? value : identity;
          }
          function castPath(value, object) {
            if (isArray(value)) {
              return value;
            }
            return isKey(value, object) ? [value] : stringToPath(toString(value));
          }
          var castRest = baseRest;
          function castSlice(array, start, end) {
            var length = array.length;
            end = end === undefined2 ? length : end;
            return !start && end >= length ? array : baseSlice(array, start, end);
          }
          var clearTimeout2 = ctxClearTimeout || function(id) {
            return root.clearTimeout(id);
          };
          function cloneBuffer(buffer, isDeep) {
            if (isDeep) {
              return buffer.slice();
            }
            var length = buffer.length, result2 = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
            buffer.copy(result2);
            return result2;
          }
          function cloneArrayBuffer(arrayBuffer) {
            var result2 = new arrayBuffer.constructor(arrayBuffer.byteLength);
            new Uint8Array2(result2).set(new Uint8Array2(arrayBuffer));
            return result2;
          }
          function cloneDataView(dataView, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
            return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
          }
          function cloneRegExp(regexp) {
            var result2 = new regexp.constructor(regexp.source, reFlags.exec(regexp));
            result2.lastIndex = regexp.lastIndex;
            return result2;
          }
          function cloneSymbol(symbol) {
            return symbolValueOf ? Object2(symbolValueOf.call(symbol)) : {};
          }
          function cloneTypedArray(typedArray, isDeep) {
            var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
            return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
          }
          function compareAscending(value, other) {
            if (value !== other) {
              var valIsDefined = value !== undefined2, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
              var othIsDefined = other !== undefined2, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
              if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
                return 1;
              }
              if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
                return -1;
              }
            }
            return 0;
          }
          function compareMultiple(object, other, orders) {
            var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length = objCriteria.length, ordersLength = orders.length;
            while (++index < length) {
              var result2 = compareAscending(objCriteria[index], othCriteria[index]);
              if (result2) {
                if (index >= ordersLength) {
                  return result2;
                }
                var order = orders[index];
                return result2 * (order == "desc" ? -1 : 1);
              }
            }
            return object.index - other.index;
          }
          function composeArgs(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersLength = holders.length, leftIndex = -1, leftLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(leftLength + rangeLength), isUncurried = !isCurried;
            while (++leftIndex < leftLength) {
              result2[leftIndex] = partials[leftIndex];
            }
            while (++argsIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[holders[argsIndex]] = args[argsIndex];
              }
            }
            while (rangeLength--) {
              result2[leftIndex++] = args[argsIndex++];
            }
            return result2;
          }
          function composeArgsRight(args, partials, holders, isCurried) {
            var argsIndex = -1, argsLength = args.length, holdersIndex = -1, holdersLength = holders.length, rightIndex = -1, rightLength = partials.length, rangeLength = nativeMax(argsLength - holdersLength, 0), result2 = Array2(rangeLength + rightLength), isUncurried = !isCurried;
            while (++argsIndex < rangeLength) {
              result2[argsIndex] = args[argsIndex];
            }
            var offset = argsIndex;
            while (++rightIndex < rightLength) {
              result2[offset + rightIndex] = partials[rightIndex];
            }
            while (++holdersIndex < holdersLength) {
              if (isUncurried || argsIndex < argsLength) {
                result2[offset + holders[holdersIndex]] = args[argsIndex++];
              }
            }
            return result2;
          }
          function copyArray(source, array) {
            var index = -1, length = source.length;
            array || (array = Array2(length));
            while (++index < length) {
              array[index] = source[index];
            }
            return array;
          }
          function copyObject(source, props, object, customizer) {
            var isNew = !object;
            object || (object = {});
            var index = -1, length = props.length;
            while (++index < length) {
              var key = props[index];
              var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined2;
              if (newValue === undefined2) {
                newValue = source[key];
              }
              if (isNew) {
                baseAssignValue(object, key, newValue);
              } else {
                assignValue(object, key, newValue);
              }
            }
            return object;
          }
          function copySymbols(source, object) {
            return copyObject(source, getSymbols(source), object);
          }
          function copySymbolsIn(source, object) {
            return copyObject(source, getSymbolsIn(source), object);
          }
          function createAggregator(setter, initializer) {
            return function(collection, iteratee2) {
              var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
              return func(collection, setter, getIteratee(iteratee2, 2), accumulator);
            };
          }
          function createAssigner(assigner) {
            return baseRest(function(object, sources) {
              var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : undefined2, guard = length > 2 ? sources[2] : undefined2;
              customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : undefined2;
              if (guard && isIterateeCall(sources[0], sources[1], guard)) {
                customizer = length < 3 ? undefined2 : customizer;
                length = 1;
              }
              object = Object2(object);
              while (++index < length) {
                var source = sources[index];
                if (source) {
                  assigner(object, source, index, customizer);
                }
              }
              return object;
            });
          }
          function createBaseEach(eachFunc, fromRight) {
            return function(collection, iteratee2) {
              if (collection == null) {
                return collection;
              }
              if (!isArrayLike(collection)) {
                return eachFunc(collection, iteratee2);
              }
              var length = collection.length, index = fromRight ? length : -1, iterable = Object2(collection);
              while (fromRight ? index-- : ++index < length) {
                if (iteratee2(iterable[index], index, iterable) === false) {
                  break;
                }
              }
              return collection;
            };
          }
          function createBaseFor(fromRight) {
            return function(object, iteratee2, keysFunc) {
              var index = -1, iterable = Object2(object), props = keysFunc(object), length = props.length;
              while (length--) {
                var key = props[fromRight ? length : ++index];
                if (iteratee2(iterable[key], key, iterable) === false) {
                  break;
                }
              }
              return object;
            };
          }
          function createBind(func, bitmask, thisArg) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return fn.apply(isBind ? thisArg : this, arguments);
            }
            return wrapper;
          }
          function createCaseFirst(methodName) {
            return function(string) {
              string = toString(string);
              var strSymbols = hasUnicode(string) ? stringToArray(string) : undefined2;
              var chr = strSymbols ? strSymbols[0] : string.charAt(0);
              var trailing = strSymbols ? castSlice(strSymbols, 1).join("") : string.slice(1);
              return chr[methodName]() + trailing;
            };
          }
          function createCompounder(callback) {
            return function(string) {
              return arrayReduce(words(deburr(string).replace(reApos, "")), callback, "");
            };
          }
          function createCtor(Ctor) {
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return new Ctor();
                case 1:
                  return new Ctor(args[0]);
                case 2:
                  return new Ctor(args[0], args[1]);
                case 3:
                  return new Ctor(args[0], args[1], args[2]);
                case 4:
                  return new Ctor(args[0], args[1], args[2], args[3]);
                case 5:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4]);
                case 6:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
                case 7:
                  return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
              }
              var thisBinding = baseCreate(Ctor.prototype), result2 = Ctor.apply(thisBinding, args);
              return isObject(result2) ? result2 : thisBinding;
            };
          }
          function createCurry(func, bitmask, arity) {
            var Ctor = createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length, placeholder = getHolder(wrapper);
              while (index--) {
                args[index] = arguments[index];
              }
              var holders = length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder ? [] : replaceHolders(args, placeholder);
              length -= holders.length;
              if (length < arity) {
                return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, undefined2, args, holders, undefined2, undefined2, arity - length);
              }
              var fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              return apply(fn, this, args);
            }
            return wrapper;
          }
          function createFind(findIndexFunc) {
            return function(collection, predicate, fromIndex) {
              var iterable = Object2(collection);
              if (!isArrayLike(collection)) {
                var iteratee2 = getIteratee(predicate, 3);
                collection = keys(collection);
                predicate = function(key) {
                  return iteratee2(iterable[key], key, iterable);
                };
              }
              var index = findIndexFunc(collection, predicate, fromIndex);
              return index > -1 ? iterable[iteratee2 ? collection[index] : index] : undefined2;
            };
          }
          function createFlow(fromRight) {
            return flatRest(function(funcs) {
              var length = funcs.length, index = length, prereq = LodashWrapper.prototype.thru;
              if (fromRight) {
                funcs.reverse();
              }
              while (index--) {
                var func = funcs[index];
                if (typeof func != "function") {
                  throw new TypeError2(FUNC_ERROR_TEXT);
                }
                if (prereq && !wrapper && getFuncName(func) == "wrapper") {
                  var wrapper = new LodashWrapper([], true);
                }
              }
              index = wrapper ? index : length;
              while (++index < length) {
                func = funcs[index];
                var funcName = getFuncName(func), data = funcName == "wrapper" ? getData(func) : undefined2;
                if (data && isLaziable(data[0]) && data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) && !data[4].length && data[9] == 1) {
                  wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
                } else {
                  wrapper = func.length == 1 && isLaziable(func) ? wrapper[funcName]() : wrapper.thru(func);
                }
              }
              return function() {
                var args = arguments, value = args[0];
                if (wrapper && args.length == 1 && isArray(value)) {
                  return wrapper.plant(value).value();
                }
                var index2 = 0, result2 = length ? funcs[index2].apply(this, args) : value;
                while (++index2 < length) {
                  result2 = funcs[index2].call(this, result2);
                }
                return result2;
              };
            });
          }
          function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary2, arity) {
            var isAry = bitmask & WRAP_ARY_FLAG, isBind = bitmask & WRAP_BIND_FLAG, isBindKey = bitmask & WRAP_BIND_KEY_FLAG, isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG), isFlip = bitmask & WRAP_FLIP_FLAG, Ctor = isBindKey ? undefined2 : createCtor(func);
            function wrapper() {
              var length = arguments.length, args = Array2(length), index = length;
              while (index--) {
                args[index] = arguments[index];
              }
              if (isCurried) {
                var placeholder = getHolder(wrapper), holdersCount = countHolders(args, placeholder);
              }
              if (partials) {
                args = composeArgs(args, partials, holders, isCurried);
              }
              if (partialsRight) {
                args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
              }
              length -= holdersCount;
              if (isCurried && length < arity) {
                var newHolders = replaceHolders(args, placeholder);
                return createRecurry(func, bitmask, createHybrid, wrapper.placeholder, thisArg, args, newHolders, argPos, ary2, arity - length);
              }
              var thisBinding = isBind ? thisArg : this, fn = isBindKey ? thisBinding[func] : func;
              length = args.length;
              if (argPos) {
                args = reorder(args, argPos);
              } else if (isFlip && length > 1) {
                args.reverse();
              }
              if (isAry && ary2 < length) {
                args.length = ary2;
              }
              if (this && this !== root && this instanceof wrapper) {
                fn = Ctor || createCtor(fn);
              }
              return fn.apply(thisBinding, args);
            }
            return wrapper;
          }
          function createInverter(setter, toIteratee) {
            return function(object, iteratee2) {
              return baseInverter(object, setter, toIteratee(iteratee2), {});
            };
          }
          function createMathOperation(operator, defaultValue) {
            return function(value, other) {
              var result2;
              if (value === undefined2 && other === undefined2) {
                return defaultValue;
              }
              if (value !== undefined2) {
                result2 = value;
              }
              if (other !== undefined2) {
                if (result2 === undefined2) {
                  return other;
                }
                if (typeof value == "string" || typeof other == "string") {
                  value = baseToString(value);
                  other = baseToString(other);
                } else {
                  value = baseToNumber(value);
                  other = baseToNumber(other);
                }
                result2 = operator(value, other);
              }
              return result2;
            };
          }
          function createOver(arrayFunc) {
            return flatRest(function(iteratees) {
              iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
              return baseRest(function(args) {
                var thisArg = this;
                return arrayFunc(iteratees, function(iteratee2) {
                  return apply(iteratee2, thisArg, args);
                });
              });
            });
          }
          function createPadding(length, chars) {
            chars = chars === undefined2 ? " " : baseToString(chars);
            var charsLength = chars.length;
            if (charsLength < 2) {
              return charsLength ? baseRepeat(chars, length) : chars;
            }
            var result2 = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
            return hasUnicode(chars) ? castSlice(stringToArray(result2), 0, length).join("") : result2.slice(0, length);
          }
          function createPartial(func, bitmask, thisArg, partials) {
            var isBind = bitmask & WRAP_BIND_FLAG, Ctor = createCtor(func);
            function wrapper() {
              var argsIndex = -1, argsLength = arguments.length, leftIndex = -1, leftLength = partials.length, args = Array2(leftLength + argsLength), fn = this && this !== root && this instanceof wrapper ? Ctor : func;
              while (++leftIndex < leftLength) {
                args[leftIndex] = partials[leftIndex];
              }
              while (argsLength--) {
                args[leftIndex++] = arguments[++argsIndex];
              }
              return apply(fn, isBind ? thisArg : this, args);
            }
            return wrapper;
          }
          function createRange(fromRight) {
            return function(start, end, step) {
              if (step && typeof step != "number" && isIterateeCall(start, end, step)) {
                end = step = undefined2;
              }
              start = toFinite(start);
              if (end === undefined2) {
                end = start;
                start = 0;
              } else {
                end = toFinite(end);
              }
              step = step === undefined2 ? start < end ? 1 : -1 : toFinite(step);
              return baseRange(start, end, step, fromRight);
            };
          }
          function createRelationalOperation(operator) {
            return function(value, other) {
              if (!(typeof value == "string" && typeof other == "string")) {
                value = toNumber(value);
                other = toNumber(other);
              }
              return operator(value, other);
            };
          }
          function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary2, arity) {
            var isCurry = bitmask & WRAP_CURRY_FLAG, newHolders = isCurry ? holders : undefined2, newHoldersRight = isCurry ? undefined2 : holders, newPartials = isCurry ? partials : undefined2, newPartialsRight = isCurry ? undefined2 : partials;
            bitmask |= isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG;
            bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);
            if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
              bitmask &= ~(WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG);
            }
            var newData = [
              func,
              bitmask,
              thisArg,
              newPartials,
              newHolders,
              newPartialsRight,
              newHoldersRight,
              argPos,
              ary2,
              arity
            ];
            var result2 = wrapFunc.apply(undefined2, newData);
            if (isLaziable(func)) {
              setData(result2, newData);
            }
            result2.placeholder = placeholder;
            return setWrapToString(result2, func, bitmask);
          }
          function createRound(methodName) {
            var func = Math2[methodName];
            return function(number, precision) {
              number = toNumber(number);
              precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
              if (precision && nativeIsFinite(number)) {
                var pair = (toString(number) + "e").split("e"), value = func(pair[0] + "e" + (+pair[1] + precision));
                pair = (toString(value) + "e").split("e");
                return +(pair[0] + "e" + (+pair[1] - precision));
              }
              return func(number);
            };
          }
          var createSet = !(Set2 && 1 / setToArray(new Set2([, -0]))[1] == INFINITY) ? noop : function(values2) {
            return new Set2(values2);
          };
          function createToPairs(keysFunc) {
            return function(object) {
              var tag = getTag(object);
              if (tag == mapTag) {
                return mapToArray(object);
              }
              if (tag == setTag) {
                return setToPairs(object);
              }
              return baseToPairs(object, keysFunc(object));
            };
          }
          function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary2, arity) {
            var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
            if (!isBindKey && typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var length = partials ? partials.length : 0;
            if (!length) {
              bitmask &= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
              partials = holders = undefined2;
            }
            ary2 = ary2 === undefined2 ? ary2 : nativeMax(toInteger(ary2), 0);
            arity = arity === undefined2 ? arity : toInteger(arity);
            length -= holders ? holders.length : 0;
            if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
              var partialsRight = partials, holdersRight = holders;
              partials = holders = undefined2;
            }
            var data = isBindKey ? undefined2 : getData(func);
            var newData = [
              func,
              bitmask,
              thisArg,
              partials,
              holders,
              partialsRight,
              holdersRight,
              argPos,
              ary2,
              arity
            ];
            if (data) {
              mergeData(newData, data);
            }
            func = newData[0];
            bitmask = newData[1];
            thisArg = newData[2];
            partials = newData[3];
            holders = newData[4];
            arity = newData[9] = newData[9] === undefined2 ? isBindKey ? 0 : func.length : nativeMax(newData[9] - length, 0);
            if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
              bitmask &= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
            }
            if (!bitmask || bitmask == WRAP_BIND_FLAG) {
              var result2 = createBind(func, bitmask, thisArg);
            } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
              result2 = createCurry(func, bitmask, arity);
            } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
              result2 = createPartial(func, bitmask, thisArg, partials);
            } else {
              result2 = createHybrid.apply(undefined2, newData);
            }
            var setter = data ? baseSetData : setData;
            return setWrapToString(setter(result2, newData), func, bitmask);
          }
          function customDefaultsAssignIn(objValue, srcValue, key, object) {
            if (objValue === undefined2 || eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key)) {
              return srcValue;
            }
            return objValue;
          }
          function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
            if (isObject(objValue) && isObject(srcValue)) {
              stack.set(srcValue, objValue);
              baseMerge(objValue, srcValue, undefined2, customDefaultsMerge, stack);
              stack["delete"](srcValue);
            }
            return objValue;
          }
          function customOmitClone(value) {
            return isPlainObject(value) ? undefined2 : value;
          }
          function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
            if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
              return false;
            }
            var arrStacked = stack.get(array);
            var othStacked = stack.get(other);
            if (arrStacked && othStacked) {
              return arrStacked == other && othStacked == array;
            }
            var index = -1, result2 = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : undefined2;
            stack.set(array, other);
            stack.set(other, array);
            while (++index < arrLength) {
              var arrValue = array[index], othValue = other[index];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
              }
              if (compared !== undefined2) {
                if (compared) {
                  continue;
                }
                result2 = false;
                break;
              }
              if (seen) {
                if (!arraySome(other, function(othValue2, othIndex) {
                  if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
                    return seen.push(othIndex);
                  }
                })) {
                  result2 = false;
                  break;
                }
              } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
                result2 = false;
                break;
              }
            }
            stack["delete"](array);
            stack["delete"](other);
            return result2;
          }
          function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
            switch (tag) {
              case dataViewTag:
                if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
                  return false;
                }
                object = object.buffer;
                other = other.buffer;
              case arrayBufferTag:
                if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
                  return false;
                }
                return true;
              case boolTag:
              case dateTag:
              case numberTag:
                return eq(+object, +other);
              case errorTag:
                return object.name == other.name && object.message == other.message;
              case regexpTag:
              case stringTag:
                return object == other + "";
              case mapTag:
                var convert = mapToArray;
              case setTag:
                var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
                convert || (convert = setToArray);
                if (object.size != other.size && !isPartial) {
                  return false;
                }
                var stacked = stack.get(object);
                if (stacked) {
                  return stacked == other;
                }
                bitmask |= COMPARE_UNORDERED_FLAG;
                stack.set(object, other);
                var result2 = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
                stack["delete"](object);
                return result2;
              case symbolTag:
                if (symbolValueOf) {
                  return symbolValueOf.call(object) == symbolValueOf.call(other);
                }
            }
            return false;
          }
          function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
            var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
            if (objLength != othLength && !isPartial) {
              return false;
            }
            var index = objLength;
            while (index--) {
              var key = objProps[index];
              if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
                return false;
              }
            }
            var objStacked = stack.get(object);
            var othStacked = stack.get(other);
            if (objStacked && othStacked) {
              return objStacked == other && othStacked == object;
            }
            var result2 = true;
            stack.set(object, other);
            stack.set(other, object);
            var skipCtor = isPartial;
            while (++index < objLength) {
              key = objProps[index];
              var objValue = object[key], othValue = other[key];
              if (customizer) {
                var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
              }
              if (!(compared === undefined2 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
                result2 = false;
                break;
              }
              skipCtor || (skipCtor = key == "constructor");
            }
            if (result2 && !skipCtor) {
              var objCtor = object.constructor, othCtor = other.constructor;
              if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
                result2 = false;
              }
            }
            stack["delete"](object);
            stack["delete"](other);
            return result2;
          }
          function flatRest(func) {
            return setToString(overRest(func, undefined2, flatten), func + "");
          }
          function getAllKeys(object) {
            return baseGetAllKeys(object, keys, getSymbols);
          }
          function getAllKeysIn(object) {
            return baseGetAllKeys(object, keysIn, getSymbolsIn);
          }
          var getData = !metaMap ? noop : function(func) {
            return metaMap.get(func);
          };
          function getFuncName(func) {
            var result2 = func.name + "", array = realNames[result2], length = hasOwnProperty.call(realNames, result2) ? array.length : 0;
            while (length--) {
              var data = array[length], otherFunc = data.func;
              if (otherFunc == null || otherFunc == func) {
                return data.name;
              }
            }
            return result2;
          }
          function getHolder(func) {
            var object = hasOwnProperty.call(lodash, "placeholder") ? lodash : func;
            return object.placeholder;
          }
          function getIteratee() {
            var result2 = lodash.iteratee || iteratee;
            result2 = result2 === iteratee ? baseIteratee : result2;
            return arguments.length ? result2(arguments[0], arguments[1]) : result2;
          }
          function getMapData(map2, key) {
            var data = map2.__data__;
            return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
          }
          function getMatchData(object) {
            var result2 = keys(object), length = result2.length;
            while (length--) {
              var key = result2[length], value = object[key];
              result2[length] = [key, value, isStrictComparable(value)];
            }
            return result2;
          }
          function getNative(object, key) {
            var value = getValue(object, key);
            return baseIsNative(value) ? value : undefined2;
          }
          function getRawTag(value) {
            var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
            try {
              value[symToStringTag] = undefined2;
              var unmasked = true;
            } catch (e) {
            }
            var result2 = nativeObjectToString.call(value);
            if (unmasked) {
              if (isOwn) {
                value[symToStringTag] = tag;
              } else {
                delete value[symToStringTag];
              }
            }
            return result2;
          }
          var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
            if (object == null) {
              return [];
            }
            object = Object2(object);
            return arrayFilter(nativeGetSymbols(object), function(symbol) {
              return propertyIsEnumerable.call(object, symbol);
            });
          };
          var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
            var result2 = [];
            while (object) {
              arrayPush(result2, getSymbols(object));
              object = getPrototype(object);
            }
            return result2;
          };
          var getTag = baseGetTag;
          if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
            getTag = function(value) {
              var result2 = baseGetTag(value), Ctor = result2 == objectTag ? value.constructor : undefined2, ctorString = Ctor ? toSource(Ctor) : "";
              if (ctorString) {
                switch (ctorString) {
                  case dataViewCtorString:
                    return dataViewTag;
                  case mapCtorString:
                    return mapTag;
                  case promiseCtorString:
                    return promiseTag;
                  case setCtorString:
                    return setTag;
                  case weakMapCtorString:
                    return weakMapTag;
                }
              }
              return result2;
            };
          }
          function getView(start, end, transforms) {
            var index = -1, length = transforms.length;
            while (++index < length) {
              var data = transforms[index], size2 = data.size;
              switch (data.type) {
                case "drop":
                  start += size2;
                  break;
                case "dropRight":
                  end -= size2;
                  break;
                case "take":
                  end = nativeMin(end, start + size2);
                  break;
                case "takeRight":
                  start = nativeMax(start, end - size2);
                  break;
              }
            }
            return { "start": start, "end": end };
          }
          function getWrapDetails(source) {
            var match = source.match(reWrapDetails);
            return match ? match[1].split(reSplitDetails) : [];
          }
          function hasPath(object, path3, hasFunc) {
            path3 = castPath(path3, object);
            var index = -1, length = path3.length, result2 = false;
            while (++index < length) {
              var key = toKey(path3[index]);
              if (!(result2 = object != null && hasFunc(object, key))) {
                break;
              }
              object = object[key];
            }
            if (result2 || ++index != length) {
              return result2;
            }
            length = object == null ? 0 : object.length;
            return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
          }
          function initCloneArray(array) {
            var length = array.length, result2 = new array.constructor(length);
            if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
              result2.index = array.index;
              result2.input = array.input;
            }
            return result2;
          }
          function initCloneObject(object) {
            return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
          }
          function initCloneByTag(object, tag, isDeep) {
            var Ctor = object.constructor;
            switch (tag) {
              case arrayBufferTag:
                return cloneArrayBuffer(object);
              case boolTag:
              case dateTag:
                return new Ctor(+object);
              case dataViewTag:
                return cloneDataView(object, isDeep);
              case float32Tag:
              case float64Tag:
              case int8Tag:
              case int16Tag:
              case int32Tag:
              case uint8Tag:
              case uint8ClampedTag:
              case uint16Tag:
              case uint32Tag:
                return cloneTypedArray(object, isDeep);
              case mapTag:
                return new Ctor();
              case numberTag:
              case stringTag:
                return new Ctor(object);
              case regexpTag:
                return cloneRegExp(object);
              case setTag:
                return new Ctor();
              case symbolTag:
                return cloneSymbol(object);
            }
          }
          function insertWrapDetails(source, details) {
            var length = details.length;
            if (!length) {
              return source;
            }
            var lastIndex = length - 1;
            details[lastIndex] = (length > 1 ? "& " : "") + details[lastIndex];
            details = details.join(length > 2 ? ", " : " ");
            return source.replace(reWrapComment, "{\n/* [wrapped with " + details + "] */\n");
          }
          function isFlattenable(value) {
            return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
          }
          function isIndex(value, length) {
            var type = typeof value;
            length = length == null ? MAX_SAFE_INTEGER : length;
            return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
          }
          function isIterateeCall(value, index, object) {
            if (!isObject(object)) {
              return false;
            }
            var type = typeof index;
            if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) {
              return eq(object[index], value);
            }
            return false;
          }
          function isKey(value, object) {
            if (isArray(value)) {
              return false;
            }
            var type = typeof value;
            if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
              return true;
            }
            return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object2(object);
          }
          function isKeyable(value) {
            var type = typeof value;
            return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
          }
          function isLaziable(func) {
            var funcName = getFuncName(func), other = lodash[funcName];
            if (typeof other != "function" || !(funcName in LazyWrapper.prototype)) {
              return false;
            }
            if (func === other) {
              return true;
            }
            var data = getData(other);
            return !!data && func === data[0];
          }
          function isMasked(func) {
            return !!maskSrcKey && maskSrcKey in func;
          }
          var isMaskable = coreJsData ? isFunction : stubFalse;
          function isPrototype(value) {
            var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
            return value === proto;
          }
          function isStrictComparable(value) {
            return value === value && !isObject(value);
          }
          function matchesStrictComparable(key, srcValue) {
            return function(object) {
              if (object == null) {
                return false;
              }
              return object[key] === srcValue && (srcValue !== undefined2 || key in Object2(object));
            };
          }
          function memoizeCapped(func) {
            var result2 = memoize(func, function(key) {
              if (cache.size === MAX_MEMOIZE_SIZE) {
                cache.clear();
              }
              return key;
            });
            var cache = result2.cache;
            return result2;
          }
          function mergeData(data, source) {
            var bitmask = data[1], srcBitmask = source[1], newBitmask = bitmask | srcBitmask, isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);
            var isCombo = srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_CURRY_FLAG || srcBitmask == WRAP_ARY_FLAG && bitmask == WRAP_REARG_FLAG && data[7].length <= source[8] || srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG) && source[7].length <= source[8] && bitmask == WRAP_CURRY_FLAG;
            if (!(isCommon || isCombo)) {
              return data;
            }
            if (srcBitmask & WRAP_BIND_FLAG) {
              data[2] = source[2];
              newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
            }
            var value = source[3];
            if (value) {
              var partials = data[3];
              data[3] = partials ? composeArgs(partials, value, source[4]) : value;
              data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
            }
            value = source[5];
            if (value) {
              partials = data[5];
              data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
              data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
            }
            value = source[7];
            if (value) {
              data[7] = value;
            }
            if (srcBitmask & WRAP_ARY_FLAG) {
              data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
            }
            if (data[9] == null) {
              data[9] = source[9];
            }
            data[0] = source[0];
            data[1] = newBitmask;
            return data;
          }
          function nativeKeysIn(object) {
            var result2 = [];
            if (object != null) {
              for (var key in Object2(object)) {
                result2.push(key);
              }
            }
            return result2;
          }
          function objectToString(value) {
            return nativeObjectToString.call(value);
          }
          function overRest(func, start, transform2) {
            start = nativeMax(start === undefined2 ? func.length - 1 : start, 0);
            return function() {
              var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array2(length);
              while (++index < length) {
                array[index] = args[start + index];
              }
              index = -1;
              var otherArgs = Array2(start + 1);
              while (++index < start) {
                otherArgs[index] = args[index];
              }
              otherArgs[start] = transform2(array);
              return apply(func, this, otherArgs);
            };
          }
          function parent(object, path3) {
            return path3.length < 2 ? object : baseGet(object, baseSlice(path3, 0, -1));
          }
          function reorder(array, indexes) {
            var arrLength = array.length, length = nativeMin(indexes.length, arrLength), oldArray = copyArray(array);
            while (length--) {
              var index = indexes[length];
              array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined2;
            }
            return array;
          }
          function safeGet(object, key) {
            if (key === "constructor" && typeof object[key] === "function") {
              return;
            }
            if (key == "__proto__") {
              return;
            }
            return object[key];
          }
          var setData = shortOut(baseSetData);
          var setTimeout2 = ctxSetTimeout || function(func, wait) {
            return root.setTimeout(func, wait);
          };
          var setToString = shortOut(baseSetToString);
          function setWrapToString(wrapper, reference, bitmask) {
            var source = reference + "";
            return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
          }
          function shortOut(func) {
            var count = 0, lastCalled = 0;
            return function() {
              var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
              lastCalled = stamp;
              if (remaining > 0) {
                if (++count >= HOT_COUNT) {
                  return arguments[0];
                }
              } else {
                count = 0;
              }
              return func.apply(undefined2, arguments);
            };
          }
          function shuffleSelf(array, size2) {
            var index = -1, length = array.length, lastIndex = length - 1;
            size2 = size2 === undefined2 ? length : size2;
            while (++index < size2) {
              var rand = baseRandom(index, lastIndex), value = array[rand];
              array[rand] = array[index];
              array[index] = value;
            }
            array.length = size2;
            return array;
          }
          var stringToPath = memoizeCapped(function(string) {
            var result2 = [];
            if (string.charCodeAt(0) === 46) {
              result2.push("");
            }
            string.replace(rePropName, function(match, number, quote, subString) {
              result2.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
            });
            return result2;
          });
          function toKey(value) {
            if (typeof value == "string" || isSymbol(value)) {
              return value;
            }
            var result2 = value + "";
            return result2 == "0" && 1 / value == -INFINITY ? "-0" : result2;
          }
          function toSource(func) {
            if (func != null) {
              try {
                return funcToString.call(func);
              } catch (e) {
              }
              try {
                return func + "";
              } catch (e) {
              }
            }
            return "";
          }
          function updateWrapDetails(details, bitmask) {
            arrayEach(wrapFlags, function(pair) {
              var value = "_." + pair[0];
              if (bitmask & pair[1] && !arrayIncludes(details, value)) {
                details.push(value);
              }
            });
            return details.sort();
          }
          function wrapperClone(wrapper) {
            if (wrapper instanceof LazyWrapper) {
              return wrapper.clone();
            }
            var result2 = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
            result2.__actions__ = copyArray(wrapper.__actions__);
            result2.__index__ = wrapper.__index__;
            result2.__values__ = wrapper.__values__;
            return result2;
          }
          function chunk(array, size2, guard) {
            if (guard ? isIterateeCall(array, size2, guard) : size2 === undefined2) {
              size2 = 1;
            } else {
              size2 = nativeMax(toInteger(size2), 0);
            }
            var length = array == null ? 0 : array.length;
            if (!length || size2 < 1) {
              return [];
            }
            var index = 0, resIndex = 0, result2 = Array2(nativeCeil(length / size2));
            while (index < length) {
              result2[resIndex++] = baseSlice(array, index, index += size2);
            }
            return result2;
          }
          function compact(array) {
            var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result2 = [];
            while (++index < length) {
              var value = array[index];
              if (value) {
                result2[resIndex++] = value;
              }
            }
            return result2;
          }
          function concat() {
            var length = arguments.length;
            if (!length) {
              return [];
            }
            var args = Array2(length - 1), array = arguments[0], index = length;
            while (index--) {
              args[index - 1] = arguments[index];
            }
            return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
          }
          var difference = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
          });
          var differenceBy2 = baseRest(function(array, values2) {
            var iteratee2 = last(values2);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2)) : [];
          });
          var differenceWith = baseRest(function(array, values2) {
            var comparator = last(values2);
            if (isArrayLikeObject(comparator)) {
              comparator = undefined2;
            }
            return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true), undefined2, comparator) : [];
          });
          function drop(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function dropRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function dropRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true, true) : [];
          }
          function dropWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), true) : [];
          }
          function fill(array, value, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (start && typeof start != "number" && isIterateeCall(array, value, start)) {
              start = 0;
              end = length;
            }
            return baseFill(array, value, start, end);
          }
          function findIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index);
          }
          function findLastIndex(array, predicate, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length - 1;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = fromIndex < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return baseFindIndex(array, getIteratee(predicate, 3), index, true);
          }
          function flatten(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, 1) : [];
          }
          function flattenDeep(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseFlatten(array, INFINITY) : [];
          }
          function flattenDepth(array, depth) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(array, depth);
          }
          function fromPairs(pairs) {
            var index = -1, length = pairs == null ? 0 : pairs.length, result2 = {};
            while (++index < length) {
              var pair = pairs[index];
              result2[pair[0]] = pair[1];
            }
            return result2;
          }
          function head(array) {
            return array && array.length ? array[0] : undefined2;
          }
          function indexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = fromIndex == null ? 0 : toInteger(fromIndex);
            if (index < 0) {
              index = nativeMax(length + index, 0);
            }
            return baseIndexOf(array, value, index);
          }
          function initial(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 0, -1) : [];
          }
          var intersection = baseRest(function(arrays) {
            var mapped = arrayMap(arrays, castArrayLikeObject);
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped) : [];
          });
          var intersectionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            if (iteratee2 === last(mapped)) {
              iteratee2 = undefined2;
            } else {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, getIteratee(iteratee2, 2)) : [];
          });
          var intersectionWith = baseRest(function(arrays) {
            var comparator = last(arrays), mapped = arrayMap(arrays, castArrayLikeObject);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            if (comparator) {
              mapped.pop();
            }
            return mapped.length && mapped[0] === arrays[0] ? baseIntersection(mapped, undefined2, comparator) : [];
          });
          function join(array, separator) {
            return array == null ? "" : nativeJoin.call(array, separator);
          }
          function last(array) {
            var length = array == null ? 0 : array.length;
            return length ? array[length - 1] : undefined2;
          }
          function lastIndexOf(array, value, fromIndex) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return -1;
            }
            var index = length;
            if (fromIndex !== undefined2) {
              index = toInteger(fromIndex);
              index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
            }
            return value === value ? strictLastIndexOf(array, value, index) : baseFindIndex(array, baseIsNaN, index, true);
          }
          function nth(array, n) {
            return array && array.length ? baseNth(array, toInteger(n)) : undefined2;
          }
          var pull = baseRest(pullAll);
          function pullAll(array, values2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2) : array;
          }
          function pullAllBy(array, values2, iteratee2) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, getIteratee(iteratee2, 2)) : array;
          }
          function pullAllWith(array, values2, comparator) {
            return array && array.length && values2 && values2.length ? basePullAll(array, values2, undefined2, comparator) : array;
          }
          var pullAt = flatRest(function(array, indexes) {
            var length = array == null ? 0 : array.length, result2 = baseAt(array, indexes);
            basePullAt(array, arrayMap(indexes, function(index) {
              return isIndex(index, length) ? +index : index;
            }).sort(compareAscending));
            return result2;
          });
          function remove(array, predicate) {
            var result2 = [];
            if (!(array && array.length)) {
              return result2;
            }
            var index = -1, indexes = [], length = array.length;
            predicate = getIteratee(predicate, 3);
            while (++index < length) {
              var value = array[index];
              if (predicate(value, index, array)) {
                result2.push(value);
                indexes.push(index);
              }
            }
            basePullAt(array, indexes);
            return result2;
          }
          function reverse(array) {
            return array == null ? array : nativeReverse.call(array);
          }
          function slice(array, start, end) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            if (end && typeof end != "number" && isIterateeCall(array, start, end)) {
              start = 0;
              end = length;
            } else {
              start = start == null ? 0 : toInteger(start);
              end = end === undefined2 ? length : toInteger(end);
            }
            return baseSlice(array, start, end);
          }
          function sortedIndex(array, value) {
            return baseSortedIndex(array, value);
          }
          function sortedIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2));
          }
          function sortedIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value);
              if (index < length && eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedLastIndex(array, value) {
            return baseSortedIndex(array, value, true);
          }
          function sortedLastIndexBy(array, value, iteratee2) {
            return baseSortedIndexBy(array, value, getIteratee(iteratee2, 2), true);
          }
          function sortedLastIndexOf(array, value) {
            var length = array == null ? 0 : array.length;
            if (length) {
              var index = baseSortedIndex(array, value, true) - 1;
              if (eq(array[index], value)) {
                return index;
              }
            }
            return -1;
          }
          function sortedUniq(array) {
            return array && array.length ? baseSortedUniq(array) : [];
          }
          function sortedUniqBy(array, iteratee2) {
            return array && array.length ? baseSortedUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function tail(array) {
            var length = array == null ? 0 : array.length;
            return length ? baseSlice(array, 1, length) : [];
          }
          function take(array, n, guard) {
            if (!(array && array.length)) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            return baseSlice(array, 0, n < 0 ? 0 : n);
          }
          function takeRight(array, n, guard) {
            var length = array == null ? 0 : array.length;
            if (!length) {
              return [];
            }
            n = guard || n === undefined2 ? 1 : toInteger(n);
            n = length - n;
            return baseSlice(array, n < 0 ? 0 : n, length);
          }
          function takeRightWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3), false, true) : [];
          }
          function takeWhile(array, predicate) {
            return array && array.length ? baseWhile(array, getIteratee(predicate, 3)) : [];
          }
          var union = baseRest(function(arrays) {
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
          });
          var unionBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee2, 2));
          });
          var unionWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined2, comparator);
          });
          function uniq(array) {
            return array && array.length ? baseUniq(array) : [];
          }
          function uniqBy2(array, iteratee2) {
            return array && array.length ? baseUniq(array, getIteratee(iteratee2, 2)) : [];
          }
          function uniqWith(array, comparator) {
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return array && array.length ? baseUniq(array, undefined2, comparator) : [];
          }
          function unzip(array) {
            if (!(array && array.length)) {
              return [];
            }
            var length = 0;
            array = arrayFilter(array, function(group) {
              if (isArrayLikeObject(group)) {
                length = nativeMax(group.length, length);
                return true;
              }
            });
            return baseTimes(length, function(index) {
              return arrayMap(array, baseProperty(index));
            });
          }
          function unzipWith(array, iteratee2) {
            if (!(array && array.length)) {
              return [];
            }
            var result2 = unzip(array);
            if (iteratee2 == null) {
              return result2;
            }
            return arrayMap(result2, function(group) {
              return apply(iteratee2, undefined2, group);
            });
          }
          var without = baseRest(function(array, values2) {
            return isArrayLikeObject(array) ? baseDifference(array, values2) : [];
          });
          var xor = baseRest(function(arrays) {
            return baseXor(arrayFilter(arrays, isArrayLikeObject));
          });
          var xorBy = baseRest(function(arrays) {
            var iteratee2 = last(arrays);
            if (isArrayLikeObject(iteratee2)) {
              iteratee2 = undefined2;
            }
            return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee2, 2));
          });
          var xorWith = baseRest(function(arrays) {
            var comparator = last(arrays);
            comparator = typeof comparator == "function" ? comparator : undefined2;
            return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined2, comparator);
          });
          var zip = baseRest(unzip);
          function zipObject(props, values2) {
            return baseZipObject(props || [], values2 || [], assignValue);
          }
          function zipObjectDeep(props, values2) {
            return baseZipObject(props || [], values2 || [], baseSet);
          }
          var zipWith = baseRest(function(arrays) {
            var length = arrays.length, iteratee2 = length > 1 ? arrays[length - 1] : undefined2;
            iteratee2 = typeof iteratee2 == "function" ? (arrays.pop(), iteratee2) : undefined2;
            return unzipWith(arrays, iteratee2);
          });
          function chain(value) {
            var result2 = lodash(value);
            result2.__chain__ = true;
            return result2;
          }
          function tap(value, interceptor) {
            interceptor(value);
            return value;
          }
          function thru(value, interceptor) {
            return interceptor(value);
          }
          var wrapperAt = flatRest(function(paths) {
            var length = paths.length, start = length ? paths[0] : 0, value = this.__wrapped__, interceptor = function(object) {
              return baseAt(object, paths);
            };
            if (length > 1 || this.__actions__.length || !(value instanceof LazyWrapper) || !isIndex(start)) {
              return this.thru(interceptor);
            }
            value = value.slice(start, +start + (length ? 1 : 0));
            value.__actions__.push({
              "func": thru,
              "args": [interceptor],
              "thisArg": undefined2
            });
            return new LodashWrapper(value, this.__chain__).thru(function(array) {
              if (length && !array.length) {
                array.push(undefined2);
              }
              return array;
            });
          });
          function wrapperChain() {
            return chain(this);
          }
          function wrapperCommit() {
            return new LodashWrapper(this.value(), this.__chain__);
          }
          function wrapperNext() {
            if (this.__values__ === undefined2) {
              this.__values__ = toArray(this.value());
            }
            var done = this.__index__ >= this.__values__.length, value = done ? undefined2 : this.__values__[this.__index__++];
            return { "done": done, "value": value };
          }
          function wrapperToIterator() {
            return this;
          }
          function wrapperPlant(value) {
            var result2, parent2 = this;
            while (parent2 instanceof baseLodash) {
              var clone2 = wrapperClone(parent2);
              clone2.__index__ = 0;
              clone2.__values__ = undefined2;
              if (result2) {
                previous.__wrapped__ = clone2;
              } else {
                result2 = clone2;
              }
              var previous = clone2;
              parent2 = parent2.__wrapped__;
            }
            previous.__wrapped__ = value;
            return result2;
          }
          function wrapperReverse() {
            var value = this.__wrapped__;
            if (value instanceof LazyWrapper) {
              var wrapped = value;
              if (this.__actions__.length) {
                wrapped = new LazyWrapper(this);
              }
              wrapped = wrapped.reverse();
              wrapped.__actions__.push({
                "func": thru,
                "args": [reverse],
                "thisArg": undefined2
              });
              return new LodashWrapper(wrapped, this.__chain__);
            }
            return this.thru(reverse);
          }
          function wrapperValue() {
            return baseWrapperValue(this.__wrapped__, this.__actions__);
          }
          var countBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              ++result2[key];
            } else {
              baseAssignValue(result2, key, 1);
            }
          });
          function every(collection, predicate, guard) {
            var func = isArray(collection) ? arrayEvery : baseEvery;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          function filter(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, getIteratee(predicate, 3));
          }
          var find = createFind(findIndex);
          var findLast = createFind(findLastIndex);
          function flatMap(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), 1);
          }
          function flatMapDeep(collection, iteratee2) {
            return baseFlatten(map(collection, iteratee2), INFINITY);
          }
          function flatMapDepth(collection, iteratee2, depth) {
            depth = depth === undefined2 ? 1 : toInteger(depth);
            return baseFlatten(map(collection, iteratee2), depth);
          }
          function forEach(collection, iteratee2) {
            var func = isArray(collection) ? arrayEach : baseEach;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function forEachRight(collection, iteratee2) {
            var func = isArray(collection) ? arrayEachRight : baseEachRight;
            return func(collection, getIteratee(iteratee2, 3));
          }
          var groupBy = createAggregator(function(result2, value, key) {
            if (hasOwnProperty.call(result2, key)) {
              result2[key].push(value);
            } else {
              baseAssignValue(result2, key, [value]);
            }
          });
          function includes(collection, value, fromIndex, guard) {
            collection = isArrayLike(collection) ? collection : values(collection);
            fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
            var length = collection.length;
            if (fromIndex < 0) {
              fromIndex = nativeMax(length + fromIndex, 0);
            }
            return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
          }
          var invokeMap = baseRest(function(collection, path3, args) {
            var index = -1, isFunc = typeof path3 == "function", result2 = isArrayLike(collection) ? Array2(collection.length) : [];
            baseEach(collection, function(value) {
              result2[++index] = isFunc ? apply(path3, value, args) : baseInvoke(value, path3, args);
            });
            return result2;
          });
          var keyBy = createAggregator(function(result2, value, key) {
            baseAssignValue(result2, key, value);
          });
          function map(collection, iteratee2) {
            var func = isArray(collection) ? arrayMap : baseMap;
            return func(collection, getIteratee(iteratee2, 3));
          }
          function orderBy(collection, iteratees, orders, guard) {
            if (collection == null) {
              return [];
            }
            if (!isArray(iteratees)) {
              iteratees = iteratees == null ? [] : [iteratees];
            }
            orders = guard ? undefined2 : orders;
            if (!isArray(orders)) {
              orders = orders == null ? [] : [orders];
            }
            return baseOrderBy(collection, iteratees, orders);
          }
          var partition = createAggregator(function(result2, value, key) {
            result2[key ? 0 : 1].push(value);
          }, function() {
            return [[], []];
          });
          function reduce(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduce : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEach);
          }
          function reduceRight(collection, iteratee2, accumulator) {
            var func = isArray(collection) ? arrayReduceRight : baseReduce, initAccum = arguments.length < 3;
            return func(collection, getIteratee(iteratee2, 4), accumulator, initAccum, baseEachRight);
          }
          function reject(collection, predicate) {
            var func = isArray(collection) ? arrayFilter : baseFilter;
            return func(collection, negate(getIteratee(predicate, 3)));
          }
          function sample(collection) {
            var func = isArray(collection) ? arraySample : baseSample;
            return func(collection);
          }
          function sampleSize(collection, n, guard) {
            if (guard ? isIterateeCall(collection, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            var func = isArray(collection) ? arraySampleSize : baseSampleSize;
            return func(collection, n);
          }
          function shuffle(collection) {
            var func = isArray(collection) ? arrayShuffle : baseShuffle;
            return func(collection);
          }
          function size(collection) {
            if (collection == null) {
              return 0;
            }
            if (isArrayLike(collection)) {
              return isString(collection) ? stringSize(collection) : collection.length;
            }
            var tag = getTag(collection);
            if (tag == mapTag || tag == setTag) {
              return collection.size;
            }
            return baseKeys(collection).length;
          }
          function some(collection, predicate, guard) {
            var func = isArray(collection) ? arraySome : baseSome;
            if (guard && isIterateeCall(collection, predicate, guard)) {
              predicate = undefined2;
            }
            return func(collection, getIteratee(predicate, 3));
          }
          var sortBy = baseRest(function(collection, iteratees) {
            if (collection == null) {
              return [];
            }
            var length = iteratees.length;
            if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
              iteratees = [];
            } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
              iteratees = [iteratees[0]];
            }
            return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
          });
          var now = ctxNow || function() {
            return root.Date.now();
          };
          function after(n, func) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n < 1) {
                return func.apply(this, arguments);
              }
            };
          }
          function ary(func, n, guard) {
            n = guard ? undefined2 : n;
            n = func && n == null ? func.length : n;
            return createWrap(func, WRAP_ARY_FLAG, undefined2, undefined2, undefined2, undefined2, n);
          }
          function before(n, func) {
            var result2;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            n = toInteger(n);
            return function() {
              if (--n > 0) {
                result2 = func.apply(this, arguments);
              }
              if (n <= 1) {
                func = undefined2;
              }
              return result2;
            };
          }
          var bind = baseRest(function(func, thisArg, partials) {
            var bitmask = WRAP_BIND_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bind));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(func, bitmask, thisArg, partials, holders);
          });
          var bindKey = baseRest(function(object, key, partials) {
            var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
            if (partials.length) {
              var holders = replaceHolders(partials, getHolder(bindKey));
              bitmask |= WRAP_PARTIAL_FLAG;
            }
            return createWrap(key, bitmask, object, partials, holders);
          });
          function curry(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(func, WRAP_CURRY_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            result2.placeholder = curry.placeholder;
            return result2;
          }
          function curryRight(func, arity, guard) {
            arity = guard ? undefined2 : arity;
            var result2 = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined2, undefined2, undefined2, undefined2, undefined2, arity);
            result2.placeholder = curryRight.placeholder;
            return result2;
          }
          function debounce(func, wait, options) {
            var lastArgs, lastThis, maxWait, result2, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            wait = toNumber(wait) || 0;
            if (isObject(options)) {
              leading = !!options.leading;
              maxing = "maxWait" in options;
              maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            function invokeFunc(time) {
              var args = lastArgs, thisArg = lastThis;
              lastArgs = lastThis = undefined2;
              lastInvokeTime = time;
              result2 = func.apply(thisArg, args);
              return result2;
            }
            function leadingEdge(time) {
              lastInvokeTime = time;
              timerId = setTimeout2(timerExpired, wait);
              return leading ? invokeFunc(time) : result2;
            }
            function remainingWait(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
              return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
            }
            function shouldInvoke(time) {
              var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
              return lastCallTime === undefined2 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
            }
            function timerExpired() {
              var time = now();
              if (shouldInvoke(time)) {
                return trailingEdge(time);
              }
              timerId = setTimeout2(timerExpired, remainingWait(time));
            }
            function trailingEdge(time) {
              timerId = undefined2;
              if (trailing && lastArgs) {
                return invokeFunc(time);
              }
              lastArgs = lastThis = undefined2;
              return result2;
            }
            function cancel() {
              if (timerId !== undefined2) {
                clearTimeout2(timerId);
              }
              lastInvokeTime = 0;
              lastArgs = lastCallTime = lastThis = timerId = undefined2;
            }
            function flush() {
              return timerId === undefined2 ? result2 : trailingEdge(now());
            }
            function debounced() {
              var time = now(), isInvoking = shouldInvoke(time);
              lastArgs = arguments;
              lastThis = this;
              lastCallTime = time;
              if (isInvoking) {
                if (timerId === undefined2) {
                  return leadingEdge(lastCallTime);
                }
                if (maxing) {
                  clearTimeout2(timerId);
                  timerId = setTimeout2(timerExpired, wait);
                  return invokeFunc(lastCallTime);
                }
              }
              if (timerId === undefined2) {
                timerId = setTimeout2(timerExpired, wait);
              }
              return result2;
            }
            debounced.cancel = cancel;
            debounced.flush = flush;
            return debounced;
          }
          var defer = baseRest(function(func, args) {
            return baseDelay(func, 1, args);
          });
          var delay = baseRest(function(func, wait, args) {
            return baseDelay(func, toNumber(wait) || 0, args);
          });
          function flip(func) {
            return createWrap(func, WRAP_FLIP_FLAG);
          }
          function memoize(func, resolver) {
            if (typeof func != "function" || resolver != null && typeof resolver != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            var memoized = function() {
              var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
              if (cache.has(key)) {
                return cache.get(key);
              }
              var result2 = func.apply(this, args);
              memoized.cache = cache.set(key, result2) || cache;
              return result2;
            };
            memoized.cache = new (memoize.Cache || MapCache)();
            return memoized;
          }
          memoize.Cache = MapCache;
          function negate(predicate) {
            if (typeof predicate != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            return function() {
              var args = arguments;
              switch (args.length) {
                case 0:
                  return !predicate.call(this);
                case 1:
                  return !predicate.call(this, args[0]);
                case 2:
                  return !predicate.call(this, args[0], args[1]);
                case 3:
                  return !predicate.call(this, args[0], args[1], args[2]);
              }
              return !predicate.apply(this, args);
            };
          }
          function once(func) {
            return before(2, func);
          }
          var overArgs = castRest(function(func, transforms) {
            transforms = transforms.length == 1 && isArray(transforms[0]) ? arrayMap(transforms[0], baseUnary(getIteratee())) : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));
            var funcsLength = transforms.length;
            return baseRest(function(args) {
              var index = -1, length = nativeMin(args.length, funcsLength);
              while (++index < length) {
                args[index] = transforms[index].call(this, args[index]);
              }
              return apply(func, this, args);
            });
          });
          var partial = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partial));
            return createWrap(func, WRAP_PARTIAL_FLAG, undefined2, partials, holders);
          });
          var partialRight = baseRest(function(func, partials) {
            var holders = replaceHolders(partials, getHolder(partialRight));
            return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined2, partials, holders);
          });
          var rearg = flatRest(function(func, indexes) {
            return createWrap(func, WRAP_REARG_FLAG, undefined2, undefined2, undefined2, indexes);
          });
          function rest(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start === undefined2 ? start : toInteger(start);
            return baseRest(func, start);
          }
          function spread(func, start) {
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            start = start == null ? 0 : nativeMax(toInteger(start), 0);
            return baseRest(function(args) {
              var array = args[start], otherArgs = castSlice(args, 0, start);
              if (array) {
                arrayPush(otherArgs, array);
              }
              return apply(func, this, otherArgs);
            });
          }
          function throttle(func, wait, options) {
            var leading = true, trailing = true;
            if (typeof func != "function") {
              throw new TypeError2(FUNC_ERROR_TEXT);
            }
            if (isObject(options)) {
              leading = "leading" in options ? !!options.leading : leading;
              trailing = "trailing" in options ? !!options.trailing : trailing;
            }
            return debounce(func, wait, {
              "leading": leading,
              "maxWait": wait,
              "trailing": trailing
            });
          }
          function unary(func) {
            return ary(func, 1);
          }
          function wrap(value, wrapper) {
            return partial(castFunction(wrapper), value);
          }
          function castArray() {
            if (!arguments.length) {
              return [];
            }
            var value = arguments[0];
            return isArray(value) ? value : [value];
          }
          function clone(value) {
            return baseClone(value, CLONE_SYMBOLS_FLAG);
          }
          function cloneWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
          }
          function cloneDeep(value) {
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
          }
          function cloneDeepWith(value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
          }
          function conformsTo(object, source) {
            return source == null || baseConformsTo(object, source, keys(source));
          }
          function eq(value, other) {
            return value === other || value !== value && other !== other;
          }
          var gt = createRelationalOperation(baseGt);
          var gte = createRelationalOperation(function(value, other) {
            return value >= other;
          });
          var isArguments = baseIsArguments(function() {
            return arguments;
          }()) ? baseIsArguments : function(value) {
            return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
          };
          var isArray = Array2.isArray;
          var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;
          function isArrayLike(value) {
            return value != null && isLength(value.length) && !isFunction(value);
          }
          function isArrayLikeObject(value) {
            return isObjectLike(value) && isArrayLike(value);
          }
          function isBoolean(value) {
            return value === true || value === false || isObjectLike(value) && baseGetTag(value) == boolTag;
          }
          var isBuffer = nativeIsBuffer || stubFalse;
          var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;
          function isElement(value) {
            return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
          }
          function isEmpty(value) {
            if (value == null) {
              return true;
            }
            if (isArrayLike(value) && (isArray(value) || typeof value == "string" || typeof value.splice == "function" || isBuffer(value) || isTypedArray(value) || isArguments(value))) {
              return !value.length;
            }
            var tag = getTag(value);
            if (tag == mapTag || tag == setTag) {
              return !value.size;
            }
            if (isPrototype(value)) {
              return !baseKeys(value).length;
            }
            for (var key in value) {
              if (hasOwnProperty.call(value, key)) {
                return false;
              }
            }
            return true;
          }
          function isEqual(value, other) {
            return baseIsEqual(value, other);
          }
          function isEqualWith(value, other, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            var result2 = customizer ? customizer(value, other) : undefined2;
            return result2 === undefined2 ? baseIsEqual(value, other, undefined2, customizer) : !!result2;
          }
          function isError(value) {
            if (!isObjectLike(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == errorTag || tag == domExcTag || typeof value.message == "string" && typeof value.name == "string" && !isPlainObject(value);
          }
          function isFinite2(value) {
            return typeof value == "number" && nativeIsFinite(value);
          }
          function isFunction(value) {
            if (!isObject(value)) {
              return false;
            }
            var tag = baseGetTag(value);
            return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
          }
          function isInteger(value) {
            return typeof value == "number" && value == toInteger(value);
          }
          function isLength(value) {
            return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
          }
          function isObject(value) {
            var type = typeof value;
            return value != null && (type == "object" || type == "function");
          }
          function isObjectLike(value) {
            return value != null && typeof value == "object";
          }
          var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
          function isMatch(object, source) {
            return object === source || baseIsMatch(object, source, getMatchData(source));
          }
          function isMatchWith(object, source, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return baseIsMatch(object, source, getMatchData(source), customizer);
          }
          function isNaN2(value) {
            return isNumber(value) && value != +value;
          }
          function isNative(value) {
            if (isMaskable(value)) {
              throw new Error2(CORE_ERROR_TEXT);
            }
            return baseIsNative(value);
          }
          function isNull(value) {
            return value === null;
          }
          function isNil(value) {
            return value == null;
          }
          function isNumber(value) {
            return typeof value == "number" || isObjectLike(value) && baseGetTag(value) == numberTag;
          }
          function isPlainObject(value) {
            if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
              return false;
            }
            var proto = getPrototype(value);
            if (proto === null) {
              return true;
            }
            var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
            return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
          }
          var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;
          function isSafeInteger(value) {
            return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
          }
          var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
          function isString(value) {
            return typeof value == "string" || !isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag;
          }
          function isSymbol(value) {
            return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
          }
          var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
          function isUndefined(value) {
            return value === undefined2;
          }
          function isWeakMap(value) {
            return isObjectLike(value) && getTag(value) == weakMapTag;
          }
          function isWeakSet(value) {
            return isObjectLike(value) && baseGetTag(value) == weakSetTag;
          }
          var lt = createRelationalOperation(baseLt);
          var lte = createRelationalOperation(function(value, other) {
            return value <= other;
          });
          function toArray(value) {
            if (!value) {
              return [];
            }
            if (isArrayLike(value)) {
              return isString(value) ? stringToArray(value) : copyArray(value);
            }
            if (symIterator && value[symIterator]) {
              return iteratorToArray(value[symIterator]());
            }
            var tag = getTag(value), func = tag == mapTag ? mapToArray : tag == setTag ? setToArray : values;
            return func(value);
          }
          function toFinite(value) {
            if (!value) {
              return value === 0 ? value : 0;
            }
            value = toNumber(value);
            if (value === INFINITY || value === -INFINITY) {
              var sign = value < 0 ? -1 : 1;
              return sign * MAX_INTEGER;
            }
            return value === value ? value : 0;
          }
          function toInteger(value) {
            var result2 = toFinite(value), remainder = result2 % 1;
            return result2 === result2 ? remainder ? result2 - remainder : result2 : 0;
          }
          function toLength(value) {
            return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
          }
          function toNumber(value) {
            if (typeof value == "number") {
              return value;
            }
            if (isSymbol(value)) {
              return NAN;
            }
            if (isObject(value)) {
              var other = typeof value.valueOf == "function" ? value.valueOf() : value;
              value = isObject(other) ? other + "" : other;
            }
            if (typeof value != "string") {
              return value === 0 ? value : +value;
            }
            value = baseTrim(value);
            var isBinary = reIsBinary.test(value);
            return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
          }
          function toPlainObject(value) {
            return copyObject(value, keysIn(value));
          }
          function toSafeInteger(value) {
            return value ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER) : value === 0 ? value : 0;
          }
          function toString(value) {
            return value == null ? "" : baseToString(value);
          }
          var assign = createAssigner(function(object, source) {
            if (isPrototype(source) || isArrayLike(source)) {
              copyObject(source, keys(source), object);
              return;
            }
            for (var key in source) {
              if (hasOwnProperty.call(source, key)) {
                assignValue(object, key, source[key]);
              }
            }
          });
          var assignIn = createAssigner(function(object, source) {
            copyObject(source, keysIn(source), object);
          });
          var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keysIn(source), object, customizer);
          });
          var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
            copyObject(source, keys(source), object, customizer);
          });
          var at = flatRest(baseAt);
          function create(prototype, properties) {
            var result2 = baseCreate(prototype);
            return properties == null ? result2 : baseAssign(result2, properties);
          }
          var defaults = baseRest(function(object, sources) {
            object = Object2(object);
            var index = -1;
            var length = sources.length;
            var guard = length > 2 ? sources[2] : undefined2;
            if (guard && isIterateeCall(sources[0], sources[1], guard)) {
              length = 1;
            }
            while (++index < length) {
              var source = sources[index];
              var props = keysIn(source);
              var propsIndex = -1;
              var propsLength = props.length;
              while (++propsIndex < propsLength) {
                var key = props[propsIndex];
                var value = object[key];
                if (value === undefined2 || eq(value, objectProto[key]) && !hasOwnProperty.call(object, key)) {
                  object[key] = source[key];
                }
              }
            }
            return object;
          });
          var defaultsDeep = baseRest(function(args) {
            args.push(undefined2, customDefaultsMerge);
            return apply(mergeWith, undefined2, args);
          });
          function findKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
          }
          function findLastKey(object, predicate) {
            return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
          }
          function forIn(object, iteratee2) {
            return object == null ? object : baseFor(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forInRight(object, iteratee2) {
            return object == null ? object : baseForRight(object, getIteratee(iteratee2, 3), keysIn);
          }
          function forOwn(object, iteratee2) {
            return object && baseForOwn(object, getIteratee(iteratee2, 3));
          }
          function forOwnRight(object, iteratee2) {
            return object && baseForOwnRight(object, getIteratee(iteratee2, 3));
          }
          function functions(object) {
            return object == null ? [] : baseFunctions(object, keys(object));
          }
          function functionsIn(object) {
            return object == null ? [] : baseFunctions(object, keysIn(object));
          }
          function get(object, path3, defaultValue) {
            var result2 = object == null ? undefined2 : baseGet(object, path3);
            return result2 === undefined2 ? defaultValue : result2;
          }
          function has(object, path3) {
            return object != null && hasPath(object, path3, baseHas);
          }
          function hasIn(object, path3) {
            return object != null && hasPath(object, path3, baseHasIn);
          }
          var invert = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            result2[value] = key;
          }, constant(identity));
          var invertBy = createInverter(function(result2, value, key) {
            if (value != null && typeof value.toString != "function") {
              value = nativeObjectToString.call(value);
            }
            if (hasOwnProperty.call(result2, value)) {
              result2[value].push(key);
            } else {
              result2[value] = [key];
            }
          }, getIteratee);
          var invoke = baseRest(baseInvoke);
          function keys(object) {
            return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
          }
          function keysIn(object) {
            return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
          }
          function mapKeys(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, iteratee2(value, key, object2), value);
            });
            return result2;
          }
          function mapValues(object, iteratee2) {
            var result2 = {};
            iteratee2 = getIteratee(iteratee2, 3);
            baseForOwn(object, function(value, key, object2) {
              baseAssignValue(result2, key, iteratee2(value, key, object2));
            });
            return result2;
          }
          var merge = createAssigner(function(object, source, srcIndex) {
            baseMerge(object, source, srcIndex);
          });
          var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
            baseMerge(object, source, srcIndex, customizer);
          });
          var omit = flatRest(function(object, paths) {
            var result2 = {};
            if (object == null) {
              return result2;
            }
            var isDeep = false;
            paths = arrayMap(paths, function(path3) {
              path3 = castPath(path3, object);
              isDeep || (isDeep = path3.length > 1);
              return path3;
            });
            copyObject(object, getAllKeysIn(object), result2);
            if (isDeep) {
              result2 = baseClone(result2, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
            }
            var length = paths.length;
            while (length--) {
              baseUnset(result2, paths[length]);
            }
            return result2;
          });
          function omitBy(object, predicate) {
            return pickBy(object, negate(getIteratee(predicate)));
          }
          var pick = flatRest(function(object, paths) {
            return object == null ? {} : basePick(object, paths);
          });
          function pickBy(object, predicate) {
            if (object == null) {
              return {};
            }
            var props = arrayMap(getAllKeysIn(object), function(prop) {
              return [prop];
            });
            predicate = getIteratee(predicate);
            return basePickBy(object, props, function(value, path3) {
              return predicate(value, path3[0]);
            });
          }
          function result(object, path3, defaultValue) {
            path3 = castPath(path3, object);
            var index = -1, length = path3.length;
            if (!length) {
              length = 1;
              object = undefined2;
            }
            while (++index < length) {
              var value = object == null ? undefined2 : object[toKey(path3[index])];
              if (value === undefined2) {
                index = length;
                value = defaultValue;
              }
              object = isFunction(value) ? value.call(object) : value;
            }
            return object;
          }
          function set(object, path3, value) {
            return object == null ? object : baseSet(object, path3, value);
          }
          function setWith(object, path3, value, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseSet(object, path3, value, customizer);
          }
          var toPairs = createToPairs(keys);
          var toPairsIn = createToPairs(keysIn);
          function transform(object, iteratee2, accumulator) {
            var isArr = isArray(object), isArrLike = isArr || isBuffer(object) || isTypedArray(object);
            iteratee2 = getIteratee(iteratee2, 4);
            if (accumulator == null) {
              var Ctor = object && object.constructor;
              if (isArrLike) {
                accumulator = isArr ? new Ctor() : [];
              } else if (isObject(object)) {
                accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
              } else {
                accumulator = {};
              }
            }
            (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object2) {
              return iteratee2(accumulator, value, index, object2);
            });
            return accumulator;
          }
          function unset(object, path3) {
            return object == null ? true : baseUnset(object, path3);
          }
          function update(object, path3, updater) {
            return object == null ? object : baseUpdate(object, path3, castFunction(updater));
          }
          function updateWith(object, path3, updater, customizer) {
            customizer = typeof customizer == "function" ? customizer : undefined2;
            return object == null ? object : baseUpdate(object, path3, castFunction(updater), customizer);
          }
          function values(object) {
            return object == null ? [] : baseValues(object, keys(object));
          }
          function valuesIn(object) {
            return object == null ? [] : baseValues(object, keysIn(object));
          }
          function clamp(number, lower, upper) {
            if (upper === undefined2) {
              upper = lower;
              lower = undefined2;
            }
            if (upper !== undefined2) {
              upper = toNumber(upper);
              upper = upper === upper ? upper : 0;
            }
            if (lower !== undefined2) {
              lower = toNumber(lower);
              lower = lower === lower ? lower : 0;
            }
            return baseClamp(toNumber(number), lower, upper);
          }
          function inRange(number, start, end) {
            start = toFinite(start);
            if (end === undefined2) {
              end = start;
              start = 0;
            } else {
              end = toFinite(end);
            }
            number = toNumber(number);
            return baseInRange(number, start, end);
          }
          function random(lower, upper, floating) {
            if (floating && typeof floating != "boolean" && isIterateeCall(lower, upper, floating)) {
              upper = floating = undefined2;
            }
            if (floating === undefined2) {
              if (typeof upper == "boolean") {
                floating = upper;
                upper = undefined2;
              } else if (typeof lower == "boolean") {
                floating = lower;
                lower = undefined2;
              }
            }
            if (lower === undefined2 && upper === undefined2) {
              lower = 0;
              upper = 1;
            } else {
              lower = toFinite(lower);
              if (upper === undefined2) {
                upper = lower;
                lower = 0;
              } else {
                upper = toFinite(upper);
              }
            }
            if (lower > upper) {
              var temp = lower;
              lower = upper;
              upper = temp;
            }
            if (floating || lower % 1 || upper % 1) {
              var rand = nativeRandom();
              return nativeMin(lower + rand * (upper - lower + freeParseFloat("1e-" + ((rand + "").length - 1))), upper);
            }
            return baseRandom(lower, upper);
          }
          var camelCase = createCompounder(function(result2, word, index) {
            word = word.toLowerCase();
            return result2 + (index ? capitalize(word) : word);
          });
          function capitalize(string) {
            return upperFirst(toString(string).toLowerCase());
          }
          function deburr(string) {
            string = toString(string);
            return string && string.replace(reLatin, deburrLetter).replace(reComboMark, "");
          }
          function endsWith(string, target, position) {
            string = toString(string);
            target = baseToString(target);
            var length = string.length;
            position = position === undefined2 ? length : baseClamp(toInteger(position), 0, length);
            var end = position;
            position -= target.length;
            return position >= 0 && string.slice(position, end) == target;
          }
          function escape(string) {
            string = toString(string);
            return string && reHasUnescapedHtml.test(string) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
          }
          function escapeRegExp(string) {
            string = toString(string);
            return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, "\\$&") : string;
          }
          var kebabCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "-" : "") + word.toLowerCase();
          });
          var lowerCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toLowerCase();
          });
          var lowerFirst = createCaseFirst("toLowerCase");
          function pad(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            if (!length || strLength >= length) {
              return string;
            }
            var mid = (length - strLength) / 2;
            return createPadding(nativeFloor(mid), chars) + string + createPadding(nativeCeil(mid), chars);
          }
          function padEnd(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? string + createPadding(length - strLength, chars) : string;
          }
          function padStart(string, length, chars) {
            string = toString(string);
            length = toInteger(length);
            var strLength = length ? stringSize(string) : 0;
            return length && strLength < length ? createPadding(length - strLength, chars) + string : string;
          }
          function parseInt2(string, radix, guard) {
            if (guard || radix == null) {
              radix = 0;
            } else if (radix) {
              radix = +radix;
            }
            return nativeParseInt(toString(string).replace(reTrimStart, ""), radix || 0);
          }
          function repeat(string, n, guard) {
            if (guard ? isIterateeCall(string, n, guard) : n === undefined2) {
              n = 1;
            } else {
              n = toInteger(n);
            }
            return baseRepeat(toString(string), n);
          }
          function replace() {
            var args = arguments, string = toString(args[0]);
            return args.length < 3 ? string : string.replace(args[1], args[2]);
          }
          var snakeCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? "_" : "") + word.toLowerCase();
          });
          function split(string, separator, limit) {
            if (limit && typeof limit != "number" && isIterateeCall(string, separator, limit)) {
              separator = limit = undefined2;
            }
            limit = limit === undefined2 ? MAX_ARRAY_LENGTH : limit >>> 0;
            if (!limit) {
              return [];
            }
            string = toString(string);
            if (string && (typeof separator == "string" || separator != null && !isRegExp(separator))) {
              separator = baseToString(separator);
              if (!separator && hasUnicode(string)) {
                return castSlice(stringToArray(string), 0, limit);
              }
            }
            return string.split(separator, limit);
          }
          var startCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + upperFirst(word);
          });
          function startsWith(string, target, position) {
            string = toString(string);
            position = position == null ? 0 : baseClamp(toInteger(position), 0, string.length);
            target = baseToString(target);
            return string.slice(position, position + target.length) == target;
          }
          function template(string, options, guard) {
            var settings = lodash.templateSettings;
            if (guard && isIterateeCall(string, options, guard)) {
              options = undefined2;
            }
            string = toString(string);
            options = assignInWith({}, options, settings, customDefaultsAssignIn);
            var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn), importsKeys = keys(imports), importsValues = baseValues(imports, importsKeys);
            var isEscaping, isEvaluating, index = 0, interpolate = options.interpolate || reNoMatch, source = "__p += '";
            var reDelimiters = RegExp2((options.escape || reNoMatch).source + "|" + interpolate.source + "|" + (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + "|" + (options.evaluate || reNoMatch).source + "|$", "g");
            var sourceURL = "//# sourceURL=" + (hasOwnProperty.call(options, "sourceURL") ? (options.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++templateCounter + "]") + "\n";
            string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
              interpolateValue || (interpolateValue = esTemplateValue);
              source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);
              if (escapeValue) {
                isEscaping = true;
                source += "' +\n__e(" + escapeValue + ") +\n'";
              }
              if (evaluateValue) {
                isEvaluating = true;
                source += "';\n" + evaluateValue + ";\n__p += '";
              }
              if (interpolateValue) {
                source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
              }
              index = offset + match.length;
              return match;
            });
            source += "';\n";
            var variable = hasOwnProperty.call(options, "variable") && options.variable;
            if (!variable) {
              source = "with (obj) {\n" + source + "\n}\n";
            } else if (reForbiddenIdentifierChars.test(variable)) {
              throw new Error2(INVALID_TEMPL_VAR_ERROR_TEXT);
            }
            source = (isEvaluating ? source.replace(reEmptyStringLeading, "") : source).replace(reEmptyStringMiddle, "$1").replace(reEmptyStringTrailing, "$1;");
            source = "function(" + (variable || "obj") + ") {\n" + (variable ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (isEscaping ? ", __e = _.escape" : "") + (isEvaluating ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + source + "return __p\n}";
            var result2 = attempt(function() {
              return Function2(importsKeys, sourceURL + "return " + source).apply(undefined2, importsValues);
            });
            result2.source = source;
            if (isError(result2)) {
              throw result2;
            }
            return result2;
          }
          function toLower(value) {
            return toString(value).toLowerCase();
          }
          function toUpper(value) {
            return toString(value).toUpperCase();
          }
          function trim(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return baseTrim(string);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), chrSymbols = stringToArray(chars), start = charsStartIndex(strSymbols, chrSymbols), end = charsEndIndex(strSymbols, chrSymbols) + 1;
            return castSlice(strSymbols, start, end).join("");
          }
          function trimEnd(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.slice(0, trimmedEndIndex(string) + 1);
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;
            return castSlice(strSymbols, 0, end).join("");
          }
          function trimStart(string, chars, guard) {
            string = toString(string);
            if (string && (guard || chars === undefined2)) {
              return string.replace(reTrimStart, "");
            }
            if (!string || !(chars = baseToString(chars))) {
              return string;
            }
            var strSymbols = stringToArray(string), start = charsStartIndex(strSymbols, stringToArray(chars));
            return castSlice(strSymbols, start).join("");
          }
          function truncate(string, options) {
            var length = DEFAULT_TRUNC_LENGTH, omission = DEFAULT_TRUNC_OMISSION;
            if (isObject(options)) {
              var separator = "separator" in options ? options.separator : separator;
              length = "length" in options ? toInteger(options.length) : length;
              omission = "omission" in options ? baseToString(options.omission) : omission;
            }
            string = toString(string);
            var strLength = string.length;
            if (hasUnicode(string)) {
              var strSymbols = stringToArray(string);
              strLength = strSymbols.length;
            }
            if (length >= strLength) {
              return string;
            }
            var end = length - stringSize(omission);
            if (end < 1) {
              return omission;
            }
            var result2 = strSymbols ? castSlice(strSymbols, 0, end).join("") : string.slice(0, end);
            if (separator === undefined2) {
              return result2 + omission;
            }
            if (strSymbols) {
              end += result2.length - end;
            }
            if (isRegExp(separator)) {
              if (string.slice(end).search(separator)) {
                var match, substring = result2;
                if (!separator.global) {
                  separator = RegExp2(separator.source, toString(reFlags.exec(separator)) + "g");
                }
                separator.lastIndex = 0;
                while (match = separator.exec(substring)) {
                  var newEnd = match.index;
                }
                result2 = result2.slice(0, newEnd === undefined2 ? end : newEnd);
              }
            } else if (string.indexOf(baseToString(separator), end) != end) {
              var index = result2.lastIndexOf(separator);
              if (index > -1) {
                result2 = result2.slice(0, index);
              }
            }
            return result2 + omission;
          }
          function unescape(string) {
            string = toString(string);
            return string && reHasEscapedHtml.test(string) ? string.replace(reEscapedHtml, unescapeHtmlChar) : string;
          }
          var upperCase = createCompounder(function(result2, word, index) {
            return result2 + (index ? " " : "") + word.toUpperCase();
          });
          var upperFirst = createCaseFirst("toUpperCase");
          function words(string, pattern, guard) {
            string = toString(string);
            pattern = guard ? undefined2 : pattern;
            if (pattern === undefined2) {
              return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
            }
            return string.match(pattern) || [];
          }
          var attempt = baseRest(function(func, args) {
            try {
              return apply(func, undefined2, args);
            } catch (e) {
              return isError(e) ? e : new Error2(e);
            }
          });
          var bindAll = flatRest(function(object, methodNames) {
            arrayEach(methodNames, function(key) {
              key = toKey(key);
              baseAssignValue(object, key, bind(object[key], object));
            });
            return object;
          });
          function cond(pairs) {
            var length = pairs == null ? 0 : pairs.length, toIteratee = getIteratee();
            pairs = !length ? [] : arrayMap(pairs, function(pair) {
              if (typeof pair[1] != "function") {
                throw new TypeError2(FUNC_ERROR_TEXT);
              }
              return [toIteratee(pair[0]), pair[1]];
            });
            return baseRest(function(args) {
              var index = -1;
              while (++index < length) {
                var pair = pairs[index];
                if (apply(pair[0], this, args)) {
                  return apply(pair[1], this, args);
                }
              }
            });
          }
          function conforms(source) {
            return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
          }
          function constant(value) {
            return function() {
              return value;
            };
          }
          function defaultTo(value, defaultValue) {
            return value == null || value !== value ? defaultValue : value;
          }
          var flow = createFlow();
          var flowRight = createFlow(true);
          function identity(value) {
            return value;
          }
          function iteratee(func) {
            return baseIteratee(typeof func == "function" ? func : baseClone(func, CLONE_DEEP_FLAG));
          }
          function matches(source) {
            return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
          }
          function matchesProperty(path3, srcValue) {
            return baseMatchesProperty(path3, baseClone(srcValue, CLONE_DEEP_FLAG));
          }
          var method = baseRest(function(path3, args) {
            return function(object) {
              return baseInvoke(object, path3, args);
            };
          });
          var methodOf = baseRest(function(object, args) {
            return function(path3) {
              return baseInvoke(object, path3, args);
            };
          });
          function mixin(object, source, options) {
            var props = keys(source), methodNames = baseFunctions(source, props);
            if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
              options = source;
              source = object;
              object = this;
              methodNames = baseFunctions(source, keys(source));
            }
            var chain2 = !(isObject(options) && "chain" in options) || !!options.chain, isFunc = isFunction(object);
            arrayEach(methodNames, function(methodName) {
              var func = source[methodName];
              object[methodName] = func;
              if (isFunc) {
                object.prototype[methodName] = function() {
                  var chainAll = this.__chain__;
                  if (chain2 || chainAll) {
                    var result2 = object(this.__wrapped__), actions = result2.__actions__ = copyArray(this.__actions__);
                    actions.push({ "func": func, "args": arguments, "thisArg": object });
                    result2.__chain__ = chainAll;
                    return result2;
                  }
                  return func.apply(object, arrayPush([this.value()], arguments));
                };
              }
            });
            return object;
          }
          function noConflict() {
            if (root._ === this) {
              root._ = oldDash;
            }
            return this;
          }
          function noop() {
          }
          function nthArg(n) {
            n = toInteger(n);
            return baseRest(function(args) {
              return baseNth(args, n);
            });
          }
          var over = createOver(arrayMap);
          var overEvery = createOver(arrayEvery);
          var overSome = createOver(arraySome);
          function property(path3) {
            return isKey(path3) ? baseProperty(toKey(path3)) : basePropertyDeep(path3);
          }
          function propertyOf(object) {
            return function(path3) {
              return object == null ? undefined2 : baseGet(object, path3);
            };
          }
          var range = createRange();
          var rangeRight = createRange(true);
          function stubArray() {
            return [];
          }
          function stubFalse() {
            return false;
          }
          function stubObject() {
            return {};
          }
          function stubString() {
            return "";
          }
          function stubTrue() {
            return true;
          }
          function times(n, iteratee2) {
            n = toInteger(n);
            if (n < 1 || n > MAX_SAFE_INTEGER) {
              return [];
            }
            var index = MAX_ARRAY_LENGTH, length = nativeMin(n, MAX_ARRAY_LENGTH);
            iteratee2 = getIteratee(iteratee2);
            n -= MAX_ARRAY_LENGTH;
            var result2 = baseTimes(length, iteratee2);
            while (++index < n) {
              iteratee2(index);
            }
            return result2;
          }
          function toPath(value) {
            if (isArray(value)) {
              return arrayMap(value, toKey);
            }
            return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
          }
          function uniqueId(prefix) {
            var id = ++idCounter;
            return toString(prefix) + id;
          }
          var add = createMathOperation(function(augend, addend) {
            return augend + addend;
          }, 0);
          var ceil = createRound("ceil");
          var divide = createMathOperation(function(dividend, divisor) {
            return dividend / divisor;
          }, 1);
          var floor = createRound("floor");
          function max(array) {
            return array && array.length ? baseExtremum(array, identity, baseGt) : undefined2;
          }
          function maxBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseGt) : undefined2;
          }
          function mean(array) {
            return baseMean(array, identity);
          }
          function meanBy(array, iteratee2) {
            return baseMean(array, getIteratee(iteratee2, 2));
          }
          function min(array) {
            return array && array.length ? baseExtremum(array, identity, baseLt) : undefined2;
          }
          function minBy(array, iteratee2) {
            return array && array.length ? baseExtremum(array, getIteratee(iteratee2, 2), baseLt) : undefined2;
          }
          var multiply = createMathOperation(function(multiplier, multiplicand) {
            return multiplier * multiplicand;
          }, 1);
          var round = createRound("round");
          var subtract = createMathOperation(function(minuend, subtrahend) {
            return minuend - subtrahend;
          }, 0);
          function sum(array) {
            return array && array.length ? baseSum(array, identity) : 0;
          }
          function sumBy(array, iteratee2) {
            return array && array.length ? baseSum(array, getIteratee(iteratee2, 2)) : 0;
          }
          lodash.after = after;
          lodash.ary = ary;
          lodash.assign = assign;
          lodash.assignIn = assignIn;
          lodash.assignInWith = assignInWith;
          lodash.assignWith = assignWith;
          lodash.at = at;
          lodash.before = before;
          lodash.bind = bind;
          lodash.bindAll = bindAll;
          lodash.bindKey = bindKey;
          lodash.castArray = castArray;
          lodash.chain = chain;
          lodash.chunk = chunk;
          lodash.compact = compact;
          lodash.concat = concat;
          lodash.cond = cond;
          lodash.conforms = conforms;
          lodash.constant = constant;
          lodash.countBy = countBy;
          lodash.create = create;
          lodash.curry = curry;
          lodash.curryRight = curryRight;
          lodash.debounce = debounce;
          lodash.defaults = defaults;
          lodash.defaultsDeep = defaultsDeep;
          lodash.defer = defer;
          lodash.delay = delay;
          lodash.difference = difference;
          lodash.differenceBy = differenceBy2;
          lodash.differenceWith = differenceWith;
          lodash.drop = drop;
          lodash.dropRight = dropRight;
          lodash.dropRightWhile = dropRightWhile;
          lodash.dropWhile = dropWhile;
          lodash.fill = fill;
          lodash.filter = filter;
          lodash.flatMap = flatMap;
          lodash.flatMapDeep = flatMapDeep;
          lodash.flatMapDepth = flatMapDepth;
          lodash.flatten = flatten;
          lodash.flattenDeep = flattenDeep;
          lodash.flattenDepth = flattenDepth;
          lodash.flip = flip;
          lodash.flow = flow;
          lodash.flowRight = flowRight;
          lodash.fromPairs = fromPairs;
          lodash.functions = functions;
          lodash.functionsIn = functionsIn;
          lodash.groupBy = groupBy;
          lodash.initial = initial;
          lodash.intersection = intersection;
          lodash.intersectionBy = intersectionBy;
          lodash.intersectionWith = intersectionWith;
          lodash.invert = invert;
          lodash.invertBy = invertBy;
          lodash.invokeMap = invokeMap;
          lodash.iteratee = iteratee;
          lodash.keyBy = keyBy;
          lodash.keys = keys;
          lodash.keysIn = keysIn;
          lodash.map = map;
          lodash.mapKeys = mapKeys;
          lodash.mapValues = mapValues;
          lodash.matches = matches;
          lodash.matchesProperty = matchesProperty;
          lodash.memoize = memoize;
          lodash.merge = merge;
          lodash.mergeWith = mergeWith;
          lodash.method = method;
          lodash.methodOf = methodOf;
          lodash.mixin = mixin;
          lodash.negate = negate;
          lodash.nthArg = nthArg;
          lodash.omit = omit;
          lodash.omitBy = omitBy;
          lodash.once = once;
          lodash.orderBy = orderBy;
          lodash.over = over;
          lodash.overArgs = overArgs;
          lodash.overEvery = overEvery;
          lodash.overSome = overSome;
          lodash.partial = partial;
          lodash.partialRight = partialRight;
          lodash.partition = partition;
          lodash.pick = pick;
          lodash.pickBy = pickBy;
          lodash.property = property;
          lodash.propertyOf = propertyOf;
          lodash.pull = pull;
          lodash.pullAll = pullAll;
          lodash.pullAllBy = pullAllBy;
          lodash.pullAllWith = pullAllWith;
          lodash.pullAt = pullAt;
          lodash.range = range;
          lodash.rangeRight = rangeRight;
          lodash.rearg = rearg;
          lodash.reject = reject;
          lodash.remove = remove;
          lodash.rest = rest;
          lodash.reverse = reverse;
          lodash.sampleSize = sampleSize;
          lodash.set = set;
          lodash.setWith = setWith;
          lodash.shuffle = shuffle;
          lodash.slice = slice;
          lodash.sortBy = sortBy;
          lodash.sortedUniq = sortedUniq;
          lodash.sortedUniqBy = sortedUniqBy;
          lodash.split = split;
          lodash.spread = spread;
          lodash.tail = tail;
          lodash.take = take;
          lodash.takeRight = takeRight;
          lodash.takeRightWhile = takeRightWhile;
          lodash.takeWhile = takeWhile;
          lodash.tap = tap;
          lodash.throttle = throttle;
          lodash.thru = thru;
          lodash.toArray = toArray;
          lodash.toPairs = toPairs;
          lodash.toPairsIn = toPairsIn;
          lodash.toPath = toPath;
          lodash.toPlainObject = toPlainObject;
          lodash.transform = transform;
          lodash.unary = unary;
          lodash.union = union;
          lodash.unionBy = unionBy;
          lodash.unionWith = unionWith;
          lodash.uniq = uniq;
          lodash.uniqBy = uniqBy2;
          lodash.uniqWith = uniqWith;
          lodash.unset = unset;
          lodash.unzip = unzip;
          lodash.unzipWith = unzipWith;
          lodash.update = update;
          lodash.updateWith = updateWith;
          lodash.values = values;
          lodash.valuesIn = valuesIn;
          lodash.without = without;
          lodash.words = words;
          lodash.wrap = wrap;
          lodash.xor = xor;
          lodash.xorBy = xorBy;
          lodash.xorWith = xorWith;
          lodash.zip = zip;
          lodash.zipObject = zipObject;
          lodash.zipObjectDeep = zipObjectDeep;
          lodash.zipWith = zipWith;
          lodash.entries = toPairs;
          lodash.entriesIn = toPairsIn;
          lodash.extend = assignIn;
          lodash.extendWith = assignInWith;
          mixin(lodash, lodash);
          lodash.add = add;
          lodash.attempt = attempt;
          lodash.camelCase = camelCase;
          lodash.capitalize = capitalize;
          lodash.ceil = ceil;
          lodash.clamp = clamp;
          lodash.clone = clone;
          lodash.cloneDeep = cloneDeep;
          lodash.cloneDeepWith = cloneDeepWith;
          lodash.cloneWith = cloneWith;
          lodash.conformsTo = conformsTo;
          lodash.deburr = deburr;
          lodash.defaultTo = defaultTo;
          lodash.divide = divide;
          lodash.endsWith = endsWith;
          lodash.eq = eq;
          lodash.escape = escape;
          lodash.escapeRegExp = escapeRegExp;
          lodash.every = every;
          lodash.find = find;
          lodash.findIndex = findIndex;
          lodash.findKey = findKey;
          lodash.findLast = findLast;
          lodash.findLastIndex = findLastIndex;
          lodash.findLastKey = findLastKey;
          lodash.floor = floor;
          lodash.forEach = forEach;
          lodash.forEachRight = forEachRight;
          lodash.forIn = forIn;
          lodash.forInRight = forInRight;
          lodash.forOwn = forOwn;
          lodash.forOwnRight = forOwnRight;
          lodash.get = get;
          lodash.gt = gt;
          lodash.gte = gte;
          lodash.has = has;
          lodash.hasIn = hasIn;
          lodash.head = head;
          lodash.identity = identity;
          lodash.includes = includes;
          lodash.indexOf = indexOf;
          lodash.inRange = inRange;
          lodash.invoke = invoke;
          lodash.isArguments = isArguments;
          lodash.isArray = isArray;
          lodash.isArrayBuffer = isArrayBuffer;
          lodash.isArrayLike = isArrayLike;
          lodash.isArrayLikeObject = isArrayLikeObject;
          lodash.isBoolean = isBoolean;
          lodash.isBuffer = isBuffer;
          lodash.isDate = isDate;
          lodash.isElement = isElement;
          lodash.isEmpty = isEmpty;
          lodash.isEqual = isEqual;
          lodash.isEqualWith = isEqualWith;
          lodash.isError = isError;
          lodash.isFinite = isFinite2;
          lodash.isFunction = isFunction;
          lodash.isInteger = isInteger;
          lodash.isLength = isLength;
          lodash.isMap = isMap;
          lodash.isMatch = isMatch;
          lodash.isMatchWith = isMatchWith;
          lodash.isNaN = isNaN2;
          lodash.isNative = isNative;
          lodash.isNil = isNil;
          lodash.isNull = isNull;
          lodash.isNumber = isNumber;
          lodash.isObject = isObject;
          lodash.isObjectLike = isObjectLike;
          lodash.isPlainObject = isPlainObject;
          lodash.isRegExp = isRegExp;
          lodash.isSafeInteger = isSafeInteger;
          lodash.isSet = isSet;
          lodash.isString = isString;
          lodash.isSymbol = isSymbol;
          lodash.isTypedArray = isTypedArray;
          lodash.isUndefined = isUndefined;
          lodash.isWeakMap = isWeakMap;
          lodash.isWeakSet = isWeakSet;
          lodash.join = join;
          lodash.kebabCase = kebabCase;
          lodash.last = last;
          lodash.lastIndexOf = lastIndexOf;
          lodash.lowerCase = lowerCase;
          lodash.lowerFirst = lowerFirst;
          lodash.lt = lt;
          lodash.lte = lte;
          lodash.max = max;
          lodash.maxBy = maxBy;
          lodash.mean = mean;
          lodash.meanBy = meanBy;
          lodash.min = min;
          lodash.minBy = minBy;
          lodash.stubArray = stubArray;
          lodash.stubFalse = stubFalse;
          lodash.stubObject = stubObject;
          lodash.stubString = stubString;
          lodash.stubTrue = stubTrue;
          lodash.multiply = multiply;
          lodash.nth = nth;
          lodash.noConflict = noConflict;
          lodash.noop = noop;
          lodash.now = now;
          lodash.pad = pad;
          lodash.padEnd = padEnd;
          lodash.padStart = padStart;
          lodash.parseInt = parseInt2;
          lodash.random = random;
          lodash.reduce = reduce;
          lodash.reduceRight = reduceRight;
          lodash.repeat = repeat;
          lodash.replace = replace;
          lodash.result = result;
          lodash.round = round;
          lodash.runInContext = runInContext2;
          lodash.sample = sample;
          lodash.size = size;
          lodash.snakeCase = snakeCase;
          lodash.some = some;
          lodash.sortedIndex = sortedIndex;
          lodash.sortedIndexBy = sortedIndexBy;
          lodash.sortedIndexOf = sortedIndexOf;
          lodash.sortedLastIndex = sortedLastIndex;
          lodash.sortedLastIndexBy = sortedLastIndexBy;
          lodash.sortedLastIndexOf = sortedLastIndexOf;
          lodash.startCase = startCase;
          lodash.startsWith = startsWith;
          lodash.subtract = subtract;
          lodash.sum = sum;
          lodash.sumBy = sumBy;
          lodash.template = template;
          lodash.times = times;
          lodash.toFinite = toFinite;
          lodash.toInteger = toInteger;
          lodash.toLength = toLength;
          lodash.toLower = toLower;
          lodash.toNumber = toNumber;
          lodash.toSafeInteger = toSafeInteger;
          lodash.toString = toString;
          lodash.toUpper = toUpper;
          lodash.trim = trim;
          lodash.trimEnd = trimEnd;
          lodash.trimStart = trimStart;
          lodash.truncate = truncate;
          lodash.unescape = unescape;
          lodash.uniqueId = uniqueId;
          lodash.upperCase = upperCase;
          lodash.upperFirst = upperFirst;
          lodash.each = forEach;
          lodash.eachRight = forEachRight;
          lodash.first = head;
          mixin(lodash, function() {
            var source = {};
            baseForOwn(lodash, function(func, methodName) {
              if (!hasOwnProperty.call(lodash.prototype, methodName)) {
                source[methodName] = func;
              }
            });
            return source;
          }(), { "chain": false });
          lodash.VERSION = VERSION;
          arrayEach(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(methodName) {
            lodash[methodName].placeholder = lodash;
          });
          arrayEach(["drop", "take"], function(methodName, index) {
            LazyWrapper.prototype[methodName] = function(n) {
              n = n === undefined2 ? 1 : nativeMax(toInteger(n), 0);
              var result2 = this.__filtered__ && !index ? new LazyWrapper(this) : this.clone();
              if (result2.__filtered__) {
                result2.__takeCount__ = nativeMin(n, result2.__takeCount__);
              } else {
                result2.__views__.push({
                  "size": nativeMin(n, MAX_ARRAY_LENGTH),
                  "type": methodName + (result2.__dir__ < 0 ? "Right" : "")
                });
              }
              return result2;
            };
            LazyWrapper.prototype[methodName + "Right"] = function(n) {
              return this.reverse()[methodName](n).reverse();
            };
          });
          arrayEach(["filter", "map", "takeWhile"], function(methodName, index) {
            var type = index + 1, isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;
            LazyWrapper.prototype[methodName] = function(iteratee2) {
              var result2 = this.clone();
              result2.__iteratees__.push({
                "iteratee": getIteratee(iteratee2, 3),
                "type": type
              });
              result2.__filtered__ = result2.__filtered__ || isFilter;
              return result2;
            };
          });
          arrayEach(["head", "last"], function(methodName, index) {
            var takeName = "take" + (index ? "Right" : "");
            LazyWrapper.prototype[methodName] = function() {
              return this[takeName](1).value()[0];
            };
          });
          arrayEach(["initial", "tail"], function(methodName, index) {
            var dropName = "drop" + (index ? "" : "Right");
            LazyWrapper.prototype[methodName] = function() {
              return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
            };
          });
          LazyWrapper.prototype.compact = function() {
            return this.filter(identity);
          };
          LazyWrapper.prototype.find = function(predicate) {
            return this.filter(predicate).head();
          };
          LazyWrapper.prototype.findLast = function(predicate) {
            return this.reverse().find(predicate);
          };
          LazyWrapper.prototype.invokeMap = baseRest(function(path3, args) {
            if (typeof path3 == "function") {
              return new LazyWrapper(this);
            }
            return this.map(function(value) {
              return baseInvoke(value, path3, args);
            });
          });
          LazyWrapper.prototype.reject = function(predicate) {
            return this.filter(negate(getIteratee(predicate)));
          };
          LazyWrapper.prototype.slice = function(start, end) {
            start = toInteger(start);
            var result2 = this;
            if (result2.__filtered__ && (start > 0 || end < 0)) {
              return new LazyWrapper(result2);
            }
            if (start < 0) {
              result2 = result2.takeRight(-start);
            } else if (start) {
              result2 = result2.drop(start);
            }
            if (end !== undefined2) {
              end = toInteger(end);
              result2 = end < 0 ? result2.dropRight(-end) : result2.take(end - start);
            }
            return result2;
          };
          LazyWrapper.prototype.takeRightWhile = function(predicate) {
            return this.reverse().takeWhile(predicate).reverse();
          };
          LazyWrapper.prototype.toArray = function() {
            return this.take(MAX_ARRAY_LENGTH);
          };
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName), isTaker = /^(?:head|last)$/.test(methodName), lodashFunc = lodash[isTaker ? "take" + (methodName == "last" ? "Right" : "") : methodName], retUnwrapped = isTaker || /^find/.test(methodName);
            if (!lodashFunc) {
              return;
            }
            lodash.prototype[methodName] = function() {
              var value = this.__wrapped__, args = isTaker ? [1] : arguments, isLazy = value instanceof LazyWrapper, iteratee2 = args[0], useLazy = isLazy || isArray(value);
              var interceptor = function(value2) {
                var result3 = lodashFunc.apply(lodash, arrayPush([value2], args));
                return isTaker && chainAll ? result3[0] : result3;
              };
              if (useLazy && checkIteratee && typeof iteratee2 == "function" && iteratee2.length != 1) {
                isLazy = useLazy = false;
              }
              var chainAll = this.__chain__, isHybrid = !!this.__actions__.length, isUnwrapped = retUnwrapped && !chainAll, onlyLazy = isLazy && !isHybrid;
              if (!retUnwrapped && useLazy) {
                value = onlyLazy ? value : new LazyWrapper(this);
                var result2 = func.apply(value, args);
                result2.__actions__.push({ "func": thru, "args": [interceptor], "thisArg": undefined2 });
                return new LodashWrapper(result2, chainAll);
              }
              if (isUnwrapped && onlyLazy) {
                return func.apply(this, args);
              }
              result2 = this.thru(interceptor);
              return isUnwrapped ? isTaker ? result2.value()[0] : result2.value() : result2;
            };
          });
          arrayEach(["pop", "push", "shift", "sort", "splice", "unshift"], function(methodName) {
            var func = arrayProto[methodName], chainName = /^(?:push|sort|unshift)$/.test(methodName) ? "tap" : "thru", retUnwrapped = /^(?:pop|shift)$/.test(methodName);
            lodash.prototype[methodName] = function() {
              var args = arguments;
              if (retUnwrapped && !this.__chain__) {
                var value = this.value();
                return func.apply(isArray(value) ? value : [], args);
              }
              return this[chainName](function(value2) {
                return func.apply(isArray(value2) ? value2 : [], args);
              });
            };
          });
          baseForOwn(LazyWrapper.prototype, function(func, methodName) {
            var lodashFunc = lodash[methodName];
            if (lodashFunc) {
              var key = lodashFunc.name + "";
              if (!hasOwnProperty.call(realNames, key)) {
                realNames[key] = [];
              }
              realNames[key].push({ "name": methodName, "func": lodashFunc });
            }
          });
          realNames[createHybrid(undefined2, WRAP_BIND_KEY_FLAG).name] = [{
            "name": "wrapper",
            "func": undefined2
          }];
          LazyWrapper.prototype.clone = lazyClone;
          LazyWrapper.prototype.reverse = lazyReverse;
          LazyWrapper.prototype.value = lazyValue;
          lodash.prototype.at = wrapperAt;
          lodash.prototype.chain = wrapperChain;
          lodash.prototype.commit = wrapperCommit;
          lodash.prototype.next = wrapperNext;
          lodash.prototype.plant = wrapperPlant;
          lodash.prototype.reverse = wrapperReverse;
          lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
          lodash.prototype.first = lodash.prototype.head;
          if (symIterator) {
            lodash.prototype[symIterator] = wrapperToIterator;
          }
          return lodash;
        };
        var _ = runInContext();
        if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
          root._ = _;
          define(function() {
            return _;
          });
        } else if (freeModule) {
          (freeModule.exports = _)._ = _;
          freeExports._ = _;
        } else {
          root._ = _;
        }
      }).call(exports);
    }
  });

  // ../../node_modules/color-name/index.js
  var require_color_name = __commonJS({
    "../../node_modules/color-name/index.js"(exports, module) {
      "use strict";
      module.exports = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
      };
    }
  });

  // ../../node_modules/color-convert/conversions.js
  var require_conversions = __commonJS({
    "../../node_modules/color-convert/conversions.js"(exports, module) {
      var cssKeywords = require_color_name();
      var reverseKeywords = {};
      for (const key of Object.keys(cssKeywords)) {
        reverseKeywords[cssKeywords[key]] = key;
      }
      var convert = {
        rgb: { channels: 3, labels: "rgb" },
        hsl: { channels: 3, labels: "hsl" },
        hsv: { channels: 3, labels: "hsv" },
        hwb: { channels: 3, labels: "hwb" },
        cmyk: { channels: 4, labels: "cmyk" },
        xyz: { channels: 3, labels: "xyz" },
        lab: { channels: 3, labels: "lab" },
        lch: { channels: 3, labels: "lch" },
        hex: { channels: 1, labels: ["hex"] },
        keyword: { channels: 1, labels: ["keyword"] },
        ansi16: { channels: 1, labels: ["ansi16"] },
        ansi256: { channels: 1, labels: ["ansi256"] },
        hcg: { channels: 3, labels: ["h", "c", "g"] },
        apple: { channels: 3, labels: ["r16", "g16", "b16"] },
        gray: { channels: 1, labels: ["gray"] }
      };
      module.exports = convert;
      for (const model of Object.keys(convert)) {
        if (!("channels" in convert[model])) {
          throw new Error("missing channels property: " + model);
        }
        if (!("labels" in convert[model])) {
          throw new Error("missing channel labels property: " + model);
        }
        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error("channel and label counts mismatch: " + model);
        }
        const { channels, labels } = convert[model];
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], "channels", { value: channels });
        Object.defineProperty(convert[model], "labels", { value: labels });
      }
      convert.rgb.hsl = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const delta = max - min;
        let h;
        let s;
        if (max === min) {
          h = 0;
        } else if (r === max) {
          h = (g - b) / delta;
        } else if (g === max) {
          h = 2 + (b - r) / delta;
        } else if (b === max) {
          h = 4 + (r - g) / delta;
        }
        h = Math.min(h * 60, 360);
        if (h < 0) {
          h += 360;
        }
        const l = (min + max) / 2;
        if (max === min) {
          s = 0;
        } else if (l <= 0.5) {
          s = delta / (max + min);
        } else {
          s = delta / (2 - max - min);
        }
        return [h, s * 100, l * 100];
      };
      convert.rgb.hsv = function(rgb) {
        let rdif;
        let gdif;
        let bdif;
        let h;
        let s;
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const v = Math.max(r, g, b);
        const diff = v - Math.min(r, g, b);
        const diffc = function(c) {
          return (v - c) / 6 / diff + 1 / 2;
        };
        if (diff === 0) {
          h = 0;
          s = 0;
        } else {
          s = diff / v;
          rdif = diffc(r);
          gdif = diffc(g);
          bdif = diffc(b);
          if (r === v) {
            h = bdif - gdif;
          } else if (g === v) {
            h = 1 / 3 + rdif - bdif;
          } else if (b === v) {
            h = 2 / 3 + gdif - rdif;
          }
          if (h < 0) {
            h += 1;
          } else if (h > 1) {
            h -= 1;
          }
        }
        return [
          h * 360,
          s * 100,
          v * 100
        ];
      };
      convert.rgb.hwb = function(rgb) {
        const r = rgb[0];
        const g = rgb[1];
        let b = rgb[2];
        const h = convert.rgb.hsl(rgb)[0];
        const w = 1 / 255 * Math.min(r, Math.min(g, b));
        b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
        return [h, w * 100, b * 100];
      };
      convert.rgb.cmyk = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const k = Math.min(1 - r, 1 - g, 1 - b);
        const c = (1 - r - k) / (1 - k) || 0;
        const m = (1 - g - k) / (1 - k) || 0;
        const y = (1 - b - k) / (1 - k) || 0;
        return [c * 100, m * 100, y * 100, k * 100];
      };
      function comparativeDistance(x, y) {
        return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
      }
      convert.rgb.keyword = function(rgb) {
        const reversed = reverseKeywords[rgb];
        if (reversed) {
          return reversed;
        }
        let currentClosestDistance = Infinity;
        let currentClosestKeyword;
        for (const keyword of Object.keys(cssKeywords)) {
          const value = cssKeywords[keyword];
          const distance = comparativeDistance(rgb, value);
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }
        return currentClosestKeyword;
      };
      convert.keyword.rgb = function(keyword) {
        return cssKeywords[keyword];
      };
      convert.rgb.xyz = function(rgb) {
        let r = rgb[0] / 255;
        let g = rgb[1] / 255;
        let b = rgb[2] / 255;
        r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
        g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
        b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;
        const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
        return [x * 100, y * 100, z * 100];
      };
      convert.rgb.lab = function(rgb) {
        const xyz = convert.rgb.xyz(rgb);
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);
        return [l, a, b];
      };
      convert.hsl.rgb = function(hsl) {
        const h = hsl[0] / 360;
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        let t2;
        let t3;
        let val;
        if (s === 0) {
          val = l * 255;
          return [val, val, val];
        }
        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }
        const t1 = 2 * l - t2;
        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
          t3 = h + 1 / 3 * -(i - 1);
          if (t3 < 0) {
            t3++;
          }
          if (t3 > 1) {
            t3--;
          }
          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }
          rgb[i] = val * 255;
        }
        return rgb;
      };
      convert.hsl.hsv = function(hsl) {
        const h = hsl[0];
        let s = hsl[1] / 100;
        let l = hsl[2] / 100;
        let smin = s;
        const lmin = Math.max(l, 0.01);
        l *= 2;
        s *= l <= 1 ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        const v = (l + s) / 2;
        const sv = l === 0 ? 2 * smin / (lmin + smin) : 2 * s / (l + s);
        return [h, sv * 100, v * 100];
      };
      convert.hsv.rgb = function(hsv) {
        const h = hsv[0] / 60;
        const s = hsv[1] / 100;
        let v = hsv[2] / 100;
        const hi = Math.floor(h) % 6;
        const f = h - Math.floor(h);
        const p = 255 * v * (1 - s);
        const q = 255 * v * (1 - s * f);
        const t = 255 * v * (1 - s * (1 - f));
        v *= 255;
        switch (hi) {
          case 0:
            return [v, t, p];
          case 1:
            return [q, v, p];
          case 2:
            return [p, v, t];
          case 3:
            return [p, q, v];
          case 4:
            return [t, p, v];
          case 5:
            return [v, p, q];
        }
      };
      convert.hsv.hsl = function(hsv) {
        const h = hsv[0];
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const vmin = Math.max(v, 0.01);
        let sl;
        let l;
        l = (2 - s) * v;
        const lmin = (2 - s) * vmin;
        sl = s * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l /= 2;
        return [h, sl * 100, l * 100];
      };
      convert.hwb.rgb = function(hwb) {
        const h = hwb[0] / 360;
        let wh = hwb[1] / 100;
        let bl = hwb[2] / 100;
        const ratio = wh + bl;
        let f;
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }
        const i = Math.floor(6 * h);
        const v = 1 - bl;
        f = 6 * h - i;
        if ((i & 1) !== 0) {
          f = 1 - f;
        }
        const n = wh + f * (v - wh);
        let r;
        let g;
        let b;
        switch (i) {
          default:
          case 6:
          case 0:
            r = v;
            g = n;
            b = wh;
            break;
          case 1:
            r = n;
            g = v;
            b = wh;
            break;
          case 2:
            r = wh;
            g = v;
            b = n;
            break;
          case 3:
            r = wh;
            g = n;
            b = v;
            break;
          case 4:
            r = n;
            g = wh;
            b = v;
            break;
          case 5:
            r = v;
            g = wh;
            b = n;
            break;
        }
        return [r * 255, g * 255, b * 255];
      };
      convert.cmyk.rgb = function(cmyk) {
        const c = cmyk[0] / 100;
        const m = cmyk[1] / 100;
        const y = cmyk[2] / 100;
        const k = cmyk[3] / 100;
        const r = 1 - Math.min(1, c * (1 - k) + k);
        const g = 1 - Math.min(1, m * (1 - k) + k);
        const b = 1 - Math.min(1, y * (1 - k) + k);
        return [r * 255, g * 255, b * 255];
      };
      convert.xyz.rgb = function(xyz) {
        const x = xyz[0] / 100;
        const y = xyz[1] / 100;
        const z = xyz[2] / 100;
        let r;
        let g;
        let b;
        r = x * 3.2406 + y * -1.5372 + z * -0.4986;
        g = x * -0.9689 + y * 1.8758 + z * 0.0415;
        b = x * 0.0557 + y * -0.204 + z * 1.057;
        r = r > 31308e-7 ? 1.055 * r ** (1 / 2.4) - 0.055 : r * 12.92;
        g = g > 31308e-7 ? 1.055 * g ** (1 / 2.4) - 0.055 : g * 12.92;
        b = b > 31308e-7 ? 1.055 * b ** (1 / 2.4) - 0.055 : b * 12.92;
        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b = Math.min(Math.max(0, b), 1);
        return [r * 255, g * 255, b * 255];
      };
      convert.xyz.lab = function(xyz) {
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
        x /= 95.047;
        y /= 100;
        z /= 108.883;
        x = x > 8856e-6 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 8856e-6 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 8856e-6 ? z ** (1 / 3) : 7.787 * z + 16 / 116;
        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);
        return [l, a, b];
      };
      convert.lab.xyz = function(lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let x;
        let y;
        let z;
        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b / 200;
        const y2 = y ** 3;
        const x2 = x ** 3;
        const z2 = z ** 3;
        y = y2 > 8856e-6 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 8856e-6 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 8856e-6 ? z2 : (z - 16 / 116) / 7.787;
        x *= 95.047;
        y *= 100;
        z *= 108.883;
        return [x, y, z];
      };
      convert.lab.lch = function(lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let h;
        const hr = Math.atan2(b, a);
        h = hr * 360 / 2 / Math.PI;
        if (h < 0) {
          h += 360;
        }
        const c = Math.sqrt(a * a + b * b);
        return [l, c, h];
      };
      convert.lch.lab = function(lch) {
        const l = lch[0];
        const c = lch[1];
        const h = lch[2];
        const hr = h / 360 * 2 * Math.PI;
        const a = c * Math.cos(hr);
        const b = c * Math.sin(hr);
        return [l, a, b];
      };
      convert.rgb.ansi16 = function(args, saturation = null) {
        const [r, g, b] = args;
        let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation;
        value = Math.round(value / 50);
        if (value === 0) {
          return 30;
        }
        let ansi = 30 + (Math.round(b / 255) << 2 | Math.round(g / 255) << 1 | Math.round(r / 255));
        if (value === 2) {
          ansi += 60;
        }
        return ansi;
      };
      convert.hsv.ansi16 = function(args) {
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };
      convert.rgb.ansi256 = function(args) {
        const r = args[0];
        const g = args[1];
        const b = args[2];
        if (r === g && g === b) {
          if (r < 8) {
            return 16;
          }
          if (r > 248) {
            return 231;
          }
          return Math.round((r - 8) / 247 * 24) + 232;
        }
        const ansi = 16 + 36 * Math.round(r / 255 * 5) + 6 * Math.round(g / 255 * 5) + Math.round(b / 255 * 5);
        return ansi;
      };
      convert.ansi16.rgb = function(args) {
        let color = args % 10;
        if (color === 0 || color === 7) {
          if (args > 50) {
            color += 3.5;
          }
          color = color / 10.5 * 255;
          return [color, color, color];
        }
        const mult = (~~(args > 50) + 1) * 0.5;
        const r = (color & 1) * mult * 255;
        const g = (color >> 1 & 1) * mult * 255;
        const b = (color >> 2 & 1) * mult * 255;
        return [r, g, b];
      };
      convert.ansi256.rgb = function(args) {
        if (args >= 232) {
          const c = (args - 232) * 10 + 8;
          return [c, c, c];
        }
        args -= 16;
        let rem;
        const r = Math.floor(args / 36) / 5 * 255;
        const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
        const b = rem % 6 / 5 * 255;
        return [r, g, b];
      };
      convert.rgb.hex = function(args) {
        const integer = ((Math.round(args[0]) & 255) << 16) + ((Math.round(args[1]) & 255) << 8) + (Math.round(args[2]) & 255);
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.hex.rgb = function(args) {
        const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
          return [0, 0, 0];
        }
        let colorString = match[0];
        if (match[0].length === 3) {
          colorString = colorString.split("").map((char) => {
            return char + char;
          }).join("");
        }
        const integer = parseInt(colorString, 16);
        const r = integer >> 16 & 255;
        const g = integer >> 8 & 255;
        const b = integer & 255;
        return [r, g, b];
      };
      convert.rgb.hcg = function(rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const max = Math.max(Math.max(r, g), b);
        const min = Math.min(Math.min(r, g), b);
        const chroma = max - min;
        let grayscale;
        let hue;
        if (chroma < 1) {
          grayscale = min / (1 - chroma);
        } else {
          grayscale = 0;
        }
        if (chroma <= 0) {
          hue = 0;
        } else if (max === r) {
          hue = (g - b) / chroma % 6;
        } else if (max === g) {
          hue = 2 + (b - r) / chroma;
        } else {
          hue = 4 + (r - g) / chroma;
        }
        hue /= 6;
        hue %= 1;
        return [hue * 360, chroma * 100, grayscale * 100];
      };
      convert.hsl.hcg = function(hsl) {
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        const c = l < 0.5 ? 2 * s * l : 2 * s * (1 - l);
        let f = 0;
        if (c < 1) {
          f = (l - 0.5 * c) / (1 - c);
        }
        return [hsl[0], c * 100, f * 100];
      };
      convert.hsv.hcg = function(hsv) {
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const c = s * v;
        let f = 0;
        if (c < 1) {
          f = (v - c) / (1 - c);
        }
        return [hsv[0], c * 100, f * 100];
      };
      convert.hcg.rgb = function(hcg) {
        const h = hcg[0] / 360;
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        if (c === 0) {
          return [g * 255, g * 255, g * 255];
        }
        const pure = [0, 0, 0];
        const hi = h % 1 * 6;
        const v = hi % 1;
        const w = 1 - v;
        let mg = 0;
        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v;
            pure[2] = 0;
            break;
          case 1:
            pure[0] = w;
            pure[1] = 1;
            pure[2] = 0;
            break;
          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v;
            break;
          case 3:
            pure[0] = 0;
            pure[1] = w;
            pure[2] = 1;
            break;
          case 4:
            pure[0] = v;
            pure[1] = 0;
            pure[2] = 1;
            break;
          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w;
        }
        mg = (1 - c) * g;
        return [
          (c * pure[0] + mg) * 255,
          (c * pure[1] + mg) * 255,
          (c * pure[2] + mg) * 255
        ];
      };
      convert.hcg.hsv = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const v = c + g * (1 - c);
        let f = 0;
        if (v > 0) {
          f = c / v;
        }
        return [hcg[0], f * 100, v * 100];
      };
      convert.hcg.hsl = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const l = g * (1 - c) + 0.5 * c;
        let s = 0;
        if (l > 0 && l < 0.5) {
          s = c / (2 * l);
        } else if (l >= 0.5 && l < 1) {
          s = c / (2 * (1 - l));
        }
        return [hcg[0], s * 100, l * 100];
      };
      convert.hcg.hwb = function(hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const v = c + g * (1 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
      };
      convert.hwb.hcg = function(hwb) {
        const w = hwb[1] / 100;
        const b = hwb[2] / 100;
        const v = 1 - b;
        const c = v - w;
        let g = 0;
        if (c < 1) {
          g = (v - c) / (1 - c);
        }
        return [hwb[0], c * 100, g * 100];
      };
      convert.apple.rgb = function(apple) {
        return [apple[0] / 65535 * 255, apple[1] / 65535 * 255, apple[2] / 65535 * 255];
      };
      convert.rgb.apple = function(rgb) {
        return [rgb[0] / 255 * 65535, rgb[1] / 255 * 65535, rgb[2] / 255 * 65535];
      };
      convert.gray.rgb = function(args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
      };
      convert.gray.hsl = function(args) {
        return [0, 0, args[0]];
      };
      convert.gray.hsv = convert.gray.hsl;
      convert.gray.hwb = function(gray) {
        return [0, 100, gray[0]];
      };
      convert.gray.cmyk = function(gray) {
        return [0, 0, 0, gray[0]];
      };
      convert.gray.lab = function(gray) {
        return [gray[0], 0, 0];
      };
      convert.gray.hex = function(gray) {
        const val = Math.round(gray[0] / 100 * 255) & 255;
        const integer = (val << 16) + (val << 8) + val;
        const string = integer.toString(16).toUpperCase();
        return "000000".substring(string.length) + string;
      };
      convert.rgb.gray = function(rgb) {
        const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
      };
    }
  });

  // ../../node_modules/color-convert/route.js
  var require_route = __commonJS({
    "../../node_modules/color-convert/route.js"(exports, module) {
      var conversions = require_conversions();
      function buildGraph() {
        const graph = {};
        const models = Object.keys(conversions);
        for (let len = models.length, i = 0; i < len; i++) {
          graph[models[i]] = {
            distance: -1,
            parent: null
          };
        }
        return graph;
      }
      function deriveBFS(fromModel) {
        const graph = buildGraph();
        const queue = [fromModel];
        graph[fromModel].distance = 0;
        while (queue.length) {
          const current = queue.pop();
          const adjacents = Object.keys(conversions[current]);
          for (let len = adjacents.length, i = 0; i < len; i++) {
            const adjacent = adjacents[i];
            const node = graph[adjacent];
            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }
        return graph;
      }
      function link(from, to) {
        return function(args) {
          return to(from(args));
        };
      }
      function wrapConversion(toModel, graph) {
        const path3 = [graph[toModel].parent, toModel];
        let fn = conversions[graph[toModel].parent][toModel];
        let cur = graph[toModel].parent;
        while (graph[cur].parent) {
          path3.unshift(graph[cur].parent);
          fn = link(conversions[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }
        fn.conversion = path3;
        return fn;
      }
      module.exports = function(fromModel) {
        const graph = deriveBFS(fromModel);
        const conversion = {};
        const models = Object.keys(graph);
        for (let len = models.length, i = 0; i < len; i++) {
          const toModel = models[i];
          const node = graph[toModel];
          if (node.parent === null) {
            continue;
          }
          conversion[toModel] = wrapConversion(toModel, graph);
        }
        return conversion;
      };
    }
  });

  // ../../node_modules/color-convert/index.js
  var require_color_convert = __commonJS({
    "../../node_modules/color-convert/index.js"(exports, module) {
      var conversions = require_conversions();
      var route = require_route();
      var convert = {};
      var models = Object.keys(conversions);
      function wrapRaw(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          return fn(args);
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      function wrapRounded(fn) {
        const wrappedFn = function(...args) {
          const arg0 = args[0];
          if (arg0 === void 0 || arg0 === null) {
            return arg0;
          }
          if (arg0.length > 1) {
            args = arg0;
          }
          const result = fn(args);
          if (typeof result === "object") {
            for (let len = result.length, i = 0; i < len; i++) {
              result[i] = Math.round(result[i]);
            }
          }
          return result;
        };
        if ("conversion" in fn) {
          wrappedFn.conversion = fn.conversion;
        }
        return wrappedFn;
      }
      models.forEach((fromModel) => {
        convert[fromModel] = {};
        Object.defineProperty(convert[fromModel], "channels", { value: conversions[fromModel].channels });
        Object.defineProperty(convert[fromModel], "labels", { value: conversions[fromModel].labels });
        const routes = route(fromModel);
        const routeModels = Object.keys(routes);
        routeModels.forEach((toModel) => {
          const fn = routes[toModel];
          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });
      module.exports = convert;
    }
  });

  // ../../node_modules/ansi-styles/index.js
  var require_ansi_styles = __commonJS({
    "../../node_modules/ansi-styles/index.js"(exports, module) {
      "use strict";
      var wrapAnsi16 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `[${code + offset}m`;
      };
      var wrapAnsi256 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `[${38 + offset};5;${code}m`;
      };
      var wrapAnsi16m = (fn, offset) => (...args) => {
        const rgb = fn(...args);
        return `[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
      };
      var ansi2ansi = (n) => n;
      var rgb2rgb = (r, g, b) => [r, g, b];
      var setLazyProperty = (object, property, get) => {
        Object.defineProperty(object, property, {
          get: () => {
            const value = get();
            Object.defineProperty(object, property, {
              value,
              enumerable: true,
              configurable: true
            });
            return value;
          },
          enumerable: true,
          configurable: true
        });
      };
      var colorConvert;
      var makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
        if (colorConvert === void 0) {
          colorConvert = require_color_convert();
        }
        const offset = isBackground ? 10 : 0;
        const styles = {};
        for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
          const name = sourceSpace === "ansi16" ? "ansi" : sourceSpace;
          if (sourceSpace === targetSpace) {
            styles[name] = wrap(identity, offset);
          } else if (typeof suite === "object") {
            styles[name] = wrap(suite[targetSpace], offset);
          }
        }
        return styles;
      };
      function assembleStyles() {
        const codes = new Map();
        const styles = {
          modifier: {
            reset: [0, 0],
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29]
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39]
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49]
          }
        };
        styles.color.gray = styles.color.blackBright;
        styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
        styles.color.grey = styles.color.blackBright;
        styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
        for (const [groupName, group] of Object.entries(styles)) {
          for (const [styleName, style] of Object.entries(group)) {
            styles[styleName] = {
              open: `[${style[0]}m`,
              close: `[${style[1]}m`
            };
            group[styleName] = styles[styleName];
            codes.set(style[0], style[1]);
          }
          Object.defineProperty(styles, groupName, {
            value: group,
            enumerable: false
          });
        }
        Object.defineProperty(styles, "codes", {
          value: codes,
          enumerable: false
        });
        styles.color.close = "[39m";
        styles.bgColor.close = "[49m";
        setLazyProperty(styles.color, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, false));
        setLazyProperty(styles.color, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, false));
        setLazyProperty(styles.color, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, false));
        setLazyProperty(styles.bgColor, "ansi", () => makeDynamicStyles(wrapAnsi16, "ansi16", ansi2ansi, true));
        setLazyProperty(styles.bgColor, "ansi256", () => makeDynamicStyles(wrapAnsi256, "ansi256", ansi2ansi, true));
        setLazyProperty(styles.bgColor, "ansi16m", () => makeDynamicStyles(wrapAnsi16m, "rgb", rgb2rgb, true));
        return styles;
      }
      Object.defineProperty(module, "exports", {
        enumerable: true,
        get: assembleStyles
      });
    }
  });

  // ../../node_modules/chalk/source/util.js
  var require_util2 = __commonJS({
    "../../node_modules/chalk/source/util.js"(exports, module) {
      "use strict";
      var stringReplaceAll = (string, substring, replacer) => {
        let index = string.indexOf(substring);
        if (index === -1) {
          return string;
        }
        const substringLength = substring.length;
        let endIndex = 0;
        let returnValue = "";
        do {
          returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
          endIndex = index + substringLength;
          index = string.indexOf(substring, endIndex);
        } while (index !== -1);
        returnValue += string.substr(endIndex);
        return returnValue;
      };
      var stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
        let endIndex = 0;
        let returnValue = "";
        do {
          const gotCR = string[index - 1] === "\r";
          returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
          endIndex = index + 1;
          index = string.indexOf("\n", endIndex);
        } while (index !== -1);
        returnValue += string.substr(endIndex);
        return returnValue;
      };
      module.exports = {
        stringReplaceAll,
        stringEncaseCRLFWithFirstIndex
      };
    }
  });

  // ../../node_modules/chalk/source/templates.js
  var require_templates = __commonJS({
    "../../node_modules/chalk/source/templates.js"(exports, module) {
      "use strict";
      var TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
      var STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
      var STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
      var ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
      var ESCAPES = new Map([
        ["n", "\n"],
        ["r", "\r"],
        ["t", "	"],
        ["b", "\b"],
        ["f", "\f"],
        ["v", "\v"],
        ["0", "\0"],
        ["\\", "\\"],
        ["e", ""],
        ["a", "\x07"]
      ]);
      function unescape(c) {
        const u = c[0] === "u";
        const bracket = c[1] === "{";
        if (u && !bracket && c.length === 5 || c[0] === "x" && c.length === 3) {
          return String.fromCharCode(parseInt(c.slice(1), 16));
        }
        if (u && bracket) {
          return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
        }
        return ESCAPES.get(c) || c;
      }
      function parseArguments(name, arguments_) {
        const results = [];
        const chunks = arguments_.trim().split(/\s*,\s*/g);
        let matches;
        for (const chunk of chunks) {
          const number = Number(chunk);
          if (!Number.isNaN(number)) {
            results.push(number);
          } else if (matches = chunk.match(STRING_REGEX)) {
            results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
          } else {
            throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
          }
        }
        return results;
      }
      function parseStyle(style) {
        STYLE_REGEX.lastIndex = 0;
        const results = [];
        let matches;
        while ((matches = STYLE_REGEX.exec(style)) !== null) {
          const name = matches[1];
          if (matches[2]) {
            const args = parseArguments(name, matches[2]);
            results.push([name].concat(args));
          } else {
            results.push([name]);
          }
        }
        return results;
      }
      function buildStyle(chalk4, styles) {
        const enabled = {};
        for (const layer of styles) {
          for (const style of layer.styles) {
            enabled[style[0]] = layer.inverse ? null : style.slice(1);
          }
        }
        let current = chalk4;
        for (const [styleName, styles2] of Object.entries(enabled)) {
          if (!Array.isArray(styles2)) {
            continue;
          }
          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }
          current = styles2.length > 0 ? current[styleName](...styles2) : current[styleName];
        }
        return current;
      }
      module.exports = (chalk4, temporary) => {
        const styles = [];
        const chunks = [];
        let chunk = [];
        temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
          if (escapeCharacter) {
            chunk.push(unescape(escapeCharacter));
          } else if (style) {
            const string = chunk.join("");
            chunk = [];
            chunks.push(styles.length === 0 ? string : buildStyle(chalk4, styles)(string));
            styles.push({ inverse, styles: parseStyle(style) });
          } else if (close) {
            if (styles.length === 0) {
              throw new Error("Found extraneous } in Chalk template literal");
            }
            chunks.push(buildStyle(chalk4, styles)(chunk.join("")));
            chunk = [];
            styles.pop();
          } else {
            chunk.push(character);
          }
        });
        chunks.push(chunk.join(""));
        if (styles.length > 0) {
          const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? "" : "s"} (\`}\`)`;
          throw new Error(errMessage);
        }
        return chunks.join("");
      };
    }
  });

  // ../../node_modules/chalk/source/index.js
  var require_source = __commonJS({
    "../../node_modules/chalk/source/index.js"(exports, module) {
      "use strict";
      var ansiStyles = require_ansi_styles();
      var { stdout: stdoutColor, stderr: stderrColor } = require_supports_color();
      var {
        stringReplaceAll,
        stringEncaseCRLFWithFirstIndex
      } = require_util2();
      var { isArray } = Array;
      var levelMapping = [
        "ansi",
        "ansi",
        "ansi256",
        "ansi16m"
      ];
      var styles = Object.create(null);
      var applyOptions = (object, options = {}) => {
        if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
          throw new Error("The `level` option should be an integer from 0 to 3");
        }
        const colorLevel = stdoutColor ? stdoutColor.level : 0;
        object.level = options.level === void 0 ? colorLevel : options.level;
      };
      var ChalkClass = class {
        constructor(options) {
          return chalkFactory(options);
        }
      };
      var chalkFactory = (options) => {
        const chalk5 = {};
        applyOptions(chalk5, options);
        chalk5.template = (...arguments_) => chalkTag(chalk5.template, ...arguments_);
        Object.setPrototypeOf(chalk5, Chalk.prototype);
        Object.setPrototypeOf(chalk5.template, chalk5);
        chalk5.template.constructor = () => {
          throw new Error("`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.");
        };
        chalk5.template.Instance = ChalkClass;
        return chalk5.template;
      };
      function Chalk(options) {
        return chalkFactory(options);
      }
      for (const [styleName, style] of Object.entries(ansiStyles)) {
        styles[styleName] = {
          get() {
            const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
            Object.defineProperty(this, styleName, { value: builder });
            return builder;
          }
        };
      }
      styles.visible = {
        get() {
          const builder = createBuilder(this, this._styler, true);
          Object.defineProperty(this, "visible", { value: builder });
          return builder;
        }
      };
      var usedModels = ["rgb", "hex", "keyword", "hsl", "hsv", "hwb", "ansi", "ansi256"];
      for (const model of usedModels) {
        styles[model] = {
          get() {
            const { level } = this;
            return function(...arguments_) {
              const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
              return createBuilder(this, styler, this._isEmpty);
            };
          }
        };
      }
      for (const model of usedModels) {
        const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
        styles[bgModel] = {
          get() {
            const { level } = this;
            return function(...arguments_) {
              const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
              return createBuilder(this, styler, this._isEmpty);
            };
          }
        };
      }
      var proto = Object.defineProperties(() => {
      }, {
        ...styles,
        level: {
          enumerable: true,
          get() {
            return this._generator.level;
          },
          set(level) {
            this._generator.level = level;
          }
        }
      });
      var createStyler = (open, close, parent) => {
        let openAll;
        let closeAll;
        if (parent === void 0) {
          openAll = open;
          closeAll = close;
        } else {
          openAll = parent.openAll + open;
          closeAll = close + parent.closeAll;
        }
        return {
          open,
          close,
          openAll,
          closeAll,
          parent
        };
      };
      var createBuilder = (self2, _styler, _isEmpty) => {
        const builder = (...arguments_) => {
          if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
            return applyStyle(builder, chalkTag(builder, ...arguments_));
          }
          return applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
        };
        Object.setPrototypeOf(builder, proto);
        builder._generator = self2;
        builder._styler = _styler;
        builder._isEmpty = _isEmpty;
        return builder;
      };
      var applyStyle = (self2, string) => {
        if (self2.level <= 0 || !string) {
          return self2._isEmpty ? "" : string;
        }
        let styler = self2._styler;
        if (styler === void 0) {
          return string;
        }
        const { openAll, closeAll } = styler;
        if (string.indexOf("") !== -1) {
          while (styler !== void 0) {
            string = stringReplaceAll(string, styler.close, styler.open);
            styler = styler.parent;
          }
        }
        const lfIndex = string.indexOf("\n");
        if (lfIndex !== -1) {
          string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
        }
        return openAll + string + closeAll;
      };
      var template;
      var chalkTag = (chalk5, ...strings) => {
        const [firstString] = strings;
        if (!isArray(firstString) || !isArray(firstString.raw)) {
          return strings.join(" ");
        }
        const arguments_ = strings.slice(1);
        const parts = [firstString.raw[0]];
        for (let i = 1; i < firstString.length; i++) {
          parts.push(String(arguments_[i - 1]).replace(/[{}\\]/g, "\\$&"), String(firstString.raw[i]));
        }
        if (template === void 0) {
          template = require_templates();
        }
        return template(chalk5, parts.join(""));
      };
      Object.defineProperties(Chalk.prototype, styles);
      var chalk4 = Chalk();
      chalk4.supportsColor = stdoutColor;
      chalk4.stderr = Chalk({ level: stderrColor ? stderrColor.level : 0 });
      chalk4.stderr.supportsColor = stderrColor;
      module.exports = chalk4;
    }
  });

  // ../../node_modules/mimic-fn/index.js
  var require_mimic_fn = __commonJS({
    "../../node_modules/mimic-fn/index.js"(exports, module) {
      "use strict";
      var mimicFn = (to, from) => {
        for (const prop of Reflect.ownKeys(from)) {
          Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
        }
        return to;
      };
      module.exports = mimicFn;
      module.exports.default = mimicFn;
    }
  });

  // ../../node_modules/onetime/index.js
  var require_onetime = __commonJS({
    "../../node_modules/onetime/index.js"(exports, module) {
      "use strict";
      var mimicFn = require_mimic_fn();
      var calledFunctions = new WeakMap();
      var onetime2 = (function_, options = {}) => {
        if (typeof function_ !== "function") {
          throw new TypeError("Expected a function");
        }
        let returnValue;
        let callCount = 0;
        const functionName = function_.displayName || function_.name || "<anonymous>";
        const onetime3 = function(...arguments_) {
          calledFunctions.set(onetime3, ++callCount);
          if (callCount === 1) {
            returnValue = function_.apply(this, arguments_);
            function_ = null;
          } else if (options.throw === true) {
            throw new Error(`Function \`${functionName}\` can only be called once`);
          }
          return returnValue;
        };
        mimicFn(onetime3, function_);
        calledFunctions.set(onetime3, callCount);
        return onetime3;
      };
      module.exports = onetime2;
      module.exports.default = onetime2;
      module.exports.callCount = (function_) => {
        if (!calledFunctions.has(function_)) {
          throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
        }
        return calledFunctions.get(function_);
      };
    }
  });

  // ../../node_modules/signal-exit/signals.js
  var require_signals = __commonJS({
    "../../node_modules/signal-exit/signals.js"(exports, module) {
      module.exports = [
        "SIGABRT",
        "SIGALRM",
        "SIGHUP",
        "SIGINT",
        "SIGTERM"
      ];
      if (process.platform !== "win32") {
        module.exports.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
      }
      if (process.platform === "linux") {
        module.exports.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
      }
    }
  });

  // ../../node_modules/signal-exit/index.js
  var require_signal_exit = __commonJS({
    "../../node_modules/signal-exit/index.js"(exports, module) {
      var assert = __require("assert");
      var signals = require_signals();
      var isWin = /^win/i.test(process.platform);
      var EE = __require("events");
      if (typeof EE !== "function") {
        EE = EE.EventEmitter;
      }
      var emitter;
      if (process.__signal_exit_emitter__) {
        emitter = process.__signal_exit_emitter__;
      } else {
        emitter = process.__signal_exit_emitter__ = new EE();
        emitter.count = 0;
        emitter.emitted = {};
      }
      if (!emitter.infinite) {
        emitter.setMaxListeners(Infinity);
        emitter.infinite = true;
      }
      module.exports = function(cb, opts) {
        assert.equal(typeof cb, "function", "a callback must be provided for exit handler");
        if (loaded === false) {
          load();
        }
        var ev = "exit";
        if (opts && opts.alwaysLast) {
          ev = "afterexit";
        }
        var remove = function() {
          emitter.removeListener(ev, cb);
          if (emitter.listeners("exit").length === 0 && emitter.listeners("afterexit").length === 0) {
            unload();
          }
        };
        emitter.on(ev, cb);
        return remove;
      };
      module.exports.unload = unload;
      function unload() {
        if (!loaded) {
          return;
        }
        loaded = false;
        signals.forEach(function(sig) {
          try {
            process.removeListener(sig, sigListeners[sig]);
          } catch (er) {
          }
        });
        process.emit = originalProcessEmit;
        process.reallyExit = originalProcessReallyExit;
        emitter.count -= 1;
      }
      function emit(event, code, signal) {
        if (emitter.emitted[event]) {
          return;
        }
        emitter.emitted[event] = true;
        emitter.emit(event, code, signal);
      }
      var sigListeners = {};
      signals.forEach(function(sig) {
        sigListeners[sig] = function listener() {
          var listeners = process.listeners(sig);
          if (listeners.length === emitter.count) {
            unload();
            emit("exit", null, sig);
            emit("afterexit", null, sig);
            if (isWin && sig === "SIGHUP") {
              sig = "SIGINT";
            }
            process.kill(process.pid, sig);
          }
        };
      });
      module.exports.signals = function() {
        return signals;
      };
      module.exports.load = load;
      var loaded = false;
      function load() {
        if (loaded) {
          return;
        }
        loaded = true;
        emitter.count += 1;
        signals = signals.filter(function(sig) {
          try {
            process.on(sig, sigListeners[sig]);
            return true;
          } catch (er) {
            return false;
          }
        });
        process.emit = processEmit;
        process.reallyExit = processReallyExit;
      }
      var originalProcessReallyExit = process.reallyExit;
      function processReallyExit(code) {
        process.exitCode = code || 0;
        emit("exit", process.exitCode, null);
        emit("afterexit", process.exitCode, null);
        originalProcessReallyExit.call(process, process.exitCode);
      }
      var originalProcessEmit = process.emit;
      function processEmit(ev, arg) {
        if (ev === "exit") {
          if (arg !== void 0) {
            process.exitCode = arg;
          }
          var ret = originalProcessEmit.apply(this, arguments);
          emit("exit", process.exitCode, null);
          emit("afterexit", process.exitCode, null);
          return ret;
        } else {
          return originalProcessEmit.apply(this, arguments);
        }
      }
    }
  });

  // ../../node_modules/cli-spinners/spinners.json
  var require_spinners = __commonJS({
    "../../node_modules/cli-spinners/spinners.json"(exports, module) {
      module.exports = {
        dots: {
          interval: 80,
          frames: [
            "\u280B",
            "\u2819",
            "\u2839",
            "\u2838",
            "\u283C",
            "\u2834",
            "\u2826",
            "\u2827",
            "\u2807",
            "\u280F"
          ]
        },
        dots2: {
          interval: 80,
          frames: [
            "\u28FE",
            "\u28FD",
            "\u28FB",
            "\u28BF",
            "\u287F",
            "\u28DF",
            "\u28EF",
            "\u28F7"
          ]
        },
        dots3: {
          interval: 80,
          frames: [
            "\u280B",
            "\u2819",
            "\u281A",
            "\u281E",
            "\u2816",
            "\u2826",
            "\u2834",
            "\u2832",
            "\u2833",
            "\u2813"
          ]
        },
        dots4: {
          interval: 80,
          frames: [
            "\u2804",
            "\u2806",
            "\u2807",
            "\u280B",
            "\u2819",
            "\u2838",
            "\u2830",
            "\u2820",
            "\u2830",
            "\u2838",
            "\u2819",
            "\u280B",
            "\u2807",
            "\u2806"
          ]
        },
        dots5: {
          interval: 80,
          frames: [
            "\u280B",
            "\u2819",
            "\u281A",
            "\u2812",
            "\u2802",
            "\u2802",
            "\u2812",
            "\u2832",
            "\u2834",
            "\u2826",
            "\u2816",
            "\u2812",
            "\u2810",
            "\u2810",
            "\u2812",
            "\u2813",
            "\u280B"
          ]
        },
        dots6: {
          interval: 80,
          frames: [
            "\u2801",
            "\u2809",
            "\u2819",
            "\u281A",
            "\u2812",
            "\u2802",
            "\u2802",
            "\u2812",
            "\u2832",
            "\u2834",
            "\u2824",
            "\u2804",
            "\u2804",
            "\u2824",
            "\u2834",
            "\u2832",
            "\u2812",
            "\u2802",
            "\u2802",
            "\u2812",
            "\u281A",
            "\u2819",
            "\u2809",
            "\u2801"
          ]
        },
        dots7: {
          interval: 80,
          frames: [
            "\u2808",
            "\u2809",
            "\u280B",
            "\u2813",
            "\u2812",
            "\u2810",
            "\u2810",
            "\u2812",
            "\u2816",
            "\u2826",
            "\u2824",
            "\u2820",
            "\u2820",
            "\u2824",
            "\u2826",
            "\u2816",
            "\u2812",
            "\u2810",
            "\u2810",
            "\u2812",
            "\u2813",
            "\u280B",
            "\u2809",
            "\u2808"
          ]
        },
        dots8: {
          interval: 80,
          frames: [
            "\u2801",
            "\u2801",
            "\u2809",
            "\u2819",
            "\u281A",
            "\u2812",
            "\u2802",
            "\u2802",
            "\u2812",
            "\u2832",
            "\u2834",
            "\u2824",
            "\u2804",
            "\u2804",
            "\u2824",
            "\u2820",
            "\u2820",
            "\u2824",
            "\u2826",
            "\u2816",
            "\u2812",
            "\u2810",
            "\u2810",
            "\u2812",
            "\u2813",
            "\u280B",
            "\u2809",
            "\u2808",
            "\u2808"
          ]
        },
        dots9: {
          interval: 80,
          frames: [
            "\u28B9",
            "\u28BA",
            "\u28BC",
            "\u28F8",
            "\u28C7",
            "\u2867",
            "\u2857",
            "\u284F"
          ]
        },
        dots10: {
          interval: 80,
          frames: [
            "\u2884",
            "\u2882",
            "\u2881",
            "\u2841",
            "\u2848",
            "\u2850",
            "\u2860"
          ]
        },
        dots11: {
          interval: 100,
          frames: [
            "\u2801",
            "\u2802",
            "\u2804",
            "\u2840",
            "\u2880",
            "\u2820",
            "\u2810",
            "\u2808"
          ]
        },
        dots12: {
          interval: 80,
          frames: [
            "\u2880\u2800",
            "\u2840\u2800",
            "\u2804\u2800",
            "\u2882\u2800",
            "\u2842\u2800",
            "\u2805\u2800",
            "\u2883\u2800",
            "\u2843\u2800",
            "\u280D\u2800",
            "\u288B\u2800",
            "\u284B\u2800",
            "\u280D\u2801",
            "\u288B\u2801",
            "\u284B\u2801",
            "\u280D\u2809",
            "\u280B\u2809",
            "\u280B\u2809",
            "\u2809\u2819",
            "\u2809\u2819",
            "\u2809\u2829",
            "\u2808\u2899",
            "\u2808\u2859",
            "\u2888\u2829",
            "\u2840\u2899",
            "\u2804\u2859",
            "\u2882\u2829",
            "\u2842\u2898",
            "\u2805\u2858",
            "\u2883\u2828",
            "\u2843\u2890",
            "\u280D\u2850",
            "\u288B\u2820",
            "\u284B\u2880",
            "\u280D\u2841",
            "\u288B\u2801",
            "\u284B\u2801",
            "\u280D\u2809",
            "\u280B\u2809",
            "\u280B\u2809",
            "\u2809\u2819",
            "\u2809\u2819",
            "\u2809\u2829",
            "\u2808\u2899",
            "\u2808\u2859",
            "\u2808\u2829",
            "\u2800\u2899",
            "\u2800\u2859",
            "\u2800\u2829",
            "\u2800\u2898",
            "\u2800\u2858",
            "\u2800\u2828",
            "\u2800\u2890",
            "\u2800\u2850",
            "\u2800\u2820",
            "\u2800\u2880",
            "\u2800\u2840"
          ]
        },
        dots8Bit: {
          interval: 80,
          frames: [
            "\u2800",
            "\u2801",
            "\u2802",
            "\u2803",
            "\u2804",
            "\u2805",
            "\u2806",
            "\u2807",
            "\u2840",
            "\u2841",
            "\u2842",
            "\u2843",
            "\u2844",
            "\u2845",
            "\u2846",
            "\u2847",
            "\u2808",
            "\u2809",
            "\u280A",
            "\u280B",
            "\u280C",
            "\u280D",
            "\u280E",
            "\u280F",
            "\u2848",
            "\u2849",
            "\u284A",
            "\u284B",
            "\u284C",
            "\u284D",
            "\u284E",
            "\u284F",
            "\u2810",
            "\u2811",
            "\u2812",
            "\u2813",
            "\u2814",
            "\u2815",
            "\u2816",
            "\u2817",
            "\u2850",
            "\u2851",
            "\u2852",
            "\u2853",
            "\u2854",
            "\u2855",
            "\u2856",
            "\u2857",
            "\u2818",
            "\u2819",
            "\u281A",
            "\u281B",
            "\u281C",
            "\u281D",
            "\u281E",
            "\u281F",
            "\u2858",
            "\u2859",
            "\u285A",
            "\u285B",
            "\u285C",
            "\u285D",
            "\u285E",
            "\u285F",
            "\u2820",
            "\u2821",
            "\u2822",
            "\u2823",
            "\u2824",
            "\u2825",
            "\u2826",
            "\u2827",
            "\u2860",
            "\u2861",
            "\u2862",
            "\u2863",
            "\u2864",
            "\u2865",
            "\u2866",
            "\u2867",
            "\u2828",
            "\u2829",
            "\u282A",
            "\u282B",
            "\u282C",
            "\u282D",
            "\u282E",
            "\u282F",
            "\u2868",
            "\u2869",
            "\u286A",
            "\u286B",
            "\u286C",
            "\u286D",
            "\u286E",
            "\u286F",
            "\u2830",
            "\u2831",
            "\u2832",
            "\u2833",
            "\u2834",
            "\u2835",
            "\u2836",
            "\u2837",
            "\u2870",
            "\u2871",
            "\u2872",
            "\u2873",
            "\u2874",
            "\u2875",
            "\u2876",
            "\u2877",
            "\u2838",
            "\u2839",
            "\u283A",
            "\u283B",
            "\u283C",
            "\u283D",
            "\u283E",
            "\u283F",
            "\u2878",
            "\u2879",
            "\u287A",
            "\u287B",
            "\u287C",
            "\u287D",
            "\u287E",
            "\u287F",
            "\u2880",
            "\u2881",
            "\u2882",
            "\u2883",
            "\u2884",
            "\u2885",
            "\u2886",
            "\u2887",
            "\u28C0",
            "\u28C1",
            "\u28C2",
            "\u28C3",
            "\u28C4",
            "\u28C5",
            "\u28C6",
            "\u28C7",
            "\u2888",
            "\u2889",
            "\u288A",
            "\u288B",
            "\u288C",
            "\u288D",
            "\u288E",
            "\u288F",
            "\u28C8",
            "\u28C9",
            "\u28CA",
            "\u28CB",
            "\u28CC",
            "\u28CD",
            "\u28CE",
            "\u28CF",
            "\u2890",
            "\u2891",
            "\u2892",
            "\u2893",
            "\u2894",
            "\u2895",
            "\u2896",
            "\u2897",
            "\u28D0",
            "\u28D1",
            "\u28D2",
            "\u28D3",
            "\u28D4",
            "\u28D5",
            "\u28D6",
            "\u28D7",
            "\u2898",
            "\u2899",
            "\u289A",
            "\u289B",
            "\u289C",
            "\u289D",
            "\u289E",
            "\u289F",
            "\u28D8",
            "\u28D9",
            "\u28DA",
            "\u28DB",
            "\u28DC",
            "\u28DD",
            "\u28DE",
            "\u28DF",
            "\u28A0",
            "\u28A1",
            "\u28A2",
            "\u28A3",
            "\u28A4",
            "\u28A5",
            "\u28A6",
            "\u28A7",
            "\u28E0",
            "\u28E1",
            "\u28E2",
            "\u28E3",
            "\u28E4",
            "\u28E5",
            "\u28E6",
            "\u28E7",
            "\u28A8",
            "\u28A9",
            "\u28AA",
            "\u28AB",
            "\u28AC",
            "\u28AD",
            "\u28AE",
            "\u28AF",
            "\u28E8",
            "\u28E9",
            "\u28EA",
            "\u28EB",
            "\u28EC",
            "\u28ED",
            "\u28EE",
            "\u28EF",
            "\u28B0",
            "\u28B1",
            "\u28B2",
            "\u28B3",
            "\u28B4",
            "\u28B5",
            "\u28B6",
            "\u28B7",
            "\u28F0",
            "\u28F1",
            "\u28F2",
            "\u28F3",
            "\u28F4",
            "\u28F5",
            "\u28F6",
            "\u28F7",
            "\u28B8",
            "\u28B9",
            "\u28BA",
            "\u28BB",
            "\u28BC",
            "\u28BD",
            "\u28BE",
            "\u28BF",
            "\u28F8",
            "\u28F9",
            "\u28FA",
            "\u28FB",
            "\u28FC",
            "\u28FD",
            "\u28FE",
            "\u28FF"
          ]
        },
        line: {
          interval: 130,
          frames: [
            "-",
            "\\",
            "|",
            "/"
          ]
        },
        line2: {
          interval: 100,
          frames: [
            "\u2802",
            "-",
            "\u2013",
            "\u2014",
            "\u2013",
            "-"
          ]
        },
        pipe: {
          interval: 100,
          frames: [
            "\u2524",
            "\u2518",
            "\u2534",
            "\u2514",
            "\u251C",
            "\u250C",
            "\u252C",
            "\u2510"
          ]
        },
        simpleDots: {
          interval: 400,
          frames: [
            ".  ",
            ".. ",
            "...",
            "   "
          ]
        },
        simpleDotsScrolling: {
          interval: 200,
          frames: [
            ".  ",
            ".. ",
            "...",
            " ..",
            "  .",
            "   "
          ]
        },
        star: {
          interval: 70,
          frames: [
            "\u2736",
            "\u2738",
            "\u2739",
            "\u273A",
            "\u2739",
            "\u2737"
          ]
        },
        star2: {
          interval: 80,
          frames: [
            "+",
            "x",
            "*"
          ]
        },
        flip: {
          interval: 70,
          frames: [
            "_",
            "_",
            "_",
            "-",
            "`",
            "`",
            "'",
            "\xB4",
            "-",
            "_",
            "_",
            "_"
          ]
        },
        hamburger: {
          interval: 100,
          frames: [
            "\u2631",
            "\u2632",
            "\u2634"
          ]
        },
        growVertical: {
          interval: 120,
          frames: [
            "\u2581",
            "\u2583",
            "\u2584",
            "\u2585",
            "\u2586",
            "\u2587",
            "\u2586",
            "\u2585",
            "\u2584",
            "\u2583"
          ]
        },
        growHorizontal: {
          interval: 120,
          frames: [
            "\u258F",
            "\u258E",
            "\u258D",
            "\u258C",
            "\u258B",
            "\u258A",
            "\u2589",
            "\u258A",
            "\u258B",
            "\u258C",
            "\u258D",
            "\u258E"
          ]
        },
        balloon: {
          interval: 140,
          frames: [
            " ",
            ".",
            "o",
            "O",
            "@",
            "*",
            " "
          ]
        },
        balloon2: {
          interval: 120,
          frames: [
            ".",
            "o",
            "O",
            "\xB0",
            "O",
            "o",
            "."
          ]
        },
        noise: {
          interval: 100,
          frames: [
            "\u2593",
            "\u2592",
            "\u2591"
          ]
        },
        bounce: {
          interval: 120,
          frames: [
            "\u2801",
            "\u2802",
            "\u2804",
            "\u2802"
          ]
        },
        boxBounce: {
          interval: 120,
          frames: [
            "\u2596",
            "\u2598",
            "\u259D",
            "\u2597"
          ]
        },
        boxBounce2: {
          interval: 100,
          frames: [
            "\u258C",
            "\u2580",
            "\u2590",
            "\u2584"
          ]
        },
        triangle: {
          interval: 50,
          frames: [
            "\u25E2",
            "\u25E3",
            "\u25E4",
            "\u25E5"
          ]
        },
        arc: {
          interval: 100,
          frames: [
            "\u25DC",
            "\u25E0",
            "\u25DD",
            "\u25DE",
            "\u25E1",
            "\u25DF"
          ]
        },
        circle: {
          interval: 120,
          frames: [
            "\u25E1",
            "\u2299",
            "\u25E0"
          ]
        },
        squareCorners: {
          interval: 180,
          frames: [
            "\u25F0",
            "\u25F3",
            "\u25F2",
            "\u25F1"
          ]
        },
        circleQuarters: {
          interval: 120,
          frames: [
            "\u25F4",
            "\u25F7",
            "\u25F6",
            "\u25F5"
          ]
        },
        circleHalves: {
          interval: 50,
          frames: [
            "\u25D0",
            "\u25D3",
            "\u25D1",
            "\u25D2"
          ]
        },
        squish: {
          interval: 100,
          frames: [
            "\u256B",
            "\u256A"
          ]
        },
        toggle: {
          interval: 250,
          frames: [
            "\u22B6",
            "\u22B7"
          ]
        },
        toggle2: {
          interval: 80,
          frames: [
            "\u25AB",
            "\u25AA"
          ]
        },
        toggle3: {
          interval: 120,
          frames: [
            "\u25A1",
            "\u25A0"
          ]
        },
        toggle4: {
          interval: 100,
          frames: [
            "\u25A0",
            "\u25A1",
            "\u25AA",
            "\u25AB"
          ]
        },
        toggle5: {
          interval: 100,
          frames: [
            "\u25AE",
            "\u25AF"
          ]
        },
        toggle6: {
          interval: 300,
          frames: [
            "\u101D",
            "\u1040"
          ]
        },
        toggle7: {
          interval: 80,
          frames: [
            "\u29BE",
            "\u29BF"
          ]
        },
        toggle8: {
          interval: 100,
          frames: [
            "\u25CD",
            "\u25CC"
          ]
        },
        toggle9: {
          interval: 100,
          frames: [
            "\u25C9",
            "\u25CE"
          ]
        },
        toggle10: {
          interval: 100,
          frames: [
            "\u3282",
            "\u3280",
            "\u3281"
          ]
        },
        toggle11: {
          interval: 50,
          frames: [
            "\u29C7",
            "\u29C6"
          ]
        },
        toggle12: {
          interval: 120,
          frames: [
            "\u2617",
            "\u2616"
          ]
        },
        toggle13: {
          interval: 80,
          frames: [
            "=",
            "*",
            "-"
          ]
        },
        arrow: {
          interval: 100,
          frames: [
            "\u2190",
            "\u2196",
            "\u2191",
            "\u2197",
            "\u2192",
            "\u2198",
            "\u2193",
            "\u2199"
          ]
        },
        arrow2: {
          interval: 80,
          frames: [
            "\u2B06\uFE0F ",
            "\u2197\uFE0F ",
            "\u27A1\uFE0F ",
            "\u2198\uFE0F ",
            "\u2B07\uFE0F ",
            "\u2199\uFE0F ",
            "\u2B05\uFE0F ",
            "\u2196\uFE0F "
          ]
        },
        arrow3: {
          interval: 120,
          frames: [
            "\u25B9\u25B9\u25B9\u25B9\u25B9",
            "\u25B8\u25B9\u25B9\u25B9\u25B9",
            "\u25B9\u25B8\u25B9\u25B9\u25B9",
            "\u25B9\u25B9\u25B8\u25B9\u25B9",
            "\u25B9\u25B9\u25B9\u25B8\u25B9",
            "\u25B9\u25B9\u25B9\u25B9\u25B8"
          ]
        },
        bouncingBar: {
          interval: 80,
          frames: [
            "[    ]",
            "[=   ]",
            "[==  ]",
            "[=== ]",
            "[ ===]",
            "[  ==]",
            "[   =]",
            "[    ]",
            "[   =]",
            "[  ==]",
            "[ ===]",
            "[====]",
            "[=== ]",
            "[==  ]",
            "[=   ]"
          ]
        },
        bouncingBall: {
          interval: 80,
          frames: [
            "( \u25CF    )",
            "(  \u25CF   )",
            "(   \u25CF  )",
            "(    \u25CF )",
            "(     \u25CF)",
            "(    \u25CF )",
            "(   \u25CF  )",
            "(  \u25CF   )",
            "( \u25CF    )",
            "(\u25CF     )"
          ]
        },
        smiley: {
          interval: 200,
          frames: [
            "\u{1F604} ",
            "\u{1F61D} "
          ]
        },
        monkey: {
          interval: 300,
          frames: [
            "\u{1F648} ",
            "\u{1F648} ",
            "\u{1F649} ",
            "\u{1F64A} "
          ]
        },
        hearts: {
          interval: 100,
          frames: [
            "\u{1F49B} ",
            "\u{1F499} ",
            "\u{1F49C} ",
            "\u{1F49A} ",
            "\u2764\uFE0F "
          ]
        },
        clock: {
          interval: 100,
          frames: [
            "\u{1F55B} ",
            "\u{1F550} ",
            "\u{1F551} ",
            "\u{1F552} ",
            "\u{1F553} ",
            "\u{1F554} ",
            "\u{1F555} ",
            "\u{1F556} ",
            "\u{1F557} ",
            "\u{1F558} ",
            "\u{1F559} ",
            "\u{1F55A} "
          ]
        },
        earth: {
          interval: 180,
          frames: [
            "\u{1F30D} ",
            "\u{1F30E} ",
            "\u{1F30F} "
          ]
        },
        material: {
          interval: 17,
          frames: [
            "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
            "\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
            "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
            "\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
            "\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
            "\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
            "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
            "\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2588",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581",
            "\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581\u2581"
          ]
        },
        moon: {
          interval: 80,
          frames: [
            "\u{1F311} ",
            "\u{1F312} ",
            "\u{1F313} ",
            "\u{1F314} ",
            "\u{1F315} ",
            "\u{1F316} ",
            "\u{1F317} ",
            "\u{1F318} "
          ]
        },
        runner: {
          interval: 140,
          frames: [
            "\u{1F6B6} ",
            "\u{1F3C3} "
          ]
        },
        pong: {
          interval: 80,
          frames: [
            "\u2590\u2802       \u258C",
            "\u2590\u2808       \u258C",
            "\u2590 \u2802      \u258C",
            "\u2590 \u2820      \u258C",
            "\u2590  \u2840     \u258C",
            "\u2590  \u2820     \u258C",
            "\u2590   \u2802    \u258C",
            "\u2590   \u2808    \u258C",
            "\u2590    \u2802   \u258C",
            "\u2590    \u2820   \u258C",
            "\u2590     \u2840  \u258C",
            "\u2590     \u2820  \u258C",
            "\u2590      \u2802 \u258C",
            "\u2590      \u2808 \u258C",
            "\u2590       \u2802\u258C",
            "\u2590       \u2820\u258C",
            "\u2590       \u2840\u258C",
            "\u2590      \u2820 \u258C",
            "\u2590      \u2802 \u258C",
            "\u2590     \u2808  \u258C",
            "\u2590     \u2802  \u258C",
            "\u2590    \u2820   \u258C",
            "\u2590    \u2840   \u258C",
            "\u2590   \u2820    \u258C",
            "\u2590   \u2802    \u258C",
            "\u2590  \u2808     \u258C",
            "\u2590  \u2802     \u258C",
            "\u2590 \u2820      \u258C",
            "\u2590 \u2840      \u258C",
            "\u2590\u2820       \u258C"
          ]
        },
        shark: {
          interval: 120,
          frames: [
            "\u2590|\\____________\u258C",
            "\u2590_|\\___________\u258C",
            "\u2590__|\\__________\u258C",
            "\u2590___|\\_________\u258C",
            "\u2590____|\\________\u258C",
            "\u2590_____|\\_______\u258C",
            "\u2590______|\\______\u258C",
            "\u2590_______|\\_____\u258C",
            "\u2590________|\\____\u258C",
            "\u2590_________|\\___\u258C",
            "\u2590__________|\\__\u258C",
            "\u2590___________|\\_\u258C",
            "\u2590____________|\\\u258C",
            "\u2590____________/|\u258C",
            "\u2590___________/|_\u258C",
            "\u2590__________/|__\u258C",
            "\u2590_________/|___\u258C",
            "\u2590________/|____\u258C",
            "\u2590_______/|_____\u258C",
            "\u2590______/|______\u258C",
            "\u2590_____/|_______\u258C",
            "\u2590____/|________\u258C",
            "\u2590___/|_________\u258C",
            "\u2590__/|__________\u258C",
            "\u2590_/|___________\u258C",
            "\u2590/|____________\u258C"
          ]
        },
        dqpb: {
          interval: 100,
          frames: [
            "d",
            "q",
            "p",
            "b"
          ]
        },
        weather: {
          interval: 100,
          frames: [
            "\u2600\uFE0F ",
            "\u2600\uFE0F ",
            "\u2600\uFE0F ",
            "\u{1F324} ",
            "\u26C5\uFE0F ",
            "\u{1F325} ",
            "\u2601\uFE0F ",
            "\u{1F327} ",
            "\u{1F328} ",
            "\u{1F327} ",
            "\u{1F328} ",
            "\u{1F327} ",
            "\u{1F328} ",
            "\u26C8 ",
            "\u{1F328} ",
            "\u{1F327} ",
            "\u{1F328} ",
            "\u2601\uFE0F ",
            "\u{1F325} ",
            "\u26C5\uFE0F ",
            "\u{1F324} ",
            "\u2600\uFE0F ",
            "\u2600\uFE0F "
          ]
        },
        christmas: {
          interval: 400,
          frames: [
            "\u{1F332}",
            "\u{1F384}"
          ]
        },
        grenade: {
          interval: 80,
          frames: [
            "\u060C  ",
            "\u2032  ",
            " \xB4 ",
            " \u203E ",
            "  \u2E0C",
            "  \u2E0A",
            "  |",
            "  \u204E",
            "  \u2055",
            " \u0DF4 ",
            "  \u2053",
            "   ",
            "   ",
            "   "
          ]
        },
        point: {
          interval: 125,
          frames: [
            "\u2219\u2219\u2219",
            "\u25CF\u2219\u2219",
            "\u2219\u25CF\u2219",
            "\u2219\u2219\u25CF",
            "\u2219\u2219\u2219"
          ]
        },
        layer: {
          interval: 150,
          frames: [
            "-",
            "=",
            "\u2261"
          ]
        },
        betaWave: {
          interval: 80,
          frames: [
            "\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2",
            "\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2\u03B2",
            "\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2\u03B2",
            "\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2\u03B2",
            "\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2\u03B2",
            "\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1\u03B2",
            "\u03B2\u03B2\u03B2\u03B2\u03B2\u03B2\u03C1"
          ]
        },
        fingerDance: {
          interval: 160,
          frames: [
            "\u{1F918} ",
            "\u{1F91F} ",
            "\u{1F596} ",
            "\u270B ",
            "\u{1F91A} ",
            "\u{1F446} "
          ]
        },
        fistBump: {
          interval: 80,
          frames: [
            "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
            "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
            "\u{1F91C}\u3000\u3000\u3000\u3000\u{1F91B} ",
            "\u3000\u{1F91C}\u3000\u3000\u{1F91B}\u3000 ",
            "\u3000\u3000\u{1F91C}\u{1F91B}\u3000\u3000 ",
            "\u3000\u{1F91C}\u2728\u{1F91B}\u3000\u3000 ",
            "\u{1F91C}\u3000\u2728\u3000\u{1F91B}\u3000 "
          ]
        },
        soccerHeader: {
          interval: 80,
          frames: [
            " \u{1F9D1}\u26BD\uFE0F       \u{1F9D1} ",
            "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} ",
            "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
            "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
            "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
            "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
            "\u{1F9D1}       \u26BD\uFE0F\u{1F9D1}  ",
            "\u{1F9D1}      \u26BD\uFE0F  \u{1F9D1} ",
            "\u{1F9D1}     \u26BD\uFE0F   \u{1F9D1} ",
            "\u{1F9D1}    \u26BD\uFE0F    \u{1F9D1} ",
            "\u{1F9D1}   \u26BD\uFE0F     \u{1F9D1} ",
            "\u{1F9D1}  \u26BD\uFE0F      \u{1F9D1} "
          ]
        },
        mindblown: {
          interval: 160,
          frames: [
            "\u{1F610} ",
            "\u{1F610} ",
            "\u{1F62E} ",
            "\u{1F62E} ",
            "\u{1F626} ",
            "\u{1F626} ",
            "\u{1F627} ",
            "\u{1F627} ",
            "\u{1F92F} ",
            "\u{1F4A5} ",
            "\u2728 ",
            "\u3000 ",
            "\u3000 ",
            "\u3000 "
          ]
        },
        speaker: {
          interval: 160,
          frames: [
            "\u{1F508} ",
            "\u{1F509} ",
            "\u{1F50A} ",
            "\u{1F509} "
          ]
        },
        orangePulse: {
          interval: 100,
          frames: [
            "\u{1F538} ",
            "\u{1F536} ",
            "\u{1F7E0} ",
            "\u{1F7E0} ",
            "\u{1F536} "
          ]
        },
        bluePulse: {
          interval: 100,
          frames: [
            "\u{1F539} ",
            "\u{1F537} ",
            "\u{1F535} ",
            "\u{1F535} ",
            "\u{1F537} "
          ]
        },
        orangeBluePulse: {
          interval: 100,
          frames: [
            "\u{1F538} ",
            "\u{1F536} ",
            "\u{1F7E0} ",
            "\u{1F7E0} ",
            "\u{1F536} ",
            "\u{1F539} ",
            "\u{1F537} ",
            "\u{1F535} ",
            "\u{1F535} ",
            "\u{1F537} "
          ]
        },
        timeTravel: {
          interval: 100,
          frames: [
            "\u{1F55B} ",
            "\u{1F55A} ",
            "\u{1F559} ",
            "\u{1F558} ",
            "\u{1F557} ",
            "\u{1F556} ",
            "\u{1F555} ",
            "\u{1F554} ",
            "\u{1F553} ",
            "\u{1F552} ",
            "\u{1F551} ",
            "\u{1F550} "
          ]
        },
        aesthetic: {
          interval: 80,
          frames: [
            "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1",
            "\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1",
            "\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1\u25B1",
            "\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1\u25B1",
            "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1\u25B1",
            "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B1",
            "\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0\u25B0",
            "\u25B0\u25B1\u25B1\u25B1\u25B1\u25B1\u25B1"
          ]
        }
      };
    }
  });

  // ../../node_modules/cli-spinners/index.js
  var require_cli_spinners = __commonJS({
    "../../node_modules/cli-spinners/index.js"(exports, module) {
      "use strict";
      var spinners = Object.assign({}, require_spinners());
      var spinnersList = Object.keys(spinners);
      Object.defineProperty(spinners, "random", {
        get() {
          const randomIndex = Math.floor(Math.random() * spinnersList.length);
          const spinnerName = spinnersList[randomIndex];
          return spinners[spinnerName];
        }
      });
      module.exports = spinners;
      module.exports.default = spinners;
    }
  });

  // ../../node_modules/clone/clone.js
  var require_clone3 = __commonJS({
    "../../node_modules/clone/clone.js"(exports, module) {
      var clone = function() {
        "use strict";
        function clone2(parent, circular, depth, prototype) {
          var filter;
          if (typeof circular === "object") {
            depth = circular.depth;
            prototype = circular.prototype;
            filter = circular.filter;
            circular = circular.circular;
          }
          var allParents = [];
          var allChildren = [];
          var useBuffer = typeof Buffer != "undefined";
          if (typeof circular == "undefined")
            circular = true;
          if (typeof depth == "undefined")
            depth = Infinity;
          function _clone(parent2, depth2) {
            if (parent2 === null)
              return null;
            if (depth2 == 0)
              return parent2;
            var child;
            var proto;
            if (typeof parent2 != "object") {
              return parent2;
            }
            if (clone2.__isArray(parent2)) {
              child = [];
            } else if (clone2.__isRegExp(parent2)) {
              child = new RegExp(parent2.source, __getRegExpFlags(parent2));
              if (parent2.lastIndex)
                child.lastIndex = parent2.lastIndex;
            } else if (clone2.__isDate(parent2)) {
              child = new Date(parent2.getTime());
            } else if (useBuffer && Buffer.isBuffer(parent2)) {
              if (Buffer.allocUnsafe) {
                child = Buffer.allocUnsafe(parent2.length);
              } else {
                child = new Buffer(parent2.length);
              }
              parent2.copy(child);
              return child;
            } else {
              if (typeof prototype == "undefined") {
                proto = Object.getPrototypeOf(parent2);
                child = Object.create(proto);
              } else {
                child = Object.create(prototype);
                proto = prototype;
              }
            }
            if (circular) {
              var index = allParents.indexOf(parent2);
              if (index != -1) {
                return allChildren[index];
              }
              allParents.push(parent2);
              allChildren.push(child);
            }
            for (var i in parent2) {
              var attrs;
              if (proto) {
                attrs = Object.getOwnPropertyDescriptor(proto, i);
              }
              if (attrs && attrs.set == null) {
                continue;
              }
              child[i] = _clone(parent2[i], depth2 - 1);
            }
            return child;
          }
          return _clone(parent, depth);
        }
        clone2.clonePrototype = function clonePrototype(parent) {
          if (parent === null)
            return null;
          var c = function() {
          };
          c.prototype = parent;
          return new c();
        };
        function __objToStr(o) {
          return Object.prototype.toString.call(o);
        }
        ;
        clone2.__objToStr = __objToStr;
        function __isDate(o) {
          return typeof o === "object" && __objToStr(o) === "[object Date]";
        }
        ;
        clone2.__isDate = __isDate;
        function __isArray(o) {
          return typeof o === "object" && __objToStr(o) === "[object Array]";
        }
        ;
        clone2.__isArray = __isArray;
        function __isRegExp(o) {
          return typeof o === "object" && __objToStr(o) === "[object RegExp]";
        }
        ;
        clone2.__isRegExp = __isRegExp;
        function __getRegExpFlags(re) {
          var flags = "";
          if (re.global)
            flags += "g";
          if (re.ignoreCase)
            flags += "i";
          if (re.multiline)
            flags += "m";
          return flags;
        }
        ;
        clone2.__getRegExpFlags = __getRegExpFlags;
        return clone2;
      }();
      if (typeof module === "object" && module.exports) {
        module.exports = clone;
      }
    }
  });

  // ../../node_modules/defaults/index.js
  var require_defaults = __commonJS({
    "../../node_modules/defaults/index.js"(exports, module) {
      var clone = require_clone3();
      module.exports = function(options, defaults) {
        options = options || {};
        Object.keys(defaults).forEach(function(key) {
          if (typeof options[key] === "undefined") {
            options[key] = clone(defaults[key]);
          }
        });
        return options;
      };
    }
  });

  // ../../node_modules/wcwidth/combining.js
  var require_combining = __commonJS({
    "../../node_modules/wcwidth/combining.js"(exports, module) {
      module.exports = [
        [768, 879],
        [1155, 1158],
        [1160, 1161],
        [1425, 1469],
        [1471, 1471],
        [1473, 1474],
        [1476, 1477],
        [1479, 1479],
        [1536, 1539],
        [1552, 1557],
        [1611, 1630],
        [1648, 1648],
        [1750, 1764],
        [1767, 1768],
        [1770, 1773],
        [1807, 1807],
        [1809, 1809],
        [1840, 1866],
        [1958, 1968],
        [2027, 2035],
        [2305, 2306],
        [2364, 2364],
        [2369, 2376],
        [2381, 2381],
        [2385, 2388],
        [2402, 2403],
        [2433, 2433],
        [2492, 2492],
        [2497, 2500],
        [2509, 2509],
        [2530, 2531],
        [2561, 2562],
        [2620, 2620],
        [2625, 2626],
        [2631, 2632],
        [2635, 2637],
        [2672, 2673],
        [2689, 2690],
        [2748, 2748],
        [2753, 2757],
        [2759, 2760],
        [2765, 2765],
        [2786, 2787],
        [2817, 2817],
        [2876, 2876],
        [2879, 2879],
        [2881, 2883],
        [2893, 2893],
        [2902, 2902],
        [2946, 2946],
        [3008, 3008],
        [3021, 3021],
        [3134, 3136],
        [3142, 3144],
        [3146, 3149],
        [3157, 3158],
        [3260, 3260],
        [3263, 3263],
        [3270, 3270],
        [3276, 3277],
        [3298, 3299],
        [3393, 3395],
        [3405, 3405],
        [3530, 3530],
        [3538, 3540],
        [3542, 3542],
        [3633, 3633],
        [3636, 3642],
        [3655, 3662],
        [3761, 3761],
        [3764, 3769],
        [3771, 3772],
        [3784, 3789],
        [3864, 3865],
        [3893, 3893],
        [3895, 3895],
        [3897, 3897],
        [3953, 3966],
        [3968, 3972],
        [3974, 3975],
        [3984, 3991],
        [3993, 4028],
        [4038, 4038],
        [4141, 4144],
        [4146, 4146],
        [4150, 4151],
        [4153, 4153],
        [4184, 4185],
        [4448, 4607],
        [4959, 4959],
        [5906, 5908],
        [5938, 5940],
        [5970, 5971],
        [6002, 6003],
        [6068, 6069],
        [6071, 6077],
        [6086, 6086],
        [6089, 6099],
        [6109, 6109],
        [6155, 6157],
        [6313, 6313],
        [6432, 6434],
        [6439, 6440],
        [6450, 6450],
        [6457, 6459],
        [6679, 6680],
        [6912, 6915],
        [6964, 6964],
        [6966, 6970],
        [6972, 6972],
        [6978, 6978],
        [7019, 7027],
        [7616, 7626],
        [7678, 7679],
        [8203, 8207],
        [8234, 8238],
        [8288, 8291],
        [8298, 8303],
        [8400, 8431],
        [12330, 12335],
        [12441, 12442],
        [43014, 43014],
        [43019, 43019],
        [43045, 43046],
        [64286, 64286],
        [65024, 65039],
        [65056, 65059],
        [65279, 65279],
        [65529, 65531],
        [68097, 68099],
        [68101, 68102],
        [68108, 68111],
        [68152, 68154],
        [68159, 68159],
        [119143, 119145],
        [119155, 119170],
        [119173, 119179],
        [119210, 119213],
        [119362, 119364],
        [917505, 917505],
        [917536, 917631],
        [917760, 917999]
      ];
    }
  });

  // ../../node_modules/wcwidth/index.js
  var require_wcwidth = __commonJS({
    "../../node_modules/wcwidth/index.js"(exports, module) {
      "use strict";
      var defaults = require_defaults();
      var combining = require_combining();
      var DEFAULTS = {
        nul: 0,
        control: 0
      };
      module.exports = function wcwidth3(str) {
        return wcswidth(str, DEFAULTS);
      };
      module.exports.config = function(opts) {
        opts = defaults(opts || {}, DEFAULTS);
        return function wcwidth3(str) {
          return wcswidth(str, opts);
        };
      };
      function wcswidth(str, opts) {
        if (typeof str !== "string")
          return wcwidth2(str, opts);
        var s = 0;
        for (var i = 0; i < str.length; i++) {
          var n = wcwidth2(str.charCodeAt(i), opts);
          if (n < 0)
            return -1;
          s += n;
        }
        return s;
      }
      function wcwidth2(ucs, opts) {
        if (ucs === 0)
          return opts.nul;
        if (ucs < 32 || ucs >= 127 && ucs < 160)
          return opts.control;
        if (bisearch(ucs))
          return 0;
        return 1 + (ucs >= 4352 && (ucs <= 4447 || ucs == 9001 || ucs == 9002 || ucs >= 11904 && ucs <= 42191 && ucs != 12351 || ucs >= 44032 && ucs <= 55203 || ucs >= 63744 && ucs <= 64255 || ucs >= 65040 && ucs <= 65049 || ucs >= 65072 && ucs <= 65135 || ucs >= 65280 && ucs <= 65376 || ucs >= 65504 && ucs <= 65510 || ucs >= 131072 && ucs <= 196605 || ucs >= 196608 && ucs <= 262141));
      }
      function bisearch(ucs) {
        var min = 0;
        var max = combining.length - 1;
        var mid;
        if (ucs < combining[0][0] || ucs > combining[max][1])
          return false;
        while (max >= min) {
          mid = Math.floor((min + max) / 2);
          if (ucs > combining[mid][1])
            min = mid + 1;
          else if (ucs < combining[mid][0])
            max = mid - 1;
          else
            return true;
        }
        return false;
      }
    }
  });

  // ../../node_modules/readable-stream/lib/internal/streams/stream.js
  var require_stream = __commonJS({
    "../../node_modules/readable-stream/lib/internal/streams/stream.js"(exports, module) {
      module.exports = __require("stream");
    }
  });

  // ../../node_modules/readable-stream/lib/internal/streams/buffer_list.js
  var require_buffer_list = __commonJS({
    "../../node_modules/readable-stream/lib/internal/streams/buffer_list.js"(exports, module) {
      "use strict";
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        return Constructor;
      }
      var _require = __require("buffer");
      var Buffer2 = _require.Buffer;
      var _require2 = __require("util");
      var inspect = _require2.inspect;
      var custom = inspect && inspect.custom || "inspect";
      function copyBuffer(src, target, offset) {
        Buffer2.prototype.copy.call(src, target, offset);
      }
      module.exports = /* @__PURE__ */ function() {
        function BufferList() {
          _classCallCheck(this, BufferList);
          this.head = null;
          this.tail = null;
          this.length = 0;
        }
        _createClass(BufferList, [{
          key: "push",
          value: function push(v) {
            var entry = {
              data: v,
              next: null
            };
            if (this.length > 0)
              this.tail.next = entry;
            else
              this.head = entry;
            this.tail = entry;
            ++this.length;
          }
        }, {
          key: "unshift",
          value: function unshift(v) {
            var entry = {
              data: v,
              next: this.head
            };
            if (this.length === 0)
              this.tail = entry;
            this.head = entry;
            ++this.length;
          }
        }, {
          key: "shift",
          value: function shift() {
            if (this.length === 0)
              return;
            var ret = this.head.data;
            if (this.length === 1)
              this.head = this.tail = null;
            else
              this.head = this.head.next;
            --this.length;
            return ret;
          }
        }, {
          key: "clear",
          value: function clear() {
            this.head = this.tail = null;
            this.length = 0;
          }
        }, {
          key: "join",
          value: function join(s) {
            if (this.length === 0)
              return "";
            var p = this.head;
            var ret = "" + p.data;
            while (p = p.next) {
              ret += s + p.data;
            }
            return ret;
          }
        }, {
          key: "concat",
          value: function concat(n) {
            if (this.length === 0)
              return Buffer2.alloc(0);
            var ret = Buffer2.allocUnsafe(n >>> 0);
            var p = this.head;
            var i = 0;
            while (p) {
              copyBuffer(p.data, ret, i);
              i += p.data.length;
              p = p.next;
            }
            return ret;
          }
        }, {
          key: "consume",
          value: function consume(n, hasStrings) {
            var ret;
            if (n < this.head.data.length) {
              ret = this.head.data.slice(0, n);
              this.head.data = this.head.data.slice(n);
            } else if (n === this.head.data.length) {
              ret = this.shift();
            } else {
              ret = hasStrings ? this._getString(n) : this._getBuffer(n);
            }
            return ret;
          }
        }, {
          key: "first",
          value: function first() {
            return this.head.data;
          }
        }, {
          key: "_getString",
          value: function _getString(n) {
            var p = this.head;
            var c = 1;
            var ret = p.data;
            n -= ret.length;
            while (p = p.next) {
              var str = p.data;
              var nb = n > str.length ? str.length : n;
              if (nb === str.length)
                ret += str;
              else
                ret += str.slice(0, n);
              n -= nb;
              if (n === 0) {
                if (nb === str.length) {
                  ++c;
                  if (p.next)
                    this.head = p.next;
                  else
                    this.head = this.tail = null;
                } else {
                  this.head = p;
                  p.data = str.slice(nb);
                }
                break;
              }
              ++c;
            }
            this.length -= c;
            return ret;
          }
        }, {
          key: "_getBuffer",
          value: function _getBuffer(n) {
            var ret = Buffer2.allocUnsafe(n);
            var p = this.head;
            var c = 1;
            p.data.copy(ret);
            n -= p.data.length;
            while (p = p.next) {
              var buf = p.data;
              var nb = n > buf.length ? buf.length : n;
              buf.copy(ret, ret.length - n, 0, nb);
              n -= nb;
              if (n === 0) {
                if (nb === buf.length) {
                  ++c;
                  if (p.next)
                    this.head = p.next;
                  else
                    this.head = this.tail = null;
                } else {
                  this.head = p;
                  p.data = buf.slice(nb);
                }
                break;
              }
              ++c;
            }
            this.length -= c;
            return ret;
          }
        }, {
          key: custom,
          value: function value(_, options) {
            return inspect(this, _objectSpread({}, options, {
              depth: 0,
              customInspect: false
            }));
          }
        }]);
        return BufferList;
      }();
    }
  });

  // ../../node_modules/readable-stream/lib/internal/streams/destroy.js
  var require_destroy = __commonJS({
    "../../node_modules/readable-stream/lib/internal/streams/destroy.js"(exports, module) {
      "use strict";
      function destroy(err, cb) {
        var _this = this;
        var readableDestroyed = this._readableState && this._readableState.destroyed;
        var writableDestroyed = this._writableState && this._writableState.destroyed;
        if (readableDestroyed || writableDestroyed) {
          if (cb) {
            cb(err);
          } else if (err) {
            if (!this._writableState) {
              process.nextTick(emitErrorNT, this, err);
            } else if (!this._writableState.errorEmitted) {
              this._writableState.errorEmitted = true;
              process.nextTick(emitErrorNT, this, err);
            }
          }
          return this;
        }
        if (this._readableState) {
          this._readableState.destroyed = true;
        }
        if (this._writableState) {
          this._writableState.destroyed = true;
        }
        this._destroy(err || null, function(err2) {
          if (!cb && err2) {
            if (!_this._writableState) {
              process.nextTick(emitErrorAndCloseNT, _this, err2);
            } else if (!_this._writableState.errorEmitted) {
              _this._writableState.errorEmitted = true;
              process.nextTick(emitErrorAndCloseNT, _this, err2);
            } else {
              process.nextTick(emitCloseNT, _this);
            }
          } else if (cb) {
            process.nextTick(emitCloseNT, _this);
            cb(err2);
          } else {
            process.nextTick(emitCloseNT, _this);
          }
        });
        return this;
      }
      function emitErrorAndCloseNT(self2, err) {
        emitErrorNT(self2, err);
        emitCloseNT(self2);
      }
      function emitCloseNT(self2) {
        if (self2._writableState && !self2._writableState.emitClose)
          return;
        if (self2._readableState && !self2._readableState.emitClose)
          return;
        self2.emit("close");
      }
      function undestroy() {
        if (this._readableState) {
          this._readableState.destroyed = false;
          this._readableState.reading = false;
          this._readableState.ended = false;
          this._readableState.endEmitted = false;
        }
        if (this._writableState) {
          this._writableState.destroyed = false;
          this._writableState.ended = false;
          this._writableState.ending = false;
          this._writableState.finalCalled = false;
          this._writableState.prefinished = false;
          this._writableState.finished = false;
          this._writableState.errorEmitted = false;
        }
      }
      function emitErrorNT(self2, err) {
        self2.emit("error", err);
      }
      function errorOrDestroy(stream, err) {
        var rState = stream._readableState;
        var wState = stream._writableState;
        if (rState && rState.autoDestroy || wState && wState.autoDestroy)
          stream.destroy(err);
        else
          stream.emit("error", err);
      }
      module.exports = {
        destroy,
        undestroy,
        errorOrDestroy
      };
    }
  });

  // ../../node_modules/readable-stream/errors.js
  var require_errors = __commonJS({
    "../../node_modules/readable-stream/errors.js"(exports, module) {
      "use strict";
      var codes = {};
      function createErrorType(code, message, Base) {
        if (!Base) {
          Base = Error;
        }
        function getMessage(arg1, arg2, arg3) {
          if (typeof message === "string") {
            return message;
          } else {
            return message(arg1, arg2, arg3);
          }
        }
        class NodeError extends Base {
          constructor(arg1, arg2, arg3) {
            super(getMessage(arg1, arg2, arg3));
          }
        }
        NodeError.prototype.name = Base.name;
        NodeError.prototype.code = code;
        codes[code] = NodeError;
      }
      function oneOf(expected, thing) {
        if (Array.isArray(expected)) {
          const len = expected.length;
          expected = expected.map((i) => String(i));
          if (len > 2) {
            return `one of ${thing} ${expected.slice(0, len - 1).join(", ")}, or ` + expected[len - 1];
          } else if (len === 2) {
            return `one of ${thing} ${expected[0]} or ${expected[1]}`;
          } else {
            return `of ${thing} ${expected[0]}`;
          }
        } else {
          return `of ${thing} ${String(expected)}`;
        }
      }
      function startsWith(str, search, pos) {
        return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
      }
      function endsWith(str, search, this_len) {
        if (this_len === void 0 || this_len > str.length) {
          this_len = str.length;
        }
        return str.substring(this_len - search.length, this_len) === search;
      }
      function includes(str, search, start) {
        if (typeof start !== "number") {
          start = 0;
        }
        if (start + search.length > str.length) {
          return false;
        } else {
          return str.indexOf(search, start) !== -1;
        }
      }
      createErrorType("ERR_INVALID_OPT_VALUE", function(name, value) {
        return 'The value "' + value + '" is invalid for option "' + name + '"';
      }, TypeError);
      createErrorType("ERR_INVALID_ARG_TYPE", function(name, expected, actual) {
        let determiner;
        if (typeof expected === "string" && startsWith(expected, "not ")) {
          determiner = "must not be";
          expected = expected.replace(/^not /, "");
        } else {
          determiner = "must be";
        }
        let msg;
        if (endsWith(name, " argument")) {
          msg = `The ${name} ${determiner} ${oneOf(expected, "type")}`;
        } else {
          const type = includes(name, ".") ? "property" : "argument";
          msg = `The "${name}" ${type} ${determiner} ${oneOf(expected, "type")}`;
        }
        msg += `. Received type ${typeof actual}`;
        return msg;
      }, TypeError);
      createErrorType("ERR_STREAM_PUSH_AFTER_EOF", "stream.push() after EOF");
      createErrorType("ERR_METHOD_NOT_IMPLEMENTED", function(name) {
        return "The " + name + " method is not implemented";
      });
      createErrorType("ERR_STREAM_PREMATURE_CLOSE", "Premature close");
      createErrorType("ERR_STREAM_DESTROYED", function(name) {
        return "Cannot call " + name + " after a stream was destroyed";
      });
      createErrorType("ERR_MULTIPLE_CALLBACK", "Callback called multiple times");
      createErrorType("ERR_STREAM_CANNOT_PIPE", "Cannot pipe, not readable");
      createErrorType("ERR_STREAM_WRITE_AFTER_END", "write after end");
      createErrorType("ERR_STREAM_NULL_VALUES", "May not write null values to stream", TypeError);
      createErrorType("ERR_UNKNOWN_ENCODING", function(arg) {
        return "Unknown encoding: " + arg;
      }, TypeError);
      createErrorType("ERR_STREAM_UNSHIFT_AFTER_END_EVENT", "stream.unshift() after end event");
      module.exports.codes = codes;
    }
  });

  // ../../node_modules/readable-stream/lib/internal/streams/state.js
  var require_state = __commonJS({
    "../../node_modules/readable-stream/lib/internal/streams/state.js"(exports, module) {
      "use strict";
      var ERR_INVALID_OPT_VALUE = require_errors().codes.ERR_INVALID_OPT_VALUE;
      function highWaterMarkFrom(options, isDuplex, duplexKey) {
        return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
      }
      function getHighWaterMark(state, options, duplexKey, isDuplex) {
        var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);
        if (hwm != null) {
          if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
            var name = isDuplex ? duplexKey : "highWaterMark";
            throw new ERR_INVALID_OPT_VALUE(name, hwm);
          }
          return Math.floor(hwm);
        }
        return state.objectMode ? 16 : 16 * 1024;
      }
      module.exports = {
        getHighWaterMark
      };
    }
  });

  // ../../node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "../../node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // ../../node_modules/inherits/inherits.js
  var require_inherits = __commonJS({
    "../../node_modules/inherits/inherits.js"(exports, module) {
      try {
        util = __require("util");
        if (typeof util.inherits !== "function")
          throw "";
        module.exports = util.inherits;
      } catch (e) {
        module.exports = require_inherits_browser();
      }
      var util;
    }
  });

  // ../../node_modules/util-deprecate/node.js
  var require_node2 = __commonJS({
    "../../node_modules/util-deprecate/node.js"(exports, module) {
      module.exports = __require("util").deprecate;
    }
  });

  // ../../node_modules/readable-stream/lib/_stream_writable.js
  var require_stream_writable = __commonJS({
    "../../node_modules/readable-stream/lib/_stream_writable.js"(exports, module) {
      "use strict";
      module.exports = Writable;
      function CorkedRequest(state) {
        var _this = this;
        this.next = null;
        this.entry = null;
        this.finish = function() {
          onCorkedFinish(_this, state);
        };
      }
      var Duplex;
      Writable.WritableState = WritableState;
      var internalUtil = {
        deprecate: require_node2()
      };
      var Stream = require_stream();
      var Buffer2 = __require("buffer").Buffer;
      var OurUint8Array = global.Uint8Array || function() {
      };
      function _uint8ArrayToBuffer(chunk) {
        return Buffer2.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
      }
      var destroyImpl = require_destroy();
      var _require = require_state();
      var getHighWaterMark = _require.getHighWaterMark;
      var _require$codes = require_errors().codes;
      var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
      var ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE;
      var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
      var ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES;
      var ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END;
      var ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;
      var errorOrDestroy = destroyImpl.errorOrDestroy;
      require_inherits()(Writable, Stream);
      function nop() {
      }
      function WritableState(options, stream, isDuplex) {
        Duplex = Duplex || require_stream_duplex();
        options = options || {};
        if (typeof isDuplex !== "boolean")
          isDuplex = stream instanceof Duplex;
        this.objectMode = !!options.objectMode;
        if (isDuplex)
          this.objectMode = this.objectMode || !!options.writableObjectMode;
        this.highWaterMark = getHighWaterMark(this, options, "writableHighWaterMark", isDuplex);
        this.finalCalled = false;
        this.needDrain = false;
        this.ending = false;
        this.ended = false;
        this.finished = false;
        this.destroyed = false;
        var noDecode = options.decodeStrings === false;
        this.decodeStrings = !noDecode;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.length = 0;
        this.writing = false;
        this.corked = 0;
        this.sync = true;
        this.bufferProcessing = false;
        this.onwrite = function(er) {
          onwrite(stream, er);
        };
        this.writecb = null;
        this.writelen = 0;
        this.bufferedRequest = null;
        this.lastBufferedRequest = null;
        this.pendingcb = 0;
        this.prefinished = false;
        this.errorEmitted = false;
        this.emitClose = options.emitClose !== false;
        this.autoDestroy = !!options.autoDestroy;
        this.bufferedRequestCount = 0;
        this.corkedRequestsFree = new CorkedRequest(this);
      }
      WritableState.prototype.getBuffer = function getBuffer() {
        var current = this.bufferedRequest;
        var out = [];
        while (current) {
          out.push(current);
          current = current.next;
        }
        return out;
      };
      (function() {
        try {
          Object.defineProperty(WritableState.prototype, "buffer", {
            get: internalUtil.deprecate(function writableStateBufferGetter() {
              return this.getBuffer();
            }, "_writableState.buffer is deprecated. Use _writableState.getBuffer instead.", "DEP0003")
          });
        } catch (_) {
        }
      })();
      var realHasInstance;
      if (typeof Symbol === "function" && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === "function") {
        realHasInstance = Function.prototype[Symbol.hasInstance];
        Object.defineProperty(Writable, Symbol.hasInstance, {
          value: function value(object) {
            if (realHasInstance.call(this, object))
              return true;
            if (this !== Writable)
              return false;
            return object && object._writableState instanceof WritableState;
          }
        });
      } else {
        realHasInstance = function realHasInstance2(object) {
          return object instanceof this;
        };
      }
      function Writable(options) {
        Duplex = Duplex || require_stream_duplex();
        var isDuplex = this instanceof Duplex;
        if (!isDuplex && !realHasInstance.call(Writable, this))
          return new Writable(options);
        this._writableState = new WritableState(options, this, isDuplex);
        this.writable = true;
        if (options) {
          if (typeof options.write === "function")
            this._write = options.write;
          if (typeof options.writev === "function")
            this._writev = options.writev;
          if (typeof options.destroy === "function")
            this._destroy = options.destroy;
          if (typeof options.final === "function")
            this._final = options.final;
        }
        Stream.call(this);
      }
      Writable.prototype.pipe = function() {
        errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
      };
      function writeAfterEnd(stream, cb) {
        var er = new ERR_STREAM_WRITE_AFTER_END();
        errorOrDestroy(stream, er);
        process.nextTick(cb, er);
      }
      function validChunk(stream, state, chunk, cb) {
        var er;
        if (chunk === null) {
          er = new ERR_STREAM_NULL_VALUES();
        } else if (typeof chunk !== "string" && !state.objectMode) {
          er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer"], chunk);
        }
        if (er) {
          errorOrDestroy(stream, er);
          process.nextTick(cb, er);
          return false;
        }
        return true;
      }
      Writable.prototype.write = function(chunk, encoding, cb) {
        var state = this._writableState;
        var ret = false;
        var isBuf = !state.objectMode && _isUint8Array(chunk);
        if (isBuf && !Buffer2.isBuffer(chunk)) {
          chunk = _uint8ArrayToBuffer(chunk);
        }
        if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (isBuf)
          encoding = "buffer";
        else if (!encoding)
          encoding = state.defaultEncoding;
        if (typeof cb !== "function")
          cb = nop;
        if (state.ending)
          writeAfterEnd(this, cb);
        else if (isBuf || validChunk(this, state, chunk, cb)) {
          state.pendingcb++;
          ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
        }
        return ret;
      };
      Writable.prototype.cork = function() {
        this._writableState.corked++;
      };
      Writable.prototype.uncork = function() {
        var state = this._writableState;
        if (state.corked) {
          state.corked--;
          if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest)
            clearBuffer(this, state);
        }
      };
      Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
        if (typeof encoding === "string")
          encoding = encoding.toLowerCase();
        if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((encoding + "").toLowerCase()) > -1))
          throw new ERR_UNKNOWN_ENCODING(encoding);
        this._writableState.defaultEncoding = encoding;
        return this;
      };
      Object.defineProperty(Writable.prototype, "writableBuffer", {
        enumerable: false,
        get: function get() {
          return this._writableState && this._writableState.getBuffer();
        }
      });
      function decodeChunk(state, chunk, encoding) {
        if (!state.objectMode && state.decodeStrings !== false && typeof chunk === "string") {
          chunk = Buffer2.from(chunk, encoding);
        }
        return chunk;
      }
      Object.defineProperty(Writable.prototype, "writableHighWaterMark", {
        enumerable: false,
        get: function get() {
          return this._writableState.highWaterMark;
        }
      });
      function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
        if (!isBuf) {
          var newChunk = decodeChunk(state, chunk, encoding);
          if (chunk !== newChunk) {
            isBuf = true;
            encoding = "buffer";
            chunk = newChunk;
          }
        }
        var len = state.objectMode ? 1 : chunk.length;
        state.length += len;
        var ret = state.length < state.highWaterMark;
        if (!ret)
          state.needDrain = true;
        if (state.writing || state.corked) {
          var last = state.lastBufferedRequest;
          state.lastBufferedRequest = {
            chunk,
            encoding,
            isBuf,
            callback: cb,
            next: null
          };
          if (last) {
            last.next = state.lastBufferedRequest;
          } else {
            state.bufferedRequest = state.lastBufferedRequest;
          }
          state.bufferedRequestCount += 1;
        } else {
          doWrite(stream, state, false, len, chunk, encoding, cb);
        }
        return ret;
      }
      function doWrite(stream, state, writev, len, chunk, encoding, cb) {
        state.writelen = len;
        state.writecb = cb;
        state.writing = true;
        state.sync = true;
        if (state.destroyed)
          state.onwrite(new ERR_STREAM_DESTROYED("write"));
        else if (writev)
          stream._writev(chunk, state.onwrite);
        else
          stream._write(chunk, encoding, state.onwrite);
        state.sync = false;
      }
      function onwriteError(stream, state, sync, er, cb) {
        --state.pendingcb;
        if (sync) {
          process.nextTick(cb, er);
          process.nextTick(finishMaybe, stream, state);
          stream._writableState.errorEmitted = true;
          errorOrDestroy(stream, er);
        } else {
          cb(er);
          stream._writableState.errorEmitted = true;
          errorOrDestroy(stream, er);
          finishMaybe(stream, state);
        }
      }
      function onwriteStateUpdate(state) {
        state.writing = false;
        state.writecb = null;
        state.length -= state.writelen;
        state.writelen = 0;
      }
      function onwrite(stream, er) {
        var state = stream._writableState;
        var sync = state.sync;
        var cb = state.writecb;
        if (typeof cb !== "function")
          throw new ERR_MULTIPLE_CALLBACK();
        onwriteStateUpdate(state);
        if (er)
          onwriteError(stream, state, sync, er, cb);
        else {
          var finished = needFinish(state) || stream.destroyed;
          if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
            clearBuffer(stream, state);
          }
          if (sync) {
            process.nextTick(afterWrite, stream, state, finished, cb);
          } else {
            afterWrite(stream, state, finished, cb);
          }
        }
      }
      function afterWrite(stream, state, finished, cb) {
        if (!finished)
          onwriteDrain(stream, state);
        state.pendingcb--;
        cb();
        finishMaybe(stream, state);
      }
      function onwriteDrain(stream, state) {
        if (state.length === 0 && state.needDrain) {
          state.needDrain = false;
          stream.emit("drain");
        }
      }
      function clearBuffer(stream, state) {
        state.bufferProcessing = true;
        var entry = state.bufferedRequest;
        if (stream._writev && entry && entry.next) {
          var l = state.bufferedRequestCount;
          var buffer = new Array(l);
          var holder = state.corkedRequestsFree;
          holder.entry = entry;
          var count = 0;
          var allBuffers = true;
          while (entry) {
            buffer[count] = entry;
            if (!entry.isBuf)
              allBuffers = false;
            entry = entry.next;
            count += 1;
          }
          buffer.allBuffers = allBuffers;
          doWrite(stream, state, true, state.length, buffer, "", holder.finish);
          state.pendingcb++;
          state.lastBufferedRequest = null;
          if (holder.next) {
            state.corkedRequestsFree = holder.next;
            holder.next = null;
          } else {
            state.corkedRequestsFree = new CorkedRequest(state);
          }
          state.bufferedRequestCount = 0;
        } else {
          while (entry) {
            var chunk = entry.chunk;
            var encoding = entry.encoding;
            var cb = entry.callback;
            var len = state.objectMode ? 1 : chunk.length;
            doWrite(stream, state, false, len, chunk, encoding, cb);
            entry = entry.next;
            state.bufferedRequestCount--;
            if (state.writing) {
              break;
            }
          }
          if (entry === null)
            state.lastBufferedRequest = null;
        }
        state.bufferedRequest = entry;
        state.bufferProcessing = false;
      }
      Writable.prototype._write = function(chunk, encoding, cb) {
        cb(new ERR_METHOD_NOT_IMPLEMENTED("_write()"));
      };
      Writable.prototype._writev = null;
      Writable.prototype.end = function(chunk, encoding, cb) {
        var state = this._writableState;
        if (typeof chunk === "function") {
          cb = chunk;
          chunk = null;
          encoding = null;
        } else if (typeof encoding === "function") {
          cb = encoding;
          encoding = null;
        }
        if (chunk !== null && chunk !== void 0)
          this.write(chunk, encoding);
        if (state.corked) {
          state.corked = 1;
          this.uncork();
        }
        if (!state.ending)
          endWritable(this, state, cb);
        return this;
      };
      Object.defineProperty(Writable.prototype, "writableLength", {
        enumerable: false,
        get: function get() {
          return this._writableState.length;
        }
      });
      function needFinish(state) {
        return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
      }
      function callFinal(stream, state) {
        stream._final(function(err) {
          state.pendingcb--;
          if (err) {
            errorOrDestroy(stream, err);
          }
          state.prefinished = true;
          stream.emit("prefinish");
          finishMaybe(stream, state);
        });
      }
      function prefinish(stream, state) {
        if (!state.prefinished && !state.finalCalled) {
          if (typeof stream._final === "function" && !state.destroyed) {
            state.pendingcb++;
            state.finalCalled = true;
            process.nextTick(callFinal, stream, state);
          } else {
            state.prefinished = true;
            stream.emit("prefinish");
          }
        }
      }
      function finishMaybe(stream, state) {
        var need = needFinish(state);
        if (need) {
          prefinish(stream, state);
          if (state.pendingcb === 0) {
            state.finished = true;
            stream.emit("finish");
            if (state.autoDestroy) {
              var rState = stream._readableState;
              if (!rState || rState.autoDestroy && rState.endEmitted) {
                stream.destroy();
              }
            }
          }
        }
        return need;
      }
      function endWritable(stream, state, cb) {
        state.ending = true;
        finishMaybe(stream, state);
        if (cb) {
          if (state.finished)
            process.nextTick(cb);
          else
            stream.once("finish", cb);
        }
        state.ended = true;
        stream.writable = false;
      }
      function onCorkedFinish(corkReq, state, err) {
        var entry = corkReq.entry;
        corkReq.entry = null;
        while (entry) {
          var cb = entry.callback;
          state.pendingcb--;
          cb(err);
          entry = entry.next;
        }
        state.corkedRequestsFree.next = corkReq;
      }
      Object.defineProperty(Writable.prototype, "destroyed", {
        enumerable: false,
        get: function get() {
          if (this._writableState === void 0) {
            return false;
          }
          return this._writableState.destroyed;
        },
        set: function set(value) {
          if (!this._writableState) {
            return;
          }
          this._writableState.destroyed = value;
        }
      });
      Writable.prototype.destroy = destroyImpl.destroy;
      Writable.prototype._undestroy = destroyImpl.undestroy;
      Writable.prototype._destroy = function(err, cb) {
        cb(err);
      };
    }
  });

  // ../../node_modules/readable-stream/lib/_stream_duplex.js
  var require_stream_duplex = __commonJS({
    "../../node_modules/readable-stream/lib/_stream_duplex.js"(exports, module) {
      "use strict";
      var objectKeys = Object.keys || function(obj) {
        var keys2 = [];
        for (var key in obj) {
          keys2.push(key);
        }
        return keys2;
      };
      module.exports = Duplex;
      var Readable = require_stream_readable();
      var Writable = require_stream_writable();
      require_inherits()(Duplex, Readable);
      {
        keys = objectKeys(Writable.prototype);
        for (v = 0; v < keys.length; v++) {
          method = keys[v];
          if (!Duplex.prototype[method])
            Duplex.prototype[method] = Writable.prototype[method];
        }
      }
      var keys;
      var method;
      var v;
      function Duplex(options) {
        if (!(this instanceof Duplex))
          return new Duplex(options);
        Readable.call(this, options);
        Writable.call(this, options);
        this.allowHalfOpen = true;
        if (options) {
          if (options.readable === false)
            this.readable = false;
          if (options.writable === false)
            this.writable = false;
          if (options.allowHalfOpen === false) {
            this.allowHalfOpen = false;
            this.once("end", onend);
          }
        }
      }
      Object.defineProperty(Duplex.prototype, "writableHighWaterMark", {
        enumerable: false,
        get: function get() {
          return this._writableState.highWaterMark;
        }
      });
      Object.defineProperty(Duplex.prototype, "writableBuffer", {
        enumerable: false,
        get: function get() {
          return this._writableState && this._writableState.getBuffer();
        }
      });
      Object.defineProperty(Duplex.prototype, "writableLength", {
        enumerable: false,
        get: function get() {
          return this._writableState.length;
        }
      });
      function onend() {
        if (this._writableState.ended)
          return;
        process.nextTick(onEndNT, this);
      }
      function onEndNT(self2) {
        self2.end();
      }
      Object.defineProperty(Duplex.prototype, "destroyed", {
        enumerable: false,
        get: function get() {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return false;
          }
          return this._readableState.destroyed && this._writableState.destroyed;
        },
        set: function set(value) {
          if (this._readableState === void 0 || this._writableState === void 0) {
            return;
          }
          this._readableState.destroyed = value;
          this._writableState.destroyed = value;
        }
      });
    }
  });

  // ../../node_modules/readable-stream/lib/internal/streams/end-of-stream.js
  var require_end_of_stream = __commonJS({
    "../../node_modules/readable-stream/lib/internal/streams/end-of-stream.js"(exports, module) {
      "use strict";
      var ERR_STREAM_PREMATURE_CLOSE = require_errors().codes.ERR_STREAM_PREMATURE_CLOSE;
      function once(callback) {
        var called = false;
        return function() {
          if (called)
            return;
          called = true;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          callback.apply(this, args);
        };
      }
      function noop() {
      }
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      function eos(stream, opts, callback) {
        if (typeof opts === "function")
          return eos(stream, null, opts);
        if (!opts)
          opts = {};
        callback = once(callback || noop);
        var readable = opts.readable || opts.readable !== false && stream.readable;
        var writable = opts.writable || opts.writable !== false && stream.writable;
        var onlegacyfinish = function onlegacyfinish2() {
          if (!stream.writable)
            onfinish();
        };
        var writableEnded = stream._writableState && stream._writableState.finished;
        var onfinish = function onfinish2() {
          writable = false;
          writableEnded = true;
          if (!readable)
            callback.call(stream);
        };
        var readableEnded = stream._readableState && stream._readableState.endEmitted;
        var onend = function onend2() {
          readable = false;
          readableEnded = true;
          if (!writable)
            callback.call(stream);
        };
        var onerror = function onerror2(err) {
          callback.call(stream, err);
        };
        var onclose = function onclose2() {
          var err;
          if (readable && !readableEnded) {
            if (!stream._readableState || !stream._readableState.ended)
              err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
          }
          if (writable && !writableEnded) {
            if (!stream._writableState || !stream._writableState.ended)
              err = new ERR_STREAM_PREMATURE_CLOSE();
            return callback.call(stream, err);
          }
        };
        var onrequest = function onrequest2() {
          stream.req.on("finish", onfinish);
        };
        if (isRequest(stream)) {
          stream.on("complete", onfinish);
          stream.on("abort", onclose);
          if (stream.req)
            onrequest();
          else
            stream.on("request", onrequest);
        } else if (writable && !stream._writableState) {
          stream.on("end", onlegacyfinish);
          stream.on("close", onlegacyfinish);
        }
        stream.on("end", onend);
        stream.on("finish", onfinish);
        if (opts.error !== false)
          stream.on("error", onerror);
        stream.on("close", onclose);
        return function() {
          stream.removeListener("complete", onfinish);
          stream.removeListener("abort", onclose);
          stream.removeListener("request", onrequest);
          if (stream.req)
            stream.req.removeListener("finish", onfinish);
          stream.removeListener("end", onlegacyfinish);
          stream.removeListener("close", onlegacyfinish);
          stream.removeListener("finish", onfinish);
          stream.removeListener("end", onend);
          stream.removeListener("error", onerror);
          stream.removeListener("close", onclose);
        };
      }
      module.exports = eos;
    }
  });

  // ../../node_modules/readable-stream/lib/internal/streams/async_iterator.js
  var require_async_iterator = __commonJS({
    "../../node_modules/readable-stream/lib/internal/streams/async_iterator.js"(exports, module) {
      "use strict";
      var _Object$setPrototypeO;
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      var finished = require_end_of_stream();
      var kLastResolve = Symbol("lastResolve");
      var kLastReject = Symbol("lastReject");
      var kError = Symbol("error");
      var kEnded = Symbol("ended");
      var kLastPromise = Symbol("lastPromise");
      var kHandlePromise = Symbol("handlePromise");
      var kStream = Symbol("stream");
      function createIterResult(value, done) {
        return {
          value,
          done
        };
      }
      function readAndResolve(iter) {
        var resolve = iter[kLastResolve];
        if (resolve !== null) {
          var data = iter[kStream].read();
          if (data !== null) {
            iter[kLastPromise] = null;
            iter[kLastResolve] = null;
            iter[kLastReject] = null;
            resolve(createIterResult(data, false));
          }
        }
      }
      function onReadable(iter) {
        process.nextTick(readAndResolve, iter);
      }
      function wrapForNext(lastPromise, iter) {
        return function(resolve, reject) {
          lastPromise.then(function() {
            if (iter[kEnded]) {
              resolve(createIterResult(void 0, true));
              return;
            }
            iter[kHandlePromise](resolve, reject);
          }, reject);
        };
      }
      var AsyncIteratorPrototype = Object.getPrototypeOf(function() {
      });
      var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
        get stream() {
          return this[kStream];
        },
        next: function next() {
          var _this = this;
          var error = this[kError];
          if (error !== null) {
            return Promise.reject(error);
          }
          if (this[kEnded]) {
            return Promise.resolve(createIterResult(void 0, true));
          }
          if (this[kStream].destroyed) {
            return new Promise(function(resolve, reject) {
              process.nextTick(function() {
                if (_this[kError]) {
                  reject(_this[kError]);
                } else {
                  resolve(createIterResult(void 0, true));
                }
              });
            });
          }
          var lastPromise = this[kLastPromise];
          var promise;
          if (lastPromise) {
            promise = new Promise(wrapForNext(lastPromise, this));
          } else {
            var data = this[kStream].read();
            if (data !== null) {
              return Promise.resolve(createIterResult(data, false));
            }
            promise = new Promise(this[kHandlePromise]);
          }
          this[kLastPromise] = promise;
          return promise;
        }
      }, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function() {
        return this;
      }), _defineProperty(_Object$setPrototypeO, "return", function _return() {
        var _this2 = this;
        return new Promise(function(resolve, reject) {
          _this2[kStream].destroy(null, function(err) {
            if (err) {
              reject(err);
              return;
            }
            resolve(createIterResult(void 0, true));
          });
        });
      }), _Object$setPrototypeO), AsyncIteratorPrototype);
      var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator2(stream) {
        var _Object$create;
        var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
          value: stream,
          writable: true
        }), _defineProperty(_Object$create, kLastResolve, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kLastReject, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kError, {
          value: null,
          writable: true
        }), _defineProperty(_Object$create, kEnded, {
          value: stream._readableState.endEmitted,
          writable: true
        }), _defineProperty(_Object$create, kHandlePromise, {
          value: function value(resolve, reject) {
            var data = iterator[kStream].read();
            if (data) {
              iterator[kLastPromise] = null;
              iterator[kLastResolve] = null;
              iterator[kLastReject] = null;
              resolve(createIterResult(data, false));
            } else {
              iterator[kLastResolve] = resolve;
              iterator[kLastReject] = reject;
            }
          },
          writable: true
        }), _Object$create));
        iterator[kLastPromise] = null;
        finished(stream, function(err) {
          if (err && err.code !== "ERR_STREAM_PREMATURE_CLOSE") {
            var reject = iterator[kLastReject];
            if (reject !== null) {
              iterator[kLastPromise] = null;
              iterator[kLastResolve] = null;
              iterator[kLastReject] = null;
              reject(err);
            }
            iterator[kError] = err;
            return;
          }
          var resolve = iterator[kLastResolve];
          if (resolve !== null) {
            iterator[kLastPromise] = null;
            iterator[kLastResolve] = null;
            iterator[kLastReject] = null;
            resolve(createIterResult(void 0, true));
          }
          iterator[kEnded] = true;
        });
        stream.on("readable", onReadable.bind(null, iterator));
        return iterator;
      };
      module.exports = createReadableStreamAsyncIterator;
    }
  });

  // ../../node_modules/readable-stream/lib/internal/streams/from.js
  var require_from = __commonJS({
    "../../node_modules/readable-stream/lib/internal/streams/from.js"(exports, module) {
      "use strict";
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      function ownKeys(object, enumerableOnly) {
        var keys = Object.keys(object);
        if (Object.getOwnPropertySymbols) {
          var symbols = Object.getOwnPropertySymbols(object);
          if (enumerableOnly)
            symbols = symbols.filter(function(sym) {
              return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
          keys.push.apply(keys, symbols);
        }
        return keys;
      }
      function _objectSpread(target) {
        for (var i = 1; i < arguments.length; i++) {
          var source = arguments[i] != null ? arguments[i] : {};
          if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
              _defineProperty(target, key, source[key]);
            });
          } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
          } else {
            ownKeys(Object(source)).forEach(function(key) {
              Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
            });
          }
        }
        return target;
      }
      function _defineProperty(obj, key, value) {
        if (key in obj) {
          Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
        } else {
          obj[key] = value;
        }
        return obj;
      }
      var ERR_INVALID_ARG_TYPE = require_errors().codes.ERR_INVALID_ARG_TYPE;
      function from(Readable, iterable, opts) {
        var iterator;
        if (iterable && typeof iterable.next === "function") {
          iterator = iterable;
        } else if (iterable && iterable[Symbol.asyncIterator])
          iterator = iterable[Symbol.asyncIterator]();
        else if (iterable && iterable[Symbol.iterator])
          iterator = iterable[Symbol.iterator]();
        else
          throw new ERR_INVALID_ARG_TYPE("iterable", ["Iterable"], iterable);
        var readable = new Readable(_objectSpread({
          objectMode: true
        }, opts));
        var reading = false;
        readable._read = function() {
          if (!reading) {
            reading = true;
            next();
          }
        };
        function next() {
          return _next2.apply(this, arguments);
        }
        function _next2() {
          _next2 = _asyncToGenerator(function* () {
            try {
              var _ref = yield iterator.next(), value = _ref.value, done = _ref.done;
              if (done) {
                readable.push(null);
              } else if (readable.push(yield value)) {
                next();
              } else {
                reading = false;
              }
            } catch (err) {
              readable.destroy(err);
            }
          });
          return _next2.apply(this, arguments);
        }
        return readable;
      }
      module.exports = from;
    }
  });

  // ../../node_modules/readable-stream/lib/_stream_readable.js
  var require_stream_readable = __commonJS({
    "../../node_modules/readable-stream/lib/_stream_readable.js"(exports, module) {
      "use strict";
      module.exports = Readable;
      var Duplex;
      Readable.ReadableState = ReadableState;
      var EE = __require("events").EventEmitter;
      var EElistenerCount = function EElistenerCount2(emitter, type) {
        return emitter.listeners(type).length;
      };
      var Stream = require_stream();
      var Buffer2 = __require("buffer").Buffer;
      var OurUint8Array = global.Uint8Array || function() {
      };
      function _uint8ArrayToBuffer(chunk) {
        return Buffer2.from(chunk);
      }
      function _isUint8Array(obj) {
        return Buffer2.isBuffer(obj) || obj instanceof OurUint8Array;
      }
      var debugUtil = __require("util");
      var debug;
      if (debugUtil && debugUtil.debuglog) {
        debug = debugUtil.debuglog("stream");
      } else {
        debug = function debug2() {
        };
      }
      var BufferList = require_buffer_list();
      var destroyImpl = require_destroy();
      var _require = require_state();
      var getHighWaterMark = _require.getHighWaterMark;
      var _require$codes = require_errors().codes;
      var ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE;
      var ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT;
      var StringDecoder;
      var createReadableStreamAsyncIterator;
      var from;
      require_inherits()(Readable, Stream);
      var errorOrDestroy = destroyImpl.errorOrDestroy;
      var kProxyEvents = ["error", "close", "destroy", "pause", "resume"];
      function prependListener(emitter, event, fn) {
        if (typeof emitter.prependListener === "function")
          return emitter.prependListener(event, fn);
        if (!emitter._events || !emitter._events[event])
          emitter.on(event, fn);
        else if (Array.isArray(emitter._events[event]))
          emitter._events[event].unshift(fn);
        else
          emitter._events[event] = [fn, emitter._events[event]];
      }
      function ReadableState(options, stream, isDuplex) {
        Duplex = Duplex || require_stream_duplex();
        options = options || {};
        if (typeof isDuplex !== "boolean")
          isDuplex = stream instanceof Duplex;
        this.objectMode = !!options.objectMode;
        if (isDuplex)
          this.objectMode = this.objectMode || !!options.readableObjectMode;
        this.highWaterMark = getHighWaterMark(this, options, "readableHighWaterMark", isDuplex);
        this.buffer = new BufferList();
        this.length = 0;
        this.pipes = null;
        this.pipesCount = 0;
        this.flowing = null;
        this.ended = false;
        this.endEmitted = false;
        this.reading = false;
        this.sync = true;
        this.needReadable = false;
        this.emittedReadable = false;
        this.readableListening = false;
        this.resumeScheduled = false;
        this.paused = true;
        this.emitClose = options.emitClose !== false;
        this.autoDestroy = !!options.autoDestroy;
        this.destroyed = false;
        this.defaultEncoding = options.defaultEncoding || "utf8";
        this.awaitDrain = 0;
        this.readingMore = false;
        this.decoder = null;
        this.encoding = null;
        if (options.encoding) {
          if (!StringDecoder)
            StringDecoder = __require("string_decoder/").StringDecoder;
          this.decoder = new StringDecoder(options.encoding);
          this.encoding = options.encoding;
        }
      }
      function Readable(options) {
        Duplex = Duplex || require_stream_duplex();
        if (!(this instanceof Readable))
          return new Readable(options);
        var isDuplex = this instanceof Duplex;
        this._readableState = new ReadableState(options, this, isDuplex);
        this.readable = true;
        if (options) {
          if (typeof options.read === "function")
            this._read = options.read;
          if (typeof options.destroy === "function")
            this._destroy = options.destroy;
        }
        Stream.call(this);
      }
      Object.defineProperty(Readable.prototype, "destroyed", {
        enumerable: false,
        get: function get() {
          if (this._readableState === void 0) {
            return false;
          }
          return this._readableState.destroyed;
        },
        set: function set(value) {
          if (!this._readableState) {
            return;
          }
          this._readableState.destroyed = value;
        }
      });
      Readable.prototype.destroy = destroyImpl.destroy;
      Readable.prototype._undestroy = destroyImpl.undestroy;
      Readable.prototype._destroy = function(err, cb) {
        cb(err);
      };
      Readable.prototype.push = function(chunk, encoding) {
        var state = this._readableState;
        var skipChunkCheck;
        if (!state.objectMode) {
          if (typeof chunk === "string") {
            encoding = encoding || state.defaultEncoding;
            if (encoding !== state.encoding) {
              chunk = Buffer2.from(chunk, encoding);
              encoding = "";
            }
            skipChunkCheck = true;
          }
        } else {
          skipChunkCheck = true;
        }
        return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
      };
      Readable.prototype.unshift = function(chunk) {
        return readableAddChunk(this, chunk, null, true, false);
      };
      function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
        debug("readableAddChunk", chunk);
        var state = stream._readableState;
        if (chunk === null) {
          state.reading = false;
          onEofChunk(stream, state);
        } else {
          var er;
          if (!skipChunkCheck)
            er = chunkInvalid(state, chunk);
          if (er) {
            errorOrDestroy(stream, er);
          } else if (state.objectMode || chunk && chunk.length > 0) {
            if (typeof chunk !== "string" && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer2.prototype) {
              chunk = _uint8ArrayToBuffer(chunk);
            }
            if (addToFront) {
              if (state.endEmitted)
                errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());
              else
                addChunk(stream, state, chunk, true);
            } else if (state.ended) {
              errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
            } else if (state.destroyed) {
              return false;
            } else {
              state.reading = false;
              if (state.decoder && !encoding) {
                chunk = state.decoder.write(chunk);
                if (state.objectMode || chunk.length !== 0)
                  addChunk(stream, state, chunk, false);
                else
                  maybeReadMore(stream, state);
              } else {
                addChunk(stream, state, chunk, false);
              }
            }
          } else if (!addToFront) {
            state.reading = false;
            maybeReadMore(stream, state);
          }
        }
        return !state.ended && (state.length < state.highWaterMark || state.length === 0);
      }
      function addChunk(stream, state, chunk, addToFront) {
        if (state.flowing && state.length === 0 && !state.sync) {
          state.awaitDrain = 0;
          stream.emit("data", chunk);
        } else {
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront)
            state.buffer.unshift(chunk);
          else
            state.buffer.push(chunk);
          if (state.needReadable)
            emitReadable(stream);
        }
        maybeReadMore(stream, state);
      }
      function chunkInvalid(state, chunk) {
        var er;
        if (!_isUint8Array(chunk) && typeof chunk !== "string" && chunk !== void 0 && !state.objectMode) {
          er = new ERR_INVALID_ARG_TYPE("chunk", ["string", "Buffer", "Uint8Array"], chunk);
        }
        return er;
      }
      Readable.prototype.isPaused = function() {
        return this._readableState.flowing === false;
      };
      Readable.prototype.setEncoding = function(enc) {
        if (!StringDecoder)
          StringDecoder = __require("string_decoder/").StringDecoder;
        var decoder = new StringDecoder(enc);
        this._readableState.decoder = decoder;
        this._readableState.encoding = this._readableState.decoder.encoding;
        var p = this._readableState.buffer.head;
        var content = "";
        while (p !== null) {
          content += decoder.write(p.data);
          p = p.next;
        }
        this._readableState.buffer.clear();
        if (content !== "")
          this._readableState.buffer.push(content);
        this._readableState.length = content.length;
        return this;
      };
      var MAX_HWM = 1073741824;
      function computeNewHighWaterMark(n) {
        if (n >= MAX_HWM) {
          n = MAX_HWM;
        } else {
          n--;
          n |= n >>> 1;
          n |= n >>> 2;
          n |= n >>> 4;
          n |= n >>> 8;
          n |= n >>> 16;
          n++;
        }
        return n;
      }
      function howMuchToRead(n, state) {
        if (n <= 0 || state.length === 0 && state.ended)
          return 0;
        if (state.objectMode)
          return 1;
        if (n !== n) {
          if (state.flowing && state.length)
            return state.buffer.head.data.length;
          else
            return state.length;
        }
        if (n > state.highWaterMark)
          state.highWaterMark = computeNewHighWaterMark(n);
        if (n <= state.length)
          return n;
        if (!state.ended) {
          state.needReadable = true;
          return 0;
        }
        return state.length;
      }
      Readable.prototype.read = function(n) {
        debug("read", n);
        n = parseInt(n, 10);
        var state = this._readableState;
        var nOrig = n;
        if (n !== 0)
          state.emittedReadable = false;
        if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
          debug("read: emitReadable", state.length, state.ended);
          if (state.length === 0 && state.ended)
            endReadable(this);
          else
            emitReadable(this);
          return null;
        }
        n = howMuchToRead(n, state);
        if (n === 0 && state.ended) {
          if (state.length === 0)
            endReadable(this);
          return null;
        }
        var doRead = state.needReadable;
        debug("need readable", doRead);
        if (state.length === 0 || state.length - n < state.highWaterMark) {
          doRead = true;
          debug("length less than watermark", doRead);
        }
        if (state.ended || state.reading) {
          doRead = false;
          debug("reading or ended", doRead);
        } else if (doRead) {
          debug("do read");
          state.reading = true;
          state.sync = true;
          if (state.length === 0)
            state.needReadable = true;
          this._read(state.highWaterMark);
          state.sync = false;
          if (!state.reading)
            n = howMuchToRead(nOrig, state);
        }
        var ret;
        if (n > 0)
          ret = fromList(n, state);
        else
          ret = null;
        if (ret === null) {
          state.needReadable = state.length <= state.highWaterMark;
          n = 0;
        } else {
          state.length -= n;
          state.awaitDrain = 0;
        }
        if (state.length === 0) {
          if (!state.ended)
            state.needReadable = true;
          if (nOrig !== n && state.ended)
            endReadable(this);
        }
        if (ret !== null)
          this.emit("data", ret);
        return ret;
      };
      function onEofChunk(stream, state) {
        debug("onEofChunk");
        if (state.ended)
          return;
        if (state.decoder) {
          var chunk = state.decoder.end();
          if (chunk && chunk.length) {
            state.buffer.push(chunk);
            state.length += state.objectMode ? 1 : chunk.length;
          }
        }
        state.ended = true;
        if (state.sync) {
          emitReadable(stream);
        } else {
          state.needReadable = false;
          if (!state.emittedReadable) {
            state.emittedReadable = true;
            emitReadable_(stream);
          }
        }
      }
      function emitReadable(stream) {
        var state = stream._readableState;
        debug("emitReadable", state.needReadable, state.emittedReadable);
        state.needReadable = false;
        if (!state.emittedReadable) {
          debug("emitReadable", state.flowing);
          state.emittedReadable = true;
          process.nextTick(emitReadable_, stream);
        }
      }
      function emitReadable_(stream) {
        var state = stream._readableState;
        debug("emitReadable_", state.destroyed, state.length, state.ended);
        if (!state.destroyed && (state.length || state.ended)) {
          stream.emit("readable");
          state.emittedReadable = false;
        }
        state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
        flow(stream);
      }
      function maybeReadMore(stream, state) {
        if (!state.readingMore) {
          state.readingMore = true;
          process.nextTick(maybeReadMore_, stream, state);
        }
      }
      function maybeReadMore_(stream, state) {
        while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
          var len = state.length;
          debug("maybeReadMore read 0");
          stream.read(0);
          if (len === state.length)
            break;
        }
        state.readingMore = false;
      }
      Readable.prototype._read = function(n) {
        errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED("_read()"));
      };
      Readable.prototype.pipe = function(dest, pipeOpts) {
        var src = this;
        var state = this._readableState;
        switch (state.pipesCount) {
          case 0:
            state.pipes = dest;
            break;
          case 1:
            state.pipes = [state.pipes, dest];
            break;
          default:
            state.pipes.push(dest);
            break;
        }
        state.pipesCount += 1;
        debug("pipe count=%d opts=%j", state.pipesCount, pipeOpts);
        var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
        var endFn = doEnd ? onend : unpipe;
        if (state.endEmitted)
          process.nextTick(endFn);
        else
          src.once("end", endFn);
        dest.on("unpipe", onunpipe);
        function onunpipe(readable, unpipeInfo) {
          debug("onunpipe");
          if (readable === src) {
            if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
              unpipeInfo.hasUnpiped = true;
              cleanup();
            }
          }
        }
        function onend() {
          debug("onend");
          dest.end();
        }
        var ondrain = pipeOnDrain(src);
        dest.on("drain", ondrain);
        var cleanedUp = false;
        function cleanup() {
          debug("cleanup");
          dest.removeListener("close", onclose);
          dest.removeListener("finish", onfinish);
          dest.removeListener("drain", ondrain);
          dest.removeListener("error", onerror);
          dest.removeListener("unpipe", onunpipe);
          src.removeListener("end", onend);
          src.removeListener("end", unpipe);
          src.removeListener("data", ondata);
          cleanedUp = true;
          if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain))
            ondrain();
        }
        src.on("data", ondata);
        function ondata(chunk) {
          debug("ondata");
          var ret = dest.write(chunk);
          debug("dest.write", ret);
          if (ret === false) {
            if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
              debug("false write response, pause", state.awaitDrain);
              state.awaitDrain++;
            }
            src.pause();
          }
        }
        function onerror(er) {
          debug("onerror", er);
          unpipe();
          dest.removeListener("error", onerror);
          if (EElistenerCount(dest, "error") === 0)
            errorOrDestroy(dest, er);
        }
        prependListener(dest, "error", onerror);
        function onclose() {
          dest.removeListener("finish", onfinish);
          unpipe();
        }
        dest.once("close", onclose);
        function onfinish() {
          debug("onfinish");
          dest.removeListener("close", onclose);
          unpipe();
        }
        dest.once("finish", onfinish);
        function unpipe() {
          debug("unpipe");
          src.unpipe(dest);
        }
        dest.emit("pipe", src);
        if (!state.flowing) {
          debug("pipe resume");
          src.resume();
        }
        return dest;
      };
      function pipeOnDrain(src) {
        return function pipeOnDrainFunctionResult() {
          var state = src._readableState;
          debug("pipeOnDrain", state.awaitDrain);
          if (state.awaitDrain)
            state.awaitDrain--;
          if (state.awaitDrain === 0 && EElistenerCount(src, "data")) {
            state.flowing = true;
            flow(src);
          }
        };
      }
      Readable.prototype.unpipe = function(dest) {
        var state = this._readableState;
        var unpipeInfo = {
          hasUnpiped: false
        };
        if (state.pipesCount === 0)
          return this;
        if (state.pipesCount === 1) {
          if (dest && dest !== state.pipes)
            return this;
          if (!dest)
            dest = state.pipes;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          if (dest)
            dest.emit("unpipe", this, unpipeInfo);
          return this;
        }
        if (!dest) {
          var dests = state.pipes;
          var len = state.pipesCount;
          state.pipes = null;
          state.pipesCount = 0;
          state.flowing = false;
          for (var i = 0; i < len; i++) {
            dests[i].emit("unpipe", this, {
              hasUnpiped: false
            });
          }
          return this;
        }
        var index = indexOf(state.pipes, dest);
        if (index === -1)
          return this;
        state.pipes.splice(index, 1);
        state.pipesCount -= 1;
        if (state.pipesCount === 1)
          state.pipes = state.pipes[0];
        dest.emit("unpipe", this, unpipeInfo);
        return this;
      };
      Readable.prototype.on = function(ev, fn) {
        var res = Stream.prototype.on.call(this, ev, fn);
        var state = this._readableState;
        if (ev === "data") {
          state.readableListening = this.listenerCount("readable") > 0;
          if (state.flowing !== false)
            this.resume();
        } else if (ev === "readable") {
          if (!state.endEmitted && !state.readableListening) {
            state.readableListening = state.needReadable = true;
            state.flowing = false;
            state.emittedReadable = false;
            debug("on readable", state.length, state.reading);
            if (state.length) {
              emitReadable(this);
            } else if (!state.reading) {
              process.nextTick(nReadingNextTick, this);
            }
          }
        }
        return res;
      };
      Readable.prototype.addListener = Readable.prototype.on;
      Readable.prototype.removeListener = function(ev, fn) {
        var res = Stream.prototype.removeListener.call(this, ev, fn);
        if (ev === "readable") {
          process.nextTick(updateReadableListening, this);
        }
        return res;
      };
      Readable.prototype.removeAllListeners = function(ev) {
        var res = Stream.prototype.removeAllListeners.apply(this, arguments);
        if (ev === "readable" || ev === void 0) {
          process.nextTick(updateReadableListening, this);
        }
        return res;
      };
      function updateReadableListening(self2) {
        var state = self2._readableState;
        state.readableListening = self2.listenerCount("readable") > 0;
        if (state.resumeScheduled && !state.paused) {
          state.flowing = true;
        } else if (self2.listenerCount("data") > 0) {
          self2.resume();
        }
      }
      function nReadingNextTick(self2) {
        debug("readable nexttick read 0");
        self2.read(0);
      }
      Readable.prototype.resume = function() {
        var state = this._readableState;
        if (!state.flowing) {
          debug("resume");
          state.flowing = !state.readableListening;
          resume(this, state);
        }
        state.paused = false;
        return this;
      };
      function resume(stream, state) {
        if (!state.resumeScheduled) {
          state.resumeScheduled = true;
          process.nextTick(resume_, stream, state);
        }
      }
      function resume_(stream, state) {
        debug("resume", state.reading);
        if (!state.reading) {
          stream.read(0);
        }
        state.resumeScheduled = false;
        stream.emit("resume");
        flow(stream);
        if (state.flowing && !state.reading)
          stream.read(0);
      }
      Readable.prototype.pause = function() {
        debug("call pause flowing=%j", this._readableState.flowing);
        if (this._readableState.flowing !== false) {
          debug("pause");
          this._readableState.flowing = false;
          this.emit("pause");
        }
        this._readableState.paused = true;
        return this;
      };
      function flow(stream) {
        var state = stream._readableState;
        debug("flow", state.flowing);
        while (state.flowing && stream.read() !== null) {
          ;
        }
      }
      Readable.prototype.wrap = function(stream) {
        var _this = this;
        var state = this._readableState;
        var paused = false;
        stream.on("end", function() {
          debug("wrapped end");
          if (state.decoder && !state.ended) {
            var chunk = state.decoder.end();
            if (chunk && chunk.length)
              _this.push(chunk);
          }
          _this.push(null);
        });
        stream.on("data", function(chunk) {
          debug("wrapped data");
          if (state.decoder)
            chunk = state.decoder.write(chunk);
          if (state.objectMode && (chunk === null || chunk === void 0))
            return;
          else if (!state.objectMode && (!chunk || !chunk.length))
            return;
          var ret = _this.push(chunk);
          if (!ret) {
            paused = true;
            stream.pause();
          }
        });
        for (var i in stream) {
          if (this[i] === void 0 && typeof stream[i] === "function") {
            this[i] = function methodWrap(method) {
              return function methodWrapReturnFunction() {
                return stream[method].apply(stream, arguments);
              };
            }(i);
          }
        }
        for (var n = 0; n < kProxyEvents.length; n++) {
          stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
        }
        this._read = function(n2) {
          debug("wrapped _read", n2);
          if (paused) {
            paused = false;
            stream.resume();
          }
        };
        return this;
      };
      if (typeof Symbol === "function") {
        Readable.prototype[Symbol.asyncIterator] = function() {
          if (createReadableStreamAsyncIterator === void 0) {
            createReadableStreamAsyncIterator = require_async_iterator();
          }
          return createReadableStreamAsyncIterator(this);
        };
      }
      Object.defineProperty(Readable.prototype, "readableHighWaterMark", {
        enumerable: false,
        get: function get() {
          return this._readableState.highWaterMark;
        }
      });
      Object.defineProperty(Readable.prototype, "readableBuffer", {
        enumerable: false,
        get: function get() {
          return this._readableState && this._readableState.buffer;
        }
      });
      Object.defineProperty(Readable.prototype, "readableFlowing", {
        enumerable: false,
        get: function get() {
          return this._readableState.flowing;
        },
        set: function set(state) {
          if (this._readableState) {
            this._readableState.flowing = state;
          }
        }
      });
      Readable._fromList = fromList;
      Object.defineProperty(Readable.prototype, "readableLength", {
        enumerable: false,
        get: function get() {
          return this._readableState.length;
        }
      });
      function fromList(n, state) {
        if (state.length === 0)
          return null;
        var ret;
        if (state.objectMode)
          ret = state.buffer.shift();
        else if (!n || n >= state.length) {
          if (state.decoder)
            ret = state.buffer.join("");
          else if (state.buffer.length === 1)
            ret = state.buffer.first();
          else
            ret = state.buffer.concat(state.length);
          state.buffer.clear();
        } else {
          ret = state.buffer.consume(n, state.decoder);
        }
        return ret;
      }
      function endReadable(stream) {
        var state = stream._readableState;
        debug("endReadable", state.endEmitted);
        if (!state.endEmitted) {
          state.ended = true;
          process.nextTick(endReadableNT, state, stream);
        }
      }
      function endReadableNT(state, stream) {
        debug("endReadableNT", state.endEmitted, state.length);
        if (!state.endEmitted && state.length === 0) {
          state.endEmitted = true;
          stream.readable = false;
          stream.emit("end");
          if (state.autoDestroy) {
            var wState = stream._writableState;
            if (!wState || wState.autoDestroy && wState.finished) {
              stream.destroy();
            }
          }
        }
      }
      if (typeof Symbol === "function") {
        Readable.from = function(iterable, opts) {
          if (from === void 0) {
            from = require_from();
          }
          return from(Readable, iterable, opts);
        };
      }
      function indexOf(xs, x) {
        for (var i = 0, l = xs.length; i < l; i++) {
          if (xs[i] === x)
            return i;
        }
        return -1;
      }
    }
  });

  // ../../node_modules/readable-stream/lib/_stream_transform.js
  var require_stream_transform = __commonJS({
    "../../node_modules/readable-stream/lib/_stream_transform.js"(exports, module) {
      "use strict";
      module.exports = Transform;
      var _require$codes = require_errors().codes;
      var ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED;
      var ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK;
      var ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING;
      var ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;
      var Duplex = require_stream_duplex();
      require_inherits()(Transform, Duplex);
      function afterTransform(er, data) {
        var ts = this._transformState;
        ts.transforming = false;
        var cb = ts.writecb;
        if (cb === null) {
          return this.emit("error", new ERR_MULTIPLE_CALLBACK());
        }
        ts.writechunk = null;
        ts.writecb = null;
        if (data != null)
          this.push(data);
        cb(er);
        var rs = this._readableState;
        rs.reading = false;
        if (rs.needReadable || rs.length < rs.highWaterMark) {
          this._read(rs.highWaterMark);
        }
      }
      function Transform(options) {
        if (!(this instanceof Transform))
          return new Transform(options);
        Duplex.call(this, options);
        this._transformState = {
          afterTransform: afterTransform.bind(this),
          needTransform: false,
          transforming: false,
          writecb: null,
          writechunk: null,
          writeencoding: null
        };
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (options) {
          if (typeof options.transform === "function")
            this._transform = options.transform;
          if (typeof options.flush === "function")
            this._flush = options.flush;
        }
        this.on("prefinish", prefinish);
      }
      function prefinish() {
        var _this = this;
        if (typeof this._flush === "function" && !this._readableState.destroyed) {
          this._flush(function(er, data) {
            done(_this, er, data);
          });
        } else {
          done(this, null, null);
        }
      }
      Transform.prototype.push = function(chunk, encoding) {
        this._transformState.needTransform = false;
        return Duplex.prototype.push.call(this, chunk, encoding);
      };
      Transform.prototype._transform = function(chunk, encoding, cb) {
        cb(new ERR_METHOD_NOT_IMPLEMENTED("_transform()"));
      };
      Transform.prototype._write = function(chunk, encoding, cb) {
        var ts = this._transformState;
        ts.writecb = cb;
        ts.writechunk = chunk;
        ts.writeencoding = encoding;
        if (!ts.transforming) {
          var rs = this._readableState;
          if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
            this._read(rs.highWaterMark);
        }
      };
      Transform.prototype._read = function(n) {
        var ts = this._transformState;
        if (ts.writechunk !== null && !ts.transforming) {
          ts.transforming = true;
          this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
        } else {
          ts.needTransform = true;
        }
      };
      Transform.prototype._destroy = function(err, cb) {
        Duplex.prototype._destroy.call(this, err, function(err2) {
          cb(err2);
        });
      };
      function done(stream, er, data) {
        if (er)
          return stream.emit("error", er);
        if (data != null)
          stream.push(data);
        if (stream._writableState.length)
          throw new ERR_TRANSFORM_WITH_LENGTH_0();
        if (stream._transformState.transforming)
          throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
        return stream.push(null);
      }
    }
  });

  // ../../node_modules/readable-stream/lib/_stream_passthrough.js
  var require_stream_passthrough = __commonJS({
    "../../node_modules/readable-stream/lib/_stream_passthrough.js"(exports, module) {
      "use strict";
      module.exports = PassThrough;
      var Transform = require_stream_transform();
      require_inherits()(PassThrough, Transform);
      function PassThrough(options) {
        if (!(this instanceof PassThrough))
          return new PassThrough(options);
        Transform.call(this, options);
      }
      PassThrough.prototype._transform = function(chunk, encoding, cb) {
        cb(null, chunk);
      };
    }
  });

  // ../../node_modules/readable-stream/lib/internal/streams/pipeline.js
  var require_pipeline = __commonJS({
    "../../node_modules/readable-stream/lib/internal/streams/pipeline.js"(exports, module) {
      "use strict";
      var eos;
      function once(callback) {
        var called = false;
        return function() {
          if (called)
            return;
          called = true;
          callback.apply(void 0, arguments);
        };
      }
      var _require$codes = require_errors().codes;
      var ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS;
      var ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;
      function noop(err) {
        if (err)
          throw err;
      }
      function isRequest(stream) {
        return stream.setHeader && typeof stream.abort === "function";
      }
      function destroyer(stream, reading, writing, callback) {
        callback = once(callback);
        var closed = false;
        stream.on("close", function() {
          closed = true;
        });
        if (eos === void 0)
          eos = require_end_of_stream();
        eos(stream, {
          readable: reading,
          writable: writing
        }, function(err) {
          if (err)
            return callback(err);
          closed = true;
          callback();
        });
        var destroyed = false;
        return function(err) {
          if (closed)
            return;
          if (destroyed)
            return;
          destroyed = true;
          if (isRequest(stream))
            return stream.abort();
          if (typeof stream.destroy === "function")
            return stream.destroy();
          callback(err || new ERR_STREAM_DESTROYED("pipe"));
        };
      }
      function call(fn) {
        fn();
      }
      function pipe(from, to) {
        return from.pipe(to);
      }
      function popCallback(streams) {
        if (!streams.length)
          return noop;
        if (typeof streams[streams.length - 1] !== "function")
          return noop;
        return streams.pop();
      }
      function pipeline() {
        for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
          streams[_key] = arguments[_key];
        }
        var callback = popCallback(streams);
        if (Array.isArray(streams[0]))
          streams = streams[0];
        if (streams.length < 2) {
          throw new ERR_MISSING_ARGS("streams");
        }
        var error;
        var destroys = streams.map(function(stream, i) {
          var reading = i < streams.length - 1;
          var writing = i > 0;
          return destroyer(stream, reading, writing, function(err) {
            if (!error)
              error = err;
            if (err)
              destroys.forEach(call);
            if (reading)
              return;
            destroys.forEach(call);
            callback(error);
          });
        });
        return streams.reduce(pipe);
      }
      module.exports = pipeline;
    }
  });

  // ../../node_modules/readable-stream/readable.js
  var require_readable = __commonJS({
    "../../node_modules/readable-stream/readable.js"(exports, module) {
      var Stream = __require("stream");
      if (process.env.READABLE_STREAM === "disable" && Stream) {
        module.exports = Stream.Readable;
        Object.assign(module.exports, Stream);
        module.exports.Stream = Stream;
      } else {
        exports = module.exports = require_stream_readable();
        exports.Stream = Stream || exports;
        exports.Readable = exports;
        exports.Writable = require_stream_writable();
        exports.Duplex = require_stream_duplex();
        exports.Transform = require_stream_transform();
        exports.PassThrough = require_stream_passthrough();
        exports.finished = require_end_of_stream();
        exports.pipeline = require_pipeline();
      }
    }
  });

  // ../../node_modules/ora/node_modules/bl/BufferList.js
  var require_BufferList = __commonJS({
    "../../node_modules/ora/node_modules/bl/BufferList.js"(exports, module) {
      "use strict";
      var { Buffer: Buffer2 } = __require("buffer");
      var symbol = Symbol.for("BufferList");
      function BufferList(buf) {
        if (!(this instanceof BufferList)) {
          return new BufferList(buf);
        }
        BufferList._init.call(this, buf);
      }
      BufferList._init = function _init(buf) {
        Object.defineProperty(this, symbol, { value: true });
        this._bufs = [];
        this.length = 0;
        if (buf) {
          this.append(buf);
        }
      };
      BufferList.prototype._new = function _new(buf) {
        return new BufferList(buf);
      };
      BufferList.prototype._offset = function _offset(offset) {
        if (offset === 0) {
          return [0, 0];
        }
        let tot = 0;
        for (let i = 0; i < this._bufs.length; i++) {
          const _t = tot + this._bufs[i].length;
          if (offset < _t || i === this._bufs.length - 1) {
            return [i, offset - tot];
          }
          tot = _t;
        }
      };
      BufferList.prototype._reverseOffset = function(blOffset) {
        const bufferId = blOffset[0];
        let offset = blOffset[1];
        for (let i = 0; i < bufferId; i++) {
          offset += this._bufs[i].length;
        }
        return offset;
      };
      BufferList.prototype.get = function get(index) {
        if (index > this.length || index < 0) {
          return void 0;
        }
        const offset = this._offset(index);
        return this._bufs[offset[0]][offset[1]];
      };
      BufferList.prototype.slice = function slice(start, end) {
        if (typeof start === "number" && start < 0) {
          start += this.length;
        }
        if (typeof end === "number" && end < 0) {
          end += this.length;
        }
        return this.copy(null, 0, start, end);
      };
      BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
        if (typeof srcStart !== "number" || srcStart < 0) {
          srcStart = 0;
        }
        if (typeof srcEnd !== "number" || srcEnd > this.length) {
          srcEnd = this.length;
        }
        if (srcStart >= this.length) {
          return dst || Buffer2.alloc(0);
        }
        if (srcEnd <= 0) {
          return dst || Buffer2.alloc(0);
        }
        const copy2 = !!dst;
        const off = this._offset(srcStart);
        const len = srcEnd - srcStart;
        let bytes = len;
        let bufoff = copy2 && dstStart || 0;
        let start = off[1];
        if (srcStart === 0 && srcEnd === this.length) {
          if (!copy2) {
            return this._bufs.length === 1 ? this._bufs[0] : Buffer2.concat(this._bufs, this.length);
          }
          for (let i = 0; i < this._bufs.length; i++) {
            this._bufs[i].copy(dst, bufoff);
            bufoff += this._bufs[i].length;
          }
          return dst;
        }
        if (bytes <= this._bufs[off[0]].length - start) {
          return copy2 ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
        }
        if (!copy2) {
          dst = Buffer2.allocUnsafe(len);
        }
        for (let i = off[0]; i < this._bufs.length; i++) {
          const l = this._bufs[i].length - start;
          if (bytes > l) {
            this._bufs[i].copy(dst, bufoff, start);
            bufoff += l;
          } else {
            this._bufs[i].copy(dst, bufoff, start, start + bytes);
            bufoff += l;
            break;
          }
          bytes -= l;
          if (start) {
            start = 0;
          }
        }
        if (dst.length > bufoff)
          return dst.slice(0, bufoff);
        return dst;
      };
      BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
        start = start || 0;
        end = typeof end !== "number" ? this.length : end;
        if (start < 0) {
          start += this.length;
        }
        if (end < 0) {
          end += this.length;
        }
        if (start === end) {
          return this._new();
        }
        const startOffset = this._offset(start);
        const endOffset = this._offset(end);
        const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
        if (endOffset[1] === 0) {
          buffers.pop();
        } else {
          buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
        }
        if (startOffset[1] !== 0) {
          buffers[0] = buffers[0].slice(startOffset[1]);
        }
        return this._new(buffers);
      };
      BufferList.prototype.toString = function toString(encoding, start, end) {
        return this.slice(start, end).toString(encoding);
      };
      BufferList.prototype.consume = function consume(bytes) {
        bytes = Math.trunc(bytes);
        if (Number.isNaN(bytes) || bytes <= 0)
          return this;
        while (this._bufs.length) {
          if (bytes >= this._bufs[0].length) {
            bytes -= this._bufs[0].length;
            this.length -= this._bufs[0].length;
            this._bufs.shift();
          } else {
            this._bufs[0] = this._bufs[0].slice(bytes);
            this.length -= bytes;
            break;
          }
        }
        return this;
      };
      BufferList.prototype.duplicate = function duplicate() {
        const copy = this._new();
        for (let i = 0; i < this._bufs.length; i++) {
          copy.append(this._bufs[i]);
        }
        return copy;
      };
      BufferList.prototype.append = function append(buf) {
        if (buf == null) {
          return this;
        }
        if (buf.buffer) {
          this._appendBuffer(Buffer2.from(buf.buffer, buf.byteOffset, buf.byteLength));
        } else if (Array.isArray(buf)) {
          for (let i = 0; i < buf.length; i++) {
            this.append(buf[i]);
          }
        } else if (this._isBufferList(buf)) {
          for (let i = 0; i < buf._bufs.length; i++) {
            this.append(buf._bufs[i]);
          }
        } else {
          if (typeof buf === "number") {
            buf = buf.toString();
          }
          this._appendBuffer(Buffer2.from(buf));
        }
        return this;
      };
      BufferList.prototype._appendBuffer = function appendBuffer(buf) {
        this._bufs.push(buf);
        this.length += buf.length;
      };
      BufferList.prototype.indexOf = function(search, offset, encoding) {
        if (encoding === void 0 && typeof offset === "string") {
          encoding = offset;
          offset = void 0;
        }
        if (typeof search === "function" || Array.isArray(search)) {
          throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
        } else if (typeof search === "number") {
          search = Buffer2.from([search]);
        } else if (typeof search === "string") {
          search = Buffer2.from(search, encoding);
        } else if (this._isBufferList(search)) {
          search = search.slice();
        } else if (Array.isArray(search.buffer)) {
          search = Buffer2.from(search.buffer, search.byteOffset, search.byteLength);
        } else if (!Buffer2.isBuffer(search)) {
          search = Buffer2.from(search);
        }
        offset = Number(offset || 0);
        if (isNaN(offset)) {
          offset = 0;
        }
        if (offset < 0) {
          offset = this.length + offset;
        }
        if (offset < 0) {
          offset = 0;
        }
        if (search.length === 0) {
          return offset > this.length ? this.length : offset;
        }
        const blOffset = this._offset(offset);
        let blIndex = blOffset[0];
        let buffOffset = blOffset[1];
        for (; blIndex < this._bufs.length; blIndex++) {
          const buff = this._bufs[blIndex];
          while (buffOffset < buff.length) {
            const availableWindow = buff.length - buffOffset;
            if (availableWindow >= search.length) {
              const nativeSearchResult = buff.indexOf(search, buffOffset);
              if (nativeSearchResult !== -1) {
                return this._reverseOffset([blIndex, nativeSearchResult]);
              }
              buffOffset = buff.length - search.length + 1;
            } else {
              const revOffset = this._reverseOffset([blIndex, buffOffset]);
              if (this._match(revOffset, search)) {
                return revOffset;
              }
              buffOffset++;
            }
          }
          buffOffset = 0;
        }
        return -1;
      };
      BufferList.prototype._match = function(offset, search) {
        if (this.length - offset < search.length) {
          return false;
        }
        for (let searchOffset = 0; searchOffset < search.length; searchOffset++) {
          if (this.get(offset + searchOffset) !== search[searchOffset]) {
            return false;
          }
        }
        return true;
      };
      (function() {
        const methods = {
          readDoubleBE: 8,
          readDoubleLE: 8,
          readFloatBE: 4,
          readFloatLE: 4,
          readInt32BE: 4,
          readInt32LE: 4,
          readUInt32BE: 4,
          readUInt32LE: 4,
          readInt16BE: 2,
          readInt16LE: 2,
          readUInt16BE: 2,
          readUInt16LE: 2,
          readInt8: 1,
          readUInt8: 1,
          readIntBE: null,
          readIntLE: null,
          readUIntBE: null,
          readUIntLE: null
        };
        for (const m in methods) {
          (function(m2) {
            if (methods[m2] === null) {
              BufferList.prototype[m2] = function(offset, byteLength) {
                return this.slice(offset, offset + byteLength)[m2](0, byteLength);
              };
            } else {
              BufferList.prototype[m2] = function(offset = 0) {
                return this.slice(offset, offset + methods[m2])[m2](0);
              };
            }
          })(m);
        }
      })();
      BufferList.prototype._isBufferList = function _isBufferList(b) {
        return b instanceof BufferList || BufferList.isBufferList(b);
      };
      BufferList.isBufferList = function isBufferList(b) {
        return b != null && b[symbol];
      };
      module.exports = BufferList;
    }
  });

  // ../../node_modules/ora/node_modules/bl/bl.js
  var require_bl = __commonJS({
    "../../node_modules/ora/node_modules/bl/bl.js"(exports, module) {
      "use strict";
      var DuplexStream = require_readable().Duplex;
      var inherits = require_inherits();
      var BufferList = require_BufferList();
      function BufferListStream2(callback) {
        if (!(this instanceof BufferListStream2)) {
          return new BufferListStream2(callback);
        }
        if (typeof callback === "function") {
          this._callback = callback;
          const piper = function piper2(err) {
            if (this._callback) {
              this._callback(err);
              this._callback = null;
            }
          }.bind(this);
          this.on("pipe", function onPipe(src) {
            src.on("error", piper);
          });
          this.on("unpipe", function onUnpipe(src) {
            src.removeListener("error", piper);
          });
          callback = null;
        }
        BufferList._init.call(this, callback);
        DuplexStream.call(this);
      }
      inherits(BufferListStream2, DuplexStream);
      Object.assign(BufferListStream2.prototype, BufferList.prototype);
      BufferListStream2.prototype._new = function _new(callback) {
        return new BufferListStream2(callback);
      };
      BufferListStream2.prototype._write = function _write(buf, encoding, callback) {
        this._appendBuffer(buf);
        if (typeof callback === "function") {
          callback();
        }
      };
      BufferListStream2.prototype._read = function _read(size) {
        if (!this.length) {
          return this.push(null);
        }
        size = Math.min(size, this.length);
        this.push(this.slice(0, size));
        this.consume(size);
      };
      BufferListStream2.prototype.end = function end(chunk) {
        DuplexStream.prototype.end.call(this, chunk);
        if (this._callback) {
          this._callback(null, this.slice());
          this._callback = null;
        }
      };
      BufferListStream2.prototype._destroy = function _destroy(err, cb) {
        this._bufs.length = 0;
        this.length = 0;
        cb(err);
      };
      BufferListStream2.prototype._isBufferList = function _isBufferList(b) {
        return b instanceof BufferListStream2 || b instanceof BufferList || BufferListStream2.isBufferList(b);
      };
      BufferListStream2.isBufferList = BufferList.isBufferList;
      module.exports = BufferListStream2;
      module.exports.BufferListStream = BufferListStream2;
      module.exports.BufferList = BufferList;
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    default: () => src_default
  });

  // src/commands/FilterCommand.ts
  var import_cli = __toModule(__require("@yarnpkg/cli"));
  var import_clipanion = __toModule(__require("clipanion"));
  var import_core4 = __toModule(__require("@yarnpkg/core"));

  // src/utils/getWorkspaceDependents.ts
  var import_core2 = __toModule(__require("@yarnpkg/core"));

  // src/utils/getWorkspaceDependencies.ts
  var import_core = __toModule(__require("@yarnpkg/core"));
  function getWorkspaceDependencies(workspace) {
    const { project } = workspace;
    const dependencies = new Set();
    function addDependency({ manifest }) {
      for (const depType of import_core.Manifest.hardDependencies) {
        for (const descriptor of manifest.getForScope(depType).values()) {
          const dep = project.tryWorkspaceByDescriptor(descriptor);
          if (dep && !dependencies.has(dep)) {
            dependencies.add(dep);
            addDependency(dep);
          }
        }
      }
    }
    addDependency(workspace);
    return [...dependencies];
  }

  // src/utils/getWorkspaceDependents.ts
  function getWorkspaceDependents(workspace) {
    const dependents = new Set();
    for (const ws of workspace.project.workspaces) {
      const isDep = getWorkspaceDependencies(ws).some((dep) => import_core2.structUtils.areLocatorsEqual(dep.locator, workspace.locator));
      if (isDep) {
        dependents.add(ws);
      }
    }
    return [...dependents];
  }

  // src/utils/calcModuleHash.ts
  var import_simple_git = __toModule(require_src3());
  var import_path = __toModule(__require("path"));
  var import_fs_extra = __toModule(require_lib());
  var import_md5_file = __toModule(require_md5_file());
  var git = (0, import_simple_git.default)();
  async function getStatus(gitRootPath, dir) {
    let status;
    try {
      status = await git.status([dir]);
    } catch {
      console.error("git.status \u5931\u8D25", dir);
      throw new Error();
    }
    return Promise.all(status.files.map(async (item) => {
      const realPath = import_path.default.resolve(gitRootPath, item.path);
      if (await (0, import_fs_extra.pathExists)(realPath)) {
        return (0, import_md5_file.default)(realPath);
      }
      return realPath;
    }));
  }
  async function calcModuleHash(gitRootPath, dir) {
    const lastCommit = (await git.log({
      file: dir
    })).latest;
    try {
      const changed = await getStatus(gitRootPath, dir);
      return {
        lastCommit,
        changed
      };
    } catch {
      console.error("\u8BA1\u7B97 hash \u503C\u5931\u8D25", dir);
      throw new Error();
    }
  }

  // src/utils/listChangedWorkspaces.ts
  var import_lodash = __toModule(require_lodash());
  var import_fslib = __toModule(__require("@yarnpkg/fslib"));

  // src/utils/BuildCache.ts
  var import_path2 = __toModule(__require("path"));
  var import_fs_extra2 = __toModule(require_lib());
  var BuildCache = class {
    constructor(rootPath) {
      this.rootPath = rootPath;
      this.cachePath = import_path2.default.resolve(this.rootPath, ".yarn-cache.json");
    }
    cachePath;
    async get(cmd) {
      const json = await this.readCache();
      return json[cmd] ?? [];
    }
    async set(cmd, workspaces) {
      const json = await this.readCache();
      json[cmd] = workspaces;
      await (0, import_fs_extra2.writeJson)(this.cachePath, json, {
        spaces: 2
      });
    }
    async readCache() {
      if (!await (0, import_fs_extra2.pathExists)(this.cachePath)) {
        await (0, import_fs_extra2.writeJson)(this.cachePath, {});
      }
      return await (0, import_fs_extra2.readJson)(this.cachePath);
    }
  };

  // src/utils/filterWorkspaces.ts
  var import_core3 = __toModule(__require("@yarnpkg/core"));
  function filterWorkspaces({
    workspaces,
    include = [],
    exclude = []
  }) {
    return workspaces.filter((ws) => {
      const name = import_core3.structUtils.stringifyIdent(ws.locator);
      if (name) {
        if (include.length && !include.includes(name)) {
          return false;
        }
        if (exclude.length && exclude.includes(name)) {
          return false;
        }
      }
      return true;
    });
  }

  // src/utils/listChangedWorkspaces.ts
  async function listChangedWorkspaces({
    project,
    cmd,
    include,
    exclude
  }) {
    const rootPath = import_fslib.npath.fromPortablePath(project.cwd);
    const buildCache = new BuildCache(rootPath);
    const last = await buildCache.get(cmd);
    const current = await Promise.all(filterWorkspaces({
      workspaces: project.workspaces,
      include,
      exclude
    }).map(async (item) => {
      return {
        ...await calcModuleHash(rootPath, import_fslib.npath.fromPortablePath(item.cwd)),
        cwd: import_fslib.npath.fromPortablePath(item.cwd)
      };
    }));
    const addOrUpdateWorkspaceCwdSet = new Set((0, import_lodash.differenceBy)(current, last, (item) => JSON.stringify(item)).map((item) => item.cwd));
    const workspaces = new Set();
    for (const item of project.workspaces) {
      const changed = addOrUpdateWorkspaceCwdSet.has(import_fslib.npath.fromPortablePath(item.cwd));
      if (changed && !workspaces.has(item)) {
        workspaces.add(item);
        for (const dep of getWorkspaceDependents(item)) {
          workspaces.add(dep);
        }
      }
    }
    return {
      workspaces: [...workspaces],
      async updateCache() {
        await buildCache.set(cmd, (0, import_lodash.uniqBy)([...current, ...last], (item) => item.cwd));
      }
    };
  }

  // ../../node_modules/ora/index.js
  var import_node_process3 = __toModule(__require("process"));
  var import_node_readline = __toModule(__require("readline"));
  var import_chalk2 = __toModule(require_source());

  // ../../node_modules/ora/node_modules/cli-cursor/index.js
  var import_node_process2 = __toModule(__require("process"));

  // ../../node_modules/ora/node_modules/restore-cursor/index.js
  var import_node_process = __toModule(__require("process"));
  var import_onetime = __toModule(require_onetime());
  var import_signal_exit = __toModule(require_signal_exit());
  var restoreCursor = (0, import_onetime.default)(() => {
    (0, import_signal_exit.default)(() => {
      import_node_process.default.stderr.write("[?25h");
    }, { alwaysLast: true });
  });
  var restore_cursor_default = restoreCursor;

  // ../../node_modules/ora/node_modules/cli-cursor/index.js
  var isHidden = false;
  var cliCursor = {};
  cliCursor.show = (writableStream = import_node_process2.default.stderr) => {
    if (!writableStream.isTTY) {
      return;
    }
    isHidden = false;
    writableStream.write("[?25h");
  };
  cliCursor.hide = (writableStream = import_node_process2.default.stderr) => {
    if (!writableStream.isTTY) {
      return;
    }
    restore_cursor_default();
    isHidden = true;
    writableStream.write("[?25l");
  };
  cliCursor.toggle = (force, writableStream) => {
    if (force !== void 0) {
      isHidden = force;
    }
    if (isHidden) {
      cliCursor.show(writableStream);
    } else {
      cliCursor.hide(writableStream);
    }
  };
  var cli_cursor_default = cliCursor;

  // ../../node_modules/ora/index.js
  var import_cli_spinners = __toModule(require_cli_spinners());

  // ../../node_modules/ora/node_modules/log-symbols/index.js
  var import_chalk = __toModule(require_source());

  // ../../node_modules/ora/node_modules/is-unicode-supported/index.js
  function isUnicodeSupported() {
    if (process.platform !== "win32") {
      return process.env.TERM !== "linux";
    }
    return Boolean(process.env.CI) || Boolean(process.env.WT_SESSION) || process.env.ConEmuTask === "{cmd::Cmder}" || process.env.TERM_PROGRAM === "vscode" || process.env.TERM === "xterm-256color" || process.env.TERM === "alacritty";
  }

  // ../../node_modules/ora/node_modules/log-symbols/index.js
  var main = {
    info: import_chalk.default.blue("\u2139"),
    success: import_chalk.default.green("\u2714"),
    warning: import_chalk.default.yellow("\u26A0"),
    error: import_chalk.default.red("\u2716")
  };
  var fallback = {
    info: import_chalk.default.blue("i"),
    success: import_chalk.default.green("\u221A"),
    warning: import_chalk.default.yellow("\u203C"),
    error: import_chalk.default.red("\xD7")
  };
  var logSymbols = isUnicodeSupported() ? main : fallback;
  var log_symbols_default = logSymbols;

  // ../../node_modules/ora/node_modules/ansi-regex/index.js
  function ansiRegex({ onlyFirst = false } = {}) {
    const pattern = [
      "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
      "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(pattern, onlyFirst ? void 0 : "g");
  }

  // ../../node_modules/ora/node_modules/strip-ansi/index.js
  function stripAnsi(string) {
    if (typeof string !== "string") {
      throw new TypeError(`Expected a \`string\`, got \`${typeof string}\``);
    }
    return string.replace(ansiRegex(), "");
  }

  // ../../node_modules/ora/index.js
  var import_wcwidth = __toModule(require_wcwidth());

  // ../../node_modules/ora/node_modules/is-interactive/index.js
  function isInteractive({ stream = process.stdout } = {}) {
    return Boolean(stream && stream.isTTY && process.env.TERM !== "dumb" && !("CI" in process.env));
  }

  // ../../node_modules/ora/index.js
  var import_bl = __toModule(require_bl());
  var TEXT = Symbol("text");
  var PREFIX_TEXT = Symbol("prefixText");
  var ASCII_ETX_CODE = 3;
  var StdinDiscarder = class {
    constructor() {
      this.requests = 0;
      this.mutedStream = new import_bl.BufferListStream();
      this.mutedStream.pipe(import_node_process3.default.stdout);
      const self2 = this;
      this.ourEmit = function(event, data, ...args) {
        const { stdin } = import_node_process3.default;
        if (self2.requests > 0 || stdin.emit === self2.ourEmit) {
          if (event === "keypress") {
            return;
          }
          if (event === "data" && data.includes(ASCII_ETX_CODE)) {
            import_node_process3.default.emit("SIGINT");
          }
          Reflect.apply(self2.oldEmit, this, [event, data, ...args]);
        } else {
          Reflect.apply(import_node_process3.default.stdin.emit, this, [event, data, ...args]);
        }
      };
    }
    start() {
      this.requests++;
      if (this.requests === 1) {
        this.realStart();
      }
    }
    stop() {
      if (this.requests <= 0) {
        throw new Error("`stop` called more times than `start`");
      }
      this.requests--;
      if (this.requests === 0) {
        this.realStop();
      }
    }
    realStart() {
      if (import_node_process3.default.platform === "win32") {
        return;
      }
      this.rl = import_node_readline.default.createInterface({
        input: import_node_process3.default.stdin,
        output: this.mutedStream
      });
      this.rl.on("SIGINT", () => {
        if (import_node_process3.default.listenerCount("SIGINT") === 0) {
          import_node_process3.default.emit("SIGINT");
        } else {
          this.rl.close();
          import_node_process3.default.kill(import_node_process3.default.pid, "SIGINT");
        }
      });
    }
    realStop() {
      if (import_node_process3.default.platform === "win32") {
        return;
      }
      this.rl.close();
      this.rl = void 0;
    }
  };
  var stdinDiscarder;
  var Ora = class {
    constructor(options) {
      if (!stdinDiscarder) {
        stdinDiscarder = new StdinDiscarder();
      }
      if (typeof options === "string") {
        options = {
          text: options
        };
      }
      this.options = {
        text: "",
        color: "cyan",
        stream: import_node_process3.default.stderr,
        discardStdin: true,
        ...options
      };
      this.spinner = this.options.spinner;
      this.color = this.options.color;
      this.hideCursor = this.options.hideCursor !== false;
      this.interval = this.options.interval || this.spinner.interval || 100;
      this.stream = this.options.stream;
      this.id = void 0;
      this.isEnabled = typeof this.options.isEnabled === "boolean" ? this.options.isEnabled : isInteractive({ stream: this.stream });
      this.isSilent = typeof this.options.isSilent === "boolean" ? this.options.isSilent : false;
      this.text = this.options.text;
      this.prefixText = this.options.prefixText;
      this.linesToClear = 0;
      this.indent = this.options.indent;
      this.discardStdin = this.options.discardStdin;
      this.isDiscardingStdin = false;
    }
    get indent() {
      return this._indent;
    }
    set indent(indent = 0) {
      if (!(indent >= 0 && Number.isInteger(indent))) {
        throw new Error("The `indent` option must be an integer from 0 and up");
      }
      this._indent = indent;
      this.updateLineCount();
    }
    _updateInterval(interval) {
      if (interval !== void 0) {
        this.interval = interval;
      }
    }
    get spinner() {
      return this._spinner;
    }
    set spinner(spinner) {
      this.frameIndex = 0;
      if (typeof spinner === "object") {
        if (spinner.frames === void 0) {
          throw new Error("The given spinner must have a `frames` property");
        }
        this._spinner = spinner;
      } else if (!isUnicodeSupported()) {
        this._spinner = import_cli_spinners.default.line;
      } else if (spinner === void 0) {
        this._spinner = import_cli_spinners.default.dots;
      } else if (spinner !== "default" && import_cli_spinners.default[spinner]) {
        this._spinner = import_cli_spinners.default[spinner];
      } else {
        throw new Error(`There is no built-in spinner named '${spinner}'. See https://github.com/sindresorhus/cli-spinners/blob/main/spinners.json for a full list.`);
      }
      this._updateInterval(this._spinner.interval);
    }
    get text() {
      return this[TEXT];
    }
    set text(value) {
      this[TEXT] = value;
      this.updateLineCount();
    }
    get prefixText() {
      return this[PREFIX_TEXT];
    }
    set prefixText(value) {
      this[PREFIX_TEXT] = value;
      this.updateLineCount();
    }
    get isSpinning() {
      return this.id !== void 0;
    }
    getFullPrefixText(prefixText = this[PREFIX_TEXT], postfix = " ") {
      if (typeof prefixText === "string") {
        return prefixText + postfix;
      }
      if (typeof prefixText === "function") {
        return prefixText() + postfix;
      }
      return "";
    }
    updateLineCount() {
      const columns = this.stream.columns || 80;
      const fullPrefixText = this.getFullPrefixText(this.prefixText, "-");
      this.lineCount = 0;
      for (const line of stripAnsi(" ".repeat(this.indent) + fullPrefixText + "--" + this[TEXT]).split("\n")) {
        this.lineCount += Math.max(1, Math.ceil((0, import_wcwidth.default)(line) / columns));
      }
    }
    get isEnabled() {
      return this._isEnabled && !this.isSilent;
    }
    set isEnabled(value) {
      if (typeof value !== "boolean") {
        throw new TypeError("The `isEnabled` option must be a boolean");
      }
      this._isEnabled = value;
    }
    get isSilent() {
      return this._isSilent;
    }
    set isSilent(value) {
      if (typeof value !== "boolean") {
        throw new TypeError("The `isSilent` option must be a boolean");
      }
      this._isSilent = value;
    }
    frame() {
      const { frames } = this.spinner;
      let frame = frames[this.frameIndex];
      if (this.color) {
        frame = import_chalk2.default[this.color](frame);
      }
      this.frameIndex = ++this.frameIndex % frames.length;
      const fullPrefixText = typeof this.prefixText === "string" && this.prefixText !== "" ? this.prefixText + " " : "";
      const fullText = typeof this.text === "string" ? " " + this.text : "";
      return fullPrefixText + frame + fullText;
    }
    clear() {
      if (!this.isEnabled || !this.stream.isTTY) {
        return this;
      }
      this.stream.cursorTo(0);
      for (let index = 0; index < this.linesToClear; index++) {
        if (index > 0) {
          this.stream.moveCursor(0, -1);
        }
        this.stream.clearLine(1);
      }
      if (this.indent || this.lastIndent !== this.indent) {
        this.stream.cursorTo(this.indent);
      }
      this.lastIndent = this.indent;
      this.linesToClear = 0;
      return this;
    }
    render() {
      if (this.isSilent) {
        return this;
      }
      this.clear();
      this.stream.write(this.frame());
      this.linesToClear = this.lineCount;
      return this;
    }
    start(text) {
      if (text) {
        this.text = text;
      }
      if (this.isSilent) {
        return this;
      }
      if (!this.isEnabled) {
        if (this.text) {
          this.stream.write(`- ${this.text}
`);
        }
        return this;
      }
      if (this.isSpinning) {
        return this;
      }
      if (this.hideCursor) {
        cli_cursor_default.hide(this.stream);
      }
      if (this.discardStdin && import_node_process3.default.stdin.isTTY) {
        this.isDiscardingStdin = true;
        stdinDiscarder.start();
      }
      this.render();
      this.id = setInterval(this.render.bind(this), this.interval);
      return this;
    }
    stop() {
      if (!this.isEnabled) {
        return this;
      }
      clearInterval(this.id);
      this.id = void 0;
      this.frameIndex = 0;
      this.clear();
      if (this.hideCursor) {
        cli_cursor_default.show(this.stream);
      }
      if (this.discardStdin && import_node_process3.default.stdin.isTTY && this.isDiscardingStdin) {
        stdinDiscarder.stop();
        this.isDiscardingStdin = false;
      }
      return this;
    }
    succeed(text) {
      return this.stopAndPersist({ symbol: log_symbols_default.success, text });
    }
    fail(text) {
      return this.stopAndPersist({ symbol: log_symbols_default.error, text });
    }
    warn(text) {
      return this.stopAndPersist({ symbol: log_symbols_default.warning, text });
    }
    info(text) {
      return this.stopAndPersist({ symbol: log_symbols_default.info, text });
    }
    stopAndPersist(options = {}) {
      if (this.isSilent) {
        return this;
      }
      const prefixText = options.prefixText || this.prefixText;
      const text = options.text || this.text;
      const fullText = typeof text === "string" ? " " + text : "";
      this.stop();
      this.stream.write(`${this.getFullPrefixText(prefixText, " ")}${options.symbol || " "}${fullText}
`);
      return this;
    }
  };
  function ora(options) {
    return new Ora(options);
  }

  // src/commands/FilterCommand.ts
  var FilterCommand = class extends import_cli.BaseCommand {
    commandName = import_clipanion.Option.String();
    args = import_clipanion.Option.Proxy();
    include = import_clipanion.Option.Array("--include");
    exclude = import_clipanion.Option.Array("--exclude");
    async listWorkspaces(project) {
      const include = this.include || [];
      const exclude = this.exclude || [
        import_core4.structUtils.stringifyIdent(project.getWorkspaceByCwd(project.cwd).locator)
      ];
      const cmd = [this.commandName, ...this.args].join(" ");
      const res = await listChangedWorkspaces({
        project,
        cmd,
        exclude,
        include
      });
      res.workspaces = filterWorkspaces({
        workspaces: res.workspaces,
        include,
        exclude
      });
      return res;
    }
    async main() {
      const configuration = await import_core4.Configuration.find(this.context.cwd, this.context.plugins);
      const { project, workspace } = await import_core4.Project.find(configuration, this.context.cwd);
      if (!workspace) {
        throw new import_cli.WorkspaceRequiredError(project.cwd, this.context.cwd);
      }
      const spinner = ora({
        color: "blue"
      });
      spinner.start("\u5F00\u59CB\u8BA1\u7B97\u53D8\u66F4\u7684\u6A21\u5757");
      const changed = await this.listWorkspaces(project);
      if (!changed.workspaces.length) {
        spinner.stopAndPersist({
          text: "\u6CA1\u6709\u53D8\u66F4\u7684\u6A21\u5757"
        });
        return null;
      }
      spinner.stopAndPersist({
        text: `\u8BA1\u7B97\u5F97\u5230\u53D8\u66F4\u7684\u6A21\u5757: 
${changed.workspaces.map((item) => import_core4.structUtils.stringifyIdent(item.locator)).join("\n")}`
      });
      return changed;
    }
  };

  // src/commands/ChangedForeachCommand.ts
  var import_clipanion2 = __toModule(__require("clipanion"));
  var import_core5 = __toModule(__require("@yarnpkg/core"));
  var import_chalk3 = __toModule(require_source());
  var ChangedForeachCommand = class extends FilterCommand {
    verbose = import_clipanion2.Option.Boolean("-v,--verbose", false);
    parallel = import_clipanion2.Option.Boolean("-p,--parallel", false);
    interlaced = import_clipanion2.Option.Boolean("-i,--interlaced", false);
    topological = import_clipanion2.Option.Boolean("-t,--topological", false);
    topologicalDev = import_clipanion2.Option.Boolean("--topological-dev", false);
    jobs = import_clipanion2.Option.String("-j,--jobs");
    async execute() {
      const changed = await this.main();
      if (changed === null) {
        return;
      }
      const strings = [
        "workspaces",
        "foreach",
        ...changed.workspaces.reduce((acc, ws) => [
          ...acc,
          "--include",
          import_core5.structUtils.stringifyIdent(ws.locator)
        ], []),
        ...this.verbose ? ["--verbose"] : [],
        ...this.parallel ? ["--parallel"] : [],
        ...this.interlaced ? ["--interlaced"] : [],
        ...this.topological ? ["--topological"] : [],
        ...this.topologicalDev ? ["--topological-dev"] : [],
        ...this.jobs ? ["--jobs", `${this.jobs}`] : [],
        this.commandName,
        ...this.args
      ];
      const res = await this.cli.run(strings, this.context);
      if (res === 0) {
        await changed.updateCache();
        console.log(import_chalk3.default.green("\u8FD0\u884C\u5B8C\u6210"));
      } else {
        console.log(import_chalk3.default.red("\u8FD0\u884C\u5931\u8D25"));
      }
      return res;
    }
  };
  __publicField(ChangedForeachCommand, "usage", import_clipanion2.Command.Usage({
    description: "\u57FA\u4E8E git \u8BA1\u7B97\u53D8\u66F4\u7684\u6A21\u5757\uFF0C\u7136\u540E\u4EC5\u8FD0\u884C\u53D8\u66F4\u7684\u6A21\u5757",
    examples: [
      [
        "\u6309\u7167\u4F9D\u8D56\u56FE\u5728\u6240\u6709\u6A21\u5757\u4E2D\u8FD0\u884C initialize \u521D\u59CB\u5316\u547D\u4EE4",
        "yarn changed foreach -p --topological-dev run initialize"
      ]
    ]
  }));
  __publicField(ChangedForeachCommand, "paths", [["changed", "foreach"]]);

  // src/commands/ChangedListCommand.ts
  var import_clipanion3 = __toModule(__require("clipanion"));
  var ChangedListCommand = class extends FilterCommand {
    async execute() {
      await this.main();
    }
  };
  __publicField(ChangedListCommand, "usage", import_clipanion3.Command.Usage({
    description: "\u57FA\u4E8E git \u8BA1\u7B97\u53D8\u66F4\u7684\u6A21\u5757\uFF0C\u7136\u540E\u5217\u51FA\u53D8\u66F4\u7684\u6A21\u5757",
    examples: [
      [
        "\u5217\u51FA initialize \u547D\u4EE4\u81EA\u4E0A\u6B21\u8FD0\u884C\u540E\u53D8\u66F4\u7684\u6A21\u5757",
        "yarn changed list run initialize"
      ]
    ]
  }));
  __publicField(ChangedListCommand, "paths", [["changed", "list"]]);

  // src/index.ts
  var plugin = {
    commands: [ChangedListCommand, ChangedForeachCommand]
  };
  var src_default = plugin;
  return src_exports;
})();
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
return plugin;
}
};

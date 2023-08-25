import { fileURLToPath, URL } from "node:url";
import * as fs from "node:fs";
import { defineConfig, loadEnv } from "vite";
import type { ConfigEnv } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver, VueUseComponentsResolver, VueUseDirectiveResolver } from "unplugin-vue-components/resolvers";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import viteCompression from "vite-plugin-compression";
import visualizer from "rollup-plugin-visualizer";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

function resolve(dir: any) {
  return fileURLToPath(new URL(dir, import.meta.url));
}

// 排除重载的依赖项
const optimizeDepsElementPlusIncludes = ["element-plus", "element-plus/es"];
fs.readdirSync("node_modules/element-plus/es/components").forEach(dirname => {
  fs.access(`node_modules/element-plus/es/components/${dirname}/style/css.mjs`, err => {
    if (!err) {
      optimizeDepsElementPlusIncludes.push(`element-plus/es/components/${dirname}/style/css`);
    }
  });
});

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }: ConfigEnv) => {
  // lintOnSave: false,
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'scss',
  //     patterns: []
  //   }
  // },
  const env = loadEnv(mode, process.cwd());
  // console.log(`++++++++ `, env);
  return {
    base: env.VITE_PUBLIC_PATH,
    css: {
      preprocessorOptions: {
        scss: {
          // 全局变量
          // additionalData: `@import '/src/assets/styles/variables.scss';` // 引入全局变量文件
          // additionalData: `$injectedColor: orange;` // 全局变量
        }
      }
    },
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT || 7199),
      strictPort: true,
      hmr: {
        overlay: false
      },
      // https: false,
      // https: {
      //   // 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
      //   cert: fs.readFileSync(resolve("src/ssl/cert.pem")),
      //   key: fs.readFileSync(resolve("src/ssl/key.pem"))
      // },
      cors: true,
      proxy: {
        "/sei-tm": {
          rewrite: path => path.replace(/^\/sei-tm/, ""),
          //映射域名
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          headers: {
            // 'Content-Type': 'application/json;charset=utf-8',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, Content-Type"
          }
        },
        "/sei-app": {
          rewrite: path => path.replace(/^\/sei-app/, ""),
          //映射域名
          target: env.VITE_BASE_URL,
          //是否跨域
          changeOrigin: true,
          headers: {
            // 'Content-Type': 'application/json;charset=utf-8',
            "Content-Type": "application/x-www-form-urlencoded",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Connection, User-Agent, Cookie, Content-Type"
          }
        },
        "/sei-tm2": {
          rewrite: path => path.replace(/^\/sei-tm2/, ""),
          //映射域名
          target: env.VITE_BASE_URL,
          changeOrigin: true
        },
        "/sei-app2": {
          rewrite: path => path.replace(/^\/sei-app2/, ""),
          //映射域名
          target: env.VITE_BASE_URL,
          //是否跨域
          changeOrigin: true
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // ElementPlus
      AutoImport({
        // deep: true,
        imports: [
          "vue",
          "vue-router",
          "pinia",
          "@vueuse/core",
          // custom
          {
            ethers: [
              ["Wallet", "EvmWallet"],
              ["Contract", "EvmContract"],
              ["BigNumber", "EvmBigNumber"],
              ["providers", "evmProviders"],
              ["utils", "evmUtils"]
            ],
            axios: [
              ["default", "axios"] // import { default as axios } from 'axios',
            ]
          }
        ],
        resolvers: [
          ElementPlusResolver(),
          IconsResolver({
            prefix: "Icon"
          })
        ]
      }),
      Components({
        resolvers: [
          IconsResolver({
            enabledCollections: ["ep"]
          }),
          ElementPlusResolver(),
          VueUseComponentsResolver(),
          VueUseDirectiveResolver()
        ]
      }),
      Icons({
        autoInstall: true
      }),
      // gzip静态资源压缩配置
      viteCompression({
        verbose: true,
        disable: false,
        // windows nginx 访问需要保留源文件
        deleteOriginFile: "true" === env.VITE_BUILD_DELETE_ORIGIN_FILE,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
        filter: /\.(js|mjs|css|txt|html|ico|svg)(\?.*)?$/i
      }),
      visualizer({
        open: false
      })
    ],
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: resolve("./src") + "/"
        }
      ],
      extensions: [".less", ".sass", ".css", ".js", ".jsx", ".mjs", ".mts", ".ts", ".tsx", ".json"]
    },
    build: {
      commonjsOptions: {
        // include: ["@cd/helpers"]
      },
      //   关闭文件计算
      reportCompressedSize: false,
      // 关闭生成map文件 可以达到缩小打包体积
      // 这个生产环境一定要关闭，不然打包的产物会很大
      sourcemap: false,
      rollupOptions: {
        output: {
          // key自定义 value[] 插件同步package.json名称 或 src/相对路径下的指定文件 （自己可以看manualChunks ts类型）
          manualChunks: {
            // 打包优化
            // 合并打包: vue vue-router, ....
            core: ["vue", "vue-router", "pinia", "vue-request", "axios", "@vueuse/core", "@vueuse/components"],
            walletCore: ["ethers"],
            tools: ["js-base64", "mobile-detect", "is-unicode-supported", "bowser", "decimal.js"],
            elIcon: ["@element-plus/icons-vue"],
            echarts: ["echarts"],
            lodash: ["lodash-es"],
            cosmJsCore: ["@cosmjs/cosmwasm-stargate", "@cosmjs/stargate"],
            seiCore: ["@sei-js/core"],
            starknetCore: ["starknet", "get-starknet", "micro-starknet"]
            // core: ['vue', 'vue-router', 'pinia', 'vue-request', 'vue-i18n/dist/vue-i18n.cjs.js', 'jquery', 'axios'],
            // mock: [resolve('./mock')],
          }
        }
      }
    },
    optimizeDeps: {
      //因为项目中很多用到了自动引入和动态加载，所以vite首次扫描依赖项会扫描不全，这里强制扫描全局。
      // entries: ["src/**/*.{ts,tsx,js,jsx,vue,json}"],
      include: [
        // "vue",
        // "vue-router",
        // "vue-number-format",
        // "pinia",
        // "echarts",
        // "lodash-es",
        // "@vueuse/core",
        // "@cosmjs/cosmwasm-stargate",
        // "@cosmjs/stargate",
        // "@sei-js/core",
        // // "map-factory",
        // "element-plus",
        // "element-plus/es",
        // "@element-plus/icons-vue",
        // // 'axios',
        // // 'vue-request',
        // ...optimizeDepsElementPlusIncludes,
        // ...fs
        //   .readdirSync(resolve("node_modules/element-plus/es/components"))
        //   .filter(name => {
        //     // "tooltip-v2" === name ||
        //     return !("collection" === name || "focus-trap" === name || "index.d.ts" === name || "roving-focus-group" === name || "slot" === name || "visual-hidden" === name);
        //   })
        //   .map(name => "element-plus/es/components/" + name + "/style/index"),
        // ...fs
        //   .readdirSync(resolve("node_modules/element-plus/es/components"))
        //   .filter(name => {
        //     return !("collection" === name || "focus-trap" === name || "index.d.ts" === name || "roving-focus-group" === name || "slot" === name || "visual-hidden" === name);
        //   })
        //   .map(name => {
        //     // console.log("element-plus/es/components/" + name + "/style/css");
        //     return "element-plus/es/components/" + name + "/style/css";
        //   })
        //因为core-js为babel动态引入,这里手动设置core-js/modules预构建,如果babelHelpers不是runtime模式可忽略此选项
        // ...fs.readdirSync(resolve("node_modules/core-js/modules")).map((name) => "core-js/modules/" + name)
      ]
    },
    define: {
      // "process.env": { }
    }
  };
});

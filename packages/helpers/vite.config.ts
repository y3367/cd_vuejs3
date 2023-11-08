import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import * as fs from "node:fs";
import { fileURLToPath, URL } from "node:url";
import visualizer from "rollup-plugin-visualizer";
import AutoImport from "unplugin-auto-import/vite";
import IconsResolver from "unplugin-icons/resolver";
import Icons from "unplugin-icons/vite";
import { ElementPlusResolver, VueUseComponentsResolver, VueUseDirectiveResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import type { ConfigEnv } from "vite";
import { defineConfig, loadEnv } from "vite";
import viteCompression from "vite-plugin-compression";

function resolve(dir: any) {
  return fileURLToPath(new URL(dir, import.meta.url));
}

// Exclude overloaded dependencies
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
  return {
    base: env.VITE_PUBLIC_PATH,
    server: {
      host: "0.0.0.0",
      port: Number(env.VITE_APP_PORT || 3000),
      strictPort: true,
      hmr: {
        overlay: false
      },
      cors: true
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
      viteCompression({
        verbose: true,
        disable: false,
        // requires preserving source files when use nginx in windows
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
      // Turn off file calculation
      reportCompressedSize: false,
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            // Merge and package: vue vue-router, ....
            core: ["vue", "vue-router", "pinia", "vue-request", "axios", "@vueuse/core", "@vueuse/components"],
            walletCore: ["ethers"],
            tools: ["js-base64", "mobile-detect", "is-unicode-supported", "bowser", "decimal.js"],
            elIcon: ["@element-plus/icons-vue"],
            echarts: ["echarts"],
            lodash: ["lodash-es"]
            // core: ['vue', 'vue-router', 'pinia', 'vue-request', 'vue-i18n/dist/vue-i18n.cjs.js', 'jquery', 'axios'],
            // mock: [resolve('./mock')],
          }
        }
      }
    },
    optimizeDeps: {
      // entries: ["src/**/*.{ts,tsx,js,jsx,vue,json}"],
      include: [
        // "vue",
        // "vue-router",
        // "vue-number-format",
        // "pinia",
        // "echarts",
        // "lodash-es",
        // "@vueuse/core",
      ]
    }
  };
});

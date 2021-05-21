import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [reactRefresh()],
    alias: {
        // 键必须以斜线开始和结束
        "/@/": path.resolve(__dirname, "./src"),
    },
    hostname: "0.0.0.0",
    port: 8080,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: "./",
    /**
     * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
     * @default 'dist'
     */
    outDir: "dist",
    // 反向代理
    proxy: {
        "/api": {
            target: "https://blog.csdn.net/weixin_45292658",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
        },
    },
});
// vite.config.js # or vite.config.ts

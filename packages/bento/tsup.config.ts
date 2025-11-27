import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    "primitives/alert": "src/primitives/alert/index.ts",
    "primitives/badge": "src/primitives/badge/index.ts",
    "primitives/button": "src/primitives/button/index.ts",
    "primitives/card": "src/primitives/card/index.ts",
    "primitives/checkbox": "src/primitives/checkbox/index.ts",
    "primitives/dialog": "src/primitives/dialog/index.ts",
    "primitives/field": "src/primitives/field/index.ts",
    "primitives/input": "src/primitives/input/index.ts",
    "primitives/label": "src/primitives/label/index.ts",
    "primitives/native-select": "src/primitives/native-select/index.ts",
    "primitives/separator": "src/primitives/separator/index.ts",
    "primitives/table": "src/primitives/table/index.ts",
    "primitives/textarea": "src/primitives/textarea/index.ts",
    "utils/cn": "src/utils/cn.ts",
  },
  format: "esm",
  dts: true,
  splitting: true,
  sourcemap: true,
  treeshake: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    console.log(options);
    options.chunkNames = "chunks/[name]-[hash]";
  },
});

import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  platform: "node",
  banner: {
    js: "#!/usr/bin/env node",
  },
  outExtension: ({ format }) => ({
    js: `.${format}`,
  }),
});

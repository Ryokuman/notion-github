import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/cli.ts"],
  format: ["cjs"],
  dts: false,
  clean: true,
  platform: "node",
  noExternal: ["commander"],
  banner: {
    js: "#!/usr/bin/env node",
  },
});

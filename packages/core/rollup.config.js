import del from "rollup-plugin-delete";
import pkg from "./package.json";
import ts from "@wessberg/rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";

// delete old typings to avoid issues
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("fs").unlink("lib/index.d.ts", () => {});

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
        },
        {
            file: pkg.module,
            format: "es",
        },
        {
            file: pkg.browser,
            format: "iife",
            name: "OrbaOneVerifyCore",
        },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
        ts({
            typescript: require("typescript"),
            tsconfig: "./tsconfig.json",
        }),

        del({
            targets: "lib",
            hook: "buildStart",
        }),

        terser({ compress: true }),
    ],
};

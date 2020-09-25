import del from "rollup-plugin-delete";
import pkg from "./package.json";
import ts from "@wessberg/rollup-plugin-ts";

// delete old typings to avoid issues
require("fs").unlink("lib/index.d.ts", (err) => {});

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
    ],
};

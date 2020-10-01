import del from "rollup-plugin-delete";
import ts from "@wessberg/rollup-plugin-ts";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

import packageJson from "./package.json";

export default {
    input: "./src/index.tsx",
    output: [
        {
            file: packageJson.main,
            format: "cjs",
        },
        {
            file: packageJson.module,
            format: "esm",
        },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
        del({
            targets: "lib",
            hook: "buildStart",
        }),

        resolve(),
        commonjs(),
        ts({
            typescript: require("typescript"),
            tsconfig: "./tsconfig.json",
        }),
    ],
};

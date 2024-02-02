import del from "rollup-plugin-delete";
import pkg from "./package.json";
import ts from "rollup-plugin-ts";
import { terser } from "rollup-plugin-terser";

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
            file: pkg["umd:main"],
            format: "umd",
            name: "OrbaOne",
        },
    ],
    external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
    plugins: [
        del({
            targets: "lib",
            hook: "buildStart",
        }),
        ts({
            typescript: require("typescript"),
            tsconfig: "./tsconfig.json",
        }),

        terser({ compress: true }),
    ],
};

import CopyWebpackPlugin from "copy-webpack-plugin";
import type { Configuration } from "webpack";
import { rules } from "./webpack.rules";

export const mainConfig: Configuration = {
    /**
     * This is the main entry point for your application, it's the first file
     * that runs in the main process.
     */
    entry: "./src/index.ts",
    // Put your normal webpack config below here
    module: {
        rules,
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [{ from: "static", to: "static" }],
        }),
    ],
    resolve: {
        extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
    },
};

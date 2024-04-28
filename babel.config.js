module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: [
          {
            "@components": "./src/components",
          },
          {
            "@constants": "./src/constants",
          },
          {
            "@navigation": "./src/navigation",
          },
          {
            "@screens": "./src/screens",
          },
          {
            "@services": "./src/services",
          },
          {
            "@store": "./src/store/",
          },
          {
            "@types": "./src/types",
          },
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};

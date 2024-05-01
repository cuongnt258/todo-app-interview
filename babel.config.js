module.exports = {
  presets: ["module:@react-native/babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        alias: [
          {
            "@assets": "./src/assets/",
          },
          {
            "@components": "./src/components",
          },
          {
            "@constants": "./src/constants",
          },
          {
            "@contexts": "./src/contexts",
          },
          {
            "@context": "./src/context",
          },
          {
            "@hooks": "./src/hooks",
          },
          {
            "@models": "./src/models",
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
            "@store": "./src/store",
          },
          {
            "@types": "./src/types",
          },
          {
            "@utils": "./src/utils/",
          },
        ],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "react-native-reanimated/plugin",
  ],
};

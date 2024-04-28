module.exports = {
  bracketSpacing: true,
  bracketSameLine: false,
  singleQuote: false,
  trailingComma: "all",
  tabWidth: 2,
  semi: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "((^|,)(react|react-native))",
    "<THIRD_PARTY_MODULES>",
    "^@assets/(.*)$",
    "^@components/(.*)$",
    "^@constants/(.*)$",
    "^@contexts/(.*)$",
    "^@hooks/(.*)$",
    "^@navigators/(.*)$",
    "^@screens/(.*)$",
    "^@services/(.*)$",
    "^@types/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
};

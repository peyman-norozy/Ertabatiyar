const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const defaultConfig = getDefaultConfig(__dirname);

// پیکربندی سفارشی ما برای svg
const customConfig = {
    transformer: {
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== "svg"),
        sourceExts: [...defaultConfig.resolver.sourceExts, "svg"],
    },
};

// ترکیب با پیکربندی اصلی
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// افزودن NativeWind
module.exports = withNativeWind(mergedConfig, { input: "./global.css" });

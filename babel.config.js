module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    ["module-resolver", {
      "extensions": [".ios.js", ".android.js", ".js", ".json"],
      "alias": {
        "utp-native": "./shims/utp-native.js",
        "dns": "./shims/dns.js"
      }
    }]
  ]
}

/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-22 11:42:20
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-22 15:14:59
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      "import",
      {
        "libraryName": "vant",
        "libraryDirectory": "es",
        "style": true
      }
    ]
  ]
}

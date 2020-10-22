/**
 * 自定义cmd插件
 * @author LiQun
 * @date 2019/4/14
 */
const cmdPlugin = {
    install (Vue) {
        Vue.prototype.$cmd = require('node-cmd')
    }
}

export default cmdPlugin

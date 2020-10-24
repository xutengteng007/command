<template>
    <div>
        <div id="terminal"></div>
    </div>
</template>
<script>
    import {Terminal} from "xterm";
    import "xterm/css/xterm.css";

    export default {
        // name: 'open-shell',
        props: {
            rootPath: '',
            console: {},

        },
        data() {
            return {
                twinOrder: ''
            }
        },
        mounted() {

        },
        watch: {
            rootPath(v) {
                if (v != '') {
                    this.termPlugin()
                }
            }
        },
        methods: {
            termPlugin() {
                let term = new Terminal({
                    cursorStyle: 'underline', //光标样式
                    cursorBlink: true, // 光标闪烁
                    convertEol: true, //启用时，光标将设置为下一行的开头
                    disableStdin: false, //是否应禁用输入。
                    theme: {
                        foreground: 'yellow', //字体
                        background: '#060101', //背景色
                        cursor: 'help',//设置光标
                    }
                });
                term.open(document.getElementById('terminal'));
                this.runFakeTerminal(term);
            },
            runFakeTerminal(term) {
                var _ = this
                if (term._initialized) {
                    return;
                }

                term._initialized = true;

                term.write('Microsoft Windows [版本 10.0.18362.1139]\n' +
                    '(c) 2019 Microsoft Corporation。保留所有权利。\r\n');

                this.prompt(term);

                term.onKey(e => {
                    const printable = !e.domEvent.altKey && !e.domEvent.altGraphKey && !e.domEvent.ctrlKey && !e.domEvent.metaKey;
                    if (e.domEvent.keyCode === 13) {
                        // todo 切换盘符
                        // var _order01 = _.twinOrder.substring(0, 3)
                        // var _order02 = _.twinOrder.substring(1, 1)
                        // if (_order01.substring(0, 3) === 'cd '
                        //     || _order02.substring(1, 1) === ':') {
                        //     _.switchDirectory(_.twinOrder)
                        // } else {
                        _.exec(term, _.twinOrder)
                        // }

                        _.prompt(term);
                        _.twinOrder = ''
                        // todo 退格问题
                    } else if (e.domEvent.keyCode === 8) {
                        if (term._core.buffer.x > _.rootPath.length) {
                            term.write('\b \b');
                        }
                    } else if (printable) {
                        _.twinOrder += e.key
                        term.write(e.key);
                    }
                    //console.log(e.key);
                });
            },
            // 当前目录
            prompt(term) {
                var _ = this
                term.write('\r\n' + _.rootPath);
            },
            // 改变目录
            async switchDirectory(order) {
                var _ = this
                await this.$emit('exec', order)
                // todo 判断系统找不到指定路径
                await this.$emit('exec', 'chdir')
                _.rootPath = _.console
            },
            async exec(term, order) {
                var _ = this
                // 执行命令并打印结果
                // todo 异步问题解决
                await this.$emit('exec', order)
                term.write('\r\n' + _.console);
            },
        }
    }
</script>
<style scoped>
</style>

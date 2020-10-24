<template>
    <div id="wrapper">
        <main>
            <Row>
                <Col span="7">
                    <div class="doc">
                        <div class="title alt">Nacos</div>
                        <Button type="primary" @click="start">start</Button>
                        <Button>stop</Button>
                    </div>
                    <div class="doc">
                        <div class="title alt">Redis</div>
                        <Button type="primary" @click="start">start</Button>
                        <Button>stop</Button>
                    </div>
                    <div class="doc">
                        <div class="title alt">Custom</div>
                        <Input v-model="order"></Input>
                        <Button @click="exec(order)">exec</Button>
                    </div>
                </Col>
                <Col span="17">
                    <Tabs type="card" closable @on-tab-remove="handleTabRemove">
                        <TabPane :label="cmd.name" :name="cmd.name" v-if="cmd.select" v-for="cmd in command">
                            <Command :root-path="absolute" @exec="exec" :console="console"></Command>
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
        </main>
    </div>
</template>

<script>
    import Command from './cmd/Command'

    export default {
        name: 'landing-page',
        components: {Command},
        data() {
            return {
                order: '',
                url: '',
                console: '',
                command: [{
                    name: 'cmd',
                    select: true
                }],
                absolute: ''
            }
        },
        created() {
            this.$nextTick(this.absolutePath())
        },
        methods: {
            start() {
                var _ = this
                this.$cmd.get(
                    'ipconfig',
                    function (err, data, stderr) {
                        _.console = data
                    }
                )
            },
            exec(order) {
                var _ = this
                // todo 新建窗口
                // this.command.push({
                //     name: 'cmd01',
                //     select: true
                // })
                this.$cmd.get(
                    order,
                    function (err, data, stderr) {
                        _.console = data
                    }
                )
            },
            absolutePath() {
                var _ = this
                return new Promise((resolve, reject) => {
                    this.$cmd.get(
                        'chdir',
                        function (err, data, stderr) {
                            _.absolute = data.replace('\n', '').replace('\r', '') + '>'
                            resolve()
                        }
                    )
                })
            },
            handleTabRemove(name) {
                this['tab' + name] = false;
            }
        }
    }
</script>

<style>

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Source Sans Pro', sans-serif;
    }

    #wrapper {
        background: radial-gradient(
                ellipse at top left,
                rgba(255, 255, 255, 1) 40%,
                rgba(229, 229, 229, .9) 100%
        );
        height: 100vh;
        padding: 60px 80px;
        width: 100vw;
    }

    main {
        display: flex;
        justify-content: space-between;
    }

    main > div {
        flex-basis: 50%;
    }

    .title {
        color: #2c3e50;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 6px;
    }

    .title.alt {
        font-size: 18px;
        margin-bottom: 10px;
    }

    .doc p {
        color: black;
        margin-bottom: 10px;
    }
</style>

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
                        <Button @click="exec">exec</Button>
                    </div>
                </Col>
                <Col span="17">
                    <Tabs value="name1">
                        <TabPane label="console" name="name1">
                            <!--                            <xterm :socketURI="url"></xterm>-->
                            {{console}}
                        </TabPane>
                        <TabPane label="标签二" name="name2">标签二的内容</TabPane>
                        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
                    </Tabs>
                </Col>
            </Row>
        </main>
    </div>
</template>

<script>

    // import Xterm from "./cmd/OpenShell";

    export default {
        name: 'landing-page',
        // components: {Xterm},
        data() {
            return {
                order: '',
                url: '',
                console: ''
            }
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
            exec() {
                var _ = this
                this.$cmd.get(
                    _.order,
                    function (err, data, stderr) {
                        _.console = data
                    }
                )
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

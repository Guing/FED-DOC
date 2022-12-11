class logPlugin {
    constructor(config) {
        this.config = config
    }
    apply(complier) {
        complier.hooks.emit.tap('log', () => {
            console.log('log');
        })
    }
}
module.exports = logPlugin;
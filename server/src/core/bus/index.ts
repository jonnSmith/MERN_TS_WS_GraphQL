const { PubSub } = require('apollo-server');

class CoreBus {
    private static Bus;

    public get pubsub() {
        // tslint:disable-next-line:no-unused-expression
        if(!CoreBus.Bus) { new CoreBus(); }
        return CoreBus.Bus;
    }

    constructor() {
        CoreBus.Bus = CoreBus.Bus || new PubSub();
    }
}

export { CoreBus };

import { PubSub } from  'graphql-subscriptions';

class CoreBus {
    private static Bus;

    public static get pubsub() {
        // tslint:disable-next-line:no-unused-expression
        if(!CoreBus.Bus) { new CoreBus(); }
        return CoreBus.Bus;
    }

    constructor() {
        CoreBus.Bus = CoreBus.Bus || new PubSub({});
    }
}

export { CoreBus };

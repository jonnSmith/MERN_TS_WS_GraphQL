import { PubSub } from  'graphql-subscriptions';

class CoreBus {
    private static Bus;

    public static get pubsub() {
        if(!CoreBus.Bus) { new CoreBus(); }
        return CoreBus.Bus;
    }

    constructor() {
        CoreBus.Bus = CoreBus.Bus || new PubSub({});
    }
}

export { CoreBus };

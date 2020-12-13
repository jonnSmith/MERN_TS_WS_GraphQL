import { PubSub, PubSubEngine } from  'graphql-subscriptions';

class CoreBus {
    private static Bus: PubSubEngine;

    public static get pubsub(): PubSubEngine {
        if(!CoreBus.Bus) { new CoreBus(); }
        return CoreBus.Bus;
    }

    constructor() {
        CoreBus.Bus = CoreBus.Bus || new PubSub({});
    }
}

export { CoreBus };

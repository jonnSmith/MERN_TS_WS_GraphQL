import {ConfigSettings} from "@appchat/core/config";
import {StorageEngines, SupportedStorageEngines} from "@appchat/core/store/types";

class ClientStorage {
    public static read(key: string) {
        // tslint:disable-next-line:no-unused-expression
        if (!ClientStorage.Engine) { new ClientStorage(); }
        return ClientStorage.Engine.getItem(key);
    }

    public static write(key: string, value: string) {
        // tslint:disable-next-line:no-unused-expression
        if (!ClientStorage.Engine) { new ClientStorage(); }
        return ClientStorage.Engine.setItem(key, value);
    }

    private static Engines: StorageEngines = {localStorage, sessionStorage};
    private static Engine: Storage;

    private constructor() {
        ClientStorage.Engine =
            ClientStorage.Engine ||
            ClientStorage.Engines[ConfigSettings.token.engine as SupportedStorageEngines];
    }

}

export {ClientStorage};

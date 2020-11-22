import { App } from "@appchat/app";
import * as React from "react";
import {ReactInstance} from "react";
import * as TestUtils from "react-dom/test-utils";

it("App is rendered", () => {
    // Render App in the document
    const appElement: ReactInstance | void = TestUtils.renderIntoDocument(
        <App/>
    );
    expect(appElement).toBeDefined();
});

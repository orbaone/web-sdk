import { createIframe } from "./iframe";
import { getExampleDOM } from "../../../../tests/utils";

import { waitForElementToBeRemoved, screen } from "@testing-library/dom";

const config = {
    url: "http://test.com",
    onSuccess: () => null,
    onError: () => null,
};

beforeEach(() => {
    document.body.innerHTML = getExampleDOM();
});

describe("iframe test case", function () {
    it("should return a iframe element", () => {
        const iframe = createIframe(config.url, config.onSuccess, config.onError);
        expect(iframe.el.nodeName).toBe("IFRAME");
    });

    it("should render iframe", () => {
        const iframe = createIframe(config.url, config.onSuccess, config.onError);

        iframe.connect();

        expect(screen.getByTestId("orba-iframe"));
    });

    it("should render and remove iframe", async () => {
        const iframe = createIframe(config.url, config.onSuccess, config.onError);

        iframe.connect();

        setInterval(() => {
            iframe.disconnect();
        }, 1000);

        await waitForElementToBeRemoved(() => screen.getByTestId("orba-iframe"));

        expect(screen.queryByTestId("orba-iframe")).toBeNull();
    });
});

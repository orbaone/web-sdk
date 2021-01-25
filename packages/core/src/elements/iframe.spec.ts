import { createIframe } from "./iframe";
import { getExampleDOM } from "../../../../tests/utils";

import { waitForElementToBeRemoved, screen } from "@testing-library/dom";

const config = {
    url: "http://test.com",
    applicantId: "",
    onCancelled: () => null,
    onSuccess: () => null,
    onError: () => null,
    onChange: () => null,
};

beforeEach(() => {
    document.body.innerHTML = getExampleDOM();
});

describe("iframe test case", function () {
    it("should return a iframe element", () => {
        const iframe = createIframe(config.url, config.applicantId, config.onSuccess, config.onCancelled, config.onError, config.onChange);
        expect(iframe.el.nodeName).toBe("IFRAME");
    });

    it("should render iframe", () => {
        const iframe = createIframe(config.url, config.applicantId, config.onSuccess, config.onCancelled, config.onError, config.onChange);

        iframe.connect();

        expect(screen.getByTestId("orba-iframe"));
    });

    it("should render and remove iframe", async () => {
        const iframe = createIframe(config.url, config.applicantId, config.onSuccess, config.onCancelled, config.onError, config.onChange);

        iframe.connect();

        setInterval(() => {
            iframe.disconnect();
        }, 1000);

        await waitForElementToBeRemoved(() => screen.getByTestId("orba-iframe"));

        expect(screen.queryByTestId("orba-iframe")).toBeNull();
    });
});

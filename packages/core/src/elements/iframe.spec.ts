import { createIframe } from "./iframe";
import { getExampleDOM } from "../../../../tests/utils";

import { waitForElementToBeRemoved, screen } from "@testing-library/dom";
import { IFrameConfig } from "../helpers/types";

const config: IFrameConfig = {
    url: "http://test.com",
    applicantId: "",
    useAudioInstructions: false,
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
        const iframe = createIframe(config);
        expect(iframe.el.nodeName).toBe("IFRAME");
    });

    it("should render iframe", () => {
        const iframe = createIframe(config);

        iframe.connect();

        expect(screen.getByTestId("orba-iframe"));
    });

    it("should render and remove iframe", async () => {
        const iframe = createIframe(config);

        iframe.connect();

        setInterval(() => {
            iframe.disconnect();
        }, 1000);

        await waitForElementToBeRemoved(() => screen.getByTestId("orba-iframe"));

        expect(screen.queryByTestId("orba-iframe")).toBeNull();
    });
});

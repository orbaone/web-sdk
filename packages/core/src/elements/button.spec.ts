import { createButton } from "./button";
import { getExampleDOM } from "../../../../tests/utils";

import fetchMock from "jest-fetch-mock";
import { getByTestId, getByText } from "@testing-library/dom";

beforeEach(() => {
    fetchMock.resetMocks();
    document.body.innerHTML = getExampleDOM();
});

describe("create button test case", function () {
    it("should return a button element with target being dom element", () => {
        const target = document.createElement("button");
        target.classList.add("button");
        const button = createButton(target);

        expect(button.el.nodeType);
    });

    it("should return a dom element with target being query string", () => {
        const button = createButton("#button");
        expect(button.el.nodeType);
    });

    it("should return a button element with default styles", () => {
        const target = document.createElement("button");
        const buttonEl = createButton(target).el;
        expect(buttonEl.style).toBeDefined();
        expect(getByText(buttonEl, "Verify Me"));
    });

    it("should return a button element without styles", () => {
        const target = document.createElement("button");
        const buttonEl = createButton(target, true).el;
        expect(buttonEl.style).toBeDefined();
        expect(getByText(buttonEl, ""));
    });

    it("should show button loader", () => {
        const target = document.createElement("button");
        const button = createButton(target);
        button.setState("loading");

        expect(getByTestId(button.el, "loader"));
    });

    it("should show text 'In Progress'", () => {
        const target = document.createElement("button");
        const button = createButton(target);
        button.setState("success");

        expect(getByText(button.el, "In Progress"));
    });

    it("should show text 'Could Not Start Veriification'", () => {
        const target = document.createElement("button");
        const button = createButton(target);
        button.setState("error");

        expect(getByText(button.el, "Could Not Start Veriification"));
    });
});

import { renderButton } from ".";
import { getExampleDOM } from "../../../tests/utils";

import fetchMock from "jest-fetch-mock";
import { getByText, getByTestId, fireEvent } from "@testing-library/dom";

const config = {
    apiKey: "test",
    target: "#button",
    onSuccess: () => null,
    onError: () => null,
    steps: [],
};

beforeEach(() => {
    fetchMock.resetMocks();
    document.body.innerHTML = getExampleDOM();
});

describe("renderButton test case", function () {
    it("should render to a given target", () => {
        const container = document.body;
        renderButton(config);
        expect(getByText(container, "Verify Me"));
    });

    it("should render to a given target thats is a dom node", () => {
        const container = document.body;
        const button = document.createElement("button");

        container.appendChild(button);

        renderButton({
            ...config,
            target: button,
        });
        expect(getByText(container, "Verify Me"));
    });

    it("should render without default styles", () => {
        const container = document.body;

        renderButton({
            ...config,
            disableStyle: true,
        });
        expect(getByTestId(container, "button").innerHTML).toBe("");
    });

    it("should show loader when clicked", () => {
        const container = document.body;
        renderButton(config);

        //fire mouse click
        fireEvent(
            getByText(container, "Verify Me"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            }),
        );
        expect(getByTestId(container, "loader"));
    });

    it("should try to fetch an applicantId", async () => {
        const container = document.body;
        renderButton(config);
        //Fire mouse click
        fireEvent(
            getByText(container, "Verify Me"),
            new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            }),
        );
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});

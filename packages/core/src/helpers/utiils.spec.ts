import { isDomElement, isValidConfig, getSessionUrl, getApplicationId } from "./utils";
import fetchMock from "jest-fetch-mock";
// import { getByText, getByTestId, waitForElementToBeRemoved, screen } from "@testing-library/dom";
import { getExampleDOM } from "../../../../tests/utils";
// import { buttonStyles } from "../styles/styles";

beforeEach(() => {
    fetchMock.resetMocks();
    document.body.innerHTML = getExampleDOM();
});

describe("isDomElement test case", function () {
    it("should return true for a value of type DOM Element", () => {
        const button = document.createElement("button");
        expect(isDomElement(button)).toBe(true);
    });

    it("should return false for a value of type null", () => {
        expect(isDomElement(null)).toBe(false);
    });

    it("should return false for a value of type string", () => {
        expect(isDomElement("")).toBe(false);
    });

    it("should return false for a value of type number", () => {
        expect(isDomElement(1)).toBe(false);
    });

    it("should return false for a value of type object", () => {
        expect(isDomElement({})).toBe(false);
    });

    it("should return false for a value of type boolean", () => {
        expect(isDomElement(true)).toBe(false);
    });
});

describe("isValidConfig test case", function () {
    it("should throw config error message", function () {
        expect(function () {
            isValidConfig(["apiKey", "target", "onSuccess", "onError", "steps"], undefined);
        }).toThrowError("Configuration object not found, please see https://docs.orbaone.com");
    });

    it("should throw target error message", function () {
        expect(function () {
            isValidConfig(["target"], { apiKey: "test" });
        }).toThrowError(
            `Target Element ${undefined} must be of type string or DOM Element, please see https://docs.orbaone.com`,
        );
    });

    it("should throw apiKey error message", function () {
        expect(function () {
            isValidConfig(["apiKey"], { target: "#button" });
        }).toThrowError("Api key required, please see https://docs.orbaone.com");
    });

    it("should throw onSuccess error message", function () {
        expect(function () {
            isValidConfig(["onSuccess"], { target: "#button" });
        }).toThrowError("onSuccess must be a function, please see https://docs.orbaone.com");
    });

    it("should throw onError error message", function () {
        expect(function () {
            isValidConfig(["onError"], { target: "#button" });
        }).toThrowError("onError must be a function, please see https://docs.orbaone.com");
    });

    it("should throw steps error message", function () {
        expect(function () {
            isValidConfig(["steps"], { target: "#button" });
        }).toThrowError("Verification steps field missing, please see https://docs.orbaone.com");
    });

    it("should return true for value of configuration object", function () {
        expect(
            isValidConfig(["apiKey", "target", "onSuccess", "onError", "steps"], {
                apiKey: "test",
                target: "#button",
                onSuccess: () => null,
                onError: () => null,
                steps: [],
            }),
        ).toBe(true);
    });
});

describe("create session url test case", function () {
    it("should return a valid url", () => {
        const sessionUrl = getSessionUrl("http://test.com", "key", "1", ["welcome"]);
        expect(sessionUrl).toBe("http://test.com?publicKey=key&applicantId=1&steps=welcome");
    });
});

describe("getApplicationId test case", function () {
    test("should try to fetch an applicantId", async () => {
        const apiUrl = "https://app.t3std3v.orbaone.com/api/v1";
        const apiKey = "test";
        getApplicationId(apiUrl, apiKey);

        expect(fetchMock).toHaveBeenCalledTimes(1);
    });
});

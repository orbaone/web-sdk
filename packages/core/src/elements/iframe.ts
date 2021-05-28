import { iframeStyles } from "../styles/styles";
import { IFrameConfig } from "../helpers/types";

import { ORBA_ONE_MESSAGE_CHANNEL, ORBA_ONE_SUCCESS, ORBA_ONE_CANCEL } from "./constants";

type State = "loading" | "success" | "error" | "idle";

export function createIframe(iFrameConfig: IFrameConfig) {
    const { url } = iFrameConfig;
    const frame = document.createElement("iframe");
    frame.allow = "geolocation; microphone; camera; fullscreen;";
    frame.src = url;
    frame.setAttribute("style", iframeStyles);

    //Set Test Id for DOM checking
    frame.dataset.testid = "orba-iframe";
    return iframeManager(frame, iFrameConfig);
}

export function iframeManager(iframe: HTMLIFrameElement, iframeConfig: IFrameConfig) {
    const { onChange, onError, onSuccess, applicantId, companyId, onCancelled } = iframeConfig;
    let state: State = "idle";

    iframe.onload = function () {
        state = "success";
        onChange(state);
    };

    iframe.onerror = function (err) {
        state = "error";
        onChange(state);
        onError(err);
    };

    function disconnect() {
        state = "idle";
        onChange(state);
        if (iframe) {
            window.removeEventListener(ORBA_ONE_MESSAGE_CHANNEL, handler);
            removeIFrame();
        }
    }

    function removeIFrame() {
        document.body.style.overflowY = "auto";
        // The html tag has to have a overflowY value of visible instead of auto to
        // prevent unnecessary margins to the scrollbar
        document.documentElement.style.overflowY = "visible";
        document.body.removeChild(iframe);
    }

    function addIFrame() {
        // prevent scrolling
        document.body.style.overflowY = "hidden";
        document.documentElement.style.overflowY = "hidden";
        // Makes iframe take up the entire screen (accounts for navbar height on mobile)
        const innerHeight = window.innerHeight.toString() + "px";
        document.body.style.height = innerHeight;
        iframe.style.height = innerHeight;
        document.body.style.marginTop = "0";
        // set height of <html> element
        document.documentElement.style.height = innerHeight;

        document.body.appendChild(iframe);
    }

    function handler(event: any) {
        if (event.data === ORBA_ONE_SUCCESS) {
            if (applicantId) onSuccess({ applicantId, status: "success" });
            else if (companyId) onSuccess({ companyId, status: "success" });
            disconnect();
        } else if (event.data === ORBA_ONE_CANCEL) {
            if (applicantId) onCancelled({ applicantId, status: "cancelled" });
            else if (companyId) onCancelled({ companyId, status: "cancelled" });
            disconnect();
        } else {
            if (applicantId) onError({ applicantId, status: "error" });
            else if (companyId) onError({ companyId, status: "error" });
        }
    }

    return {
        el: iframe,
        connect() {
            if (!iframe) {
                throw `No iframe found. Please attach iframe before trying to connect`;
            }
            if (state === "idle") {
                state = "loading";
                onChange(state);
                addIFrame();
                window.addEventListener(ORBA_ONE_MESSAGE_CHANNEL, handler);
            }
        },

        disconnect,
        status() {
            return state;
        },
    };
}

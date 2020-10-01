import { iframeStyles } from "../styles/styles";

export function createIframe(url: string, onSuccess: (...args) => void, onError: (...args) => void) {
    const frame = document.createElement("iframe");
    frame.allow = "geolocation; microphone; camera";
    frame.src = url;
    frame.setAttribute("style", iframeStyles);

    //Set Test Id for DOM checking
    frame.dataset.testid = "orba-iframe";
    return iframeManager(frame, onSuccess, onError);
}

export function iframeManager(iframe: HTMLIFrameElement, onSuccess: (...args) => void, onError: (...args) => void) {
    let state: "loading" | "success" | "error" | "idle" = "idle";

    iframe.onload = function () {
        state = "success";
    };

    iframe.onerror = function (err) {
        state = "error";
        onError(err);
    };

    function disconnect() {
        state = "idle";
        if (iframe) {
            window.removeEventListener("message", handler);
            document.body.removeChild(iframe);
        }
    }

    function handler(event: any) {
        const json = JSON.parse(event.data);

        if (json.status === "success") {
            onSuccess(json);
            disconnect();
        } else {
            onError(json);
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
                document.body.appendChild(iframe);
                window.addEventListener("message", handler, false);
            }
        },

        disconnect,
        status() {
            return state;
        },
    };
}

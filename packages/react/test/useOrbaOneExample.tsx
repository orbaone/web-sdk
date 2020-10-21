import React, { useState } from "react";
import { useOrbaOne } from "../src";

export function UseOrbaOneExample() {
    const [errorMessage, setError] = useState<any>();
    const [successMessage, setSuccess] = useState<any>();
    const [state, setState] = useState<any>();

    const { target, onError, onSuccess, onChange, onCancelled } = useOrbaOne({
        apiKey: "test",
        steps: [],
        applicantId: "test",
    });

    onError((d: any) => setError(d));
    onSuccess((d: any) => {
        setSuccess(d);
    });

    onChange((s) => {
        setState(s);
    });

    onCancelled((d) => {
        setState(d);
    });

    return (
        <div className="test">
            <button ref={target} type="button">
                insert here
            </button>
            <span>{state}</span>
            {errorMessage ? <span>Error2</span> : null}
            {successMessage ? <span>Success</span> : null}
        </div>
    );
}

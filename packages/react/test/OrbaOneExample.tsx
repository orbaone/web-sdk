import React, { useState } from "react";
import { OrbaOne } from "../src";

export function OrbaOneExample() {
    const [state, setState] = useState<any>();

    return (
        <div className="test">
            <OrbaOne
                apiKey="test"
                applicantId="test"
                steps={[]}
                onError={(d: any) => console.log(d)}
                onSuccess={(d: any) => console.log(d)}
                onChange={(s) => {
                    setState(s);
                }}
                onCancelled={(d: any) => console.log(d)}
            >
                <button type="submit" className="pokemon">
                    insert here
                </button>
            </OrbaOne>
            <span>{state}</span>
        </div>
    );
}

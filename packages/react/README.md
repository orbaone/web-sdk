# Orba One React

To integrate the Orba One SDK into your react project, follow this guide and use your
own API Key which you can obtained from the developer dashboard.

---

[![npm version](https://badge.fury.io/js/%40orbaone%2Fcore.svg)](https://badge.fury.io/js/%40orbaone%2Fcore)

---

The integration of the Orba One React SDK follows these simple steps:

1. Install the SDK through NPM / Yarn
2. Get an API Key
3. Render the Orba One verification button and handle the result

# 1. Install the SDK

```bash
# Yarn
yarn add @orbaone/react

# NPM
npm install --save @orbaone/react
```

# 2. Get an API Key

Orba One uses API keys to allow access to the API and show onboarded users in your dashboard. Login to your Orba One account and create a new Orba One API key here: [Developer Dashboard](https://vendor.orbaone.com).

# 3. Render the verification button

#### Example Usage of React Hook

```jsx
import { useOrbaOne } from "@orbaone/react";

...

const { target, onError, onSuccess, onChange, onCancelled } = useOrbaOne({
    apiKey: "exampleAPIKey",
    steps: ["welcome"],
    applicantId: "test",
});

onError((d) => console.log(d));

onSuccess((d) => console.log(d));

onChange((s) => console.log(s));

onCancelled((d) => console.log(d));

return (
    <div className="container">
        <button ref={target} type="button">
            insert here
        </button>
    </div>
);
```

#### Example Usage of React Component

```jsx
import { OrbaOne } from "@orbaone/react";

...

<OrbaOne
    apiKey="exampleAPIKey"
    applicantId="test"
    steps={[]}
    onError={(d) => console.log(d)}
    onSuccess={(d) => console.log(d)}
    onChange={(s) => console.log(s)}
    onCancelled={(d) => console.log(d)}
>
    <button type="button">insert here</button>
</OrbaOne>
```

#### Parameters

| Parameter    | Type                 | Description                                                  |
| ------------ | -------------------- | ------------------------------------------------------------ |
| target       | string or DOMElement | The DOM element you want to mount the button on.             |
| apiKey       | string               | The OrbaOne Key you obtained from the dashboard.             |
| applicantId  | string               | The application Id Use to create the verification session.   |
| disableStyle | boolean (optional)   | The OrbaOne Key you obtained from the dashboard.             |
| onSuccess    | function             | Callback function that is triggered after onboarding is complete. |
| onError      | function             | Callback function that is triggered if onboarding has failed. |
| onChange     | function             | Callback function that is triggered when the state of the button changes. |
| onCancelled  | function             | Callback function that is triggered if the onboarding is cancelled. |
| steps        | array                | Array of verification steps.                                 |

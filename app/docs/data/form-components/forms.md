A VaneUI form is a native `<form>` element with VaneUI controls inside it. `Input`, `Textarea`, `Select`, `Checkbox`, `Radio` and `Switch` each render a native form control, so `name`, `required`, `FormData`, submit and reset behave as they do in plain HTML. [Field](/docs/form-components/field) adds the label, help text and error message. `Button` and `IconButton` set no `type`, so inside a `<form>` each one submits the form unless it has `type="button"`.

## A form with Field and native validation

Wrap the fields in a `<form>` and give each control a `name`. The browser checks `required`, `type="email"`, `minLength` and `pattern` before it fires `onSubmit`, and shows its own message at the first control that fails. `required` set on a Field reaches the control inside it. `name` and the other native attributes go on the control.

```tsx demo
const [message, setMessage] = useState('');

return (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setMessage(`Account created for ${data.get('name')} (${data.get('email')}).`);
    }}
  >
    <Col>
      <Field label="Name" required>
        <Input name="name" autoComplete="name"/>
      </Field>
      <Field label="Email" description="Used to sign in." required>
        <Input type="email" name="email" autoComplete="email"/>
      </Field>
      <Field label="Password" description="At least 12 characters." required>
        <Input
          type="password"
          name="password"
          minLength={12}
          autoComplete="new-password"
        />
      </Field>
      <Button type="submit" md filled>Create account</Button>
      {message && <Alert success polite>{message}</Alert>}
    </Col>
  </form>
);
```

`event.preventDefault()` stops the browser from sending the form itself and reloading the page, and `FormData` reads the values of the named controls. Pressing Enter in a text field submits the form too. A Field that renders its own control takes the native attributes directly, as in `<Field type="email" name="email" label="Email" required/>`.

## Controlled and uncontrolled inputs

The inputs above are uncontrolled: the DOM holds each value, `defaultValue` sets the starting text, and the submit handler reads the result. A controlled input takes `value` and `onChange`, and React state holds the value on every keystroke.

```tsx demo
const [name, setName] = useState('');
const slug = name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-');

return (
  <Field
    label="Workspace name"
    description={`Address: example.com/${slug || 'your-workspace'}`}
  >
    <Input value={name} onChange={(event) => setName(event.target.value)}/>
  </Field>
);
```

Use uncontrolled inputs when the values are needed only on submit. Use a controlled input when something on screen depends on the value while the user types, such as a preview or a character count, or when JavaScript validates the value.

## Showing errors with the Field `error` prop

To show messages of your own, add `noValidate` to the form, validate in JavaScript, and pass the message to the `error` prop of the Field. Field renders the message, marks the control with `aria-invalid="true"`, and links the message to the control with `aria-describedby`. Check a value when its field loses focus and again on submit.

```tsx demo
const [email, setEmail] = useState('');
const [error, setError] = useState<string>();
const [failed, setFailed] = useState(0);
const [sent, setSent] = useState(false);
const emailRef = useRef<HTMLInputElement>(null);

const check = (value: string) =>
  /^\S+@\S+\.\S+$/.test(value)
    ? undefined
    : 'Enter an email address, such as you@company.com.';

useEffect(() => {
  if (failed > 0) emailRef.current?.focus();
}, [failed]);

return (
  <form
    noValidate
    onSubmit={(event) => {
      event.preventDefault();
      const problem = check(email);
      setError(problem);
      setSent(!problem);
      if (problem) setFailed(failed + 1);
    }}
  >
    <Col>
      <Field label="Work email" error={error}>
        <Input
          ref={emailRef}
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setError(check(email))}
        />
      </Field>
      <Button type="submit" md filled>Send invite</Button>
      {sent && <Alert success polite>Invite sent to {email}.</Alert>}
    </Col>
  </form>
);
```

Three details in this example carry over to any form:

- `error` stays `undefined` while the field is valid. Field treats every other value except `null` and `false` as an error, an empty string included.
- The input is controlled, so the value is in state when the check runs.
- After a failed submit, the effect moves focus to the invalid control, so a keyboard or screen reader user lands on it and hears the message. With several fields, focus the first one that failed.

A server error goes into `error` the same way, from the response. When the message is shown somewhere else, such as an Alert above the form, `invalid` on the Field marks the control without rendering text. That prop needs `@vaneui/ui` 1.5.0 or later.

## Values of Checkbox, RadioGroup, Switch and Select

Each control reports its value through the native element it renders.

| Control | Uncontrolled | Controlled | Entry in `FormData` |
|---|---|---|---|
| `Input`, `Textarea` | `defaultValue` | `value` and `onChange`, read `event.target.value` | The text, also when it is empty |
| `Select` | `defaultValue` | `value` and `onChange`, read `event.target.value` | The `value` of the selected option |
| `RadioGroup` | `defaultValue` | `value` and `onChange`, read `event.target.value` | The `value` of the checked `Radio`, or no entry when none is checked |
| `Checkbox`, `Switch` | `defaultChecked` | `checked` and `onChange`, read `event.target.checked` | Its `value` when checked (`"on"` when no `value` is set), or no entry when unchecked |

Give a [RadioGroup](/docs/form-components/radio) a `name` in a form that is submitted. Without one it generates a name, which keeps the options mutually exclusive but is no use as a key in `FormData`.

```tsx demo
const [entries, setEntries] = useState('');

return (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setEntries(JSON.stringify(Object.fromEntries(data), null, 2));
    }}
  >
    <Col>
      <Field label="Plan">
        <RadioGroup name="plan" defaultValue="pro">
          <Label row itemsCenter><Radio value="free"/> Free</Label>
          <Label row itemsCenter><Radio value="pro"/> Pro</Label>
        </RadioGroup>
      </Field>
      <Field label="Region">
        <Select name="region" placeholder="Select a region" required>
          <option value="cy">Cyprus</option>
          <option value="ee">Estonia</option>
          <option value="pt">Portugal</option>
        </Select>
      </Field>
      <Label row itemsCenter>
        <Checkbox name="terms" value="accepted" required/>
        I accept the terms
      </Label>
      <Label row itemsCenter>
        <Checkbox name="updates"/>
        Email me product updates
      </Label>
      <Button type="submit" md filled>Save</Button>
      {entries && <Text tag="pre" sm fontMono>{entries}</Text>}
    </Col>
  </form>
);
```

`placeholder` with `required` on a Select makes the user pick an option: the prompt has an empty value, so the browser rejects it. Several checkboxes can share one `name`, and `data.getAll(name)` returns every checked value.

A [Switch](/docs/form-components/switch) reports its value the same way as a [Checkbox](/docs/form-components/checkbox). It is meant for a setting that applies at once, so it usually sits outside the submit flow as a controlled input, like the controls below. `onChange` on a `RadioGroup` receives the change event of the `Radio` that was picked.

```tsx demo
const [plan, setPlan] = useState('pro');
const [region, setRegion] = useState('ee');
const [updates, setUpdates] = useState(false);
const [compact, setCompact] = useState(true);

return (
  <Col>
    <Field label="Plan">
      <RadioGroup value={plan} onChange={(event) => setPlan(event.target.value)}>
        <Label row itemsCenter><Radio value="free"/> Free</Label>
        <Label row itemsCenter><Radio value="pro"/> Pro</Label>
      </RadioGroup>
    </Field>
    <Field label="Region">
      <Select value={region} onChange={(event) => setRegion(event.target.value)}>
        <option value="cy">Cyprus</option>
        <option value="ee">Estonia</option>
        <option value="pt">Portugal</option>
      </Select>
    </Field>
    <Label row itemsCenter>
      <Checkbox
        checked={updates}
        onChange={(event) => setUpdates(event.target.checked)}
      />
      Email me product updates
    </Label>
    <Label row itemsCenter>
      <Switch
        checked={compact}
        onChange={(event) => setCompact(event.target.checked)}
      />
      Compact layout
    </Label>
    <Text sm secondary>
      plan: {plan}, region: {region},
      updates: {String(updates)}, compact: {String(compact)}
    </Text>
  </Col>
);
```

## Disabled and read-only controls

`disabled` takes a control out of the form: it cannot be focused, its value is left out of `FormData`, and validation skips it. `readOnly` keeps the control in the form: it can be focused and its value is submitted, but the user cannot change it. `Checkbox`, `Radio` and `Switch` have no native read-only state, so VaneUI cancels the click, and `Checkbox` and `Switch` also carry `aria-readonly`. A Field passes `disabled` and `readOnly` to the control inside it, and a disabled Field also dims its label.

```tsx demo
const [entries, setEntries] = useState('');

return (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setEntries(JSON.stringify(Object.fromEntries(data), null, 2));
    }}
  >
    <Col>
      <Field label="Account ID" description="Submitted, but not editable." readOnly>
        <Input name="accountId" defaultValue="acct_4821"/>
      </Field>
      <Field label="Legacy plan" description="Left out of the form data." disabled>
        <Input name="legacyPlan" defaultValue="Starter 2019"/>
      </Field>
      <Label row itemsCenter>
        <Checkbox name="auditLog" defaultChecked readOnly/>
        Audit log, required by your plan
      </Label>
      <Button type="submit" md filled>Save</Button>
      {entries && <Text tag="pre" sm fontMono>{entries}</Text>}
    </Col>
  </form>
);
```

## Submit, reset and button types

`Button` and `IconButton` render a `<button>` with no `type` attribute, and a button with no `type` inside a form is a submit button. A Cancel button, a password toggle or any other button that only runs an `onClick` therefore submits the form too, unless it has `type="button"`. Set `type` on every button in a form.

| `type` | Effect inside a `<form>` | Use it for |
|---|---|---|
| not set | Submits the form | Avoid in a form: state the type |
| `submit` | Runs native validation, then fires `onSubmit` | The action that sends the form |
| `button` | None, only `onClick` runs | Cancel, a password toggle, a menu trigger |
| `reset` | Restores uncontrolled controls to their starting values and fires `onReset` | A reset button |

```tsx demo
const [status, setStatus] = useState('Nothing submitted yet.');
const [saving, setSaving] = useState(false);
const [visible, setVisible] = useState(false);

return (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      setSaving(true);
      // stands in for a request
      setTimeout(() => {
        setSaving(false);
        setStatus(`Saved display name "${data.get('displayName')}".`);
      }, 800);
    }}
    onReset={() => setStatus('Reset to the starting values.')}
  >
    <Col>
      <Field label="Display name" required>
        <Input name="displayName" defaultValue="Alex Rivera"/>
      </Field>
      <Row itemsEnd>
        <Field label="Password" flex1>
          <Input
            type={visible ? 'text' : 'password'}
            name="password"
            defaultValue="correct horse"
          />
        </Field>
        <IconButton
          md
          type="button"
          aria-label="Show password"
          aria-pressed={visible}
          onClick={() => setVisible(!visible)}
        >
          {visible ? <EyeOff/> : <Eye/>}
        </IconButton>
      </Row>
      <Row>
        <Button type="submit" md filled loading={saving}>Save</Button>
        <Button type="reset" md>Reset</Button>
        <Button
          type="button"
          md
          secondary
          onClick={() => setStatus('Cancelled. Nothing was submitted.')}
        >
          Cancel
        </Button>
      </Row>
      <Text sm secondary>{status}</Text>
    </Col>
  </form>
);
```

`loading` on the submit [Button](/docs/basic-components/button) disables it while the request runs, so a second click cannot submit the form again. `type="reset"` restores `defaultValue` and `defaultChecked`. Controlled values live in state, so set them back in an `onReset` handler.

Pressing Enter in a text field activates the first submit button in the form. A button with no `type` counts as one, so an untyped button placed before the real submit button receives that click.

`NavLink` without `href` and `ModalCloseButton` already render `type="button"`. A Button with `href` renders an `<a>`, which never submits.

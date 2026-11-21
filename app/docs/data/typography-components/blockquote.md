---
componentKey: blockquote
importPath: 'import { Blockquote } from "@vaneui/ui"'
sourceUrl: https://github.com/vaneui/vaneui/blob/main/src/components/ui/typography/blockquote/Blockquote.tsx
since: 0.9.0
---

Blockquote is for pull quotes, testimonials and excerpts from another source. A status message that follows a user action, such as an error or a saved confirmation, belongs in an [Alert](/docs/basic-components/alert) instead, and a highlighted phrase inside a sentence in a [Mark](/docs/basic-components/mark).

## Basic usage

Blockquote displays quoted content, shown here with an attribution line. The element renders as `<blockquote>` and inherits color from its surroundings.

```tsx demo
<Blockquote>
  <Text italic>The only way to do great work is to love what you do.</Text>
  <Text sm secondary> - Steve Jobs</Text>
</Blockquote>
```

## Sizes

Blockquote supports five sizes: `xs`, `sm`, `md` (default), `lg`, `xl`.

```tsx demo
<Col>
  <Blockquote xs primary>Size xs: The best way to predict the future is to create it.</Blockquote>
  <Blockquote sm primary>Size sm: The best way to predict the future is to create it.</Blockquote>
  <Blockquote primary>Size md: The best way to predict the future is to create it.</Blockquote>
  <Blockquote lg primary>Size lg: The best way to predict the future is to create it.</Blockquote>
  <Blockquote xl primary>Size xl: The best way to predict the future is to create it.</Blockquote>
</Col>
```

## Appearances

Apply appearance props to color the blockquote. The default is `inheritAppearance`, which picks up the parent color.

```tsx demo
<Col>
  <Blockquote primary>Primary appearance blockquote.</Blockquote>
  <Blockquote accent>Accent appearance blockquote.</Blockquote>
  <Blockquote secondary>Secondary appearance blockquote.</Blockquote>
  <Blockquote success>Success appearance blockquote.</Blockquote>
  <Blockquote danger>Danger appearance blockquote.</Blockquote>
  <Blockquote warning>Warning appearance blockquote.</Blockquote>
  <Blockquote info>Info appearance blockquote.</Blockquote>
</Col>
```

## Variants

Blockquote is `outline` by default: an accent border in the appearance's colour, and no background of its own. `filled` paints no surface either. It switches the quote to the "on this fill" colour and drops the accent border, for a quote sitting on a filled surface of the same appearance.

```tsx demo
<Col>
  <Blockquote info>outline info, on the page surface</Blockquote>
  <Blockquote danger>outline danger, on the page surface</Blockquote>
  <Card info filled>
    <Blockquote info filled>filled info, on a matching filled Card</Blockquote>
  </Card>
</Col>
```

To put a surface behind a quote, nest it in a filled `Card` rather than reaching for `filled` on the Blockquote itself.

## Italic

Italic is not a default. Opt in with the `italic` prop for traditional quotation styling.

```tsx demo
<Col>
  <Blockquote primary>Upright (default), no italic styling.</Blockquote>
  <Blockquote primary italic>Italic, traditional quotation styling.</Blockquote>
</Col>
```

## Source attribution

Pass `cite` to set the native `<blockquote cite>` attribute and render a visible source line below the quote. `Blockquote` has a single visual style, the reading-direction-start accent border (the `outline` default); it does not paint a background, so wrap it in a `Card` or `Section` to place a quote on a colored surface.

```tsx demo
<Col>
  <Blockquote primary cite="Ada Lovelace">
    That brain of mine is something more than merely mortal, as time will show.
  </Blockquote>
  <Blockquote info cite="Alan Turing">
    We can only see a short distance ahead, but we can see plenty there that needs to be done.
  </Blockquote>
</Col>
```

## Inside a Card

Blockquote inherits the parent appearance, so it blends into themed containers.

```tsx demo
<Row flexWrap>
  <Card primary>
    <Blockquote>Inherits primary from the card.</Blockquote>
  </Card>
  <Card success>
    <Blockquote>Inherits success from the card.</Blockquote>
  </Card>
  <Card danger>
    <Blockquote>Inherits danger from the card.</Blockquote>
  </Card>
</Row>
```

## With rich content

Blockquotes can contain multiple paragraphs and nested components.

```tsx demo
<Blockquote primary>
  <Text fontBold>Steve Jobs</Text>
  <Text>Innovation distinguishes between a leader and a follower. Stay hungry, stay foolish.</Text>
</Blockquote>
```

## Testimonial pattern

Use blockquotes with attribution for testimonials and customer quotes.

```tsx demo
<Col>
  <Card info>
    <Blockquote>
      <Text italic>VaneUI cut our migration time in half. The boolean props API is concise and the theming covers our cases.</Text>
      <Text sm fontBold> - Sarah Chen, Lead Engineer</Text>
    </Blockquote>
  </Card>
  <Card success>
    <Blockquote>
      <Text italic>We shipped our new dashboard in half the time thanks to VaneUI components.</Text>
      <Text sm fontBold> - Alex Rivera, Product Manager</Text>
    </Blockquote>
  </Card>
</Col>
```

## Frequently asked questions

### Does Blockquote add quotation marks?

No. Blockquote renders the text as you pass it, with an accent border on the start edge, and adds no quotation marks before or after it. When the design calls for marks, type them into the quoted text. Screen readers announce the `<blockquote>` element as a quote, so the marks are visual only.

### How do I remove the accent border?

Pass `noBorder`. The accent border is the `borderStart` default, a border on the start edge that moves to the right under `dir="rtl"`, and `noBorder` resets every side. Without a border, the quote has nothing to set it apart from the text around it, so give it another cue, such as `italic`, a larger size prop or a filled `Card` around it.

### How do I link a quote to its source?

`cite` renders plain text, not a link, and also sets the native `cite` attribute to that same text. For a source the reader can open, leave out `cite` and add your own line at the end of the quote, for example a `<Text sm secondary>` that holds a [Link](/docs/typography-components/link) to the article or talk.

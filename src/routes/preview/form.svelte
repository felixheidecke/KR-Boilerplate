<script>
  import Checkbox from '@/components/form/Checkbox.svelte'
  import Submit from '@/components/form/Submit.svelte'
  import Textarea from '@/components/form/Textarea.svelte'

  let html = `
<Form id="4" subject="Loveletter">
  <Input
    name="name"
    label="Liebesbrief an:"
    placeholder="Vor- und Nachname"
    class="$mb"
    required
  />
  <Textarea name="message" label="Your Message" class="$mb" required />

  <Select
    name="love"
    label="How deep is your love?"
    options={['💖 Very deep', '💜 Deep', '💔 Hate']}
    class="$mb"
  />

  <Checkbox
    name="flowers"
    label="Send some 💐 <strong>lovely flowers</strong> to your loved-one."
    class="$mb"
  />

  <Radio
    name="demo"
    value="Lorem"
    label="Lorem ipsum dolor sit amet"
    class="$mb-1/4"
  />
  <Radio
    name="demo"
    value="Consectetur"
    label="Consectetur adipisicing elit"
    class="$mb-1/4"
  />
  <Radio
    name="demo"
    value="Perspiciatis"
    label="Perspiciatis quisquam est quae"
    class="$mb-1/4"
  />

  <Submit class="$mt-2" />

  <div slot="done">
    <h3>Vielen Dank für deinen Liebesbrief</h3>
    <p>Dein Liebling wird sich sicher freuen 💕</p>
  </div>
</Form>
`
</script>

<svelte:head>
  <title>Form | Boilerplate</title>
</svelte:head>

<div data-page>
  <h3>Code</h3>
  <CodeHighlighter {html} />

  <h3>Ergebnis</h3>
  <Form id="4" subject="Loveletter">
    <Input
      name="name"
      label="Liebesbrief an:"
      placeholder="Vor- und Nachname"
      class="$mb"
      required
    />
    <Textarea name="message" label="Your Message" class="$mb" required />

    <Select
      name="love"
      label="How deep is your love?"
      options={['💖 Very deep', '💜 Deep', '💔 Hate']}
      class="$mb"
    />

    <Checkbox
      name="flowers"
      label="Send some 💐 <strong>lovely flowers</strong> to your loved-one."
      class="$mb"
    />

    <Radio name="demo" value="Lorem" label="Lorem ipsum dolor sit amet" class="$mb-1/4" />
    <Radio name="demo" value="Consectetur" label="Consectetur adipisicing elit" class="$mb-1/4" />
    <Radio
      name="demo"
      value="Perspiciatis"
      label="Perspiciatis quisquam est quae"
      class="$mb-1/4"
    />

    <Submit class="$mt-2" />

    <div slot="done">
      <h3>Vielen Dank für deinen Liebesbrief</h3>
      <p>Dein Liebling wird sich sicher freuen 💕</p>
    </div>
  </Form>
</div>

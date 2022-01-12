const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>vite-plugin-env-dts-gen-example</h1>
  <ul>
    <li>${import.meta.env.MODE}</li>
    <li>${import.meta.env.VITE_TEST_A}</li>
    <li>${import.meta.env.VITE_TEST_B}</li>
  </ul>
`

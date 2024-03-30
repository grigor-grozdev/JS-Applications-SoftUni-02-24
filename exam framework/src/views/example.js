import { html, render } from '../lib.js';
import { createSubmitHandler } from '../util.js';

const exampleTemplate = (onSubmit) => html`
<section>
    <p>Sample content</p>
    <form @submit=${onSubmit}>
        <h2>Sample form</h2>
        <lable>
            Data 1
            <input type="text" name="data1">
        </label>
        <lable>
            Data 2
            <input type="text" name="data2">
        </label>
        <button>Submit form</button>
    </form>
</section>`;

export function showExample(ctx) {
    const handler = createSubmitHandler(onSubmit);
    console.log(handler);
    render(exampleTemplate(handler));
}

function onSubmit(data, form) {
    console.log(data)

    form.reset();
}
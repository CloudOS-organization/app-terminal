import {Type, html} from '../../asset/js/deps.js';
import {Window} from '../../asset/js/component/mod.js';

export default class Terminal extends Window {
    static name = 'terminal-app';
    static properties = {
        ...super.properties,
        lines: Type.array()
    };
    static ref = {
        ...super.ref,
        input: 'input'
    };
    constructor() {
        super();
        this.init();
    }
    renderBody() {
        return html`
            <pre>
<b>user@computer</b>:~$<input spellcheck="false" @change=${this.onChange}>
${this.lines}
            </pre>
        `;
    }
    init() {
        this.socket = new WebSocket('ws://localhost:8080');
        this.socket.onmessage = event => {
            this.input.value = '';
            this.lines = event.data;
        };
    }
    onChange() {
        this.socket.send(JSON.stringify(this.input.value.split(' ')));
    }
}

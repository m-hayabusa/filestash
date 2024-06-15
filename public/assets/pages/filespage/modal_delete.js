import { createElement } from "../../lib/skeleton/index.js";
import rxjs, { effect, preventDefault } from "../../lib/rx.js";
import { qs } from "../../lib/dom.js";
import { MODAL_RIGHT_BUTTON } from "../../components/modal.js";
import t from "../../locales/index.js";

export default function(render, removeLabel) {
    const $modal = createElement(`
        <div>
            <span style="white-space: nowrap;">${t("Confirm by typing")} "${removeLabel}"</span>
            <form style="margin-top: 10px;">
                <input class="component_input" type="text" autocomplete="new-password" value="">
                <div class="modal-error-message"></div>
            </form>
        </div>
    `);
    const ret = new rxjs.Subject();
    const isValid = () => $input.value === removeLabel;
    const $input = qs($modal, "input");
    const pressOK = render($modal, (id) => {
        if (id !== MODAL_RIGHT_BUTTON) {
            ret.complete();
            return ret.toPromise();
        }
        else if (!isValid()) {
            qs($modal, ".modal-error-message").textContent = t("Doesn't match");
            return ret.toPromise();
        }
        ret.next(true);
        ret.complete();
        return ret.toPromise();
    }).bind(this, MODAL_RIGHT_BUTTON);

    $input.focus();

    effect(rxjs.fromEvent(qs($modal, "form"), "submit").pipe(
        preventDefault(),
        rxjs.tap(pressOK),
    ));

    return ret.toPromise();
}

import {
    activateAutoInsertion,
    activateMarkers,
    registerProviders,
} from "@volar/monaco";
import { LanguageService } from "@volar/monaco/worker";
import { editor, languages } from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import vueWorker from "./vue.worker?worker";

export function initMonaco() {
    self.MonacoEnvironment = {
        getWorker(_: any, label: string) {
            if (label === "json") {
                return new jsonWorker();
            }
            if (label === "css" || label === "scss" || label === "less") {
                return new cssWorker();
            }
            if (
                label === "html" || label === "handlebars" || label === "razor"
            ) {
                return new htmlWorker();
            }
            if (label === "typescript" || label === "javascript") {
                return new tsWorker();
            }
            if (label === "vue") {
                return new vueWorker();
            }
            return new editorWorker();
        },
    };

    languages.register({
        id: "vue",
        "extensions": [".vue"],
    });
    const worker = editor.createWebWorker<LanguageService>({
        moduleId: "vs/language/vue/vueWorker",
        label: "vue",
    });

    const languageId = [
        "vue",
        "javascript",
        "typescript",
        "javascriptreact",
        "typescriptreact",
        "json",
    ];

    const getSyncUris = () => {
        const res = editor.getModels().map((model) => model.uri);
        return res;
    };

    // @ts-ignore
    activateMarkers(worker, languageId, "vue", getSyncUris, editor);
    // @ts-ignore
    activateAutoInsertion(worker, languageId, getSyncUris, editor);
    // @ts-ignore
    registerProviders(worker, languageId, getSyncUris, languages);
}

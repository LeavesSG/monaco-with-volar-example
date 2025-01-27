/// <reference types="vite/client" />

declare module "monaco-editor/esm/vs/editor/editor.worker" {
    import { WorkerLanguageService } from "@volar/monaco";
    import { editor } from "monaco-editor";
    export function initialize(
        ctx: editor.IWorkerContext,
    ): WorkerLanguageService;
}

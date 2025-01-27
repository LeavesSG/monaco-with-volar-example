import * as monaco from "monaco-editor";
import "./style.css";

import { initMonaco } from "./init-monaco";

/**
 * Change this to `"/src/"` and it will work.
 */
const ROOT_DIR = "/";
// const ROOT_DIR = "/src/";

const app = document.querySelector<HTMLElement>("#app")!;
const instance = monaco.editor.create(app);

Object.entries(
  import.meta.glob<string>("./virtual-repo/*.{ts,vue}", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
).forEach(([path, value]) => {
  const fileName = path.replace("./virtual-repo/", "");
  monaco.editor.createModel(
    value,
    void 0,
    monaco.Uri.file(ROOT_DIR + fileName),
  );
});

instance.setModel(
  monaco.editor.getModel(monaco.Uri.file(ROOT_DIR + "App.vue")),
);

initMonaco();

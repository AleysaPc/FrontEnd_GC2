import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export function CKEditorField({ label, name, value, onChange, required = false }) {
  return (
    <div className="mb-4">
      {label && (
        <label className="block font-semibold mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <CKEditor
        editor={ClassicEditor}
        data={value || ""}
        onChange={(event, editor) => {
          const data = editor.getData();
          // Simula evento para useFormEntity
          onChange({
            target: { name, value: data }
          });
        }}
        config={{
          toolbar: [
            "heading", "|",
            "bold", "italic", "link",
            "bulletedList", "numberedList", "|",
            "insertTable", "tableColumn", "tableRow", "mergeTableCells", "|",
            "undo", "redo"
          ],
          table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"]
          }
        }}
      />
    </div>
  );
}

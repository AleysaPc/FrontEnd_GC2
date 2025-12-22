import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useEffect, useRef } from "react";

export function CKEditorField({
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  const editorRef = useRef(null);
  const lastValue = useRef(value);

  useEffect(() => {
    if (editorRef.current && value !== lastValue.current) {
      editorRef.current.setData(value || "");
      lastValue.current = value;
    }
  }, [value]);

  return (
    <div className="mb-4">
      {label && (
        <label className="block font-semibold mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <CKEditor
        editor={ClassicEditor}
        onReady={(editor) => {
          editorRef.current = editor;
          editor.setData(value || "");
          lastValue.current = value;
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          lastValue.current = data;
          onChange({
            target: { name, value: data },
          });
        }}
      />
    </div>
  );
}

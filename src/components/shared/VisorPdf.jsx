import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '@react-pdf-viewer/zoom/lib/styles/index.css';

const VisorPDF = ({ url }) => {
  const zoomPluginInstance = zoomPlugin();
  const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;

  return (
    <div>
      {/* Botones de zoom */}
      <div className="flex gap-2 mb-2 justify-center">
        <ZoomInButton>
          {(props) => (
            <button
              onClick={props.onClick}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              +
            </button>
          )}
        </ZoomInButton>
        <ZoomOutButton>
          {(props) => (
            <button
              onClick={props.onClick}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              -
            </button>
          )}
        </ZoomOutButton>
      </div>

      {/* Visor PDF */}
      <div style={{ height: '500px', width: '100%' }} className="border-2 border-gray-400">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <Viewer fileUrl={url} plugins={[zoomPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
};

export default VisorPDF;

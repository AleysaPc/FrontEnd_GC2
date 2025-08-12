import React from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FaFileWord } from 'react-icons/fa';

const GenerarDocumentoButton = ({ id, className = "" }) => {
    const handleGenerateWord = async () => {
        try {
            const apiUrl = `http://localhost:8000/api/v1/correspondencia/generar_documento/${id}/`;
            console.log('Intentando descargar desde:', apiUrl);
            
            // Eliminamos credentials: 'include' ya que parece que no se necesitan
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Error en la respuesta:', response.status, errorText);
                throw new Error(`Error HTTP! estado: ${response.status}`);
            }
    
            const blob = await response.blob();
            console.log('Tamaño del archivo:', blob.size, 'bytes');
            
            if (blob.size === 0) {
                throw new Error('El archivo está vacío');
            }
    
            // Obtener el nombre del archivo del header o usar uno por defecto
            const contentDisposition = response.headers.get('content-disposition');
            let filename = `documento_${id}.docx`;
            
            if (contentDisposition) {
                const filenameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1].replace(/['"]/g, '');
                }
            }
    
            if (!filename.toLowerCase().endsWith('.docx')) {
                filename += '.docx';
            }
    
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error al generar el documento:', error);
            toast.error(`Error al generar el documento: ${error.message}`);
        }
    };
      

    return (
        <button
            onClick={handleGenerateWord}
            title="Generar Documento Word"
            className={`hover:bg-gray-600 hover:text-gray-100 text-gray-500 rounded-md flex items-center gap-2 transition duration-200 p-1 ${className}`}
        >
            <FaFileWord className="text-blue-500" size={20} />
        </button>
    );
};

export default GenerarDocumentoButton;

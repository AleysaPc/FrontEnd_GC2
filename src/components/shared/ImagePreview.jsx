import React from "react";
import { FaImage } from "react-icons/fa";

const ImagePreview = ({
  image,
  alt = "Vista previa de la imagen",
  className = "",
}) => {
  const [hasError, setHasError] = React.useState(false);
  const [blobUrl, setBlobUrl] = React.useState(null);
  
  // URL base configurable (en Vite)
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL?.replace("/api/v1", "") ||
    "http://localhost:8000";

  // Crear y limpiar blob URLs
  React.useEffect(() => {
    // Si la imagen es un archivo, crear una URL temporal
    if (image instanceof File || image instanceof Blob) {
      const url = URL.createObjectURL(image);
      setBlobUrl(url);
      
      // Limpiar la URL cuando el componente se desmonte o la imagen cambie
      return () => {
        URL.revokeObjectURL(url);
        setBlobUrl(null);
      };
    } else {
      setBlobUrl(null);
    }
  }, [image]);

  const imageUrl = React.useMemo(() => {
    if (!image) return null;
    
    // Si ya es una URL absoluta (http, https, o blob)
    if (typeof image === 'string') {
      if (image.startsWith('http') || image.startsWith('blob:')) {
        return image;
      }
      // Si es una ruta relativa, unir con la URL base
      return `${API_BASE_URL}/media/${image.startsWith('/') ? image.slice(1) : image}`;
    }
    
    // Si es un archivo, usar la URL del blob
    if ((image instanceof File || image instanceof Blob) && blobUrl) {
      return blobUrl;
    }
    
    return null;
  }, [image, API_BASE_URL, blobUrl]);

  if (!imageUrl || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 ${className}`}
      >
        <FaImage className="text-gray-400 text-4xl mb-2" />
        <span className="text-gray-500 text-sm">
          {hasError ? 'Error al cargar la imagen' : 'Sin imagen'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={imageUrl}
        alt={alt}
        onError={() => setHasError(true)}
        className="w-full h-full object-contain rounded-lg border border-gray-200"
      />
    </div>
  );
};

export default ImagePreview;
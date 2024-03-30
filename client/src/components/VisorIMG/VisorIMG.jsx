/* eslint-disable react/prop-types */
import { useState } from 'react';

const VisorImagen = ({ imgUrl, onImageChange, ver }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(imgUrl);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (onImageChange) {
      onImageChange(file);
    }

    // Convertir el archivo de imagen a una URL de objeto de datos
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative space-y-2">
      <label
        htmlFor="fileInput"
        className="block w-full p-2 font-bold text-center transition-colors rounded-lg cursor-pointer bg-secondary-button hover:text-gray-100"
      >
        Seleccionar Imagen
      </label>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      {selectedFile || ver ? (
        <img
          src={imagePreview}
          alt="imagen"
          className="h-[100px] w-[100px] mx-auto rounded-lg"
        />
      ) : null}
    </div>
  );
};

export default VisorImagen;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import {FcCancel} from 'react-icons/fc';
import {FaCompressArrowsAlt} from 'react-icons/fa';
import {FaExpandArrowsAlt} from 'react-icons/fa';

const VisorPDF = ({url, showOptions, onDocumentoChange, ver}) => {
  const [pdfFile, setPDFFile] = useState(url);
  const [toolBar, setToolbar] = useState(0);
  const [fileName, setFileName] = useState('');
  const [verPDF, setVerPDF] = useState(ver);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      if (onDocumentoChange) {
        onDocumentoChange(file);
      }
      setPDFFile(URL.createObjectURL(file));
      setFileName(file.name);
      setVerPDF(!verPDF);
    } else {
      alert('Por favor selecciona un archivo PDF.');
    }
  };

  const handleVerPDF = () => {
    setVerPDF(!verPDF);
  };

  const handlerBorrarPDF = () => {
    setFileName('');
    setPDFFile(null);
  };

  useEffect(() => {
    if (showOptions) setToolbar(1);
  }, []);

  return (
    <div className="space-y-2">
      {!showOptions && (
        <div className="flex items-center space-x-2">
          <label
            htmlFor="fileInput"
            className="bg-secondary-button p-2 uppercase font-bold rounded-lg hover:text-gray-100 transition-colors"
          >
            Seleccionar Archivo
          </label>
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="absolute top-0 left-0 opacity-0 cursor-pointer "
          />
          {fileName && (
            <div className="flex items-center justify-between flex-1">
              <div className="flex space-x-2">
                <span className="block p-2 text-xs font-bold uppercase border-2 border-white rounded-lg">
                  {fileName}
                </span>
                <button onClick={handlerBorrarPDF}>
                  <FcCancel />
                </button>
              </div>
              <div>
                <button onClick={handleVerPDF}>
                  {verPDF ? <FaCompressArrowsAlt /> : <FaExpandArrowsAlt />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {pdfFile && verPDF && (
        <div>
          <embed
            src={`${pdfFile}#toolbar=${toolBar}&title=false`}
            className="rounded-md w-[800px] h-[400px]"
          />
        </div>
      )}
    </div>
  );
};

export default VisorPDF;

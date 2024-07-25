import UploadMenu from '@/components/UploadMenu';


const Page = () => {


  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Configurar Bot de Restaurante</h2>
      <form>
    
      
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fileUpload">
            Subir Archivo
          </label>
          <input
            type="file"
            id="fileUpload"
            onChange={handleFileChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Enviar
          </button>
        </div>
           */}
      </form>
      <UploadMenu />
    </div>
  );
};

export default Page;

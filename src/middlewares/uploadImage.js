import multer from 'multer';

// Configuração do multer
const storage = multer.memoryStorage(); // Armazena o arquivo na memória (ou use diskStorage para salvar no disco)
const uploadImage = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5 MB para uploads
});

export default uploadImage;

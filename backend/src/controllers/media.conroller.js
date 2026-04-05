import cloudinary, {BASE_PATH} from "../helpers/cloudinary.js";
import fs from "fs"

export async function uploadMedia(req, res){
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "btop/uploads",
            resource_type: "auto"
        })
        fs.unlinkSync(req.file.path);
        res.json({url: result.secure_url})
    } catch (error) {
        res.status(500).json({error, details: "error al subir la imagen"})
    }
}

export const getEmotionalStateFiles = async (req, res) => {
  try {
    const { folder } = req.params;

    if (!folder) {
      return res.status(400).json({
        message: 'El parámetro folder es obligatorio',
      });
    }

    const folderPath = `${BASE_PATH}/${folder}`;

    const [images, videos, raw] = await Promise.all([
      cloudinary.api.resources({
        resource_type: 'image',
        type: 'upload',
        prefix: folderPath,
        max_results: 500,
      }),
      cloudinary.api.resources({
        resource_type: 'video',
        type: 'upload',
        prefix: folderPath,
        max_results: 500,
      }),
      cloudinary.api.resources({
        resource_type: 'raw',
        type: 'upload',
        prefix: folderPath,
        max_results: 500,
      }),
    ]);

    const allResources = [
      ...images.resources,
      ...videos.resources,
      ...raw.resources,
    ];

    const files = allResources.map(file => ({
      name: file.public_id.split('/').pop(),
      publicId: file.public_id,
      url: file.secure_url,
      format: file.format,
      bytes: file.bytes,
      resourceType: file.resource_type,
    }));

    return res.json(files);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error obteniendo archivos',
    });
  }
};
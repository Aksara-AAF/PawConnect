const cloudinary = require('../config/cloudinary');

const extractPublicId = (url) => {
  if (!url) return null;
  const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.\w+$/);
  return match ? match[1] : null;
};

const uploadImage = async (fileBuffer, folder = 'pawconnect/pets') => {
  const b64 = Buffer.from(fileBuffer).toString('base64');
  const dataURI = `data:image/jpeg;base64,${b64}`;

  const result = await cloudinary.uploader.upload(dataURI, {
    folder,
    resource_type: 'image',
  });

  return {
    url: result.secure_url,
    publicId: result.public_id,
  };
};

const uploadVideo = async (fileBuffer, folder = 'pawconnect/pets/videos') => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      folder,
      resource_type: 'video',
    }, (error, result) => {
      if (error) reject(error);
      else resolve({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }).end(fileBuffer);
  });
};

const deleteImage = async (urlOrPublicId, resourceType = 'image') => {
  if (!urlOrPublicId) return;
  const publicId = urlOrPublicId.startsWith('http')
    ? extractPublicId(urlOrPublicId)
    : urlOrPublicId;
  if (publicId) {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  }
};

module.exports = { uploadImage, uploadVideo, deleteImage, extractPublicId };

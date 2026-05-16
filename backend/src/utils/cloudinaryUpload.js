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

const deleteImage = async (urlOrPublicId) => {
  if (!urlOrPublicId) return;
  const publicId = urlOrPublicId.startsWith('http')
    ? extractPublicId(urlOrPublicId)
    : urlOrPublicId;
  if (publicId) {
    await cloudinary.uploader.destroy(publicId);
  }
};

module.exports = { uploadImage, deleteImage, extractPublicId };

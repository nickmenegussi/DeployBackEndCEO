import { uploadImage } from "../../src/services/UploadService";
import { register } from "../../src/services/UserService";

export async function registerController(req, res) {
  try {
    const imageFile = req.file;
    let imageUrl = null;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    const user = await register({
      ...req.body,
      image_profile: imageUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Usuário cadastrado com sucesso",
      data: user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

import { uploadImage } from "../services/UploadService.js";
import { deleteService, getAllService, getByIdService, register, updateNameUserService, updateUserEmailService, updateUserForgotPasswordService, updateUserPasswordService, updateUserImageProfileService } from "../services/UserService.js";


export async function getByIdController(req, res, next) {
  try {
    const {idUser} = req.params
    const roleUser = req.data.role
    const idUserLogged = req.data.id

    const userByIdResult = await getByIdService(idUser, roleUser, idUserLogged)

    return res.status(200).json({
      ...userByIdResult
    })

  } catch (error) {
    next(error)
  }
}

export async function getAllController(req, res, next) {
  try {
    const users = await getAllService()

    return res.status(200).json({
      ...users
    })
  } catch (error) {
    next(error)
  }
}

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

export async function updateNameUserController(req, res, next) {
  try {
    const idUser = req.data.id
    const { nameUser } = req.body

    const nameUserUpdated = await updateNameUserService(idUser, nameUser)

    return res.status(200).json({
      ...nameUserUpdated
    })
  } catch (error) {
    next(error)
  }
}

export async function updateUserEmailController(req, res, next) {
  try {
    const idUser = req.data.id
    const { email } = req.body

    const nameUserUpdated = await updateUserEmailService(idUser, email)

    return res.status(200).json({
      ...nameUserUpdated
    })
  } catch (error) {
    next(error)
  }
}

export async function updateUserPasswordController(req, res, next) {
  try {
    const idUser = req.data.id
    const { newPassword,  currentPassword, confirmedPassword} = req.body

    const nameUserUpdated = await updateUserPasswordService(idUser, newPassword, currentPassword, confirmedPassword)

    return res.status(200).json({
      ...nameUserUpdated
    })
  } catch (error) {
    next(error)
  }
}

export async function updateUserForgotPasswordController(req, res, next) {
  try {
    const idUser = req.data.id
    const { email,  newPassword} = req.body

    const nameUserUpdated = await updateUserForgotPasswordService(idUser, email, newPassword)

    return res.status(200).json({
      ...nameUserUpdated
    })
  } catch (error) {
    next(error)
  }
}

export async function updateUserImageProfileController(req, res, next) {
  try {
    const idUser = req.data.id
    const imageFilename = req.file ? req.file.filename : null

    const imageProfileUpdated = await updateUserImageProfileService(idUser, imageFilename)

    return res.status(200).json({
      ...imageProfileUpdated
    })
  } catch (error) {
    next(error)
  }
}

export async function deleteController(req, res, next) {
  try {
    const {idUser} = req.params
    const roleUser = req.data.role
    const idUserLogged = req.data.id

    const userDelete = await deleteService(idUser, roleUser, idUserLogged)
    
    return res.status(200).json({
      ...userDelete
    })
    
  } catch (error) {
    next(error)
  }
}
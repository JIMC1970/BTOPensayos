import { prisma } from "../../prisma/client.js"
import cloudinary, { BASE_PATH } from "../helpers/cloudinary.js"
import generateCookie from "../utils/generateCookie.js"

export const dashboard= () => {
    
}

export async function updateUserRole(req, res){
    const {email, newRole} = req.body
    try {
        const user = await prisma.user.update({
            where: {email},
            data: {role: newRole}
        })
        generateCookie(user, res)
        res.status(200).json({details:"Usuario actualizado", user})
    } catch (error) {
        res.status(401).json({error, details: "Usuario no actualizado"})
    } finally {
        await prisma.$disconnect()
    }
}

export const getEmotionalStatesFolders = async (req, res) => {
  try {
    const result = await cloudinary.api.sub_folders(BASE_PATH);

    const folders = result.folders.map(folder => ({
      name: folder.name,
      path: folder.path,
    }));

    return res.json({
      basePath: BASE_PATH,
      folders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: 'Error obteniendo carpetas',
    });
  }
};
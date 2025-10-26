import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function updateUserProfile(userId, data) {
  const { password, ...profileData } = data;
  const updatePayload = { ...profileData };

  if (password && password.trim() !== "") {
    if (password.length < 8) {
      throw new Error("Kata sandi minimal harus 8 karakter.");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    updatePayload.password_hash = hashedPassword;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatePayload,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profile_picture_url: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw new Error("Gagal memperbarui profil pengguna.");
  }
}

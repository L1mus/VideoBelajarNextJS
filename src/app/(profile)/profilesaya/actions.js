"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { updateUserProfile } from "@/services/userService";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const profileSchema = z.object({
    name: z.string().min(1, "Nama wajib diisi"),
    phone: z.string().min(10, "Nomor HP tidak valid").optional().or(z.literal("")),
    gender: z.enum(["Laki_laki", "Perempuan"]),
    password: z.string().optional().or(z.literal("")),
    confirmPassword: z.string().optional().or(z.literal("")),
}).refine((data) => {
    if (data.password && data.password.length > 0) {
        return data.password.length >= 8;
    }
    return true;
}, {
    message: "Password minimal 8 karakter",
    path: ["password"],
}).refine((data) => data.password === data.confirmPassword, {
    message: "Konfirmasi password tidak cocok",
    path: ["confirmPassword"],
});

export async function updateProfileUnprotected(prevState, formData) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        return { success: false, message: "Unauthorized" };
    }

    const userId = parseInt(session.user.id, 10);
    const rawData = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        gender: formData.get("gender"),
        password: formData.get("password"),
        confirmPassword: formData.get("confirmPassword"),
    };

    const validation = profileSchema.safeParse(rawData);
    if (!validation.success) {
        return {
            success: false,
            message: validation.error.errors[0].message,
        };
    }

    try {
        const { confirmPassword, ...dataToUpdate } = validation.data;
        if (!dataToUpdate.password) delete dataToUpdate.password;

        await updateUserProfile(userId, dataToUpdate);

        revalidatePath("/profilesaya");

        return { success: true, message: "Profil berhasil diperbarui!" };
    } catch (error) {
        console.error("Update Profile Error:", error);
        return { success: false, message: "Gagal memperbarui profil." };
    }
}
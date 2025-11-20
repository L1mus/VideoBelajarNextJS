import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import ProfileForm from "@/components/form/ProfileForm";

async function getUserDetails(userId) {
    if (!userId || isNaN(userId)) {
        console.error("Invalid userId provided to getUserDetails:", userId);
        return null;
    }
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                profile_picture_url: true,
                phone: true,
                gender: true,
            },
        });
        return user;
    } catch (error) {
        console.error("Failed to fetch user details:", error);
        return null;
    }
}

export default async function ProfileSayaPage() {
    const session = await getServerSession(authOptions);
    const userId = parseInt(session?.user?.id, 10);
    if (isNaN(userId)) {
        console.error("Failed to parse user ID from session:", session?.user?.id);
        redirect("/login?error=Invalid session");
    }

    const userDetails = await getUserDetails(userId);
    const initialUserData = {
        name: userDetails?.name ?? session?.user?.name ?? "",
        email: userDetails?.email ?? session?.user?.email ?? "",
        avatarUrl:
            userDetails?.profile_picture_url ??
            session?.user?.image ??
            "/assets/images/avatar.jpg",
        phone: userDetails?.phone ?? "",
        gender: userDetails?.gender ?? "Perempuan",
    };

    return <ProfileForm initialData={initialUserData} />;
}
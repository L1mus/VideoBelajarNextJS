import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserOrders } from "@/services/userService";
import Image from "next/image";
import Link from "next/link";
import Chip from "@/components/button/Chip";

const getStatusColor = (status) => {
    switch (status) {
        case "completed": return "success";
        case "pending": return "warning";
        case "cancelled": return "error";
        default: return "disabled";
    }
};

const getStatusLabel = (status) => {
    switch (status) {
        case "completed": return "Berhasil";
        case "pending": return "Menunggu Bayar";
        case "cancelled": return "Dibatalkan";
        default: return status;
    }
};

export default async function PesananSayaPage() {
    const session = await getServerSession(authOptions);
    const userId = parseInt(session?.user?.id, 10);

    const orders = await getUserOrders(userId);

    return (
        <div>
            <h3 className="text-xl font-bold text-foreground mb-6">Riwayat Pesanan</h3>

            <div className="flex flex-col gap-4">
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div
                            key={order.id}
                            className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center bg-white shadow-sm"
                        >
                            <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                                <Image
                                    src={order.course.thumbnail_url || "/assets/images/cover1.jpg"}
                                    alt={order.course.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-foreground text-sm sm:text-base truncate pr-2">
                                        {order.course.title}
                                    </h4>
                                    <Chip
                                        variant="light"
                                        color={getStatusColor(order.status)}
                                        className="text-xs whitespace-nowrap"
                                    >
                                        {getStatusLabel(order.status)}
                                    </Chip>
                                </div>

                                <p className="text-xs text-gray-500 mt-1">
                                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                                        day: 'numeric', month: 'long', year: 'numeric'
                                    })}
                                </p>

                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-sm font-bold text-primary-default">
                                        Rp {Number(order.total_amount).toLocaleString("id-ID")}
                                    </p>

                                    {order.status === "pending" && (
                                        <Link
                                            href={`/bayar/${order.course_id}`}
                                            className="text-xs font-bold text-white bg-primary-default px-3 py-1.5 rounded-lg hover:bg-primary-400 transition"
                                        >
                                            Bayar Sekarang
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 text-gray-500">
                        Belum ada riwayat pesanan.
                    </div>
                )}
            </div>
        </div>
    );
}
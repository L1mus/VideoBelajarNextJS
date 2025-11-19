"use client";

import React, { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { submitReview } from "@/app/actions/reviewActions";
import Button from "@/components/button/Button";
import { useNotificationStore } from "@/store/notificationStore";

// Komponen Star Input Sederhana
const StarInput = ({ value, onChange }) => {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    onClick={() => onChange(star)}
                    className={`text-2xl focus:outline-none transition-colors ${
                        star <= value ? "text-yellow-400" : "text-gray-300"
                    }`}
                >
                    ★
                </button>
            ))}
        </div>
    );
};

const ReviewForm = ({ courseId, onSuccess }) => {
    const { showToast } = useNotificationStore();
    const [rating, setRating] = useState(5);

    const [state, formAction] = useFormState(submitReview, {
        success: false,
        message: null,
    });

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                showToast(state.message, "success");
                if (onSuccess) onSuccess(); // Callback untuk menutup form/refresh
            } else {
                showToast(state.message, "error");
            }
        }
    }, [state, showToast, onSuccess]);

    return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
            <h4 className="font-bold text-lg mb-4">Tulis Ulasan Anda</h4>
            <form action={formAction} className="flex flex-col gap-4">
                <input type="hidden" name="courseId" value={courseId} />
                <input type="hidden" name="rating" value={rating} />

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Berikan Rating
                    </label>
                    <StarInput value={rating} onChange={setRating} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Komentar
                    </label>
                    <textarea
                        name="comment"
                        rows={4}
                        placeholder="Bagikan pengalaman belajar Anda..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-default"
                        required
                    />
                </div>

                <div className="flex justify-end">
                    <Button type="submit" variant="solid" color="primary" size="sm">
                        Kirim Ulasan
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ReviewForm;
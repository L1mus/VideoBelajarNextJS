"use client";

import React, { useState } from "react";
import Image from "next/image";
import ChevronDownIcon from "../icons/ChevronDownIcon";

const AccordionItem = ({ section, isOpen, onClick, completedLessonIds }) => {
    return (
        <div className="border-gray-300">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center py-4 text-left"
            >
                <h6 className="text-lg text-primary-default">{section.title}</h6>
                <ChevronDownIcon
                    className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>
            <div
                className={`transition-[max-height,padding] duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-screen pb-4" : "max-h-0"
                }`}
            >
                <ul className="flex flex-col gap-y-4">
                    {section.lessons.map((lesson, index) => {
                        const isCompleted = completedLessonIds?.includes(lesson.id);

                        return (
                            <li
                                key={index}
                                className={`flex items-center justify-between p-4 border rounded-lg ${
                                    isCompleted ? "bg-green-50 border-green-200" : "border-gray-300"
                                }`}
                            >
                <span className={`text-base font-medium ${isCompleted ? "text-green-800" : "text-gray-700"}`}>
                  {lesson.title}
                </span>

                                <div className="hidden md:flex items-center gap-x-4 text-gray-500">
                                    {isCompleted && (
                                        <div className="flex items-center gap-x-2 bg-green-100 px-2 py-1 rounded text-green-700 text-xs font-bold">
                                            <Image
                                                src="/assets/icons/icon-checkgreen.svg"
                                                alt="Selesai"
                                                width={16}
                                                height={16}
                                            />
                                            <span>Selesai</span>
                                        </div>
                                    )}

                                    <div className="flex items-center gap-x-2">
                                        <Image
                                            src="/assets/icons/icon-play-circle.svg"
                                            alt="Tipe video"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-sm">Video</span>
                                    </div>
                                    <div className="flex items-center gap-x-2">
                                        <Image
                                            src="/assets/icons/icon-clock.svg"
                                            alt="Durasi video"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-sm">{lesson.duration} Menit</span>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

const KurikulumAccordion = ({ curriculumData, completedLessonIds }) => {
    const [openIndex, setOpenIndex] = useState(0);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="w-full">
            {curriculumData.map((section, index) => (
                <AccordionItem
                    key={index}
                    section={section}
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                    completedLessonIds={completedLessonIds}
                />
            ))}
        </div>
    );
};

export default KurikulumAccordion;
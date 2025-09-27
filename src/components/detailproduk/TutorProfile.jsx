import React from "react";
import Image from "next/image";

const TutorProfile = ({ name, title, company, bio, avatarUrl }) => {
  return (
    <div className="flex items-start gap-4">
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={avatarUrl}
          alt={`Foto ${name}`}
          fill
          className="rounded-full object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex flex-col">
        <h4 className="text-lg font-bold text-foreground">{name}</h4>
        <p className="text-base text-gray-600">
          {title} di {company}
        </p>
        {bio && (
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{bio}</p>
        )}
      </div>
    </div>
  );
};

export default TutorProfile;

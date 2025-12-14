"use client";

export default function SmallCard({ title }) {
  return (
    <div
      className="
      w-full
        bg-primary-main
        text-background
        flex
        rounded-r16
        px-s16
        py-s40
        items-center
        justify-center
        cursor-pointer
        body-large
      "
    >
      {title}
    </div>
  );
}

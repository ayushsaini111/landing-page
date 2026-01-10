export default function InfoCard({ data, rotate = 0 }) {
  return (
    <div
      className="
        bg-secondary-light
        rounded-r16
        shadow-sm
        px-s16 py-s24
        sm:px-s24 sm:py-s32
        lg:px-[24px] lg:py-[100px]
        min-h-auto lg:min-h-[573px]
        transition-transform
      "
      style={{
        transform: `rotate(${typeof window !== "undefined" && window.innerWidth < 1024 ? 0 : rotate}deg)`
      }}
    >
      <h4 className="title-h4 text-primary-main mb-s8">
        {data.title}
      </h4>

      <p className="body-small text-left text-secondary mb-s12">
        {data.description}
      </p>

      <ul className="list-disc pl-s16 space-y-s6">
        {data.points.map((point, i) => (
          <li key={i} className="body-small text-left text-secondary">
            {point}
          </li>
        ))}
      </ul>

      {data.footerNote && (
        <p className="caption text-left text-secondary mt-s12">
          {data.footerNote}
        </p>
      )}
    </div>
  );
}

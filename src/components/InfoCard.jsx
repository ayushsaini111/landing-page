export default function InfoCard({ data, rotate = 0 }) {
  return (
    <div
      style={{ "--r": `${rotate}deg` }}
      className="
        bg-secondary-dark
        rounded-r16
        md:shadow-md
        p-s24
        lg:px-s24 lg:py-[50px]
      
        md:max-w-[370px]
        transition-transform duration-300 ease-out
        [transform:rotate(0deg)]
        lg:[transform:rotate(var(--r))]
      "
    >
      <h4 className="heading-h5 text-accent-main mb-s8">
        {data.title}
      </h4>

      <p className="body-default text-left text-main ">
        {data.description}
      </p>

      <ul className="list-disc pl-s16  ">
        {data.points.map((point, i) => (
          <li key={i} className="body-default text-left text-main">
            {point}
          </li>
        ))}
      </ul>

      {data.footerNote && (
        <p className="body-default text-left text-main mt-s12">
          {data.footerNote}
        </p>
      )}
    </div>
  );
}

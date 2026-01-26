"use client";

export default function Input({ label, register, name, error, ...props }) {
    return (
        <div className="flex flex-col gap-s8 w-full">
            {label && <label className="body-default text-secondary">{label}</label>}
            <input
                {...register(name)}
                {...props}
                onInput={(e) => {
                    if (props.type === "tel") {
                        // allow only 0-9 AND restrict to 10 digits max
                        e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
                    }
                }}
                className={`border-2 rounded-r8 p-s16 outline-none text-disabled body-small bg-secondary-dark
    focus:ring-2 focus:ring-accent-main
    ${error ? "border-red-main" : "border-accent-main"}
  `}
            />
            {error && (
                <p className="text-red-main body-small">{error.message}</p>
            )}
        </div>
    );
}

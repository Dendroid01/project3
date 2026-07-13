import { forwardRef } from "react";
import type { ComponentPropsWithoutRef } from "react";
import { Icon } from "./Icon";

type FormFieldProps = {
    iconName: string;
    iconSize?: number;
    placeholder?: string;
    label?: string;
    link?: {
        text: string;
        href: string;
    };
    error?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'placeholder'>;

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
    function FormField({
                           iconName,
                           iconSize = 1,
                           placeholder,
                           label,
                           link,
                           className = "",
                           error,
                           type = "text",
                           ...props
                       }, ref) {
        return (
            <div className="flex flex-col gap-2">
                {(label || link) && (
                    <div className="flex items-center justify-between px-2">
                        {label && (
                            <label
                                htmlFor={props.id}
                                className="font-regular text-[#BEC8D2] "
                            >
                                {label}
                            </label>
                        )}
                        {link && (
                            <a
                                href={link.href}
                                className="text-[#89CEFF] hover:underline"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {link.text}
                            </a>
                        )}
                    </div>
                )}

                <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-[#D8DEE4] ">
                        <Icon name={iconName} size={iconSize} />
                    </span>
                    <input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        id={props.id}
                        className={`
                            w-full rounded-2xl border border-[#6B7280] py-4.5 pl-10 pr-4
                            ${
                            error
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-[#6B7280] focus:border-blue-500 focus:ring-blue-500/20 '
                        }
                            bg-white text-gray-900 placeholder:text-[#6B7280]
                            focus:outline-none focus:ring-2
                            disabled:cursor-not-allowed disabled:opacity-50
                            ${className}
                        `}
                        {...props}
                    />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        );
    }
);

FormField.displayName = "FormField";
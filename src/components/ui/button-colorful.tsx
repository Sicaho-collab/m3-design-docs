import { cn } from "@/lib/utils"
import { ArrowUpRight } from "lucide-react"

interface ButtonColorfulProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label?: string
}

// M3 brand gradient matching the AI Prompt Box stroke
const M3_GRADIENT = "linear-gradient(to right, #9A76BE, #C084FC, #E879A0)"

export function ButtonColorful({
    className,
    label = "Explore Components",
    disabled,
    ...props
}: ButtonColorfulProps) {
    return (
        <div
            className={cn(
                "relative inline-flex rounded-full p-[1.5px] transition-all duration-300 group/btn",
                disabled && "bg-m3-outline-variant",
                className,
            )}
            style={disabled ? undefined : { background: M3_GRADIENT }}
        >
            <button
                type="button"
                className={cn(
                    "relative h-10 px-5 rounded-full transition-all duration-300",
                    "disabled:cursor-not-allowed",
                    disabled
                        ? "bg-white"
                        : "bg-white group-hover/btn:bg-transparent",
                )}
                disabled={disabled}
                {...props}
            >
                {/* Content */}
                <div className="relative flex items-center justify-center gap-2">
                    {disabled && (
                        <>
                            <span className="font-medium text-m3-outline">{label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-m3-outline" />
                        </>
                    )}

                    {!disabled && (
                        <>
                            <span
                                className="font-medium bg-clip-text text-transparent group-hover/btn:opacity-0 transition-opacity duration-300"
                                style={{ backgroundImage: M3_GRADIENT }}
                            >
                                {label}
                            </span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-m3-primary group-hover/btn:opacity-0 transition-opacity duration-300" />

                            <span className="absolute inset-0 flex items-center justify-center gap-2 font-medium text-white opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300">
                                {label}
                                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                            </span>
                        </>
                    )}
                </div>
            </button>
        </div>
    )
}

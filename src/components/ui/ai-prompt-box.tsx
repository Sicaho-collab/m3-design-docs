"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Send, ChevronDown, Image, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Custom hook: detect dark mode via class on <html> ──────────────────────────
function useIsDark() {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);
  return isDark;
}

// ── Types ──────────────────────────────────────────────────────────────────────
interface GradientColors {
  topLeft: string;
  topRight: string;
  bottomRight: string;
  bottomLeft: string;
}
interface ThemeGradients {
  light: GradientColors;
  dark: GradientColors;
}
interface DropdownOption {
  id: string;
  label: string;
  value: string;
}
export interface AIPromptBoxProps {
  placeholder?: string;
  onSend?: (message: string) => void;
  enableAnimations?: boolean;
  className?: string;
  disabled?: boolean;
  dropdownOptions?: DropdownOption[];
  onOptionSelect?: (option: DropdownOption) => void;
  mainGradient?: ThemeGradients;
  outerGradient?: ThemeGradients;
  innerGradientOpacity?: number;
  buttonBorderColor?: { light: string; dark: string };
  enableShadows?: boolean;
  shadowOpacity?: number;
  shadowColor?: { light: string; dark: string };
}

// ── M3 brand palette ───────────────────────────────────────────────────────────
// Light: lavender → peach → orange → light-purple
// Dark:  deep-purple → dark-orange → very-dark-orange → dark-purple
const M3_MAIN: ThemeGradients = {
  light: {
    topLeft: "#D4B8F0",   // inverse-primary (lavender)
    topRight: "#FFE5C4",  // secondary-container (peach)
    bottomRight: "#FFA33C", // secondary (orange)
    bottomLeft: "#EDE0FF",  // primary-container (soft purple)
  },
  dark: {
    topLeft: "#583D72",   // on-primary-container
    topRight: "#8B4A1A",  // dark orange
    bottomRight: "#4D2800", // on-secondary-container
    bottomLeft: "#3D2E4F",  // very dark purple
  },
};
const M3_OUTER: ThemeGradients = {
  light: {
    topLeft: "#C3A3E0",
    topRight: "#F0C88A",
    bottomRight: "#E08A1A",
    bottomLeft: "#C9B0F0",
  },
  dark: {
    topLeft: "#3E2955",
    topRight: "#6A3410",
    bottomRight: "#3A1C00",
    bottomLeft: "#2A1F3A",
  },
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const hexToRgba = (color: string, alpha: number): string => {
  if (color.startsWith("rgb(")) {
    const [r, g, b] = color.slice(4, -1).split(",").map(Number);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  if (color.startsWith("#")) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  return color;
};

// ── Component ─────────────────────────────────────────────────────────────────
export function AIPromptBox({
  placeholder = "Send message...",
  onSend,
  enableAnimations = true,
  className,
  disabled = false,
  dropdownOptions = [
    { id: "option1", label: "ChatGPT", value: "chatgpt" },
    { id: "option2", label: "Claude", value: "claude" },
    { id: "option3", label: "Gemini", value: "gemini" },
  ],
  onOptionSelect,
  mainGradient = M3_MAIN,
  outerGradient = M3_OUTER,
  innerGradientOpacity = 0.1,
  buttonBorderColor = { light: "#C9C9C9", dark: "#49454F" },
  enableShadows = true,
  shadowOpacity = 1,
  shadowColor = {
    light: "rgb(154,118,190)", // m3-primary purple
    dark: "rgb(255,163,60)",   // m3-secondary orange
  },
}: AIPromptBoxProps) {
  const isDark = useIsDark();
  const [message, setMessage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = enableAnimations && !shouldReduceMotion;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const grad = isDark ? mainGradient.dark : mainGradient.light;
  const outerGrad = isDark ? outerGradient.dark : outerGradient.light;
  const btnBorder = isDark ? buttonBorderColor.dark : buttonBorderColor.light;
  const shadow = isDark ? shadowColor.dark : shadowColor.light;

  const conicGrad = (c: GradientColors) =>
    `conic-gradient(from 0deg at 50% 50%, ${c.topLeft} 0deg, ${c.topRight} 90deg, ${c.bottomRight} 180deg, ${c.bottomLeft} 270deg, ${c.topLeft} 360deg)`;

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setIsDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && onSend && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachedFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
    e.target.value = "";
  };

  return (
    <motion.div
      className={cn("relative", className)}
      initial={shouldAnimate ? { opacity: 0, y: 20 } : {}}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
    >
      <div className="relative">
        {/* Outer 0.5px border */}
        <div
          className="absolute inset-0 rounded-[20px] p-[0.5px]"
          style={{ background: conicGrad(outerGrad) }}
        >
          {/* Main 2px border */}
          <div
            className="h-full w-full rounded-[19.5px] p-[2px]"
            style={{ background: conicGrad(grad) }}
          >
            {/* Inner background */}
            <div className="h-full w-full rounded-[17.5px] bg-m3-surface relative">
              {/* Inner 0.5px tint border */}
              <div
                className="absolute inset-0 rounded-[17.5px] p-[0.5px]"
                style={{
                  background: `conic-gradient(from 0deg at 50% 50%,
                    ${hexToRgba(outerGrad.topLeft, innerGradientOpacity)} 0deg,
                    ${hexToRgba(outerGrad.topRight, innerGradientOpacity)} 90deg,
                    ${hexToRgba(outerGrad.bottomRight, innerGradientOpacity)} 180deg,
                    ${hexToRgba(outerGrad.bottomLeft, innerGradientOpacity)} 270deg,
                    ${hexToRgba(outerGrad.topLeft, innerGradientOpacity)} 360deg)`,
                }}
              >
                <div className="h-full w-full rounded-[17px] bg-m3-surface" />
              </div>
              {/* Top highlight */}
              <div
                className="absolute top-0 left-4 right-4 h-[0.5px]"
                style={{
                  background: `linear-gradient(to right, transparent, ${hexToRgba(grad.topLeft, 0.3)}, transparent)`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-4">
          {/* Row 1: textarea + send */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-1">
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className={cn(
                  "w-full resize-none border-0 bg-transparent",
                  "text-m3-on-surface placeholder:text-m3-on-surface-variant",
                  "text-base leading-6 py-2 px-0",
                  "focus:outline-none focus:ring-0",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                style={{ minHeight: 40, maxHeight: 120 }}
                onInput={e => {
                  const t = e.target as HTMLTextAreaElement;
                  t.style.height = "auto";
                  t.style.height = Math.min(t.scrollHeight, 120) + "px";
                }}
              />
            </div>
            <motion.button
              type="button"
              onClick={handleSubmit}
              disabled={disabled || !message.trim()}
              className={cn(
                "flex items-center justify-center w-8 h-8 mt-1",
                "text-m3-on-surface-variant hover:text-m3-on-surface transition-colors",
                (disabled || !message.trim()) && "opacity-40 cursor-not-allowed",
              )}
              whileHover={shouldAnimate && message.trim() ? { scale: 1.1 } : {}}
              whileTap={shouldAnimate && message.trim() ? { scale: 0.9 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Send className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Row 2: Attach + Dropdown + file pills */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Attach File */}
            <motion.button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={disabled}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm",
                "text-m3-on-surface-variant hover:text-m3-on-surface",
                "bg-m3-surface-container-low hover:bg-m3-surface-container",
                "transition-colors",
                disabled && "opacity-50 cursor-not-allowed",
              )}
              style={{ border: `1px solid ${btnBorder}` }}
              whileHover={shouldAnimate ? { scale: 1.02 } : {}}
              whileTap={shouldAnimate ? { scale: 0.98 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Image className="w-3 h-3" aria-hidden />
              <span>Attach File</span>
            </motion.button>

            {/* Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                type="button"
                onClick={() => setIsDropdownOpen(v => !v)}
                disabled={disabled}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm",
                  "text-m3-on-surface-variant hover:text-m3-on-surface",
                  "bg-m3-surface-container-low hover:bg-m3-surface-container",
                  "transition-colors",
                  disabled && "opacity-50 cursor-not-allowed",
                )}
                style={{ border: `1px solid ${btnBorder}` }}
                whileHover={shouldAnimate ? { scale: 1.02 } : {}}
                whileTap={shouldAnimate ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <span className="font-medium">
                  {selectedOption ? selectedOption.label : "Select"}
                </span>
                <ChevronDown
                  className={cn(
                    "w-3 h-3 transition-transform",
                    isDropdownOpen && "rotate-180",
                  )}
                />
              </motion.button>

              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -5, scale: 0.95 }}
                  className={cn(
                    "absolute top-full mt-2 left-0 z-10",
                    "min-w-[120px] rounded-m3-md p-1",
                    "bg-m3-surface-container-low",
                    "border border-m3-outline-variant shadow-m3-2",
                  )}
                >
                  {dropdownOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSelectedOption(opt);
                        onOptionSelect?.(opt);
                        setIsDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 text-sm rounded-m3-sm",
                        "flex items-center gap-2 mb-0.5",
                        "text-m3-on-surface hover:bg-m3-primary/8 transition-colors",
                        selectedOption?.id === opt.id && "bg-m3-primary/8",
                      )}
                    >
                      <span className="flex-1">{opt.label}</span>
                      {selectedOption?.id === opt.id && (
                        <Check className="w-3 h-3 text-m3-primary" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Separator + file pills */}
            {attachedFiles.length > 0 && (
              <>
                <div className="h-6 w-px bg-m3-outline-variant" />
                {attachedFiles.map((file, i) => (
                  <motion.div
                    key={`${file.name}-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm",
                      "text-m3-on-surface-variant bg-m3-surface-container",
                    )}
                    style={{ border: `1px solid ${btnBorder}` }}
                  >
                    <span className="truncate max-w-[100px]">{file.name}</span>
                    <button
                      onClick={() =>
                        setAttachedFiles(prev => prev.filter((_, j) => j !== i))
                      }
                      className="flex-shrink-0 w-4 h-4 rounded-full bg-m3-on-surface/10 hover:bg-m3-error/20 flex items-center justify-center"
                    >
                      <X className="w-3 h-3 text-m3-on-surface hover:text-m3-error" />
                    </button>
                  </motion.div>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt"
        />

        {/* Shadow system */}
        {enableShadows && (
          <>
            <div
              className="absolute -bottom-3 left-3 right-3 h-6 rounded-full blur-md pointer-events-none"
              style={{
                opacity: shadowOpacity,
                background: `linear-gradient(to bottom, ${hexToRgba(shadow, 0.1)}, transparent)`,
              }}
            />
            <div
              className="absolute -left-2 top-3 bottom-3 w-4 rounded-full blur-sm pointer-events-none"
              style={{
                opacity: shadowOpacity,
                background: `linear-gradient(to right, ${hexToRgba(shadow, 0.06)}, transparent)`,
              }}
            />
            <div
              className="absolute -right-2 top-3 bottom-3 w-4 rounded-full blur-sm pointer-events-none"
              style={{
                opacity: shadowOpacity,
                background: `linear-gradient(to left, ${hexToRgba(shadow, 0.06)}, transparent)`,
              }}
            />
            <div
              className="absolute inset-0 rounded-[20px] pointer-events-none"
              style={{
                boxShadow: `0 10px 25px ${hexToRgba(shadow, isDark ? 0.15 : 0.08)}`,
              }}
            />
          </>
        )}
      </div>
    </motion.div>
  );
}

import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import Image from "next/image"
import { format } from "date-fns";
import Calendar from "../../icons/calendar.svg";
import Arrow from "../../icons/arrow.svg"
import "react-day-picker/dist/style.css";

import styles from "./styles.module.css"

interface DateSelectorProps {
    value?: Date;
    onChange?: (value: Date) => void;
}

export default function DateSelector({ value, onChange }: DateSelectorProps) {
    const [open, setOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);
    const today = new Date();
    const selectedDate = value || undefined;
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 7);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [open]);

    return (
        <section className={styles.dateSelector}>
            <button
                type="button"
                onClick={() => setOpen((preview) => !preview)}
            >
                <Image src={Calendar} alt="Calendário" width={20} height={20} />
                <span>
                    {selectedDate
                        ? format(selectedDate, "dd/MM/yyyy")
                        : "Selecione"}
                </span>
                <Image src={Arrow} alt="Seta" width={20} height={20} />
            </button>

            {open && (
                <div className={styles.popover}>
                    <div ref={popoverRef}>
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={(day) => {
                                if (!day) return;
                                onChange?.(day);
                                setOpen(false);
                            }}
                            disabled={{ before: today, after: maxDate }}
                            className={styles.calendar}
                        />
                    </div>
                </div>
            )}
        </section>
    )
}
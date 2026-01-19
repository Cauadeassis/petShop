import { useState } from "react";
import { DayPicker } from "react-day-picker";
import Image from "next/image"
import { format } from "date-fns";
import Calendar from "../../icons/calendar.svg";
import Arrow from "../../icons/arrow.svg"
import "react-day-picker/dist/style.css";

interface DateSelectorProps {
    value?: string;
    onChange?: (value: string) => void;
}

export default function DateSelector({ value, onChange }: DateSelectorProps) {
    const [open, setOpen] = useState(false);
    const selectedDate = value ? new Date(value + "T00:00:00") : undefined;

    return (
        <section className="component">
            <button
                type="button"
                onClick={() => setOpen((preview) => !preview)}
            >
                <Image src={Calendar} alt="Calendário" width={24} height={24} />
                <span>
                    {selectedDate
                        ? format(selectedDate, "dd/MM/yyyy")
                        : "Selecione"}
                </span>
                <Image src={Arrow} alt="Seta" width={24} height={24} />
            </button>

            {open && (
                <div className="popover">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={(day) => {
                            if (!day) return;
                            const formatted = day.toISOString().split("T")[0];
                            onChange(formatted);
                            setOpen(false);
                        }}
                        disabled={{ before: new Date() }}
                    />
                </div>
            )}
        </section>
    );
}
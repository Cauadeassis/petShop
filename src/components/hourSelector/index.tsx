import styles from "./styles.module.scss";
import Image from "next/image";
import Clock from "../../icons/clock.svg";
import Arrow from "../../icons/arrow.svg";

interface HourSelectorProps {
    hour: string;
    onChange: (value: string) => void;
}

export default function HourSelector({ hour, onChange }: HourSelectorProps) {

    function generateHours(start = 9, end = 21): string[] {
        const hours: string[] = [];
        for (let hour = start; hour <= end; hour++) {
            hours.push(`${String(hour).padStart(2, "0")}:00`);
        }

        return hours;
    }

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value);
    };
    return (
        <div className={styles.selectWrapper}>
            <Image
                className={styles.inputIcon}
                src={Clock}
                alt="Relógio"
            />
            <select
                value={hour}
                onChange={handleChange}
                required
            >
                <option value="" disabled>
                    Selecione
                </option>
                {generateHours(9, 21).map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}
                    </option>
                ))}
            </select>
            <Image
                className={styles.inputIcon}
                src={Arrow}
                alt="Seta"
            />
        </div>
    )
}
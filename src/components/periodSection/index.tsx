import FogSun from "../../icons/fogSun.svg"
import CloudSun from "../../icons/cloudSun.svg"
import Moon from "../../icons/moon.svg"
import Image from "next/image"

import styles from "./styles.module.scss"

import { Appointment } from "../../types"

export const periodIcons = {
    morning: FogSun,
    afternoon: CloudSun,
    evening: Moon,
} as const;

export const periodHours = {
    morning: "9h-12h",
    afternoon: "13h-18h",
    evening: "19h-21h"
} as const;

export const periodNames = {
    morning: "Manhã",
    afternoon: "Tarde",
    evening: "Noite"
}
export type Period = "morning" | "afternoon" | "evening"

interface PeriodSectionProps {
    period: Period;
    appointments: Appointment[];
    onDelete: (id: string) => void;
    isReceivingData: boolean;
}

export default function PeriodSection({
    period,
    appointments,
    onDelete,
    isReceivingData
}: PeriodSectionProps) {
    return (
        <section className={styles.periodSection}>
            <div className={styles.periodHeader}>
                <span className={styles.periodContainer}>
                    <Image src={periodIcons[period]} alt="Ícone do período" width={20} height={20} />
                    <h2>{periodNames[period]}</h2>
                </span>
                <span className={styles.hourContainer}>{periodHours[period]}</span>
            </div>

            {appointments.length === 0 && (
                <div className={styles.emptyState}>
                    <p>
                        {isReceivingData
                            ? "Carregando..."
                            : "Nenhum agendamento para este período"
                        }
                    </p>
                </div>
            )}

            {!isReceivingData && appointments.length > 0 && (
                <ul className={styles.appointmentList}>
                    {appointments.map((appointment) => (
                        <li key={appointment.id}>
                            <span className={styles.hour}>
                                <time dateTime={appointment.hour}>{appointment.hour}</time>
                            </span>
                            <div className={styles.petInfo}>
                                <strong>{appointment.pet_name}</strong>
                                <span> / {appointment.tutor_name}</span>
                            </div>
                            <span className={styles.service}>{appointment.service}</span>
                            <button
                                onClick={() => onDelete(appointment.id)}
                                aria-label={`Remover agendamento de ${appointment.pet_name} às ${appointment.hour}`}
                                className={styles.removeButton}
                            >
                                Remover agendamento
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}
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
    afternoon: "13-18h",
    evening: "19h-21"
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
}

export default function PeriodSection({
    period,
    appointments,
    onDelete
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

            {appointments.length > 0 ? (
                <table>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className={styles.hour}>{appointment.hour}</td>
                                <td>
                                    <strong>{appointment.pet_name}</strong>
                                    <span> / {appointment.tutor_name}</span>
                                </td>
                                <td>{appointment.service}</td>
                                <td>
                                    <button onClick={() => onDelete(appointment.id)}>
                                        Remover agendamento
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.emptyState}>
                    <p>Nenhum agendamento para este período</p>
                </div>
            )}
        </section>
    )
}
import FogSun from "../../icons/fogSun.svg"
import CloudSun from "../../icons/cloudSun.svg"
import Moon from "../../icons/moon.svg"
import Image from "next/image"

import styles from "./styles.module.scss"

import { Appointment } from "../../types"

export const ICONS = {
    FogSun,
    CloudSun,
    Moon,
} as const;

interface PeriodSectionProps {
    icon: keyof typeof ICONS;
    periodName: string;
    hour: string;
    appointments: Appointment[];
    onDelete: (id: string) => void;
}

export default function PeriodSection({
    icon,
    periodName,
    hour,
    appointments /* morningAppointments */,
    onDelete
}: PeriodSectionProps) {
    return (
        <section className={styles.periodSection}>
            <div className={styles.periodHeader}>
                <span className={styles.periodContainer}>
                    <Image src={ICONS[icon]} alt="Ícone do período" width={20} height={20} />
                    <h2>{periodName}</h2>
                </span>
                <span className={styles.hourContainer}>{hour}</span>
            </div>

            {appointments.length > 0 ? (
                <table>
                    <tbody>
                        {appointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td className={styles.hour}>{appointment.hour}</td>
                                <td>
                                    <strong>{appointment.petName}</strong>
                                    <span> / {appointment.tutorName}</span>
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
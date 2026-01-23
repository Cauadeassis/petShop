import FogSun from "../../icons/fogSun.svg"
import CloudSun from "../../icons/cloudSun.svg"
import Moon from "../../icons/moon.svg"
import Image from "next/image"

import styles from "./styles.module.css"

export const ICONS = {
    FogSun,
    CloudSun,
    Moon,
} as const;

interface PeriodSectionProps {
    icon: keyof typeof ICONS;
    periodName: string;
    time: string;
}

export default function PeriodSection({ icon, periodName, time }: PeriodSectionProps) {
    return (
        <section className={styles.periodSection}>
            <div>
                <span className={styles.periodContainer}>
                    <Image src={ICONS[icon]} alt="Ícone do período" width={20} height={20} />
                    <h2>{periodName}</h2>
                </span>
                <span className={styles.timeContainer}>{time}</span>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td className={styles.time}>09:00</td>
                        <td className={styles.petOwner}>
                            <strong>Thor</strong>
                            <span> / Fernanda Costa</span>
                        </td>
                        <td className={styles.service}>Vacinação</td>
                        <td className={styles.removeButton}>Remover agendamento</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}
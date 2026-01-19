import FogSun from "../../icons/fogSun.svg"
import CloudSun from "../../icons/cloudSun.svg"
import Moon from "../../icons/moon.svg"
import Image from "next/image"

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

export default function PeriodSection({ icon, periodName, time }) {
    return (
        <section>
            <div>
                <span className="iconContainer">
                    <Image src={ICONS[icon]} alt="Ícone do período" width={24} height={24} />
                </span>
                <h2>{periodName}</h2>
                <span className="timeContainer">{time}</span>
            </div>
            <table>
                <tbody>
                    <tr>
                        <td className="time">09:00</td>
                        <td className="pet-owner">
                            <strong>Thor</strong>
                            <span> / Fernanda Costa</span>
                        </td>
                        <td className="service">Vacinação</td>
                        <td className="remove-button">Remover agendamento</td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}
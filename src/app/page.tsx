"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"
import Dog from "../icons/dog.svg"
import Arrow from "../icons/arrow.svg"
import Clock from "../icons/clock.svg"
import CloudSun from "../icons/cloudSun.svg"
import FogSun from "../icons/fogSun.svg"
import Moon from "../icons/moon.svg"
import Paw from "../icons/paw.svg"
import Phone from "../icons/phone.svg"
import User from "../icons/user.svg"
import deleteIcon from "../icons/deleteIcon.svg"

import DateSelector from "../components/dateSelector"
import PeriodSection from "../components/periodSection"

import styles from "./styles.module.css"

function generateHours(start = 9, end = 21): string[] {
    const hours: string[] = [];
    for (let hour = start; hour <= end; hour++) {
        hours.push(`${String(hour).padStart(2, "0")}:00`);
    }

    return hours;
}

export default function Petshop() {
    const today = new Date();
    const [formDate, setFormDate] = useState<Date>(today);
    const [day, setDay] = useState<Date>(today);
    const [time, setTime] = useState("");
    const [isScheduling, setIsScheduling] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsScheduling(false);
            }
        }

        if (isScheduling) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isScheduling]);
    return (
        <div className={styles.body}>
            <header>
                <Image src={Dog} alt="Cachorro" className={styles.logo} width={20} height={20} />
                <h2>MUNDO PET</h2>
            </header>
            <main>
                <section>
                    <div className={styles.titleContainer}>
                        <h1>Sua agenda</h1>
                        <p>Aqui você pode ver todos os clientes e serviços agendados para hoje.</p>
                    </div>
                    <div className={styles.dateContainer}>
                        <DateSelector />
                    </div>
                </section>
                <div className={styles.sectionsContainer}>
                    <PeriodSection
                        icon="FogSun"
                        periodName="Manhã"
                        time="9h-12h"
                    />
                    <PeriodSection
                        icon="CloudSun"
                        periodName="Tarde"
                        time="13h-18h"
                    />
                    <PeriodSection
                        icon="Moon"
                        periodName="Noite"
                        time="19h-21h"
                    />
                </div>
                <button
                    onClick={() => setIsScheduling(true)}
                >NOVO AGENDAMENTO</button>
                {isScheduling && (
                    <div className={styles.modalOverlay}>
                        <div className={styles.modalContainer} ref={popoverRef}>
                            <h1>Agende um atendimento</h1>
                            <p>Preencha os dados do cliente para realizar o agendamento:</p>
                            <form>
                                <section>
                                    <label>Nome do tutor</label>
                                    <div className={styles.inputWrapper}>
                                        <Image className={styles.inputIcon} src={User} alt="Pessoa" width={20} height={20} />
                                        <input type="text" placeholder="Helena Souza" />
                                    </div>
                                </section>
                                <section>
                                    <label>Nome do pet</label>
                                    <div className={styles.inputWrapper}>
                                        <Image className={styles.inputIcon} src={Paw} alt="Paw icon" width={20} height={20} />
                                        <input type="text" placeholder="Cheddar" />
                                    </div>
                                </section>
                                <section>
                                    <label>Telefone</label>
                                    <div className={styles.inputWrapper}>
                                        <Image className={styles.inputIcon} src={Phone} alt="Telefone" width={20} height={20} />
                                        <input type="tel" placeholder="(00) 0 0000-0000" />
                                    </div>
                                </section>
                                <section>
                                    <label>Descrição do serviço</label>
                                    <textarea placeholder="Banho e tosa"></textarea>
                                </section>
                                <div className={styles.formRow}>
                                    <section>
                                        <label>Data</label>
                                        <div className={styles.dateSelector}>
                                            <DateSelector value={formDate} onChange={setFormDate} />
                                        </div>
                                    </section>
                                    <section>
                                        <label>Hora</label>
                                        <div className={styles.selectWrapper}>
                                            <Image className={styles.inputIcon} src={Clock} alt="Relógio" width={20} height={20} />
                                            <select value={time} onChange={(event) => setTime(event.target.value)}>
                                                <option value="" disabled>
                                                    Selecione
                                                </option>
                                                {generateHours(9, 21).map((hour) => (
                                                    <option key={hour} value={hour}>
                                                        {hour}
                                                    </option>
                                                ))}
                                            </select>
                                            <Image className={styles.inputIcon} src={Arrow} alt="Seta" width={20} height={20} />
                                        </div>
                                    </section>
                                </div>
                                <button
                                    type="submit"
                                    onClick={() => setIsScheduling(false)}
                                >AGENDAR
                                </button>
                            </form>
                        </div>
                    </div>
                )
                }
            </main >
        </div >
    )
}
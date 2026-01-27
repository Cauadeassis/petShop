"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"
import Dog from "../icons/dog.svg"
import Paw from "../icons/paw.svg"
import User from "../icons/user.svg"

import DateSelector from "../components/dateSelector"
import PeriodSection from "../components/periodSection"
import PhoneInput from "../components/phoneInput"
import HourSelector from "../components/hourSelector"
import { getPeriod, Period, periodRanges } from "../utils/periods";

import styles from "./styles.module.scss"

import { Appointment } from "../types"

export default function Petshop() {
    const today = new Date();
    const [formDate, setFormDate] = useState<Date>(today);
    const [date, setDate] = useState<Date>(today);
    const [hour, setHour] = useState("");
    const [isScheduling, setIsScheduling] = useState(false);
    const popoverRef = useRef<HTMLDivElement>(null);

    const [tutorName, setTutorName] = useState("");
    const [petName, setPetName] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);
    const [currentAppointments, setCurrentAppointments] = useState<Appointment[]>([]);

    const [morningAppointments, setMorningAppointments] = useState<Appointment[]>([])
    const [afternoonAppointments, setAfternoonAppointments] = useState<Appointment[]>([])
    const [eveningAppointments, setEveningAppointments] = useState<Appointment[]>([])

    const resetForm = () => {
        setTutorName("");
        setPetName("");
        setPhone("");
        setService("");
        setFormDate(today);
        setHour("");
    };

    const FormIsNotValid = () => {
        if (!hour) {
            alert("Por favor, selecione o horário");
            return true;
        }
        return false;
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (FormIsNotValid()) return

        const newAppointment: Appointment = {
            id: Date.now().toString(),
            tutorName,
            petName,
            phone,
            service,
            date: formDate,
            hour,
        };

        setAllAppointments([...allAppointments, newAppointment]);
        resetForm();
        setIsScheduling(false);
    };

    const handleDeleteAppointment = (id: string) => {
        if (confirm("Deseja realmente excluir este agendamento?")) {
            setAllAppointments(allAppointments.filter(
                appointment => appointment.id !== id
            ));
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node))
                setIsScheduling(false);
        }
        if (isScheduling) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isScheduling]);

    useEffect(() => {
        const filteredByDate = allAppointments.filter(appointment => {
            const appointmentDate = new Date(appointment.date);
            return (
                appointmentDate.getDate() === date.getDate() &&
                appointmentDate.getMonth() === date.getMonth() &&
                appointmentDate.getFullYear() === date.getFullYear()
            );
        });

        const periodMap: Record<Period, Appointment[]> = {
            morning: [],
            afternoon: [],
            evening: []
        };

        filteredByDate.forEach(appointment => {
            const hour = parseInt(appointment.hour.split(':')[0]);
            const period = getPeriod(hour);
            if (period) periodMap[period].push(appointment);
        });

        setCurrentAppointments(filteredByDate);
        setMorningAppointments(periodMap.morning);
        setAfternoonAppointments(periodMap.afternoon);
        setEveningAppointments(periodMap.evening);
    }, [allAppointments, date]);

    return (
        <div className={styles.body}>
            <header>
                <Image src={Dog} alt="Cachorro" className={styles.logo} />
                <h2>MUNDO PET</h2>
            </header>
            <main>
                <section>
                    <div className={styles.titleContainer}>
                        <h1>Sua agenda</h1>
                        <p>Aqui você pode ver todos os clientes e serviços agendados para hoje.</p>
                    </div>
                    <div className={styles.dateContainer}>
                        <DateSelector
                            value={date}
                            onChange={setDate}
                        />
                    </div>
                </section>
                <div className={styles.sectionsContainer}>
                    <PeriodSection
                        icon="FogSun"
                        periodName="Manhã"
                        hour="9h-12h"
                        appointments={morningAppointments}
                        onDelete={handleDeleteAppointment}
                    />
                    <PeriodSection
                        icon="CloudSun"
                        periodName="Tarde"
                        hour="13h-18h"
                        appointments={afternoonAppointments}
                        onDelete={handleDeleteAppointment}
                    />
                    <PeriodSection
                        icon="Moon"
                        periodName="Noite"
                        hour="19h-21h"
                        appointments={eveningAppointments}
                        onDelete={handleDeleteAppointment}
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
                            <form onSubmit={handleSubmit}>
                                <section>
                                    <label>Nome do tutor</label>
                                    <div className={styles.inputWrapper}>
                                        <Image
                                            className={styles.inputIcon}
                                            src={User} alt="Pessoa"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Helena Souza"
                                            value={tutorName}
                                            onChange={(event) => setTutorName(event.target.value)}
                                            required
                                        />
                                    </div>
                                </section>
                                <section>
                                    <label>Nome do pet</label>
                                    <div className={styles.inputWrapper}>
                                        <Image
                                            className={styles.inputIcon}
                                            src={Paw}
                                            alt="Paw icon"
                                        />
                                        <input
                                            type="text"
                                            placeholder="Cheddar"
                                            value={petName}
                                            onChange={(event) => setPetName(event.target.value)}
                                            required
                                        />
                                    </div>
                                </section>
                                <section>
                                    <label>Telefone</label>
                                    <PhoneInput
                                        phone={phone}
                                        onChange={setPhone}
                                    />
                                </section>
                                <section>
                                    <label>Descrição do serviço</label>
                                    <textarea
                                        placeholder="Banho e tosa"
                                        value={service}
                                        onChange={(event) => setService(event.target.value)}
                                        required
                                    ></textarea>
                                </section>
                                <div className={styles.formRow}>
                                    <section>
                                        <label>Data</label>
                                        <DateSelector
                                            value={formDate}
                                            onChange={setFormDate}
                                        />
                                    </section>
                                    <section>
                                        <label>Hora</label>
                                        <HourSelector
                                            hour={hour}
                                            onChange={setHour}
                                        />
                                    </section>
                                </div>
                                <button type="submit">AGENDAR</button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}
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
import { getPeriod, Period } from "../utils/periods";

import styles from "./styles.module.scss"

import { Appointment } from "../types"
import { format } from "date-fns";

import supabase from "@/src/supabase";

export default function Petshop() {
    const today = new Date();
    const [formDate, setFormDate] = useState<Date>(today);
    const [date, setDate] = useState<Date>(today);
    const [hour, setHour] = useState("");
    const [isScheduling, setIsScheduling] = useState(false);
    const [isReceivingData, setIsReceivingData] = useState(true);
    const popoverRef = useRef<HTMLDivElement>(null);

    const [tutor_name, setTutor_name] = useState("");
    const [pet_name, setPet_name] = useState("");
    const [phone, setPhone] = useState("");
    const [service, setService] = useState("");
    const [allAppointments, setAllAppointments] = useState<Appointment[]>([]);

    const [morningAppointments, setMorningAppointments] = useState<Appointment[]>([])
    const [afternoonAppointments, setAfternoonAppointments] = useState<Appointment[]>([])
    const [eveningAppointments, setEveningAppointments] = useState<Appointment[]>([])

    const resetForm = () => {
        setTutor_name("");
        setPet_name("");
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

    function normalizeDate(date: Date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (FormIsNotValid()) return

        const newAppointment: Appointment = {
            tutor_name,
            pet_name,
            phone,
            service,
            date: normalizeDate(formDate),
            hour,
        };

        const { data, error } = await supabase
            .from("appointments")
            .insert([newAppointment])
            .select();

        if (error) {
            console.error("Erro ao criar agendamento:", error);
            alert("Erro ao criar agendamento!");
            return;
        }

        if (data) {
            resetForm();
            setIsScheduling(false);
            setAllAppointments([...allAppointments, newAppointment])
            console.log("Successful insert!");
            console.log(allAppointments, newAppointment)
        }
    };

    const handleDeleteAppointment = async (id: string) => {
        const { error } = await supabase
            .from("appointments")
            .delete()
            .eq("id", id);

        if (error) {
            console.error("Erro ao deletar agendamento:", error);
            alert("Erro ao deletar agendamento!");
            return;
        }

        setAllAppointments(allAppointments.filter(
            appointment => appointment.id !== id
        ));
        console.log("Successful delete!")
    };

    useEffect(() => {
        async function fetchAppointmentsByDate() {
            setIsReceivingData(true)
            const formattedDate = format(date, "yyyy-MM-dd");
            const { data, error } = await supabase
                .from("appointments")
                .select("*")
                .eq("date", formattedDate);

            if (error) {
                console.error("Erro ao buscar appointments:", error);
                setIsReceivingData(false)
                return;
            }

            const periodMap: Record<Period, Appointment[]> = {
                morning: [],
                afternoon: [],
                evening: []
            };

            if (data) {
                data.forEach(appointment => {
                    const hourInt = parseInt(appointment.hour.split(":")[0]);
                    const period = getPeriod(hourInt);
                    if (period) periodMap[period].push(appointment);
                });
            }

            setMorningAppointments(periodMap.morning);
            setAfternoonAppointments(periodMap.afternoon);
            setEveningAppointments(periodMap.evening);

            setIsReceivingData(false);
        }

        fetchAppointmentsByDate();
    }, [allAppointments, date]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node))
                setIsScheduling(false);
        }
        if (isScheduling) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isScheduling]);

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
                        period="morning"
                        appointments={morningAppointments}
                        onDelete={handleDeleteAppointment}
                        isReceivingData={isReceivingData}
                    />
                    <PeriodSection
                        period="afternoon"
                        appointments={afternoonAppointments}
                        onDelete={handleDeleteAppointment}
                        isReceivingData={isReceivingData}
                    />
                    <PeriodSection
                        period="evening"
                        appointments={eveningAppointments}
                        onDelete={handleDeleteAppointment}
                        isReceivingData={isReceivingData}
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
                                            value={tutor_name}
                                            onChange={(event) => setTutor_name(event.target.value)}
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
                                            value={pet_name}
                                            onChange={(event) => setPet_name(event.target.value)}
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
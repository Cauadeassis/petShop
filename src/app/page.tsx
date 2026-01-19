"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image"
import AppName from "../icons/appName.svg"
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

function generateHours(start = 9, end = 21): string[] {
    const hours: string[] = [];
    for (let hour = start; hour <= end; hour++) {
        hours.push(`${String(hour).padStart(2, "0")}:00`);
    }

    return hours;
}

export default function Petshop() {
    const [date, setDate] = useState<string>("");
    const [time, setTime] = useState("")
    const [isScheduling, setIsScheduling] = useState(false)
    return (
        <div className="body">
            <header>
                <Image src={AppName} alt="Mundo Pet" width={153} height={48} />
            </header>
            <main>
                <section>
                    <div className="titleContainer">
                        <h1>Sua agenda</h1>
                        <p>Aqui você pode ver todos os clientes e serviços agendados para hoje.</p>
                    </div>
                    <div className="dateContainer">
                        <DateSelector />
                    </div>
                </section>
                <div className="sectionsContainer">
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
                    <div className="modal-content">
                        <h1>Agende um atendimento</h1>
                        <p>Preencha os dados do cliente para realizar o agendamento:</p>
                        <form>
                            <section>
                                <label>Nome do tutor</label>
                                <div>
                                    <Image src={User} alt="Pessoa" width={24} height={24} />
                                    <input type="text" placeholder="Helena Souza" />
                                </div>
                            </section>
                            <section>
                                <label>Nome do pet</label>
                                <div>
                                    <Image src={Paw} alt="Paw icon" width={24} height={24} />
                                    <input type="text" placeholder="Cheddar" />
                                </div>
                            </section>

                            <section>
                                <label>Telefone</label>
                                <div>
                                    <Image src={Phone} alt="Telefone" width={24} height={24} />
                                    <input type="tel" placeholder="(00) 0 0000-0000" />
                                </div>
                            </section>

                            <section>
                                <label>Descrição do serviço</label>
                                <textarea placeholder="Banho e tosa"></textarea>
                            </section>
                            <div className="form-row">
                                <section>
                                    <label>Data</label>
                                    <DateSelector value={date} onChange={setDate} />
                                </section>

                                <section>
                                    <label>Hora</label>
                                    <div>
                                        <Image src={Clock} alt="Relógio" width={24} height={24} />
                                        <select value={time} onChange={(event) => setTime(event.target.value)}>
                                            <option value="" disabled>
                                                Selecione um horário
                                            </option>
                                            {generateHours(9, 21).map((hour) => (
                                                <option key={hour} value={hour}>
                                                    {hour}
                                                </option>
                                            ))}
                                        </select>
                                        <Image src={Arrow} alt="Seta" width={24} height={24} />
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
                )
                }
            </main >
        </div >
    )
}
/*
onClick={() => setIsScheduling(false)} 
*/
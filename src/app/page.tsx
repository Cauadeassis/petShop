export default function Petshop() {
    return (
        <div className="body">
            <header>
                <div className="logoContainer">
                    <span className="logo-icon">🐾</span>
                    <span className="logo-text">MUNDO PET</span>
                </div>
            </header>
            <main>
                <section>
                    <div className="titleContainer">
                        <h1>Sua agenda</h1>
                        <p>Aqui você pode ver todos os clientes e serviços agendados para hoje.</p>
                    </div>
                    <div className="dateContainer">
                        <button>
                            <span className="calendar">📅</span>
                            <span>10/01/2024</span>
                            <span className="arrow">▼</span>
                        </button>
                    </div>
                </section>
                <div className="sectionsContainer">
                    <section>
                        <div>
                            <span className="iconContainer">☀️</span>
                            <h2>Manhã</h2>
                            <span className="timeContainer">09h-12h</span>
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
                    <section>
                        <div>
                            <span className="iconContainer">☀️</span>
                            <h2>Tarde</h2>
                            <span className="timeContainer">13h-18h</span>
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
                    <section>
                        <div>
                            <span className="iconContainer">☀️</span>
                            <h2>Noite</h2>
                            <span className="timeContainer">19h-21h</span>
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
                </div>

                <button className="new-appointment-button">NOVO AGENDAMENTO</button>
            </main>
        </div>
    )
}
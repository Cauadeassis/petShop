import styles from "./styles.module.css";
import Image from "next/image";
import Phone from "../../icons/phone.svg";

interface PhoneInputProps {
    phone: string;
    onChange: (value: string) => void;
}

export default function PhoneInput({ phone, onChange }: PhoneInputProps) {
    const formatPhone = (value: string) => {
        const numbers = value.replace(/\D/g, "");
        if (numbers.length <= 10) {
            return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
        }
        return numbers.replace(/(\d{2})(\d{1})(\d{4})(\d{0,4})/, "($1) $2 $3-$4");
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(event.target.value);
        onChange(formatted);
    };

    return (
        <div className={styles.inputWrapper}>
            <Image className={styles.inputIcon} src={Phone} alt="Telefone" width={20} height={20} />
            <input
                type="tel"
                placeholder="(00) 0 0000-0000"
                value={phone}
                onChange={handleChange}
                maxLength={16}
                required
            />
        </div>
    )
}
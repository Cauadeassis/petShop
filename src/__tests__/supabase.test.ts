import supabase from "@/src/supabase";
import { Appointment } from "../types";

describe("Supabase Connection", () => {
    const getTomorrowDate = (): Date => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return tomorrow
    }

    const createTestAppointment = (overrides = {}): Appointment => ({
        tutor_name: "Vanessa",
        pet_name: "Pitoco",
        phone: "32999999999",
        service: "Vacinação",
        date: getTomorrowDate(),
        hour: "10:00",
        ...overrides
    })

    const cleanupAppointment = async (id: string) => {
        await supabase
            .from("appointments")
            .delete()
            .eq("id", id)
    }

    test("Should connect to Supabase", async () => {
        const { data, error } = await supabase
            .from("appointments")
            .select("*")
            .limit(1)

        expect(error).toBeNull()
        expect(data).toBeDefined()
    })

    test("Should insert an appointment", async () => {
        const newAppointment = createTestAppointment() satisfies Appointment;

        const { data, error } = await supabase
            .from("appointments")
            .insert([newAppointment])
            .select()

        expect(error).toBeNull()
        expect(data).toHaveLength(1)
        expect(data?.[0].tutor_name).toBe("Vanessa")

        if (data?.[0]?.id) {
            await cleanupAppointment(data[0].id)
        }
    })

    test("Should delete an appointment", async () => {
        const { data: created } = await supabase
            .from("appointments")
            .insert([createTestAppointment()])
            .select()

        const id = created?.[0]?.id
        expect(id).toBeDefined()
        const { error } = await supabase
            .from("appointments")
            .delete()
            .eq("id", id!)

        expect(error).toBeNull()
    })
    test("Should update an appointment", async () => {
        const { data: created, error: createError } = await supabase
            .from("appointments")
            .insert(createTestAppointment())
            .select()

        expect(createError).toBeNull()
        expect(created).toHaveLength(1)

        const id = created?.[0]?.id
        expect(id).toBeDefined()

        const { data: updated, error: updateError } = await supabase
            .from("appointments")
            .update({
                tutor_name: "Cauã",
                pet_name: "Niki",
                service: "Banho"
            })
            .eq("id", id!)
            .select()

        expect(updateError).toBeNull()
        if (id) {
            await supabase.from("appointments").delete().eq("id", id)
        }
    })
})
import { addMinutes, set } from "date-fns";
import { prisma } from "../../utils/prisma"


const createSchedules = async (payload: any) => {
    const { startTime, endTime, startDate, endDate } = payload;

    const interval = 30;
    const schedules = [];

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    let current = new Date(startDate);
    const last = new Date(endDate);

    while (current <= last) {
        // Create start and end datetime for this day
        let startDateTime = set(current, { hours: startHour, minutes: startMinute, seconds: 0 });
        const endDateTime = set(current, { hours: endHour, minutes: endMinute, seconds: 0 });

        // Generate slots
        while (startDateTime < endDateTime) {
            const slotStart = new Date(startDateTime);
            const slotEnd = addMinutes(startDateTime, interval);

            const scheduleData = {
                startTime: slotStart,
                endTime: slotEnd,
            };

            const exists = await prisma.schedule.findFirst({
                where: scheduleData,
            });

            if (!exists) {
                const created = await prisma.schedule.create({ data: scheduleData });
                schedules.push(created);
            }

            startDateTime = slotEnd; // Move forward
        }

        current.setDate(current.getDate() + 1);
    }
    // console.log(schedules)

    return schedules;
};


export const scheduleServices = {
    createSchedules
}
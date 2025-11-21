import { addMinutes, set } from "date-fns";
import { prisma } from "../../utils/prisma"
import type { JwtPayload } from "jsonwebtoken";
import { paginate, type IPaginateOp } from "../../utils/paginate";


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

const getAvailableSchedulesForDoctor = async (payload: JwtPayload, queryParams: IPaginateOp) => {

    // const {} = paginate()
    const { limit, page, skip, sortBy, sortOrder } = queryParams
    console.log(queryParams)

    const doctor = await prisma.doctor.findUniqueOrThrow({
        where: { email: payload.email }
    });

    // already assigned
    const assignedScheduleIds = await prisma.doctorSchedules.findMany({
        where: { doctorId: doctor.id },
        select: { scheduleId: true }

    });
    // console.log(assignedScheduleIds)

    const takenIds = assignedScheduleIds.map(item => item.scheduleId); // ["id1", "id2", ....]

    // available
    const availableSchedules = await prisma.schedule.findMany({
        where: {
            id: { notIn: takenIds }
        },
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder
        }
    });

    return availableSchedules;
};

const deleteSchedule = async (id: string) => {
    const result = await prisma.schedule.delete({
        where: { id }
    })
    return result
}



export const scheduleServices = {
    createSchedules,
    getAvailableSchedulesForDoctor,
    deleteSchedule
}
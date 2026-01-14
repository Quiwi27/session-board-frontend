import { z } from "zod";

export const CreateSessionSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters long"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
    maxPlayers: z.preprocess(
        (a) => parseInt(z.string().parse(a), 10),
        z.number().min(2, "Must be at least 2 players").max(100, "Cannot exceed 100 players")
    ),
});

export type CreateSessionValues = z.infer<typeof CreateSessionSchema>;

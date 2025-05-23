import { z , defineCollection } from "astro:content";
import { date } from "astro:schema";

const blogCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.date(),
    }),
});

export const collection = {
    blog: blogCollection,
};


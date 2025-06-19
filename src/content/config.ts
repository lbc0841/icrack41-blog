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

const cppNoteCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(),
        chapter: z.number(),
    }),
});

export const collections = {
    blog: blogCollection,
    cpp_note: cppNoteCollection,
};


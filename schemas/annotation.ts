import { z } from "zod";

const createVideoSchema = z.object({
  videoLink: z.string().min(1, "Video link is required"),
  videoTitle: z.string().min(1, "Video title is required"),
});
const createAnnotationSchema = z.object({
  time: z.number({
    required_error: "Time is required",
    invalid_type_error: "Time must be a number",
  }),
  text: z.string().min(1, "Annotation text cannot be empty"),
});
const updateAnnotationSchema = z.object({
  text: z.string().min(1, "Annotation text cannot be empty"),
});

type UpdateAnnotationInput = z.infer<typeof updateAnnotationSchema>;
type createVideoSchemaInput = z.infer<typeof createVideoSchema>;
type createAnnotationSchemaInput = z.infer<typeof createAnnotationSchema>;

export { updateAnnotationSchema, createVideoSchema, createAnnotationSchema };
export type {
  UpdateAnnotationInput,
  createVideoSchemaInput,
  createAnnotationSchemaInput,
};

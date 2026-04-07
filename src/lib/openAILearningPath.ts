import type { OpenAIEnrollment } from "../data/mockData";

/** First index in path order where the course is not complete. */
export function getFirstIncompleteIndex(enrollments: OpenAIEnrollment[]): number {
  return enrollments.findIndex((e) => e.status !== "Complete");
}

export function getFirstIncompleteCourse(enrollments: OpenAIEnrollment[]): OpenAIEnrollment | undefined {
  const i = getFirstIncompleteIndex(enrollments);
  return i >= 0 ? enrollments[i] : undefined;
}

export function isFirstIncompleteCourse(enrollment: OpenAIEnrollment, enrollments: OpenAIEnrollment[]): boolean {
  const first = getFirstIncompleteCourse(enrollments);
  return first !== undefined && first.id === enrollment.id;
}

/** XDP: Not started and not the first incomplete course in the path. */
export function isNotStartedCourseLocked(enrollment: OpenAIEnrollment, enrollments: OpenAIEnrollment[]): boolean {
  return enrollment.status === "Not started" && !isFirstIncompleteCourse(enrollment, enrollments);
}

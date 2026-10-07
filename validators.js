export const CONTENT_MIN_LENGTH = 20;

/**
 * Validates a post form's fields.
 * @param {{title: string, author: string, content: string}} fields
 * @returns {{title?: string, author?: string, content?: string}} errors keyed by field name
 */
export function validatePostFields({ title, author, content }) {
  const errors = {};

  if (!title || !title.trim()) {
    errors.title = "Title is required.";
  } else if (title.trim().length > 120) {
    errors.title = "Title must be 120 characters or fewer.";
  }

  if (!author || !author.trim()) {
    errors.author = "Author is required.";
  } else if (author.trim().length > 60) {
    errors.author = "Author must be 60 characters or fewer.";
  }

  if (!content || !content.trim()) {
    errors.content = "Content is required.";
  } else if (content.trim().length < CONTENT_MIN_LENGTH) {
    errors.content = `Content must be at least ${CONTENT_MIN_LENGTH} characters.`;
  }

  return errors;
}

/** Turns a comma-separated tag string into a clean array of tags. */
export function parseTags(tagString) {
  if (!tagString) return [];
  return tagString
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Turns a tag array back into a comma-separated string for editing. */
export function tagsToString(tags) {
  return Array.isArray(tags) ? tags.join(", ") : "";
}
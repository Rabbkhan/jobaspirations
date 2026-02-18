// src/shared/lib/fileValidator.js

/**
 * Validate uploaded file
 * @param {File} file - file object from input
 * @param {Object} options - validation options
 * @param {number} options.maxSize - maximum size in bytes
 * @param {string[]} options.allowedTypes - allowed MIME types
 * @returns {{ valid: boolean, message: string }}
 */
export function validateFile(file, { maxSize = 2 * 1024 * 1024, allowedTypes = ['image/jpeg', 'image/png', 'image/webp'] } = {}) {
    if (!file) return { valid: false, message: 'No file selected' }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, message: 'Only JPG, PNG, and WEBP images are allowed' }
    }

    if (file.size > maxSize) {
        return { valid: false, message: `File must be under ${maxSize / (1024 * 1024)}MB` }
    }

    return { valid: true, message: 'File is valid' }
}

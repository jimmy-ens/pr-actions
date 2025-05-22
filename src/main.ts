import * as core from '@actions/core'
import { createComment } from './create-comment.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const commentId = await createComment()

    // Set outputs for other workflow steps to use
    core.setOutput('comment-id', commentId)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

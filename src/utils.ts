import * as core from '@actions/core'
import { existsSync, readFileSync } from 'fs'

export type Inputs = {
  token: string
  repository: string
  issueNumber: number
  // commentId: number
  body: string
  bodyPath: string
  // editMode: string
  // appendSeparator: string
  // reactionsEditMode: string
}

export function getInputs(): Inputs {
  return {
    token: core.getInput('token'),
    repository: core.getInput('repository'),
    issueNumber: Number(core.getInput('issue-number')),
    // commentId: Number(core.getInput('comment-id')),
    body: core.getInput('body'),
    bodyPath: core.getInput('body-path')
    // editMode: core.getInput('edit-mode'),
    // appendSeparator: core.getInput('append-separator'),
    // reactionsEditMode: core.getInput('reactions-edit-mode'),
  }
}

export function getBody(inputs: Inputs) {
  let body: string = inputs.body

  if (!body && inputs.bodyPath) {
    if (existsSync(inputs.bodyPath)) {
      body = readFileSync(inputs.bodyPath, 'utf-8')
    } else {
      core.warning(`File not found: ${inputs.bodyPath}`)
    }
  }

  return body
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message
  return String(error)
}

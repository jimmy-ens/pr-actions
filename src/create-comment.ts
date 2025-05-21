import * as core from '@actions/core'
import * as github from '@actions/github'
import { inspect } from 'util'
import * as utils from './utils.js'

export async function createComment(): Promise<number> {
  const inputs = utils.getInputs()
  core.debug(`Inputs: ${inspect(inputs)}`)

  const [owner, repo] = inputs.repository.split('/')
  const body = utils.getBody(inputs)
  const octokit = github.getOctokit(inputs.token)

  const { data: comment } = await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: inputs.issueNumber,
    body
  })
  core.info(
    `Created comment id '${comment.id}' on issue '${inputs.issueNumber}'.`
  )
  return comment.id
}

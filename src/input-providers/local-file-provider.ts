import * as fs from 'fs'
import glob from 'fast-glob'
import {FileContent, InputProvider, ReportInput} from './input-provider'
import {listFiles as localListFiles, isInsideWorkTree} from '../utils/git'
import {listFiles as apiListFiles} from '../utils/github-utils'
import {GitHub} from '@actions/github/lib/utils'

export class LocalFileProvider implements InputProvider {
  constructor(
    readonly name: string,
    readonly pattern: string[],
    readonly octokit: InstanceType<typeof GitHub>,
    readonly sha: string
  ) {}

  async load(): Promise<ReportInput> {
    const result: FileContent[] = []
    for (const pat of this.pattern) {
      const paths = await glob(pat, {dot: true})
      for (const file of paths) {
        const content = await fs.promises.readFile(file, {encoding: 'utf8'})
        result.push({file, content})
      }
    }

    return {[this.name]: result}
  }

  async listTrackedFiles(): Promise<string[]> {
    return (await isInsideWorkTree()) ? await localListFiles() : await apiListFiles(this.octokit, this.sha)
  }
}

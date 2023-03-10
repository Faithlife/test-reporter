import * as fs from 'fs'
import * as path from 'path'

import {getReport, ReportOptions} from '../src/report/get-report'
import {TestCaseResult, TestExecutionResult, TestGroupResult, TestRunResult, TestSuiteResult} from '../src/test-results'

describe('get-report tests', () => {
  it('listTests failed', async () => {
    const outputPath = path.join(__dirname, '__outputs__', 'listTests-failed.md')

    const opts: ReportOptions = {
      listTests: 'failed',
      listSuites: 'all',
      baseUrl: '',
      onlySummary: false
    }

    const result = new TestRunResult(
      'path',
      [
        new TestSuiteResult(
          'path.suite-1',
          [
            new TestGroupResult('group-1', [
              new TestCaseResult('test-case-1', 'failed', 1100, {message: 'error-message', details: 'error-details'}),
              new TestCaseResult('test-case-2', 'success', 1200)
            ]),
            new TestGroupResult('group-2', [new TestCaseResult('test-case-1', 'success', 2100)])
          ],
          4400
        ),
        new TestSuiteResult(
          'path.suite-2',
          [new TestGroupResult('group-1', [new TestCaseResult('test-case-1', 'success', 1100)])],
          1100
        )
      ],
      5500
    )

    const report = getReport([result], opts)
    expect(report).toMatchSnapshot()

    fs.mkdirSync(path.dirname(outputPath), {recursive: true})
    fs.writeFileSync(outputPath, report)
  })
})

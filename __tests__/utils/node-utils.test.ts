import {getExceptionSource} from '../../src/utils/node-utils'

describe('getExceptionSource', () => {
  it('Can parse dotnet', () => {
    const result = getExceptionSource(
      '   at DotnetTests.XUnitTests.CalculatorTests.Is_Even_Number(Int32 i) in C:\\Users\\Michal\\Workspace\\dorny\\test-reporter\\reports\\dotnet\\DotnetTests.NUnitV3Tests\\CalculatorTests.cs:line 61\n',
      ['reports/dotnet/DotnetTests.NUnitV3Tests/CalculatorTests.cs'])
    expect(result).toBeDefined()
    expect(result!.path).toBe('reports/dotnet/DotnetTests.NUnitV3Tests/CalculatorTests.cs');
    expect(result!.line).toBe(61)
  })

  it('Can parse mocha', () => {
      const result = getExceptionSource(
        '\n\n    at Context.<anonymous> (test\\main.test.js:11:14)\n    at processImmediate (internal/timers.js:461:21)',
        ['test/main.test.js']
      )
      expect(result).toBeDefined()
      expect(result!.path).toBe('test/main.test.js')
      expect(result!.line).toBe(11)
  })

  it('Returns longest match', () => {
    const result = getExceptionSource(
      '   at DotnetTests.XUnitTests.CalculatorTests.Is_Even_Number(Int32 i) in C:\\Users\\Michal\\Workspace\\dorny\\test-reporter\\reports\\dotnet\\DotnetTests.NUnitV3Tests\\CalculatorTests.cs:line 61\n',
      [
        'reports/dotnet/DotnetTests.NUnitV3Tests/CalculatorTests.cs',
        'dotnet/DotnetTests.NUnitV3Tests/CalculatorTests.cs'
      ]
    )
    expect(result).toBeDefined()
    expect(result!.path).toBe('reports/dotnet/DotnetTests.NUnitV3Tests/CalculatorTests.cs')
    expect(result!.line).toBe(61)
  })
  
  it('Skips internal/', () => {
    const result = getExceptionSource(
      '\n    at listOnTimeout (internal/timers.js:554:17)\n    at processTimers (internal/timers.js:497:7)',
      ['internal/timers.js']
    )
    expect(result).toBeUndefined()
  })

  it('Returns no match', () => {
    const result = getExceptionSource(
      '   at DotnetTests.XUnitTests.CalculatorTests.Is_Even_Number(Int32 i) in C:\\Users\\Michal\\Workspace\\dorny\\test-reporter\\reports\\dotnet\\DotnetTests.NUnitV3Tests\\CalculatorTests.cs:line 61\n',
      []
    )
    expect(result).toBeUndefined()
  })
})

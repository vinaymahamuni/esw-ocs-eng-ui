// import type { Reporter, TestSession, TestSuiteResult } from '@web/test-runner'

const colour = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  dim: '\x1b[2m',
  yellow: '\x1b[33m'
}

function outputSuite(suite, indent = '') {
  let results = `${indent}${suite.name}\n`
  results +=
    suite.tests
      .map((test) => {
        let result = indent
        if (test.skipped) {
          result += `${colour.cyan} - ${test.name}`
        } else if (test.passed) {
          result += `${colour.green} ✓ ${colour.reset}${colour.dim}${test.name}`
        } else {
          result += `${colour.red} ${test.name}`
        }
        const duration = test.duration || 0
        result +=
          duration > 100
            ? ` ${colour.reset}${colour.red}(${test.duration}ms)`
            : duration > 50
            ? ` ${colour.reset}${colour.yellow}(${test.duration}ms)`
            : ``

        result += `${colour.reset}`
        return result
      })
      .join('\n') + '\n'
  if (suite.suites)
    results += suite.suites
      .map((suite) => outputSuite(suite, indent + '  '))
      .join('\n')
  return results
}

function generateTestReport(sessionsForTestFile) {
  let results = ''
  sessionsForTestFile.forEach((session) => {
    results += session.testResults?.suites
      .map((suite) => outputSuite(suite, ''))
      .join('\n\n')
  })
  return results
}

const SpecReporter = ({ reportResults = true } = {}) => {
  return {
    reportTestFileResults({ logger, sessionsForTestFile }) {
      if (!reportResults) {
        return
      }

      const testReport = generateTestReport(sessionsForTestFile)
      logger.group()
      logger.log(testReport)
      logger.groupEnd()
    }
  }
}

export default SpecReporter

import plugin from '@snowpack/web-test-runner-plugin'
import { defaultReporter } from '@web/test-runner'
// eslint-disable-next-line import/no-unresolved
import { TestReporter } from './dist/test/utils/TestReporter.js'
// NODE_ENV=test - Needed by "@snowpack/web-test-runner-plugin"
process.env.NODE_ENV = 'test'

export default {
  plugins: [plugin()],
  reporters: [
    defaultReporter({ reportTestResults: false, reportTestProgress: true }),
    TestReporter()
  ]
}

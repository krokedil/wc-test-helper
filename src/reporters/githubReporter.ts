import { Reporter, FullResult } from '@playwright/test/reporter';
import * as core from '@actions/core';

class GithubReporter implements Reporter {
    async onEnd(result: FullResult) {
        // Print annotation to github actions with the versions used in the test.
        core.notice(process.env.WP_VERSION ?? "Unknown", { title: 'WordPress Version' });
        core.notice(process.env.WC_VERSION ?? "Unknown", { title: 'WooCommerce Version' });
        core.notice(process.env.PHP_VERSION ?? "Unknown", { title: 'PHP Version' });
    }
}

export default GithubReporter;

import { exec, ExecOptions, ChildProcess } from 'child_process'

function waitFor(cb: () => boolean, timeout = 1000) {
    const start = Date.now()

    return new Promise<void>((resolve, reject) => {
        function check() {
            if (cb()) {
                return resolve()
            }

            if (Date.now() - start > timeout) {
                return reject(new Error('Timeout'))
            }

            setTimeout(check, 500)
        }

        check()
    })
}

export class Command {
    public readonly command: ReturnType<typeof exec>
    public done = false
    public on: ChildProcess['on']
    public timeout = 1000 * 60

    constructor(value: string, options?: ExecOptions, timeout?: number) {
        this.command = exec(value, options)
        this.timeout = timeout ?? this.timeout

        this.command.on('close', () => {
            this.done = true
        })
    }

    public onStdout(cb: (data: string) => void) {
        this.command.stdout?.on('data', cb)

        return this
    }

    public onStderr(cb: (data: string) => void) {
        this.command.stderr?.on('data', cb)

        return this
    }

    public onEnd() {
        return waitFor(() => this.done, this.timeout)
    }
}

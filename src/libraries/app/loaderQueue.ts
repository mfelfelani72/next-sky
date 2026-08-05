/**
 * @Author: Mohammad Felfelani
 * @Email: mfelfelani72@gmail.com
 * @Team:
 * @Date: 2025-10-07 06:31:56
 * @Description:
 */

type Task = () => Promise<any>;

class LoaderQueue {
  private queue: Task[] = [];
  private running = false;

  add(task: Task, priority = false) {
    if (priority) this.queue.unshift(task);
    else this.queue.push(task);

    this.run();
  }

  private async run() {
    if (this.running || !this.queue.length) return;

    this.running = true;
    const task = this.queue.shift();
    if (task) await task();

    this.running = false;
    this.run();
  }
}

export const loaderQueue = new LoaderQueue();
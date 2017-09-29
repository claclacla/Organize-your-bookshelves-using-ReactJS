class Queue {
  constructor() {
    this.isWorking = false;
    this.processes = [];
  }

  push(process) {
    if (this.isWorking) {
      return this.processes.push(process);
    }

    var worker = (process) => {
      this.isWorking = true;

      process().then((res) => {
        if (this.processes.length === 0) {
          this.isWorking = false;
          return;
        }

        var nextProcess = this.processes.shift();
        worker(nextProcess);
      });
    };

    worker(process);
  }
}

export default Queue
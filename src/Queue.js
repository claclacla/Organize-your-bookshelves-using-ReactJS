class Queue {
  constructor() {
    this.working = false;
    this.tasks = [];
  }

  push(task) {
    if (this.working) {
      return this.tasks.push(task);
    }

    var exec = (task) => {
      this.working = true;

      task().then((res) => {
        if (this.tasks.length === 0) {
          this.working = false;
          return;
        }

        var nextTask = this.tasks.shift();
        exec(nextTask);
      });
    };

    exec(task);
  }
}

export default Queue
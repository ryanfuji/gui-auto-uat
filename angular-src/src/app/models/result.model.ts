export class ResultModel {
  _id: string;
  projectId: string;
  projectTitle: string;
  start: Date;
  end: Date;
  duration: Number;
  scenarios: Array<Scenario>;
}

class Scenario {
  title: string;
  tests: Array<Test>;
}

class Test {
  title: string;
  state: string;
  err: {
    message: string;
    stack: string;
  }
}

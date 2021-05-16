const sonarqubeScanner = require("sonarqube-scanner");

sonarqubeScanner(
  {
    serverUrl: "http://localhost:9000/",
    options: {
      "sonar.projectDescription": "This is a Node JS application",
      "sonar.projectName": "Node JS Application - Sample",
      "sonar.projectKey": "xxxx",
      "sonar.login": "admin",
      "sonar.password": "admin",
      "sonar.projectVersion": "1.0",
      "sonar.language": "js",
      "sonar.sourceEncoding": "UTF-8",
      "sonar.sources": ".",
      //'sonar.tests': 'specs',
      //'sonar.inclusions' : 'src/**'
    },
  },
  () => {}
);

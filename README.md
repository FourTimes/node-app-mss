# nodejs-app-mss

node installtion
```sh
    # Using Ubuntu
    curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
    sudo apt-get install -y nodejs
```

Clone the projects

```sh
    git clone https://github.com/FourTimes/node-app-mss.git
    cd nodejs-app-mss
```
Install the packages

```sh
    npm install
```

Start the node application

```sh
    node app.js || npm start
```

test case test

```sh
    npm test
```

To Execute the SonarQube Repor, execute the below command.

Dependencies - vim docker-compose.yml

```docker-compose

    version: '2'
    services:
    postgres:
        image: postgres:9.6
        networks:
        - jenkins
        environment:
        POSTGRES_USER: admin
        POSTGRES_PASSWORD: admin
        volumes:
        - /var/postgres-data:/var/lib/postgresql/data
    sonarqube:
        image: sonarqube
        ports:
        - "9000:9000"
        - "9092:9092"
        networks:
        - jenkins
        environment:
        SONARQUBE_JDBC_USERNAME: admin
        SONARQUBE_JDBC_PASSWORD: admin
        SONARQUBE_JDBC_URL: "jdbc:postgresql://postgres:5432/sonar"
        depends_on: 
        - postgres

    networks:
    jenkins:

```
    docker-compose up -d

create the project using the credentials in sonarqube

```sh
    open the browser
    localhost:9000
    username: admin
    password: admin
```

    Please modify the parameters in sonar-project.js file

```sh
    npm run sonar || node sonar-project.js
```


Generate the Nexus token by using base64 encoding as follows.

```sh
    echo -n 'admin:passw0rd' | openssl base64
```
    
Create a .npmrc file in your project root directory and add below lines.

```sh
    registry=<<NexusRepoURL>>
    _auth=<<Token>>
    email=<<EmailID>>
    always-auth=true
```

In package.json add below entry,

```json
"publishConfig": {
    "registry": "http://Ipaddress:9981/FourTmes/node-app-mss/"
}
```

Execute below command to upload packages to nexus repo.

```sh
    npm publish
```

Jenkins CICD 
---------

Install the jenkins server using this dockerfile

    vim Dockerfile-jenkins-docker-sonar

```yml
    FROM jenkins/jenkins
    USER root
    RUN apt update && apt install unzip  wget curl -y -qq
    RUN curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
    RUN chmod +x kubectl && mv kubectl /usr/local/bin
    RUN curl -o aws-iam-authenticator https://amazon-eks.s3.us-west-2.amazonaws.com/1.19.6/2021-01-05/bin/linux/amd64/aws-iam-authenticator
    RUN chmod +x aws-iam-authenticator && mv aws-iam-authenticator /usr/local/bin
    RUN mkdir -p /tmp/download 
    RUN curl -L https://download.docker.com/linux/static/stable/x86_64/docker-19.03.9.tgz | tar -xz -C /tmp/download 
    RUN rm -rf /tmp/download/docker/dockerd 
    RUN mv /tmp/download/docker/docker* /usr/local/bin/ && rm -rf /tmp/download && groupadd -g 999 docker && usermod -aG docker jenkins
    RUN wget https://binaries.sonarsource.com/Distribution/sonar-scanner-cli/sonar-scanner-cli-4.2.0.1873-linux.zip
    RUN unzip sonar-scanner-cli-4.2.0.1873-linux.zip && rm -rf sonar-scanner-cli-4.2.0.1873-linux.zip
    RUN mv sonar-scanner-4.2.0.1873-linux /opt/sonar-scanner
    ENV PATH=$PATH:/opt/sonar-scanner/bin
    USER jenkins
```
dependencies

    1. docker service needed

command

```sh
    docker build -t jenkins-docker-sonar -f jenkins-docker-sonar-dockerfile .
    sudo mkdir -p /var/jenkins_home
    sudo chown -R 1000:1000 /var/jenkins_home
    docker run -d -p 8080:8080 -p 50000:50000 -v /var/jenkins_home:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock --name jds jenkins-docker-sonar
    docker logs jds #=> find the one-time-password
```
---------

start the sonarqube service

```sh
    docker-compose up -d
```


create the jenkins project
-----------
   
    #=> open the browser => jenkins-server-ip:8080
    #=> go to project => pipeline   
-----------


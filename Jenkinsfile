pipeline {
    agent any
    environment {
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
        SONAR_PROJECT_LOGIN = credentials('SONAR_PROJECT_LOGIN')
        IMAGE_NAME = "node-api:${BUILD_ID}"
        SONAR_PROJECT_NAME= "node-api"  
        SONAR_URL= "https://sonar.fourtimes.ml"
    }
    stages {
        stage('SONAR CODE QUALITY') {
        steps {
            sh '''
                sonar-scanner \
                    -Dsonar.projectKey=${SONAR_PROJECT_NAME} \
                    -Dsonar.sources=. \
                    -Dsonar.host.url=${SONAR_URL} \
                    -Dsonar.login=${SONAR_PROJECT_LOGIN}
                '''
            }
        }
        stage('docker image build') {
        steps {
            sh'''
                docker build -t ${IMAGE_NAME} .
            '''
            }
        }
        stage('docker image push') {
        steps {
            sh'''
                echo ${DOCKER_PASSWORD} | docker login -u ${DOCKER_USERNAME} --password-stdin 
                docker push $REPO:$IMAGE_NAME
                docker logout
                docker rmi $IMAGE_NAME
            '''
            }
        }
    }
}
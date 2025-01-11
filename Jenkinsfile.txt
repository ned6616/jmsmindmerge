pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'SonarScanner' // SonarScanner tool name in Jenkins
        SONARQUBE_ENV = 'SonarQube'       // SonarQube environment name in Jenkins
        DEPLOY_DIR = '/var/www/html/jms' // Nginx deployment directory
    }

    stages {
        stage('Checkout Source Code') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build React Application') {
            steps {
                sh 'npm run build'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(SONARQUBE_ENV) {
                    sh "${SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=jmsmindmerge \
                        -Dsonar.projectName='JMS Mindmerge' \
                        -Dsonar.projectVersion=1.0 \
                        -Dsonar.sources=src \
                        -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
                }
            }
        }
        stage('Wait for Quality Gate') {
            steps {
                script {
                    timeout(time: 1, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
        stage('Deploy to Nginx') {
            steps {
                sh "sudo rm -rf ${DEPLOY_DIR}/*"
                sh "sudo cp -r dist/* ${DEPLOY_DIR}/"
                sh 'sudo systemctl restart nginx'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

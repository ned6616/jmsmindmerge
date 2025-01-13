pipeline {
    agent any

    environment {
        SCANNER_HOME = tool 'sonarscanner' // SonarScanner tool name in Jenkins
        SONARQUBE_ENV = 'SonarQube'       // SonarQube environment name in Jenkins
        DEPLOY_DIR = '/var/www/html/jms' // Nginx deployment directory
        NEXUS_URL = 'http://91.121.36.194:8081/repository/jmsmindmerge/' // Nexus hosted repository URL
        NEXUS_USER = 'admin'             // Nexus username
        NEXUS_PASS = 'Pass#123'          // Nexus password
        ARTIFACT_NAME = 'jmsmindmerge-${BUILD_NUMBER}.zip' // Artifact name with version
    }

    stages {
        stage('Clean Workspace') {
            steps {
                echo 'Cleaning the workspace...'
                deleteDir() // Delete all files in the workspace
            }
        }
        stage('Checkout Source Code') {
            steps {
                echo 'Checking out source code...'
                checkout scm
                sh "git log -1" // Show the latest commit for debugging
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        stage('Build React Application') {
            steps {
                echo 'Building the React application...'
                sh 'npm run build'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                echo 'Running SonarQube analysis...'
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
                    echo 'Waiting for SonarQube quality gate...'
                    timeout(time: 1, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            error "Pipeline aborted due to quality gate failure: ${qg.status}"
                        }
                    }
                }
            }
        }
        stage('Package Artifact') {
            steps {
                echo 'Packaging artifact...'
                sh "zip -r ${ARTIFACT_NAME} dist"
            }
        }
        stage('Upload to Nexus') {
            steps {
                echo 'Uploading artifact to Nexus...'
                sh """
                curl -u ${NEXUS_USER}:${NEXUS_PASS} --upload-file ${ARTIFACT_NAME} \
                    ${NEXUS_URL}${ARTIFACT_NAME}
                """
            }
        }
        stage('Deploy to Nginx') {
            steps {
                echo 'Deploying to Nginx...'
                sh "sudo rm -rf ${DEPLOY_DIR}/*"
                sh "sudo cp -r ${env.WORKSPACE}/dist/* ${DEPLOY_DIR}/"
                sh 'sudo systemctl restart nginx'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed!'
        }
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}

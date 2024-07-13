def deployOnK8s(deploymentName, exportMap) {
    echo "Preparing export string..."
    def exportString="";
    exportMap.each { k, v ->
        withCredentials([
                sshUserPrivateKey(credentialsId: "MT_USER", keyFileVariable: 'keyfile'),
                file(credentialsId: 'kubernetes-config-'+environment, variable: 'kubeconfig')
        ]) {
            exportString = exportString + "export ${k}=${v}; "
        }
        echo exportString;
    }
    echo "Deploying config in kubernetes environment..."

    operationsDir = deploymentName

    withCredentials([
            sshUserPrivateKey(credentialsId: "MT_USER", keyFileVariable: 'keyfile'),
            file(credentialsId: 'kubernetes-config-'+environment, variable: 'kubeconfig')
    ]) {
        sh 'pwd'
        writeFile file: 'kubeconfig-'+environment+'-temp.yaml', text: readFile(kubeconfig)
        sh '''
            ssh -i ${keyfile} -o StrictHostKeyChecking=no nonprodjenkin-ssh@portal-nonprod-jenkins.mytcloud.mu -p 22 mkdir -p "/home/nonprodjenkin-ssh/''' + operationsDir + '''"
            scp -i ${keyfile} -P 22 -o StrictHostKeyChecking=no kubeconfig-$environment-temp.yaml nonprodjenkin-ssh@portal-nonprod-jenkins.mytcloud.mu:/home/nonprodjenkin-ssh/''' + operationsDir +'''/
            scp -i ${keyfile} -P 22 -o StrictHostKeyChecking=no deployment.yaml nonprodjenkin-ssh@portal-nonprod-jenkins.mytcloud.mu:/home/nonprodjenkin-ssh/''' + operationsDir + '''/
            ssh -i ${keyfile} -o StrictHostKeyChecking=no nonprodjenkin-ssh@portal-nonprod-jenkins.mytcloud.mu -p 22 'export KUBECONFIG=/home/nonprodjenkin-ssh/''' + operationsDir + '''/kubeconfig-'$environment'-temp.yaml; ''' + exportString + ''' cat /home/nonprodjenkin-ssh/''' + operationsDir + '''/deployment.yaml |  envsubst | kubectl apply -n '$environment' -f - '
            ssh -i ${keyfile} -o StrictHostKeyChecking=no nonprodjenkin-ssh@portal-nonprod-jenkins.mytcloud.mu -p 22 'export KUBECONFIG=/home/nonprodjenkin-ssh/''' + operationsDir + '''/kubeconfig-'$environment'-temp.yaml; kubectl rollout status deployment ''' + deploymentName + ''' -n '$environment''
            ssh -i ${keyfile} -o StrictHostKeyChecking=no nonprodjenkin-ssh@portal-nonprod-jenkins.mytcloud.mu -p 22 rm -r /home/nonprodjenkin-ssh/''' + operationsDir
    }

}

return this

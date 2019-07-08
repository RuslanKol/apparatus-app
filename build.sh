#!/bin/bash
if [[ $1 == "prod" ]];
	then
cat >.env <<EOL
NODE_PATH=./src
REACT_APP_API_URL='https://api.apparatusapp.com'
REACT_APP_ENV='production'
REACT_APP_APPARATUS_SOCKET='https://sockets.apparatusapp.com'

EOL
echo "Production environment created"

elif [[ $1 == "stage" ]];
	then
cat >.env <<EOL
NODE_PATH=./src
REACT_APP_API_URL='http://api.apparatus.stage.monospacelabs.com'
REACT_APP_ENV='stage'
REACT_APP_APPARATUS_SOCKET='http://sockets.apparatus.stage.monospacelabs.com'

EOL
echo "Stage environment created"

elif [[ $1 == "dev_c9" ]];
	then
cat >.env <<EOL
NODE_PATH=./src
REACT_APP_API_URL='http://api.apparatus.dev.monospacelabs.com'
REACT_APP_ENV='development'
REACT_APP_APPARATUS_SOCKET='http://sockets.apparatus.dev.monospacelabs.com'

EOL
echo "Developers environment created"


else 
echo "Provide a parameter to create the environment. You can use 'prod', 'stage', or a dev's name like 'duke' or 'foogee'"
fi

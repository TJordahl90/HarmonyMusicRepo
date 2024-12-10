echo "Switching to branch maser"
git checkout master

echo "Building app"
npm run build

echo "Deploying files to server"
#scp -i C:\Users\Trent\.ssh\harmonyMusic -r ./* deploy@138.197.30.46:/var/www/138.197.30.46/
scp -i /c/Users/Trent/.ssh/harmonyMusic -r dist/* deploy@138.197.30.46:/var/www/138.197.30.46/

echo "Done"

# 4Flow-Project

Description :

The 4Flow-Project consists in a set of Dashboards that should have an specific functionality depending on the role of the employee who is using them. The main idea of the project is to help the planers and balancers to make their jobs easier. Creating a platform where they can comunicate easy through task managment, where they could request specific needs acording to their tasks and where the admin could see the whole flow of the logistic procedure.
    
Installation Guide :

We recomend using docker to avoid any OS compatibility issue. So we encorage you to download and install docker https:/docs.docker.com/get-started/ .
When docker is installed follow this steps:
1. Run: 
git clone https://github.com/felipeinfantino/4Flow-Project.git 
2. Run :
cd 4Flow-Project/4FlowDashboards
3. Run :
docker-compose up --build
(If there are new commits)
4. Run: 
docker-compose down
git pull
docker-compose up --build

Now you should be able to access it through http://localhost:3000/

If you dont want to use docker for this proyect , you could install npm from https://www.npmjs.com/get-npm
When npm is installed follow this steps: 
1. Run: 
git clone https://github.com/felipeinfantino/4Flow-Project.git 
2. Run :
cd 4Flow-Project/4FlowDashboards
3. Run :
npm install
4. Run :
npm start 
(If there are new commits)
5. Run: 
git pull
npm install
npm start

Now you should be able to access it through http://localhost:3000/


Usage guide :

At the moment the only dashboard that is currently working is the planers dashboard. 
So in order to use it, create a Todo with the Add todo button and specify some subtaks for the task.
After that you will see, your todo is now in the dashboard. 
For now the whole subtask workflow is beeing mocked, so just click on any subtask on 'Done'
The task will automatically go from the TO_DO to IN_PROGRESS .
Click all the subtasks as 'Done' . You will se the task goes automatically from IN_PROGRESS to WAITING.
(The next steps are not implemented yet).
Now it is the balancer job, to review and approve the task. If the balancer approves it, the task flows to DONE. 
If the balancer doesnt approve  it task goes automatically to IN_PROGRESS with an special mark for the planer. 

If you want a deeper understanding of the project, you should take a look to the [ Architecture ](https://github.com/felipeinfantino/4Flow-Project/blob/master/architecture.md)
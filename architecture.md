The 4Flow Product will consist in 3 main components: Planers Dashboard, Balancer Dashboard and External Dashboard.

                                                  Planers dashboard: 

- Functionality:
	- The planer should be able to add tasks into the dashboard.
	- Each task should consist in a set of independent subTask.
	- The planer should be able to assign a subTask as ‘Done’.
	- The dashboard should have 4 states: TO_DO, IN_PROGRESS, WAITING and DONE.
	- TO_DO state: The task is not started yet, that means no subtask is completed.
	- IN_PROGRESS state: At least one task is completed, but not all of them are completed.
	- WAITING : The planers job is now finished for the first phase, he should wait until the balancer approves it or request some changes. If the balancer request some changes, the Task goes to IN_PROGRESS with a special color, meaning that the balancer is requesting changes. If everything is okay, the Task is shifted to done.
	- DONE : Both planer and balancer agreed on everything, the task is done.
	- All this shifting should be automatically.

Wireframe: 
	- See react app


                                                 Balancer dashboard:
	
- Functionality:
	- The balancer has his own tasks in his dashboard.
	- The balancer should match his tasks with the planers proposed solutions.
	- The planers proposed solutions are the tasks on the planer dashboard that are on the WAITING state.
	- The balancer should see the planers proposed solutions and his own tasks.
	- If the balancer can find a matching between his tasks and the planers proposed solutions, he matches it and the task is shifted to DONE. If the balancer can’t find a matching, he select the subtask that is causing the problem an send a change request. A change request should be standardised, as DURATION_TIME_REQUEST,  DUE_DAY_REQUEST, PRICE_REQUEST, CAPACITY_REQUEST. If the balancer request doesn’t fit into that we have a OTHER_REQUEST with a description, the idea is that all request should be standardised in order to avoid misunderstandings. 
	

Wireframe :
	-TO DO.

                                                External Dashboard:
	
Idea: When the planer is completing a subtask, he should se all the possible providers for this task. He should be able with the least amount of clicks to contact him with exactly the requirements he needs. The external customer should have a separate UI for seeing the request the planers has made and be able to accept and to decline them. Once the external customer interacts with the request (accept/decline) , the planers dashboard should automatically be refreshed according to the answer.

Wireframe: 
	-TO DO.



                                             Application Workflow example :

The planer becomes a task called ‘transport wood from Berlin to Hamburg’ . The task is in the TO_DO state in the planers dashboard. The task has 3 subtasks. 1. Contact wood supplier , 2. Contact transport company, 3. Contact workers for moving the objects. 

When he sees task 1, the software should know that is a wood supplier task , so when he starts the task he should see all the wood suppliers (internal database) with all the specifications. He selects the one that is more appropriate for this task and clicks on ‘CONTACT SUPPLIER ‘ and in the contact formula is price, due day, etc . Once he sends it, the External customer (in this case the wood supplier) should see it on his dashboard. He should be able to accept, decline or make a counter offer. If he accepts the subtask on the planers board is marked as done , if he decline is marked as declined and the planer should contact another wood supplier and analogue with the counter offer. The same process happens with subtask 2 and 3 until they are finally complete. Then the task on the planers dashboard goes to the WAITING state. When that comes the task is visible for the balancer, he according to his tasks, should match his own tasks with that. For example he has on his tasks : ‘send 200 wood sticks made of pine wood, color red’. He sees that the 200 wood sticks don’t fit in the Truck. So he mark the subtask 2. (Contact transport company) and make a CAPACITY_REQUEST , he adds a comment ‘Im moving 200 woods , 2m each, that won’t fit in that truck’. So that automatically shifts the Task from WAITING to IN_PROGRESS in the planer dashboard, with a special color. Then the planer contacts another transport company and the task goes again to WAITING and again visible to the balancer. Now the balancer is happy with that so he match his task with that task and the task goes to DONE in both dashboards, because all parties agreed on it.


                                                  Technology Stack:

  - Frontend development: React.js
  - Backend : Firebase (backend as a service)

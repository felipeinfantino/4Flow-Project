import firebase from "../firebase/Firebase";
import { planerColumnNames, balancerColumnNames } from "./TaskProvider";

var db =  firebase.firestore();


export const uploadTask = (todo, collection) =>{
    if(collection !== "PlanerTasks" && collection !== "BalancerTasks"){
        alert("Only PlanerTasks and BalancerTasks supported ");
    }
    const id = todo.id;
    if(!id){
        alert("Todo must have an Id");
    }
    db.collection(collection).doc(id).set(todo).then(() => console.log("success")).catch((er) => console.log("error: ", er))
}

export const updateTaskState = (todo, collection, taskState)=>{
    if(collection !== "PlanerTasks" && collection !== "BalancerTasks"){
        alert("Only PlanerTasks and BalancerTasks supported ");
    }
    const posibleTaskStates = collection === "PlanerTasks" ? Object.values(planerColumnNames) : Object.values(balancerColumnNames);
    if(!posibleTaskStates.includes(taskState)){
        alert("Only the following states are possible ", posibleTaskStates);
    }
    const todoId = todo.id;
    const subTasks = todo.subTasks;
    db.collection(collection).doc(todoId).update({ status: todo.status, subTasks: subTasks }).then(() => console.log("Successfully updated")).catch((er) => console.log("Error while updating ", er));
}
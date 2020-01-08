
import * as Imap from 'imap';
import * as uuidv4 from 'uuid/v4';
import * as admin from 'firebase-admin';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://flowdashboard-6c548.firebaseio.com"
  });
  
const imap = new Imap({
  user: "amostuproject@gmail.com",
  password: "Amos$Project01",
  host: "imap.gmail.com",
  port: 993,
  tls: true
});

function openInbox(cb) {
  imap.openBox("INBOX", false, cb);
}

/**
  Email Format:

    Subject : TASKCREATION

    Content:

    TASKS:
        TASK 1: Deliver wood from Berlin to Hamburg.
            SUBTASK 1: this is a subtask 1.
            SUBTASK 2: this is a subtask 2.
            SUBTASK 3: this is a subtask 3.
        TASK 2: Deliver wood from München to Hamburg.
            SUBTASK 1: this is a subtask 1.
            SUBTASK 2: this is a subtask 2.
            SUBTASK 3: this is a subtask 3.
    ENDTASKS

 */

function uploadSingleTask(task): Promise<FirebaseFirestore.WriteResult> {
    const id = task["id"];
    return admin
      .firestore()
      .collection("PlanerTasks")
      .doc(id)
      .set(task);
  }
  
async function uploadTasks(tasks): Promise<boolean> {
  const arrayOfPromises = [];
  for (const task of tasks) {
    arrayOfPromises.push(uploadSingleTask(task));
  }
  try {
    await Promise.all(arrayOfPromises);
    console.log("Tasks successfully uploaded");
    return true;
  } catch (e) {
    console.log("Errooorr ", e);
    return false;
  }
}

async function parseEmail(emailRaw: string) {
  // get the content of the tasks
  const startIndex = emailRaw.indexOf("TASKS:");
  const endIndex = emailRaw.indexOf("ENDTASKS");
  const content = emailRaw.substring(startIndex + 6, endIndex); // TASKS: has 6 characters
  console.log(content);
  // we split it in lines
  const splitedContent = content.split("\n");
  console.log(splitedContent);
  const tasks = [];
  for (const line of splitedContent) {
    if (line.startsWith("TASK")) {
      const task = {};
      const title = line.substring(8);
      task["id"] = uuidv4();
      task["status"] = "To do";
      task["subtasks"] = [];
      task["title"] = title;
      console.log("Task found , title : ", title);
      tasks.push(task);
    }
    if (line.startsWith("SUBTASK")) {
      const subtask = {};
      const title = line.substring(11);
      subtask["completed"] = false;
      subtask["id"] = uuidv4();
      subtask["title"] = title;
      tasks[tasks.length - 1]["subtasks"].push(subtask);
      console.log("SubTask found , title : ", title);
    }
  }
  console.log(tasks);
  await uploadTasks(tasks);
}

export function listenForEmails() {
  imap.once("ready", () => {
    console.log("Connection successful");
    openInbox((err, mailbox) => {
      imap.on("mail", arg => {
        console.log("Email recieved and arg is ", arg);
        imap.search(
          [["UNSEEN"], ["HEADER", "SUBJECT", "TASKCREATION"]],
          (err, uids) => {
            console.log("Searched ...");
            console.log(uids);

            if (uids && uids.length > 0) {
              const f = imap.fetch(uids, { bodies: "" });
              f.on("message", function(msg, seqno) {
                console.log("IMessage #%d", seqno);
                let buffer = "";
                msg.on("body", function(stream, info) {
                  stream.on("data", function(chunk) {
                    buffer += chunk.toString("utf8");
                  });

                  stream.once("end", function() {
                    if (info.which === "") {
                      //buffer is the body
                      console.log("Here am i ");
                      //console.log(buffer);
                      parseEmail(buffer);
                      msg.once("attributes", function(attrs) {
                        let uid = attrs.uid;
                        imap.addFlags(uid, ["\\Seen"], function(err) {
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("Marked as read!");
                          }
                        });
                      });
                    }
                  });
                });
              });
            } else {
              console.log("Recieved email does not have a proper header");
            }
          }
        );
      });
    });
  });

  imap.once("error", function(err) {
    console.log("Imap once error", err);
  });

  imap.once("end", function() {
    console.log("Connection ended");
  });

  imap.connect();
}
  

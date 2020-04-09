import { useState, useEffect } from "react";
import { db } from "../db";
import { Poll, PollAnswer } from "../pages/Home";
import { firestore} from "firebase";



export const usePoll = (pollId : string) => {
  const [poll, setPoll] = useState<Poll | null>(null);

  useEffect(() => {
    //load current poll
    db.collection("polls")
      .doc(pollId)
      .get()
      .then((poll : firestore.DocumentSnapshot<firestore.DocumentData>) => {
        if (poll.exists) {
          setPoll({
              id: poll.id,
              text: poll.data()!.text
          });
        } else {
          console.log("couldn't find poll");
        }
      })
      .catch(error => {
        console.log("error loading poll: " + error);
      });
  });

  return poll;
};

export const usePollAnswers = (pollId : string) => {
    const [answers, setAnswers] = useState<PollAnswer[]>([]);

  //setup data listeners
  useEffect(() => {
    //load all possible answers
    var removeAnswersSnapshot = db
      .collection("polls")
      .doc(pollId)
      .collection("answers")
      .onSnapshot(snapshot => {
        var answerObjects : PollAnswer[] = [];
        snapshot.docChanges().forEach(change => {
          answerObjects.push({
            id: change.doc.id,
            text: change.doc.data().text,
            amount: change.doc.data().amount,
          });
          setAnswers(answerObjects);
        });
      })
    return () => {
      removeAnswersSnapshot();
    };
  },[]);

  const vote = (id : string) => {
    var newAnswers = [...answers];
    var answer = newAnswers.find(a => a.id === id);
    
    db.collection("polls").doc(pollId).collection("answers").doc(answer!.id).set({
      amount: answer!.amount + 1
    }, {merge: true})
  }

  return {answers, vote}
};

import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { Poll } from '../model/poll';
import { PollAnswer } from '../model/pollAnswer';


const Home: React.FC = () => {


  const [poll, setPoll] = useState<Poll>({
    id: "poll1",
    text: "Is @RalliPi the most underrated twitter account in the world?"
  })

  const [answers, setAnswers] = useState<PollAnswer[]>([
    {
      id: "a1",
      text: "yes, absolutely",
      amount: 0
    },
    {
      id: "a2",
      text: "I'm not sure",
      amount: 0
    },
    {
      id: "a3",
      text: "No!",
      amount: 0
    }
  ])


  const onVote = (e: React.MouseEvent<HTMLIonItemElement, MouseEvent>, id: string) => {
    e.preventDefault();
    var newAnswers = [...answers];
    var index = newAnswers.findIndex(a => a.id === id);
    newAnswers[index].amount++;
    setAnswers(newAnswers);
  };

  const answerList = () => {
    return answers.map(answer => (
      <IonItem onClick={e => onVote(e, answer.id)} key={answer.id}>
        <IonLabel>{answer.text}</IonLabel>
        <IonLabel>{answer.amount}</IonLabel>
      </IonItem>
    ));
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Realtime poll app</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardContent>
            {poll != null ? poll.text : "loading poll..."}
          </IonCardContent>
        </IonCard>
        <IonList>{answerList()}</IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;

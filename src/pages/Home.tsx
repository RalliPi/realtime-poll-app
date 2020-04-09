import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react';
import React, {useState, useEffect} from 'react';
import './Home.css';
import { usePoll, usePollAnswers } from '../hooks/poll';

export interface Poll{
  id: string,
  text: string
}
export interface PollAnswer{
  id: string,
  text: string,
  amount: number,
}

const Home: React.FC = () => {


  var poll = usePoll("poll1")
  var {answers, vote} = usePollAnswers("poll1")


  const onVote = (e : React.MouseEvent<HTMLIonItemElement, MouseEvent>, id : string) => {
    e.preventDefault();
    let answer = answers.find(a => a.id === id)
    vote(answer!.id)
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
        <IonTitle>Ionic Blanks</IonTitle>
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

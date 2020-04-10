### Building a realtime poll app with ionic and firebase

This tutorial will show you how to build an app that displays a poll and its answers. It also let's users vote on their favorite answer.
The polldata will be loaded and saved from and to the firestore database.
We will be using ionic and react to build the app frontend. Ionic makes it super easy to make a web app look like a native mobile app.

Let's get started with part 1: The UI

In this part we will design the user interface with ionic coponents and make the app fully functional locally. So you will be able to vote for a poll answers, but the votes will not get persistet and no one else can see them.
We will add the firebase logic in part 2.

We will be using the ionic cli to bootstrap our new app. If you haven't already installed it, you can install it globally on your machine by typing
```
npm install -g @ionic/cli
```
Let's create a new ionic project. Go to your terminal and type:

```
ionic start realtime-poll-app blank --type=react
```
Follow the isntructions on screen. When your done, your new ionic application is ready for development. Open the root folder of the app in your favourite text editor. 

Time to see what we already got. Switch back to your terminal and type
```
ionic serve
```
This will start a development server with live reload. So you will see the changes you make almost immediately.

As you can see, there is some placeholder text on the homepage. Navigate to the file pages/Home.tsx and replace the contents with the following:

```
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonList, IonItem, IonLabel } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import './Home.css';
import { Poll } from '../model/poll';
import { PollAnswer } from '../model/pollAnswer';


const Home: React.FC = () => {


  const [poll, setPoll] = useState<Poll>({
    id: "poll1",
    text: "I'm a question"
  })

  const [answers, setAnswers] = useState<PollAnswer[]>([
    {
      id: "a1",
      text: "I'm answer 1",
      amount: 0
    },
    {
      id: "a2",
      text: "I'm answer 2",
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


```

Switch to your browser or your terminal and you will se that we have some mistakes. Don't worry, that all makes sense. 
If you look to the import section at the top of our Home.tsx file, you see that we import Poll and PollAnswer. But we didn't create them so far. Let's do this now.
Create a new folder called model in the root of your project and create two files in it.

```
mkdir model
touch poll.ts
touch pollAnswer.ts
```

Let's start with the poll file. Open it and paste the following:

```
export interface Poll {
    id: string,
    text: string
}
```
We export an interface called Poll which needs to have an id of type string and a text also of type string. That will tell our app, that everytime we're dealing with a Poll, it needs to have this two properties. This will save us a lot of headaches in the long run. Welcome to the long run. Welcome to the wonderful world of typescript.

Now open pollAnswer.ts and paste the following:
```
export interface PollAnswer {
    id: string,
    text: string,
    amount: number,
}
```
Almost the same as in poll.ts. This time we export a an interface called PollAnswer and it has 3 properties. an id, a text and additionally an amount of type number. This property will store the number of votes this answer received.

Now Check your browser again. Everything should be running now. You will see a poll question and two answers. If you click the ansswers, their votecount increases.

Let's have a deeper look at Home.tsx. I will go through the complete code and explain everything.

Pretty much going on here.
We're exporting a react functional(because class component are so 2018, aren't they?) component named Home which renders an ionic page with a header and content. 
In the content section we create a card which will hold our poll question later.
Beneath the poll card we want to display a list with all possible answers. We use an ionic List for that.
Inside of the list we call a method called ``answerList``, which is defined earlier in the code. It maps over all answers and returns a list of IonItem components with an IonLabel for the answer text and another IonLabel for the current vote amount inside.
The data for the actual poll annd the answers are currently stored as component state with the help of the useState hook (we will load them from the firestore database in the next part of the tutorial).
The poll is an object with an id attribute and a text attribute and the answers are an array of objects with an id, a text and a vote amount each.
Each IonItem we create has a click handler called onVote that gets executed whenever the user clicks the item. This handler receives the id of the selected answer as an argument. It increments the vote amount of the selected answer and stores the new state of the answers list. It does so by creating a copy of the current answers list with the helps of the spread operator ```[...answers]```, finding the index of the selected answer, modifiying the object at the found index and completely overriding the previous state with the new array.

That's it. When you now switch to your browserwindow, you will see a (pretty ugly) page that displays our poll and all answers with vote count. You can increase the amount by clicking on the answers.

That's it for this part. We will do the actual work in the next. That means connecting to firestore, loading poll data and updating the vote count when items get clicked.

If you don't want to miss part 2 which will airrive in the next couple of days, make sure you follow me on twitter. I announce new posts there first.

[https://twitter.com/rallipi](https://twitter.com/rallipi)


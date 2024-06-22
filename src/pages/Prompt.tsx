//Starting page, it takes prompts

import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonTitle,
  IonToolbar,
  IonicSlides,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import "./Prompt.css";

const Prompt: React.FC = () => {
  let prompt_store: String[];
  const [prompt, setPrompt] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  function handlePrompt() {
    prompt_store.push(prompt);
  }

  const PromptCard = () => {
    return (
      <IonContent>
      <IonCard>
        <IonInput
          onIonChange={(e: any) => {
            setPrompt(e.target.value);
          }}
        ></IonInput>
        <IonButton
          onSubmit={(e: any) => {
            handlePrompt();
          }}
        >
          Submit
        </IonButton>
      </IonCard>
       
      </IonContent>
    );
  };

  return (
    <IonContent>
      {isOpen ? <PromptCard /> : null}
      <IonButton onClick={() => setIsOpen(!isOpen)}>Prompt</IonButton>
      <p>{prompt}</p>
    </IonContent>
  );
};

export default Prompt;

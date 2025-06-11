'use client';
import data from '@/app/lib/sample.ink';
import { Compiler } from 'inkjs/full';
const storyContent = new Compiler(data).Compile();
const jsonBytecode = storyContent.ToJson();

import { useState, useEffect } from 'react';
import { Story } from 'inkjs';

export default function MainStory() {
  console.log(storyContent);
  const [story, setStory] = useState();
  const [content, setContent] = useState([]);
  const [choices, setChoices] = useState([]);

  useEffect(() => {
    const inkStory = new Story(jsonBytecode);
    setStory(inkStory);
    continueStory(inkStory);
  }, []);

  const continueStory = (s) => {
    let text = [];
    while (s.canContinue) {
      text.push(s.Continue());
    }
    setContent(text);
    setChoices(s.currentChoices);
  };

  const handleChoice = (index) => {
    story.ChooseChoiceIndex(index);
    continueStory(story);
  };

  return (
    <div className="my-10 p-10 border">
      <div>
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div>
        {choices.map((choice, index) => (
          <button
            className="p-2 border bg-blue-50"
            key={index}
            onClick={() => handleChoice(choice.index)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
}

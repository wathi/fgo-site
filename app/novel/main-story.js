'use client';
import data from '@/app/lib/sample.ink';
import { Compiler } from 'inkjs/full';
const storyContent = new Compiler(data).Compile();
const jsonBytecode = storyContent.ToJson();

import { useState, useEffect } from 'react';
import { Story } from 'inkjs';

export default function MainStory({ setCurrentTags }) {
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
    let tags = [];
    while (s.canContinue) {
      let paragraphText = s.Continue();
      let paragraphTags = s.currentTags;

      text.push(paragraphText);
      if (paragraphTags != '') {
        tags.push(paragraphTags);
      }
    }

    setContent(text);
    setChoices(s.currentChoices);
    setCurrentTags(tags);
  };

  const handleChoice = (index) => {
    story.ChooseChoiceIndex(index);
    setCurrentTags([]);
    continueStory(story);
  };

  return (
    <>
      <div className="my-10 p-10 border">
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
      <div className="flex flex-col">
        {choices.map((choice, index) => (
          <button
            className="p-2 border bg-blue-50 hover:bg-blue-200"
            key={index}
            onClick={() => handleChoice(choice.index)}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </>
  );
}

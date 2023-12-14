import { Fragment, useEffect, useState } from "react";
import { faker } from "@faker-js/faker"; // Import the Faker library
import Link from "next/link";

const reallyLongText = Array(1000).fill(null).map(() => faker.lorem.text()).join(" ");

export default function Home() {
  const [streamingtext, setStreamingtext] = useState("");

  useEffect(() => {
    // Every 100ms, add a random character to the streaming text
    const interval = setInterval(() => {
      setStreamingtext((currentText) => currentText + reallyLongText[currentText.length]);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h1>ChatGPT should let you select the newest paragraph even as it streams in</h1>
      <p>Zach Blume, Dec 14 2023. <Link href="https://github.com/zachblume/chatgpt-ui-fix/blob/main/pages/index.js">Read the code on github</Link></p>
      <h2>Problem</h2>
      <p>
        Let&apos;s stream text into the following paragraph like ChatGPT does in its most recent paragraph:
      </p>
      <blockquote>{streamingtext}</blockquote>
      <p>
        Try to select a portion of it as it streams. Your selection disappears each time a new character is appended to the
        paragraph node.
      </p>
      <p>Here&apos;s a GIF:</p>
      <img src="/chatgpt.gif" alt="A gif showing chatGPT losing focus when I select a paragraph as its currently streaming in." />
      <h2>Fix</h2>
      <p>
        We can fix this behavior by making each character a React
        &lt;Fragment/&gt; and by giving it a immutable key:
      </p>
      <blockquote>
        {streamingtext.split("").map((char, index) => (
          <Fragment key={index+char}>{char}</Fragment>
        ))}
      </blockquote>
      <p>Now you can select text even as it&apos;s streaming in.</p>
      <p>Here&apos;s a GIF:</p>
      <img src="/fixed.gif" alt="A GIF of this page showing that using immutably keyed Fragments fixes this behavior." />
    </>
  );
}

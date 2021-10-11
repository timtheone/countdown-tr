import Countdown from "./components/Countdown/Countdown";
import styled from "styled-components";
import { useState } from "react";
import IntlContext from "./intl/IntlContext";
import English from "./translations/en.json";

const locale = navigator.language;

const Wrapper = styled.div`
  margin: 0 15px;
`;

function App() {
  const [lang, setLang] = useState(English);

  const changeLanguage = (lang: string) => {
    if (lang === "de") {
      import("./translations/de.json").then((langFile) => {
        setLang(langFile);
      });
    } else {
      setLang(English);
    }
  };
  return (
    <IntlContext.Provider
      value={{
        locale: locale,
        messages: lang,
      }}
    >
      <Wrapper>
        <h1>Countdown</h1>
        <button
          onClick={() => {
            lang === English ? changeLanguage("de") : changeLanguage("en");
          }}
        >
          Change Language
        </button>
        <Countdown timestamp={1634237943} />
      </Wrapper>
    </IntlContext.Provider>
  );
}

export default App;

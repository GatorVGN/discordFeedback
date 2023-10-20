import React, { useState, useEffect } from "react";
import Info from "../components/Info";
import "../css/Feedback.css";

const Feedback = () => {
  const initialData = {
    webhook: "",
    feedback: "",
  };

  const [message, setMessage] = useState(initialData);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = "💜 Feedback";

    (() => {
      const params = new URLSearchParams(window.location.search);
      const url = params.get("url");
      const webhookRegex = new RegExp(/(https:\/\/discord\.com\/api\/webhooks\/)(\d+)(\/)/, "gmi");

      if (url && webhookRegex.test(url)) {
        setMessage({
          ...message,
          webhook: url,
        });
      }
    })();
  }, [message]);

  function handleOnChange(e) {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (message.webhook === "" || message.feedback === "") {
      setError("Alles ausgefüllt?");
      return;
    }

    const url = message.webhook;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: message.feedback, username: "FEEEEDBACK" }),
    };

    fetch(url, requestOptions)
      .then((response) => {
        if (response.ok) {
          setSubmitted(true);
          return response;
        } else {
          setError("Da stimmt was mit der URL nicht.");
        }
      })
      .then((data) => {
        console.log("✅ | ", data.status, data.ok);
      })
      .catch((error) => {
        setError(error);
        console.log("❌ | ", error);
        setError(true);
      });
  }

  if (submitted) {
    return (
      <div className="f-container">
        <Info bgcolor={"#77dd77"} text={"Nachricht wurde versendet"} />
      </div>
    );
  }

  return (
    <div className="f-container">
      <h2 className="f-headline">Gib Feedback</h2>

      <Info
        text={"Bitte im oberen Feld die Webhook-URL angeben. Sie sollte im Feedback-Channel angepinnt sein."}
        smallText={"Das ist leider nötig um spam vorzubeugen"}
      />

      <form className="f-form" onSubmit={handleSubmit}>
        <label className="f-label">Webhook URL:</label>
        <input
          className={error !== "" ? "f-input fb-warning" : "f-input"}
          type="text"
          name="webhook"
          value={message.webhook}
          onChange={handleOnChange}
          pattern="(^http)(.*)"
          placeholder="https://discord.com/api/webhooks/1151540712203100171/Hf_we-PpRT5pj8Sua0fLc2QpRzoP9nCzNSer22UzBDuPS7x5D18V-8TSUVisV7GlZOMY"
        ></input>
        <label className="f-label">Nachricht:</label>
        <textarea
          className={error !== "" ? "f-textarea fb-warning" : "f-textarea"}
          type="textarea"
          rows={10}
          name="feedback"
          value={message.feedback}
          onChange={handleOnChange}
          placeholder="# Feedback &#10;**Meine Meinung**  &#10;:smile:"
        />
        <button className={error !== "" ? "f-button fbg-warning fb-warning" : "f-button"} type="submit" error={error}>
          Abschicken
        </button>
      </form>
      {error && <Info bgcolor={"#ff6961"} text={error} />}
    </div>
  );
};

export default Feedback;

import { MessageType, ReactionType } from "../../_interfaces";
import QchatApi from "../../_lib/api";
import ReactionButton from "./ReactionButton";
import TripleDots from "./TripleDots";
import styles from "./styles.module.css";
import SubmitTickIcon from "/src/_images/chat/message/feedback-submit-tick.svg?react";
import { marked } from "marked"
import { useEffect, useState } from "react"

export default function Message({
  message,
  selectedColor,
  isFirst,
  isLast,
  isLoading,
  qchatAPI,
}: {
  message: MessageType
  selectedColor: string
  isLoading: boolean
  isFirst: boolean
  isLast: boolean
  qchatAPI: QchatApi
}) {
  const [currentReaction, setCurrentReaction] = useState<ReactionType | null>(null)

  /* const [speechSynthAPI, setSpeechSynchAPI] = useState<SpeechSynthesizeAPI | null>(null)
  
  const { isVoiceOptionEnabled, responseAudioBase64, speakerState, dispatch} = useAudio();

  const audioPlayRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if(isVoiceOptionEnabled && !responseAudioBase64) {
      //audioPlayRef.current.playbackRate = 1.25; // Set the desired playback rate
      audioPlayRef.current?.play()
    }
  }, [responseAudioBase64]) */

  function handleReaction(reaction: ReactionType): void {
    setCurrentReaction(reaction)
    if (message.requestId) {
      qchatAPI.setReaction({
        requestId: message.requestId,
        likeStatus: reaction === "LIKE" ? "good_answer" : "wrong_answer",
      })
    }
  }

  useEffect(() => {
    const tokenizer = new marked.Tokenizer()
    const renderer = new marked.Renderer()
    // tokenizer.lheading = function () {
    //   return false
    // }
    tokenizer.lheading = (_src) => undefined
    renderer.link = (href, _title, text) =>
      `<a target="_blank" href="${href}" style="color:${selectedColor};">${text}</a>`

    marked.setOptions({
      tokenizer: tokenizer,
      renderer: renderer,
      // headerIds: false,
      // mangle: false,
    })

    // setSpeechSynchAPI(new SpeechSynthesizeImpl())
  }, [])

  return (
    <div
      className={styles.messageContainer}
      style={{
        justifyContent: message.role === "assistant" ? "flex-start" : "flex-end",
      }}
    >
      <div
        className={styles.message}
        style={
          message.role !== "assistant" ? { backgroundColor: selectedColor, cursor: "default", color: "white" } : {}
        }
      >
        <div dangerouslySetInnerHTML={{ __html: marked(message.content) }} />
        {message.role === "assistant" && isLoading && isLast && <TripleDots />}

        {message.role === "assistant" && isLast && !isLoading && !isFirst && (
          <>
            {currentReaction === null ? (
              <div className={styles.messageRating}>
                <ReactionButton reaction="LIKE" hoverColor={selectedColor} onButtonClick={handleReaction} />
                <ReactionButton reaction="DISLIKE" hoverColor={selectedColor} onButtonClick={handleReaction} />
                {/* <ImageButton 
                  name="SPEAKER" hoverColor={selectedColor} 
                  onButtonClick={handleAudioPlay}
                  onButtonLoad={doNothing}
                />  */}
              </div>
            ) : (
              <div className={styles.messageFeedbackThanks}>
                <SubmitTickIcon width={18} height={18} />
                Thanks for submitting your feedback!
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
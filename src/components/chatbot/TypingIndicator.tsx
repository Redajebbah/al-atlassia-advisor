const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-4">
      <div className="chat-bubble-bot flex items-center gap-1.5 px-4 py-3">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  );
};

export default TypingIndicator;

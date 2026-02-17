// ─────────────────────────────────────────────────────────────
// client/App.jsx — Root component
// Wires together all hooks and renders the layout
// ─────────────────────────────────────────────────────────────

import { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import PreviewPanel from "./components/PreviewPanel";
import { useThumbnail } from "./hooks/useThumbnail";
import { useAI } from "./hooks/useAI";
import { useHistory } from "./hooks/useHistory";

export default function App() {
  const thumbnail = useThumbnail();
  const ai        = useAI();
  const hist      = useHistory();

  const {
    title, setTitle, subtitle, setSubtitle,
    channelName, setChannelName, bigNumber, setBigNumber,
    style, setStyle, mood, setMood,
    fontSize, setFontSize, layout, setLayout,
    accent, moodObj, thumbnailData,
    applyVariant, applySnapshot,
  } = thumbnail;

  // Generate AI suggestions — also save to history
  async function handleGenerate() {
    hist.push(thumbnailData);
    await ai.generate({ title, channelName, style, mood, subtitle });
  }

  // Apply a variant from AI and update the live canvas
  function handleApplyVariant(variant) {
    applyVariant(variant);
    ai.clearSuggestions();
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#06060F",
      color: "#fff",
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
    }}>
      {/* Global scrollbar styles */}
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.02); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }
      `}</style>

      <Header hasTitle={Boolean(title)} accent={accent} />

      <div style={{
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        minHeight: "calc(100vh - 58px)",
      }}>
        <Sidebar
          // content
          title={title}             setTitle={setTitle}
          subtitle={subtitle}       setSubtitle={setSubtitle}
          channelName={channelName} setChannelName={setChannelName}
          // style
          style={style}             setStyle={setStyle}
          mood={mood}               setMood={setMood}
          layout={layout}           setLayout={setLayout}
          // advanced
          fontSize={fontSize}       setFontSize={setFontSize}
          bigNumber={bigNumber}     setBigNumber={setBigNumber}
          // generate
          onGenerate={handleGenerate}
          loading={ai.loading}
          accent={accent}
          // AI
          aiSuggestions={ai.suggestions}
          aiError={ai.error}
          onApplyVariant={handleApplyVariant}
          // history
          history={hist.history}
          onApplySnapshot={applySnapshot}
        />

        <PreviewPanel
          thumbnailData={thumbnailData}
          accent={accent}
          moodObj={moodObj}
          style={style}
          mood={mood}
          fontSize={fontSize}
          layout={layout}
        />
      </div>
    </div>
  );
}

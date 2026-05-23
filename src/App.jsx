import { useState, useEffect, useRef } from "react";

const TYPES = [
  {
    id: "battery",
    name: "朝から電池切れタイプ",
    subtitle: "回復の土台が崩れている可能性",
    emoji: "🔋",
    color: "#6B7FD7",
    questions: [
      "朝起きた瞬間から疲れている",
      "寝ても回復感がない",
      "午前中ずっとぼんやりする",
      "カフェインがないと動けない",
      "夕方以降に少し元気になる",
    ],
    background: [
      "睡眠の質低下",
      "自律神経の切り替え不足",
      "夜のスマホ習慣",
      "血糖値の乱高下",
    ],
    habits: [
      "起床後すぐ太陽光を浴びる",
      "朝イチのスマホ時間を減らす",
      "朝食を抜き続けない",
      "休日の寝だめを減らす",
      "夜の情報摂取を減らす",
    ],
    minimum: "「朝5分だけカーテンを開ける」\nここからでもOK。体質改善は気合いより「リズム作り」が大事です。",
  },
  {
    id: "overwork",
    name: "頑張りすぎ反動タイプ",
    subtitle: "常にアクセル全開で走り続けていませんか？",
    emoji: "🏃‍♀️",
    color: "#E07B54",
    questions: [
      "平日は無理して動ける",
      "休日に完全停止する",
      "周囲からは元気そうに見られる",
      "予定を詰め込むクセがある",
      "突然ガス欠になる",
    ],
    background: [
      "家事・仕事・子育て全部ちゃんとやろうとする",
      "自分の回復を後回しにする",
      "自律神経が休まる時間がない",
      "身体が「強制停止モード」に入る",
    ],
    habits: [
      "予定を詰め込みすぎない",
      "休みの日に回復予定を入れる",
      "80点で終える練習をする",
      "「休む予定」を先に入れる",
      "夜に脳を興奮させすぎない",
    ],
    minimum: "「今日はここまでで終わり」を決める。\n終わりを作らない限り、永遠に走り続けてしまいます。",
  },
  {
    id: "irritable",
    name: "イライラ消耗タイプ",
    subtitle: "性格が悪くなったのではありません",
    emoji: "⚡",
    color: "#D4637A",
    questions: [
      "小さなことでイライラする",
      "家族の音や態度に敏感",
      "生理前に特にしんどい",
      "怒ったあと自己嫌悪になる",
      "感情の浮き沈みが激しい",
    ],
    background: [
      "疲労・睡眠不足・ホルモン変化の重なり",
      "脳が刺激に敏感になっている",
      "40代前後は感情コントロールにより多くのエネルギーが必要に",
    ],
    habits: [
      "空腹時間を長くしすぎない",
      "一人時間を少しでも確保する",
      "刺激の強いSNS時間を減らす",
      "「休息」を最優先にする",
      "音・光・情報量を減らす",
    ],
    minimum: "「今イライラしてるな」を否定せず認識する。\n感情を責め続けると消耗が強くなります。",
  },
  {
    id: "overthink",
    name: "考えすぎ脳疲労タイプ",
    subtitle: "身体より「脳」が疲れています",
    emoji: "🧠",
    color: "#8B6BBF",
    questions: [
      "常に頭が働いている",
      "何もしていなくても疲れる",
      "夜に考え事が止まらない",
      "SNSや情報収集をやめられない",
      "決断だけで疲れる",
    ],
    background: [
      "調べすぎ・考えすぎ",
      "未来を不安視しすぎる",
      "正解探しを続けてしまう",
      "脳が休息モードに切り替わらない",
    ],
    habits: [
      "情報を入れる時間を制限する",
      "夜の検索を減らす",
      "「考える」より「感じる」時間を作る",
      "スマホを見ない時間を増やす",
      "書き出して脳外に出す",
    ],
    minimum: "寝る前に「今考えていること」を3行だけメモする。\n脳の中だけで抱えると休めません。",
  },
  {
    id: "cold",
    name: "冷え・低体温タイプ",
    subtitle: "エネルギーを作る力が落ちている可能性",
    emoji: "🧊",
    color: "#5BA4C9",
    questions: [
      "手足が冷えやすい",
      "疲れやすく朝弱い",
      "むくみやすい",
      "薄着が苦手",
      "生理前後に不調が強くなる",
    ],
    background: [
      "無理なダイエット",
      "タンパク質不足",
      "運動不足",
      "慢性ストレス",
    ],
    habits: [
      "朝に温かい飲み物を入れる",
      "タンパク質不足を見直す",
      "冷たいものを摂りすぎない",
      "湯船時間を確保する",
      "下半身を冷やしすぎない",
    ],
    minimum: "「毎日湯船3分だけ」でもOK。\n完璧より「身体に温かさを戻す時間」が大事です。",
  },
  {
    id: "sleep",
    name: "睡眠の質低下タイプ",
    subtitle: "睡眠時間ではなく「質」が崩れています",
    emoji: "🌙",
    color: "#4A6FA5",
    questions: [
      "夜中に目が覚める",
      "寝ても回復感がない",
      "夢をたくさん見る",
      "寝つきが悪い",
      "朝がとにかくつらい",
    ],
    background: [
      "夜のスマホ",
      "ストレス",
      "自律神経の興奮",
      "頭の使いすぎ",
    ],
    habits: [
      "寝る1時間前から光刺激を減らす",
      "夜に考え事をしすぎない",
      "寝室温度を見直す",
      "夜のカフェインを減らす",
      "起床時間を固定する",
    ],
    minimum: "寝る30分前だけスマホを離す。\n睡眠は「寝る直前」より「寝る前の過ごし方」でかなり変わります。",
  },
  {
    id: "crash",
    name: "食後クラッシュタイプ",
    subtitle: "血糖値の波が大きくなっている可能性",
    emoji: "🍽️",
    color: "#C4884D",
    questions: [
      "食後に強い眠気が来る",
      "甘いものが止まらない",
      "夕方に急に動けなくなる",
      "集中力が続かない",
      "空腹でイライラしやすい",
    ],
    background: [
      "朝食を抜きがち",
      "昼を急いで食べる",
      "甘いもので回復しようとする",
      "食事間隔が空きすぎる",
    ],
    habits: [
      "朝食を極端に抜かない",
      "甘いものだけで済ませない",
      "タンパク質を意識する",
      "空腹を我慢しすぎない",
      "食事間隔を空けすぎない",
    ],
    minimum: "「おにぎりだけ」より卵や味噌汁を追加する。\n極端な制限より安定感が大事です。",
  },
  {
    id: "people",
    name: "気遣いすぎタイプ",
    subtitle: "身体より「対人消耗」が強いタイプ",
    emoji: "🤝",
    color: "#7BAF6E",
    questions: [
      "人の顔色を見て疲れる",
      "頼まれると断れない",
      "一人時間が少ない",
      "家族優先になりがち",
      "何もしていなくても気疲れする",
    ],
    background: [
      "周囲を優先してしまう",
      "空気を読みすぎる",
      "頑張って笑ってしまう",
      "我慢が日常になっている",
    ],
    habits: [
      "一人時間を予定化する",
      "LINEを即返信しない",
      "頼み事にワンクッション置く",
      "「今日は疲れてる」を認める",
      "人との距離感を調整する",
    ],
    minimum: "「今は返事を急がなくていい」を自分に許可する。\n優しい人ほど自分への許可が苦手です。",
  },
];

const BRAND_NAME = "元・不調ママ式 疲れ方タイプ別 体質診断";

function Footer() {
  return (
    <p style={styles.footer}>{BRAND_NAME}</p>
  );
}

function FatigueApp() {
  const [screen, setScreen] = useState("intro"); // intro, quiz, result
  const [currentType, setCurrentType] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [fadeIn, setFadeIn] = useState(true);
  const [expandedType, setExpandedType] = useState(null);
  const resultRef = useRef(null);

  const totalQuestions = TYPES.reduce((s, t) => s + t.questions.length, 0);
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / totalQuestions) * 100;

  const currentTypeData = TYPES[currentType];
  const questionKey = `${currentType}-${currentQ}`;

  function handleAnswer(val) {
    setFadeIn(false);
    setTimeout(() => {
      const newAnswers = { ...answers, [questionKey]: val };
      setAnswers(newAnswers);

      if (currentQ < currentTypeData.questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else if (currentType < TYPES.length - 1) {
        setCurrentType(currentType + 1);
        setCurrentQ(0);
      } else {
        setScreen("result");
      }
      setFadeIn(true);
    }, 200);
  }

  function getResults() {
    return TYPES.map((type, ti) => {
      let count = 0;
      type.questions.forEach((_, qi) => {
        if (answers[`${ti}-${qi}`]) count++;
      });
      return { ...type, count, total: type.questions.length };
    })
      .filter((r) => r.count > 0)
      .sort((a, b) => b.count - a.count);
  }

  function restart() {
    setScreen("intro");
    setCurrentType(0);
    setCurrentQ(0);
    setAnswers({});
    setExpandedType(null);
  }

  function getLevelLabel(count) {
    if (count >= 4) return { text: "強く当てはまる", bg: "#FDECEA", border: "#E57373", textColor: "#C62828" };
    if (count >= 3) return { text: "やや当てはまる", bg: "#FFF3E0", border: "#FFB74D", textColor: "#E65100" };
    if (count >= 2) return { text: "少し当てはまる", bg: "#FFF8E1", border: "#FFD54F", textColor: "#F57F17" };
    return { text: "傾向あり", bg: "#F1F8E9", border: "#AED581", textColor: "#558B2F" };
  }

  // INTRO SCREEN
  if (screen === "intro") {
    return (
      <div style={styles.container}>
        <div style={styles.introCard}>
          <div style={styles.introDecoTop} />
          <p style={styles.introLabel}>無料セルフチェック</p>
          <h1 style={styles.introTitle}>
            <span style={styles.introTitleSub}>元・不調ママ式</span>
            <br />
            疲れ方タイプ別
            <br />
            <span style={styles.introTitleAccent}>体質診断</span>
          </h1>
          <p style={styles.introDesc}>
            更年期の「なんとなく不調」は
            <br />
            気合いで乗り切るものではありません。
            <br />
            <br />
            8タイプ × 各5問の質問に答えて
            <br />
            あなたの疲れ方パターンを見つけましょう。
          </p>
          <div style={styles.introFeatures}>
            {["所要時間：約3分", "複数タイプ表示", "タイプ別アドバイス付き"].map((f, i) => (
              <div key={i} style={styles.introFeatureItem}>
                <span style={styles.introCheck}>✓</span> {f}
              </div>
            ))}
          </div>
          <button style={styles.startBtn} onClick={() => setScreen("quiz")}>
            診断をはじめる
          </button>
          <p style={styles.introNote}>
            ※ 医療診断ではありません。セルフケアの参考としてご活用ください。
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // QUIZ SCREEN
  if (screen === "quiz") {
    const globalQ = answeredCount + 1;
    return (
      <div style={styles.container}>
        <div style={styles.quizCard}>
          {/* Progress */}
          <div style={styles.progressArea}>
            <div style={styles.progressBarBg}>
              <div
                style={{
                  ...styles.progressBarFill,
                  width: `${progress}%`,
                  backgroundColor: currentTypeData.color,
                }}
              />
            </div>
            <p style={styles.progressText}>
              {globalQ} / {totalQuestions}
            </p>
          </div>

          {/* Type label */}
          <div
            style={{
              ...styles.typeBadge,
              backgroundColor: currentTypeData.color + "18",
              color: currentTypeData.color,
              borderColor: currentTypeData.color + "40",
            }}
          >
            {currentTypeData.emoji} {currentTypeData.name}
          </div>

          {/* Question */}
          <div
            style={{
              ...styles.questionArea,
              opacity: fadeIn ? 1 : 0,
              transform: fadeIn ? "translateY(0)" : "translateY(12px)",
            }}
          >
            <p style={styles.questionNumber}>
              Q{currentQ + 1}
              <span style={styles.questionTotal}> / {currentTypeData.questions.length}</span>
            </p>
            <p style={styles.questionText}>{currentTypeData.questions[currentQ]}</p>
          </div>

          {/* Answer buttons */}
          <div style={styles.answerArea}>
            <button
              style={{
                ...styles.answerBtn,
                backgroundColor: currentTypeData.color,
                color: "#fff",
              }}
              onClick={() => handleAnswer(true)}
            >
              当てはまる
            </button>
            <button
              style={{
                ...styles.answerBtnOutline,
                borderColor: currentTypeData.color + "60",
                color: currentTypeData.color,
              }}
              onClick={() => handleAnswer(false)}
            >
              当てはまらない
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // RESULT SCREEN
  const results = getResults();
  const topResults = results.filter((r) => r.count >= 3);
  const subResults = results.filter((r) => r.count < 3);

  return (
    <div style={styles.container} ref={resultRef}>
      <div style={styles.resultCard}>
        <p style={styles.resultLabel}>あなたの診断結果</p>
        <h2 style={styles.resultTitle}>
          {topResults.length > 0
            ? `${topResults.length}つのタイプが強く出ています`
            : "明確な傾向は少なめですが…"}
        </h2>
        <p style={styles.resultSubtitle}>
          2〜3タイプ重なるのが普通です。一番多かったタイプから整えてみましょう。
        </p>

        {/* Results list */}
        <div style={styles.resultsList}>
          {results.map((r, i) => {
            const level = getLevelLabel(r.count);
            const isExpanded = expandedType === r.id;
            return (
              <div key={r.id} style={styles.resultItem}>
                <div
                  style={{
                    ...styles.resultItemHeader,
                    borderLeft: `4px solid ${r.color}`,
                  }}
                  onClick={() => setExpandedType(isExpanded ? null : r.id)}
                >
                  <div style={styles.resultItemLeft}>
                    <span style={styles.resultEmoji}>{r.emoji}</span>
                    <div>
                      <p style={styles.resultItemName}>{r.name}</p>
                      <p style={styles.resultItemSub}>{r.subtitle}</p>
                    </div>
                  </div>
                  <div style={styles.resultItemRight}>
                    <div style={styles.resultScore}>
                      <span style={{ ...styles.resultScoreNum, color: r.color }}>
                        {r.count}
                      </span>
                      <span style={styles.resultScoreDenom}>/{r.total}</span>
                    </div>
                    <span
                      style={{
                        ...styles.levelBadge,
                        backgroundColor: level.bg,
                        borderColor: level.border,
                        color: level.textColor,
                      }}
                    >
                      {level.text}
                    </span>
                    <span
                      style={{
                        ...styles.expandArrow,
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      ▼
                    </span>
                  </div>
                </div>

                {isExpanded && (
                  <div style={styles.detailPanel}>
                    <div style={styles.detailSection}>
                      <h4 style={{ ...styles.detailHeading, color: r.color }}>
                        崩れやすい背景
                      </h4>
                      {r.background.map((b, bi) => (
                        <p key={bi} style={styles.detailItem}>
                          <span style={{ color: r.color }}>▸</span> {b}
                        </p>
                      ))}
                    </div>
                    <div style={styles.detailSection}>
                      <h4 style={{ ...styles.detailHeading, color: r.color }}>
                        整えやすい習慣
                      </h4>
                      {r.habits.map((h, hi) => (
                        <p key={hi} style={styles.detailItem}>
                          <span style={{ color: r.color }}>{hi + 1}.</span> {h}
                        </p>
                      ))}
                    </div>
                    <div
                      style={{
                        ...styles.minimumBox,
                        backgroundColor: r.color + "0D",
                        borderColor: r.color + "30",
                      }}
                    >
                      <p style={{ ...styles.minimumLabel, color: r.color }}>
                        最低ラインはここだけ！
                      </p>
                      <p style={styles.minimumText}>{r.minimum}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {results.length === 0 && (
          <div style={styles.noResult}>
            <p style={styles.noResultText}>
              該当するタイプがありませんでした。
              <br />
              今は比較的バランスが取れている状態かもしれません。
            </p>
          </div>
        )}

        {/* Closing message */}
        <div style={styles.closingBox}>
          <p style={styles.closingTitle}>次の一歩</p>
          <p style={styles.closingStep}>❶ 一番当てはまったタイプを確認する</p>
          <p style={styles.closingStep}>❷ 無理なくできそうな習慣を1つだけ決める</p>
          <p style={styles.closingStep}>❸ 今日やめられそうな消耗を1つだけ決める</p>
          <p style={styles.closingNote}>
            全部一気に変えなくてOK。「まず1つだけ」で十分です。
          </p>
        </div>

        <button style={styles.restartBtn} onClick={restart}>
          もう一度診断する
        </button>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(160deg, #FDF6F0 0%, #F5EDE4 40%, #EDE4DA 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "24px 16px",
    fontFamily: "'Noto Sans JP', 'Hiragino Sans', sans-serif",
  },

  // INTRO
  introCard: {
    background: "#fff",
    borderRadius: 20,
    padding: "48px 32px 36px",
    maxWidth: 420,
    width: "100%",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 4px 24px rgba(139,107,91,0.08)",
  },
  introDecoTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    background: "linear-gradient(90deg, #D4637A, #E07B54, #C4884D, #7BAF6E, #5BA4C9, #8B6BBF)",
  },
  introLabel: {
    fontSize: 12,
    letterSpacing: 3,
    color: "#A08B7A",
    textTransform: "uppercase",
    marginBottom: 12,
  },
  introTitle: {
    fontSize: 26,
    fontWeight: 700,
    color: "#3D3028",
    lineHeight: 1.4,
    marginBottom: 8,
  },
  introTitleAccent: {
    background: "linear-gradient(90deg, #D4637A, #8B6BBF)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    fontSize: 30,
  },
  introTitleSub: {
    fontSize: 14,
    fontWeight: 500,
    color: "#A08B7A",
    letterSpacing: 2,
  },
  introDesc: {
    fontSize: 14,
    color: "#6B5D52",
    lineHeight: 1.8,
    marginTop: 16,
    marginBottom: 24,
  },
  introFeatures: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 28,
    alignItems: "center",
  },
  introFeatureItem: {
    fontSize: 13,
    color: "#5A4D42",
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  introCheck: {
    color: "#7BAF6E",
    fontWeight: 700,
    fontSize: 15,
  },
  startBtn: {
    width: "100%",
    padding: "16px 0",
    borderRadius: 14,
    border: "none",
    background: "linear-gradient(135deg, #D4637A, #E07B54)",
    color: "#fff",
    fontSize: 17,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 2,
    boxShadow: "0 4px 16px rgba(212,99,122,0.25)",
    transition: "transform 0.15s, box-shadow 0.15s",
  },
  introNote: {
    fontSize: 11,
    color: "#B0A090",
    marginTop: 16,
  },

  // QUIZ
  quizCard: {
    background: "#fff",
    borderRadius: 20,
    padding: "32px 28px",
    maxWidth: 420,
    width: "100%",
    boxShadow: "0 4px 24px rgba(139,107,91,0.08)",
  },
  progressArea: {
    marginBottom: 20,
  },
  progressBarBg: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#EDE4DA",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
    transition: "width 0.4s ease",
  },
  progressText: {
    fontSize: 12,
    color: "#A08B7A",
    textAlign: "right",
    marginTop: 6,
  },
  typeBadge: {
    display: "inline-block",
    fontSize: 13,
    fontWeight: 600,
    padding: "6px 14px",
    borderRadius: 20,
    border: "1px solid",
    marginBottom: 24,
  },
  questionArea: {
    transition: "opacity 0.2s ease, transform 0.2s ease",
    marginBottom: 32,
  },
  questionNumber: {
    fontSize: 13,
    color: "#A08B7A",
    marginBottom: 8,
    fontWeight: 600,
  },
  questionTotal: {
    fontWeight: 400,
    color: "#C4B8AD",
  },
  questionText: {
    fontSize: 20,
    fontWeight: 700,
    color: "#3D3028",
    lineHeight: 1.5,
  },
  answerArea: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  answerBtn: {
    padding: "16px 0",
    borderRadius: 14,
    border: "none",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    letterSpacing: 1,
    transition: "transform 0.1s",
  },
  answerBtnOutline: {
    padding: "16px 0",
    borderRadius: 14,
    border: "2px solid",
    backgroundColor: "transparent",
    fontSize: 16,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: 1,
    transition: "transform 0.1s",
  },

  // RESULT
  resultCard: {
    background: "#fff",
    borderRadius: 20,
    padding: "36px 24px 28px",
    maxWidth: 480,
    width: "100%",
    boxShadow: "0 4px 24px rgba(139,107,91,0.08)",
  },
  resultLabel: {
    fontSize: 12,
    letterSpacing: 3,
    color: "#A08B7A",
    textAlign: "center",
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 700,
    color: "#3D3028",
    textAlign: "center",
    lineHeight: 1.4,
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 13,
    color: "#8B7D72",
    textAlign: "center",
    lineHeight: 1.6,
    marginBottom: 28,
  },
  resultsList: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  resultItem: {
    borderRadius: 14,
    overflow: "hidden",
    border: "1px solid #EDE4DA",
  },
  resultItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    cursor: "pointer",
    transition: "background 0.15s",
    backgroundColor: "#FDFBF9",
    flexWrap: "wrap",
    gap: 8,
  },
  resultItemLeft: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    flex: "1 1 auto",
    minWidth: 0,
  },
  resultEmoji: {
    fontSize: 28,
    flexShrink: 0,
  },
  resultItemName: {
    fontSize: 15,
    fontWeight: 700,
    color: "#3D3028",
  },
  resultItemSub: {
    fontSize: 11,
    color: "#A08B7A",
    marginTop: 2,
  },
  resultItemRight: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  resultScore: {
    display: "flex",
    alignItems: "baseline",
  },
  resultScoreNum: {
    fontSize: 24,
    fontWeight: 800,
  },
  resultScoreDenom: {
    fontSize: 13,
    color: "#B0A090",
    fontWeight: 500,
  },
  levelBadge: {
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 10,
    border: "1px solid",
    whiteSpace: "nowrap",
  },
  expandArrow: {
    fontSize: 10,
    color: "#B0A090",
    transition: "transform 0.2s",
  },
  detailPanel: {
    padding: "4px 20px 20px",
    backgroundColor: "#FDFBF9",
  },
  detailSection: {
    marginBottom: 16,
  },
  detailHeading: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
    letterSpacing: 1,
  },
  detailItem: {
    fontSize: 13,
    color: "#5A4D42",
    lineHeight: 1.7,
    paddingLeft: 4,
  },
  minimumBox: {
    padding: "16px",
    borderRadius: 12,
    border: "1px solid",
  },
  minimumLabel: {
    fontSize: 13,
    fontWeight: 700,
    marginBottom: 8,
  },
  minimumText: {
    fontSize: 14,
    color: "#3D3028",
    lineHeight: 1.7,
    whiteSpace: "pre-line",
  },
  noResult: {
    padding: "32px 16px",
    textAlign: "center",
  },
  noResultText: {
    fontSize: 14,
    color: "#8B7D72",
    lineHeight: 1.8,
  },
  closingBox: {
    marginTop: 28,
    padding: "20px",
    backgroundColor: "#FDF6F0",
    borderRadius: 14,
    textAlign: "center",
  },
  closingTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: "#3D3028",
    marginBottom: 12,
  },
  closingStep: {
    fontSize: 14,
    color: "#5A4D42",
    lineHeight: 2,
  },
  closingNote: {
    fontSize: 13,
    color: "#A08B7A",
    marginTop: 12,
    fontStyle: "italic",
  },
  restartBtn: {
    width: "100%",
    marginTop: 20,
    padding: "14px 0",
    borderRadius: 14,
    border: "2px solid #D4C4B8",
    backgroundColor: "transparent",
    color: "#8B7D72",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    letterSpacing: 1,
  },
  footer: {
    width: "100%",
    textAlign: "center",
    fontSize: 10,
    color: "#C4B8AD",
    marginTop: 20,
    paddingBottom: 8,
    letterSpacing: 1,
  },
};

export default FatigueApp;


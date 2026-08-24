import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
} from "react-native";

import Svg, {
  Line,
  Polyline,
  Circle,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";

/* =========================================================
   AİMR PRO — PREMIUM MOBILE DASHBOARD
   Expo Go / Snack
   ========================================================= */

const COLORS = {
  bg: "#020810",
  panel: "#061320",
  panel2: "#08192A",
  panel3: "#0A2033",
  border: "#164A73",
  borderSoft: "#123650",

  white: "#F5F8FB",
  text: "#CFDAE3",
  muted: "#71879A",
  muted2: "#496477",

  green: "#66DB52",
  green2: "#25D990",
  cyan: "#20D4D8",
  blue: "#289BFF",
  purple: "#9472E9",
  gold: "#FFB72C",
  orange: "#E68127",
  red: "#FF4E55",
};

/* =========================================================
   DATA
   Not:
   Getiri = sadece YIELD
   CF = nakit / yatırımcı
   GR = pay / portföy teyidi
   ========================================================= */

const FUNDS = [
  {
    rank: 1,
    code: "THF",
    badge: "ANA LİDER",
    score: 98,
    accent: COLORS.gold,

    yield: {
      day: "+%0,56",
      week: "+%7,21",
      month: "+%16,83",
      quarter: "+%21,98",
    },

    demand: {
      d1: ["+%36,57", "+%19,48"],
      d5: ["+%77,91", "+%190,80"],
      d10: ["+%91,27", "+%769,77"],
      d30: ["+%93,22", "+%976,47"],
    },

    size: "35,80 Mlr TL",
    investors: "70.530",
    gr30: "+%3.055,59",
    trend: "Hızlanıyor",

    chart: [12, 16, 19, 25, 23, 32, 38, 43, 39, 53, 58, 61, 70, 74, 83, 80, 91, 98],

    comment:
      "Büyük ölçeğe rağmen talep gücü hâlâ olağanüstü. Fon, hem nakit hem yatırımcı ilgisinde tarama evreninin açık ara lideri.",
  },

  {
    rank: 2,
    code: "KHA",
    badge: "TAM ROKET",
    score: 91,
    accent: COLORS.cyan,

    yield: {
      day: "+%0,78",
      week: "+%4,25",
      month: "+%12,35",
      quarter: "+%40,89",
    },

    demand: {
      d1: ["+%7,97", "+%2,59"],
      d5: ["+%32,05", "+%20,51"],
      d10: ["+%52,99", "+%51,13"],
      d30: ["+%63,68", "+%84,75"],
    },

    size: "6,18 Mlr TL",
    investors: "34.647",
    gr30: "+%189,90",
    trend: "Hızlanıyor",

    chart: [17, 19, 24, 21, 29, 31, 39, 37, 46, 48, 55, 53, 66, 72, 68, 80, 85, 91],

    comment:
      "Getiri tarafı güçlü, talep akışı sağlıklı. ICH’ye göre daha büyük ölçek ve daha geniş yatırımcı tabanı nedeniyle ikinci sırada.",
  },

  {
    rank: 3,
    code: "ICH",
    badge: "TAM ROKET",
    score: 88,
    accent: COLORS.orange,

    yield: {
      day: "+%0,25",
      week: "+%2,39",
      month: "+%8,03",
      quarter: "+%21,49",
    },

    demand: {
      d1: ["+%8,97", "+%3,49"],
      d5: ["+%34,31", "+%24,72"],
      d10: ["+%60,22", "+%81,79"],
      d30: ["+%73,73", "+%158,59"],
    },

    size: "1,11 Mlr TL",
    investors: "4.303",
    gr30: "+%306,35",
    trend: "Hızlanıyor",

    chart: [14, 17, 22, 28, 25, 35, 32, 43, 46, 41, 51, 58, 62, 66, 72, 80, 83, 88],

    comment:
      "Talep gücü yüksek. Getiri kapıları geçiliyor ancak performans marjı THF ve KHA kadar geniş değil.",
  },
];

const RADAR = [
  {
    code: "FSU",
    score: "8/10",
    a: "1H  +%5,72",
    b: "1A  +%8,49",
    c: "30G Nakit/Fon  +%33,89",
    d: "30G Yatırımcı  -%4,46",
    missing: "Yatırımcı Katılım Teyidi",
  },
  {
    code: "GZG",
    score: "8/10",
    a: "1H  +%4,53",
    b: "1A  +%8,12",
    c: "30G Yatırımcı  +%20,57",
    d: "30G Nakit/Fon  +%3,11",
    missing: "Nakit Yığılması Yetersiz",
  },
  {
    code: "KNJ",
    score: "8/10",
    a: "1H  +%3,37",
    b: "1A  +%7,22",
    c: "30G Nakit Sırası  #9",
    d: "30G Yatırımcı Sırası  #8",
    missing: "Aylık Getiri Eşiği ve Nakit/Fon Oranı",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

function SectionTitle({ icon, title, subtitle }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.sectionIcon}>{icon}</Text>

      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>

        {!!subtitle && (
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        )}
      </View>
    </View>
  );
}

function Pill({ text, color = COLORS.green }) {
  return (
    <View
      style={[
        styles.pill,
        {
          borderColor: color + "66",
          backgroundColor: color + "16",
        },
      ]}
    >
      <View
        style={[
          styles.pillDot,
          { backgroundColor: color },
        ]}
      />

      <Text style={[styles.pillText, { color }]}>
        {text}
      </Text>
    </View>
  );
}

/* =========================================================
   GAUGE
   ========================================================= */

function Gauge({
  value,
  title,
  status,
  color,
}) {
  const segments = 15;
  const cx = 60;
  const cy = 61;

  const active =
    Math.round((value / 100) * segments);

  const needleAngle =
    Math.PI + (Math.PI * value) / 100;

  const nx =
    cx + Math.cos(needleAngle) * 36;

  const ny =
    cy + Math.sin(needleAngle) * 36;

  return (
    <View style={styles.gaugeCard}>
      <Text style={styles.gaugeTitle}>
        {title}
      </Text>

      <Svg
        width={120}
        height={72}
        viewBox="0 0 120 72"
      >
        {Array.from({
          length: segments,
        }).map((_, i) => {
          const angle =
            Math.PI +
            (Math.PI * i) /
              (segments - 1);

          const r1 = 43;
          const r2 = 52;

          const x1 =
            cx + Math.cos(angle) * r1;

          const y1 =
            cy + Math.sin(angle) * r1;

          const x2 =
            cx + Math.cos(angle) * r2;

          const y2 =
            cy + Math.sin(angle) * r2;

          return (
            <Line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={
                i < active
                  ? color
                  : "#1C3446"
              }
              strokeWidth="7"
              strokeLinecap="round"
            />
          );
        })}

        <Line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
        />

        <Circle
          cx={cx}
          cy={cy}
          r="4"
          fill={color}
        />
      </Svg>

      <View style={styles.gaugeValueWrap}>
        <Text
          style={[
            styles.gaugeValue,
            { color: COLORS.white },
          ]}
        >
          {value}
        </Text>

        <Text style={styles.gauge100}>
          /100
        </Text>
      </View>

      <Text
        style={[
          styles.gaugeStatus,
          { color },
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

/* =========================================================
   SPARKLINE
   ========================================================= */

function Sparkline({
  values,
  color = COLORS.blue,
}) {
  const width = 150;
  const height = 64;
  const pad = 6;

  const min = Math.min(...values);
  const max = Math.max(...values);

  const points = values
    .map((v, i) => {
      const x =
        pad +
        (i / (values.length - 1)) *
          (width - pad * 2);

      const y =
        height -
        pad -
        ((v - min) /
          Math.max(max - min, 1)) *
          (height - pad * 2);

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Svg
      width="100%"
      height={64}
      viewBox={`0 0 ${width} ${height}`}
    >
      <Defs>
        <LinearGradient
          id="chartFade"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <Stop
            offset="0"
            stopColor={color}
            stopOpacity="0.35"
          />

          <Stop
            offset="1"
            stopColor={color}
            stopOpacity="0"
          />
        </LinearGradient>
      </Defs>

      {[14, 28, 42, 56].map(y => (
        <Line
          key={y}
          x1="0"
          x2={width}
          y1={y}
          y2={y}
          stroke="#14334A"
          strokeWidth="0.7"
          strokeDasharray="3 3"
        />
      ))}

      <Polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2.1"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </Svg>
  );
}

/* =========================================================
   KPI CARD
   ========================================================= */

function KPI({
  icon,
  title,
  value,
  color,
}) {
  return (
    <View style={styles.kpiCard}>
      <Text style={[styles.kpiIcon, { color }]}>
        {icon}
      </Text>

      <View style={{ flex: 1 }}>
        <Text style={styles.kpiTitle}>
          {title}
        </Text>

        <Text
          style={[
            styles.kpiValue,
            { color },
          ]}
        >
          {value}
        </Text>
      </View>
    </View>
  );
}

/* =========================================================
   FUND CARD
   ========================================================= */

function FundCard({ fund }) {
  return (
    <View
      style={[
        styles.fundCard,
        {
          borderColor:
            fund.rank === 1
              ? COLORS.gold + "99"
              : COLORS.border,
        },
      ]}
    >
      {/* Top */}
      <View style={styles.fundHeader}>
        <View
          style={[
            styles.rankBadge,
            {
              backgroundColor:
                fund.accent + "22",
              borderColor:
                fund.accent + "88",
            },
          ]}
        >
          <Text
            style={[
              styles.rankNumber,
              { color: fund.accent },
            ]}
          >
            {fund.rank}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.fundCode}>
            {fund.code}
          </Text>

          <View
            style={[
              styles.fundStatus,
              {
                backgroundColor:
                  fund.accent + "20",
              },
            ]}
          >
            <Text
              style={[
                styles.fundStatusText,
                {
                  color: fund.accent,
                },
              ]}
            >
              {fund.badge}
            </Text>
          </View>
        </View>

        <View style={styles.scoreBox}>
          <Text style={styles.scoreCaption}>
            MODEL SKORU
          </Text>

          <View style={styles.scoreLine}>
            <Text
              style={[
                styles.scoreNumber,
                {
                  color:
                    fund.rank === 1
                      ? COLORS.green
                      : COLORS.white,
                },
              ]}
            >
              {fund.score}
            </Text>

            <Text style={styles.scoreSuffix}>
              /100
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.cardDivider} />

      {/* Yield */}
      <Text style={styles.blockTitle}>
        GETİRİ MİMARİSİ
        <Text style={styles.sourceText}>
          {" "}
          (YIELD)
        </Text>
      </Text>

      <View style={styles.yieldRow}>
        <YieldCell
          label="Gün"
          value={fund.yield.day}
        />

        <YieldCell
          label="1 Hafta"
          value={fund.yield.week}
        />

        <YieldCell
          label="1 Ay"
          value={fund.yield.month}
        />

        <YieldCell
          label="3 Ay"
          value={fund.yield.quarter}
        />
      </View>

      {/* Demand */}
      <Text
        style={[
          styles.blockTitle,
          { marginTop: 14 },
        ]}
      >
        FON TALEP ANALİZİ
        <Text style={styles.sourceText}>
          {" "}
          (NAKİT / YATIRIMCI)
        </Text>
      </Text>

      <View style={styles.demandRow}>
        <DemandCell
          label="1G"
          values={fund.demand.d1}
        />

        <DemandCell
          label="5G"
          values={fund.demand.d5}
        />

        <DemandCell
          label="10G"
          values={fund.demand.d10}
        />

        <DemandCell
          label="30G"
          values={fund.demand.d30}
        />
      </View>

      {/* Profile */}
      <View style={styles.profileGrid}>
        <ProfileCell
          label="Fon Büyüklüğü"
          value={fund.size}
        />

        <ProfileCell
          label="Son Yatırımcı"
          value={fund.investors}
        />

        <ProfileCell
          label="GR30"
          value={fund.gr30}
          positive
        />

        <ProfileCell
          label="Trend"
          value={`↗ ${fund.trend}`}
          positive
        />
      </View>

      {/* Chart */}
      <View style={styles.chartPanel}>
        <View style={styles.chartTop}>
          <Text style={styles.chartTitle}>
            MOMENTUM İVME GRAFİĞİ
          </Text>

          <Pill
            text="YUKARI"
            color={COLORS.green}
          />
        </View>

        <Sparkline
          values={fund.chart}
          color={
            fund.rank === 2
              ? COLORS.cyan
              : COLORS.blue
          }
        />
      </View>

      {/* Comment */}
      <View style={styles.commentBox}>
        <Text style={styles.commentTitle}>
          PORTFÖY KOMİTESİ GÖRÜŞÜ
        </Text>

        <Text style={styles.commentText}>
          {fund.comment}
        </Text>
      </View>
    </View>
  );
}

function YieldCell({ label, value }) {
  return (
    <View style={styles.yieldCell}>
      <Text style={styles.cellLabel}>
        {label}
      </Text>

      <Text style={styles.cellGreen}>
        {value}
      </Text>
    </View>
  );
}

function DemandCell({
  label,
  values,
}) {
  return (
    <View style={styles.demandCell}>
      <Text style={styles.cellLabel}>
        {label}
      </Text>

      <Text style={styles.cellGreen}>
        {values[0]}
      </Text>

      <Text style={styles.cellBlue}>
        {values[1]}
      </Text>
    </View>
  );
}

function ProfileCell({
  label,
  value,
  positive,
}) {
  return (
    <View style={styles.profileCell}>
      <Text style={styles.profileLabel}>
        {label}
      </Text>

      <Text
        style={[
          styles.profileValue,
          positive && {
            color: COLORS.green,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
}

/* =========================================================
   RADAR
   ========================================================= */

function RadarCard() {
  return (
    <View style={styles.bottomCard}>
      <SectionTitle
        icon="⌖"
        title="RADAR ALANI"
        subtitle="Portföye en yakın adaylar"
      />

      {RADAR.map((item, index) => (
        <View
          key={item.code}
          style={[
            styles.radarItem,
            index !== 0 && {
              marginTop: 9,
            },
          ]}
        >
          <View style={styles.radarTop}>
            <Text style={styles.radarCode}>
              {item.code}
            </Text>

            <Text style={styles.radarScore}>
              {item.score}
            </Text>
          </View>

          <View style={styles.radarMetrics}>
            <Text style={styles.radarText}>
              {item.a}
            </Text>

            <Text style={styles.radarText}>
              {item.b}
            </Text>

            <Text style={styles.radarPositive}>
              {item.c}
            </Text>

            <Text
              style={[
                styles.radarText,
                item.d.includes("-")
                  ? { color: COLORS.red }
                  : {
                      color:
                        COLORS.green,
                    },
              ]}
            >
              {item.d}
            </Text>
          </View>

          <View style={styles.missingBox}>
            <Text style={styles.missingLabel}>
              EKSİK HALKA
            </Text>

            <Text style={styles.missingText}>
              {item.missing}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

/* =========================================================
   ALARMS
   ========================================================= */

function AlarmCard() {
  const alarms = [
    "1 Ay Getiri Alarmı",
    "1 Hafta Negatif Alarm",
    "5G Nakit Kaçışı",
    "5G Yatırımcı Kaçışı",
    "10G Yapısal Bozulma",
    "30G Talep Çözülmesi",
    "GR Bozulma Alarmı",
    "Trend Zayıflaması",
  ];

  return (
    <View style={styles.bottomCard}>
      <SectionTitle
        icon="◇"
        title="ALARM RADARI"
        subtitle="Risk ve çözülme kontrolü"
      />

      {alarms.map((alarm) => (
        <View
          key={alarm}
          style={styles.alarmRow}
        >
          <View style={styles.checkCircle}>
            <Text style={styles.check}>
              ✓
            </Text>
          </View>

          <Text style={styles.alarmName}>
            {alarm}
          </Text>

          <Text style={styles.alarmOk}>
            YOK
          </Text>
        </View>
      ))}
    </View>
  );
}

/* =========================================================
   FUNNEL
   ========================================================= */

function FunnelCard() {
  const rows = [
    ["Taranan Fon", "1.048", 1],
    ["Tam Veri", "1.040", 0.91],
    ["Uygun Kategori", "463", 0.79],
    ["Geçerli Veri Seti", "439", 0.68],
    ["Ölçek Filtresi Sonrası", "198", 0.55],
    ["Tam Roket", "3", 0.4],
  ];

  return (
    <View style={styles.bottomCard}>
      <SectionTitle
        icon="▥"
        title="EVREN ELEME AKIŞI"
        subtitle="1.048 fondan nihai seçime"
      />

      <View style={styles.funnelWrap}>
        {rows.map(
          ([label, value, width], i) => (
            <View
              key={label}
              style={[
                styles.funnelRow,
                {
                  width: `${width * 100}%`,
                  backgroundColor:
                    i === rows.length - 1
                      ? "#0B5D38"
                      : `rgba(22, 81, ${
                          125 + i * 12
                        }, ${0.75 - i * 0.07})`,
                },
              ]}
            >
              <Text
                style={styles.funnelLabel}
              >
                {label}
              </Text>

              <Text
                style={styles.funnelValue}
              >
                {value}
              </Text>
            </View>
          )
        )}
      </View>
    </View>
  );
}

/* =========================================================
   MAIN APP
   ========================================================= */

export default function App() {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.bg}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scroll}
        contentContainerStyle={
          styles.content
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.menuIcon}>
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
            <View style={styles.menuLine} />
          </View>

          <View style={styles.headerCenter}>
            <Text style={styles.logo}>
              AİMR PRO 🚀
            </Text>

            <Text style={styles.logoSubtitle}>
              GÜNLÜK ROKET FON KARAR PANOSU
            </Text>

            <Text style={styles.logoSmall}>
              Stratejik Fon İstihbarat Özeti
            </Text>
          </View>

          <Pill
            text="SİSTEM AKTİF"
            color={COLORS.green}
          />
        </View>

        {/* Main Decision */}
        <View style={styles.decisionCard}>
          <View style={styles.shield}>
            <Text style={styles.shieldIcon}>
              ✓
            </Text>
          </View>

          <View style={styles.decisionCenter}>
            <Text style={styles.decisionLabel}>
              BUGÜNÜN KARARI
            </Text>

            <Text style={styles.decisionMain}>
              İŞLEM YOK
            </Text>

            <Text style={styles.decisionSub}>
              PORTFÖY KORUNUYOR
            </Text>
          </View>

          <View style={styles.decisionComment}>
            <Text style={styles.decisionText}>
              Mevcut üç fon da Tam Roket
              statüsünü koruyor.
            </Text>

            <Text
              style={[
                styles.decisionText,
                {
                  color: COLORS.green,
                  fontWeight: "800",
                },
              ]}
            >
              THF açık ara ana lider
              konumunda.
            </Text>

            <Text style={styles.decisionText}>
              KHA ve ICH güçlü şekilde
              destekleyici.
            </Text>

            <Text style={styles.decisionText}>
              Satış veya rotasyon gerektiren
              bozulma görülmüyor.
            </Text>
          </View>
        </View>

        {/* KPI */}
        <View style={styles.kpiGrid}>
          <KPI
            icon="🚀"
            title="TAM ROKET"
            value="3"
            color={COLORS.blue}
          />

          <KPI
            icon="◆"
            title="PORTFÖYDE FON"
            value="3"
            color={COLORS.gold}
          />

          <KPI
            icon="◇"
            title="KRİTİK ALARM"
            value="0"
            color={COLORS.red}
          />

          <KPI
            icon="◎"
            title="YAKIN ADAY"
            value="1"
            color={COLORS.red}
          />

          <KPI
            icon="♙"
            title="TARAMA EVRENİ"
            value="198"
            color={COLORS.blue}
          />
        </View>

        {/* Gauge row */}
        <View style={styles.gaugePanel}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={
              false
            }
          >
            <Gauge
              title={"MOMENTUM\nİVME ANALİZİ"}
              value={93}
              status="ÇOK GÜÇLÜ"
              color={COLORS.green}
            />

            <Gauge
              title={"NAKİT GÜCÜ\nENDEKSİ"}
              value={96}
              status="ÇOK GÜÇLÜ"
              color={COLORS.cyan}
            />

            <Gauge
              title={"YATIRIMCI İŞTAHI\nENDEKSİ"}
              value={95}
              status="ÇOK GÜÇLÜ"
              color={COLORS.blue}
            />

            <Gauge
              title={"TREND DEVAMLILIK\nANALİZİ"}
              value={89}
              status="SAĞLIKLI"
              color={COLORS.purple}
            />

            <Gauge
              title={"PORTFÖY DAYANIKLILIK\nSKORU"}
              value={94}
              status="GÜÇLÜ"
              color={COLORS.gold}
            />
          </ScrollView>
        </View>

        {/* Rockets */}
        <SectionTitle
          icon="🚀"
          title="ROKET SIRALAMASI"
          subtitle="Modelin bugünkü en güçlü fon sinyalleri"
        />

        {FUNDS.map((fund) => (
          <FundCard
            key={fund.code}
            fund={fund}
          />
        ))}

        {/* Bottom */}
        <RadarCard />

        <AlarmCard />

        <FunnelCard />

        {/* Portfolio Footer */}
        <View style={styles.portfolioCard}>
          <Text
            style={styles.portfolioLabel}
          >
            PORTFÖY
          </Text>

          <Text
            style={styles.portfolioFunds}
          >
            THF
            <Text style={styles.dash}>
              {" "}
              –{" "}
            </Text>
            KHA
            <Text style={styles.dash}>
              {" "}
              –{" "}
            </Text>
            ICH
          </Text>

          <View style={styles.actionRow}>
            <ActionCell
              title="SATIŞ"
              value="YOK"
            />

            <ActionCell
              title="ROTASYON"
              value="YOK"
            />

            <ActionCell
              title="YENİ ALIM"
              value="YOK"
            />
          </View>
        </View>

        {/* Final */}
        <View style={styles.finalCard}>
          <View style={styles.targetIcon}>
            <Text style={styles.targetText}>
              ◎
            </Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.finalLabel}>
              NİHAİ SONUÇ
            </Text>

            <Text style={styles.finalValue}>
              İŞLEM YOK
            </Text>

            <Text style={styles.finalSummary}>
              THF liderliğini güçlendirerek
              koruyor. KHA ve ICH Tam Roket
              yapısını sürdürüyor. Mevcut
              portföye üstünlük kuran yeni bir
              fon henüz oluşmadı.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          AİMR PRO • FUND INTELLIGENCE
          SYSTEM
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionCell({
  title,
  value,
}) {
  return (
    <View style={styles.actionCell}>
      <Text style={styles.actionTitle}>
        {title}
      </Text>

      <Text style={styles.actionValue}>
        {value}
      </Text>
    </View>
  );
}

/* =========================================================
   STYLES
   ========================================================= */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },

  scroll: {
    backgroundColor: COLORS.bg,
  },

  content: {
    padding: 12,
    paddingBottom: 42,
  },

  /* Header */

  header: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  menuIcon: {
    width: 28,
    gap: 5,
  },

  menuLine: {
    height: 2,
    backgroundColor: "#BDD0DE",
    borderRadius: 3,
  },

  headerCenter: {
    flex: 1,
    alignItems: "center",
  },

  logo: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
    letterSpacing: 1.1,
  },

  logoSubtitle: {
    color: COLORS.gold,
    fontSize: 11,
    fontWeight: "900",
    marginTop: 4,
    letterSpacing: 0.4,
  },

  logoSmall: {
    color: "#B6C4CF",
    fontSize: 9,
    marginTop: 4,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 6,
  },

  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 6,
  },

  pillText: {
    fontSize: 7,
    fontWeight: "900",
  },

  /* Decision */

  decisionCard: {
    backgroundColor: "#071629",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    gap: 13,
    alignItems: "center",
  },

  shield: {
    width: 62,
    height: 62,
    borderRadius: 36,
    borderWidth: 2,
    borderColor: COLORS.green + "88",
    alignItems: "center",
    justifyContent: "center",
  },

  shieldIcon: {
    color: COLORS.green,
    fontSize: 32,
    fontWeight: "900",
  },

  decisionCenter: {
    width: 112,
  },

  decisionLabel: {
    color: COLORS.white,
    fontSize: 8,
    fontWeight: "900",
  },

  decisionMain: {
    color: COLORS.green,
    fontSize: 25,
    fontWeight: "900",
    marginTop: 5,
  },

  decisionSub: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 4,
  },

  decisionComment: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: COLORS.border,
    paddingLeft: 12,
    gap: 3,
  },

  decisionText: {
    color: COLORS.text,
    fontSize: 8,
    lineHeight: 13,
  },

  /* KPI */

  kpiGrid: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
  },

  kpiCard: {
    flexGrow: 1,
    minWidth: "31%",
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 9,
    padding: 9,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  kpiIcon: {
    fontSize: 20,
  },

  kpiTitle: {
    color: COLORS.text,
    fontSize: 7,
    fontWeight: "800",
  },

  kpiValue: {
    fontSize: 20,
    fontWeight: "900",
  },

  /* Gauge */

  gaugePanel: {
    marginTop: 10,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 10,
  },

  gaugeCard: {
    width: 132,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.borderSoft,
    paddingHorizontal: 6,
  },

  gaugeTitle: {
    minHeight: 30,
    textAlign: "center",
    color: COLORS.text,
    fontSize: 8,
    lineHeight: 12,
    fontWeight: "900",
  },

  gaugeValueWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: -26,
  },

  gaugeValue: {
    fontSize: 24,
    fontWeight: "900",
  },

  gauge100: {
    color: COLORS.muted,
    fontSize: 8,
    marginBottom: 4,
  },

  gaugeStatus: {
    marginTop: 7,
    fontSize: 9,
    fontWeight: "900",
  },

  /* Section */

  sectionHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
    marginTop: 19,
    marginBottom: 9,
  },

  sectionIcon: {
    fontSize: 19,
  },

  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 0.5,
  },

  sectionSubtitle: {
    color: COLORS.muted,
    fontSize: 8,
    marginTop: 2,
  },

  /* Fund */

  fundCard: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderRadius: 13,
    padding: 13,
    marginBottom: 10,
  },

  fundHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  rankBadge: {
    width: 38,
    height: 46,
    borderWidth: 1,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },

  rankNumber: {
    fontSize: 21,
    fontWeight: "900",
  },

  fundCode: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: "900",
  },

  fundStatus: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 4,
    marginTop: 3,
  },

  fundStatusText: {
    fontSize: 7,
    fontWeight: "900",
  },

  scoreBox: {
    alignItems: "flex-end",
  },

  scoreCaption: {
    color: COLORS.muted,
    fontSize: 6,
    fontWeight: "800",
  },

  scoreLine: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  scoreNumber: {
    fontSize: 30,
    fontWeight: "900",
  },

  scoreSuffix: {
    color: COLORS.text,
    fontSize: 10,
    marginBottom: 5,
  },

  cardDivider: {
    height: 1,
    backgroundColor: COLORS.borderSoft,
    marginVertical: 11,
  },

  blockTitle: {
    color: COLORS.text,
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
    textAlign: "center",
  },

  sourceText: {
    color: COLORS.muted,
    fontSize: 7,
  },

  yieldRow: {
    flexDirection: "row",
    marginTop: 7,
  },

  yieldCell: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.borderSoft,
  },

  demandRow: {
    flexDirection: "row",
    marginTop: 8,
  },

  demandCell: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.borderSoft,
  },

  cellLabel: {
    color: COLORS.muted,
    fontSize: 7,
  },

  cellGreen: {
    color: COLORS.green,
    fontSize: 9,
    fontWeight: "900",
    marginTop: 3,
  },

  cellBlue: {
    color: COLORS.cyan,
    fontSize: 8,
    fontWeight: "800",
    marginTop: 2,
  },

  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    marginTop: 13,
  },

  profileCell: {
    width: "48.8%",
    backgroundColor: "#081A29",
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    borderRadius: 7,
    padding: 9,
  },

  profileLabel: {
    color: COLORS.muted,
    fontSize: 7,
  },

  profileValue: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 4,
  },

  chartPanel: {
    marginTop: 10,
    backgroundColor: "#061522",
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    borderRadius: 8,
    padding: 9,
  },

  chartTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  chartTitle: {
    color: COLORS.muted,
    fontSize: 7,
    fontWeight: "900",
  },

  commentBox: {
    marginTop: 9,
    borderLeftWidth: 2,
    borderLeftColor: COLORS.gold,
    backgroundColor: "#091926",
    padding: 10,
  },

  commentTitle: {
    color: COLORS.gold,
    fontSize: 7,
    fontWeight: "900",
  },

  commentText: {
    color: COLORS.text,
    fontSize: 8,
    lineHeight: 13,
    marginTop: 4,
  },

  /* Bottom Cards */

  bottomCard: {
    marginTop: 10,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 12,
  },

  /* Radar */

  radarItem: {
    backgroundColor: "#071725",
    borderWidth: 1,
    borderColor: COLORS.borderSoft,
    borderRadius: 8,
    padding: 9,
  },

  radarTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  radarCode: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "900",
  },

  radarScore: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "800",
  },

  radarMetrics: {
    marginTop: 6,
    gap: 3,
  },

  radarText: {
    color: COLORS.text,
    fontSize: 8,
  },

  radarPositive: {
    color: COLORS.green,
    fontSize: 8,
    fontWeight: "800",
  },

  missingBox: {
    marginTop: 7,
    backgroundColor: "#111A23",
    borderLeftWidth: 2,
    borderLeftColor: COLORS.gold,
    padding: 7,
  },

  missingLabel: {
    color: COLORS.gold,
    fontSize: 6,
    fontWeight: "900",
  },

  missingText: {
    color: COLORS.text,
    fontSize: 8,
    marginTop: 2,
  },

  /* Alarm */

  alarmRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderSoft,
  },

  checkCircle: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  check: {
    color: COLORS.green,
    fontSize: 10,
    fontWeight: "900",
  },

  alarmName: {
    flex: 1,
    color: COLORS.text,
    fontSize: 8,
    marginLeft: 8,
  },

  alarmOk: {
    color: COLORS.green,
    fontSize: 8,
    fontWeight: "900",
  },

  /* Funnel */

  funnelWrap: {
    alignItems: "center",
    marginTop: 7,
    gap: 2,
  },

  funnelRow: {
    minHeight: 35,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  funnelLabel: {
    color: COLORS.white,
    fontSize: 8,
  },

  funnelValue: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "900",
  },

  /* Portfolio */

  portfolioCard: {
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    marginTop: 10,
    alignItems: "center",
  },

  portfolioLabel: {
    color: COLORS.text,
    fontSize: 10,
  },

  portfolioFunds: {
    color: COLORS.green,
    fontSize: 18,
    fontWeight: "900",
    marginTop: 4,
  },

  dash: {
    color: COLORS.muted,
  },

  actionRow: {
    flexDirection: "row",
    width: "100%",
    marginTop: 12,
  },

  actionCell: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: COLORS.borderSoft,
  },

  actionTitle: {
    color: COLORS.muted,
    fontSize: 7,
  },

  actionValue: {
    color: COLORS.green,
    fontSize: 13,
    fontWeight: "900",
    marginTop: 4,
  },

  /* Final */

  finalCard: {
    marginTop: 10,
    backgroundColor: "#061827",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 14,
    flexDirection: "row",
    gap: 13,
  },

  targetIcon: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: COLORS.gold,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },

  targetText: {
    color: COLORS.gold,
    fontSize: 28,
  },

  finalLabel: {
    color: COLORS.text,
    fontSize: 10,
    fontWeight: "800",
  },

  finalValue: {
    color: COLORS.green,
    fontSize: 26,
    fontWeight: "900",
    marginTop: 2,
  },

  finalSummary: {
    color: COLORS.muted,
    fontSize: 8,
    lineHeight: 13,
    marginTop: 6,
  },

  footer: {
    color: COLORS.muted2,
    fontSize: 7,
    textAlign: "center",
    marginTop: 22,
    letterSpacing: 1,
  },
});
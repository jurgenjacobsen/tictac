import React, { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";

// --- Types ---
interface ChartFile {
  name: string;
  url: string;
  date: string;
  category: string;
  aerodrome: string;
  index: string;
  thumb?: string;
}

interface STATIC_AERODROMES {
  icao: string;
  name: string;
  aliases?: string[];
}

// --- Fixed content ---
const STYLE = {
  CHART_TYPE: {
    ANY: 'brand',
    AOI: 'neutral-400',
    SID: 'green-500',
    STAR: 'orange-300',
    AGC: 'pink-400',
    IAC: 'blue-400',
    VAC: 'blue-400',
  }
}

const AERODROMES = [
  { icao: "LPVZ", name: "Viseu" },
  { icao: "LPVL", name: "Vilar de Luz", aliases: ["Maia", "VILUZ"] },
  { icao: "LPVR", name: "Vila Real", aliases: ["VREAL"] }
]

const ChartsPage: React.FC = () => {
  const [charts, setCharts] = useState<ChartFile[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("ALL");
  const [aerodrome, setAerodrome] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  // Format date YYYYMMDD → 08 Nov 2025
  const formatDate = (date: string) => {
    const y = date.slice(0, 4);
    const m = date.slice(4, 6);
    const d = date.slice(6, 8);

    return new Date(`${y}-${m}-${d}`).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Fetch charts from GitHub
  const fetchCharts = async () => {
    const res = await fetch(
      "https://api.github.com/repos/jurgenjacobsen/tictac-charts/contents/Charts"
    );
    const files = await res.json();
    const pdfsRaw = files.filter((f: any) => f.name.endsWith(".pdf"));

    const pdfs: ChartFile[] = [];

    for (let f of pdfsRaw) {
      const [date, category, aerodrome, indexWithExt] = f.name.split(" ");
      const index = indexWithExt.replace(".pdf", "");

      let thumbUrl = `https://raw.githubusercontent.com/jurgenjacobsen/tictac-charts/main/Thumbnails/${f.name.replace(".pdf", ".png")}`;
      try {
        const testThumb = await fetch(thumbUrl)
        if (!testThumb.ok) {
          thumbUrl = `https://raw.githubusercontent.com/jurgenjacobsen/tictac-charts/main/Thumbnails/${f.name.replace(".pdf", ".jpg")}`;
          const testThumb2 = await fetch(thumbUrl)
          if (!testThumb2.ok) {
            thumbUrl = "https://placehold.co/512x512?text=Preview+not+available&font=Poppins";
          }
        }
      } catch (err) {
        thumbUrl = "https://placehold.co/512x512?text=Preview+not+available&font=Poppins";
      }

      pdfs.push({
        name: f.name,
        url: f.download_url,
        date,
        category,
        aerodrome,
        index,
        thumb: thumbUrl,
      });
    }

    setCharts(pdfs);
    if (pdfs.length > 0) setAerodrome(pdfs[0].aerodrome);
  };

  useEffect(() => {
    fetchCharts();
  }, []);

  const toggleSelect = (file: string) => {
    setSelected((prev) =>
      prev.includes(file)
        ? prev.filter((f) => f !== file)
        : [...prev, file]
    );
  };

  const mergePDFs = async () => {
    const selectedCharts = charts.filter((c) => selected.includes(c.name));
    const mergedPdf = await PDFDocument.create();

    for (const chart of selectedCharts) {
      const data = await fetch(chart.url).then((r) => r.arrayBuffer());
      const pdf = await PDFDocument.load(data);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((p) => mergedPdf.addPage(p));
    }

    const mergedBytes = await mergedPdf.save();
    const blob = new Blob([mergedBytes as any], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    const aeroOfMerge =
      selectedCharts.length === 1
        ? selectedCharts[0].aerodrome
        : Array.from(new Set(selectedCharts.map(c => c.aerodrome))).length === 1
          ? selectedCharts[0].aerodrome
          : "MULTI";

    link.download = `${aeroOfMerge}_chart${ selectedCharts.length > 1 ? "s" : "" }.pdf`;
    link.click();
  };

  const filteredCharts =
    filter === "ALL"
      ? charts
      : charts.filter((chart) => chart.category === filter);

  const searchedCharts = filteredCharts.filter(
    (chart) =>
      chart.index.toLowerCase().includes(search.toLowerCase()) ||
      chart.aerodrome.toLowerCase().includes(search.toLowerCase()) ||
      AERODROMES.find(aero =>
        aero.icao.toLowerCase() === chart.aerodrome.toLowerCase() &&
        ((aero.name && aero.name.toLowerCase().includes(search.toLowerCase())) ||
          (aero.aliases && aero.aliases.some(alias => alias.toLowerCase().includes(search.toLowerCase()))))
      ) !== undefined
  );

  // Collect all categories dynamically
  const categories = Array.from(new Set(charts.map((c) => c.category)));

  return (
    <div className="px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-8 relative">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Charts Gallery
          </h1>

          <button
            onClick={fetchCharts}
            className="px-4 py-2 bg-brand text-white rounded hover:bg-brand/80 transition"
          >
            Refresh
          </button>
        </div>

        <div className="flex gap-2 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search by index or aerodrome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-6 py-1 rounded font-semibold ${
              filter === "ALL" ? "bg-brand text-white" : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-1 rounded font-semibold ${
                filter === cat
                  ? `bg-${STYLE.CHART_TYPE[cat as keyof typeof STYLE.CHART_TYPE] || STYLE.CHART_TYPE.ANY} text-white`
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {selected.length > 0 && (
          <div className="fixed bottom-6 right-12 z-50">
            <button
              className="px-5 py-3 bg-brand text-white rounded-lg shadow-lg hover:bg-brand/75 transition"
              onClick={mergePDFs}
            >
              Download {selected.length} selected
            </button>
          </div>
        )}

        {/* Group charts by aerodrome */}
        {Object.entries(
          searchedCharts.reduce((acc: any, chart) => {
            if (!acc[chart.aerodrome]) acc[chart.aerodrome] = [];
            acc[chart.aerodrome].push(chart);
            return acc;
          }, {})
        ).map(([aero, aeroCharts]: [string, typeof charts]) => (
          <div key={aero} className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{aero} {AERODROMES.find(a => a.icao === aero)?.name ? `· ${AERODROMES.find(a => a.icao === aero)?.name}` : ''}</h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {aeroCharts.map((chart, i) => (
                <div
                  key={i}
                  className={`ring-1 rounded-lg overflow-hidden cursor-pointer transition-shadow hover:shadow-md duration-300
                    ${selected.includes(chart.name) ? "ring-2 ring-brand" : "ring-gray-200"}`}
                  onClick={() => toggleSelect(chart.name)}
                >
                  <img src={chart.thumb} className="w-full h-auto max-h-56 object-cover scale-100 " />

                  <div className="px-2 py-4">
                    <span
                      className={`px-6 py-1 text-white text-sm font-semibold rounded bg-${
                        STYLE.CHART_TYPE[chart.category as keyof typeof STYLE.CHART_TYPE] || STYLE.CHART_TYPE.ANY
                      }`}
                    >
                      {chart.category}
                    </span>
                  </div>

                  <h1 className="text-lg font-bold text-gray-900 px-2">{chart.index}</h1>

                  <span className="block px-2 pb-4 text-sm text-gray-600">
                    {formatDate(chart.date)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartsPage;

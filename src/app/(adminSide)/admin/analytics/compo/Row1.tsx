"use client";
import type { CallbackDataParams } from "echarts/types/dist/shared";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Activity,
  Users,
  Clock,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  BarChart3,
  ChevronDown,
  MoreVertical,
} from "lucide-react";
import ReactECharts from "echarts-for-react";
import { EChartsOption } from "echarts";

// ----- Type Definitions -----
interface CustomSelectProps {
  options: string[];
  defaultValue: string;
  className?: string;
  onSelect: (value: string) => void;
}

interface StatsDataItem {
  title: string;
  value: string;
  description: string;
  change: string;
  changeDirection: "up" | "down";
  icon: React.ReactNode;
  color: string;
  timeFilter: boolean;
  timeOptions: string[];
  sessionFilter?: boolean;
  sessionOptions?: string[];
  unit?: string;
  filterVal?: string;
  liveUsers: number;
}

interface EChartsTooltipParam {
  name: string;
  value: number;
  marker: string;
}

type ActiveTabType = "Total" | "Revisit" | "Unique";

// ----- Constants and Helpers -----
const nfCompact = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const nfFull = new Intl.NumberFormat("en-IN");

const fmtCompact = (v: number) =>
  typeof v === "number" ? nfCompact.format(v) : v;
const fmtFull = (v: number) => (typeof v === "number" ? nfFull.format(v) : v);

// ----- Custom Select Component -----
const CustomSelect = React.memo(
  ({ options, defaultValue, className = "", onSelect }: CustomSelectProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(defaultValue);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = useCallback(
      (option: string) => {
        setSelected(option);
        onSelect(option);
        setIsOpen(false);
      },
      [onSelect]
    );

    return (
      <div className={`relative text-xs ${className}`} ref={dropdownRef}>
        <button
          type="button"
          className={`flex items-center justify-between w-full px-4 py-2.5 bg-white rounded-lg border border-gray-300 hover:border-indigo-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium ${
            isOpen ? "ring-2 ring-indigo-500 border-indigo-500 shadow-md" : ""
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <span className="truncate text-gray-700">{selected}</span>
          <ChevronDown
            size={14}
            className={`transform transition-all text-gray-500 ${
              isOpen ? "rotate-180 text-indigo-600" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-xl overflow-hidden">
            <div className="py-1 max-h-60 overflow-auto">
              {options.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  className={`block w-full text-left px-4 py-2.5 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:bg-indigo-50 focus:text-indigo-700 transition-colors font-medium ${
                    selected === option ? "bg-indigo-100 text-indigo-700" : "text-gray-700"
                  }`}
                  onClick={() => handleSelect(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }
);

CustomSelect.displayName = "CustomSelect";

// ----- Stats Card Component -----
const StatsCard = React.memo(
  ({
    stat,
    setQueryType,
    setDuration,
    setFilter,
  }: {
    stat: StatsDataItem;
    setQueryType: (val: string) => void;
    setDuration: (val: string) => void;
    setFilter: (val: string) => void;
  }) => {
    const handleTimeSelect = useCallback(
      (value: string) => {
        setQueryType(stat.title);
        setDuration(value);
      },
      [stat.title]
    );

    const handleSessionSelect = useCallback(
      (value: string) => {
        setQueryType(stat.title);
        setFilter(value);
      },
      [stat.title]
    );

    return (
      <div className="bg-gradient-to-br from-white to-gray-50 md:h-[350px] rounded-2xl shadow-lg p-5 sm:p-6 md:p-7 flex flex-col gap-4 border border-gray-200 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-300 transition-all duration-300 group">
        {/* Header with title + filters */}
        <div className="flex justify-between items-start flex-wrap gap-2">
          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wider">{stat.title}</p>
          <div className="flex gap-2 flex-wrap">
            {stat.timeFilter && (
              <CustomSelect
                options={stat.timeOptions}
                defaultValue={stat.timeOptions[0]}
                className="w-28"
                onSelect={handleTimeSelect}
              />
            )}
            {stat.sessionFilter && stat.sessionOptions && (
              <CustomSelect
                options={stat.sessionOptions}
                defaultValue={stat.sessionOptions[0]}
                className="w-32"
                onSelect={handleSessionSelect}
              />
            )}
          </div>
        </div>

        {/* Value + Icon */}
        <div className="flex justify-between items-center mt-2">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
              {stat.value}{" "}
              {stat.unit ? (
                <span className="text-base sm:text-lg font-semibold text-gray-600">{stat.unit}</span>
              ) : null}
            </h2>
            <p className="text-xs text-gray-500 mt-2 font-medium">{stat.description}</p>
          </div>
          <div
            className={`p-4 rounded-2xl ${stat.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            {stat.icon}
          </div>
        </div>

        {/* Change indicator */}
        <div className="flex items-center gap-2 mt-auto pt-3 border-t border-gray-200">
          <span
            className={`flex items-center gap-1 text-sm font-bold px-3 py-1.5 rounded-lg ${
              stat.changeDirection === "up" 
                ? "text-green-700 bg-green-50" 
                : "text-red-700 bg-red-50"
            }`}
          >
            {stat.changeDirection === "up" ? (
              <ArrowUp size={16} className="text-green-600" />
            ) : (
              <ArrowDown size={16} className="text-red-600" />
            )}
            {stat.change}
          </span>
          <span className="text-xs text-gray-500 font-medium">vs previous day</span>
        </div>
      </div>
    );
  }
);

StatsCard.displayName = "StatsCard";

// ----- Chart Components -----
const ActiveUsersChart = React.memo(
  ({
    sessionAnalyticsByCity,
  }: {
    sessionAnalyticsByCity: {
      totalSessions: number;
      totalSessionsRaw: number;
      cityWise: Record<string, number>;
      cityWiseRaw: Record<string, number>;
    } | null;
  }) => {
    const handleSelect = useCallback((value: string) => {
      console.log("Selected time filter:", value);
    }, []);

    // Prepare data for the chart
    const chartData = useMemo(() => {
      if (!sessionAnalyticsByCity?.cityWise) return { cities: [], values: [] };

      const cities = Object.keys(sessionAnalyticsByCity.cityWise);
      const values = Object.values(sessionAnalyticsByCity.cityWise);

      return { cities, values };
    }, [sessionAnalyticsByCity]);

    const chartOption: EChartsOption = useMemo(
      () => ({
        title: {
          text: "Active Users By City",
          textStyle: { fontSize: 14, fontWeight: "normal" },
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          confine: true,
          formatter: (params: unknown) => {
            const param = Array.isArray(params)
              ? (params[0] as EChartsTooltipParam)
              : (params as EChartsTooltipParam);
            return `${param.name}<br/>${
              param.marker
            } Active Users: <b>${fmtFull(param.value)}</b>`;
          },
        },
        grid: {
          left: 80,
          right: 24,
          bottom: 16,
          top: 40,
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            hideOverlap: true,
            formatter: (v: number) => fmtCompact(v),
            fontSize: 10,
          },
          splitLine: {
            show: true,
            lineStyle: { color: "#eef2f7" },
          },
        },
        yAxis: {
          type: "category",
          axisLabel: {
            hideOverlap: true,
            interval: 0,
            fontSize: 10,
          },
          data: chartData.cities,
        },
        dataZoom: [
          {
            type: "inside",
            yAxisIndex: 0,
            start: 0,
            end: 100,
            zoomLock: false,
          },
          {
            type: "slider",
            yAxisIndex: 0,
            height: 16,
            right: 8,
            left: 8,
            bottom: 0,
            handleSize: 14,
            brushSelect: false,
          },
        ],
        series: [
          {
            name: "Active Users",
            type: "bar",
            data: chartData.values,
            itemStyle: { color: "#4f46e5" },
            barMaxWidth: 18,
            label: {
              show: true,
              position: "right",
              distance: 4,
              formatter: (p: CallbackDataParams) => fmtCompact(Number(p.value)),
              fontSize: 9,
              color: "#111827",
            },
            labelLayout: { hideOverlap: true },
            emphasis: {
              focus: "series",
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.3)",
              },
            },
          },
        ],
        animation: false,
        progressive: 500,
      }),
      [chartData]
    );

    return (
      <div className="w-full bg-gradient-to-br from-white to-indigo-50 rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
          <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Users size={20} className="text-indigo-600" />
            </div>
            Active Users By City
          </h3>
          <div className="flex gap-2">
            <CustomSelect
              options={[
                "Last 7 Days",
                "Last 30 Days",
                "Last 6 Months",
                "Last Year",
              ]}
              defaultValue="Last 30 Days"
              className="w-36 text-xs"
              onSelect={handleSelect}
            />
            <button className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
        <ReactECharts
          option={chartOption}
          style={{ height: "250px", width: "100%" }}
          opts={{
            renderer: "svg",
          }}
        />
        <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-full">
            <div className="w-3 h-3 rounded-full bg-[#4f46e5] shadow-sm"></div>
            <span className="text-xs font-medium text-gray-700">Active Users</span>
          </div>
        </div>
      </div>
    );
  }
);

ActiveUsersChart.displayName = "ActiveUsersChart";

const SessionAnalyticsChart = React.memo(
  ({
    activeTab,
    setActiveTab,
    setQueryType,
    setDuration,
    setQType,
    sessionAnalyticsByCity,
  }: {
    activeTab: ActiveTabType;
    setActiveTab: (tab: ActiveTabType) => void;
    setQueryType: (val: string) => void;
    setDuration: (val: string) => void;
    setQType: (val: string | undefined) => void;
    sessionAnalyticsByCity: {
      totalSessions: number;
      totalSessionsRaw: number;
      cityWise: Record<string, number>;
      cityWiseRaw: Record<string, number>;
    } | null;
  }) => {
    const handleSelect = useCallback((value: string) => {
      setQueryType("Session Analytics By City");
      setDuration(value);
    }, []);
    const handleQFilter = (qType: string) => {
      setQueryType("Session Analytics By City");
      setQType(qType);
    };

    // Prepare data for the chart
    const chartData = useMemo(() => {
      if (!sessionAnalyticsByCity?.cityWise) return { cities: [], values: [] };

      const cities = Object.keys(sessionAnalyticsByCity.cityWise);
      const values = Object.values(sessionAnalyticsByCity.cityWise);

      return { cities, values };
    }, [sessionAnalyticsByCity]);

    const chartOption: EChartsOption = useMemo(
      () => ({
        title: {
          text: "User Session Analytics",
          textStyle: { fontSize: 14, fontWeight: "normal" },
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: { type: "shadow" },
          confine: true,
          formatter: (params: unknown) => {
            const param = Array.isArray(params)
              ? (params[0] as EChartsTooltipParam)
              : (params as EChartsTooltipParam);
            return `${param.name}<br/>${param.marker} Sessions: <b>${fmtFull(
              param.value
            )}</b>`;
          },
        },
        grid: {
          left: 80,
          right: 24,
          bottom: 16,
          top: 40,
          containLabel: true,
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
          axisLabel: {
            hideOverlap: true,
            formatter: (v: number) => fmtCompact(v),
            fontSize: 10,
          },
          splitLine: {
            show: true,
            lineStyle: { color: "#eef2f7" },
          },
        },
        yAxis: {
          type: "category",
          axisLabel: {
            hideOverlap: true,
            interval: 0,
            fontSize: 10,
          },
          data: chartData.cities,
        },
        dataZoom: [
          {
            type: "inside",
            yAxisIndex: 0,
            start: 0,
            end: 100,
            zoomLock: false,
          },
          {
            type: "slider",
            yAxisIndex: 0,
            height: 16,
            right: 8,
            left: 8,
            bottom: 0,
            handleSize: 14,
            brushSelect: false,
          },
        ],
        series: [
          {
            name: "Sessions",
            type: "bar",
            data: chartData.values,
            itemStyle: { color: "#3b82f6" },
            barMaxWidth: 18,
            label: {
              show: true,
              position: "right",
              distance: 4,
              formatter: (p: CallbackDataParams) => fmtCompact(Number(p.value)),
              fontSize: 9,
              color: "#111827",
            },
            labelLayout: { hideOverlap: true },
            emphasis: {
              focus: "series",
              itemStyle: {
                shadowBlur: 10,
                shadowColor: "rgba(0, 0, 0, 0.3)",
              },
            },
          },
        ],
        animation: false,
        progressive: 500,
      }),
      [chartData]
    );

    return (
      <div className="w-full bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 size={20} className="text-purple-600" />
              </div>
              User Session Analytics
            </h3>
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {(["Total", "Revisit", "Unique"] as ActiveTabType[]).map(
                (tab) => (
                  <button
                    key={tab}
                    className={`whitespace-nowrap px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                      activeTab === tab
                        ? "bg-purple-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-purple-50 hover:text-purple-700"
                    }`}
                    onClick={() => {
                      setActiveTab(tab);
                      handleQFilter(tab);
                    }}
                    aria-pressed={activeTab === tab}
                  >
                    {tab === "Total"
                      ? "Total"
                      : tab === "Revisit"
                      ? "Revisit"
                      : "Unique"}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="flex gap-2 self-end">
            <CustomSelect
              options={[
                "Last 7 Days",
                "Last 30 Days",
                "Last 6 Months",
                "Last Year",
              ]}
              defaultValue="Last 30 Days"
              className="w-36 text-xs"
              onSelect={handleSelect}
            />
            <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
        <ReactECharts
          option={chartOption}
          style={{ height: "220px", width: "100%" }}
          opts={{
            renderer: "svg",
          }}
        />
        <div className="flex justify-center gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2 bg-purple-50 px-3 py-1.5 rounded-full">
            <div className="w-3 h-3 rounded-full bg-[#3b82f6] shadow-sm"></div>
            <span className="text-xs font-medium text-gray-700">Sessions</span>
          </div>
        </div>
      </div>
    );
  }
);

SessionAnalyticsChart.displayName = "SessionAnalyticsChart";

// Extend RowProps for Row1
interface RowProps {
  setDuration: Dispatch<SetStateAction<string>>;
  setFilter: Dispatch<SetStateAction<string>>;
  setQueryType: Dispatch<SetStateAction<string>>;
  totalUsers: { totalUsers: string; performanceAvg: string } | null;
  sessionCount: { totalSessions: string; performanceAvg: string } | null;
  boundeRate: { totalBounceUsers: string; lastUsersBounceRate: string } | null;
  avgVisitDuration: { usersSpentTime: string; lastSpentTimeAvg: string } | null;
  liveUsers: number;
}

// ----- Main Component -----
function Row1({
  setDuration,
  setFilter,
  setQueryType,
  totalUsers,
  sessionCount,
  boundeRate,
  avgVisitDuration,
  liveUsers,
}: RowProps) {

  // ----- Stats Cards Data -----
  const statsData: StatsDataItem[] = useMemo(
    () => [
      {
        title: "Active Users",
        value: String(liveUsers ?? "0"),
        description: "Active Now",
        icon: <Activity size={20} className="text-[#FFFFFF]" />,
        color: "bg-blue-500",
        liveUsers: liveUsers || 0,
        change: "",
        changeDirection: "up",
        timeFilter: false,
        timeOptions: [],
      },
      {
        title: "Total Users",
        value: String(totalUsers?.totalUsers ?? "0"),
        description: "All Time",
        change: totalUsers?.performanceAvg || "0.00%",
        changeDirection: totalUsers?.performanceAvg?.includes("-")
          ? "down"
          : "up",
        icon: <Users size={20} className="text-[#FFFFFF]" />,
        color: "bg-indigo-500",
        timeFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
        liveUsers: liveUsers || 0,
      },
      {
        title: "Session Count",
        value: String(sessionCount?.totalSessions ?? "0"),
        description: "All Time",
        change: sessionCount?.performanceAvg || "0.00%",
        changeDirection: sessionCount?.performanceAvg?.includes("-")
          ? "down"
          : "up",
        icon: <BarChart3 size={20} className="text-[#FFFFFF]" />,
        color: "bg-purple-500",
        timeFilter: true,
        sessionFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
        sessionOptions: [
          "All",
          "Session Revisit",
          "More Than 10 Sec",
          "More Than 30 Sec",
          "More Than 1 Min.",
        ],
        liveUsers: liveUsers || 0,
      },
      {
        title: "Bounce Rate",
        value: String(boundeRate?.lastUsersBounceRate ?? "0.00%"),
        description: "All Time",
        change: boundeRate?.lastUsersBounceRate || "0.00%",
        changeDirection: boundeRate?.lastUsersBounceRate?.includes("-")
          ? "down"
          : "up",
        icon: <TrendingUp size={20} className="text-[#FFFFFF]" />,
        color: "bg-pink-500",
        timeFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
        liveUsers: liveUsers || 0,
      },
      {
        title: "Total Leads",
        value: String(totalUsers?.totalUsers ?? "0"),
        description: "All Time",
        change: totalUsers?.performanceAvg || "0.00%",
        changeDirection: totalUsers?.performanceAvg?.includes("-")
          ? "down"
          : "up",
        icon: <Users size={20} className="text-[#FFFFFF]" />,
        color: "bg-amber-500",
        timeFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
        liveUsers: liveUsers || 0,
      },
      {
        title: "Avg. Visit Duration",
        value: String(avgVisitDuration?.usersSpentTime?.split(" ")[0] ?? "0"),
        unit: avgVisitDuration?.usersSpentTime?.split(" ")[1] || "Hours",
        description: "All Time",
        change: avgVisitDuration?.lastSpentTimeAvg || "0.00%",
        changeDirection: avgVisitDuration?.lastSpentTimeAvg?.includes("-")
          ? "down"
          : "up",
        icon: <Clock size={20} className="text-[#FFFFFF]" />,
        color: "bg-green-500",
        timeFilter: true,
        timeOptions: [
          "All",
          "Last 7 Days",
          "Last 30 Days",
          "Last 6 Month",
          "Last 12 Month",
        ],
        liveUsers: liveUsers || 0,
      },
    ],
    [totalUsers, sessionCount, boundeRate, avgVisitDuration, liveUsers]
  );

  return (
    <section className="w-full flex flex-col gap-6 px-4 sm:px-5 md:px-6 pb-6">
      {/* First Row Of Dashboard */}
      <div className="w-full">
        {/* Stats Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              stat={stat}
              setQueryType={setQueryType}
              setDuration={setDuration}
              setFilter={setFilter}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Row1;

"use client"

import * as React from "react"
import type { EChartsOption } from "echarts"
import { cn } from "../utils"

export type ChartTone = "primary" | "success" | "warning" | "danger" | "muted"

const TONE_VAR: Record<ChartTone, string> = {
  primary: "--color-primary",
  success: "--color-toast-success-fg",
  warning: "--color-warning",
  danger: "--color-danger-primary",
  muted: "--color-text-muted",
}

function readVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

export function resolveTone(tone: ChartTone): string {
  return readVar(TONE_VAR[tone], "#11C76F")
}

export function resolveTextColors() {
  return {
    text: readVar("--color-text", "#1E2124"),
    textMuted: readVar("--color-text-muted", "#999EA3"),
    border: readVar("--color-border", "#E5E7EB"),
    borderMuted: readVar("--color-border-muted", "#F3F4F6"),
    surface: readVar("--color-surface", "#F7F7F7"),
  }
}

export interface EChartProps extends React.HTMLAttributes<HTMLDivElement> {
  option: EChartsOption
  height?: number | string
  /** Trigger re-render quando muda (theme/mode switch) */
  themeKey?: string | number
}

export function EChart({
  option,
  height = 320,
  themeKey,
  className,
  ...props
}: EChartProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [ready, setReady] = React.useState(false)
  const echartsRef = React.useRef<typeof import("echarts") | null>(null)
  const instanceRef = React.useRef<import("echarts").ECharts | null>(null)

  // Lazy load echarts client-side (evita SSR + cuts bundle)
  React.useEffect(() => {
    let cancelled = false
    import("echarts").then((mod) => {
      if (cancelled) return
      echartsRef.current = mod
      setReady(true)
    })
    return () => {
      cancelled = true
    }
  }, [])

  // Init / dispose + apply current option imediatamente (evita race entre init e option-update effect)
  React.useEffect(() => {
    if (!ready || !containerRef.current || !echartsRef.current) return
    const inst = echartsRef.current.init(containerRef.current, undefined, {
      renderer: "canvas",
    })
    instanceRef.current = inst
    inst.setOption(option, true)
    const ro = new ResizeObserver(() => inst.resize())
    ro.observe(containerRef.current)
    return () => {
      ro.disconnect()
      inst.dispose()
      instanceRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready])

  // Update option em mudanças subsequentes
  React.useEffect(() => {
    if (!ready) return
    instanceRef.current?.setOption(option, true)
  }, [ready, option, themeKey])

  return (
    <div
      ref={containerRef}
      style={{ height }}
      className={cn("w-full", className)}
      {...props}
    />
  )
}

// ===========================================================================
// DonutChart — value 0–100 OR multi-series
// ===========================================================================

export interface DonutChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** Modo simples: percentual 0-100 */
  value?: number
  /** Modo segmentado: várias fatias */
  series?: { name: string; value: number; tone?: ChartTone }[]
  size?: number
  thickness?: number
  /** Cor do arco no modo simples */
  tone?: ChartTone
  /** Texto central (override) */
  centerText?: string
  centerSubtext?: string
  /** Mostra legenda lateral (modo series) */
  showLegend?: boolean
  /** themeKey força re-render quando o tema/modo muda */
  themeKey?: string | number
}

export function DonutChart({
  value,
  series,
  size = 180,
  thickness = 16,
  tone = "primary",
  centerText,
  centerSubtext,
  showLegend = false,
  themeKey,
  className,
  ...props
}: DonutChartProps) {
  const option = React.useMemo<EChartsOption>(() => {
    const text = resolveTextColors()
    const innerRadius = size / 2 - thickness
    const outerRadius = size / 2

    if (series && series.length > 0) {
      return {
        tooltip: { trigger: "item", borderColor: text.border },
        legend: showLegend
          ? {
              orient: "vertical",
              right: 8,
              top: "center",
              textStyle: { color: text.text },
              icon: "circle",
            }
          : { show: false },
        series: [
          {
            type: "pie",
            radius: [innerRadius, outerRadius],
            avoidLabelOverlap: true,
            label: { show: false },
            labelLine: { show: false },
            data: series.map((s) => ({
              name: s.name,
              value: s.value,
              itemStyle: {
                color: resolveTone(s.tone ?? "primary"),
                borderColor: text.surface,
                borderWidth: 2,
              },
            })),
          },
        ],
      }
    }

    const v = Math.max(0, Math.min(100, value ?? 0))
    return {
      tooltip: { show: false },
      title: {
        text: centerText ?? `${v}%`,
        subtext: centerSubtext,
        left: "center",
        top: centerSubtext ? "38%" : "center",
        textStyle: {
          fontSize: size * 0.18,
          fontWeight: 700,
          color: text.text,
        },
        subtextStyle: {
          fontSize: size * 0.08,
          color: text.textMuted,
        },
      },
      series: [
        {
          type: "pie",
          radius: [innerRadius, outerRadius],
          silent: true,
          label: { show: false },
          labelLine: { show: false },
          data: [
            {
              value: v,
              itemStyle: { color: resolveTone(tone) },
            },
            {
              value: 100 - v,
              itemStyle: { color: text.borderMuted },
            },
          ],
        },
      ],
    }
  }, [value, series, size, thickness, tone, centerText, centerSubtext, showLegend, themeKey])

  return (
    <EChart
      option={option}
      height={size}
      themeKey={themeKey}
      className={cn("max-w-full", className)}
      style={{ width: showLegend ? "100%" : size, height: size }}
      {...props}
    />
  )
}

// ===========================================================================
// BarChart — single series, x = categories
// ===========================================================================

export interface BarChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  categories: string[]
  series: { name: string; data: number[]; tone?: ChartTone }[]
  height?: number
  horizontal?: boolean
  showLegend?: boolean
  themeKey?: string | number
}

export function BarChart({
  categories,
  series,
  height = 280,
  horizontal = false,
  showLegend = true,
  themeKey,
  className,
  ...props
}: BarChartProps) {
  const option = React.useMemo<EChartsOption>(() => {
    const text = resolveTextColors()
    const cat = {
      type: "category" as const,
      data: categories,
      axisLine: { lineStyle: { color: text.border } },
      axisTick: { show: false },
      axisLabel: { color: text.textMuted },
    }
    const val = {
      type: "value" as const,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: text.borderMuted } },
      axisLabel: { color: text.textMuted },
    }
    return {
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      legend: showLegend
        ? { top: 0, textStyle: { color: text.text }, icon: "roundRect" }
        : { show: false },
      grid: { left: 8, right: 8, bottom: 4, top: showLegend ? 32 : 8, containLabel: true },
      xAxis: horizontal ? val : cat,
      yAxis: horizontal ? cat : val,
      series: series.map((s) => ({
        name: s.name,
        type: "bar",
        data: s.data,
        barMaxWidth: 32,
        itemStyle: {
          color: resolveTone(s.tone ?? "primary"),
          borderRadius: horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0],
        },
      })),
    }
  }, [categories, series, horizontal, showLegend, themeKey])

  return <EChart option={option} height={height} themeKey={themeKey} className={className} {...props} />
}

// ===========================================================================
// LineChart — multi series com smooth/area opcional
// ===========================================================================

export interface LineChartProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  categories: string[]
  series: { name: string; data: number[]; tone?: ChartTone }[]
  height?: number
  smooth?: boolean
  area?: boolean
  showLegend?: boolean
  themeKey?: string | number
}

export function LineChart({
  categories,
  series,
  height = 280,
  smooth = true,
  area = false,
  showLegend = true,
  themeKey,
  className,
  ...props
}: LineChartProps) {
  const option = React.useMemo<EChartsOption>(() => {
    const text = resolveTextColors()
    return {
      tooltip: { trigger: "axis" },
      legend: showLegend
        ? { top: 0, textStyle: { color: text.text }, icon: "circle" }
        : { show: false },
      grid: { left: 8, right: 16, bottom: 4, top: showLegend ? 32 : 8, containLabel: true },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: categories,
        axisLine: { lineStyle: { color: text.border } },
        axisTick: { show: false },
        axisLabel: { color: text.textMuted },
      },
      yAxis: {
        type: "value",
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { lineStyle: { color: text.borderMuted } },
        axisLabel: { color: text.textMuted },
      },
      series: series.map((s) => {
        const color = resolveTone(s.tone ?? "primary")
        return {
          name: s.name,
          type: "line" as const,
          data: s.data,
          smooth,
          symbol: "circle",
          symbolSize: 6,
          lineStyle: { color, width: 2 },
          itemStyle: { color },
          areaStyle: area
            ? {
                color: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: color + "40" },
                    { offset: 1, color: color + "00" },
                  ],
                },
              }
            : undefined,
        }
      }),
    }
  }, [categories, series, smooth, area, showLegend, themeKey])

  return <EChart option={option} height={height} themeKey={themeKey} className={className} {...props} />
}

// AreaChart é só LineChart com area=true; export pra DX
export const AreaChart: React.FC<Omit<LineChartProps, "area">> = (props) => (
  <LineChart {...props} area />
)

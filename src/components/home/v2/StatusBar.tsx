'use client'

import { useEffect, useState } from 'react'

type StatusKind = 'open' | 'closing-soon' | 'opening-soon' | 'closed'

interface Status {
  kind: StatusKind
  message: string
  nextOpenLabel?: string
}

interface Weather {
  temp: number
}

// Horarios en horas decimales: 7.5 = 7:30, 21 = 21:00
const SCHEDULE: Record<string, { open: number; close: number }> = {
  Mon: { open: 7.5, close: 21 },
  Tue: { open: 7.5, close: 21 },
  Wed: { open: 7.5, close: 21 },
  Thu: { open: 7.5, close: 21 },
  Fri: { open: 7.5, close: 21 },
  Sat: { open: 9, close: 21 },
  Sun: { open: 9, close: 21 },
}

const WEEK_ORDER = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as const

const DAY_LABEL_ES: Record<string, string> = {
  Mon: 'el lunes',
  Tue: 'el martes',
  Wed: 'el miércoles',
  Thu: 'el jueves',
  Fri: 'el viernes',
  Sat: 'el sábado',
  Sun: 'el domingo',
}

function decToTime(dec: number): string {
  const h = Math.floor(dec)
  const m = Math.round((dec - h) * 60)
  return `${h}:${m.toString().padStart(2, '0')}`
}

function getSantiagoNow(now: Date): { weekday: string; dec: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Santiago',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '0'
  const weekday = get('weekday')
  let h = parseInt(get('hour'), 10)
  if (h === 24) h = 0
  const m = parseInt(get('minute'), 10)
  return { weekday, dec: h + m / 60 }
}

function computeStatus(now: Date): Status {
  const { weekday, dec } = getSantiagoNow(now)
  const today = SCHEDULE[weekday]
  if (!today) return { kind: 'closed', message: 'Cerrado' }

  if (dec >= today.open && dec < today.close) {
    const minsToClose = (today.close - dec) * 60
    if (minsToClose < 60) {
      const mins = Math.max(1, Math.ceil(minsToClose))
      return { kind: 'closing-soon', message: `Cerramos en ${mins} ${mins === 1 ? 'minuto' : 'minutos'}` }
    }
    return { kind: 'open', message: `Abierto ahora · Cierra a las ${decToTime(today.close)}` }
  }

  if (dec < today.open) {
    const minsToOpen = (today.open - dec) * 60
    if (minsToOpen < 60) {
      const mins = Math.max(1, Math.ceil(minsToOpen))
      return { kind: 'opening-soon', message: `Abrimos en ${mins} ${mins === 1 ? 'minuto' : 'minutos'}` }
    }
    return {
      kind: 'closed',
      message: `Cerrado · Abre hoy a las ${decToTime(today.open)}`,
      nextOpenLabel: 'hoy',
    }
  }

  // Después del cierre → próximo día abierto
  const todayIdx = WEEK_ORDER.indexOf(weekday as (typeof WEEK_ORDER)[number])
  for (let i = 1; i <= 7; i++) {
    const nextIdx = (todayIdx + i) % 7
    const nextDay = WEEK_ORDER[nextIdx]
    const sched = SCHEDULE[nextDay]
    if (sched) {
      const label = i === 1 ? 'mañana' : DAY_LABEL_ES[nextDay]
      return {
        kind: 'closed',
        message: `Cerrado · Abre ${label} a las ${decToTime(sched.open)}`,
        nextOpenLabel: label,
      }
    }
  }
  return { kind: 'closed', message: 'Cerrado' }
}

function weatherMessage(temp: number, status: Status | null): string {
  const t = Math.round(temp)
  // Abierto o por cerrar → recomendación de bebida
  if (!status || status.kind === 'open' || status.kind === 'closing-soon') {
    if (temp < 10) return `${t}° en Ñuñoa · Hace frío, ideal para un chocolate caliente`
    if (temp < 18) return `${t}° en Ñuñoa · Perfecto para un latte`
    if (temp <= 25) return `${t}° en Ñuñoa · Ideal para un café helado`
    return `${t}° en Ñuñoa · Hace calor, pide un mocktail kombucha`
  }
  if (status.kind === 'opening-soon') {
    return `${t}° en Ñuñoa · Pronto te esperamos`
  }
  // closed
  const label = status.nextOpenLabel
  if (!label || label === 'hoy') return `${t}° en Ñuñoa · Te esperamos pronto`
  if (label === 'mañana') return `${t}° en Ñuñoa · Te esperamos mañana`
  return `${t}° en Ñuñoa · Te esperamos ${label}`
}

const COLOR_BY_KIND: Record<StatusKind, { dot: string; pulse: boolean }> = {
  open: { dot: '#5DCAA5', pulse: true },
  'closing-soon': { dot: '#EAB308', pulse: true },
  'opening-soon': { dot: '#F97316', pulse: true },
  closed: { dot: '#DC2626', pulse: false },
}

export default function StatusBar() {
  const [status, setStatus] = useState<Status | null>(null)
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    const tick = () => setStatus(computeStatus(new Date()))
    tick()
    const id = setInterval(tick, 60_000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    let cancelled = false
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-33.4519&longitude=-70.5866&current=temperature_2m',
          { cache: 'no-store' },
        )
        if (!res.ok) return
        const data = (await res.json()) as { current?: { temperature_2m?: number } }
        const t = data?.current?.temperature_2m
        if (typeof t === 'number' && !cancelled) {
          setWeather({ temp: t })
        }
      } catch {
        /* si falla open-meteo, ocultamos el lado del clima */
      }
    }
    fetchWeather()
    const id = setInterval(fetchWeather, 30 * 60 * 1000)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const color = status ? COLOR_BY_KIND[status.kind] : { dot: '#5DCAA5', pulse: false }

  return (
    <div
      role="status"
      aria-live="polite"
      style={{ backgroundColor: '#2C5F5D' }}
      className="text-white text-[12px] tracking-wide"
    >
      <style>{`
        @keyframes ct-status-pulse { 0%,100%{opacity:1; transform:scale(1)} 50%{opacity:.55; transform:scale(.85)} }
        .ct-status-dot { width: 7px; height: 7px; border-radius: 9999px; display: inline-block; flex-shrink: 0; }
        .ct-status-dot--pulse { animation: ct-status-pulse 1.8s ease-in-out infinite; }
      `}</style>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 min-w-0">
          <span
            className={`ct-status-dot${color.pulse ? ' ct-status-dot--pulse' : ''}`}
            style={{ backgroundColor: color.dot }}
            aria-hidden="true"
          />
          <span className="truncate">
            {status?.message ?? 'Casa Turquesa · Ñuñoa, Santiago'}
          </span>
        </span>
        <span className="hidden md:inline text-white/85 truncate">
          {weather ? weatherMessage(weather.temp, status) : ''}
        </span>
      </div>
    </div>
  )
}

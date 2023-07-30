import React, { useState, useEffect, useLayoutEffect } from 'react'

const UPDATE_CYCLE = 1000

const KEY_LOCALE = 'KEY_LOCALE'

enum Locale {
    US = 'en-US',
    JP = 'ja-JP',
}

const getLocaleFromString = (text: string) => {
    switch (text) {
        case Locale.US:
            return Locale.US
        case Locale.JP:
            return Locale.JP
        default:
            return Locale.US
    }
}

export const Clock = () => {
    const [timestamp, setTimestamp] = useState(new Date())
    const [locale, setLocale] = useState(Locale.US)
    const mounted = React.useRef(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setTimestamp(new Date())
        }, UPDATE_CYCLE)

        return () => {
            clearInterval(timer)
        }
    }, [])

    useEffect(() => {
        const savedLocale = localStorage.getItem(KEY_LOCALE)

        if (savedLocale !== null) {
            setLocale(getLocaleFromString(savedLocale))
        }
    }, [])

    /** useLayoutEffect */
    useLayoutEffect(() => {
        const savedLocale = localStorage.getItem(KEY_LOCALE)
        if (savedLocale !== null) {
            setLocale(getLocaleFromString(savedLocale))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(KEY_LOCALE, locale)
    }, [locale])

    /** コンポーネントの描画を1回のみ実行したい場合 */
    useEffect(() => {
        if(mounted.current) {
            return
        }
        mounted.current = true

        /** 1回だけ実行したい副作用の実行 */
        // const data = fetch()
    }, [])

    return (
        <div>
            <p>
                <span id="current-time-label">現在時刻</span>
                <span>:{timestamp.toLocaleString(locale)}</span>
                <select value={locale} onChange={(e) => setLocale(getLocaleFromString(e.target.value))}>
                    <option value="en-US">en-US</option>
                    <option value="en-JP">en-JP</option>
                </select>
            </p>
        </div>
    )
}
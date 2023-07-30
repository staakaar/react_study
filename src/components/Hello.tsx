const Hello = () => {
    /** 関数 */
    const onClick = () => {
        alert('hello')
    }

    /** 変数名 */
    const text = 'Hello, React'
    const name = 'React'

    return (
        <div onClick={onClick}>
            {text}
            <span>こんにちは、{name}さん</span>
        </div>
    )
}

export default Hello
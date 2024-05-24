function CareScale({careType, scaleValue}) {
    const range = [1, 2, 3];
    const typeC = careType === 'light' ? '☀️' : '💧'
    
    return <div>
        {range.map((r) => scaleValue >= r ? <span key={r.toString()}>{typeC}</span> : null)}
    </div>
}

export default CareScale;
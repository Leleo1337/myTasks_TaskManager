export type priorityFlagProps = {
    type: 'low' | 'medium' | 'high'
}

export type customFlagProps = {
    text: string
    color: string
    allowDelete: boolean
    size: "small" | "medium" 
    onClick?: () => void
}
export type priorityFlagProps = {
    type: 'Low' | 'Medium' | 'High'
}

export type customFlagProps = {
    text: string
    color: string
    allowDelete: boolean
    size: "small" | "medium" 
    onClick?: () => void
}
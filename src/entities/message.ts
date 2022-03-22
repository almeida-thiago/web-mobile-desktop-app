export type MessageType = {
  type: 'success' | 'warning' | 'danger' | 'info'
  from?: string
  text: string
}

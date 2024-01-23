export interface Developer {
  id: number
  name: string
  commands: Command[]
}

export interface Command {
  id: number
  status: string
  statusColor: string
  name: string
  start: Date
  end: Date
  duration: number
  client: string
  contact: string
}

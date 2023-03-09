type Attributes = Record<string, unknown>

class Subscription {
  private name: string

  constructor(name: string) {
    this.name = name
  }
}

export class Topic {
  private name: string

  constructor(name: string) {
    this.name = name
  }

  async publish(data: Buffer, attributes?: Attributes | undefined): Promise<string> {
    return Promise.resolve(this.getMessageId())
  }

  async flush(): Promise<void> {
    return Promise.resolve()
  }

  private getMessageId(): string {
    return Math.random().toString()
  }

  async createSubscription(subscriptionName: string, _options?: {
    flowControl: {
      maxMessages: number
    }
  }) {
    return Promise.resolve([new Subscription(subscriptionName)])
  }

  subscription(subscriptionName: string) {
    return new Subscription(subscriptionName)
  }
}

export class PubSub {
  topic(topicName: string) {
    return new Topic(topicName)
  }

  createTopic(topicName: string) {
    return Promise.resolve([new Topic(topicName)])
  }
}

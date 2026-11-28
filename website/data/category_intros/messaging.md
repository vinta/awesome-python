Your broker sets the Python messaging library: confluent-kafka for Kafka, Pika for RabbitMQ, paho-mqtt for MQTT. FastStream builds asyncio services on all 3.

How to choose:

- Apache Kafka, with transactions and Schema Registry: confluent-kafka
- RabbitMQ, with the client its own tutorials use: pika
- An MQTT broker: paho-mqtt
- An asyncio service with typed handlers on Kafka, RabbitMQ, NATS, Redis, or MQTT: faststream

### confluent-kafka

Pick confluent-kafka for Apache Kafka. It's Confluent's own client, with a producer, a consumer, and an admin client that work with any Kafka broker. [Schema Registry integration, transactions, and exactly-once semantics](https://github.com/confluentinc/confluent-kafka-python) come out of the box. Its docs [point scripts, batch jobs, and CLI tools to the synchronous clients](https://docs.confluent.io/kafka-clients/python/current/overview.html#choose-between-asyncio-and-synchronous-clients), and code that runs under an event loop to the asyncio ones. A producer's [`produce()` call returns immediately](https://docs.confluent.io/kafka-clients/python/current/overview.html#asynchronous-writes), and your delivery callback runs when you call `poll()`. A consumer [subscribes to its topics, then polls in a loop](https://docs.confluent.io/kafka-clients/python/current/overview.html#basic-poll-loop).

### Pika

Pick Pika for RabbitMQ. It's [a pure-Python implementation of AMQP 0-9-1](https://github.com/pika/pika). RabbitMQ [teaches with it in its Python tutorials](https://www.rabbitmq.com/tutorials/tutorial-one-python). Open a connection and a channel, then publish. On the consuming side, [acknowledge each message once the work is done](https://www.rabbitmq.com/tutorials/tutorial-two-python#message-acknowledgment), so a message whose consumer dies goes back on the queue.

### paho-mqtt

Pick paho-mqtt for MQTT. It's the Eclipse Paho client, which implements MQTT 5.0, 3.1.1, and 3.1, with helpers that make publishing a one-off message straightforward. [Create a client, connect it to a broker, and run its network loop](https://eclipse.dev/paho/files/paho.mqtt.python/html/index.html#getting-started), which also handles reconnecting. Subscribe inside `on_connect()`, so your subscriptions come back after a reconnect.

### FastStream

Pick FastStream for an asyncio service that consumes and publishes over Kafka, RabbitMQ, NATS, Redis, or MQTT. It's [an asynchronous Python framework for building event-driven applications](https://faststream.ag2.ai/latest/). Pydantic [parses each message from your handler's type annotations](https://faststream.ag2.ai/latest/#writing-app-code). FastStream also [generates AsyncAPI docs](https://faststream.ag2.ai/latest/#project-documentation) for your service, and its [test brokers run your handlers in memory](https://faststream.ag2.ai/latest/#testing-the-service), with no broker to start. It [wraps each broker's own client](https://faststream.ag2.ai/latest/#your-broker-in-full) and keeps native broker features within reach. Its Kafka broker can [run on confluent-kafka](https://faststream.ag2.ai/latest/confluent/). It implements no retries, delayed delivery, or task orchestration, so pass on it if you want the framework to handle those. [Create a broker, pass it to a `FastStream` app](https://faststream.ag2.ai/latest/getting-started/), decorate an async function with `@broker.subscriber("test")`, and start it with `faststream run serve:app`.

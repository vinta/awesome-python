Instead of a Python messaging library per broker, an asyncio service can run on FastStream. Otherwise, use confluent-kafka, pika, or paho-mqtt.

How to choose:

- An asyncio service on Kafka, RabbitMQ, MQTT, NATS, or Redis: FastStream
- Kafka, including Confluent's Schema Registry: confluent-kafka
- RabbitMQ, with the client its team recommends: pika
- IoT devices and sensors that speak MQTT: paho-mqtt

confluent-kafka is Confluent's Kafka client, [a binding on top of librdkafka](https://docs.confluent.io/kafka-clients/python/current/overview.html), the C client. `produce()` only queues a message, so [call `poll()` to get delivery reports](https://docs.confluent.io/kafka-clients/python/current/overview.html#asynchronous-writes). Its README says production apps [should serialize with Schema Registry](https://github.com/confluentinc/confluent-kafka-python#basic-producer-example) instead of producing raw bytes.

pika is [a pure-Python implementation of AMQP 0-9-1](https://pika.readthedocs.io/en/stable/), and RabbitMQ's tutorials use it as [the Python client the RabbitMQ team recommends](https://www.rabbitmq.com/tutorials/tutorial-one-python). Start with `BlockingConnection`, as those tutorials do: it's the adapter for [a procedural style](https://pika.readthedocs.io/en/stable/modules/adapters/index.html). [Ack each message after processing it](https://www.rabbitmq.com/tutorials/tutorial-two-python#message-acknowledgment), so RabbitMQ redelivers it when a worker dies.

paho-mqtt is the Eclipse Foundation's MQTT client, and MQTT is [a lightweight publish/subscribe protocol](https://eclipse.dev/paho/files/paho.mqtt.python/html/index.html) for IoT devices and low-bandwidth links. Create a client, connect it, and run [one of its network loops](https://eclipse.dev/paho/files/paho.mqtt.python/html/index.html#network-loop). `loop_forever()` blocks until you disconnect, and `loop_start()` runs the loop in a background thread. Both reconnect for you. [Subscribe in `on_connect()`](https://eclipse.dev/paho/files/paho.mqtt.python/html/index.html#getting-started), so a reconnect renews your subscriptions.

FastStream is [an asynchronous framework for event-driven services](https://faststream.ag2.ai/latest/): FastAPI's decorators, type-driven validation, and dependency injection, pointed at Kafka, RabbitMQ, NATS, Redis, or MQTT instead of HTTP. Write handlers with `@broker.subscriber()` and `@broker.publisher()`, run the app with `faststream run`, and [test it in memory](https://faststream.ag2.ai/latest/#testing-the-service) with no broker running. It [wraps your broker's own client](https://faststream.ag2.ai/latest/#your-broker-in-full) and leaves out retries, delayed delivery, and task orchestration by design: for background jobs, see [Task Queues](/categories/task-queues/).

In asyncio code, pick a client that won't block the event loop. FastStream is asynchronous throughout, confluent-kafka has [AsyncIO clients](https://docs.confluent.io/kafka-clients/python/current/overview.html#when-to-use-asyncio-clients) for apps like a FastAPI service, and pika has [an asyncio connection adapter](https://pika.readthedocs.io/en/stable/modules/adapters/asyncio.html).
